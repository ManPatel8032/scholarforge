/* ═══════════════════════════════════════════
   Privacy Policy Page — ScholarForge
   ═══════════════════════════════════════════ */

window.Pages = window.Pages || {};

window.Pages.privacy = function (container) {
  container.innerHTML = `
    ${App.renderNavbar()}
    <main style="flex: 1; padding: 3rem 1.5rem;">
      <div class="mx-auto max-w-4xl fade-in">
        <!-- Header -->
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <a href="#/home" class="btn btn-outline btn-sm" style="width: fit-content;">
              <i class="ph ph-arrow-left"></i> Back
            </a>
          </div>
          <h1 class="tracking-tight text-primary mt-2" style="font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 700;">
            Privacy Policy
          </h1>
          <p class="text-secondary" style="max-width: 48rem;">
            Learn how ScholarForge collects, processes, and protects your information and research data.
          </p>
          <div class="text-xs text-muted">Last updated: October 2026 • Effective immediately</div>
        </div>

        <!-- Content Card -->
        <div class="glass-card mt-8 p-6" style="display: flex; flex-direction: column; gap: 2rem; border-radius: var(--radius-lg);">
          
          <!-- Section 1 -->
          <section>
            <div class="flex items-center gap-2.5">
              <span style="display: inline-flex; align-items: center; justify-content: center; height: 1.85rem; width: 1.85rem; border-radius: var(--radius-sm); background: rgba(59, 130, 246, 0.12); color: var(--brand-from); font-size: 0.9rem; font-weight: 600;">1</span>
              <h2 class="text-lg font-semibold text-primary">Data We Collect</h2>
            </div>
            <p class="mt-2 text-sm text-secondary leading-relaxed">
              We collect information necessary to provide and improve our scholarly formatting services:
            </p>
            <ul class="mt-2 text-sm text-secondary leading-relaxed" style="list-style-type: disc; margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.35rem;">
              <li><strong>Account Credentials:</strong> Email address and authentication credentials provided during sign-up or login.</li>
              <li><strong>Manuscripts & Documents:</strong> Research papers, text snippets, LaTeX files, Word documents, and PDFs uploaded for parsing, structuring, and conversion.</li>
              <li><strong>Editor State & Preferences:</strong> Selected templates, font themes, conference styles, and local layout preferences stored in browser storage.</li>
            </ul>
          </section>

          <!-- Section 2 -->
          <section>
            <div class="flex items-center gap-2.5">
              <span style="display: inline-flex; align-items: center; justify-content: center; height: 1.85rem; width: 1.85rem; border-radius: var(--radius-sm); background: rgba(59, 130, 246, 0.12); color: var(--brand-from); font-size: 0.9rem; font-weight: 600;">2</span>
              <h2 class="text-lg font-semibold text-primary">How We Use Your Data</h2>
            </div>
            <p class="mt-2 text-sm text-secondary leading-relaxed">
              Your data is strictly utilized to operate and deliver the platform's core capabilities:
            </p>
            <ul class="mt-2 text-sm text-secondary leading-relaxed" style="list-style-type: disc; margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.35rem;">
              <li>Parsing text, detecting paper sections (Abstract, Methodology, Results), and structuring document ASTs.</li>
              <li>Compiling your formatted manuscripts into conference-ready PDFs via the Typst compilation engine.</li>
              <li>Powering context-aware AI drafting, reviews, and autocompletion when requested by you.</li>
              <li>We <strong>do not sell, rent, or monetize</strong> your research papers, uploaded manuscripts, or personal contact information.</li>
            </ul>
          </section>

          <!-- Section 3 -->
          <section>
            <div class="flex items-center gap-2.5">
              <span style="display: inline-flex; align-items: center; justify-content: center; height: 1.85rem; width: 1.85rem; border-radius: var(--radius-sm); background: rgba(59, 130, 246, 0.12); color: var(--brand-from); font-size: 0.9rem; font-weight: 600;">3</span>
              <h2 class="text-lg font-semibold text-primary">Data Storage & Retention</h2>
            </div>
            <p class="mt-2 text-sm text-secondary leading-relaxed">
              ScholarForge utilizes local persistence mechanisms (browser LocalStorage) alongside temporary workspace files to process compilation runs. Manuscript payloads and intermediate compile artifacts in the output directories can be cleared by the user or upon environment teardown. We recommend maintaining local master copies of all scholarly manuscripts.
            </p>
          </section>

          <!-- Section 4 -->
          <section>
            <div class="flex items-center gap-2.5">
              <span style="display: inline-flex; align-items: center; justify-content: center; height: 1.85rem; width: 1.85rem; border-radius: var(--radius-sm); background: rgba(59, 130, 246, 0.12); color: var(--brand-from); font-size: 0.9rem; font-weight: 600;">4</span>
              <h2 class="text-lg font-semibold text-primary">Third-Party Services</h2>
            </div>
            <p class="mt-2 text-sm text-secondary leading-relaxed">
              ScholarForge integrates with trusted third-party providers to deliver essential features:
            </p>
            <ul class="mt-2 text-sm text-secondary leading-relaxed" style="list-style-type: disc; margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.35rem;">
              <li><strong>Google Gemini API:</strong> Optional AI-assisted document cleaning, review, and LaTeX query refinement. Only content explicitly submitted for AI analysis is sent to the API.</li>
              <li><strong>CDN & Fonts:</strong> Google Fonts (Inter) and Phosphor Icons for interface rendering.</li>
            </ul>
          </section>

          <!-- Section 5 -->
          <section>
            <div class="flex items-center gap-2.5">
              <span style="display: inline-flex; align-items: center; justify-content: center; height: 1.85rem; width: 1.85rem; border-radius: var(--radius-sm); background: rgba(59, 130, 246, 0.12); color: var(--brand-from); font-size: 0.9rem; font-weight: 600;">5</span>
              <h2 class="text-lg font-semibold text-primary">Contact Us</h2>
            </div>
            <p class="mt-2 text-sm text-secondary leading-relaxed">
              If you have any questions, concerns, or requests regarding this Privacy Policy or your data, please contact the ScholarForge project team at:
            </p>
            <div class="mt-3 p-3.5 glass-card" style="border-radius: var(--radius-md); width: fit-content;">
              <span class="text-sm font-medium text-primary">Email: </span>
              <a href="mailto:privacy@scholarforge.local" class="link-blue text-sm">privacy@scholarforge.local</a>
            </div>
          </section>

        </div>
      </div>
    </main>
    ${App.renderFooter()}
  `;

  App.attachNavbarEvents();
};
