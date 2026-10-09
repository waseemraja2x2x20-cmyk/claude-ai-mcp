# SastaCheck

Pakistan grocery price comparison: compare a monthly basket across stores and markets, unit by unit,
with price history, DC rates, receipt reading and an AI basket planner.

Home page at `/` (React + Vite, `src/`), the app at `/app/` (`public/app/`).

Hosting: Cloudflare Pages (site + `functions/api/ai.js`), Supabase (database and sign-in), Google Gemini (AI).

## One-time setup

1. **Supabase** (supabase.com, free plan): New project. Then SQL Editor > New query:
   run `supabase/schema.sql`, then `supabase/seed.sql`.
   Authentication > URL Configuration: set Site URL to your Pages address (e.g. https://sastacheck.pages.dev).
2. **Make yourself admin**: sign in on the site once, then in SQL Editor run
   `insert into admins (user_id) select id from auth.users where email = 'YOUR EMAIL';`
3. **public/app/config.js**: fill in the Project URL and anon public key (Project Settings > API). These are public by design. Add your Instagram link there too.
4. **Cloudflare Pages** (dash.cloudflare.com > Workers & Pages > Create > Pages > Connect to Git): pick `claude-ai-mcp`, production branch `sastacheck`, root directory `sastacheck`.
   Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.
   Settings > Variables and Secrets: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and secret `GEMINI_API_KEY`
   (from aistudio.google.com). Redeploy after adding them.

Sample prices from the first prototype are marked "Sample" in the app. Remove them from the Manage tab
once real prices are in.

The home page's "For stores" form saves to the `leads` table and the `price-lists` storage bucket (only admins can read them).

Local preview: `npm install`, then `npm run dev`.
