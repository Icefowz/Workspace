#!/usr/bin/env node
// Desings/project-template/build.js: builds the Avenue project page mockup in two versions.
// Usage (from anywhere):  node "Desings/project-template/build.js"
// Reads ../../Workspace/contact.html (read only): its <head>, shared header and shared footer.
// Puts src/page.html between them and writes:
//   avenue.html           with src/theme-glow.css      (the homepage Projects section white and pink glow)
//   avenue-gradient.html  with src/theme-gradient.css  (the dark projects gradient); its links go to the -gradient pages
// Copies all of assets/brand (the header script swaps logos at runtime) and every image the page uses into ./assets/.
// Nothing is written into Workspace.

const fs = require("fs");
const path = require("path");

const HERE = __dirname;
const WS = path.resolve(HERE, "../../Workspace");
const contact = fs.readFileSync(path.join(WS, "contact.html"), "utf8");
const START = "<!-- ===== Contact page ===== -->";
const FOOT = "<!-- ===== Shared footer (copied from index.html) ===== -->";
const a = contact.indexOf(START), b = contact.indexOf(FOOT);
if (a < 0 || b < 0) throw new Error("contact.html markers not found");

const head = contact.slice(0, a)
  .replace(/<title>[^<]*<\/title>/, "<title>Avenue Restaurant | DigiGlow Media</title>")
  .replace(/<meta name="description"[^>]*>/, '<meta name="description" content="Avenue Restaurant · ιστοσελίδα, φωτογραφία, έντυπα και προβολή από τη DigiGlow Media">');
const page = fs.readFileSync(path.join(HERE, "src/page.html"), "utf8");
const LINKS = /(href=")((?:\.\.\/blog-template\/)?)(avenue|blog|post)\.html/g;

const used = new Set(fs.readdirSync(path.join(WS, "assets/brand")).map(f => "assets/brand/" + f));
for (const [theme, file] of [["glow", "avenue.html"], ["gradient", "avenue-gradient.html"]]) {
  const css = fs.readFileSync(path.join(HERE, "src/theme-" + theme + ".css"), "utf8");
  let html = head + page.replace("</style>", css + "</style>") + "\n\n" + contact.slice(b);
  if (theme === "gradient") html = html.replace(LINKS, "$1$2$3-gradient.html");
  fs.writeFileSync(path.join(HERE, file), html);
  html.replace(/(?:src|href)="(assets\/[^"]+)"|url\("?(assets\/[^")]+)"?\)/g, (m, x, y) => { used.add(x || y); return m; });
  console.log(`wrote ${file} (${Math.round(html.length / 1024)} KB)`);
}
for (const rel of used) {
  const from = path.join(WS, rel), to = path.join(HERE, rel);
  if (!fs.existsSync(from)) { console.log("missing in Workspace: " + rel); continue; }
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
}
console.log(`copied ${used.size} assets`);
