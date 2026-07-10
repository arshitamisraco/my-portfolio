# Arshita's Portfolio — A Map of This Project

This is a plain-language guide to how the site is organized. You don't need to know how to code to use this — think of it as a floor plan so you know which room to walk into when you want to change something.

The site is built with **Next.js** (a framework for building websites with React) and **Tailwind CSS** (a styling system). You don't need to understand either of those — just know that "pages" live in one folder, reusable pieces live in another, and your writing/content lives in a third.

---

## The four folders that matter to you

### 1. `content/` — your writing (case studies)
This is where the actual text of your case studies lives, written in plain Markdown (`.md` files — just formatted text, like a Google Doc saved as plain text).

- `content/coros-redesign-case-study.md`
- `content/my-world-case-study.md`

If you want to edit the words in a case study — headlines, paragraphs, captions — this is where you do it. No code required.

There are also two subfolders here:
- `content/images/` and `content/videos/` — these are **not** where finished photos/videos go (see below). They're closer to a raw-materials drawer; the site can't actually serve files from here.

### 2. `public/` — your finished photos, videos, and resume
This folder doesn't exist yet — you'll create it when you're ready to add real media. Everything the browser actually loads (images, video files, your resume PDF) needs to live here:

- `public/videos/<case-name>/` — e.g. `public/videos/my-world/`, `public/videos/founding-design/`, `public/videos/design-system/`
- `public/images/about/`, `public/images/coros/`, `public/images/my-world/`, `public/images/design-system/`
- Your resume file (PDF)

Right now the site has **placeholders** everywhere media should go — each one shows the exact file path it's expecting, so when you're ready to swap in the real thing, it's a drop-in replacement, not a redesign.

### 3. `app/` — the pages of the site
Each folder here is a URL on the live site. This is the site's table of contents:

| Folder | What it is |
|---|---|
| `app/page.tsx` | The homepage (`/`) |
| `app/about/page.tsx` | The About page |
| `app/styleguide/page.tsx` | An internal style guide showing all your design tokens/components in one place |
| `app/work/coros-ai/page.tsx` | The "Coros" work overview page |
| `app/work/coros-ai/my-world/page.tsx` | The "My World" case study page |
| `app/work/coros-ai/founding-design/page.tsx` | The "Founding Design" case study page |
| `app/work/coros-ai/design-system/page.tsx` | The "Design System" case study page |
| `app/not-found.tsx` | The 404 "page not found" page |

A few technical-housekeeping files also live here (you can ignore these — they're for search engines and link previews, not for visitors):
- `app/sitemap.ts`, `app/robots.ts` — help Google index the site
- `app/opengraph-image.tsx` — the preview image shown when the site is shared on social media/Slack
- `app/layout.tsx` — the site-wide wrapper (nav, footer, fonts, metadata) that every page sits inside

### 4. `components/` — reusable building blocks
Think of these as your design system's components — the same pieces get reused across every page so everything looks consistent.

| Component | What it does |
|---|---|
| `Nav.tsx` | The top navigation bar |
| `Footer.tsx` | The site footer |
| `Button.tsx` | Buttons |
| `ImageFrame.tsx` | The styled frame/placeholder around photos |
| `VideoFrame.tsx` | The styled frame/placeholder around videos |
| `ProjectCard.tsx` | The preview cards for work/projects |
| `TagChip.tsx` | Small pill/tag labels |
| `PullQuote.tsx` | Large stylized quotes |
| `SectionLabel.tsx` | Small section headers/eyebrows |
| `Reveal.tsx` | Scroll-in animation wrapper |
| `PixelCloud.tsx` | A decorative visual element |
| `components/case-study/` | Pieces specific to case study pages: `CaseStudyLayout.tsx` (overall page shell), `CaseSection.tsx` (a content section), `QuoteCard.tsx`, `Toc.tsx` (table of contents sidebar), `TodoNote.tsx` (the little "still needs content" chips you'll see marking unfinished spots) |

---

## Where your design system lives

All your colors, spacing, and design tokens are defined in **one file**: `app/globals.css`. It's set up so no color is ever hardcoded elsewhere — every component pulls from this single palette. If you ever want to adjust the site's color palette globally, this is the one file to touch (the "raw" colors like `--color-pink-400` feed into "semantic" names like `--color-accent` that components actually use).

There's also a live style guide at the `/styleguide` page (`app/styleguide/page.tsx`) that visually shows every color, button, and component in one place — useful for checking consistency without hunting through code.

---

## Things still marked as placeholders

Per the last working session, these are intentionally unfinished so the site could still look complete while waiting on real assets:

- **Videos & photos** — placeholder frames exist; real files go in `public/videos/...` and `public/images/...` (see above)
- **Resume link** — currently points nowhere (`href="#"`) in the Nav, Footer, and About page
- **Email address** — placeholder in the Footer
- **Production domain** — placeholder URL (`https://arshitamisra.vercel.app`) used in a few SEO-related files
- **A few in-page notes** — small "TODO" chips inside the My World case study and a Figma brand-guide link in the Founding Design case study, marking specific facts/metrics/links to fill in later

---

## Running the site on your computer

If someone (or Claude) needs to preview changes locally, the commands are:

```
npm run dev     # starts a local preview, usually at http://localhost:3000
npm run build   # builds the production version
```

You shouldn't need to touch `node_modules/`, `package.json`, `tsconfig.json`, or any other config file at the project root — those are plumbing, not content.
