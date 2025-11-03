(function () {
  const $year = document.getElementById('year');
  if ($year) $year.textContent = new Date().getFullYear();

  const cfg = (() => {
    const b = document.body?.dataset || {};
    return {
      source: (b.projectsSource || 'manual').toLowerCase(), // manual|github|both
      username: (b.ghUsername || '').trim(),
      topic: (b.githubTopicFilter || '').trim().toLowerCase(),
    };
  })();

  const $list = document.getElementById('projects-list');
  const $status = document.getElementById('projects-status');

  function setStatus(msg) {
    if ($status) $status.textContent = msg || '';
  }

  function card({ title, description, href, repoHref, stars, topics = [] }) {
    const el = document.createElement('article');
    el.className = 'card';
    el.innerHTML = `
      <h3><a href="${href}" target="_blank" rel="noopener">${escapeHtml(title)}</a></h3>
      ${description ? `<p>${escapeHtml(description)}</p>` : ''}
      <div class="meta">
        ${stars != null ? `<span class="badge">★ ${stars}</span>` : ''}
        ${repoHref ? `<a href="${repoHref}" target="_blank" rel="noopener">Source</a>` : ''}
        ${topics.slice(0, 3).map(t => `<span class="badge">${escapeHtml(t)}</span>`).join('')}
      </div>
    `;
    return el;
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  async function loadManual() {
    try {
      const res = await fetch('./projects.json', { cache: 'no-store' });
      if (!res.ok) throw new Error(`projects.json: ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data)) return [];
      return data.map(p => ({
        title: p.title || p.name || 'Untitled',
        description: p.description || '',
        href: p.url || p.homepage || p.repo || '#',
        repoHref: p.repo || null,
        stars: null,
        topics: p.tags || [],
        _key: (p.repo || p.url || p.name || '').toLowerCase(),
      }));
    } catch {
      return [];
    }
  }

  async function loadGithub() {
    if (!cfg.username) {
      setStatus('Tip: set data-gh-username on <body> to auto-load GitHub repos.');
      return [];
    }
    try {
      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(cfg.username)}/repos?per_page=100&sort=updated`, {
        headers: {
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });
      if (res.status === 403) {
        setStatus('GitHub API rate limit reached. Try again later or rely on projects.json.');
        return [];
      }
      if (!res.ok) throw new Error(`GitHub: ${res.status}`);
      const repos = await res.json();
      const filtered = repos.filter(r => {
        if (r.fork || r.archived) return false;
        if (cfg.topic) {
          const topics = Array.isArray(r.topics) ? r.topics.map(t => String(t).toLowerCase()) : [];
          if (!topics.includes(cfg.topic)) return false;
        }
        return true;
      });
      return filtered.map(r => ({
        title: r.name,
        description: r.description || '',
        href: r.homepage || r.html_url,
        repoHref: r.html_url,
        stars: r.stargazers_count ?? null,
        topics: Array.isArray(r.topics) ? r.topics : [],
        _key: (r.full_name || r.name || '').toLowerCase(),
      }));
    } catch (e) {
      setStatus('Could not load GitHub projects.');
      return [];
    }
  }

  function render(items) {
    if (!$list) return;
    $list.innerHTML = '';
    if (!items.length) {
      setStatus('No projects yet. Add entries to projects.json or enable GitHub auto-loading.');
      return;
    }
    setStatus('');
    const frag = document.createDocumentFragment();
    items.forEach(i => frag.appendChild(card(i)));
    $list.appendChild(frag);
  }

  function dedupe(items) {
    const seen = new Set();
    const out = [];
    for (const it of items) {
      const key = it._key || (it.href || '').toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        out.push(it);
      }
    }
    return out;
  }

  async function init() {
    const wantsManual = cfg.source === 'manual' || cfg.source === 'both';
    const wantsGithub = cfg.source === 'github' || cfg.source === 'both';

    const [manual, gh] = await Promise.all([
      wantsManual ? loadManual() : Promise.resolve([]),
      wantsGithub ? loadGithub() : Promise.resolve([]),
    ]);

    const combined = dedupe([...(manual || []), ...(gh || [])]);
    render(combined);
  }

  init();
})();
