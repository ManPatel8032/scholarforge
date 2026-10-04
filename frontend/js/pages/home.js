/* ═══════════════════════════════════════════
   Home Page — Hero + Upload + Conference Selection
   Overleaf-inspired design for ScholarForge
   ═══════════════════════════════════════════ */

window.Pages = window.Pages || {};

window.Pages.home = function (container) {
  const user = AppState.user;
  const conf = AppState.selectedConference;
  const uploadedFile = AppState.uploadedFile;

  const confs = [
    { id: 'ieee', name: 'IEEE Conference', description: 'Two-column layout with a crisp, technical tone.' },
    { id: 'acm', name: 'ACM Conference', description: 'Clean single-column layout focused on readability.' },
    { id: 'springer', name: 'Springer Conference', description: 'Proceedings style with structured headings and spacing.' },
    { id: 'nature', name: 'Nature', description: 'Scientific journal format with Harvard citations.' },
    { id: 'arxiv', name: 'ArXiv Preprint', description: 'Flexible preprint format for open access.' },
    { id: 'iclr', name: 'ICLR', description: 'Machine learning conference, IEEE-style.' },
    { id: 'cvpr', name: 'CVPR', description: 'Computer vision conference, two-column.' },
    { id: 'acl', name: 'ACL', description: 'NLP conference format with author-year citations.' },
  ];

  function renderConfCards() {
    return confs.map(c => `
      <div class="conf-card ${AppState.selectedConference === c.id ? 'selected' : ''}" data-conf="${c.id}">
        <div class="conf-card-hover-gradient"></div>
        <div class="conf-card-inner">
          <div class="flex items-start justify-between gap-3">
            <div>
              <h3 class="text-base font-semibold text-primary leading-tight">${c.name}</h3>
              <p class="mt-1 text-sm text-secondary">${c.description}</p>
            </div>
            ${AppState.selectedConference === c.id ? '<span style="color: var(--brand-from); font-size: 1.2rem;"><i class="ph ph-check"></i></span>' : ''}
          </div>
          <button class="btn ${AppState.selectedConference === c.id ? 'btn-brand' : 'btn-primary'} btn-full" style="margin-top: 1rem;" data-select-conf="${c.id}">
            ${AppState.selectedConference === c.id ? 'Selected' : 'Select'}
          </button>
        </div>
      </div>
    `).join('');
  }

  container.innerHTML = `
    ${App.renderNavbar()}
    <main style="flex: 1;">

      <!-- ══════════ HERO SECTION — Overleaf-inspired ══════════ -->
      <section class="sf-hero">
        <div class="sf-hero-inner">

          <!-- Left Column: Headlines + Features -->
          <div class="sf-hero-left">
            <span class="sf-hero-badge">{features}</span>

            <h1 class="sf-hero-heading">
              The forge for
              <span class="sf-hero-highlight sf-highlight-red">scholarly</span>
              and
              <span class="sf-hero-highlight sf-highlight-purple">conference</span>
              papers
            </h1>

            <p class="sf-hero-sub">
              Upload manuscripts, auto-structure sections, and compile
              publication-ready PDFs with one click. No LaTeX expertise required.
            </p>

            <!-- Feature Bullets — Overleaf style -->
            <div class="sf-hero-features">
              <div class="sf-hero-bolt">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#f59e0b" stroke="#f59e0b" stroke-width="1.5" stroke-linejoin="round"/></svg>
              </div>
              <h2 class="sf-hero-features-title">Get started fast</h2>
              <p class="sf-hero-features-sub">No downloads, no setup, and no need to know LaTeX before you start.</p>

              <ul class="sf-hero-checklist">
                <li>
                  <span class="sf-check"><i class="ph-fill ph-check-circle"></i></span>
                  <span>Structured Editor and Live PDF Preview</span>
                </li>
                <li>
                  <span class="sf-check"><i class="ph-fill ph-check-circle"></i></span>
                  <span>Eight conference templates (IEEE, ACM, Springer…)</span>
                </li>
                <li>
                  <span class="sf-check"><i class="ph-fill ph-check-circle"></i></span>
                  <span>AI-powered section detection and formatting</span>
                </li>
                <li>
                  <span class="sf-check"><i class="ph-fill ph-check-circle"></i></span>
                  <span>One-click PDF compilation via Typst</span>
                </li>
              </ul>

              <a href="#/editor" class="sf-hero-explore">Explore features →</a>
            </div>
          </div>

          <!-- Right Column: Floating editor preview card -->
          <div class="sf-hero-right">
            <!-- Decorative arrow -->
            <div class="sf-hero-arrow">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none"><path d="M10 5 C25 10, 40 25, 50 50" stroke="var(--brand-from)" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.35"/><path d="M45 42 L50 50 L42 48" stroke="var(--brand-from)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.35"/></svg>
            </div>
            <div class="sf-editor-preview">
              <div class="sf-editor-toolbar">
                <span class="sf-toolbar-tab">Code Editor</span>
                <span class="sf-toolbar-tab sf-toolbar-active">Visual Editor</span>
                <div class="sf-toolbar-icons">
                  <span><i class="ph ph-arrow-counter-clockwise"></i></span>
                  <span><i class="ph ph-arrow-clockwise"></i></span>
                  <span><i class="ph ph-text-b" style="font-weight:700;"></i></span>
                  <span><i class="ph ph-text-italic"></i></span>
                  <span><i class="ph ph-link"></i></span>
                  <span><i class="ph ph-image"></i></span>
                  <span><i class="ph ph-table"></i></span>
                  <span><i class="ph ph-list-bullets"></i></span>
                  <span><i class="ph ph-list-numbers"></i></span>
                </div>
              </div>
              <div class="sf-editor-body">
                <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin: 0;">Proposed Methodology: Dynamic Learning Rates</h3>
                <p style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.5rem; line-height: 1.55;">
                  Our proposed methodology introduces a complex adaptive learning rate mechanism, as detailed by the following equation:
                </p>
                <pre style="background: var(--bg-hover); padding: 0.6rem 0.8rem; border-radius: 4px; margin-top: 0.6rem; font-size: 0.72rem; color: var(--text-muted); font-family: 'Courier New', monospace; overflow: hidden;">\\begin{equation}
    \\eta_t = \\frac{\\eta_0}{1 + \\alpha \\cdot t}
\\end{equation}</pre>
                <h3 style="font-size: 0.92rem; font-weight: 700; color: var(--text-primary); margin-top: 1rem;">Experimental Setup and Dataset Selection</h3>
                <p style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.35rem; line-height: 1.55;">
                  To rigorously evaluate the effectiveness of our proposed adaptive learning rate mechanism, we conducted experiments using three benchmark datasets: MNIST, CIFAR-10, and ImageNet.
                </p>
                <!-- Mini table -->
                <div style="margin-top: 0.8rem; border: 1px solid var(--border); border-radius: 4px; overflow: hidden; font-size: 0.7rem;">
                  <div style="text-align: center; font-weight: 600; padding: 0.35rem; background: var(--bg-hover); color: var(--text-primary); font-size: 0.72rem;">Experimental Results</div>
                  <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                      <tr style="background: var(--bg-hover);">
                        <th style="padding: 0.3rem 0.5rem; text-align: left; border-bottom: 1px solid var(--border); color: var(--text-primary);">Dataset</th>
                        <th style="padding: 0.3rem 0.5rem; text-align: center; border-bottom: 1px solid var(--border); color: var(--text-primary);">Convergence (epochs)</th>
                        <th style="padding: 0.3rem 0.5rem; text-align: center; border-bottom: 1px solid var(--border); color: var(--text-primary);">Accuracy (%)</th>
                      </tr>
                    </thead>
                    <tbody style="color: var(--text-secondary);">
                      <tr><td style="padding: 0.25rem 0.5rem; border-bottom: 1px solid var(--border);">MNIST</td><td style="text-align:center; padding: 0.25rem; border-bottom: 1px solid var(--border);">150</td><td style="text-align:center; padding: 0.25rem; border-bottom: 1px solid var(--border);">98.5</td></tr>
                      <tr><td style="padding: 0.25rem 0.5rem; border-bottom: 1px solid var(--border);">CIFAR-10</td><td style="text-align:center; padding: 0.25rem; border-bottom: 1px solid var(--border);">200</td><td style="text-align:center; padding: 0.25rem; border-bottom: 1px solid var(--border);">91.2</td></tr>
                      <tr><td style="padding: 0.25rem 0.5rem;">ImageNet</td><td style="text-align:center; padding: 0.25rem;">50</td><td style="text-align:center; padding: 0.25rem;">76.8</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- ══════════ UPLOAD + CONFERENCE GRID ══════════ -->
      <div class="mx-auto max-w-7xl px-6 py-10 fade-in">
        <div class="text-sm text-muted" style="margin-bottom: 1.5rem;">Signed in as <span class="font-medium text-primary">${user?.email || ''}</span></div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;" id="home-grid">
          <!-- Upload Section -->
          <section>
            <div class="flex items-baseline justify-between gap-3">
              <h2 class="text-lg font-semibold text-primary">File upload</h2>
              <span id="file-badge" class="file-selected-badge" style="${uploadedFile ? '' : 'display: none;'}">
                Selected: <span id="file-badge-name">${uploadedFile?.name || ''}</span>
              </span>
            </div>
            <div class="mt-4">
              <div class="upload-box" id="upload-area">
                <div class="upload-box-hover-gradient"></div>
                <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
                  <div class="upload-icon-box"><i class="ph ph-upload-simple" style="font-size: 2rem;"></i></div>
                  <h3 class="mt-4 text-base font-semibold text-primary">Upload files</h3>
                  <p class="mt-1 text-sm text-secondary">Drag & drop a PDF / LaTeX / text / Word file here, or click to browse.</p>
                  <p class="mt-2 text-xs text-muted">Supported: PDF, .tex, .txt, .docx</p>
                  <div class="mt-4">
                    <span class="btn btn-primary">Browse files</span>
                  </div>
                </div>
                <input type="file" id="file-input" style="display: none;" accept=".pdf,.tex,.txt,.docx,application/pdf,text/plain,application/x-latex,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
              </div>

              <div id="file-info" class="glass-card mt-4 p-4" style="${uploadedFile ? '' : 'display: none;'}">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <div class="text-sm font-medium text-primary" id="file-info-name">${uploadedFile?.name || ''}</div>
                    <div class="mt-1 text-xs text-muted" id="file-info-size"></div>
                  </div>
                  <button class="icon-btn" id="clear-file" title="Clear" style="height: 2rem; width: 2rem; font-size: 0.85rem;"><i class="ph ph-x"></i></button>
                </div>
              </div>
              <div id="extraction-preview" class="glass-card mt-4 p-4" style="display: none;"></div>
            </div>
          </section>

          <!-- Conference Section -->
          <section>
            <div class="flex items-baseline justify-between gap-3">
              <h2 class="text-lg font-semibold text-primary">Select a conference</h2>
              <div class="text-xs text-muted">Current: <span class="font-medium">${AppState.selectedConference}</span></div>
            </div>
            <div class="mt-4" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem;" id="conf-cards">
              ${renderConfCards()}
            </div>
          </section>
        </div>
      </div>
    </main>
    ${App.renderFooter()}
  `;

  App.attachNavbarEvents();

  // File upload
  const uploadArea = document.getElementById('upload-area');
  const fileInput = document.getElementById('file-input');
  const fileInfo = document.getElementById('file-info');
  const fileBadge = document.getElementById('file-badge');

  uploadArea.addEventListener('click', () => fileInput.click());

  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragging');
  });

  uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragging');
  });

  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragging');
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  });

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  });

  function formatSize(bytes) {
    if (!bytes || bytes <= 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.min(sizes.length - 1, Math.floor(Math.log(bytes) / Math.log(k)));
    return `${Math.round((bytes / Math.pow(k, i)) * 10) / 10} ${sizes[i]}`;
  }

  function handleFile(file) {
    const meta = { name: file.name, size: file.size, type: file.type, lastModified: file.lastModified };
    State.setUploadedFile(meta);

    // Show file info immediately
    document.getElementById('file-info-name').textContent = file.name;
    document.getElementById('file-info-size').textContent = formatSize(file.size) + ' • Uploading…';
    document.getElementById('file-badge-name').textContent = file.name;
    fileInfo.style.display = '';
    fileBadge.style.display = '';

    // Upload to backend for text extraction
    API.uploadFile(file).then(result => {
      // Store raw_text in state for later pipeline stages
      AppState.extractedText = result.raw_text;
      AppState.extractionResult = result;

      document.getElementById('file-info-size').textContent =
        `${formatSize(file.size)} • ${result.format.toUpperCase()} • ${result.word_count.toLocaleString()} words • ${result.char_count.toLocaleString()} chars`;

      // Show extraction preview (raw)
      const previewEl = document.getElementById('extraction-preview');
      if (previewEl) {
        const truncated = result.raw_text.length > 800
          ? result.raw_text.substring(0, 800) + '…'
          : result.raw_text;
        previewEl.innerHTML = `
                    <div class="text-xs font-semibold text-secondary mb-2"><i class="ph ph-file-text"></i> Raw Extracted Text</div>
                    <pre class="extraction-preview-text">${escapeHtml(truncated)}</pre>
                    <div class="text-xs text-muted" style="margin-top: 0.5rem;"><i class="ph ph-arrows-clockwise"></i> Cleaning text…</div>
                `;
        previewEl.style.display = '';
      }

      // ── Text Cleaning Layer: auto-clean after extraction ──
      return API.cleanText(result.raw_text).then(cleanResult => {
        AppState.cleanedText = cleanResult.clean_text;
        AppState.cleaningResult = cleanResult;

        const saved = cleanResult.original_length - cleanResult.cleaned_length;
        const pct = cleanResult.original_length > 0
          ? Math.round((saved / cleanResult.original_length) * 100)
          : 0;

        // ── Section Detection: auto-detect after cleaning ──
        return API.detectSections(cleanResult.clean_text).then(detectResult => {
          AppState.documentAST = detectResult.document;
          AppState.sectionCount = detectResult.section_count;

          if (previewEl) {
            const doc = detectResult.document;
            const cleanTruncated = cleanResult.clean_text.length > 800
              ? cleanResult.clean_text.substring(0, 800) + '…'
              : cleanResult.clean_text;

            // Build structure view
            let structHtml = '';
            if (doc.title) structHtml += `<div class="text-sm font-semibold text-primary">${escapeHtml(doc.title)}</div>`;
            if (doc.authors.length) structHtml += `<div class="text-xs text-muted" style="margin-top:0.25rem;">By ${escapeHtml(doc.authors.join(', '))}</div>`;
            if (doc.abstract) structHtml += `<div style="margin-top:0.5rem;padding:0.5rem;border-radius:6px;background:var(--glass-bg);"><div class="text-xs font-semibold text-secondary">Abstract</div><div class="text-xs text-primary" style="margin-top:0.25rem;">${escapeHtml(doc.abstract.substring(0, 300))}${doc.abstract.length > 300 ? '…' : ''}</div></div>`;
            if (doc.keywords.length) structHtml += `<div class="text-xs text-muted" style="margin-top:0.5rem;">Keywords: ${escapeHtml(doc.keywords.join(', '))}</div>`;
            if (doc.sections.length) {
              structHtml += `<div style="margin-top:0.5rem;"><div class="text-xs font-semibold text-secondary" style="margin-bottom:0.25rem;">Sections (${doc.sections.length})</div>`;
              doc.sections.forEach((s, i) => {
                const preview = s.content.substring(0, 80).replace(/\n/g, ' ');
                structHtml += `<div class="text-xs" style="padding:0.25rem 0;border-bottom:1px solid var(--border-subtle);"><span class="font-medium text-primary">${i + 1}. ${escapeHtml(s.heading)}</span> <span class="text-muted">— ${escapeHtml(preview)}${s.content.length > 80 ? '…' : ''}</span></div>`;
              });
              structHtml += `</div>`;
            }
            if (doc.references) structHtml += `<div class="text-xs text-muted" style="margin-top:0.5rem;"><i class="ph ph-books"></i> References detected</div>`;

            previewEl.innerHTML = `
              <div style="display:flex; gap:0.5rem; margin-bottom:0.75rem;">
                <button class="btn btn-primary btn-sm preview-tab active" data-tab="structure" style="font-size:0.75rem; padding:0.25rem 0.75rem;"><i class="ph ph-puzzle-piece"></i> Structure</button>
                <button class="btn btn-primary btn-sm preview-tab" data-tab="cleaned" style="font-size:0.75rem; padding:0.25rem 0.75rem; opacity:0.6;">✅ Cleaned</button>
                <button class="btn btn-primary btn-sm preview-tab" data-tab="raw" style="font-size:0.75rem; padding:0.25rem 0.75rem; opacity:0.6;"><i class="ph ph-file-text"></i> Raw</button>
              </div>
              <div class="text-xs text-muted" style="margin-bottom:0.5rem;">Cleaned ${pct}% noise • ${detectResult.section_count} sections detected</div>
              <div id="preview-structure">${structHtml}</div>
              <div id="preview-cleaned" style="display:none;"><pre class="extraction-preview-text">${escapeHtml(cleanTruncated)}</pre></div>
              <div id="preview-raw" style="display:none;"><pre class="extraction-preview-text">${escapeHtml(result.raw_text.length > 800 ? result.raw_text.substring(0, 800) + '…' : result.raw_text)}</pre></div>
            `;
            // Tab switching
            previewEl.querySelectorAll('.preview-tab').forEach(btn => {
              btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                previewEl.querySelectorAll('.preview-tab').forEach(b => { b.classList.remove('active'); b.style.opacity = '0.6'; });
                btn.classList.add('active'); btn.style.opacity = '1';
                document.getElementById('preview-structure').style.display = tab === 'structure' ? '' : 'none';
                document.getElementById('preview-cleaned').style.display = tab === 'cleaned' ? '' : 'none';
                document.getElementById('preview-raw').style.display = tab === 'raw' ? '' : 'none';
              });
            });
            previewEl.querySelector('.preview-tab.active').style.opacity = '1';
          }
        });
      });
    }).catch(err => {
      document.getElementById('file-info-size').textContent =
        `${formatSize(file.size)} • ❌ ${err.message}`;
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  document.getElementById('clear-file')?.addEventListener('click', () => {
    State.setUploadedFile(null);
    AppState.extractedText = null;
    AppState.extractionResult = null;
    AppState.cleanedText = null;
    AppState.cleaningResult = null;
    AppState.documentAST = null;
    AppState.sectionCount = null;
    fileInfo.style.display = 'none';
    fileBadge.style.display = 'none';
    fileInput.value = '';
    const previewEl = document.getElementById('extraction-preview');
    if (previewEl) { previewEl.style.display = 'none'; previewEl.innerHTML = ''; }
  });

  // Conference selection
  document.getElementById('conf-cards').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-select-conf]');
    if (btn) {
      const confId = btn.dataset.selectConf;
      State.setSelectedConference(confId);
      App.navigate(`/editor`);
    }
  });
};
