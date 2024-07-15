# How to develop

1. Run in separated terminals:

- `npm run dev:chrome-ts`: compiles the TypeScript code in watch mode
- `npm run dev:chrome-vite`: build the output extension using Vite in the watch
  mode
- `npm run dev:chrome-reloader`: run the change watcher, to automatically reload
  the popup code (not available using vite for chrome extensions)
