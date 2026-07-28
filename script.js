(function () {
  const $year = document.getElementById('year');
  if ($year) $year.textContent = new Date().getFullYear();

  const $postsList = document.getElementById('posts-list');
  const $postsStatus = document.getElementById('posts-status');

  function setActiveNav() {
    const currentPath = window.location.pathname.replace(/\/+$|^\//g, '');
    document.querySelectorAll('nav a').forEach(a => {
      try {
        const url = new URL(a.href, window.location.origin);
        const targetPath = url.pathname.replace(/\/+$|^\//g, '');
        if (targetPath === currentPath || (currentPath === '' && targetPath === '')) {
          a.setAttribute('aria-current', 'page');
        } else {
          a.removeAttribute('aria-current');
        }
      } catch {
        // ignore invalid URLs
      }
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  async function loadPosts() {
    try {
      const res = await fetch('/posts.json', { cache: 'no-store' });
      if (!res.ok) throw new Error(`posts.json: ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data)) return [];
      return data.map(p => ({
        title: p.title || p.slug,
        description: p.summary || '',
        href: p.url || `/posts/${p.slug}.html`,
        date: p.date || '',
        _key: (p.slug || p.url || '').toLowerCase(),
      }));
    } catch (e) {
      return [];
    }
  }

  function renderPosts(items) {
    if (!$postsList) return;
    $postsList.innerHTML = '';
    if (!items.length) {
      if ($postsStatus) $postsStatus.textContent = 'No posts yet.';
      return;
    }
    if ($postsStatus) $postsStatus.textContent = '';
    const frag = document.createDocumentFragment();
    items.forEach(it => {
      const el = document.createElement('article');
      el.className = 'card';
      el.innerHTML = `
        <h3><a href="${it.href}">${escapeHtml(it.title)}</a></h3>
        ${it.description ? `<p>${escapeHtml(it.description)}</p>` : ''}
        ${it.date ? `<div class="meta"><span class="muted">${escapeHtml(it.date)}</span></div>` : ''}
      `;
      frag.appendChild(el);
    });
    $postsList.appendChild(frag);
  }

  function revealEmail() {
    document.querySelectorAll('.js-email').forEach(el => {
      const user = el.dataset.u;
      const domain = el.dataset.d;
      if (!user || !domain) return;
      const address = `${user}@${domain}`;
      const link = document.createElement('a');
      link.href = `mailto:${address}`;
      link.textContent = address;
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

  async function init() {
    if ($postsList) {
      const posts = await loadPosts();
      renderPosts(posts);
    }

    setActiveNav();
    revealEmail();
    wireBibtexToggles();
  }

  init();
})();
