#!/usr/bin/env node
// Renders what the model actually built: for each chosen fixture, the plain arm's answer and the
// full-skill arm's answer side by side, as one PNG, in headless Chrome. No dependencies.
//
//   node bench/render.mjs bench/results/2026-11-07-opus-ablation
//   node bench/render.mjs <run> --fixtures edit-hover-01,gen-modal-01 --try 1 --out docs/readme/img
//   node bench/render.mjs <run> --fixtures repair-darkmode-01@2      # a fixture at a given try
//
// Writes docs/readme/img/out-<fixture>.png. Needs the run's runs/ folder (git-ignored, on the
// machine that ran the sweep) and Google Chrome: CHROME=<path> overrides the default location.
//
// How each answer becomes a page:
//   - HTML answers render as written. A <dialog> is opened (showModal) so a modal is on screen.
//   - CSS-only answers get a fixed demo markup per fixture (RECIPES below).
//   - Hover states are forced: `:hover` is rewritten to `.is-hover` and the target gets that class
//     plus pointerenter / mouseenter, so JS tooltips open too. `(hover: hover)` queries are left alone.
//   - After the open and tooltip delays have run (real time, over the DevTools protocol), every
//     transition is finished, so the shot shows end states, not a frame mid-fade.

import { readFileSync, writeFileSync, mkdirSync, existsSync, mkdtempSync, rmSync, statSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { tmpdir } from "node:os";
import { spawn } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const runDir = args.find((a, i) => !a.startsWith("--") && !(i > 0 && args[i - 1].startsWith("--")));
if (!runDir) { console.error("usage: node bench/render.mjs <bench/results/run> [--fixtures a,b@2] [--try 1] [--out docs/readme/img]"); process.exit(1); }
const RUNS = join(resolve(runDir), "runs");
if (!existsSync(RUNS)) { console.error(`no runs/ in ${runDir}: the raw answers are git-ignored and only exist where the sweep ran`); process.exit(1); }
const OUT = resolve(opt("out", join(ROOT, "docs/readme/img")));
const TRY = Number(opt("try", 1));
const CHROME = process.env.CHROME || process.env.CHROME_PATH || (process.platform === "win32" ? "C:/Program Files/Google/Chrome/Application/chrome.exe" : process.platform === "darwin" ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" : "google-chrome");
const report = (() => { try { return JSON.parse(readFileSync(join(resolve(runDir), "report.json"), "utf8")); } catch { return {}; } })();
const MODEL = { opus: "Opus 5.5", sonnet: "Sonnet 4.6", haiku: "Haiku 4.5" }[report.model] || report.model || "model";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const BASE = "<style>html,body{margin:0}body{font-family:system-ui,-apple-system,'Segoe UI',sans-serif}</style>";
const forceHover = (css) => css.replace(/:hover\b/g, ".is-hover");
// Headless Chrome's virtual time runs timers but not always compositor transitions, so after the
// open/hover delays have passed, jump every finite animation and transition to its end state.
const SETTLE = `<script>setTimeout(()=>{const s=document.createElement('style');s.textContent='*,*::before,*::after{transition:none!important}';document.head.appendChild(s);for(const a of document.getAnimations()){try{a.finish()}catch(e){}}},1500)</script>`;

// Per-fixture recipe: how tall the pane is, and how to turn the answer into a page.
const RECIPES = {
  "edit-hover-01": {
    lang: "css", height: 190,
    page: (css) => {
      const card = (label, hover) => `<div class="card${hover ? " is-hover" : ""}" style="padding:20px;background:#fff;width:190px;font-size:14px;border-radius:12px"><b>${label}</b><div style="color:#666;margin-top:6px">Monthly report</div></div>`;
      return `${BASE}<style>${forceHover(css)}</style><div style="display:flex;align-items:flex-start;gap:28px;padding:40px 36px;background:#f4f4f5;height:100vh;box-sizing:border-box">${card("Resting")}${card("Hovered", true)}</div>`;
    },
  },
  "repair-darkmode-01": {
    lang: "css", height: 170,
    page: (css) => {
      const card = (n) => `<div class="card" style="padding:18px;border-radius:12px;width:180px;font-size:14px;color:inherit"><b>Invoice #${n}</b><div style="opacity:.6;margin-top:6px">Due in 3 days</div></div>`;
      return `${BASE}<script>document.documentElement.classList.add('dark')</script><style>${css}</style><div class="dark" style="display:flex;align-items:flex-start;gap:20px;padding:36px;height:100vh;box-sizing:border-box;color:#eee">${card(1)}${card(2)}</div>`;
    },
  },
  "gen-modal-01": { lang: "html", height: 470, open: "dialog" },
  "gen-toolbar-01": { lang: "html", height: 360, hover: "button:nth-of-type(2), [role=toolbar] button:nth-child(2)" },
};

function code(answer, lang) {
  const blocks = [...answer.matchAll(/```([a-zA-Z]*)\n([\s\S]*?)```/g)].map((m) => ({ lang: m[1].toLowerCase(), src: m[2] }));
  const mine = blocks.filter((b) => b.lang === lang);
  if (!mine.length) return null;
  // The last block of the language is the finished answer; earlier ones are usually the input or a fragment.
  return lang === "html" ? mine.reduce((a, b) => (b.src.length > a.src.length ? b : a)).src : mine[mine.length - 1].src;
}

function htmlPage(src, recipe) {
  let inject = "";
  if (recipe.open === "dialog") inject += `<script>setTimeout(()=>{const d=document.querySelector('dialog');if(d&&!d.open){try{d.showModal()}catch(e){d.setAttribute('open','')}}if(!(d&&d.open)){const b=[...document.querySelectorAll('button')].find(b=>/settings|open|edit/i.test(b.textContent));if(b)b.click()}},300)</script>`;
  if (recipe.hover) inject += `<script>setTimeout(()=>{const el=document.querySelector(${JSON.stringify(recipe.hover)});if(!el)return;el.classList.add('is-hover');for(const t of ['pointerover','pointerenter'])el.dispatchEvent(new PointerEvent(t,{pointerType:'mouse',bubbles:t==='pointerover'}));for(const t of ['mouseover','mouseenter'])el.dispatchEvent(new MouseEvent(t,{bubbles:t==='mouseover'}))},300)</script>`;
  if (recipe.hover) src = src.replace(/<style([^>]*)>([\s\S]*?)<\/style>/g, (_, a, css) => `<style${a}>${forceHover(css)}</style>`);
  inject += SETTLE;
  return /<\/body>/i.test(src) ? src.replace(/<\/body>/i, inject + "</body>") : src + inject;
}

function load(arm, fx, t) {
  const f = join(RUNS, arm, `${fx}.t${t}.json`);
  if (!existsSync(f)) throw new Error(`missing ${f}`);
  return JSON.parse(readFileSync(f, "utf8"));
}

const wanted = (opt("fixtures", Object.keys(RECIPES).join(","))).split(",").map((s) => s.trim()).filter(Boolean);
mkdirSync(OUT, { recursive: true });
const work = mkdtempSync(join(tmpdir(), "de-render-"));
const fixtures = (() => { try { return Object.fromEntries(readFileSync(join(ROOT, "skills/design-engineering/evals/design-bench.jsonl"), "utf8").trim().split("\n").map((l) => JSON.parse(l)).map((f) => [f.id, f])); } catch { return {}; } })();
let failed = 0;
let browser = null; // one Chrome for every fixture, started on the first shot
for (const w of wanted) {
  const [fx, tStr] = w.split("@");
  const t = tStr ? Number(tStr) : TRY;
  const recipe = RECIPES[fx];
  if (!recipe) { console.error(`${fx}: no recipe; add one to RECIPES in bench/render.mjs`); failed++; continue; }
  const f = fixtures[fx] || {};
  const ask = f.prompt || f.instruction || f.issue || fx;
  const panes = [];
  for (const [arm, label] of [["none", `${MODEL} alone`], ["full", `${MODEL} + design-engineering`]]) {
    const r = load(arm, fx, t);
    const src = code(r.answer || "", recipe.lang);
    if (!src) { console.error(`${fx} ${arm} t${t}: no \`\`\`${recipe.lang} block in the answer`); failed++; continue; }
    const doc = recipe.lang === "html" ? htmlPage(src, recipe) : recipe.page(src) + SETTLE;
    panes.push(`<figure><figcaption><b>${esc(label)}</b><span>${r.score.passed} of ${r.score.rules} rules</span></figcaption><iframe srcdoc="${esc(doc)}" style="height:${recipe.height}px"></iframe></figure>`);
  }
  if (panes.length < 2) continue;
  const W = 960, H = 64 + 46 + recipe.height + 28;
  const page = `<!doctype html><meta charset="utf-8"><style>
body{margin:0;padding:22px 24px;background:#fafafa;font:13px/1.4 system-ui,-apple-system,'Segoe UI',sans-serif;color:#18181b}
p{margin:0 0 14px;color:#52525b}p b{color:#18181b;font-weight:600;font-family:ui-monospace,Consolas,monospace;font-size:12px}
.row{display:flex;gap:16px}figure{margin:0;flex:1;min-width:0;background:#fff;border:1px solid #e4e4e7;border-radius:10px;overflow:hidden}
figcaption{display:flex;justify-content:space-between;padding:10px 14px;border-bottom:1px solid #e4e4e7}figcaption b{font-weight:600}figcaption span{color:#71717a}
iframe{border:0;width:100%;display:block}</style>
<p><b>${esc(fx)}</b> · ${esc(ask)} · try ${t}</p><div class="row">${panes.join("")}</div>`;
  const htmlFile = join(work, `${fx}.html`);
  writeFileSync(htmlFile, page);
  const out = join(OUT, `out-${fx}.png`);
  try { await shoot(pathToFileURL(htmlFile).href, out, W, H); }
  catch (e) { console.error(`${fx}: ${e.message}. Set CHROME to your Chrome binary.`); failed++; continue; }
  console.log(`${out.replace(ROOT, ".").replace(/\\/g, "/")}  (try ${t})`);
}
if (browser) { const gone = new Promise((ok) => browser.proc.once("exit", ok)); browser.proc.kill(); await gone; }
if (process.env.DE_RENDER_KEEP) console.log(`pages kept in ${work}`);
else for (let i = 0; i < 10; i++) { try { rmSync(work, { recursive: true, force: true }); break; } catch { await new Promise((ok) => setTimeout(ok, 300)); } } // Chrome lets go of its profile a beat after exit on Windows
process.exit(failed ? 1 : 0);

// ---------- Chrome over the DevTools protocol (Node's built-in WebSocket, no packages) ----------
// Real time, not --virtual-time-budget: a one-shot `--screenshot` can return a frame painted before
// late DOM changes (a tooltip opened by a timer), and web fonts stall virtual time.
async function launch() {
  const dir = join(work, "profile");
  const proc = spawn(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--no-default-browser-check", "--remote-debugging-port=0", `--user-data-dir=${dir}`, "about:blank"], { stdio: "ignore" });
  const portFile = join(dir, "DevToolsActivePort");
  for (let i = 0; i < 100 && !existsSync(portFile); i++) await new Promise((ok) => setTimeout(ok, 100));
  if (!existsSync(portFile)) { proc.kill(); throw new Error(`Chrome did not start (${CHROME})`); }
  const port = readFileSync(portFile, "utf8").split("\n")[0].trim();
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const ws = new WebSocket(targets.find((x) => x.type === "page").webSocketDebuggerUrl);
  await new Promise((ok, no) => { ws.onopen = ok; ws.onerror = no; });
  let id = 0; const pending = new Map(), waiters = [];
  ws.onmessage = (m) => { const msg = JSON.parse(m.data); if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); } else if (msg.method) for (const w of waiters.splice(0)) w(msg); };
  const send = (method, params = {}) => new Promise((ok, no) => { const i = ++id; pending.set(i, (m) => (m.error ? no(new Error(m.error.message)) : ok(m.result))); ws.send(JSON.stringify({ id: i, method, params })); });
  const until = (method, ms) => new Promise((ok) => { const t = setTimeout(ok, ms); const w = (msg) => (msg.method === method ? (clearTimeout(t), ok()) : waiters.push(w)); waiters.push(w); });
  await send("Page.enable");
  return { proc, send, until };
}
async function shoot(url, out, W, H) {
  browser ||= await launch();
  const { send, until } = browser;
  await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 2, mobile: false });
  const loaded = until("Page.loadEventFired", 15000);
  await send("Page.navigate", { url });
  await loaded;
  await new Promise((ok) => setTimeout(ok, 2500)); // open/hover delays (300–800 ms) and SETTLE (1500 ms) have run
  const { data } = await send("Page.captureScreenshot", { format: "png" });
  writeFileSync(out, Buffer.from(data, "base64"));
  if (!statSync(out).size) throw new Error("empty screenshot");
}
