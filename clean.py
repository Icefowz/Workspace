import json, re
import spine as SP
import tunnel as TN
import services as SV

OUT = '/home/claude/noir/'
U = 'https://digiglowmedia.gr/wp-content/uploads/'
C = 'https://digiglowmedia.gr/contact-us/'
W = 'https://digiglowmedia.gr/works/'

built = open(OUT + 'digiglow-homepage-noir.txt', encoding='utf-8').read().replace('\r\n', '\n')
css_all = re.search(r'<style>\n(.*?)\n</style>', built, re.S).group(1)

DROP = ['dgn-svc', 'dgn-tab', 'dgn-info', 'dgn-land', 'dgn-steps', 'dgn-st', 'dgn-contact', 'dgn-bar', 'dgn-wiz', 'dgn-pane', 'dgn-qt',
        'dgn-chips', 'dgn-err', 'dgn-nav', 'dgn-sum', 'dgn-faq', 'dgn-q', 'dgn-a ', 'dgn-a\n', 'dgn-final', 'dgn-circle', 'lenis', 'dgn-glass',
        'dgn-formbox', 'dgn-nodes', 'dgn-node', 'dgn-orb', 'dgnSpin', 'dgn-chap', 'dgn-float', 'dgn-pv', 'dgn-ghost', 'dgn-pour']
DROP_EXACT = ['.dgn-chip', '.dgn-chip input', '.dgn-chip span', '.dgn-chip:hover span', '.dgn-chip input:checked + span', '.dgn-chip input:focus-visible + span', '.dgn-ch', '.dgn-a']

def blocks(text):
    out, depth, start = [], 0, 0
    for k, ch in enumerate(text):
        if ch == '{':
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0:
                out.append(text[start:k + 1].strip())
                start = k + 1
    return out

def keep_sel(sel):
    s = sel.strip()
    if s in DROP_EXACT:
        return False
    return not any(d in s + ' ' for d in DROP)

def filt(text, ind):
    res = []
    for b in blocks(text):
        head, body = b.split('{', 1)
        head = head.strip()
        if head.startswith('@media'):
            inner = filt(body.rsplit('}', 1)[0], ind + '  ')
            if inner.strip():
                res.append(ind + head + ' {\n' + inner + '\n' + ind + '}')
            continue
        if head.startswith('@keyframes') or head.startswith('@import'):
            if not any(d in head for d in DROP):
                res.append(ind + b)
            continue
        sels = [x.strip() for x in head.split(',')]
        ks = [x for x in sels if keep_sel(x)]
        if not ks:
            continue
        res.append(ind + (',\n' + ind).join(ks) + ' {' + body.rstrip())
    return '\n\n'.join(res)

CSS = filt(css_all, '  ')
CSS = CSS.replace('@import url', '@import url', 1)
CSS = CSS + '\n\n' + TN.CSS.rstrip()
CSS = CSS + '\n\n' + SV.CSS.rstrip()

html_all = re.search(r'(<div class="dgn">.*?</div>)\n\n<script src', built, re.S).group(1)
spine_html = re.search(r'  <section class="dgn-spine".*?</section>\n', html_all, re.S).group(0)
work_html = re.search(r'  <section class="dgn-work".*?</section>\n', html_all, re.S).group(0)
work_html = re.sub(r'\s*<div class="dgn-float".*?</div></div>', '', work_html, flags=re.S)
team_html = re.search(r'  <section class="dgn-team".*?</section>\n', html_all, re.S).group(0)
HTML = '<div class="dgn">\n' + spine_html + '\n' + work_html + '\n' + TN.HTML + '\n' + SV.HTML + '\n' + team_html + '  <div class="dgn-cur" aria-hidden="true"></div>\n  <div class="dgn-grain" aria-hidden="true"></div>\n</div>'

SPJS = SP.js()
SPJS = SPJS.replace('if (lite || still || !G) return;', 'if (lite || still || !G || !studio) return;', 1)

HEAD = r'''(function () {
  var root = document.querySelector(".dgn");
  if (!root || root.dataset.ready) return;
  root.dataset.ready = "1";
  function dbg(e) { (window.__dgnErr = window.__dgnErr || []).push(String((e && (e.stack || e.message)) || e)); }
  window.addEventListener("error", function (e) { dbg((e.message || "resource") + " " + (e.filename || (e.target && e.target.src) || "") + ":" + (e.lineno || "")); }, true);
  var still = false;
  var lite = window.matchMedia("(max-width: 1033px)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var GL = typeof THREE !== "undefined";
  var G = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
  var motion = G;
  var heavy = motion && !lite;
  if (G) gsap.registerPlugin(ScrollTrigger);
  if (G && typeof ScrambleTextPlugin !== "undefined") gsap.registerPlugin(ScrambleTextPlugin);
  function goY(y) { window.scrollTo({ top: y, behavior: "smooth" }); }
  var DPR = Math.min(window.devicePixelRatio || 1, lite ? 1.25 : 1.75);
  function seen(el, cb) { if (!el) return; if ("IntersectionObserver" in window) new IntersectionObserver(function (e) { cb(e[0].isIntersecting); }, { rootMargin: "120px" }).observe(el); else cb(true); }
  function q(s, el) { return (el || root).querySelector(s); }
  function qa(s, el) { return Array.prototype.slice.call((el || root).querySelectorAll(s)); }

  qa("video").forEach(function (v) {
    seen(v, function (on) { if (on) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause(); });
  });

  qa(".dgn-split").forEach(function (h) {
    var out = [];
    Array.prototype.slice.call(h.childNodes).forEach(function (n) {
      if (n.nodeType === 3) n.textContent.split(/(\s+)/).forEach(function (t) { if (!t) return; if (/^\s+$/.test(t)) out.push(document.createTextNode(" ")); else { var w = document.createElement("span"); w.className = "dgn-w"; var s = document.createElement("span"); s.textContent = t; w.appendChild(s); out.push(w); } });
      else { var w2 = document.createElement("span"); w2.className = "dgn-w"; var s2 = document.createElement("span"); s2.appendChild(n.cloneNode(true)); w2.appendChild(s2); out.push(w2); }
    });
    h.textContent = ""; out.forEach(function (n) { h.appendChild(n); });
    if (!motion) return;
    var inner = qa(".dgn-w > span", h);
    if (h.tagName === "H1") gsap.from(inner, { yPercent: 110, rotate: 4, duration: 1.2, ease: "power4.out", stagger: 0.06, delay: 0.2 });
    else gsap.from(inner, { yPercent: 110, rotate: 4, duration: 1, ease: "power4.out", stagger: 0.05, scrollTrigger: { trigger: h, start: "top 85%" } });
  });

'''

TEAM = r'''
  var tilt = q(".dgn-tilt"), timg = q(".dgn-team__img");
  if (motion && timg) {
    if (lite) gsap.fromTo(timg, { clipPath: "inset(30% 20% 30% 20% round 26px)" }, { clipPath: "inset(0% 0% 0% 0% round 26px)", ease: "none", scrollTrigger: { trigger: tilt, start: "top 85%", end: "top 35%", scrub: 0.6 } });
    gsap.from(qa(".dgn-roles li"), { opacity: 0, x: 30, duration: 0.7, stagger: 0.07, ease: "power3.out", scrollTrigger: { trigger: q(".dgn-roles"), start: "top 80%" } });
  }
  if (heavy && fine && timg) {
    var tx = gsap.quickTo(timg, "rotationY", { duration: 0.6, ease: "power3" }), ty = gsap.quickTo(timg, "rotationX", { duration: 0.6, ease: "power3" });
    tilt.addEventListener("pointermove", function (e) { var b = tilt.getBoundingClientRect(), px = (e.clientX - b.left) / b.width, py = (e.clientY - b.top) / b.height; tx((px - 0.5) * 14); ty((0.5 - py) * 14); timg.style.setProperty("--gx", px * 100 + "%"); timg.style.setProperty("--gy", py * 100 + "%"); timg.style.setProperty("--go", 1); });
    tilt.addEventListener("pointerleave", function () { tx(0); ty(0); timg.style.setProperty("--go", 0); });
  }

  var cp = q(".dgn-copy");
  if (cp) cp.addEventListener("click", function () {
    var done = function () { cp.textContent = "Αντιγράφηκε"; setTimeout(function () { cp.textContent = "Αντιγραφή email"; }, 1800); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText("digi@digiglowmedia.gr").then(done, done); else done();
  });

  if (heavy && fine) {
    qa(".dgn-mag").forEach(function (b) {
      var bx = gsap.quickTo(b, "x", { duration: 0.5, ease: "elastic.out(1, 0.4)" }), by = gsap.quickTo(b, "y", { duration: 0.5, ease: "elastic.out(1, 0.4)" });
      b.addEventListener("pointermove", function (e) { var rc = b.getBoundingClientRect(); bx((e.clientX - rc.left - rc.width / 2) * 0.3); by((e.clientY - rc.top - rc.height / 2) * 0.3); });
      b.addEventListener("pointerleave", function () { bx(0); by(0); });
    });
    var cur = q(".dgn-cur"), cx = gsap.quickTo(cur, "x", { duration: 0.35, ease: "power3" }), cy = gsap.quickTo(cur, "y", { duration: 0.35, ease: "power3" });
    window.addEventListener("pointermove", function (e) { var inside = root.contains(e.target); cur.style.opacity = inside ? 1 : 0; cx(e.clientX); cy(e.clientY); cur.classList.toggle("big", !!(e.target.closest && e.target.closest("a, button, .dgn-spine canvas"))); }, { passive: true });
  }

  var grain = q(".dgn-grain"); seen(root, function (v) { grain.style.display = v ? "" : "none"; });
  if (G) { if (document.readyState === "complete") setTimeout(function () { ScrollTrigger.refresh(); }, 150); else window.addEventListener("load", function () { ScrollTrigger.refresh(); }); }
  if (/debug/.test(location.hash)) setTimeout(function () { var d = document.createElement("pre"); d.style.cssText = "position:fixed;left:10px;bottom:10px;z-index:99999;max-width:90vw;max-height:40vh;overflow:auto;padding:12px;background:#000;color:#0f0;font:12px monospace;white-space:pre-wrap"; d.textContent = "GL " + GL + "  GSAP " + G + "  hero3D " + root.classList.contains("dgn-gl") + "  width " + window.innerWidth + "\n" + ((window.__dgnErr || []).join("\n") || "no errors"); document.body.appendChild(d); }, 4000);
})();'''

JS = HEAD + SPJS + TN.js() + SV.js() + TEAM.replace('__POUR__', json.dumps(open(OUT + 'pour.glsl').read()))

T = 'https://cdn.jsdelivr.net/npm/three@0.147.0/'
GS = 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/'
SCRIPTS = ''.join(f'<script src="{u}"></script>\n' for u in [
    T + 'build/three.min.js', T + 'examples/js/environments/RoomEnvironment.js', T + 'examples/js/shaders/CopyShader.js', T + 'examples/js/shaders/LuminosityHighPassShader.js',
    T + 'examples/js/postprocessing/Pass.js', T + 'examples/js/postprocessing/EffectComposer.js', T + 'examples/js/postprocessing/RenderPass.js',
    T + 'examples/js/postprocessing/ShaderPass.js', T + 'examples/js/postprocessing/UnrealBloomPass.js',
    GS + 'gsap.min.js', GS + 'ScrollTrigger.min.js', GS + 'ScrambleTextPlugin.min.js'])

LIBS = [
    (T + 'build/three.min.js', 'window.THREE'), (T + 'examples/js/environments/RoomEnvironment.js', 'window.THREE && THREE.RoomEnvironment'),
    (T + 'examples/js/shaders/CopyShader.js', 'window.THREE && THREE.CopyShader'), (T + 'examples/js/shaders/LuminosityHighPassShader.js', 'window.THREE && THREE.LuminosityHighPassShader'),
    (T + 'examples/js/postprocessing/Pass.js', 'window.THREE && THREE.Pass'), (T + 'examples/js/postprocessing/EffectComposer.js', 'window.THREE && THREE.EffectComposer'),
    (T + 'examples/js/postprocessing/RenderPass.js', 'window.THREE && THREE.RenderPass'), (T + 'examples/js/postprocessing/ShaderPass.js', 'window.THREE && THREE.ShaderPass'),
    (T + 'examples/js/postprocessing/UnrealBloomPass.js', 'window.THREE && THREE.UnrealBloomPass'),
    (GS + 'gsap.min.js', 'window.gsap'), (GS + 'ScrollTrigger.min.js', 'window.ScrollTrigger'), (GS + 'ScrambleTextPlugin.min.js', 'window.ScrambleTextPlugin')]
LOADER = 'var dgnLibs = [' + ', '.join('[' + json.dumps(u) + ', function () { return !!(' + c + '); }]' for u, c in LIBS) + '];\n' + """(function dgnLoad(i) {
  if (i >= dgnLibs.length) { dgnMain(); return; }
  if (dgnLibs[i][1]()) { dgnLoad(i + 1); return; }
  var s = document.createElement("script"); s.src = dgnLibs[i][0]; s.async = false;
  s.setAttribute("data-no-optimize", "1"); s.setAttribute("data-cfasync", "false"); s.setAttribute("nowprocket", "");
  s.onload = function () { dgnLoad(i + 1); };
  s.onerror = function () { (window.__dgnErr = window.__dgnErr || []).push("load failed " + dgnLibs[i][0]); dgnLoad(i + 1); };
  document.head.appendChild(s);
})(0);"""
JSW = 'function dgnMain() {\n' + JS + '\n}\n' + LOADER
snippet = '<style>\n' + CSS + '\n</style>\n\n' + HTML + '\n\n' + '<script data-no-optimize="1" data-no-defer="1" data-cfasync="false" data-pagespeed-no-defer nowprocket>\n' + JSW + '\n</script>\n'
with open(OUT + 'digiglow-homepage-noir.txt', 'w', encoding='utf-8', newline='\r\n') as f:
    f.write(snippet)
PS = 'https://picsum.photos/id/'
PIDS = [1015, 1018, 1025, 1035, 1039, 1043, 1050, 1062, 1069, 1074, 1080, 1084]
demo = re.sub(r'SRC = \[.*?\], KF', lambda m: 'SRC = ' + json.dumps([{'p': i % 5, 'u': PS + str(n) + '/960/640', 'v': 0} for i, n in enumerate(PIDS)], separators=(',', ':')) + ', KF', snippet, count=1, flags=re.S)
demo = re.sub(r'<video src="[^"]+"[^>]*></video>', lambda m: '<img src="' + PS + '1043/400/500" alt="" crossorigin="anonymous">', demo)
demo = re.sub(r'src="https://digiglowmedia\.gr/wp-content/uploads/[^"]+\.(?:png|webp|jpg|avif)"', lambda m: 'src="' + PS + '1011/900/1100" crossorigin="anonymous"', demo)
with open(OUT + 'digiglow-homepage-noir-preview.html', 'w', encoding='utf-8', newline='\r\n') as f:
    f.write('<!doctype html>\n<html lang="el">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>DigiGlow Noir</title>\n<style>body{margin:0;background:#0b0709}</style>\n</head>\n<body>\n' + demo + '</body>\n</html>\n')
DIAG = r'''<script>
(function () {
  var d = document.createElement("pre");
  d.style.cssText = "position:fixed;right:10px;bottom:10px;z-index:99999;margin:0;padding:10px 12px;background:rgba(0,0,0,0.85);color:#7cfc9a;font:11px/1.45 monospace;white-space:pre-wrap;max-width:46vw;pointer-events:none;border-radius:8px";
  document.body.appendChild(d);
  var gl = (function () { try { var c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch (e) { return false; } })();
  function u() {
    var r = document.querySelector(".dgn"), sp = window.__dgnSP;
    d.textContent = "WebGL " + gl + "  THREE " + (typeof THREE !== "undefined") + "  GSAP " + (typeof gsap !== "undefined") + "  ST " + (typeof ScrollTrigger !== "undefined") + "\nhero3D " + !!(r && r.classList.contains("dgn-gl")) + "  scrollY " + Math.round(window.scrollY) + "  docH " + document.documentElement.scrollHeight + "  winH " + window.innerHeight + "\nprogress " + (sp ? sp.t.toFixed(3) : "none") + "\n" + ((window.__dgnErr || []).slice(-5).join("\n") || "no errors");
  }
  setInterval(u, 500); u();
})();
</script>
'''
with open(OUT + 'noir-artifact.html', 'w', encoding='utf-8') as f:
    f.write('<title>DigiGlow Noir Homepage</title>\n<style>html,body{background:#0b0709;color:#f4eef1;color-scheme:dark}</style>\n' + demo)
open('/tmp/claude-0/-home-claude/7aceea92-98ce-5ed8-b9e4-115ae63c36a7/scratchpad/noir.js', 'w').write(JSW)
print('ok', len(snippet), len(CSS), len(JS))
