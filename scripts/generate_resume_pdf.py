#!/usr/bin/env python3
"""
Generate resume HTML from Markdown and print to PDF using headless Chrome.

Creates `Jeff_Helzner_Resume.html` and `Jeff_Helzner_Resume.pdf` in the repository root.
"""
import os
import sys
import subprocess
import shutil

MD_FILE = 'Jeff_Helzner_Resume.md'
HTML_FILE = 'Jeff_Helzner_Resume.html'
PDF_FILE = 'Jeff_Helzner_Resume.pdf'

def ensure_markdown():
    try:
        import markdown
        return markdown
    except Exception:
        print('`markdown` package not found; installing into current Python environment...', file=sys.stderr)
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'markdown'])
        import importlib
        return importlib.import_module('markdown')


def main():
    md = ensure_markdown()

    if not os.path.exists(MD_FILE):
        print(f"Markdown file not found: {MD_FILE}", file=sys.stderr)
        sys.exit(1)

    with open(MD_FILE, 'r', encoding='utf-8') as f:
        text = f.read()

    style = ''
    stripped = text.lstrip()
    if stripped.startswith('<style'):
        # find the first <style ...> and matching </style>
        start = text.find('<style')
        end = text.find('</style>', start)
        if end != -1:
            end_tag_end = end + len('</style>')
            style = text[start:end_tag_end]
            # remove the block from the markdown we will convert
            text = text[:start] + text[end_tag_end:]

    html_body = md.markdown(text, extensions=['extra', 'sane_lists', 'smarty'])

    html = '<!doctype html>\n<html>\n<head>\n<meta charset="utf-8">\n'
    if style:
        html += style + '\n'
    html += '</head>\n<body>\n' + html_body + '\n</body>\n</html>'

    with open(HTML_FILE, 'w', encoding='utf-8') as f:
        f.write(html)

    # Locate Chrome/Chromium
    candidates = [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Chromium.app/Contents/MacOS/Chromium',
        'google-chrome',
        'chrome',
        'chromium',
    ]
    chrome = None
    for c in candidates:
        # shutil.which works for commands in PATH
        path = shutil.which(c) if not os.path.exists(c) else c
        if path and os.path.exists(path):
            chrome = path
            break

    if not chrome:
        print('Chrome/Chromium not found; cannot print to PDF.', file=sys.stderr)
        sys.exit(2)

    file_url = 'file://' + os.path.abspath(HTML_FILE)
    cmd = [chrome, '--headless', '--disable-gpu', f'--print-to-pdf={PDF_FILE}', file_url]
    print('Running:', ' '.join(cmd))
    proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if proc.returncode != 0:
        print('Chrome failed to create PDF', file=sys.stderr)
        print('stdout:\n', proc.stdout.decode('utf-8', errors='replace'))
        print('stderr:\n', proc.stderr.decode('utf-8', errors='replace'))
        sys.exit(proc.returncode)

    if os.path.exists(PDF_FILE):
        print('Created', PDF_FILE)
    else:
        print('PDF not created; check Chrome output above.', file=sys.stderr)
        sys.exit(3)


if __name__ == '__main__':
    main()
