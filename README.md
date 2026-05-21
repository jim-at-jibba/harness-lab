# harness-lab

A working archive of AI coding test runs. Every entry uses the **same prompt** but varies the model, the harness, or both — rendered as a side-by-side gallery so the results compare cleanly.

The current prompt is a pelican-on-a-bicycle SVG benchmark; the runs are Mushroom Kingdom side-scroller builds across Claude Code, Opencode, and Pi harnesses.

## Stack

- React 18
- [Vite](https://vite.dev/) — bundler + dev server
- No backend. Static site.

## Develop

```bash
npm install
npm run dev      # dev server with HMR
```

```bash
npm run build    # production bundle → dist/
npm run preview  # serve the built dist/ locally
```

## Project layout

| Path | Purpose |
|------|---------|
| `index.html` | Entry point — loads `app.jsx` as an ES module |
| `app.jsx` | Gallery UI: cards, filters, prompt view |
| `tweaks-panel.jsx` | Reusable Tweaks panel + form controls |
| `data.js` | The runs list and shared prompt — **edit this to add runs** |
| `styles.css` | All styling |
| `public/thumbnails/` | Run screenshots (served at `/thumbnails/...`) |

## Add a run

Append an entry to the `RUNS` array in `data.js`:

```js
{
  title: "...",
  url: "https://...",        // live build; leave "" to skip the link
  harness: "Claude Code",
  model: "Anthropic Opus 4.7",
  thumbnail: "thumbnails/your-screenshot.png",  // optional
  notes: "What stood out."
}
```

Drop the screenshot in `public/thumbnails/`. With no `thumbnail`, the card falls back to a live iframe of `url`, then a typographic placeholder.

## Deploy

Configured for [Netlify](https://www.netlify.com/) via `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist`

```bash
netlify deploy --prod
```

Or connect the GitHub repo in the Netlify dashboard — it reads `netlify.toml` automatically.
