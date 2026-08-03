# Cloudflare License Server

This folder will hold the free-tier licensing backend.

## Planned endpoints
- `POST /api/license/activate`
- `POST /api/license/verify`
- `POST /api/license/revoke`
- `POST /api/license/reset-device`
- `GET /health`

## Planned storage
- Cloudflare D1 or KV
- One row per license key
- One row per device activation
- One row per audit event

## Notes
- Keep it lightweight
- Avoid long-running jobs
- Keep the authority on the server, not the desktop app
