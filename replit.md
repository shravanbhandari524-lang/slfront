# slfront

A React + Vite frontend application for a shipping/logistics platform with role-based routing.

## Architecture

- **Framework**: React 19 + Vite 8
- **Routing**: React Router DOM v7
- **Auth**: JWT-based (access token in memory, refresh token via httpOnly cookie)
- **Backend**: Expects a backend API at `http://localhost:8080`

## Project Structure

```
src/
  api/          - API call functions (auth, offers, ships)
  admin/        - Admin dashboard page
  components/   - Shared components (ProtectRoutes, HomeRedirect)
  context/      - React context for token state
  hooks/        - Custom hooks (useShipData)
  login/        - Login page
  modular_css/  - CSS modules
  services/     - JWT decode utilities
  Ship/         - Ship user dashboard
  Vendor/       - Vendor dashboard
```

## User Roles

- `admin` → `/admin`
- `ship` → `/ship`
- `vendor` → `/vendor`

## Dev Setup

- Runs on port **5000** with `npm run dev`
- Host: `0.0.0.0` (required for Replit proxy)
- All hosts allowed (Vite `allowedHosts: true`)

## Deployment

- Static site deployment (SPA)
- Build: `npm run build` → outputs to `dist/`
