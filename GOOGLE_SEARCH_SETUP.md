# Making IMA Far East Ltd. Live on Google Search

All technical SEO work is already built into this website:
- **Dynamic per-page SEO (`SeoManager`)**: Unique `<title>`, `<meta name="description">`, canonical URL, OpenGraph cards, Twitter cards, and Schema.org **Product / LocalBusiness / Service / BreadcrumbList** JSON-LD on every page and all 75 machines.
- **Auto-generated `sitemap.xml` & `robots.txt`**: Automatically lists all **83 pages** (8 core pages + 75 individual machine product pages) with Google Image Search tags on every build.
- **Branded Favicons & 1200×630 Social Share Banner** (`/favicon.png`, `/apple-touch-icon.png`, `/og-cover.png`).

---

## Step-by-Step: Go Live on Google Search (Takes ~3 Minutes)

### Step 1: Deploy to Cloudflare & Connect Your Custom Domain
1. Deploy your repository on **Cloudflare Workers** (`npm run build` / `npx wrangler deploy`) or **Cloudflare Pages** (`npm run build` / output dir `dist`).
2. Attach your custom domain (e.g., `https://imabangla.com`) in Cloudflare Dashboard.
3. In Cloudflare **Settings → Environment Variables**, add:
   - `SITE_URL` = `https://your-live-domain.com` (so `sitemap.xml` and `robots.txt` automatically use your exact domain).

### Step 2: Verify Ownership in Google Search Console
1. Open **[Google Search Console](https://search.google.com/search-console)** with your Google account (`ruhulamin34629@gmail.com`).
2. Click **Add Property** → choose **Domain** (e.g., `imabangla.com`) or **URL prefix** (`https://imabangla.com`).
   - **Fastest Method (Cloudflare DNS — 1 Click):** Choose **Domain** property → Google auto-detects Cloudflare DNS and offers a **Start Verification** button to authorize automatically, OR copy the TXT record into Cloudflare DNS.
   - **Alternative Method (HTML Meta Tag — Zero Code Edits):** Choose **URL prefix** → **HTML tag** → copy ONLY the `content="..."` token → paste it into Cloudflare Environment Variable `VITE_GOOGLE_SITE_VERIFICATION` and trigger a redeploy.

### Step 3: Submit Your Sitemap to Google
1. Inside Google Search Console, open **Sitemaps** in the left menu.
2. Enter: `sitemap.xml`
3. Click **Submit**. Google will immediately discover all **83 URLs** (Homepage, Machines Catalog, Solutions, 24/7 Service, About, Company, Gallery, Contact, and all 75 individual machine pages).

### Step 4: Request Immediate Indexing for Key Pages
1. In Google Search Console's top **URL Inspection** bar, paste your homepage URL (`https://your-domain.com/`) and click **Request Indexing**.
2. Repeat for `/machines`, `/about`, and `/contact` to speed up initial Google crawl (usually appears in Google Search within 24–72 hours).
3. *(Optional for Dhaka Local Map Ranking)*: Create/claim a **Google Business Profile** at `business.google.com` using your Dhaka HQ address (`Flat 4/E, Holy Haven, 1/3 Iqbal Road, Asad Gate, Dhaka-1207`) and phone (`+88 01711 58 88 43`), linking it to your live website URL.
