// Build the DigiGlow Noir plugin.
// Usage (from this folder):  node build.js
// 1. Joins src/css files in order (responsive.css last) and minifies to assets/css/noir.css
// 2. Joins + minifies src/js to assets/js/noir.js (site header, homepage sections, loader, extras, clients, footer)
// 3. Writes test.html (open via a local server to preview without WordPress)
// 4. Creates digiglow-noir.zip for Plugins > Add New > Upload (src/ is not included)

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = __dirname;
const PLUGIN = path.join(ROOT, "digiglow-noir");
const SRC = path.join(PLUGIN, "src");
const ESBUILD = "npx -y esbuild@0.24.0";

const CSS_ORDER = [
  "css/tokens.css",
  "css/fonts.css",
  "css/site/header.css",
  "css/base.css",
  "css/sections/hero.css",
  "css/sections/drill.css",
  "css/sections/tunnel.css",
  "css/sections/d-landing.css",
  "css/sections/bento.css",
  "css/site/clients.css",
  "css/site/footer.css",
  "css/responsive.css"
];
// Homepage sections share one scope: 00..07 are joined inside dgnMain(), 08-loader runs after it.
const JS_BEFORE = ["js/site/header.js"];
const JS_SECTIONS = ["js/00-core.js", "js/01-hero.js", "js/02-shaders.js", "js/03-drill.js", "js/04-tunnel.js", "js/05-d-journey.js", "js/06-bento.js", "js/07-page-end.js"];
const JS_AFTER = ["js/08-loader.js", "js/09-extras.js", "js/site/clients.js", "js/site/footer.js"];
const JS_HEAD = 'var DGN_V = (window.DGN_BASE || "") + "vendor/", DGN_M = (window.DGN_BASE || "") + "media/";\n\nfunction dgnMain() {\n(function () {\n';
const JS_TAIL = "})();\n}\n";
const SECTIONS = ["01-hero.php", "02-drill-projects.php", "03-projects-and-services.php", "04-d-landing-team.php", "05-how-we-work-qa.php", "06-overlays.php"];
const VENDOR = ["three/build/three.min.js", "three/examples/js/environments/RoomEnvironment.js", "three/examples/js/shaders/CopyShader.js", "three/examples/js/shaders/LuminosityHighPassShader.js", "three/examples/js/postprocessing/Pass.js", "three/examples/js/postprocessing/EffectComposer.js", "three/examples/js/postprocessing/RenderPass.js", "three/examples/js/postprocessing/ShaderPass.js", "three/examples/js/postprocessing/UnrealBloomPass.js", "gsap/gsap.min.js", "gsap/ScrollTrigger.min.js", "gsap/ScrambleTextPlugin.min.js"];

const read = f => fs.readFileSync(path.join(SRC, f), "utf8");
function minify(code, ext, out) {
  const tmp = path.join(ROOT, ".build-tmp" + ext);
  fs.writeFileSync(tmp, code);
  execSync(ESBUILD + ' "' + tmp + '" --minify' + (ext === ".js" ? " --target=es2017" : "") + ' --log-level=warning --outfile="' + out + '"', { stdio: "inherit" });
  fs.unlinkSync(tmp);
}

minify(CSS_ORDER.map(read).join("\n"), ".css", path.join(PLUGIN, "assets/css/noir.css"));
minify(JS_BEFORE.map(read).join("\n") + "\n" + JS_HEAD + JS_SECTIONS.map(read).join("") + JS_TAIL + JS_AFTER.map(read).join("\n"), ".js", path.join(PLUGIN, "assets/js/noir.js"));

const base = "digiglow-noir/assets/";
const tpl = f => fs.readFileSync(path.join(PLUGIN, "templates", f), "utf8").replace(/^<\?php[^?]*\?>\n/, "").split("<?php echo esc_url( $dgn_media ); ?>").join(base + "media/");
const page = fs.readFileSync(path.join(PLUGIN, "templates/noir-page.php"), "utf8");
const rootOpen = (page.match(/\n(<div class="dgn"[^>]*>)\n/) || [, '<div class="dgn">'])[1];
fs.writeFileSync(path.join(ROOT, "test.html"), '<!doctype html>\n<html lang="el">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>DigiGlow Noir plugin test</title>\n<link rel="stylesheet" href="' + base + 'css/noir.css">\n</head>\n<body class="dgn-page">\n' +
  tpl("site/header.php") + rootOpen + "\n" + SECTIONS.map(f => tpl("sections/" + f)).join("") + "</div>\n" + tpl("site/clients.php") + tpl("site/footer.php") +
  VENDOR.map(v => '<script src="' + base + "vendor/" + v + '"></script>').join("\n") + '\n<script>window.DGN_BASE = "' + base + '";</script>\n<script src="' + base + 'js/noir.js"></script>\n</body>\n</html>\n');

const zip = path.join(ROOT, "digiglow-noir.zip");
const ps = [
  "Add-Type -AssemblyName System.IO.Compression, System.IO.Compression.FileSystem",
  "$base = (Get-Item '" + ROOT + "').FullName",
  "$zip = '" + zip + "'",
  "if (Test-Path $zip) { Remove-Item $zip }",
  "$fs = [IO.File]::Open($zip, 'Create'); $za = New-Object IO.Compression.ZipArchive($fs, [IO.Compression.ZipArchiveMode]::Create)",
  "Get-ChildItem (Join-Path $base 'digiglow-noir') -Recurse -File | Where-Object { $_.FullName -notmatch '\\\\digiglow-noir\\\\src\\\\' } | ForEach-Object { $rel = $_.FullName.Substring($base.Length).TrimStart('\\').Replace('\\', '/'); [void][IO.Compression.ZipFileExtensions]::CreateEntryFromFile($za, $_.FullName, $rel, [IO.Compression.CompressionLevel]::Optimal) }",
  "$za.Dispose(); $fs.Dispose()"
].join("; ");
execSync('powershell -NoProfile -Command "' + ps.replace(/"/g, '\\"') + '"', { stdio: "inherit" });

const kb = f => Math.round(fs.statSync(f).size / 1024) + " KB";
console.log("CSS", kb(path.join(PLUGIN, "assets/css/noir.css")), "| JS", kb(path.join(PLUGIN, "assets/js/noir.js")), "| ZIP", kb(zip));
