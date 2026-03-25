# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MTG Fail is a Magic: The Gathering deck building web app at https://mtg.fail. The backend API lives at https://api.mtg.fail (separate repo). This repo is the frontend only.

## Build & Dev Commands

- `yarn start` — Start dev server (runs `scripts/start.js`, uses webpack-dev-server)
- `yarn build` — Production build (outputs to `build/`)
- `yarn test` — Run tests (runs `scripts/test.js`, Jest-based)

## Architecture

- **React 16 class-component app** with a custom webpack 4 config (ejected from Create React App). Not Next.js.
- **Entry point:** `src/index.js` → renders `<App />` wrapped in Material-UI `ThemeProvider`
- **UI library:** Material-UI v4 (`@material-ui/core`, `@material-ui/icons`, `@material-ui/lab`)
- **State management:** Redux + redux-thunk, plus `localStorage` for deck persistence
- **Styling:** Material-UI `withStyles`, some SCSS/CSS modules
- **Theme:** Defined in `src/AppTheme.js`

## Key Data Flow

- `App.js` is the root component holding deck state. It manages add/remove/load/export operations.
- API base URL switches between `http://localhost:8080` (dev) and `https://api.mtg.fail` (prod) via `NODE_ENV`.
- Deck import: user provides a URL → `GET /scryfall?deck=<url>` → populates deck state
- Card add: searches Scryfall API directly (`api.scryfall.com/cards/named`)
- TTS export: `POST /tts` with deck data → downloads JSON file

## Deployment

- Deployed on **Netlify** (config in `netlify.toml`)
- Build command: `yarn build`, publish dir: `build/`
- Pushes to production branch auto-deploy

## Webpack Config

The webpack config is in `webpack.config.js` (ejected CRA). Build scripts live in `scripts/` and config helpers in `config/` (`paths.js`, `modules.js`, `env.js`).
