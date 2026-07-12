# SGR Signature — Tier 3 Website

Premium bilingual (Kannada + English) website for **Sri Guru Raghavendra Pattina Souharda Sahakari Sangha Niyamita, Manvi**.

Built per Tier 3 (Signature) spec: Vite + React, React Three Fiber 3D hero, Framer Motion, Tailwind, SEO schema, fully responsive with mobile / reduced-motion fallback.

## Run locally

```bash
cd sgr-signature
npm install
npm run dev
```

Open the printed local URL (default http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to Netlify or Vercel.

## Structure

- `src/data/society.js` — all factual data (offices, board, staff, schemes, 10-year progress).
- `src/i18n/` — language context + English/Kannada translations.
- `src/components/Coin3D.jsx` — procedural 3D gold coin hero (no external assets).
- `src/sections/` — Hero, About, Stats, Schemes, Progress, Leadership, Contact.

## Editing content

- Update facts/figures in `src/data/society.js`.
- Update UI text/translations in `src/i18n/translations.js`.
- Language toggle (EN / ಕನ್ನಡ) is in the navbar; preference is saved per browser.

## Notes

- The enquiry form currently opens the visitor's email client to `sgr900manvi@gmail.com`.
  To capture leads automatically, connect EmailJS or Resend in `src/sections/Contact.jsx`.
- Interest rates and scheme terms shown are from the provided data and marked indicative.
