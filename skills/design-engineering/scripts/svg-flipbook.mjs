#!/usr/bin/env node
// svg-flipbook.mjs — assemble a folder of SVG frames into one self-contained animated SVG.
//
//   node scripts/svg-flipbook.mjs frames/ [--fps 12] [--out mascot.svg] [--name mascot]
//                                        [--no-loop] [--vars] [--title "Rooster waving"]
//
// Each frame becomes a <g class="frame"> layer; a stepped CSS keyframe animation inside the
// file shows one layer at a time, so the result plays when inlined AND when loaded as <img>.
// Identical consecutive frames are collapsed into a longer hold. With --vars, every fill /
// stroke color is lifted to a CSS custom property (--c1, --c2 …) with the original as the
// fallback, so the whole character recolors from outside the file. prefers-reduced-motion
// freezes on the first frame. No dependencies; Node 18+.
//
// Pipeline context: references/svg/video-to-vector-pipeline.md (frames come from ffmpeg +
// vtracer; run SVGO on each frame first for a small file).

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";

const args = process.argv.slice(2);
const dir = args.find((a) => !a.startsWith("--"));
if (!dir) {
  console.error("usage: node svg-flipbook.mjs <frames-dir> [--fps 12] [--out file.svg] [--name id] [--no-loop] [--vars] [--title text]");
  process.exit(1);
}
const flag = (name, fallback) => { const i = args.indexOf(name); return i === -1 ? fallback : args[i + 1]; };
const fps = Number(flag("--fps", "12"));
const out = resolve(flag("--out", "flipbook.svg"));
const name = flag("--name", basename(out, ".svg")).replace(/[^a-zA-Z0-9_-]/g, "-");
const title = flag("--title", "");
const loop = !args.includes("--no-loop");
const lift = args.includes("--vars");

const files = readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".svg")).sort();
if (!files.length) { console.error(`no .svg frames in ${dir}`); process.exit(1); }

// ---------------------------------------------------------------- parse frames
const viewBoxOf = (svg) => /viewBox="([^"]+)"/.exec(svg)?.[1] ?? null;
const innerOf = (svg) => {
  const open = svg.indexOf(">", svg.indexOf("<svg"));
  const close = svg.lastIndexOf("</svg>");
  if (open === -1 || close === -1) throw new Error("not an svg");
  return svg.slice(open + 1, close)
    .replace(/<\?xml[\s\S]*?\?>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<metadata[\s\S]*?<\/metadata>/g, "")
    .replace(/<title>[\s\S]*?<\/title>/g, "")
    .replace(/<desc>[\s\S]*?<\/desc>/g, "")
    .trim();
};

let viewBox = null;
const frames = [];
for (const f of files) {
  const svg = readFileSync(join(dir, f), "utf8");
  viewBox ??= viewBoxOf(svg);
  const inner = innerOf(svg);
  const last = frames.at(-1);
  if (last && last.inner === inner) last.hold += 1;   // identical consecutive frame → longer hold
  else frames.push({ file: f, inner, hold: 1 });
}
if (!viewBox) { console.error("frames carry no viewBox — add one (references/svg/svg-creation.md)"); process.exit(1); }

// ---------------------------------------------------------------- lift colors to variables
const palette = new Map(); // color → var name
const liftColors = (markup) =>
  markup.replace(/(fill|stroke)="(#[0-9a-fA-F]{3,8}|rgb\([^)]*\))"/g, (_, attr, color) => {
    const key = color.toLowerCase();
    if (!palette.has(key)) palette.set(key, `--c${palette.size + 1}`);
    return `${attr}="var(${palette.get(key)}, ${color})"`;
  });
if (lift) for (const fr of frames) fr.inner = liftColors(fr.inner);

// ---------------------------------------------------------------- stepped keyframes
const totalTicks = frames.reduce((n, fr) => n + fr.hold, 0);
const duration = totalTicks / fps;
let tick = 0;
const keyframes = frames.map((fr, i) => {
  const start = (tick / totalTicks) * 100;
  tick += fr.hold;
  const end = (tick / totalTicks) * 100;
  return { i, start: +start.toFixed(3), end: +end.toFixed(3) };
});
// Each frame is visible only inside its own window; steps() keeps it crisp.
const css = keyframes.map(({ i, start, end }) => {
  const stops = [];
  if (start > 0) stops.push(`${start}%{visibility:hidden}`);
  stops.push(`${start}%{visibility:visible}`);
  if (end < 100) stops.push(`${end}%{visibility:hidden}`);
  return `@keyframes ${name}-f${i}{${stops.join("")}}`;
}).join("\n");

const fill = loop ? "infinite" : "forwards";
const style = `
<style>
#${name} .frame{visibility:hidden;animation-duration:${duration.toFixed(4)}s;animation-timing-function:step-end;animation-iteration-count:${fill === "infinite" ? "infinite" : 1};animation-fill-mode:forwards}
${frames.map((_, i) => `#${name} .f${i}{animation-name:${name}-f${i}}`).join("\n")}
${css}
#${name} .f0{visibility:visible}
@media (prefers-reduced-motion: reduce){#${name} .frame{animation:none;visibility:hidden}#${name} .f0{visibility:visible}}
</style>`.trim();

const layers = frames.map((fr, i) =>
  `<g class="frame f${i}" data-frame="${i}" data-hold="${fr.hold}" data-src="${fr.file}">\n${fr.inner}\n</g>`).join("\n");

const a11y = title
  ? `<title id="${name}-title">${title}</title>`
  : "";
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" id="${name}" role="img"${title ? ` aria-labelledby="${name}-title"` : ' aria-hidden="true"'}>
${a11y}
${style}
${layers}
</svg>
`;
writeFileSync(out, svg);

const kb = (Buffer.byteLength(svg) / 1024).toFixed(1);
console.log(`${files.length} frames → ${frames.length} unique (${totalTicks} ticks @ ${fps}fps = ${duration.toFixed(2)}s, ${loop ? "loop" : "once"})`);
if (lift) console.log(`${palette.size} colors lifted: ${[...palette.entries()].map(([c, v]) => `${v}=${c}`).join(" ")}`);
console.log(`wrote ${out} (${kb} KB)`);
if (Number(kb) > 80) console.log("over 80 KB — the vectorizer likely left slivers; clean frames (SVGO, speckle filter) and rerun. See references/svg/video-to-vector-pipeline.md");
