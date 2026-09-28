/* ═══════════════════════════════════════════
   Converter Page — Full Typst Pipeline Workflow
   Upload → Template → Layout → Convert → Preview → Download
   ═══════════════════════════════════════════ */

window.Pages = window.Pages || {};

window.Pages.converter = function (container) {
  // ── Supported conferences: Only IEEE and ACM ──
  const CONFERENCES = [
    {
      id: 'ieee',
      name: 'IEEE',
      fullName: 'Institute of Electrical and Electronics Engineers',
      badge: 'Technical Standard',
      icon: '<i class="ph ph-cpu"></i>',
      desc: 'Standard for CS, engineering & electronics. Numbered bracketed citations [1] with compact technical structure.'
    },
    {
      id: 'acm',
      name: 'ACM',
      fullName: 'Association for Computing Machinery',
      badge: 'SIGCONF Proceedings',
      icon: '<i class="ph ph-terminal-window"></i>',
      desc: 'Standard for computing machinery conferences. Clean typography with balanced headings and citations.'
    },
  ];

  const LAYOUTS = [
    {
      id: 'single-column',
      name: 'Single Column',
      icon: '<i class="ph ph-rows"></i>',
      desc: 'Continuous full-width flow, optimal for preprints & reviews.'
    },
    {
      id: 'double-column',
      name: 'Double Column',
      icon: '<i class="ph ph-columns"></i>',
      desc: 'Traditional two-column academic proceedings format.'
    },
  ];

  // ── Local state ──
  let selectedConf = 'ieee';
  let selectedLayout = 'double-column';
  let uploadedFile = null;
  let pipelineStatus = 'idle';       // idle | uploading | processing | done | error
  let pipelineMessage = '';
  let pdfBlobUrl = null;
  let pdfBlob = null;
  let schemaJson = null;
  let jsonUrl = null;

  function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  // ── JSON Tree Builder ──
  function buildJsonTree(data, key, depth) {
    depth = depth || 0;
    const isRoot = key === undefined;

    if (data === null || data === undefined) {
      return isRoot ? '' : `<span class="jt-key">${escapeHtml(String(key))}</span><span class="jt-sep">: </span><span class="jt-null">null</span>`;
    }

    if (Array.isArray(data)) {
      if (data.length === 0) {
        const label = isRoot ? '' : `<span class="jt-key">${escapeHtml(String(key))}</span><span class="jt-sep">: </span>`;
        return `<div class="jt-line">${label}<span class="jt-bracket">[]</span></div>`;
      }
      const header = isRoot ? '' : `<span class="jt-key">${escapeHtml(String(key))}</span><span class="jt-sep">: </span>`;
      const items = data.map((item, i) => {
        if (typeof item === 'object' && item !== null) {
          return `<div class="jt-node">
            <div class="jt-line"><button class="jt-toggle" type="button">▾</button><span class="jt-index">[${i}]</span></div>
            <div class="jt-children">${Object.keys(item).map(k => buildJsonTree(item[k], k, depth + 2)).join('')}</div>
          </div>`;
        }
        return buildJsonTree(item, `[${i}]`, depth + 1);
      }).join('');
      return `<div class="jt-node">
        <div class="jt-line"><button class="jt-toggle" type="button">▾</button>${header}<span class="jt-badge">${data.length} items</span></div>
        <div class="jt-children">${items}</div>
      </div>`;
    }

    if (typeof data === 'object') {
      const keys = Object.keys(data);
      if (keys.length === 0) {
        const label = isRoot ? '' : `<span class="jt-key">${escapeHtml(String(key))}</span><span class="jt-sep">: </span>`;
        return `<div class="jt-line">${label}<span class="jt-bracket">{}</span></div>`;
      }
      const header = isRoot ? '' : `<span class="jt-key">${escapeHtml(String(key))}</span><span class="jt-sep">: </span>`;
      const children = keys.map(k => buildJsonTree(data[k], k, depth + 1)).join('');
      if (isRoot) return children;
      return `<div class="jt-node">
        <div class="jt-line"><button class="jt-toggle" type="button">▾</button>${header}<span class="jt-badge">${keys.length} fields</span></div>
        <div class="jt-children">${children}</div>
      </div>`;
    }

    // Primitive
    const val = typeof data === 'string'
      ? `<span class="jt-str">"${escapeHtml(data.length > 120 ? data.slice(0, 120) + '…' : data)}"</span>`
      : `<span class="jt-num">${escapeHtml(String(data))}</span>`;
    const label = isRoot ? '' : `<span class="jt-key">${escapeHtml(String(key))}</span><span class="jt-sep">: </span>`;
    return `<div class="jt-line">${label}${val}</div>`;
  }

  function formatSize(bytes) {
    if (!bytes || bytes <= 0) return '0 B';
    const k = 1024;
    const u = ['B', 'KB', 'MB'];
    const i = Math.min(u.length - 1, Math.floor(Math.log(bytes) / Math.log(k)));
    return `${Math.round((bytes / Math.pow(k, i)) * 10) / 10} ${u[i]}`;
  }

  // ── Render ──
  function render() {
    container.innerHTML = `
      ${App.renderNavbar()}
      <main style="flex: 1;">
        <div class="mx-auto max-w-7xl px-6 py-8 fade-in">
          <!-- Page Header -->
          <div class="converter-header">
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-2">
                <span class="converter-badge"><i class="ph ph-sparkle"></i> Fast Pipeline</span>
                <span class="text-xs text-muted">IEEE & ACM Formats</span>
              </div>
              <h1 class="tracking-tight text-primary" style="font-size: clamp(1.75rem, 3.5vw, 2.25rem); font-weight: 700;">
                Conference Paper Converter
              </h1>
              <p class="text-secondary" style="max-width: 44rem; font-size: 0.95rem; line-height: 1.5;">
                Upload your research paper, pick your target conference standard (IEEE or ACM) and column layout, then compile directly into a formatted vector PDF.
              </p>
            </div>

            <!-- Steps Bar -->
            <div class="converter-steps-wrap mt-6">
              ${renderStepIndicator()}
            </div>
          </div>

          <!-- Main Converter Grid (Controls on Left, Live Preview on Right) -->
          <div class="converter-grid">
            <!-- Left: Converter Controls -->
            <div class="converter-controls">
              ${renderUploadSection()}
              ${renderTemplateSection()}
              ${renderLayoutSection()}
              ${renderConvertSection()}
            </div>

            <!-- Right: Live Preview Panel -->
            <div class="converter-preview-panel">
              ${renderPreview()}
            </div>
          </div>
        </div>
      </main>
      ${App.renderFooter()}
    `;

    App.attachNavbarEvents();
    attachEvents();
  }

  // ── Step Indicator ──
  function renderStepIndicator() {
    const isStep1Done = !!uploadedFile;
    const isStep4Done = pipelineStatus === 'done';

    const steps = [
      { num: 1, label: 'Upload Paper', sub: 'PDF, DOCX, LaTeX', done: isStep1Done, active: !isStep1Done },
      { num: 2, label: 'Conference', sub: selectedConf.toUpperCase(), done: isStep1Done, active: isStep1Done && !isStep4Done },
      { num: 3, label: 'Layout Style', sub: selectedLayout === 'double-column' ? '2-Column' : '1-Column', done: isStep1Done, active: isStep1Done && !isStep4Done },
      { num: 4, label: 'Export PDF', sub: isStep4Done ? 'Ready' : 'Pending', done: isStep4Done, active: isStep4Done },
    ];

    return `<div class="step-indicator" style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; width: 100%;">
      ${steps.map((s, idx) => `
        <div class="step-item ${s.done ? 'done' : ''} ${s.active ? 'active' : ''}" style="display: flex; align-items: center; gap: 0.65rem;">
          <div class="step-circle" style="width: 2rem; height: 2rem; border-radius: 9999px; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">${s.done ? '<i class="ph ph-check"></i>' : s.num}</div>
          <div class="step-label-group" style="display: flex; flex-direction: column;">
            <span class="step-label" style="font-size: 0.825rem; font-weight: 600;">${s.label}</span>
            <span class="step-sublabel" style="font-size: 0.7rem; color: var(--text-muted);">${s.sub}</span>
          </div>
        </div>
        ${idx < steps.length - 1 ? `<div class="step-line ${s.done ? 'done' : ''}" style="flex: 1; height: 2px; margin: 0 0.75rem; min-width: 1rem;"></div>` : ''}
      `).join('')}
    </div>`;
  }

  // ── Upload Section ──
  function renderUploadSection() {
    return `
      <section class="converter-section">
        <div class="converter-section-header">
          <div class="section-number">1</div>
          <div>
            <h2 class="section-title">Upload Manuscript</h2>
            <p class="section-desc">Upload a PDF, LaTeX (.tex), DOCX, Markdown, or TXT document</p>
          </div>
        </div>

        ${uploadedFile ? `
          <div class="uploaded-file-card mt-3" style="display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; padding: 0.85rem 1rem;">
            <div class="file-card-info" style="display: flex; align-items: center; gap: 0.75rem; min-width: 0;">
              <div class="file-icon-box">
                <i class="ph ph-file-text"></i>
              </div>
              <div class="file-details" style="min-width: 0;">
                <div class="file-name" title="${escapeHtml(uploadedFile.name)}">${escapeHtml(uploadedFile.name)}</div>
                <div class="file-meta" style="font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.4rem;">
                  <span>${formatSize(uploadedFile.size)}</span>
                  <span>•</span>
                  <span class="file-status" style="color: #16a34a; font-weight: 500; display: inline-flex; align-items: center; gap: 0.25rem;"><i class="ph ph-check-circle"></i> Loaded</span>
                </div>
              </div>
            </div>
            <button type="button" class="btn btn-ghost btn-sm text-danger" id="conv-clear-file" title="Remove this file">
              <i class="ph ph-trash"></i> Remove
            </button>
          </div>
        ` : `
          <div class="upload-box mt-3" id="conv-upload-area" style="cursor: pointer;">
            <div class="upload-box-hover-gradient"></div>
            <div class="upload-box-inner" style="position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 0.75rem 0.5rem;">
              <div class="upload-icon-box">
                <i class="ph ph-cloud-arrow-up" style="font-size: 2.25rem;"></i>
              </div>
              <p class="upload-title" style="margin-top: 0.75rem; font-size: 0.875rem; font-weight: 600;">Drop your manuscript here, or click to browse</p>
              <p class="upload-subtitle" style="margin-top: 0.25rem; font-size: 0.75rem; color: var(--text-muted);">PDF, DOCX, LaTeX (.tex), Markdown, or plain text — max 20 MB</p>
              <div class="upload-action-btn" style="margin-top: 0.75rem;">
                <span class="btn btn-outline btn-sm"><i class="ph ph-folder-open"></i> Browse Files</span>
              </div>
            </div>
            <input type="file" id="conv-file-input" style="display: none;" accept=".pdf,.tex,.txt,.docx,.md" />
          </div>
        `}
      </section>
    `;
  }

  // ── Template Section (Strictly 2 options: IEEE & ACM) ──
  function renderTemplateSection() {
    return `
      <section class="converter-section">
        <div class="converter-section-header">
          <div class="section-number">2</div>
          <div>
            <h2 class="section-title">Select Conference Format</h2>
            <p class="section-desc">Choose between official IEEE and ACM publication standards</p>
          </div>
        </div>

        <div class="template-grid mt-3" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem;">
          ${CONFERENCES.map(c => {
            const isSelected = selectedConf === c.id;
            return `
              <button type="button" class="template-card ${isSelected ? 'selected' : ''}" data-conf="${c.id}" style="display: flex; flex-direction: column; padding: 1.1rem; border-radius: var(--radius-lg); text-align: left; cursor: pointer; transition: all 0.2s;">
                <div class="template-card-header" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.65rem; width: 100%;">
                  <div class="template-card-icon-wrap">${c.icon}</div>
                  <span class="template-card-badge">${c.badge}</span>
                </div>
                <div class="template-card-body" style="flex: 1; width: 100%;">
                  <div class="template-card-title-row" style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;">
                    <span class="template-card-title">${c.name}</span>
                    <span class="template-card-radio">
                      ${isSelected ? '<i class="ph ph-check-circle"></i>' : '<i class="ph ph-circle"></i>'}
                    </span>
                  </div>
                  <div class="template-card-fullname">${c.fullName}</div>
                  <div class="template-card-desc">${c.desc}</div>
                </div>
              </button>
            `;
          }).join('')}
        </div>
      </section>
    `;
  }

  // ── Layout Section ──
  function renderLayoutSection() {
    return `
      <section class="converter-section">
        <div class="converter-section-header">
          <div class="section-number">3</div>
          <div>
            <h2 class="section-title">Choose Column Layout</h2>
            <p class="section-desc">Select single-column draft or double-column camera-ready format</p>
          </div>
        </div>

        <div class="layout-grid mt-3" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem;">
          ${LAYOUTS.map(l => {
            const isSelected = selectedLayout === l.id;
            return `
              <button type="button" class="layout-card ${isSelected ? 'selected' : ''}" data-layout="${l.id}" style="display: flex; align-items: center; gap: 0.85rem; padding: 0.85rem 1rem; border-radius: var(--radius-lg); text-align: left; cursor: pointer; transition: all 0.2s;">
                <div class="layout-card-icon-wrap">${l.icon}</div>
                <div class="layout-card-body" style="flex: 1; min-width: 0;">
                  <div class="layout-card-title">${l.name}</div>
                  <div class="layout-card-desc">${l.desc}</div>
                </div>
                <div class="layout-card-radio">
                  ${isSelected ? '<i class="ph ph-check-circle"></i>' : '<i class="ph ph-circle"></i>'}
                </div>
              </button>
            `;
          }).join('')}
        </div>
      </section>
    `;
  }

  // ── Convert Section (Action button + Progress) ──
  function renderConvertSection() {
    const isProcessing = pipelineStatus === 'uploading' || pipelineStatus === 'processing';
    const hasFile = !!uploadedFile;
    const isDone = pipelineStatus === 'done';
    const isError = pipelineStatus === 'error';

    let btnHtml = '';
    if (!hasFile) {
      btnHtml = `
        <button type="button" class="btn btn-outline btn-full btn-lg" id="conv-convert-btn" disabled style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; height: 2.85rem;">
          <i class="ph ph-file-arrow-up"></i> Upload a Manuscript to Convert
        </button>
      `;
    } else if (isProcessing) {
      btnHtml = `
        <button type="button" class="btn btn-brand btn-full btn-lg" id="conv-convert-btn" disabled style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; height: 2.85rem;">
          <i class="ph ph-spinner animate-spin"></i> Converting to ${selectedConf.toUpperCase()} PDF…
        </button>
      `;
    } else if (isDone) {
      btnHtml = `
        <button type="button" class="btn btn-brand btn-full btn-lg" id="conv-convert-btn" style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; height: 2.85rem; cursor: pointer;">
          <i class="ph ph-arrows-clockwise"></i> Re-convert Document
        </button>
      `;
    } else if (isError) {
      btnHtml = `
        <button type="button" class="btn btn-danger btn-full btn-lg" id="conv-convert-btn" style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; height: 2.85rem; cursor: pointer;">
          <i class="ph ph-arrow-counter-clockwise"></i> Retry Conversion
        </button>
      `;
    } else {
      btnHtml = `
        <button type="button" class="btn btn-brand btn-full btn-lg" id="conv-convert-btn" style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; height: 2.85rem; cursor: pointer;">
          <i class="ph ph-arrow-right"></i> Convert to ${selectedConf.toUpperCase()} (${selectedLayout === 'double-column' ? '2-Column' : '1-Column'})
        </button>
      `;
    }

    return `
      <section class="converter-section converter-action-section">
        ${btnHtml}
        ${isProcessing ? `
          <div class="converter-progress mt-3">
            <div class="progress-bar"><div class="progress-bar-fill"></div></div>
            <p class="text-xs text-muted mt-2 flex items-center justify-center gap-1.5">
              <i class="ph ph-spinner animate-spin"></i> ${escapeHtml(pipelineMessage || 'Processing document pipeline...')}
            </p>
          </div>
        ` : ''}
        ${isError ? `
          <div class="alert-error-box mt-3">
            <i class="ph ph-warning-circle text-base" style="flex-shrink: 0; margin-top: 1px;"></i>
            <div class="text-xs font-medium">${escapeHtml(pipelineMessage || 'Conversion failed. Please verify your document formatting.')}</div>
          </div>
        ` : ''}
      </section>
    `;
  }

  // ── Preview Panel ──
  function renderPreview() {
    if (pipelineStatus === 'done' && pdfBlobUrl) {
      return `
        <div class="preview-container">
          <div class="preview-header">
            <div class="preview-title-area">
              <span class="preview-badge-success"><i class="ph ph-check-circle"></i> Compiled</span>
              <span class="preview-doc-title">${selectedConf.toUpperCase()} • ${selectedLayout === 'double-column' ? 'Double Column' : 'Single Column'}</span>
            </div>
            <div class="preview-actions">
              <a href="${pdfBlobUrl}" target="_blank" class="btn btn-outline btn-sm" title="Open PDF in new window">
                <i class="ph ph-arrow-square-out"></i> Popout
              </a>
              <button type="button" class="btn btn-outline btn-sm" id="conv-download-json" title="Download Document Schema JSON">
                <i class="ph ph-brackets-curly"></i> JSON
              </button>
              <button type="button" class="btn btn-primary btn-sm" id="conv-download-pdf" title="Download Compiled PDF">
                <i class="ph ph-file-pdf"></i> Download PDF
              </button>
            </div>
          </div>

          <iframe src="${pdfBlobUrl}" class="pdf-iframe" title="Compiled PDF Preview"></iframe>

          ${schemaJson ? `
            <div class="preview-footer">
              <details class="json-preview" id="conv-json-details">
                <summary class="json-summary">
                  <div class="flex items-center gap-1.5 font-medium text-xs text-primary">
                    <i class="ph ph-code-block"></i>
                    <span>Document Schema AST (paper.json)</span>
                  </div>
                  <span class="text-xs text-muted">Click to toggle</span>
                </summary>
                <div class="json-tree mt-2" id="json-tree-root"></div>
              </details>
            </div>
          ` : ''}
        </div>
      `;
    }

    return `
      <div class="preview-empty">
        <div class="preview-empty-icon">
          <i class="ph ph-file-pdf"></i>
        </div>
        <h3 class="preview-empty-title">Document Preview</h3>
        <p class="preview-empty-desc">
          Your compiled IEEE or ACM paper PDF will appear live here once converted.
        </p>
        <div class="preview-features-list">
          <div class="preview-feature-item">
            <i class="ph ph-check-circle"></i>
            <span>Automated section & citation structuring</span>
          </div>
          <div class="preview-feature-item">
            <i class="ph ph-check-circle"></i>
            <span>Official IEEE & ACM typography styling</span>
          </div>
          <div class="preview-feature-item">
            <i class="ph ph-check-circle"></i>
            <span>High-resolution vector PDF generation via Typst</span>
          </div>
        </div>
      </div>
    `;
  }

  // ── Event Binding ──
  function attachEvents() {
    // Upload area
    const uploadArea = document.getElementById('conv-upload-area');
    const fileInput = document.getElementById('conv-file-input');
    if (uploadArea && fileInput) {
      uploadArea.addEventListener('click', () => fileInput.click());
      uploadArea.addEventListener('dragover', e => { e.preventDefault(); uploadArea.classList.add('dragging'); });
      uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragging'));
      uploadArea.addEventListener('drop', e => {
        e.preventDefault();
        uploadArea.classList.remove('dragging');
        if (e.dataTransfer.files?.[0]) handleFileSelect(e.dataTransfer.files[0]);
      });
      fileInput.addEventListener('change', e => {
        if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
      });
    }

    // Clear file
    document.getElementById('conv-clear-file')?.addEventListener('click', () => {
      uploadedFile = null;
      pipelineStatus = 'idle';
      pipelineMessage = '';
      revokePdf();
      render();
    });

    // Template selection
    container.querySelectorAll('[data-conf]').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedConf = btn.dataset.conf;
        render();
      });
    });

    // Layout selection
    container.querySelectorAll('[data-layout]').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedLayout = btn.dataset.layout;
        render();
      });
    });

    // Convert button
    document.getElementById('conv-convert-btn')?.addEventListener('click', runPipeline);

    // Download buttons
    document.getElementById('conv-download-pdf')?.addEventListener('click', downloadPdf);
    document.getElementById('conv-download-json')?.addEventListener('click', downloadJson);

    // Render JSON tree if present
    const treeRoot = document.getElementById('json-tree-root');
    if (treeRoot && schemaJson) {
      treeRoot.innerHTML = buildJsonTree(schemaJson);
      treeRoot.querySelectorAll('.jt-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const node = btn.closest('.jt-node');
          node.classList.toggle('jt-collapsed');
        });
      });
    }
  }

  // ── File selection ──
  function handleFileSelect(file) {
    if (file.size > 20 * 1024 * 1024) {
      pipelineStatus = 'error';
      pipelineMessage = 'File exceeds 20 MB limit.';
      render();
      return;
    }
    uploadedFile = file;
    pipelineStatus = 'idle';
    pipelineMessage = '';
    revokePdf();
    render();
  }

  // ── Full Pipeline (single API call) ──
  async function runPipeline() {
    if (!uploadedFile) return;
    pipelineStatus = 'processing';
    revokePdf();
    schemaJson = null;
    jsonUrl = null;

    try {
      pipelineMessage = 'Running full pipeline: extract → clean → detect → map → generate → compile…';
      render();

      const result = await API.runPipeline(uploadedFile, selectedConf, selectedLayout);

      // Store schema JSON data
      schemaJson = result.schema_json || null;
      jsonUrl = result.json_url || null;

      // Fetch the generated PDF from the returned URL
      const pdfRes = await fetch(result.pdf_url);
      if (!pdfRes.ok) throw new Error('Failed to load generated PDF');
      pdfBlob = await pdfRes.blob();
      pdfBlobUrl = URL.createObjectURL(pdfBlob);

      pipelineStatus = 'done';
      pipelineMessage = '';
      render();

    } catch (err) {
      pipelineStatus = 'error';
      pipelineMessage = err.message || 'Conversion failed.';
      render();
    }
  }

  // ── Downloads ──
  function downloadPdf() {
    if (!pdfBlob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(pdfBlob);
    a.download = `${selectedConf}-${selectedLayout}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function downloadJson() {
    if (!schemaJson) return;
    const blob = new Blob([JSON.stringify(schemaJson, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${selectedConf}-paper.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // ── Cleanup ──
  function revokePdf() {
    if (pdfBlobUrl) { URL.revokeObjectURL(pdfBlobUrl); pdfBlobUrl = null; }
    pdfBlob = null;
    schemaJson = null;
    jsonUrl = null;
  }

  // Initial render
  render();

  // Return cleanup function
  return () => { revokePdf(); };
};
