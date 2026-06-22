// MachReach JR — standalone landing build (mirrors email-outreach-agent/landing_build/build.mjs).
// Source of truth = the .jsx files + the inline App/IntroOverlay/LOGO_COLORS in
// "MachReach Landing.html". This script transpiles+minifies -> bundle.min.js, then
// pre-renders <App/> in jsdom and emits index.html with RELATIVE asset paths so the
// folder works as a static prototype (no Flask).
//   node build.mjs        -> bundle.min.js + index.html   (real output)
//   node build.mjs test   -> bundle.test.js + index.test.html (safe preview)
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { transformSync } from "esbuild";
import { JSDOM } from "jsdom";

const __dirname = dirname(fileURLToPath(import.meta.url));
const LANDING = __dirname;
const SRC_HTML = join(LANDING, "MachReach Landing.html");

const TEST = process.argv[2] === "test";
const BUNDLE_OUT = TEST ? "bundle.test.js" : "bundle.min.js";
const HTML_OUT = TEST ? "index.test.html" : "index.html";

const read = (f) => readFileSync(join(LANDING, f), "utf-8");
const html = readFileSync(SRC_HTML, "utf-8");
const babelScripts = [...html.matchAll(/<script type="text\/babel">([\s\S]*?)<\/script>/g)];

// --- 1. Gather source ------------------------------------------------------
const jsxFiles = ["icons.jsx", "tweaks-panel.jsx", "hero.jsx",
                  "features.jsx", "sections.jsx", "pricing.jsx"];
const inlinePrereqs = babelScripts
  .map((m) => m[1])
  .filter((code) => code.includes("const LOGO_COLORS") || code.includes("function IntroOverlay"));
let src = inlinePrereqs.join("\n\n") + "\n\n" + jsxFiles.map(read).join("\n\n");

const lastBabel = babelScripts[babelScripts.length - 1];
if (!lastBabel) throw new Error("Could not find inline App bootstrap script in source HTML");
let bootstrap = lastBabel[1].replace(
  /ReactDOM\.createRoot\(document\.getElementById\("root"\)\)\.render\(<App\/>\);/, "");
src += "\n\n" + bootstrap + `
;(function () {
  if (typeof document === "undefined") return;
  var el = document.getElementById("root");
  if (!el) return;
  var element = React.createElement(App);
  if (el.firstElementChild) { ReactDOM.hydrateRoot(el, element); }
  else { ReactDOM.createRoot(el).render(element); }
})();`;

// --- 2. Transpile + minify -------------------------------------------------
const out = transformSync(src, {
  loader: "jsx", jsx: "transform",
  jsxFactory: "React.createElement", jsxFragment: "React.Fragment",
  minify: true, legalComments: "none",
});
writeFileSync(join(LANDING, BUNDLE_OUT), out.code, "utf-8");
console.log(`${BUNDLE_OUT} written (${out.code.length} bytes)`);

// --- 3. Pre-render via jsdom ----------------------------------------------
const reactUMD = readFileSync(join(LANDING, "vendor", "react.production.min.js"), "utf-8");
const reactDomUMD = readFileSync(join(LANDING, "vendor", "react-dom.production.min.js"), "utf-8");
const dom = new JSDOM(
  '<!doctype html><html><head></head><body><div id="root"></div></body></html>',
  { runScripts: "dangerously", pretendToBeVisual: true });
const w = dom.window;
w.matchMedia = w.matchMedia || function () {
  return { matches: false, media: "", addEventListener() {}, removeEventListener() {},
           addListener() {}, removeListener() {}, onchange: null, dispatchEvent() { return false; } };
};
w.scrollTo = w.scrollTo || function () {};
class _Observer { observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } }
w.IntersectionObserver = w.IntersectionObserver || _Observer;
w.ResizeObserver = w.ResizeObserver || _Observer;
function inject(code) {
  const s = w.document.createElement("script");
  s.textContent = code;
  w.document.body.appendChild(s);
}
let prerendered = "";
try {
  inject(reactUMD); inject(reactDomUMD); inject(out.code);
  await new Promise((r) => setTimeout(r, 250));
  prerendered = w.document.getElementById("root").innerHTML;
} catch (e) {
  console.warn("Prerender failed, shipping empty #root:", e.message);
} finally {
  w.close();
}
console.log(`prerender: ${prerendered.length} chars captured`);

// --- 4. Emit HTML ----------------------------------------------------------
let prod = html;
// Locate the dev script block (vendor react + babel + jsx + inline bootstrap) and
// replace it with prod scripts using RELATIVE paths.
let scriptsStart = prod.indexOf('<script src="https://unpkg.com/react@');
if (scriptsStart === -1) scriptsStart = prod.indexOf('<script src="/static/machreach_landing/vendor/react.production.min.js">');
if (scriptsStart === -1) scriptsStart = prod.indexOf('<script src="vendor/react.production.min.js">');
const scriptsEnd = prod.indexOf("</script>", prod.lastIndexOf('ReactDOM.createRoot')) + "</script>".length;
if (scriptsStart === -1 || scriptsEnd <= "</script>".length - 1) throw new Error("Could not locate script block to replace");
const prodScripts =
`<script src="vendor/react.production.min.js"></script>
  <script src="vendor/react-dom.production.min.js"></script>
  <script src="${BUNDLE_OUT}" defer></script>`;
prod = prod.slice(0, scriptsStart) + prodScripts + prod.slice(scriptsEnd);
// Inject the pre-rendered markup into #root for first paint + clean hydration.
prod = prod.replace('<div id="root"></div>', `<div id="root">${prerendered}</div>`);
// JR prototype: route auth links to the static dashboard mock.
const jrFix = `<script>
(function(){
  function patch(){document.querySelectorAll('a[href="/register"],a[href="/login"]').forEach(function(a){a.setAttribute('href','app.html');});}
  document.addEventListener("DOMContentLoaded",function(){patch();var n=0,id=setInterval(function(){patch();if(++n>20)clearInterval(id);},150);});
})();
</script>`;
prod = prod.replace("</body>", jrFix + "\n</body>");
writeFileSync(join(LANDING, HTML_OUT), prod, "utf-8");
console.log(`${HTML_OUT} written (${prod.length} bytes)`);
