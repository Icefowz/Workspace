#!/usr/bin/env node
// Desings/blog-template/build.js: builds blog.html (archive) and post.html (article) mockups in two versions.
// Usage (from anywhere):  node "Desings/blog-template/build.js"
// Reads ../../Workspace/contact.html (read only): its <head>, shared header and shared footer.
// Puts src/blog.css + a theme + src/<page>.html between them and writes:
//   <page>.html           with src/theme-glow.css      (the homepage Projects section white and pink glow)
//   <page>-gradient.html  with src/theme-gradient.css  (the dark projects gradient); its links go to the -gradient pages
// Copies all of assets/brand (the header script swaps logos at runtime) and every image the pages use into ./assets/.
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
const base = fs.readFileSync(path.join(HERE, "src/blog.css"), "utf8");
const LINKS = /(href=")((?:\.\.\/project-template\/)?)(avenue|blog|post)\.html/g;

const PAGES = [
  { file: "blog.html", title: "Ιδέες & Νέα | DigiGlow Media", desc: "Οδηγοί για την επιχείρησή σας, ιστορίες από τα έργα μας και νέα της ομάδας DigiGlow Media" },
  { file: "post.html", title: "Τι χρειάζεται ένα εστιατόριο πριν φτιάξει ιστοσελίδα; | DigiGlow Media", desc: "Τι αξίζει να ετοιμάσει ένα εστιατόριο πριν ξεκινήσει ο σχεδιασμός της ιστοσελίδας του" }
];

const used = new Set(fs.readdirSync(path.join(WS, "assets/brand")).map(f => "assets/brand/" + f));
for (const theme of ["glow", "gradient"]) {
  const css = base + fs.readFileSync(path.join(HERE, "src/theme-" + theme + ".css"), "utf8");
  for (const p of PAGES) {
    const head = contact.slice(0, a)
      .replace(/<title>[^<]*<\/title>/, `<title>${p.title.replace(/&/g, "&amp;")}</title>`)
      .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${p.desc}">`);
    const body = fs.readFileSync(path.join(HERE, "src", p.file), "utf8");
    let out = head + "<!-- ===== Blog page ===== -->\n<style>\n" + css + "</style>\n" + body + "\n\n" + contact.slice(b);
    const file = theme === "glow" ? p.file : p.file.replace(".html", "-gradient.html");
    if (theme === "gradient") out = out.replace(LINKS, "$1$2$3-gradient.html");
    fs.writeFileSync(path.join(HERE, file), out);
    out.replace(/(?:src|href)="(assets\/[^"]+)"|url\("?(assets\/[^")]+)"?\)/g, (m, x, y) => { used.add(x || y); return m; });
    console.log(`wrote ${file} (${Math.round(out.length / 1024)} KB)`);
  }
}
for (const rel of used) {
  const from = path.join(WS, rel), to = path.join(HERE, rel);
  if (!fs.existsSync(from)) { console.log("missing in Workspace: " + rel); continue; }
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
}
console.log(`copied ${used.size} assets`);
