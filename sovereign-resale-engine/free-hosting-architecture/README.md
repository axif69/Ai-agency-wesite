# Free Hosting Architecture

This folder describes the zero-budget deployment plan for the Sovereign Sales Engine.

## Recommended stack
- Vercel Hobby: dashboard UI and admin pages
- Cloudflare Workers Free: license server API
- Cloudflare D1 or KV: license storage
- Local desktop app: the actual engine, discovery, enrichment, and outreach logic

## Why this stack
- No permanent Railway bill
- Good free-tier options for a lightweight license API
- Keeps the desktop agent local and under your control
- Lets the dashboard stay separate from the licensing authority

## Request flow
1. User opens the desktop app
2. App checks encrypted local license token
3. If missing or stale, app calls Cloudflare license API
4. Cloudflare verifies activation and device binding
5. App receives signed response and stores it locally
6. Worker only sends outreach if license + outreach settings are both enabled

## Repo folders to add next
- `free-hosting-architecture/cloudflare-license-server`
- `free-hosting-architecture/vercel-dashboard`
- `free-hosting-architecture/shared-contracts`
- `free-hosting-architecture/device-token`

## Suggested implementation order
1. Build the Cloudflare license API
2. Add local encrypted token storage in the desktop app
3. Add periodic verify/recheck logic
4. Add admin actions for revoke/reset
5. Move the dashboard UI to Vercel

## Notes
- This is the cheapest option for getting the product sell-ready
- If traffic grows later, the license API can move from Cloudflare to a paid backend without changing the desktop app contract
