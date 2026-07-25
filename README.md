# Bundle Builder - Wyze Security System Configurator

A multi-step bundle builder for assembling a Wyze security system, built as a React prototype with a live review panel and a .NET backend API.

## Architecture

```
├── backend/                  # .NET 9 Web API
│   ├── Controllers/
│   │   └── ProductsController.cs   # GET /api/products
│   ├── Data/
│   │   └── products.json           # Product catalog (shared source of truth)
│   ├── Models/
│   │   ├── Product.cs
│   │   ├── ProductsResponse.cs
│   │   ├── Shipping.cs
│   │   ├── Step.cs
│   │   └── Variant.cs
│   └── Program.cs                  # CORS + routing config
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
└── package.json
```

## Run Instructions

### Backend (.NET)

```bash
cd backend
dotnet restore
dotnet run
```

The API runs at `http://localhost:5198`.

API endpoint: `GET /api/products` — returns the full product catalog.

### Frontend (React)

```bash
# Install dependencies
npm install

# Start dev server (proxies /api to backend)
npm run dev
```

The frontend runs at `http://localhost:5173`. API requests are proxied to the .NET backend.

### Both Together

Start the backend first, then the frontend. The Vite dev server proxies `/api` requests to `http://localhost:5198`.

### Production Build

```bash
npm run build
```

The output is in `dist/`.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS v4, Zustand |
| Backend | .NET 9 Web API (C#) |
| State | Zustand with localStorage persistence |
| Data | JSON file served via .NET API |

## Key Decisions & Tradeoffs

1. **Data-driven rendering**: All product markup is generated from the API response. No hardcoded per-product JSX.
2. **API-first with local fallback**: The frontend fetches from the .NET API on load. If the API is unavailable, it falls back to the local `products.json`.
3. **Per-variant quantities**: Products with color variants track each variant's quantity separately. The card stepper shows the active variant's count; selecting a different variant switches the stepper context without losing existing counts.
4. **Auto-save on every state change**: The store calls `saveToStorage()` on every increment/decrement/step change. The "Save my system for later" button provides explicit user-facing confirmation.
5. **Vite proxy**: In development, `/api` requests are proxied to the .NET backend to avoid CORS issues. In production, the backend would be deployed separately.
6. **Shared data source**: `backend/Data/products.json` is the canonical data source. The frontend `src/data/products.json` is kept as a local fallback.

## What's Not Finished

- The "Save my system" button relies on auto-save (localStorage persists on every change). The button confirms the save to the user.
- Checkout button is a placeholder — shows a toast confirmation only.
- Mobile responsiveness covers layout stacking and basic padding but could be more refined at very small viewports (< 375px).
