# Projects data (projects.json)

Use projects.json to manually curate items shown in the Projects section. Keep it as a JSON array of objects (no comments).

Fields per item:
- name (string, optional): short identifier.
- title (string, recommended): display name.
- description (string, optional): short one-liner.
- url (string, optional): external site or demo link.
- repo (string, optional): GitHub repository URL.
- tags (string[], optional): keywords or topics.

Example
```json
[
  {
    "name": "my-project",
    "title": "My Project",
    "description": "Short one-line summary.",
    "url": "https://example.com",
    "repo": "https://github.com/USER/my-project",
    "tags": ["typescript", "web"]
  }
]
```

Notes
- projects.json must be valid JSON (no trailing commas, no comments).
- You can combine curated items with GitHub repos if your page is configured to load both sources (set data-projects-source="both" and data-gh-username on <body>).
- Optional: set data-github-topic-filter (e.g., "showcase") on <body> to show only repos with that topic.
