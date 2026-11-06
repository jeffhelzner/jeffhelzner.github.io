(function () {
  const $year = document.getElementById('year');
  if ($year) $year.textContent = new Date().getFullYear();

  function revealEmail() {
    document.querySelectorAll('.js-email').forEach(el => {
      const user = el.dataset.u;
      const domain = el.dataset.d;
      if (!user || !domain) return;
      const address = `${user}@${domain}`;
      const link = document.createElement('a');
      link.href = `mailto:${address}`;
      link.textContent = el.dataset.label || address;
      link.className = el.className.replace('js-email', '').trim();
      el.replaceWith(link);
    });
  }

  function wireBibtexToggles() {
    document.querySelectorAll('[data-bibtex-toggle]').forEach(btn => {
      const target = document.getElementById(btn.getAttribute('aria-controls'));
      if (!target) return;
      btn.addEventListener('click', () => {
        const willOpen = target.hasAttribute('hidden');
        target.toggleAttribute('hidden', !willOpen);
        btn.setAttribute('aria-expanded', String(willOpen));
      });
    });
  }

  revealEmail();
  wireBibtexToggles();
})();
