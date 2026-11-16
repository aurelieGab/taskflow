# TaskFlow

A small project management app built with the current React ecosystem.

I use TaskFlow as a training ground to practise modern front-end development the way it is done in a team: feature-based architecture, accessible components, data fetching with loading, error and empty states, validated forms, tests, and code reviews on every pull request.

## Features

- Projects list displayed as responsive cards (1, 2 or 3 columns, Mobile First)
- Loading skeleton, error message and empty state
- Project creation form with validation and accessible error messages
- Client-side routing with a shared layout and active navigation link
- Mocked API with MSW, so the app runs without a back-end

## Tech stack

| Area          | Tools                                       |
| ------------- | ------------------------------------------- |
| UI            | React 19, TypeScript                        |
| Build         | Vite                                        |
| Styling       | Tailwind CSS v4                             |
| Routing       | React Router                                |
| Data fetching | TanStack Query                              |
| Forms         | React Hook Form, Zod                        |
| API mocking   | MSW                                         |
| Tests         | Vitest, Testing Library                     |
| Code quality  | ESLint, Prettier (with the Tailwind plugin) |

## What this project demonstrates

- **Architecture**: code organised by feature (`api`, `hooks`, `components`, `schema`), with shared UI and helpers kept apart.
- **Data fetching**: a typed HTTP client with error handling, TanStack Query for caching and invalidation after a mutation.
- **Forms**: a Zod schema as the single source of truth for validation rules and input types.
- **Accessibility**: semantic HTML, visible keyboard focus, `aria-invalid` and `aria-describedby` on form errors, `role="status"` and `role="alert"` for async states, screen-reader-only loading text.
- **Tests**: unit tests for the HTTP client and the schema (including edge cases), component tests with MSW for success, error and empty responses.
- **Workflow**: Conventional Commits, one branch per feature, pull requests with a description and test steps.

## Project structure

```
src/
├── app/          # App shell: providers, router, layout
├── features/
│   └── projects/
│       ├── api/          # API calls
│       ├── components/   # ProjectList, CreateProjectForm
│       ├── hooks/        # useProjects, useCreateProject
│       ├── schema.ts     # Zod schema and inferred input type
│       └── types.ts
├── routes/       # Pages
├── shared/       # Reusable helpers (HTTP client, query client)
├── mocks/        # MSW handlers
└── test/         # Test setup and render helper
```

## Getting started

Requirements: Node.js 24 (see `.nvmrc`).

```bash
nvm use
npm install
cp .env.example .env
npm run dev
```

Set `VITE_ENABLE_MOCKS=true` in `.env` to run the app with the mocked API.

## Scripts

| Command         | Description                         |
| --------------- | ----------------------------------- |
| `npm run dev`   | Start the development server        |
| `npm run build` | Type-check and build for production |
| `npm test`      | Run the tests                       |
| `npm run lint`  | Lint the code                       |

## Roadmap

- Project detail page
- Filters, sorting and pagination stored in the URL
- End-to-end tests with Playwright
- Continuous integration with GitHub Actions
