// Edit this list to add/remove runs. The gallery renders straight from it.
// Each entry: { title, url, harness, model, notes, thumbnail }
// - thumbnail: path to a screenshot of the run (or leave empty to fall back to a placeholder).
export const RUNS = [
  {
    title: "Mushroom Kingdom Side-Scroller — Anthropic Sonnet 4.7 (Opencode Zen)",
    url: "https://mario-sonnet-opencode.netlify.app/",
    harness: "Opencode",
    model: "Anthropic Sonnet 4.7 (Opencode Zen)",
    thumbnail: "thumbnails/mario-claude-sonnet.png",
    notes: "Using superpowers"
  },
  {
    title: "Mushroom Kingdom Side-Scroller — Anthropic Sonnet 4.7",
    url: "https://mario-sonnet-cc.netlify.app/",
    harness: "Claude Code",
    model: "Anthropic Sonnet 4.7",
    thumbnail: "thumbnails/mario-claude-sonnet-cc.png",
    notes: "Using superpowers. Incomplete run — build is a placeholder boot scene, no playable game."
  },
  {
    title: "Mushroom Kingdom Side-Scroller — Deepseek V4 Pro (Opencode Go)",
    url: "https://mario-deepseek-v4-pro.netlify.app/",
    harness: "Opencode",
    model: "Deepseek V4 Pro (Opencode Go)",
    thumbnail: "thumbnails/mario-deepseek-v4.png",
    notes: "superpowers"
  },
  {
    title: "Mushroom Kingdom Side-Scroller — GLM 5.1 (Z.ai)",
    url: "https://mario-glm-51-opencode.netlify.app/",
    harness: "Opencode",
    model: "GLM 5.1 (Z.ai)",
    thumbnail: "thumbnails/mario-gln-5.1.png",
    notes: "superpowers"
  },
  {
    title: "Mushroom Kingdom Side-Scroller — MiniMax 2.7 (Opencode Go)",
    url: "https://mario-mm27.netlify.app/",
    harness: "Opencode",
    model: "MiniMax 2.7 (Opencode Go)",
    thumbnail: "thumbnails/mario-mm2.7.png",
    notes: "superpowers"
  },
  {
    title: "Mushroom Kingdom Side-Scroller — Anthropic Opus 4.7",
    url: "https://mario-opus-cc.netlify.app/",
    harness: "Claude Code",
    model: "Anthropic Opus 4.7",
    thumbnail: "thumbnails/mario-opus.png",
    notes: "superpowers"
  },
  {
    title: "Mushroom Kingdom Side-Scroller — Qwen 3.6 (Opencode Go)",
    url: "https://mario-qwen-36-opencode.netlify.app/",
    harness: "Opencode",
    model: "Qwen 3.6 (Opencode Go)",
    thumbnail: "thumbnails/mario-qwen36.png",
    notes: "superpowers"
  },
  {
    title: "Mushroom Kingdom Side-Scroller — Qwen 3.6 (Opencode Go)",
    url: "https://mario-qwen-36-pi.netlify.app/",
    harness: "Pi",
    model: "Qwen 3.6 (Opencode Go)",
    thumbnail: "thumbnails/mario-qwen36-pi.png",
    notes: "Janus Orchestrator"
  }
];

// The shared prompt every run is tested against. Replace the body with your real prompt.
export const PROMPT = {
  version: "v0.3",
  updated: "2026-05-12",
  title: "Pelican-on-a-bicycle (SVG benchmark)",
  summary: "A single self-contained SVG of a pelican riding a bicycle. Tests composition, anatomical correctness, and how a model balances detail with restraint.",
  body: `You are an artist with a strong sense of composition and economy of line. Your task is to produce a single, self-contained SVG image of a pelican riding a bicycle.

Requirements
------------
1. The output must be a complete, valid SVG document. Begin with <svg ...> and end with </svg>. Do not wrap it in code fences or commentary.
2. The viewBox must be "0 0 1000 700". Width and height attributes should be omitted so the SVG scales cleanly.
3. The pelican must be clearly identifiable as a pelican — visible beak with a pouch, and bird-like posture.
4. The bicycle must be clearly identifiable as a bicycle — two wheels of roughly equal size, a frame connecting them, handlebars, and a seat.
5. The pelican must be sitting on the bicycle, not next to it or above it. Its feet should be on the pedals or its body on the seat in a plausible way.

Style guidance
--------------
- Prefer clean, deliberate strokes over busy detail. Aim for under 80 paths total.
- A limited palette is fine — black-on-white is acceptable, but a single accent color is encouraged.
- Avoid raster filters, embedded images, or external references. Pure SVG primitives only.
- Do not include text in the image.

Process
-------
Before writing the SVG, briefly think (inside an HTML comment at the very top of the SVG) about:
- the overall composition (where the bike sits in the frame)
- the proportions of the pelican relative to the bike
- which two or three details will sell the "pelican-ness"

Then produce the SVG.

Output format
-------------
Return only the SVG document. No preamble, no explanation, no closing remarks. The very first character of your response must be "<".`
};
