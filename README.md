# jeffhelzner.github.io

Personal website for Jeff Helzner, a decision scientist building AI, Bayesian, and machine learning systems that improve expert judgment.

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
- Resume PDF: http://localhost:8000/resume.pdf

Stop the local server with `Ctrl+C` in the terminal where it is running.

## Repository structure

- `index.html`, `styles.css`, and `script.js` define the site. Homepage content is written directly in `index.html`.
- `projects.json` and `papers.json` hold reference metadata for public projects and papers.
- `resume.pdf` is the public resume linked from the site.
- `Jeff_Helzner_Resume.md` is the resume source used by `scripts/generate_resume_pdf.py`.
- `sitemap.xml` and `robots.txt` support search indexing.

## Visitor analytics

The site uses a small GoatCounter loader in [analytics.js](analytics.js). It only runs on `jeffhelzner.github.io`, so local previews are not counted.

To activate tracking, create a GoatCounter site for `jeffhelzner.goatcounter.com` at https://www.goatcounter.com. If you choose a different GoatCounter code or provider, update `goatCounterEndpoint` in [analytics.js](analytics.js).

Pages include [analytics.js](analytics.js) directly.

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

## Notes

- The deployed site is static HTML/CSS/JS. The resume script is a local authoring tool whose generated `resume.pdf` is committed to the repo.
- Tested in current desktop Chrome and Firefox; if you notice layout issues in other browsers or mobile, please report them.

## License

If you want to include a license, add a `LICENSE` file to the repo and reference it here.