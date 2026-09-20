# Feature: Modern landing page redesign (feat/modern-landing-page)

## Objective
Replace the legacy `index.html` (custom CSS + AOS + Raleway) with a modernized, polished version of the Stitch dark Tailwind design: professional, natural copy; real local project photos instead of AI mocks; complete SEO/a11y; mobile menu; real map; functional WhatsApp form.

## Why
- The current site is the legacy custom-CSS version.
- The Stitch redesign (dark Tailwind, `/tmp/opencode/stitch-design.html` source) has real defects: AI mock images from `lh3.googleusercontent.com`, fake map image, generic Facebook link, handle typo ("UyConstru ccionesy"), no mobile menu, no SEO/OG meta, no favicon, missing `alt`, duplicate Material Symbols link, form stub with `alert()`.
- Repo already holds real project photos (`assets/images/`), the real Google Maps embed, and real social/contact data from the legacy site — use them.

## Scope
- `index.html`: replace fully with polished design. Keep Tailwind CDN + Google Fonts + Material Symbols (no build step; GitHub Pages).
- Preserve the inline `tailwind.config` (colors/fonts/spacing/radii) byte-for-byte except removing the duplicate Material Symbols `<link>`.
- `README.md`: update to describe the new stack.
- Remove legacy code assets: `main.js`, `style.css`, `assets/stylesheet/`, `assets/fonts/` (Raleway). Keep `assets/images/` photos.

## Constraints
- All UI copy in Spanish (site language), neutral professional UY register, warm but not salesy.
- Images: local relative paths only (`assets/images/...`); no remote AI URLs; no `data-alt` (real `alt`).
- No AI attribution in commits; conventional commits only.
- Do not touch `.atl/` or `odd/` files.

## Tasks
- [x] T1 — Migrate design into `index.html`: copy from `/tmp/opencode/stitch-design.html`, keep Tailwind config/styles, apply the full copy replacement map (see writer brief), swap in local real photos.
- [x] T2 — Restore head: SEO/OG/Twitter meta, canonical, hreflang, theme-color, favicon, JSON-LD (GeneralContractor with real data), single fonts link + preconnect, proper `<title>`.
- [x] T3 — Fix UX/functional gaps: mobile hamburger menu, active nav on scroll, go-top button, real Google Maps iframe, `for`/`id` on form fields + autocomplete, submit → prefilled WhatsApp message, auto year, `loading=lazy`/`fetchpriority`.
- [x] T4 — Update README; delete legacy `main.js`, `style.css`, `assets/stylesheet/`, `assets/fonts/`.
- [x] T5 — Verify locally: serve + curl checks (no `lh3.googleusercontent.com`, no `data-alt`, real FB URL, map embed present, key strings), parse sanity, then work-unit commits on `feat/modern-landing-page`.

## Verification evidence
- Writer checks all green: HTTP 200 (index + images), lh3/data-alt/alert = 0, Material+Symbols = 1, fb-profile = 4, maps/embed = 1, wa.me = 3, node sanity ok, config/style blocks byte-identical to source.
- Parent spot check: professional copy strings present, real emails/FB/map present, mobile-menu/contact-form/go-top/year present, JSON-LD/OG/favicon present, 0 AI-mock refs.
- Commits on `feat/modern-landing-page`:
  - 71890bc `feat: modernize landing page with professional copy and real imagery`
  - 84739a8 `chore: remove legacy code assets replaced by the new design`

## Acceptance criteria
- Page renders the dark design at desktop and mobile widths; no horizontal overflow; mobile nav opens/closes.
- Zero references to AI mock URLs; all `<img>` have real `alt` and local `src`.
- Contact data matches legacy: 094 172 582, construccionesuy1@gmail.com, info@uyconstrucciones.com.uy, @Uy_construcciones2024, FB https://www.facebook.com/profile.php?id=61555611915723, Del Comercio 814, 15900 La Paz, Canelones.
- Form opens WhatsApp (wa.me/598094172582) with prefilled message; no alert() stub left.
- SEO meta + OG + Twitter + JSON-LD present; canonical points to https://uyconstrucciones.com.uy/.

## Authorized scope
Explicit user request: review/modernize the whole site, improve copy professionally, swap AI mocks for realistic photos. Deleting replaced legacy files is part of modernization; git history preserves them.

## Notes
- ODD TDD: none configured for this repo (static site, no test runner). Verification = static checks + local serve + parent spot check + manual browser check.
- Delivery: single work-unit commits on feature branch; push/PR/merge remain the user's decision.