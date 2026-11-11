# sofia-portfolio

Responsive UX/UI designer portfolio for Sofia, hosted as a static site on GitHub Pages.

## Project structure

- `index.html` and `style.css` — portfolio landing page and shared base styles.
- `cases/<slug>/index.html` — individual case-study pages.
- `cases/case-study.css` — styles shared by case studies.
- `cases/<slug>/images/` — case-specific images.
- `images/` — shared artwork, icons, and project covers.
- `cv.pdf` — downloadable résumé.

The site has no build step or runtime dependencies; it uses plain HTML, CSS, and browser JavaScript.

## Local preview

From the repository root, start a static server:

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000/>. A local server is recommended so relative links and assets behave as they do on GitHub Pages.

## CSS and HTML conventions

- Keep CSS grouped in this order: design tokens, base styles, shared components, page-specific layout, then responsive and reduced-motion rules.
- Use lowercase kebab-case for class names and custom properties.
- Prefer component names with explicit roles (`project-card`, `case-figure`) over presentation-only names (`blue-box`). Use `__element` and `--modifier` consistently for new component classes, for example `project-card__title` and `project-card--featured`.
- Keep existing class names until all HTML and CSS references can be changed together. Avoid partial renames that leave markup and styles out of sync.
- Scope page-specific rules under a page root such as `.home` or `.case-page`; avoid broad selectors that unintentionally affect other pages.
- Preserve semantic HTML and native keyboard behavior. Add ARIA only when native semantics and visible labels are insufficient.
- Before removing a CSS rule or asset, search every HTML, CSS, and JavaScript file for its selector or path.

## Validation notes

There is currently no automated build or browser-test suite. After layout or interaction changes, manually check each page at mobile and desktop widths, keyboard navigation, reduced-motion settings, and current Chrome, Firefox, and Safari. Link and asset checks should be run separately; visual and assistive-technology checks are still required.
