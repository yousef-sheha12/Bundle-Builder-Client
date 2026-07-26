# Bundle Builder - Wyze Security System Configurator

A multi-step bundle builder for assembling a Wyze security system, built as a React prototype with a live review panel and a .NET backend API.

## Live Demo

- **Frontend**: [Bundle Builder App](https://yousef-sheha12.github.io/Bundle-Builder-Client/)
- **Backend API**: [https://fitness-1.runasp.net/api/products](https://fitness-1.runasp.net/api/products)

## Repositories

| Repository                                                                       | Description        |
| -------------------------------------------------------------------------------- | ------------------ |
| [Bundle-Builder-Client](https://github.com/yousef-sheha12/Bundle-Builder-Client) | React frontend     |
| [Bundle-Builder-Server](https://github.com/yousef-sheha12/Bundle-Builder-Server) | .NET 9 backend API |

## Architecture

```
├── src/                      # React frontend
│   ├── components/
│   │   ├── StepAccordion.jsx       # 4-step accordion
│   │   ├── ProductCard.jsx         # Product card with variants, stepper, pricing
│   │   ├── VariantSelector.jsx     # Color chip variant picker
│   │   ├── QuantityStepper.jsx     # +/- stepper (normal + compact)
│   │   └── ReviewPanel.jsx         # Right sidebar order summary
│   ├── pages/
│   │   └── LandingPage.jsx         # Two-column layout
│   ├── services/
│   │   └── api.js                  # API client
│   ├── store/
│   │   └── useStore.js             # Zustand state management
│   └── data/
│       ├── products.json           # Local fallback data
│       └── mockData/selection.js   # Initial state + category config
├── .env                        # API base URL (production)
├── .env.production             # API base URL (production build)
├── vite.config.js              # Vite config with dev proxy
└── package.json
```

## Quick Start (Run Locally)

```bash
# Clone the frontend repo
git clone https://github.com/yousef-sheha12/Bundle-Builder-Client.git
cd Bundle-Builder-Client

# Install dependencies
npm install

# Start dev server
npm run dev
```

The frontend runs at `http://localhost:5173` and fetches data from the production API at `https://fitness-1.runasp.net/api/products`.

## Development (With Local Backend)

If you want to run the backend locally:

```bash
# Terminal 1 - Backend
git clone https://github.com/yousef-sheha12/Bundle-Builder-Server.git
cd Bundle-Builder-Server
dotnet restore
dotnet run

# Terminal 2 - Frontend
cd Bundle-Builder-Client
# Change .env to point to local backend:
# VITE_API_BASE_URL=http://localhost:5198
npm run dev
```

## Production Build

```bash
npm run build
```

The output is in `dist/`.

## Deployment

### Frontend

The frontend is deployed via GitHub Pages on push to `main`.

### Backend (MonsterASP)

The backend is deployed automatically to [MonsterASP](https://monsterasp.net) via GitHub Actions on push to `main`.

## Tech Stack

| Layer    | Technology                                    |
| -------- | --------------------------------------------- |
| Frontend | React 19, Vite 8, Tailwind CSS v4, Zustand    |
| Backend  | .NET 9 Web API (C#)                           |
| Hosting  | MonsterASP (backend), GitHub Pages (frontend) |
| CI/CD    | GitHub Actions (FTP deployment)               |

## Key Decisions & Tradeoffs

1. **Data-driven rendering**: All product markup is generated from the API response. No hardcoded per-product JSX.
2. **API-first with local fallback**: The frontend fetches from the .NET API on load. If the API is unavailable, it falls back to the local `products.json`.
3. **Per-variant quantities**: Products with color variants track each variant's quantity separately. The card stepper shows the active variant's count; selecting a different variant switches the stepper context without losing existing counts.
4. **Auto-save on every state change**: The store calls `saveToStorage()` on every increment/decrement/step change. The "Save my system for later" button provides explicit user-facing confirmation.
5. **Environment-based API URL**: The `.env` file controls the API base URL. In production, it points to the MonsterASP server. In development, it can be switched to localhost.
