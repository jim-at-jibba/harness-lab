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
    notes: "Using superpowers"
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
  },
  {
    title: "Mushroom Kingdom Side-Scroller — Anthropic Fable 5",
    url: "https://mario-claude-fable-cc.netlify.app/",
    harness: "Claude Code",
    model: "Anthropic Fable 5",
    thumbnail: "thumbnails/mario-claude-fable-cc.png",
    notes: "superpowers"
  },
  {
    title: "Mushroom Kingdom Side-Scroller — MiMo 2.5 Pro",
    url: "https://mario-mimo25-pro-pi.netlify.app/",
    harness: "Pi",
    model: "MiMo 2.5 Pro",
    thumbnail: "thumbnails/mario-mimo2.5pro-pi.png",
    notes: ""
  }
];

// The shared PRD every run is built against.
export const PROMPT = {
  version: "v1",
  updated: "2026-05-21",
  title: "Mushroom Kingdom Side-Scroller — PRD",
  summary: "A browser-based Mario-style 2D platformer in Phaser 3 — one polished, procedurally-generated level with running, jumping, enemy stomps, power-ups, and a clear win condition. The shared product spec every run is built against.",
  body: `# PRD – Mushroom Kingdom Side-Scroller
**Engine:** Phaser 3 · **Scope:** Single polished level · **Status:** Draft

---

## 1. Overview
A browser-based Mario-style 2D platformer built in Phaser 3. The player runs, jumps, stomps enemies, and collects power-ups across one fully realised level with a clear start and win condition.

---

## 2. Goals
- Deliver a playable, shareable single-level game in the browser (no install).
- Demonstrate core platformer feel: responsive controls, satisfying jump arc, enemy interaction.
- Establish a clean Phaser 3 architecture that can be extended to multiple levels later.

---

## 3. Non-Goals (v1)
- Multiple levels or world map
- Boss fights
- Multiplayer
- Mobile touch controls
- Save / persist progress

---

## 4. Player & Controls

| Action | Input |
|---|---|
| Move left / right | Arrow keys or A / D |
| Jump | Space or Up arrow |
| Run (faster move) | Hold Shift |

**Feel targets:**
- Jump arc should feel weighty — fast rise, slightly slower fall.
- Coyote time: ~100ms grace window after walking off a ledge.
- Jump buffering: ~80ms input buffer before landing.

---

## 5. Level Design

**Structure:** Linear left-to-right scroll, ~60 tiles wide.

| Zone | Description |
|---|---|
| Opening (tiles 0–10) | Flat ground, tutorial coins, one Goomba |
| Mid section (tiles 10–40) | Platforms at varying heights, pipes, coin blocks, 2–3 enemies |
| Climax (tiles 40–55) | Tighter jumps, more enemies, hidden 1-up |
| End (tiles 55–60) | Flag pole / finish trigger |

**Tiles needed:** Ground, platform, brick block, question block, pipe (top + body), background sky/hills/clouds (parallax, 2 layers).

---

## 6. Enemies

### Goomba
- Spawns on ground or platforms.
- Walks in one direction, reverses on edge or wall collision.
- **Stomp kill:** Player lands on top → squash animation → +100 pts.
- **Side hit:** Player touches side → player takes damage.

### Koopa (stretch goal, v1.1)
- Same walk logic as Goomba.
- Stomp → retreats into shell; shell can be kicked.

---

## 7. Power-ups & Collectibles

| Item | Source | Effect |
|---|---|---|
| Coin | Floating or in ? block | +10 pts, play jingle |
| Super Mushroom | ? block | Player grows to "Super" state; one hit buffer |
| Fire Flower (stretch) | ? block (Super state only) | Unlocks fireball throw |
| 1-Up Mushroom | Hidden brick | +1 extra life |

**Player states:** Small → Super (mushroom) → Dead (no more lives).
Hit while Super → shrink to Small. Hit while Small → lose a life.

---

## 8. Camera & World
- Phaser \`follow\` camera locked to player, clamped to world bounds.
- Camera does **not** scroll left (no backtracking).
- Parallax: 2 background layers at 0.2× and 0.5× scroll speed.

---

## 9. UI / HUD

\`\`\`
 SCORE: 003200   COINS: x14   LIVES: x3   TIME: 312
\`\`\`

- HUD rendered in a fixed Scene layered over the game Scene.
- Timer counts down from 400; reaching 0 kills the player.
- "GAME OVER" screen on 0 lives → restart button.
- "LEVEL CLEAR" screen on flag touch → final score tally.

---

## 10. Audio

| Event | Sound |
|---|---|
| Jump | Classic boing SFX |
| Stomp enemy | Squash SFX |
| Coin collect | Coin jingle |
| Power-up collect | Power-up fanfare |
| Player death | Death SFX + brief silence |
| Background | Looping overworld BGM |

All audio via Phaser's WebAudio manager. Mute toggle in HUD.

---

## 11. Technical Architecture

\`\`\`
src/
  scenes/
    Boot.js        – preload assets
    Game.js        – main gameplay scene
    HUD.js         – overlay UI scene
    GameOver.js    – game over screen
    LevelClear.js  – win screen
  entities/
    Player.js
    Goomba.js
    PowerUp.js
    Coin.js
  config/
    levelData.js   – tile map + enemy spawn config
  index.js         – Phaser.Game bootstrap
\`\`\`

**Tilemap:** Tiled JSON format, loaded via \`Phaser.Tilemaps\`.
**Physics:** Phaser Arcade Physics (no Matter.js needed at this scope).
**Asset format:** Spritesheets (PNG + JSON), OGG audio with MP3 fallback.

---

## 12. Success Metrics (v1)
- Level completable start to finish with no soft-locks.
- Controls feel responsive at 60 fps on a mid-range laptop.
- Enemy stomp, mushroom power-up, and coin collection all work correctly.
- Game over and level clear flows both reachable and functional.

---

## 13. Resolved Decisions

| Question | Decision |
|---|---|
| Assets | Kenney open-licence packs (Platformer Pack Redux recommended) |
| Level authoring | Procedural generation via JS config — no Tiled dependency |
| Phaser version | Phaser **3.80** (latest stable as of early 2026) |
| Deployment | Netlify — static site, no server required |

---

## 14. Asset Pipeline (Kenney)

**Kenney pack:** [New Platformer Pack](https://kenney.nl/assets/new-platformer-pack)
Provides: tiles, characters, enemies, items, UI elements — all CC0. Modern pixel art style with larger sprites (16×16 base tile, characters up to 16×24).

Pre-packed spritesheets are included in \`Spritesheets/\` — no TexturePacker step needed.

**Files we'll use (default resolution):**

| File | Used for |
|---|---|
| \`spritesheet-tiles-default.png\` + \`.xml\` | Ground, platforms, blocks, pipes |
| \`spritesheet-characters-default.png\` + \`.xml\` | Player character + animations |
| \`spritesheet-enemies-default.png\` + \`.xml\` | Goomba-equivalent enemy |
| \`spritesheet-backgrounds-default.png\` + \`.xml\` | Parallax sky / scenery layers |

**Audio files** from \`Sounds/\` mapped to game events:

| File | Event |
|---|---|
| \`sfx_jump.ogg\` | Jump |
| \`sfx_bump.ogg\` | Hit brick block |
| \`sfx_coin.ogg\` | Coin collect |
| \`sfx_magic.ogg\` | Power-up collect |
| \`sfx_hurt.ogg\` | Player takes damage |
| \`sfx_disappear.ogg\` | Enemy stomped |
| \`sfx_gem.ogg\` | Level clear jingle |

**Atlas loading note:** Kenney ships XML in Starling/Sparrow format. Phaser 3 loads this via:
\`\`\`js
this.load.atlas('tiles', 'assets/spritesheet-tiles-default.png', 'assets/spritesheet-tiles-default.xml');
\`\`\`
Phaser 3.60+ handles Starling XML natively — no conversion needed.

Copy the 4 spritesheet PNG+XML pairs and the \`Sounds/\` folder into \`public/assets/\` as-is.

---

## 15. Procedural Level Generation

Level is generated at runtime from a weighted ruleset, not stored as a Tiled map.

**Generator responsibilities:**
- Place ground tiles across the full level width.
- Punch gaps (min 1 tile, max 3 tiles) at regular intervals.
- Spawn floating platforms (1–4 tiles wide) at heights 2–4 tiles above ground.
- Place pipes (height 2–3) with minimum spacing of 8 tiles.
- Distribute ? blocks and brick blocks above ground/platforms.
- Seed enemy spawns based on zone (density increases toward end).
- Guarantee a valid path: every gap jumpable, every section reachable.

**Config knobs** (in \`src/config/levelConfig.js\`):
\`\`\`js
export const LEVEL_CONFIG = {
  seed: null,           // null = random; set a number to replay same level
  widthTiles: 60,
  gapFrequency: 0.12,   // probability per tile column of a gap starting
  platformDensity: 0.3, // fraction of columns with a floating platform
  enemyDensity: 0.08,   // enemies per walkable tile column
  powerUpRate: 0.4,     // fraction of ? blocks that contain a mushroom
};
\`\`\`

---

## 16. Deployment (Netlify)

**Build setup:**
- Bundler: **Vite** (zero-config, fast HMR, produces optimised static output).
- Output dir: \`dist/\` — point Netlify publish directory here.

**\`netlify.toml\`:**
\`\`\`toml
[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
\`\`\`

**Deploy flow:**
1. Push to \`main\` → Netlify CI runs \`vite build\`.
2. Assets in \`public/\` are copied as-is (no hashing) — keeps Phaser asset paths stable.
3. Preview deploys on PRs via Netlify's automatic branch deploy.`
};
