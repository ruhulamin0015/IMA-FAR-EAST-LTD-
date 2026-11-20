# Deploying IMA Far East Ltd. to Cloudflare

This project is pre-configured for **Cloudflare Workers (Static Assets)** and **Cloudflare Pages**.
All 370+ static assets (WebP renders, PDF catalogs, and MP4 video) are verified under Cloudflare's 25 MiB per-file limit (largest file is 9.1 MB).

---

## Option 1: Cloudflare Workers + Git Integration (Recommended by Cloudflare)

1. Push this repository to **GitHub** or **GitLab**.
2. Open the **Cloudflare Dashboard** → **Workers & Pages** → **Create** → **Import a repository**.
3. Select your repository and use these settings:
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
   - **Node version:** `22` (auto-detected via `.node-version` / `.nvmrc`)
4. Click **Save and Deploy**.

`wrangler.jsonc` automatically serves `./dist` from Cloudflare's edge with `"not_found_handling": "single-page-application"`, so all deep routes (`/machines/890b-phoenix`, `/about`, `/gallery`, `/solutions`, `/service`, `/contact`) work on direct refresh.

### Deploy via CLI (from your terminal)
```bash
npm install
npx wrangler login
npm run deploy:cloudflare
```

---

## Option 2: Cloudflare Pages (Git or Direct Upload)

1. Open **Cloudflare Dashboard** → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Use these build settings:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment Variable (optional):** `NODE_VERSION` = `22`
3. Click **Save and Deploy**.

> Note: If deploying to **Cloudflare Pages** via Git, `public/_redirects` and `public/_headers` are automatically copied into `dist/` to handle SPA routing and edge caching. (If Cloudflare Pages warns about `assets` in `wrangler.jsonc`, you can deploy using Option 1 Workers or deploy via CLI with `npm run deploy:pages`.)
