# Wall Calendar Delight

A beautiful, interactive wall-style calendar built with **React + TypeScript + Vite**.

This project focuses on a clean calendar experience with keyboard navigation, monthly and daily notes/events, theme customization, search, and print support.

## Tech Stack

- React 18
- TypeScript
- Vite 5
- Tailwind CSS
- Framer Motion
- Vitest + Testing Library
- ESLint

## Features

- Monthly wall-calendar layout
- Keyboard navigation (`Left`, `Right`, `T`, `Y`)
- Add monthly notes and day events
- Local persistence via `localStorage`
- Accent color + dark mode settings
- Search notes/events
- Print-friendly view
- Year overview modal

## Prerequisites

Install the following before running:

- **Node.js**: v18 or later (LTS recommended)
- **npm**: comes with Node.js

Check versions:

```bash
node -v
npm -v
```

## Project Setup

From the project root:

```bash
npm install
```

This installs all dependencies listed in `package.json`.

## How to Run Everything (Detailed)

### 1) Start development server

```bash
npm run dev
```

What happens:

- Vite starts a local dev server
- You get hot-reload on code changes
- Terminal prints a local URL (usually `http://localhost:5173`)

Open the URL in your browser.

### 2) Run lint checks

```bash
npm run lint
```

What happens:

- ESLint checks your project files for issues
- Fix reported errors/warnings before production build when possible

### 3) Run tests

Run once:

```bash
npm run test
```

Watch mode (continuous while coding):

```bash
npm run test:watch
```

What happens:

- `test`: executes the full test suite one time
- `test:watch`: reruns tests automatically when files change

### 4) Create production build

```bash
npm run build
```

Optional development-mode build:

```bash
npm run build:dev
```

What happens:

- Vite compiles and optimizes the app
- Output is generated in the `dist/` directory

### 5) Preview production build locally

```bash
npm run preview
```

What happens:

- Serves the `dist/` folder locally
- Lets you verify production output before deployment

---

## Recommended Workflow

Use this sequence for day-to-day development:

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
npm run preview
```

## NPM Scripts Reference

- `npm run dev` -> start dev server
- `npm run build` -> production build
- `npm run build:dev` -> development-mode build
- `npm run preview` -> preview built app
- `npm run lint` -> lint the codebase
- `npm run test` -> run tests once
- `npm run test:watch` -> run tests in watch mode

## Troubleshooting

### Port already in use

If Vite port is busy, run:

```bash
npm run dev -- --port 5174
```

### Fresh install after dependency issues

```bash
rm -rf node_modules package-lock.json
npm install
```

(For Windows PowerShell, use `Remove-Item -Recurse -Force node_modules, package-lock.json`.)

### Build fails after local changes

- Run `npm run lint`
- Run `npm run test`
- Re-run `npm run build`
- Check TypeScript and import-path errors in terminal output

---

## Project Structure (High-Level)

- `src/components/calendar/` -> calendar UI and interactions
- `src/lib/calendarUtils.ts` -> helper utilities and storage logic
- `src/pages/` -> route-level pages
- `src/test/` -> unit/integration tests

## Final Notes

This README is designed so you can clone, install, run, test, build, and preview the full project without guessing missing steps.

If you are onboarding a teammate, share the **Recommended Workflow** section first - they can be productive in minutes.

Happy building, and enjoy crafting delightful calendar experiences.
