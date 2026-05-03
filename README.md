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

Useful local preview URLs:

- Home page: http://localhost:8000/
- Blog index: http://localhost:8000/posts/
- First published series post: http://localhost:8000/posts/evaluating-ai-decisions-01-why-measure.html
- Resume PDF: http://localhost:8000/resume.pdf

Stop the local server with `Ctrl+C` in the terminal where it is running.

## Repository structure

- `index.html`, `styles.css`, and `script.js` define the main static site.
- `posts/` contains blog source Markdown, published HTML, and Quarto assets required by the published posts.
- `posts.json` and `projects.json` power the dynamic post and project listings.
- `resume.pdf` is the public resume linked from the site.
- `Jeff_Helzner_Resume.md` is the resume source used by `scripts/generate_resume_pdf.py`.
- `sitemap.xml`, `robots.txt`, and `feed.xml` support search indexing and feed discovery.

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

## Blog publishing workflow

The blog uses Quarto for Markdown-authored posts. Source drafts live in `posts/*.md`; published pages are committed as `posts/*.html` because GitHub Pages serves this repository directly.

After editing Quarto posts, render them from the `posts/` directory:

```bash
cd posts
quarto render
```

Copy the generated publishable article HTML and required assets from `posts/_site/` into `posts/` before committing. Do not commit `posts/_site/`; it is a local build directory.

Update `posts.json`, `sitemap.xml`, and `feed.xml` when publishing new posts.

## Resume workflow

The site links to `resume.pdf`. To regenerate it from `Jeff_Helzner_Resume.md`, run:

```bash
python3 scripts/generate_resume_pdf.py
```

The script writes intermediate HTML to `.resume-build/` and updates `resume.pdf` in the repository root.

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

## Review workflow

- Preferred feedback channel: inline HTML comments inside Markdown drafts in the `posts/` directory. Insert comments like:

	```markdown
	<!-- COMMENT: Replace "This method" with "The SEU-based method" for clarity. -->
	```

- For longer or numbered feedback, create a separate file `posts/<slug>.feedback.md` containing numbered items that reference headings or short quotes from the draft.
- Rounds are open-ended — we'll iterate until you're satisfied. As a guideline, expect 2–3 rounds for a typical post but we'll continue as needed.
- My update process: I extract high-level versus line-level items, implement edits in the draft, and add a short changelog at the top of the revised Markdown (for example: "Revision 2: clarified X; tightened argument in section 3"). When you approve, I will set `draft: false` in the post frontmatter and update `posts.json`.
- To publish: add the corresponding `posts.json` entry (see examples above), commit, and push to the repository.

## Notes

- The deployed site is static HTML/CSS/JS. Quarto and the resume script are local authoring tools whose generated public artifacts are committed to the repo.
- Scripted assets: see `scripts/` and the archived asset utilities for generation helpers.
- Tested in current desktop Chrome and Firefox; if you notice layout issues in other browsers or mobile, please report them.

## License

If you want to include a license, add a `LICENSE` file to the repo and reference it here.

---

If you want, I can also:
- add the sample JSON entries to `projects.json` and `posts.json` as commented examples, or
- open a short CONTRIBUTING.md with contributor guidance.