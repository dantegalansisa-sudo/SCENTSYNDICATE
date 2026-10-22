# Scent Syndicate — More Than Fragrance

Demo storefront for **Scent Syndicate**, a fragrance house and community from Puerto Rico.

- React 18 + TypeScript + Vite + Framer Motion
- Light editorial palette (ivory, cream, travertine, blush, champagne, sage) with amber accents
- Separate desktop and mobile experiences (cinematic split-headline hero on desktop, swipeable thumb-first hero on mobile)
- Scroll-driven animation throughout, `prefers-reduced-motion` respected, native cursor
- Shop with search and filters (brand, olfactory family, price, type), collections, discovery sets
- Editorial product pages: story, scroll-pinned olfactory journey (top / heart / base), character meters, Syndicate verdict
- Client-side cart with decant sizes (3 / 5 / 10 ml), discount codes (`SYNDICATE15`, `WELCOME10`) and simulated checkout
- EN / ES language toggle, USD pricing

## Run

```bash
npm install
npm run dev
```

`npm run build` outputs a static site to `dist/`. Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.

> Demo website. All trademarks belong to their respective houses.
