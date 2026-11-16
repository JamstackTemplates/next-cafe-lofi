# Working on this website

This is a customer-owned Next.js website for a café. Read [README.md](README.md) for setup,
content editing, deployment and the optional Jamstacks contact form.

## Working preferences

- Work in this repository on its current branch unless asked otherwise.
- Preserve existing changes. Leave edits uncommitted; push or deploy only when requested.
- Adapt the website to its owner's requested content and features. Replace the sample café,
  menu, address and contact details with the owner's real details; the fictional examples are starting content.

## Structure and content

- `content/menu.ts` owns menu sections, items, prices/sizes, dietary tags, stickers,
  availability (`available: false` = sold out), home page favourites (`featured: true`), add-ons and notes.
  Most owner requests ("add a drink", "raise the latte price", "the banana bread is sold out") are edits here only.
- `content/cafe.ts` owns the café name, story, contact details, address, opening hours (local times),
  notice, amenities, playlist, FAQs and social links.
- The address in `content/cafe.ts` drives the home page "Find us" section, Google map, directions links and
  structured data. Maps use keyless Google URLs from `lib/maps.ts`; never add a secret key, and keep the map lazy-loaded.
- The café's time zone is the IANA `timeZone` in `site.config.json` (Jamstacks writes the owner's choice
  there). Change it there, not in content; without it the open-now badge stays neutral.
- Keep item and section ids unique, lowercase and hyphenated; they are page anchors. Use an existing
  `art` drawing and a `color` for new items rather than adding image files.
- Colours, including the illustration palette for light (morning) and dark (night), are tokens in
  `app/tailwind.input.css` (see Styling).
- Keep content separate from `site.config.json`: Jamstacks may rewrite deployment fields there.
- Text is rendered as plain text. Don't invent reviews, awards or claims for a real business.

## Styling (Tailwind CSS v4)

- Style components with Tailwind utility classes in the TSX. Don't add global CSS for one-off styles.
- `app/tailwind.input.css` holds everything utilities can't express: the colour tokens (`:root` for light,
  plus two dark blocks that must stay identical), the `@theme` built from them, base element styles,
  shared building blocks (`.button`, `.button-ghost`, `.text-link`, `.eyebrow`, `.chip`, `.sticker`, `.card`), the illustrations and animation, and styles driven by data attributes.
- Only this template's palette exists (`bg`, `surface`, `ink`, `muted`, `line`, `accent`, `accent-2`, `sage`, `peach`, `footer` and their variants). Tailwind's default colours are switched off. To add a
  colour, such as a custom accent, add a variable to `:root` and both dark blocks, then map it in
  `@theme inline` as `--color-name: var(--variable)` to get `bg-name`, `text-name` and so on.
- Colours switch with the theme through the tokens, so prefer them to `dark:` variants (`dark:` follows `html.dark`).
- Reuse the building blocks and existing components (e.g. `PageHead`) instead of restyling each instance.
  Add a reusable layout helper with `@utility`.
- Keep the `--jamstacks-*` component variables mapped to the tokens. Preserve readable contrast in both
  themes, responsive layouts from 360px, visible keyboard focus, semantic headings and reduced-motion support.

## Static architecture

- Production is a static export in `out/`. Preserve static-export compatibility; no
  request-time rendering, API routes, Server Actions, database or production Next.js server.
- Use local content for pages and ordinary client code for browser-only interactions
  (the open-now badge, menu filters, copy button). Time-dependent text is computed in the browser, never at build time.
- Preserve both custom-domain root URLs and arbitrary GitHub Pages repository paths.
  Use the shared path helpers and `SiteLink` for links, images and metadata.
- Read relevant installed Next.js guides in `node_modules/next/dist/docs/` before
  changing framework behavior. Keep dependencies modest and the npm lockfile reproducible.

## Optional Jamstacks form

- Keep the integration documented in README.md. The host is `<jamstacks-support-form>`
  with `data-jamstacks-component="support-form"` and `data-jamstacks-site` attributes.
- `JAMSTACKS_SITE` is a public website ID. Load one configured CDN bootstrap at
  `/sites/{publicSiteId}/embed.js`; no ID means no script request and a useful email fallback.
- The shared runtime owns form rendering, validation, spam protection and submission.
  Do not copy it, register a replacement element, intercept submission or simulate success.
- Preserve the documented full-document Contact navigation until a supported remount
  contract is available. Keep the email fallback usable during outages.
- The form supports name, email and message. Don't promise bookings, ordering or extra fields in page copy.
- Style through supported `--jamstacks-*` CSS variables; do not reach into shadow-root internals.
- Configuration and build-time environment values are public. Never put credentials,
  publishing keys or private notification recipients in them. Remote builds must not depend on localhost.
- Preserve `.github/workflows/pages.yml`, its optional `provisioning_id` input and correlated
  run name when changing the workflow. Pull requests validate without deploying.

## Commands and checks

```sh
npm ci
npm run dev       # http://localhost:3000
npm test          # menu, hours, config and embed checks
npm run typecheck
npm run build     # static export
npm run check     # all three
PAGES_BASE_PATH=/cafe-preview npm run build
```

Run `npm run check` after every content or code change; test failures name the item or day to fix.
`npm start` previews the export on port 3000; stop the dev server first, or use
`npm start -- --port 3200`. Browser-check affected routes in light and dark, and root/project-path
assets when changing layout, navigation or deployment behavior. Report local
checks separately from any actual GitHub deployment or accepted contact submission.

## Template publishing assets

- `jamstacks/` contains optional source-template metadata, gallery captures and their checks.
- Read `jamstacks/config.json`; capture evidence is `jamstacks/screenshots.json` and JPEGs stay directly inside `jamstacks/`.
- Run `node --test jamstacks/config.test.mjs` only when maintaining a source template.
- Customer websites can remove this entire folder. Normal tests, website code, builds and the Pages workflow must not import it.
- Keep `site.config.json`, embed integration and the Pages workflow outside the optional folder.
