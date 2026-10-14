# artempankin.com

Personal academic site for Artem Pankin (urban researcher, MCRP student at Rutgers Bloustein School). Plain static HTML/CSS/JS, deployed from this repo (custom domain in `CNAME`). No build step, no framework.

## Files
- `index.html`, `publications.html`, `projects.html` — the three pages; `404.html`.
- `style.css` — single stylesheet for every page. Colors are CSS variables on `:root` using `light-dark()`, so dark mode works automatically when you reuse them.
- `script.js` — adds the theme toggle into `.head-nav`, the back-to-top button, and assembles the obfuscated email (`.js-email`). Don't hard-code the email address in HTML.
- `images/` — project images. Each has a `.webp` plus a `.png`/`.jpg` fallback, used with `<picture>`.

## Conventions
- Keep the minimal look: system-ui font stack, `#FCFCFA` / `#1a1a1a` grounds, hairline borders, Rutgers red `#CC0033` only on link hover. No new fonts, libraries or frameworks.
- Always use the existing variables (`--global-text-color`, `--global-text-color-light`, `--global-dark-border-color`, `--global-hover-bg`) instead of new hex values, so light and dark mode both work.
- `--global-text-color-light` is `#5f6670` in light mode for WCAG AA contrast. Don't lighten it.
- Links inside `.page` get underline + red hover from `.page a`; override with `.page a.<class>` when a component needs different behavior.
- Images: set `width`/`height`, `loading="lazy"`, `decoding="async"`, meaningful `alt`.
- Check changes at 1280px and 390px wide, in light and dark mode, before committing.

## Projects page design (Selected + More)
Chosen after surveying viz-focused planning labs and data-viz researchers (Columbia Center for Spatial Research, Truth & Beauty, Visual Cinnamon, Lisa Charlotte Muth, Stamen, Leventhal Center, Geoff Boeing, Kyle Walker and others). Shared pattern: a short selected set with images, then a text-only list; one title + one sentence per item; metadata as plain text; no tags, pills or decoration; the work itself carries the design.

- **Selected** (`.selected-grid`, `.sel-tile`): image-led tiles, each one `<a>` link. Order: meta line → title → one sentence. `.sel-tile--wide` spans both columns (used for the lead project). `.sel-img--contain` shows charts whole instead of cropping their axes/legend. Mark external live sites with `↗` plus visually-hidden "(opens in a new tab)".
- **More** (`.more-list`, `.more-item`): text-only rows for smaller or course projects — title link, one sentence, small `paper` / `code` links.
- Promote a project from More to Selected only when it has a strong map or figure; drop the weakest Selected tile to More if Selected passes ~4–6 tiles.

## Open items
- Add years to Selected meta lines and as a leading column in More rows (not added yet because they weren't known).
- Add the thesis/manuscript "Climate Ambition Meets Urban Aspiration" as a Selected tile once there's an image (e.g. a map of NYC green-tech sites) and a link.
- Replace the Jersey Shore chart with a map if one exists; charts make weaker tiles than maps.
- Possible next step: a case-study page template so tiles can link to an on-site page instead of straight to GitHub.
