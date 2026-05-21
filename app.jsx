import React, { useState, useMemo, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { RUNS, PROMPT } from "./data.js";
import {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRadio,
  TweakSelect,
} from "./tweaks-panel.jsx";

// ── Thumbnail ───────────────────────────────────────────────────────────────
// Priority: explicit thumbnail image > live iframe of the URL > typographic placeholder.
function Thumb({ url, model, harness, thumbnail }) {
  const wrapRef = useRef(null);
  const frameRef = useRef(null);
  const [imgFailed, setImgFailed] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);

  const useImage = thumbnail && !imgFailed;
  const useIframe = !useImage && !iframeFailed;

  // Scale 1440x900 iframe to fit the card thumb
  useEffect(() => {
    if (!useIframe) return;
    const wrap = wrapRef.current;
    const frame = frameRef.current;
    if (!wrap || !frame) return;
    const apply = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      const s = Math.max(w / 1440, h / 900);
      frame.style.transform = `scale(${s})`;
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [useIframe]);

  useEffect(() => {
    if (!useIframe) return;
    const t = setTimeout(() => { if (!iframeLoaded) setIframeFailed(true); }, 4500);
    return () => clearTimeout(t);
  }, [useIframe, iframeLoaded]);

  return (
    <div className="card__thumb">
      <div className="thumb__frame-wrap" ref={wrapRef}>
        {useImage && (
          <img
            className="thumb__image"
            src={thumbnail}
            alt={`${model} · ${harness}`}
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        )}
        {useIframe && (
          <iframe
            ref={frameRef}
            className="thumb__frame"
            src={url}
            loading="lazy"
            sandbox="allow-same-origin"
            onLoad={() => setIframeLoaded(true)}
            onError={() => setIframeFailed(true)}
            title={`${model} · ${harness}`}
          />
        )}
        {!useImage && (iframeFailed || !iframeLoaded) && (
          <div className="thumb__placeholder">
            <div className="mono">{harness}</div>
            <div className="thumb__placeholder-title">{model}</div>
            <div className="mono" style={{ opacity: 0.6 }}>
              {(() => { try { return new URL(url).host; } catch { return url; } })()}
            </div>
          </div>
        )}
      </div>
      <div className="card__thumb-overlay">
        Open
        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 9L9 3M9 3H4M9 3V8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

// ── Card ────────────────────────────────────────────────────────────────────
function Card({ run, idx }) {
  return (
    <a className="card" href={run.url} target="_blank" rel="noopener noreferrer">
      <Thumb url={run.url} model={run.model} harness={run.harness} thumbnail={run.thumbnail} />
      <div className="card__body">
        <div className="card__meta-row">
          <span className="card__model">{run.model}</span>
          <span className="card__harness">{run.harness}</span>
        </div>
        <h3 className="card__title">{run.title}</h3>
        <p className="card__notes">{run.notes}</p>
        <div className="card__footer">
          <span className="card__index">Run · {String(idx + 1).padStart(3, "0")}</span>
          <span className="card__visit">
            Visit
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 6h8M7 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}

function Chip({ active, onClick, label, count }) {
  return (
    <button className="chip" data-active={active} onClick={onClick}>
      {label}
      <span className="chip__count">{count}</span>
    </button>
  );
}

// ── Prompt view ─────────────────────────────────────────────────────────────
function PromptView({ prompt, runCount }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.body);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = prompt.body;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
      ta.remove();
    }
  };
  const wordCount = prompt.body.trim().split(/\s+/).length;
  const charCount = prompt.body.length;

  return (
    <section className="prompt-view">
      <div className="prompt-view__head">
        <div>
          <div className="prompt-view__eyebrow">The shared prompt</div>
          <h2 className="prompt-view__title">
            <em>{prompt.title}</em>
          </h2>
          <p className="prompt-view__summary">{prompt.summary}</p>
        </div>
        <div className="prompt-view__meta">
          <span><strong>{prompt.version}</strong></span>
          <span>Updated {prompt.updated}</span>
          <span>{wordCount} words · {charCount} chars</span>
        </div>
      </div>

      <div className="prompt-card">
        <div className="prompt-card__bar">
          <div className="prompt-card__bar-left">
            <span className="prompt-card__dot" />
            <span>prompt.md</span>
          </div>
          <button className="prompt-card__copy" data-copied={copied} onClick={copy}>
            {copied ? (
              <>
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M2.5 6.5L5 9L9.5 3.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <rect x="3" y="3" width="6.5" height="6.5" rx="1"/>
                  <path d="M2 8V2h6" strokeLinecap="round"/>
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
        <pre className="prompt-card__body">{prompt.body}</pre>
      </div>

      <div className="prompt-footnote">
        This prompt was used verbatim across all {runCount} runs in the gallery.
      </div>
    </section>
  );
}

// ── Tweaks defaults ─────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "density": "default",
  "sort": "default"
}/*EDITMODE-END*/;

// ── App ─────────────────────────────────────────────────────────────────────
function App() {
  const runs = RUNS;
  const prompt = PROMPT;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const [tab, setTab] = useState(() => (window.location.hash === "#prompt" ? "prompt" : "runs"));
  const [modelFilter, setModelFilter] = useState("all");
  const [harnessFilter, setHarnessFilter] = useState("all");

  useEffect(() => {
    const onHash = () => setTab(window.location.hash === "#prompt" ? "prompt" : "runs");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const goTab = (next) => {
    window.location.hash = next === "prompt" ? "prompt" : "";
    setTab(next);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const models = useMemo(() => {
    const m = new Map();
    runs.forEach(r => m.set(r.model, (m.get(r.model) || 0) + 1));
    return [...m.entries()];
  }, [runs]);

  const harnesses = useMemo(() => {
    const m = new Map();
    runs.forEach(r => m.set(r.harness, (m.get(r.harness) || 0) + 1));
    return [...m.entries()];
  }, [runs]);

  const filtered = useMemo(() => {
    let out = runs.filter(r =>
      (modelFilter === "all" || r.model === modelFilter) &&
      (harnessFilter === "all" || r.harness === harnessFilter)
    );
    if (t.sort === "model") out = [...out].sort((a, b) => a.model.localeCompare(b.model));
    else if (t.sort === "harness") out = [...out].sort((a, b) => a.harness.localeCompare(b.harness));
    else if (t.sort === "title") out = [...out].sort((a, b) => a.title.localeCompare(b.title));
    return out;
  }, [runs, modelFilter, harnessFilter, t.sort]);

  const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <div className="brand">
            <div className="brand__mark"></div>
            <span>harness-lab / runs</span>
          </div>
          <div className="site-header__meta">
            <span><strong>{runs.length}</strong> runs</span>
            <span><strong>{models.length}</strong> models</span>
            <span><strong>{harnesses.length}</strong> harnesses</span>
            <span>Updated · {today}</span>
          </div>
        </div>
      </header>

      <nav className="tabs" data-screen-label="Tabs">
        <button className="tab" data-active={tab === "runs"} onClick={() => goTab("runs")}>
          Runs
          <span className="tab__badge">{runs.length}</span>
        </button>
        <button className="tab" data-active={tab === "prompt"} onClick={() => goTab("prompt")}>
          Prompt
          <span className="tab__badge">{prompt.version || "v0"}</span>
        </button>
      </nav>

      {tab === "runs" && (
        <>
          <section className="hero" data-screen-label="Intro">
            <div>
              <div className="hero__eyebrow">A working archive — {prompt.version || "v0.1"}</div>
              <h1 className="hero__title">
                One prompt, <em>many harnesses</em>, many models — side by side.
              </h1>
              <p className="hero__lede">
                This is a living gallery of test runs. Every entry uses the <strong>same prompt</strong>,
                but varies the model, the harness, or both. Click any card to open the live build
                hosted on Netlify. Notes capture what stood out — what worked, what broke, what
                surprised me.
              </p>
            </div>
            <div className="hero__stats">
              <div className="hero__stat">
                <div className="hero__stat-num">{runs.length}</div>
                <div className="hero__stat-label">Total runs</div>
              </div>
              <div className="hero__stat">
                <div className="hero__stat-num">{models.length}</div>
                <div className="hero__stat-label">Models</div>
              </div>
              <div className="hero__stat">
                <div className="hero__stat-num">{harnesses.length}</div>
                <div className="hero__stat-label">Harnesses</div>
              </div>
            </div>
          </section>

          <nav className="filters">
            <div className="filters__group">
              <span className="filters__label">Model</span>
              <Chip active={modelFilter === "all"} onClick={() => setModelFilter("all")} label="All" count={runs.length} />
              {models.map(([name, n]) => (
                <Chip key={name} active={modelFilter === name} onClick={() => setModelFilter(name)} label={name} count={n} />
              ))}
            </div>
            <div className="filters__group">
              <span className="filters__label">Harness</span>
              <Chip active={harnessFilter === "all"} onClick={() => setHarnessFilter("all")} label="All" count={runs.length} />
              {harnesses.map(([name, n]) => (
                <Chip key={name} active={harnessFilter === name} onClick={() => setHarnessFilter(name)} label={name} count={n} />
              ))}
            </div>
            <div className="filters__right">
              <span className="filters__count">Showing <strong>{filtered.length}</strong> of {runs.length}</span>
            </div>
          </nav>

          <main className="gallery" data-screen-label="Gallery">
            <div className="grid" data-density={t.density}>
              {filtered.map((run) => (
                <Card key={run.url} run={run} idx={runs.indexOf(run)} />
              ))}
            </div>
          </main>
        </>
      )}

      {tab === "prompt" && (
        <main data-screen-label="Prompt">
          <PromptView prompt={prompt} runCount={runs.length} />
        </main>
      )}

      <footer className="site-footer">
        <span>harness-lab · {today}</span>
      </footer>

      <TweaksPanel>
        <TweakSection label="Layout">
          <TweakRadio
            label="Density"
            value={t.density}
            options={[
              { value: "cozy", label: "Cozy" },
              { value: "default", label: "Default" },
              { value: "spacious", label: "Spacious" }
            ]}
            onChange={(v) => setTweak("density", v)}
          />
          <TweakSelect
            label="Sort"
            value={t.sort}
            options={[
              { value: "default", label: "As-listed" },
              { value: "model", label: "By model" },
              { value: "harness", label: "By harness" },
              { value: "title", label: "By title" }
            ]}
            onChange={(v) => setTweak("sort", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
