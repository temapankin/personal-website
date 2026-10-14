# artempankin.com

Personal academic site for Artem Pankin (urban researcher, MCRP student at Rutgers Bloustein School). Plain static HTML/CSS/JS, deployed from this repo (custom domain in `CNAME`). No build step, no framework.

## Files
- `index.html`, `publications.html`, `projects.html` — the three pages; `404.html`.
- `style.css` — single stylesheet for every page. Colors are CSS variables on `:root` using `light-dark()`, so dark mode works automatically when you reuse them.
- `script.js` — adds the theme toggle into `.head-nav`, the back-to-top button, and assembles the obfuscated email (`.js-email`). Don't hard-code the email address in HTML.
- `images/` — project images. Each has a `.webp` plus a `.png`/`.jpg` fallback, used with `<picture>`. Keep each WebP under ~110 KB (1200×800 for half-width tiles, 1600 wide for the lead tile). Delete images nothing references; git history keeps them.
- `.viz/` — gitignored scratch area for regenerating banner images (see below). Never commit it; `rm -rf .viz` is safe.

## Conventions
- Keep the minimal look: system-ui font stack, `#FCFCFA` / `#1a1a1a` grounds, hairline borders, Rutgers red `#CC0033` only on link hover. No new fonts, libraries or frameworks.
- Always use the existing variables (`--global-text-color`, `--global-text-color-light`, `--global-dark-border-color`, `--global-hover-bg`) instead of new hex values, so light and dark mode both work.
- `--global-text-color-light` is `#5f6670` in light mode for WCAG AA contrast. Don't lighten it.
- Links inside `.page` get underline + red hover from `.page a`; override with `.page a.<class>` when a component needs different behavior.
- Images: set `width`/`height`, `loading="lazy"`, `decoding="async"`, meaningful `alt`. Exception: the first image on a page (the lead Selected tile) gets `fetchpriority="high"` and no `loading="lazy"`, since it's the largest above-the-fold paint.
- `og:image` / `twitter:image` must be JPG or PNG (many crawlers ignore WebP); prefer JPG for photos and maps.
- Check changes at 1280px and 390px wide, in light and dark mode, before committing.

## Projects page design (Selected + More)
Chosen after surveying viz-focused planning labs and data-viz researchers (Columbia Center for Spatial Research, Truth & Beauty, Visual Cinnamon, Lisa Charlotte Muth, Stamen, Leventhal Center, Geoff Boeing, Kyle Walker and others). Shared pattern: a short selected set with images, then a text-only list; one title + one sentence per item; metadata as plain text; no tags, pills or decoration; the work itself carries the design.

- **Selected** (`.selected-grid`, `.sel-tile`): image-led tiles, each one `<a>` link. Order: meta line → title → one sentence. `.sel-tile--wide` spans both columns (used for the lead project). Tile images are rendered at the exact displayed ratio (3:2; the wide tile is 16:9 on desktop, 3:2 under 640px), so nothing is cropped. Mark external live sites with `↗` plus visually-hidden "(opens in a new tab)".
- **More** (`.more-list`, `.more-item`): text-only rows for smaller or course projects — title link, one sentence, small `paper` / `code` links.
- Promote a project from More to Selected only when it has a strong map or figure; drop the weakest Selected tile to More if Selected passes ~4–6 tiles.

## Banner images (Selected tiles)
Wired into `projects.html` October 2026. Each image is generated in `.viz/` from the project's own data or published results, one idea per image, with colors from the dataviz skill's method checked with its `validate_palette.js` (run with `.viz/env/bin/node`; re-run whenever a color changes). Maps carry no labels or legends: at tile size (half tiles show at ~507 px desktop, ~358 px phone, from 1200 px sources) text can't be read, so the shape has to carry the idea.

- `urban-heat-map.*` (1600×1066, lead tile, also `og:image`) — Outdoor Heat Exposure Index by NTA, exactly as published by urbanheat.nyc (`NTA_Outdoor_Heat_Index.csv`, 2010 NTA codes). No new heat analysis: Artem asked that heat be shown only from the portal. 2010 NTA shapes from a simplified public mirror (`nycehs/NYC_geography`, NTA.geo.json) clipped to the 2020 NTA shoreline. Beige land `#f1eee8`, pale blue water `#dde5ea`, `#FCFCFA` gaps. Warm ordinal ramp `#ee9c6e #e07a52 #cc5a3e #a83a30 #7d2426`, equal bins over 1.6–4.4. Frame: center 992000, 193000 (EPSG 2263), 286,000 ft wide, so all five boroughs fit the 16:9 band the desktop wide tile shows; TIGER water under 2e5 m² is dropped to keep context quiet.
- `citibike-streetflows-map.*` (1200×800) — all-day trip volume from the StreetFlows repo's `docs/data/trips` parquet (`geom` = polyline6 routes), Lower Manhattan + Brooklyn (center −73.978, 40.722, 32,000 ft wide). Artem asked for the live site's palette: its dark-matter look (land `#1a1a1a`, water `#0d0d0d`, NJ from state outlines, NYC from the 2020 NTA shoreline) and its Magma flow ramp (`PALETTES.magma` in the site's `docs/index.html`) on log volume, alpha 45→235 and additive blend like its deck.gl layer. Streets below 0.2 on the normalized log-volume scale drop out; lines are widened to ~3 px so they survive the tile scale.
- `climate-risk.*` (1200×800, PNG fallback) — the paper's fig6 margins plot redrawn (Artem chose the chart over a map; a seasonal-share choropleth and a FEMA flood-zone map were both tried and rejected). Lines are exact from model (3) in the repo's `figures/hedonic_regression_results.tex`; the repo doesn't publish the vcov, so the 95% bands are rebuilt from the published figure (SEs read at 40% and 80%, delta-method variance fitted through them). Low `#5f6670` (site gray), Moderate `#d9673f`, High `#9c2f2a`, validated all-pairs on `#FCFCFA` (CVD ΔE 9.8, normal-vision 16.2, all ≥3:1); direct labels in text ink, 30 px type (~13 px on desktop, ~8 px on phones).

Regenerating (all inside `.viz/`): conda env at `.viz/env` (Python 3.12 + geopandas/matplotlib/pillow/pyarrow/polyline/playwright + nodejs), Chromium for Playwright at `.viz/browsers` (set `PLAYWRIGHT_BROWSERS_PATH`). Scripts: `heat.py`, `flows.py`, `climate_chart.py`; output lands in `.viz/out/`. Export WebP (quality ~80–90, method 6) + JPG/PNG to `images/` and check `projects.html` at 1280/390, light and dark. Unused experiments still in `.viz/`: `climate_map.py` / `climate.py` (seasonal choropleth), `flood.py` / `flood_map.py` (FEMA NFHL flood zones, cached in `data/nfhl.geojson`), `shot.py` (portal screenshot).

## Open items
- Add years to Selected meta lines and as a leading column in More rows (not added yet because they weren't known).
- Add the thesis/manuscript "Climate Ambition Meets Urban Aspiration" as a Selected tile once there's an image (e.g. a map of NYC green-tech sites) and a link.
- `favicon.ico` is 15 KB (three icon sizes); 16 + 32 px only would be a few KB.
- Possible next step: a case-study page template so tiles can link to an on-site page instead of straight to GitHub.
