/* ═══════════════════════════════════════════
   Terms and Conditions Page — ScholarForge
   ═══════════════════════════════════════════ */

window.Pages = window.Pages || {};

window.Pages.terms = function (container) {
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
            Terms and Conditions
          </h1>
          <p class="text-secondary" style="max-width: 48rem;">
            Please read these Terms and Conditions carefully before using ScholarForge.
          </p>
          <div class="text-xs text-muted">Last updated: October 2026 • Effective immediately</div>
        </div>

        <!-- Content Card -->
        <div class="glass-card mt-8 p-6" style="display: flex; flex-direction: column; gap: 2rem; border-radius: var(--radius-lg);">
          
          <!-- Section 1 -->
          <section>
            <div class="flex items-center gap-2.5">
              <span style="display: inline-flex; align-items: center; justify-content: center; height: 1.85rem; width: 1.85rem; border-radius: var(--radius-sm); background: rgba(59, 130, 246, 0.12); color: var(--brand-from); font-size: 0.9rem; font-weight: 600;">1</span>
              <h2 class="text-lg font-semibold text-primary">Acceptance of Terms</h2>
            </div>
            <p class="mt-2 text-sm text-secondary leading-relaxed">
              By accessing or using ScholarForge ("Service", "Platform", or "we"), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must discontinue the use of our services immediately.
            </p>
          </section>

          <!-- Section 2 -->
          <section>
            <div class="flex items-center gap-2.5">
              <span style="display: inline-flex; align-items: center; justify-content: center; height: 1.85rem; width: 1.85rem; border-radius: var(--radius-sm); background: rgba(59, 130, 246, 0.12); color: var(--brand-from); font-size: 0.9rem; font-weight: 600;">2</span>
              <h2 class="text-lg font-semibold text-primary">Use of Service</h2>
            </div>
            <p class="mt-2 text-sm text-secondary leading-relaxed">
              ScholarForge is designed to assist researchers, students, and academic writers in structuring, formatting, and compiling scholarly manuscripts. You agree to use the Service solely for lawful research and academic purposes. You must not:
            </p>
            <ul class="mt-2 text-sm text-secondary leading-relaxed" style="list-style-type: disc; margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.35rem;">
              <li>Upload malicious code, harmful payloads, or corrupted files designed to disrupt the platform or its compilation pipeline.</li>
              <li>Attempt unauthorized access to any infrastructure, servers, or user accounts.</li>
              <li>Use the automated tools or AI assistance to generate fraudulent academic work or infringe upon academic integrity standards.</li>
            </ul>
          </section>

          <!-- Section 3 -->
          <section>
            <div class="flex items-center gap-2.5">
              <span style="display: inline-flex; align-items: center; justify-content: center; height: 1.85rem; width: 1.85rem; border-radius: var(--radius-sm); background: rgba(59, 130, 246, 0.12); color: var(--brand-from); font-size: 0.9rem; font-weight: 600;">3</span>
              <h2 class="text-lg font-semibold text-primary">Use of Data & Intellectual Property</h2>
            </div>
            <p class="mt-2 text-sm text-secondary leading-relaxed">
              You retain all ownership, copyright, and intellectual property rights in the documents, manuscripts, and data you upload to ScholarForge. By uploading content, you grant ScholarForge a limited, non-exclusive license strictly to process, parse, reformat, and compile your document as requested. We do not claim ownership of your academic works nor sell your research data to third parties.
            </p>
          </section>

          <!-- Section 4 -->
          <section>
            <div class="flex items-center gap-2.5">
              <span style="display: inline-flex; align-items: center; justify-content: center; height: 1.85rem; width: 1.85rem; border-radius: var(--radius-sm); background: rgba(59, 130, 246, 0.12); color: var(--brand-from); font-size: 0.9rem; font-weight: 600;">4</span>
              <h2 class="text-lg font-semibold text-primary">Limitations of Liability</h2>
            </div>
            <p class="mt-2 text-sm text-secondary leading-relaxed">
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind. ScholarForge makes reasonable efforts to ensure formatting accuracy against academic templates (such as IEEE, ACM, Springer), but does not guarantee acceptance by any publisher or conference. Under no circumstances shall ScholarForge or its maintainers be liable for any direct, indirect, incidental, or consequential damages resulting from the loss of data, formatting discrepancies, submission deadlines missed, or service interruptions.
            </p>
          </section>

          <!-- Section 5 -->
          <section>
            <div class="flex items-center gap-2.5">
              <span style="display: inline-flex; align-items: center; justify-content: center; height: 1.85rem; width: 1.85rem; border-radius: var(--radius-sm); background: rgba(59, 130, 246, 0.12); color: var(--brand-from); font-size: 0.9rem; font-weight: 600;">5</span>
              <h2 class="text-lg font-semibold text-primary">Change of Terms</h2>
            </div>
            <p class="mt-2 text-sm text-secondary leading-relaxed">
              We reserve the right to revise, update, or replace these Terms and Conditions at any time. Material modifications will be reflected with an updated "Last updated" date at the top of this page. Your continued use of the Platform following any changes constitutes acceptance of the new Terms.
            </p>
          </section>

        </div>
      </div>
    </main>
    ${App.renderFooter()}
  `;

  App.attachNavbarEvents();
};
