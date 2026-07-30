# Agung Setiyadi Widyanto — Developer Portfolio

A modern, dark, futuristic personal portfolio for Agung Setiyadi Widyanto, a
high school software developer at **SMKN 6 Surakarta** (PPLG — Software and
Game Development).

## ✨ Features

- Dark futuristic theme — black / purple (`#8B5CF6`) / neon blue (`#3B82F6`)
- Glassmorphism cards, glowing ambient orbs, animated canvas particle background
- Custom animated cursor (desktop), loading screen, back-to-top button
- Typing animation in the hero, animated stat counters, animated skill bars
- Scroll-reveal animations (AOS) + GSAP hero parallax
- Filterable project grid, tabbed skills page, timeline-based About page
- Fully responsive: desktop, tablet, and mobile, with a slide-in mobile menu
- Accessible: semantic HTML, visible focus states, `prefers-reduced-motion` respected

## 🧱 Tech stack

- HTML5
- Tailwind CSS (via CDN, used for small utility helpers)
- A hand-written design system in `assets/css/main.css` (tokens, components, animations)
- Vanilla JavaScript (`assets/js/main.js`)
- GSAP (hero parallax / scroll-triggered reveals)
- AOS — Animate On Scroll (section reveals)
- Lucide Icons
- Google Fonts — Poppins (display/body) + JetBrains Mono (code accents)

> All third-party libraries are loaded from public CDNs, so the site needs
> an internet connection the first time each page loads. Everything else
> (markup, styles, logic, images) is 100% local and works offline.

## 📁 Folder structure

```
Portfolio/
│
├── index.html          Home — hero, stats, about teaser, featured projects, CTA
├── about.html           About — intro, education, experience timeline, achievements
├── projects.html        Projects — filterable project grid
├── skills.html           Skills — categorized, animated skill bars
├── contact.html          Contact — form, contact info, map
│
├── assets/
│   ├── css/main.css      Design tokens + all custom styles
│   ├── js/main.js         Cursor, particles, nav, animations, form, filters
│   ├── images/            SVG avatar + project thumbnail placeholders, favicon
│   ├── icons/             Notes on the CDN icon set (Lucide)
│   ├── fonts/             Notes on the CDN font setup (Google Fonts)
│   └── Agung_Setiyadi_Widyanto_CV.pdf   Placeholder downloadable CV
│
├── components/            Reference-only nav/footer partials (see note below)
└── README.md
```

## ▶️ Running the project

No build step required.

1. Extract/clone the folder.
2. Double-click `index.html` to open it directly in your browser, **or**
   serve the folder with any static server for the best experience, e.g.:
   ```bash
   npx serve .
   # or
   python3 -m http.server 5500
   ```
3. Open the printed local URL in your browser.

## 🧩 About the `components/` folder

`nav.html` and `footer.html` are kept as **reference copies** of the navbar
and footer markup. The live pages embed that markup directly rather than
`fetch()`-ing it at runtime, because browsers block `fetch()`/XHR requests
to local files when a page is opened straight from disk (`file://...`),
which would break the "just open index.html" requirement. If you serve the
site with a real server, you're free to refactor these into includes (e.g.
with a templating tool, PHP, or a static site generator) — the two files
here make that migration straightforward.

## 🎨 Customizing

- **Colors / fonts / spacing**: edit the CSS variables at the top of
  `assets/css/main.css` (`:root { ... }`).
- **Copy**: all text lives directly in each `.html` file — search for the
  section you want to change.
- **Projects**: duplicate a `.project-card` block in `projects.html` (and
  the featured version in `index.html`), update the `data-tech` attribute
  so it works with the filter buttons.
- **Skills**: duplicate a `.skill-card` block in `skills.html` inside the
  right `data-skill-group`, and set `data-level` (0–100) on `.skill-bar-fill`.
- **Avatar / project thumbnails**: swap the SVG placeholders in
  `assets/images/` for real photos/screenshots — same filenames, or update
  the `src` attributes.
- **CV**: replace `assets/Agung_Setiyadi_Widyanto_CV.pdf` with a real CV
  (same filename, or update the `href` on the "Download CV" buttons).
- **Contact form**: the form currently opens the visitor's email client via
  a `mailto:` link (no backend). To wire it to a real backend or a service
  like Formspree, replace the `submit` handler in `assets/js/main.js`.

## ♿ Accessibility & performance notes

- Semantic landmarks (`header`, `main`, `footer`, `nav`) throughout
- Descriptive `alt` text on all images
- Visible focus outlines preserved on interactive elements
- Respects `prefers-reduced-motion` (disables custom cursor, particle
  animation, and shortens transitions)
- Mobile-first responsive breakpoints for tablet and phone

---

Designed & Developed by **Agung Setiyadi Widyanto**.
