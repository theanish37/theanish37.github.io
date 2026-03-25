# How to Update Your Website

Quick reference for manually adding content. After any edit, commit and push to deploy.

---

## Add a New Paper

1. Copy `content/publications/_TEMPLATE/` → rename to a short slug, e.g. `content/publications/eclipsing-binaries-2026/`
2. Edit `index.md` inside — fill in title, authors, date, journal, abstract, links
3. (Optional) Add a `featured.jpg` image to the folder

---

## Add a New Project

1. Copy `content/projects/_TEMPLATE/` → rename it, e.g. `content/projects/binary-pipeline/`
2. Edit `index.md` — fill in title, description, links, tags
3. (Optional) Add a `featured.png` image

---

## Update Experience / Education / Awards / Skills

Edit `data/authors/me.yaml` — every section has comments explaining the format.

**Add a work entry:**
```yaml
work:
  - role: Your Job Title
    org: Organisation Name
    start: 2026-01-01
    end: 2026-12-31   # omit if still ongoing
    summary: |
      What you did.
```

**Add an education entry:**
```yaml
education:
  - degree: Degree Name
    institution: University Name
    start: 2026-01-01
    end: 2030-01-01
    summary: |
      Optional details.
```

**Add an award:**
```yaml
awards:
  - title: Award Name
    awarder: Awarding Body
    date: "2026-01-01"
    summary: Description.
    icon: hero/trophy
```

**Add a skill:**
```yaml
skills:
  - name: Group Name
    items:
      - label: Skill Name
        level: 4   # 1 (beginner) to 5 (expert)
```

---

## Update the Research Description (Homepage)

Edit the `text:` field in the `markdown` block inside `content/_index.md`.
Use `**bold**` for emphasis and blank lines between paragraphs.

---

## Add/Attend a Course or Workshop

There is no dedicated "courses" content type yet. Options:
- **List them in your bio** (`data/authors/me.yaml` → `bio:`)
- **Add a work entry** for a summer school (role: Attendee, org: School Name)

---

## Update Your CV PDF

Replace the file at `static/uploads/` with your new PDF (keep the same filename),
or upload a new file and update the `url:` in `content/_index.md`:
```yaml
button:
  text: Download CV
  url: uploads/Your_New_CV.pdf
```

---

## Deploy

```bash
cd theanish37.github.io
git add .
git commit -m "Update: describe what you changed"
git push origin main
```
GitHub Actions will automatically rebuild and publish the site.
