# Analytics tracking (PostHog)

Phase 1 instrumentation. Phase 3 (the `/admin` dashboard) reads these events through PostHog's query API, so names and properties here are a contract. Change them deliberately.

Code: `lib/analytics.ts` (typed wrappers, opt-out), `components/analytics/PostHogProvider.tsx` (init), `components/analytics/AnalyticsTracker.tsx` (section / dwell / exit / click logic). Components never call `posthog` directly.

## Setup

- Env (`.env.local`, and Vercel project env): `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST` (`https://us.i.posthog.com`; unused client-side because the app proxies, see below), `POSTHOG_PROJECT_ID` (server side, for the dashboard), optional `NEXT_PUBLIC_POSTHOG_DEBUG=1`.
- No key: PostHog never initialises and every wrapper is a no-op.
- Init only runs in production builds on a non-localhost host. `NEXT_PUBLIC_POSTHOG_DEBUG=1` forces init anywhere and turns on PostHog's console debug logging.
- Reverse proxy (`next.config.ts`): `/ingest/static/*` and `/ingest/array/*` go to `us-assets.i.posthog.com`, everything else under `/ingest/*` to `us.i.posthog.com`, with `skipTrailingSlashRedirect: true`. SDK uses `api_host: '/ingest'`, `ui_host: 'https://us.posthog.com'`. This keeps ad-blockers from dropping events.

## Privacy configuration

Chosen: **`persistence: 'sessionStorage'`, no `cookieless_mode`, no cookie banner.**

| Setting | Value | Why |
| --- | --- | --- |
| `persistence` | `sessionStorage` | No cookies. The anonymous id and session id live in the tab's sessionStorage and vanish when the tab closes. All pageviews in one visit share a `distinct_id` and `$session_id`, so landing -> case study -> contact is one journey. |
| `person_profiles` | `identified_only` | Anonymous visitors do not create person profiles. |
| `capture_pageview` | `history_change` | Captures App Router client navigations (plus the first load). |
| `capture_pageleave` | `true` | `$pageleave` alongside our own `page_exit`. |
| `autocapture` | `true` | Clicks etc. Additive to the custom events. |
| `capture_heatmaps` | `true` | Click and scroll heatmaps. |
| Session replay | on, `maskAllInputs: true` | Input values are masked. |
| Contact form | every field has class `ph-no-capture` (`FIELD_CLASSES` in `ContactForm.tsx`) | Excluded from autocapture and blocked in replay. No form text is captured. |

Why not `cookieless_mode`: PostHog documents it as using no cookies and no session/local storage, with identity resolved by a server-side daily hash, and it must also be switched on in the PostHog project settings or events are ignored. It would drop the stable per-visit `distinct_id` we rely on for the journey view, and the docs do not say it supports session replay or heatmaps (I could not confirm either). `sessionStorage` meets all three needs (no cookies, replay and heatmaps work, visit-level linking). Trade-off: a visitor who opens a case study in a new tab appears as a separate visit, and a returning visitor next week is a new visitor. Fine at this traffic level.

The only localStorage entry is the optional owner flag below (and PostHog's own opt-out marker for the owner's browser). Visitors get no cookie and no persistent identifier.

## Excluding Arshita's own visits

- Visit any page with `?me=1`: calls `posthog.opt_out_capturing()` and sets `localStorage.am_internal = "1"`. From then on that browser initialises PostHog opted out (`opt_out_capturing_by_default`). The `?me=1` request itself is also opted out before the first pageview.
- Visit with `?me=0`: removes the flag and calls `opt_in_capturing()`.
- Per browser (and per browser profile). Do it once on each device.
- Local dev and previews on localhost send nothing unless `NEXT_PUBLIC_POSTHOG_DEBUG=1`.

## Event dictionary

All custom events are snake_case. `page` is always the normalised pathname (no trailing slash, no query), e.g. `/`, `/projects/moritz-intake`. **Use the `page` property, not `$pathname` / `$current_url`**: events flushed on a route change are sent after the URL has already changed, so PostHog stamps them with the new URL while `page` is the page the event is about.

### `section_viewed`
Once per section per pageview, the first time the section is "in view". In view = at least 40% of the section is visible, or the section fills at least 40% of the viewport height (so tall case-study chapters still count).

| Property | Type | Notes |
| --- | --- | --- |
| `page` | string | |
| `section` | string | the `data-section` slug |
| `section_index` | number | 0-based order among `[data-section]` elements in the DOM |

Example: `{ page: "/projects/moritz-intake", section: "journey", section_index: 5 }`

### `section_dwell`
Visible seconds in a section (same "in view" rule, only while the tab is visible). Flushed on route change, on `pagehide`, and when the tab becomes hidden. A section can emit more than one `section_dwell` per pageview (e.g. tab hidden then returned), so **sum `seconds` per `(page, section)` per session**. Values are rounded to 0.1 s; anything under 0.5 s is held back and added to the next flush. Uses `sendBeacon` when the page is going away.

| Property | Type |
| --- | --- |
| `page`, `section`, `section_index` | as above |
| `seconds` | number (0.1 resolution) |

Example: `{ page: "/", section: "selected-work", section_index: 1, seconds: 7.6 }`

### `page_exit`
Once per pageview, on whichever comes first: route change, `pagehide`, or the tab becoming hidden (mobile browsers often skip `pagehide`). If the visitor returns to a tab that was hidden, no second `page_exit` is sent for that pageview.

| Property | Type | Notes |
| --- | --- | --- |
| `page` | string | |
| `last_section` | string or null | the most recent section that came into view |
| `max_scroll_pct` | number 0-100 | deepest scroll position (bottom of viewport / document height) |
| `seconds_on_page` | number | visible time only, 0.1 resolution |

Example: `{ page: "/projects/moritz-intake", last_section: "step-mark", max_scroll_pct: 47, seconds_on_page: 9.1 }`

Use `page_exit` for "where do people leave": group by `page`, `last_section`.

### `case_study_opened`
A click on any link to `/projects/<slug>` where `<slug>` is a known case study (landing cards, `/projects`, `/builds`, `/coros-ai`, prev/next, anywhere). One delegated click listener, so new links are covered automatically.

| Property | Type | Notes |
| --- | --- | --- |
| `slug` | string | e.g. `moritz-intake` |
| `from_page` | string | |
| `from_section` | string or null | nearest enclosing section of the link, or `nav` / `footer` for the header and footer; cards report their parent section (e.g. `selected-work`), not their own `card-*` slug |

Example: `{ slug: "moritz-intake", from_page: "/", from_section: "selected-work" }`

### `cta_clicked`
A click on a link to contact, resume, email, LinkedIn or the about page.

| Property | Type | Notes |
| --- | --- | --- |
| `cta` | `contact` / `resume` / `email` / `linkedin` / `about` | `resume` = `/resume` page or the PDF link; `email` = any `mailto:` |
| `page` | string | |
| `section` | string or null | same rules as `from_section` |

Example: `{ cta: "contact", page: "/projects/moritz-intake", section: "nav" }`

### Built-in events still on
`$pageview` (first load and every client navigation, with `$pathname`), `$pageleave`, `$autocapture`, `$snapshot` (replay), `$web_vitals`, `$dead_click`, `$rageclick`.

## Section slugs

Sections are marked with `data-section="<slug>"`. `data-context="nav" | "footer"` on the site header and footer is used only to label click events; those are not sections and never emit section events. Sections can nest (`selected-work` contains the `card-*` slugs), so parent dwell includes child dwell. Slugs are unique within a page.

### Landing page `/`
`hero`, `selected-work`, `card-moritz-intake`, `card-my-world`, `card-design-system`, `card-founding-design`, `closing`

(`card-*` come from `CaseStudyCard`, in whatever order the cards render. Moritz leads, then the COROS AI cases.)

### Other pages
- `/about`: `intro`, `story`, `closing`
- `/resume`: `hero`, `experience`, `projects`, `education`, `skills`, `closing`
- `/contact`: `contact`
- `/projects`: `listing` + `card-<slug>` per design case study
- `/builds`: `listing` + `card-<slug>` per build case study
- `/coros-ai`: `overview`, `case-studies` + `card-<slug>`
- `/for-fun`: `for-fun`

### Case-study pages `/projects/<slug>`
Every case study gets these from `CaseStudyLayout`: `header` (title, summary, stats, meta), `hero` (when the page passes a hero), `product-intro` (design-system, founding-design, my-world only), and `prev-next` (previous / next links). Chapters come from `CaseSection`, whose `id` is the slug:

| Case study | Chapter slugs, in order |
| --- | --- |
| `moritz-intake` | `customer`, `problem`, `approach`, `journey`, `step-mark`, `start`, `receipts`, `transparency`, `attachments`, `submission`, `waiting`, `home`, `human`, `voice`, `crossed-out`, `next` |
| `my-world` | `problem`, `architecture`, `interface`, `decluttering`, `ai`, `takeaway` |
| `design-system` | `tokens`, `onboarding`, `chat`, `settings`, `retrieved-context`, `tone`, `results` |
| `founding-design` | `context`, `research-interviews`, `competitive-analysis`, `flow`, `dimensions`, `influences`, `personality`, `final-designs`, `design-system`, `brand`, `pitch-deck`, `reflection` |
| `accessibility-auditor` | `problem`, `scan`, `fix`, `compare`, `pipeline`, `eval`, `system`, `build`, `links` |
| `gmail-job-tracker` | `problem`, `board`, `sync`, `classifier`, `correct`, `privacy`, `system`, `build` |
| `foryou-playmat` | `overview`, `research`, `constraints`, `design`, `woz`, `build`, `impact`, `learned` |
| `switcharoo` | `problem`, `research`, `approach`, `games`, `testing`, `result` |

New `CaseSection`s are tracked automatically from their `id`. New pages need `data-section` on their top-level blocks.

## Querying notes for the dashboard

- Funnel for a visit: filter on `$session_id`; order by timestamp.
- Attention per section: `sum(seconds)` of `section_dwell` grouped by `page, section`, divided by sessions that fired `section_viewed` for it.
- Drop-off: count of `section_viewed` per `(page, section)` ordered by `section_index`, and `page_exit.last_section` distribution.
- Ignore `$pageview` counts from your own browsers (already excluded via `?me=1`).
- Traffic is low (under 50 visitors a week), so prefer raw counts and the replay list over percentages.
- In dev with React Strict Mode a debug session may emit a duplicate zero-second `page_exit` on first mount; this does not happen in production builds.
