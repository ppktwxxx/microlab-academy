# MicroLab Academy — UI/UX Prototype 1.0

Responsive bilingual (Thai / English) engineering-learning web app prototype.

## Included in this prototype

- Home dashboard and five learning domains
- Course explorer with category filters and search
- Lesson viewer with objectives, theory, example circuit and Arduino code
- Guided LED blinking simulation (1 Hz state toggle)
- Free workbench: add/select/remove basic component cards and edit pin/color properties
- Editable C++ code preview area
- Serial Monitor preview
- Project save/load/delete using browser `localStorage`
- Learning completion state using browser `localStorage`
- Responsive desktop, tablet and mobile layouts

## Important scope note

This is a **UI/UX prototype**, not the complete simulator described in the product architecture. The Guided LED demonstration runs a small deterministic JavaScript state model. The Free Workbench is currently an interaction prototype: it does not compile or execute the text in the C++ editor, solve circuit voltages/currents, validate electrical wiring, or emulate the complete Arduino/ESP32 hardware. It is not a SPICE simulator and must not be used to validate real circuit safety.

All user-created projects and progress are stored only in the current browser through `localStorage`. There is no account system, cloud database, API, or cross-device synchronization yet.

## Run locally

No package installation or build step is required.

1. Extract the ZIP file.
2. Open `index.html` in a modern browser (Chrome or Edge recommended).
3. Use the TH / EN control to switch language.

For local development with a local server, from the project directory run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy to Cloudflare Pages using Git integration

1. Create a new GitHub repository, for example `microlab-academy`.
2. Upload the contents of this project to the repository root. `index.html` must remain at the repository root.
3. In Cloudflare Dashboard, open **Workers & Pages → Create application → Pages → Connect to Git**.
4. Select the GitHub repository and production branch `main`.
5. For this static prototype, use:
   - Framework preset: **None**
   - Build command: `exit 0` (or leave blank when supported by the setup flow)
   - Build output directory: `/` (repository root; if the dashboard requires a relative folder, use `.`)
6. Save and deploy.

Cloudflare's current Static HTML guide documents deployment without a framework or build step. The top-level `index.html` is required for the site root.

## Project structure

```text
microlab-academy/
├── index.html
├── README.md
└── src/
    ├── app.js
    └── styles.css
```

## Recommended next engineering increments

1. Convert the prototype into React + TypeScript + Vite modules.
2. Define a versioned circuit/project JSON schema and component pin model.
3. Build an actual 2D circuit editor with coordinate-based pins and wire connections.
4. Implement validated digital-logic execution and an Arduino-compatible compile/runtime sandbox.
5. Add user authentication, Cloudflare D1 and R2 after the client-side learning flow is validated.
6. Implement PLC scan-cycle, timers/counters, Modbus and MQTT simulation as independent engines.

## Technical references

- Cloudflare Pages — Static HTML: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/
- Cloudflare Pages — Git integration: https://developers.cloudflare.com/pages/get-started/git-integration/
- React versions: https://react.dev/versions
- Vite getting started: https://github.com/vitejs/vite/tree/main/packages/create-vite
