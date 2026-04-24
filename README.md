<div align="center">
  <h1>NullCipherr.github.io</h1>
  <p><i>Bilingual portfolio website built with semantic HTML, modern CSS, and vanilla JavaScript</i></p>

  <p>
    <img src="https://img.shields.io/badge/HTML5-Semantic-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-Design%20System-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/Deploy-GitHub%20Pages-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub Pages" />
  </p>
</div>

---

## Documentation

Project documentation is centralized in this README for faster onboarding and maintenance.

Related repositories:

- [portfolio-os](https://github.com/NullCipherr/portfolio-os)
- [portfolio-terminal](https://github.com/NullCipherr/portfolio-terminal)
- [portfolio-content](https://github.com/NullCipherr/portfolio-content)

---

## Preview

This project is a static bilingual portfolio (`pt-BR`/`en`) with a technical blog and SEO-focused content architecture.

- Public URL: `https://nullcipherr.github.io/`
- Main entrypoint: `index.html`
- Blog entrypoint: `blog/index.html`

---

## Overview

**NullCipherr.github.io** is a professional portfolio website designed for discoverability, performance, and conversion.

The project prioritizes:

- Semantic structure and accessibility-first HTML;
- Clear visual hierarchy and responsive layout behavior;
- Lightweight runtime with vanilla JavaScript;
- Built-in i18n workflow with locale JSON dictionaries;
- Technical content strategy through pillar articles and blog navigation.

---

## Features

- **Bilingual interface** with runtime switch (`pt-BR` and `en`).
- **Hero + showcase flow** with direct navigation to portfolio variants.
- **Structured sections** for experience, skills, projects, content, FAQ, and contact.
- **Technical blog** with dedicated hub and article pages.
- **Performance-minded media loading** for hero background video/image.
- **SEO foundation** with metadata, Open Graph, robots, sitemap, and JSON-LD schema.

---

## Architecture

High-level application flow:

1. `index.html` renders the full portfolio experience and section layout.
2. `css/style.css` provides the global design system and responsive behavior.
3. `js/script.js` controls interactions (mobile menu, smooth scroll, observer effects, i18n, hero media strategy).
4. `locales/*.json` stores translation keys and copy contracts.
5. `blog/index.html` and `blog/artigos/*.html` provide content distribution and internal linking.
6. `robots.txt` and `sitemap.xml` support crawl/index pipelines.
7. `404.html` handles invalid routes in static hosting.

---

## Performance

Current optimization choices:

- Static architecture with no framework runtime overhead;
- Lazy strategy for heavy hero media when applicable;
- Reduced-motion and save-data checks in JavaScript behavior;
- Optimized asset formats (`webp`, compressed video variants);
- Minimal dependency surface (no external JS framework required).

---

## Technical Decisions

- **Vanilla stack** for maximal control and low operational complexity.
- **Locale dictionaries** decoupled from markup for maintainable i18n.
- **Single-page + content hub model** to combine branding and technical authority.
- **SEO as baseline**, not afterthought, through metadata and structured data.

---

## Roadmap

- Expand technical blog cadence with new long-form pillar articles.
- Add automated lint/validation workflow for HTML/CSS/SEO checks.
- Improve image/video optimization pipeline for content publishing.
- Add richer conversion tracking and observability for content funnels.

---

## Tech Stack

- **Markup**: HTML5
- **Styling**: CSS3
- **Runtime**: Vanilla JavaScript
- **Localization**: JSON locale dictionaries
- **Hosting**: GitHub Pages

---

## Project Structure

```text
.
├── assets/
│   ├── images/
│   └── videos/
├── blog/
│   ├── index.html
│   └── artigos/
├── css/
│   ├── style.css
│   └── blog.css
├── js/
│   └── script.js
├── locales/
│   ├── pt-br.json
│   └── en.json
├── 404.html
├── index.html
├── robots.txt
├── sitemap.xml
└── README.md
```

---

## Getting Started

### Prerequisites

- Python 3 (or any static file server)

### Run locally

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

---

## Environment Variables

This repository does not require runtime environment variables.

---

## NPM Scripts

Not applicable (no Node-based runtime required to serve the project).

---

## CI/CD

Deployment is currently managed through GitHub Pages configuration.

Recommended next step:

- Add GitHub Actions for static checks and deployment verification.

---

## Deployment

Primary deployment target: GitHub Pages.

```bash
git push origin main
```

After pushing, validate:

- Public URL availability;
- `robots.txt` and `sitemap.xml` access;
- `404.html` fallback behavior;
- i18n toggle behavior on production.

---

## License

Follow the license configured for this repository.
