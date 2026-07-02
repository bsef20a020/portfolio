# Noor Fatima — Portfolio

Personal portfolio of **Noor Fatima**, Software Engineer & Full-Stack Developer based in Lahore, Pakistan. A single-page site showcasing projects, skills, and experience, with a working contact form.

🔗 **Live:** _add your deployment URL here_

---

## ✨ Features

- **Single-page design** with smooth-scroll navigation and scroll-spy active states
- **Dark / light theme** toggle (WCAG-AA contrast in both modes)
- **Working contact form** — delivers to my inbox via Formspree, with a mailto fallback
- **Responsive** across desktop, tablet, and mobile
- **Accessible** — skip link, keyboard focus styles, ARIA labels, `prefers-reduced-motion`
- **SEO + social previews** — meta tags and an Open Graph card for LinkedIn / WhatsApp / X

## 🛠 Tech Stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- Plain CSS-in-JS (no UI framework)
- [Formspree](https://formspree.io/) for contact-form delivery

## 🚀 Getting Started

```bash
# install dependencies
npm install

# start the dev server (http://localhost:5173)
npm run dev

# production build
npm run build

# preview the production build locally
npm run preview
```

## 📬 Contact form setup

The form posts to a [Formspree](https://formspree.io/) endpoint. Configure it with an
environment variable (falls back to opening the visitor's email client if unset):

```bash
# .env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
```

Vite only reads `.env` at startup, so restart the dev server after changing it.

## 🌐 Deployment

Deploys as a static site on any host (Vercel, Netlify, GitHub Pages):

1. Import the repo and let the host run `npm run build` (output: `dist/`).
2. After deploying, replace `https://your-domain.com` in [`index.html`](index.html)
   with your real URL so the Open Graph / social preview card works.

## 📁 Structure

```
├── index.html          # HTML shell + SEO / Open Graph meta
├── public/             # static assets (favicon, og-image.png)
├── src/
│   ├── main.jsx        # React entry
│   └── Portfolio.jsx   # the entire single-page app
└── vite.config.js
```

## 📇 Contact

- **Email:** fatymanoor20@gmail.com
- **LinkedIn:** [noor-fatima](https://linkedin.com/in/noor-fatima-a80026372)
- **GitHub:** [@bsef20a020](https://github.com/bsef20a020)
