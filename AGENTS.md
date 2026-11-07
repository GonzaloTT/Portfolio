# Codex Project Instructions

## Project

Gonzalo Magaña Segovia's professional portfolio and
AI-powered professional networking platform.

## Architecture

Use an npm workspaces monorepo:

- apps/web: React + Vite + TypeScript
- apps/api: Node.js + Express + TypeScript
- packages/shared: Shared TypeScript types and schemas
- supabase/migrations: PostgreSQL migrations
- docs: Architecture and design documentation

## Frontend

Use:
- React
- TypeScript
- Vite
- Tailwind CSS
- Motion for React when animations are introduced
- React Router

Use reusable components and feature-based organization.

Follow:
docs/design/DESIGN_GUIDELINES.md

Visual references:
docs/design/references/

## Backend

Use:
- Node.js
- Express
- TypeScript
- Zod
- Supabase PostgreSQL
- Google Gemini through the official Google Gen AI SDK

Do not implement backend features until explicitly requested.

## Security

Never expose private API keys in the frontend.

Never commit:
- .env files
- API keys
- Credentials
- Private personal information

Gemini API requests must originate from the backend.

Supabase service-role credentials must remain server-side.

## Code quality

- Use TypeScript strict mode.
- Prefer small, reusable components.
- Avoid duplicated business logic.
- Keep configuration separate from presentation.
- Use semantic HTML.
- Include accessible labels and keyboard navigation.
- Prefer simple solutions over unnecessary abstractions.
- Do not introduce dependencies without a clear purpose.

## Content

Do not invent project links, professional experience,
metrics, achievements, or completed functionality.

Use placeholders for unknown information.

Distinguish implemented features from planned features.

## Git workflow

Use Conventional Commits.

Create separate commits for coherent units of work.

Examples:
- chore: configure frontend workspace
- feat: implement portfolio navigation
- feat: build home page
- feat: implement projects carousel
- feat: add experience page
- feat: add professional connection page

Do not combine unrelated functionality into one commit.

Do not push, merge, rebase, or change branches unless
explicitly instructed.

## Validation

Keep validation efficient.

Required:
- TypeScript type checking
- Production build
- Verification that main routes resolve
- Checks for critical runtime errors

Avoid:
- Repeated redundant builds
- Unnecessary extensive test suites
- Cosmetic validation loops
- Repeated screenshot generation

The user will review visual appearance manually.

## Implementation boundaries

Implement only the scope explicitly requested.

Do not build AI dashboards or agent networking screens
unless requested in a future development phase.

The initial frontend must contain:
- Home
- Experience
- Connect with Me

Use the approved Stitch references as the visual baseline.

## Final response

Summarize:
- Implemented functionality
- Files created or modified
- Commits created
- Required manual verification
- Remaining work

Keep the summary concise.
