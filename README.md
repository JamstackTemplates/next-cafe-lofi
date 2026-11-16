# Lofi Café (Next.js)

A cosy, illustrated lofi theme for coffee shops and cafés, with an editable menu, opening hours, location and a [Jamstacks](https://jamstacks.net) contact component for enquiries and catering requests.

It exports to plain static files, deploys to GitHub Pages (custom domain or `/repository/` path) and works with no backend. Light mode is a pastel morning; dark mode is a rainy night. Both follow the visitor's device unless they pick one with the header toggle.

**Lofi Café**, the menu, the playlist and the contact details are fictitious placeholders. The sample address is a public landmark, 20 Times Square in New York, so the map has something real to show. Replace all of them with your own.

## Pages

| Route | What's there |
| --- | --- |
| `/` | Illustrated window-seat hero with a live "open now" badge, then **Find us**: address, directions, opening hours and a Google map. Below that: house favourites, the space and amenities, a "now spinning" playlist, an events/catering invitation and FAQs |
| `/menu/` | The full menu by section with sizes, prices, dietary tags, signature/seasonal/new stickers and sold-out items, plus section shortcuts and dietary filters |
| `/contact/` | Email and phone (always available) plus the hosted enquiry form when connected |
| any other URL | A friendly 404 with links back |

## Quick start

Requires Node.js 24 or newer.

```sh
npm ci            # install exact locked dependencies
npm run dev       # http://localhost:3000 with live reload
npm test          # configuration, menu and hours checks
npm run typecheck
npm run build     # static export to out/
npm start         # serve out/ locally at http://localhost:3000/
npm run check     # test + typecheck + build in one go
```

No account, API key or network service is needed to run or build the website. Fonts are installed from npm and bundled at build time, so the build never fetches anything from a font service.

## Make it yours

Every page reads from two content files, so there are no duplicated strings to hunt down:

| File | What to change |
| --- | --- |
| [content/menu.ts](content/menu.ts) | Menu sections, items, prices and sizes, dietary tags, stickers, availability, add-ons, allergy notes, currency |
| [content/cafe.ts](content/cafe.ts) | Name, tagline, introduction, story, email, phone, address (plus an optional landmark/cross-streets `note`), directions, opening hours, notice, amenities, playlist, FAQs, social links |
| [app/globals.css](app/globals.css) | Colours (including the illustration palette), fonts and spacing are tokens at the top of the file |
| `public/og.png` | 1200×630 social preview image |
| `app/icon.svg` | Browser tab icon |
| [site.config.json](site.config.json) | Site name/description, your time zone and public deployment settings (see below) |

### Maintaining the menu

Each item in `content/menu.ts` looks like this:

```ts
{
  id: 'ube-latte',                    // unique; also the link /menu/#ube-latte
  name: 'Ube latte',
  description: 'Purple yam, coconut milk and vanilla.',
  price: [{ label: '12oz', amount: 5.75 }, { label: '16oz', amount: 6.5 }], // or a single number: 5.75
  diet: ['vegan', 'gluten-free', 'dairy-free'],
  badge: 'signature',                 // optional: 'signature' | 'seasonal' | 'new'
  serve: 'hot-or-iced',               // optional, drinks: 'hot' | 'iced' | 'hot-or-iced'
  art: 'glass',                       // little drawing: cup, mug, glass, teapot, croissant, cookie, cake, toast, bowl, onigiri, mochi
  color: '#9a72cf',                   // tints the drawing
  featured: true,                     // optional: show in "House favourites" on the home page
}
```

- **Sold out today?** Add `available: false`. The item stays on the menu, greyed out with a "Sold out today" sticker. Remove the line when it's back.
- **Seasonal specials:** add an item with `badge: 'seasonal'`, and delete it when the season ends.
- **New section:** add `{ id, title, description, items: [...] }` to `sections`. It appears in the section shortcuts automatically.
- **Prices** are numbers in `menu.currency` (`5` is $5, `5.5` is $5.50). Change `currency` and `locale` for other countries, e.g. `'GBP'` and `'en-GB'`.
- Vegan items count as vegetarian and dairy-free in the filters even when they're not tagged twice. `contains-nuts` powers the "Nut-free" filter, so tag nuts carefully.
- Keep 3–8 items `featured` so the home page grid stays balanced.

`npm test` checks the menu after every edit: unique, URL-safe ids, valid prices and sizes, known dietary tags and drawings, and a sensible number of favourites. A failure names the item to fix.

### Hours and the "open now" badge

`hours` in `content/cafe.ts` lists every day once with 24-hour `opens`/`closes` times in your local time. Leave both out for a closed day. Use `notice` for one-off messages such as holiday hours; leave it `''` to hide it. FAQs (`faqs`) appear at the bottom of the home page.

Your time zone is `timeZone` in [site.config.json](site.config.json), an IANA name such as `Europe/London` or `America/New_York`. If Jamstacks created this website, it's the time zone you chose in the portal. With it:

- the badge works out "Open now · until 6pm" or "Closed · opens Monday at 7am" in the visitor's browser using *your* clock, refreshed every minute, so the built files never contain a stale time;
- the hours say "Times shown in Pacific Time" (or your zone), so visitors elsewhere don't read them as their own local time.

Without a time zone, the badge never claims open or closed and the note is hidden. Without JavaScript the badge shows "Open daily". An invalid name fails the build with a clear message.

### Location and map

Visitors most often look for where you are, so the home page puts the address, directions and hours directly under the hero, beside a Google map. The map and the "Get directions" and "Open in Google Maps" buttons all come from `address` in `content/cafe.ts`. There's nothing else to configure.

All three are free and need no Google account or API key:

- The links use Google's documented [Maps URLs](https://developers.google.com/maps/documentation/urls/get-started).
- The map uses Google's keyless embed (the `google.com/maps/embed?pb=…` form that `google.com/maps?q=…&output=embed` redirects to). It's widely used but isn't a documented API. For Google's officially supported option, create a free [Maps Embed API](https://developers.google.com/maps/documentation/embed/get-started) key restricted to your domain and change `mapEmbedUrl` in [lib/maps.ts](lib/maps.ts) to the `maps/embed/v1/place` form shown there. Embed API keys are meant to be public, so this is safe in a static site.

The map is lazy-loaded, so Google is only contacted when it scrolls into view. Google may set cookies in the embedded map, so mention it in your privacy notice if you have one. In dark mode a CSS filter (`--map-filter` in `app/globals.css`) turns it into a night map that matches the theme. Set it to `none` to show Google's normal colours.

Text is rendered as plain text, never HTML. Don't present invented reviews or awards as fact.

## Appearance

The header uses `DarkModeToggle` from the published `jamstacks` React package. The root layout supplies `ThemeProvider` and the early `ThemeScript`, so a saved preference applies before the first paint and stays consistent across navigation and tabs.

The hero window, menu drawings and cassette are inline SVG/CSS coloured by tokens in `app/globals.css`. The same drawings turn from a pastel morning into a rainy night when the theme changes; there are no image files to swap. Gentle animations (steam, rain, twinkling lights, the ticker and spinning reels) stop for visitors who prefer reduced motion.

Fonts are [Fraunces](https://fonts.google.com/specimen/Fraunces) (soft axis) for headings and [Nunito](https://fonts.google.com/specimen/Nunito) for text, both self-hosted through `@fontsource-variable` packages under the SIL Open Font License.

## Footer credit

The footer ends with "Made with [Jamstacks](https://jamstacks.net) · Static website. Dynamic components." It's an ordinary link in [components/site-footer.tsx](components/site-footer.tsx). This is your website, so you can keep, reword or remove it.

## Configuration

`site.config.json` holds public deployment settings only. Jamstacks may rewrite this file when it sets up a repository for you; it never touches `content/`.

```json
{
  "name": "Lofi Café",
  "description": "Slow coffee, soft beats and a warm seat by the window. Menu, opening hours and how to find us.",
  "domain": "",
  "timeZone": "America/New_York",
  "jamstacks": { "siteId": "", "cdnUrl": "https://cdn.jamstacks.net" }
}
```

Build-time environment variables override the file (blank values keep the file's value). See [.env.example](.env.example).

| Purpose | Local/build variable | GitHub Actions repository variable |
| --- | --- | --- |
| Public Jamstacks website ID | `JAMSTACKS_SITE` | `JAMSTACKS_SITE` |
| Component CDN base | `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | `JAMSTACKS_CDN_URL` |
| Display/canonical domain (hostname only) | `NEXT_PUBLIC_SITE_DOMAIN` | `SITE_DOMAIN` |
| Time zone for opening hours (IANA name) | `SITE_TIME_ZONE` | not needed; set `timeZone` in the file |
| Project-path prefix, e.g. `/my-cafe` | `PAGES_BASE_PATH` | set automatically from `actions/configure-pages` |
| Absolute site URL for canonical links/sitemap | `PAGES_BASE_URL` | set automatically from `actions/configure-pages` |

Every value here is **public** and ends up in the built files. Never put GitHub tokens, publishing keys or private email addresses in config or `.env` files. The public site ID identifies your website; it grants no administrative access.

Validation happens at build time ([lib/config.mjs](lib/config.mjs)): the site ID must be a single path-safe segment, the CDN must be HTTPS (path prefixes like `https://example.org/_cdn` are fine), the domain must be a bare hostname, and the base path must be a plain URL path. A `localhost` CDN is rejected unless you opt in with `JAMSTACKS_ALLOW_LOCAL_CDN=1`, and is always rejected in GitHub Actions so a public site can never depend on your machine.

GitHub may report an HTTP `PAGES_BASE_URL` while a new custom domain's HTTPS certificate is provisioning. The build accepts that URL and emits HTTPS canonical, social and sitemap URLs, so the first deployment can complete. When neither `PAGES_BASE_URL` nor a domain is known, canonical links and social images are omitted and `sitemap.xml` is empty, rather than guessing an origin.

The home page includes `CafeOrCoffeeShop` structured data (address, hours, contact, menu link) built from `content/cafe.ts`, which helps search engines and maps show your details.

## Contact and Jamstacks

**Without Jamstacks** (default): the Contact page shows your email with a copy button, your phone number and a short "useful to include" list. No Jamstacks script is requested anywhere.

**With Jamstacks**: create a website in the Jamstacks portal, configure the support form's copy (for example heading "Events, catering & hellos", name/email/message labels, button text and a success message) and theme, and **publish** it. Then set `JAMSTACKS_SITE` (and `JAMSTACKS_CDN_URL` if you're not using `https://cdn.jamstacks.net`) and rebuild. The Contact page then renders:

```html
<jamstacks-support-form data-jamstacks-component="support-form" data-jamstacks-site="site_…"></jamstacks-support-form>
<!-- plus, after hydration, one script: {cdn}/sites/{siteId}/embed.js -->
```

How it behaves:

- The hosted component renders inside the tag (in its own shadow root) and owns validation, spam protection, submission and the success/error messages. This template never submits messages, never registers the element itself and never shows a success message of its own.
- Your email stays visible next to the form at all times. If the script can't load, a short message offers the email instead; if the form is slow to appear, a gentle note does the same. With JavaScript disabled, the page points to email.
- Form text and theme changes you publish in the portal appear after a reload (allow for the CDN cache interval) — no rebuild needed. Changing the menu, hours or the site ID does need a rebuild.
- The form supports name, email and message today. Don't promise booking slots, party-size fields or online ordering in your page copy.
- Only the Contact page loads the Jamstacks script.

**Why Contact uses full page loads:** the current shared runtime finds the form's host when its script runs and stops watching for new hosts after ten seconds; it has no public "remount" API. Links to and from Contact therefore do an ordinary full page load (all other links use fast client-side navigation), so the form appears reliably. This is handled by [components/site-link.tsx](components/site-link.tsx).

**Styling:** the page maps its design tokens to the shared `--jamstacks-*` CSS variables at the top of [app/globals.css](app/globals.css). A theme you publish in the portal overrides these on the component itself. Don't style the component's internals; they're owned by the runtime.

**Content Security Policy:** none is set by this template. If you add one, allow scripts from your Jamstacks CDN origin, the spam-check provider used by the form (`https://challenges.cloudflare.com` for scripts and frames), `connect-src` to the API origin your published form uses, and `frame-src https://www.google.com` for the map. Inline structured data and the theme script also need a nonce or hash. Avoid wildcards and `unsafe-eval`.

## Deploy to GitHub Pages

The workflow at [.github/workflows/pages.yml](.github/workflows/pages.yml) tests, type-checks, builds and deploys on every push to `main`, validates pull requests without deploying, and can be run manually.

1. Push this repository to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Optional: **Settings → Secrets and variables → Actions → Variables**: add `JAMSTACKS_SITE`, `JAMSTACKS_CDN_URL`, `SITE_DOMAIN`. These are *variables*, not secrets — they're public.
4. Push to `main` or run the workflow from the Actions tab.

The site works at `https://<owner>.github.io/<repository>/`; the workflow reads the correct path prefix from GitHub. To preview a project-path build locally:

```sh
PAGES_BASE_PATH=/cafe-preview npm run build
node scripts/serve.mjs --base /cafe-preview   # http://localhost:3000/cafe-preview/
```

**Custom domain:** set it in **Settings → Pages → Custom domain** and create the DNS records GitHub shows you. Setting `SITE_DOMAIN` alone does not configure a domain; it only informs canonical URLs.

**Jamstacks provisioning:** if Jamstacks created this repository for you, it already enabled Pages, set the repository variables and started the first run. Its runs appear as `Jamstacks <operation id>` (the workflow's optional `provisioning_id` input). Keep the workflow's file path, inputs and run name if you edit it.

## Local Jamstacks development

For working against a locally running Jamstacks service (portal at `https://localhost:5001`, assets at `https://localhost:5001/_cdn`):

```sh
JAMSTACKS_SITE=site_… \
NEXT_PUBLIC_JAMSTACKS_CDN_URL=https://localhost:5001/_cdn \
JAMSTACKS_ALLOW_LOCAL_CDN=1 npm run dev
```

This website uses Next.js's default port 3000. Trust the local development certificate in your browser and register `http://localhost:3000` as an allowed origin for the website in the portal; the service refuses submissions from origins it doesn't know.

## Project structure

```
app/                  routes, metadata, sitemap/robots, global styles and tokens
components/           header, footer, hero scene, menu board and drawings, open badge, Jamstacks host/loader
content/              cafe.ts and menu.ts — your content
lib/config.mjs        build-time public config resolution and validation
lib/menu-filter.ts    dietary filter rules
lib/paths.ts          base-path-aware links and asset URLs
lib/structured-data.ts  schema.org CafeOrCoffeeShop data
lib/time-zone.ts      readable time zone names for the hours
lib/maps.ts           Google Maps embed, search and directions URLs
lib/embed-status.ts   observable states of the hosted form
types/jamstacks.d.ts  typed JSX for <jamstacks-support-form>
public/               social preview image
scripts/serve.mjs     static preview server (with base path support)
tests/                node:test suites
site.config.json      public deployment settings (provisioner-compatible)
jamstacks/            optional template publishing metadata and gallery captures
```

## Before publishing your website

- Replace Lofi Café, the address (and its `note`), directions, email, phone, menu, prices, playlist, FAQs and social links with your own details.
- Set your real opening hours and `timeZone` in `site.config.json`, and check the "open now" badge on the home page.
- Update the site title/description, icon and social preview image. Set the correct public domain or Pages URL for canonical links.
- Run `npm run check` and a project-path build when using a repository URL.
- Check the pages on phone and desktop, in light and dark, with keyboard navigation and the Contact fallback.
- If you connect Jamstacks, publish the form in the portal and verify a real test message reaches the website inbox. A successful build does not verify message delivery.

`AGENTS.md` gives coding assistants the same architecture and editing guidance.

## Optional template publishing folder

`jamstacks/` is used only to publish this source template in the Jamstacks gallery:

```text
jamstacks/config.json       template metadata and screenshot paths
jamstacks/screenshots.json  capture viewport, hashes and sizes
jamstacks/home-light.jpg    light homepage preview
jamstacks/home-dark.jpg     dark homepage preview
jamstacks/config.test.mjs   source-template publishing checks
```

Run `node --test jamstacks/config.test.mjs` when maintaining the source template.
When creating a customer website, the whole `jamstacks/` folder can be removed.
Normal `npm test`, type checking, builds and the Pages workflow do not depend on it.
Keep `site.config.json`, the website's embed integration and `.github/workflows/pages.yml`;
these belong to the customer website and continue to work without gallery metadata.
