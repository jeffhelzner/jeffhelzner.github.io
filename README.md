# jeffhelzner.github.io

Personal website for Jeff Helzner — exploring rational decision-making, logic, and uncertainty through code and applied research.

## Local development

- Open the site directly by double-clicking `index.html` in a browser.
- Or serve the directory with a simple static server for full functionality (recommended):

```bash
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Any static file server (Node `http-server`, `live-server`, etc.) works the same way.

## Adding projects and posts

Edit the JSON lists in the repo to add content. Examples below show the expected fields and formats.

- Example `projects.json` entry:

```json
{
	"name": "example-project",
	"title": "Example Project",
	"excerpt": "A one-line summary of the project.",
	"description": "Longer description or HTML for the project card.",
	"published": "2024-12-01",
	"url": "/projects/example-project/index.html",
	"repo": "https://github.com/jeffhelzner/example-project",
	"tags": ["research", "code"]
}
```

- Example `posts.json` entry:

```json
{
	"slug": "example-post",
	"title": "Example Post",
	"date": "2025-03-01",
	"summary": "A short summary for listing pages and social previews.",
	"url": "/posts/example-post.html"
}
```

Notes:
- Use ISO date format `YYYY-MM-DD` for the `published`/`date` fields.
- `url` may be a repo-relative path (starting with `/`) or an absolute URL. The site assumes repo-relative links for internal pages.
- The homepage reads [projects.json](projects.json) and [posts.json](posts.json) to render cards and lists.

When creating a post page, include minimal OG/Twitter meta tags for good previews. Example:

```html
<meta property="og:title" content="Example Post Title">
<meta property="og:description" content="A short summary for social previews.">
<meta property="og:url" content="https://jeffhelzner.github.io/posts/example-post.html">
<meta name="twitter:card" content="summary_large_image">
```

## Deployment (GitHub Pages)

This repository is configured to publish at https://jeffhelzner.github.io. Because the repository name is `jeffhelzner.github.io`, GitHub Pages serves the site from the repository root (typically the `main` branch) by default.

To publish changes:

```bash
git add .
git commit -m "Update site"
git push origin main
```

If you use a different default branch or a GitHub Pages configuration, update the repository settings accordingly.

## Contributing & contact

- Contributions are welcome via issues or pull requests. Please keep JSON entries consistent with the examples above.
- To contact the site owner, add an issue or open a PR with your suggested change.

## Notes

- The site is static HTML/CSS/JS and has no build step. Optional migration to a static site generator (e.g., Eleventy) is possible if you prefer Markdown authoring.
- Scripted assets: see the `assets/` folder (for example, `assets/gen_social_png.py`) for utilities used to generate social images.
- Tested in current desktop Chrome and Firefox; if you notice layout issues in other browsers or mobile, please report them.

## License

If you want to include a license, add a `LICENSE` file to the repo and reference it here.

---

If you want, I can also:
- add the sample JSON entries to `projects.json` and `posts.json` as commented examples, or
- open a short CONTRIBUTING.md with contributor guidance.