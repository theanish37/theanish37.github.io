---
# ==============================================================
# HOW TO ADD A NEW PROJECT
# ==============================================================
# 1. Copy this entire `_TEMPLATE` folder and rename it using a
#    short slug, e.g. `eclipsing-binary-pipeline` or `debcc-v2`
# 2. Edit the fields below in your new folder's index.md
# 3. Optionally add a `featured.png` or `featured.jpg` image
#    (displayed as the card thumbnail — aim for 16:9 ratio)
# 4. Commit and push — the card appears automatically on /projects/
#
# REMOVING A PROJECT: delete its folder entirely.
# REORDERING: change the `date` field — newer dates appear first.
# ==============================================================

draft: true
build:
  render: never
  list: never

# Project title — shown as the card heading
title: Project Title Here

# Date the project started or was published (controls sort order)
date: 2026-01-01

# External links shown as icon buttons on the card.
# Common types: site, pdf, code, video, dataset, slides, poster
links:
  - type: site
    url: https://github.com/theanish37/your-repo
  # - type: pdf
  #   url: /uploads/report.pdf
  # - type: video
  #   url: https://youtube.com/watch?v=...

# Tags shown below the card description
tags:
  - Eclipsing Binaries
  - Python
  - Photometry

---

<!-- SHORT DESCRIPTION (shown in the project card, before <!--more-->)
     Keep it to 1–3 sentences. -->
Brief description of the project.

<!--more-->

<!-- EVERYTHING BELOW appears only on the full project detail page. -->

## Overview

Longer description of the project — background, methods, results, etc.
