# Gonzalo Portfolio

Professional portfolio for Gonzalo Magaña Segovia. The initial frontend is implemented in the existing npm workspace; backend and professional networking features remain planned.

## Run locally

From the repository root, with the existing dependencies installed:

```sh
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).

```sh
npm run typecheck
npm run build
npm run lint -w apps/web
npm run preview -w apps/web
```

The production output is `apps/web/dist`. Configure a static host to serve `index.html` for application routes, including direct visits to `/experience` and `/connect`.

## Implemented

- `/`: Hero, About, seven-project horizontal carousel, grouped skills, and contact.
- `/experience`: King Global Cargo responsibilities, technologies, education, and contact links.
- `/connect`: Professional identity card, configurable display ID, working clipboard actions, QR placeholder, and an explicitly unavailable connection form.
- Shared responsive navigation and footer, cross-route Home section links, keyboard controls, focus states, skip link, and a fallback page for unknown routes.
- React, Vite, strict TypeScript, Tailwind CSS v4, React Router, and Lucide React. No new dependencies.

## Update public content

- `apps/web/src/data/profile.ts`: Display name, title, profile identifier, confirmed GitHub, portrait settings, and nullable email / LinkedIn / CV URLs. The identifier is a local display setting, not a registered network identity. The copied profile link uses the current site's origin.
- `apps/web/src/data/projects.ts`: Typed project descriptions, technology badges, reserved preview paths, availability flags, and optional confirmed repository / deployment URLs.
- `apps/web/src/data/experience.ts` and `skills.ts`: Concise experience and skill content.
- `apps/web/src/styles/`: Shared design tokens and responsive page styles.
- `docs/design/references/`: Six approved desktop / mobile design references.

Place real project previews at the reserved paths under `apps/web/public/images/projects/`, then set each entry's `imageAvailable` to `true`. Do the same for the portrait at `apps/web/public/images/portrait.webp` using `portraitAvailable`. Paths can also be changed directly in data. Unavailable assets render intentional placeholders without broken image requests.

Unconfirmed project descriptions and stacks are labeled pending. No project URLs, dates, metrics, completion statuses, CV file, email address, or LinkedIn URL have been invented. Add the real CV asset before enabling its download URL. Fonts load from Google Fonts with local fallbacks.

## Validation and manual review

TypeScript checking, ESLint, and the production build pass. Browser smoke checks covered all three routes, cross-route section positioning, carousel arrows / indicators / keyboard navigation, clipboard values, mobile menu navigation, and the honest pending connection response. No console warnings or errors were observed. Checks at 1440px and 390px found no page-level horizontal overflow.

Please review visual fidelity against the supplied references and touch swiping on a physical mobile device. Confirm professional copy and technology lists, provide contact details, and replace visual placeholders when ready.

## Planned

The API workspace, shared backend schemas, Supabase migrations, Gemini integration, real QR codes, and professional connections are future work. The connection form makes no network requests or claims of completed connections. Private API keys and service credentials must remain server-side.
