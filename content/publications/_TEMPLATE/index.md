---
# ==============================================================
# HOW TO ADD A NEW PUBLICATION
# ==============================================================
# 1. Copy the entire folder `_TEMPLATE` and rename it to something
#    short describing the paper, e.g. `eclipsing-binaries-2026`
# 2. Edit the fields below in your new folder's index.md
# 3. Optionally add a `featured.jpg` image to the folder
# 4. Commit and push — the paper will appear automatically
# ==============================================================

draft: true
build:
  render: never
  list: never

title: "Full paper title goes here"

# List all authors. Use `me` (no quotes) for yourself so your
# profile is linked. For others, write their name as a string.
authors:
  - me
  - A. N. Author
  - Another Author

# Publication date (YYYY-MM-DDT00:00:00Z)
date: "2026-01-01T00:00:00Z"
publishDate: "2026-01-01T00:00:00Z"

# Publication type — choose ONE:
#   article-journal   → journal article
#   paper-conference  → conference proceedings
#   article           → preprint / working paper
#   book              → book
#   chapter           → book chapter
#   thesis            → thesis
publication_types: ["article-journal"]

# Journal / conference name. Use *italics* with asterisks.
publication: "*Journal Name*, Vol. X, Pages Y–Z"
publication_short: "*Short Name*"

# Abstract — paste the full abstract here
abstract: |
  Paste the abstract of the paper here.

# A one-line summary shown in list views (optional)
summary: One sentence summary of the paper.

# Tags help with filtering. Add relevant keywords.
tags:
  - Eclipsing Binaries
  - Stellar Astrophysics

# Set to true to highlight this paper on the homepage
featured: false

# External links — add as many as needed, or remove unused ones.
# Common types: pdf, code, dataset, slides, video, poster
links:
  - name: "Journal"
    url: "https://doi.org/XXXXX"   # DOI link
  # - name: "arXiv"
  #   url: "https://arxiv.org/abs/XXXX.XXXXX"
  # - name: "PDF"
  #   url: "/uploads/paper.pdf"    # if you upload the PDF to static/uploads/

# Featured image (optional): add featured.jpg to this folder
image:
  caption: ''
  focal_point: ""
  preview_only: false

projects: []
slides: ""
---

<!-- Optional: add notes, supplementary info, or a brief description below -->
