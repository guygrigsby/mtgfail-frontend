# mtg.fail

Frontend for [mtg.fail](https://mtg.fail) — a Magic: The Gathering deck building and export tool.

## What It Does

- Import decks from a URL (fetched via the [backend API](https://api.mtg.fail))
- Search and add individual cards (via [Scryfall](https://scryfall.com))
- Export decks as JSON for [Tabletop Simulator](https://store.steampowered.com/app/286160/Tabletop_Simulator/)
- Deck state persists in localStorage between sessions

## Getting Started

```sh
yarn install
yarn start
```

The dev server runs at `http://localhost:3000` and talks to a local backend at `http://localhost:8080`. In production, the backend is `https://api.mtg.fail`.

## Build

```sh
yarn build
```

Output goes to `build/`.

## Tech Stack

- React 16 with Material-UI v4
- Webpack 4 (ejected Create React App)
- Redux + redux-thunk for state management

## Deployment

Deployed on Netlify. Pushes to the production branch auto-deploy. See `netlify.toml` for config.
