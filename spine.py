import json, random, string
random.seed(7)

CATS = [('all', 'Όλα'), ('web', 'Web'), ('video', 'Video'), ('brand', 'Branding'), ('events', 'Events')]
PROJ = [
    {'n': 'Avenue Restaurant', 'd': 'Website και ψηφιακή στρατηγική που οδηγούν τον επισκέπτη στην κράτηση', 'cl': 'Web και στρατηγική', 'c': ['web', 'brand']},
    {'n': 'The Place', 'd': 'Brand ecosystem, reels και περιεχόμενο για τα social media', 'cl': 'Branding και video', 'c': ['brand', 'video']},
    {'n': 'Maxus Hellas', 'd': 'Εταιρικό video που παρουσιάζει τη μάρκα με κινηματογραφική ματιά', 'cl': 'Video', 'c': ['video']},
    {'n': 'Techstars Startup Weekend', 'd': 'Website, επικοινωνία και κάλυψη ενός διεθνούς event', 'cl': 'Events και web', 'c': ['events', 'web']},
    {'n': 'Avenue Experience', 'd': 'Εμπειρία χρήστη και σύστημα κρατήσεων σχεδιασμένο για μετατροπές', 'cl': 'Web', 'c': ['web']},
]
U = 'https://digiglowmedia.gr/wp-content/uploads/'
SRC = [{'p': 0, 'u': U + '2026/09/Avenue.mp4', 'v': 1}, {'p': 1, 'u': U + '2026/08/THE-PLACE.mp4', 'v': 1}, {'p': 2, 'u': U + '2026/08/MAXUS.mp4', 'v': 1},
       {'p': 3, 'u': U + '2026/08/techstars_1.png', 'v': 0}, {'p': 4, 'u': U + '2026/08/Avenue_2.png', 'v': 0}, {'p': 0, 'u': U + '2026/09/avenue-hero-poster-optimized.webp', 'v': 0},
       {'p': 3, 'u': U + '2026/08/techstars_2.png', 'v': 0}, {'p': 4, 'u': U + '2026/08/Avenue_3.png', 'v': 0}]
KF = {
    'Camera': {'orbit': [[0, -20], [1.6, 25], [10, 320]], 'height': [[0, 17.6], [1.6, 14.6], [10, 0]], 'distance': [[0, 12.5], [1.6, 9.2], [10, 9.2]],
               'look': [[0, -2.8], [1.6, -0.6], [10, -0.6]], 'shift': [[0, -2.8], [1.6, 1.5], [10, 1.5]], 'fov': [[0, 42], [1.6, 40], [10, 40]]},
    'Scene': {'spin': [[0, 0], [10, 0]], 'glow': [[0, 0.7], [1.6, 0.5], [10, 0.55]], 'fringe': [[0, 0.3], [10, 0.3]], 'grain': [[0, 0.06], [10, 0.06]]},
    'Liquid': {'flow': [[0, 0.3], [1.6, 0.45], [10, 0.9]], 'amp': [[0, 0.26], [1.6, 0.2], [10, 0.32], [12.4, 0.07], [14, 0.07]], 'radius': [[0, 1.35], [1.6, 1.15], [10, 1.1], [12.6, 3], [14, 3]], 'pink': [[0, 0.45], [10, 0.6]]},
    'Focus': {'card': [[0, -1.2], [1.6, -0.55], [2.6, 0], [4.4, 1], [6.2, 2], [8, 3], [9.6, 4], [10, 4.35], [10.8, 5.6], [14, 5.6]]},
    'Outro': {'dive': [[0, 0], [10, 0], [12.6, 1], [14, 1]], 'flash': [[0, 0], [12.3, 0], [12.8, 1], [13.4, 0], [14, 0]], 'swirl': [[0, 0], [10.2, 0], [11.6, 1], [14, 1]], 'logo': [[0, 0], [10.3, 0], [11.2, 1], [12.3, 1], [12.9, 2], [14, 2]]},
}

def rid():
    return ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(10))

tracks = {}
for obj, props in KF.items():
    td, tid = {}, {}
    for p, kfs in props.items():
        t = rid()
        tid[json.dumps([p])] = t
        td[t] = {'type': 'BasicKeyframedTrack', '__debugName': obj + ':' + json.dumps([p]),
                 'keyframes': [{'id': rid(), 'position': pos, 'connectedRight': True, 'handles': [0.5, 1, 0.5, 0], 'type': 'bezier', 'value': val} for pos, val in kfs]}
    tracks[obj] = {'trackData': td, 'trackIdByPropPath': tid}
STATE = {'sheetsById': {'Journey': {'staticOverrides': {'byObject': {}}, 'sequence': {'subUnitsPerUnit': 30, 'length': 14, 'type': 'PositionalSequence', 'tracksByObject': tracks}}},
         'definitionVersion': '0.4.0', 'revisionHistory': [rid()]}

def J(o):
    return json.dumps(o, ensure_ascii=False, separators=(',', ':'))

fbtns = ''.join(f'<button type="button" class="dgn-fbtn{" on" if k == "all" else ""}" data-c="{k}" aria-pressed="{"true" if k == "all" else "false"}">{v}</button>' for k, v in CATS)

def html(C, W):
    return f'''  <section class="dgn-spine" aria-label="DigiGlow Media">
    <canvas aria-hidden="true"></canvas>
    <div class="dgn-wrap dgn-sp__intro">
      <h1 class="dgn-split">Στρατηγική με <em>φαντασία</em> αποτελέσματα με <em>ακρίβεια</em></h1>
      <div class="dgn-hero__row">
        <div>
          <p class="dgn-sub">Στρατηγική, branding, websites, video και καμπάνιες από μία ομάδα στη Θεσσαλονίκη, για εταιρείες και φορείς που θέλουν μετρήσιμα αποτελέσματα</p>
          <div class="dgn-hero__acts"><a class="dgn-btn dgn-mag" href="{C}">Κλείστε μια συνάντηση</a><a class="dgn-link" href="{W}">Δείτε τα έργα μας</a></div>
        </div>
        <span class="dgn-hint">Σύρετε τη στήλη και κάντε scroll</span>
      </div>
    </div>
    <p class="dgn-sp__head" aria-hidden="true">Έργα που <em>μένουν</em></p>
    <div class="dgn-sp__filter"><p class="dgn-mono">Τι ψάχνετε</p><div class="dgn-fl" role="group" aria-label="Φίλτρο έργων">{fbtns}</div></div>
    <div class="dgn-sp__proj" aria-live="polite"><p class="dgn-mono dgn-sp__cat"></p><h3 class="dgn-sp__title"></h3><p class="dgn-sp__desc"></p><div class="dgn-sp__nav"><button type="button" class="dgn-arr dgn-prev" aria-label="Προηγούμενο έργο">&lt;&lt;</button><a class="dgn-link" href="{W}">Δείτε το έργο</a><button type="button" class="dgn-arr dgn-next2" aria-label="Επόμενο έργο">&gt;&gt;</button></div></div>
    <div class="dgn-sp__tip" aria-hidden="true"></div>
  </section>
'''

CSS = r'''  .dgn-spine {
    position: relative;
    height: 100vh;
    min-height: 700px;
    overflow: hidden;
    background: radial-gradient(ellipse 60% 70% at 70% 40%, rgba(158, 54, 255, 0.12), transparent 70%), var(--bg);
  }

  .dgn-spine canvas {
    cursor: grab;
  }

  .dgn-spine canvas.grabbing {
    cursor: grabbing;
  }

  .dgn-sp__intro {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    display: flex;
    flex-direction: column;
    gap: 34px;
    padding-bottom: clamp(36px, 5vw, 60px);
    pointer-events: none;
  }

  .dgn-sp__intro a {
    pointer-events: auto;
  }

  .dgn-spine h1 {
    max-width: 1100px;
    font-size: clamp(48px, 7.6vw, 130px);
    font-weight: 800;
    line-height: 0.92;
    letter-spacing: -0.065em;
  }

  .dgn-spine h1 em {
    color: var(--pink);
    letter-spacing: -0.04em;
  }

  .dgn-mono {
    font-family: var(--mono);
    font-size: 12.5px;
    letter-spacing: 0.02em;
    color: var(--soft);
  }

  .dgn-sp__head,
  .dgn-sp__filter,
  .dgn-sp__proj {
    position: absolute;
    z-index: 3;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s, transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
    pointer-events: none;
  }

  .dgn-sp__head.on,
  .dgn-sp__filter.on,
  .dgn-sp__proj.on {
    opacity: 1;
    transform: none;
    pointer-events: auto;
  }

  .dgn-sp__head {
    top: 150px;
    left: var(--gut);
    font-size: clamp(34px, 4vw, 64px);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.055em;
  }

  .dgn-sp__head em {
    color: var(--pink);
  }

  .dgn-sp__filter {
    left: var(--gut);
    bottom: clamp(36px, 5vw, 60px);
    display: none;
  }

  .dgn-sp__filter p {
    margin-bottom: 12px;
  }

  .dgn-fl {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .dgn-fbtn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 6px 0;
    border: 0;
    background: none;
    color: var(--soft);
    font-family: var(--mono);
    font-size: 14px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .dgn-fbtn::before {
    content: "";
    width: 14px;
    height: 1px;
    background: currentColor;
    transition: width 0.35s, background 0.35s;
  }

  .dgn-fbtn:hover,
  .dgn-fbtn.on {
    color: var(--fg);
  }

  .dgn-fbtn.on::before {
    width: 30px;
    background: var(--mag);
  }

  .dgn-sp__proj {
    right: var(--gut);
    bottom: clamp(36px, 5vw, 60px);
    display: none;
    width: min(400px, 34vw);
    padding: 24px;
    border: 1px solid rgba(255, 169, 220, 0.22);
    border-radius: 22px;
    background: rgba(11, 7, 9, 0.55);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  }

  .dgn-gl .dgn-sp__filter,
  .dgn-gl .dgn-sp__proj {
    display: block;
  }

  .dgn-sp__proj h3 {
    min-height: 1.1em;
    margin-top: 10px;
    font-family: var(--mono);
    font-size: clamp(22px, 2vw, 30px);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  .dgn-sp__desc {
    margin-top: 10px;
    font-size: 15px;
    line-height: 1.55;
    color: var(--soft);
  }

  .dgn-sp__nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid var(--line);
  }

  .dgn-arr {
    width: 44px;
    height: 44px;
    border: 1px solid rgba(244, 238, 241, 0.25);
    border-radius: 12px;
    background: none;
    color: var(--fg);
    font-family: var(--mono);
    font-size: 14px;
    cursor: pointer;
    transition: background 0.3s, border-color 0.3s;
  }

  .dgn-arr:hover {
    border-color: var(--mag);
    background: var(--mag);
  }

  .dgn-sp__tip {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 4;
    padding: 8px 12px;
    border: 1px solid rgba(255, 169, 220, 0.35);
    border-radius: 999px;
    background: rgba(11, 7, 9, 0.8);
    font-family: var(--mono);
    font-size: 12.5px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .dgn-sp__tip.on {
    opacity: 1;
  }

  .dgn.dgn-gl .dgn-work {
    display: none;
  }

'''

LITE = '''    .dgn-spine {
      height: auto;
      min-height: 100vh;
    }

    .dgn-spine canvas {
      cursor: auto;
    }

    .dgn-sp__intro {
      position: relative;
      min-height: 100vh;
      justify-content: flex-end;
      padding-top: 130px;
    }

'''
LITE768 = '''    .dgn-sp__intro {
      padding-top: 120px;
    }

'''

VS_TILE = r'''attribute vec4 aCell; attribute vec3 aState; varying vec2 vUv; varying vec2 vAt; varying vec3 vS; varying float vFr; varying float vD;
void main(){ vUv = uv; vAt = aCell.xy + uv * aCell.zw; vS = aState;
  vec4 wp = modelMatrix * instanceMatrix * vec4(position, 1.0);
  vec3 n = normalize(mat3(modelMatrix * instanceMatrix) * vec3(0.0, 0.0, 1.0));
  vFr = 1.0 - abs(dot(n, normalize(cameraPosition - wp.xyz)));
  vec4 mv = viewMatrix * wp; vD = -mv.z; gl_Position = projectionMatrix * mv; }'''
FS_TILE = r'''uniform sampler2D uAtlas; uniform float uTime; uniform vec3 uFog; uniform float uDen;
varying vec2 vUv; varying vec2 vAt; varying vec3 vS; varying float vFr; varying float vD;
float rb(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
void main(){ vec2 p = (vUv - 0.5) * vec2(1.53, 1.0); float d = rb(p, vec2(0.765, 0.5), 0.07); if (d > 0.0) discard;
  vec3 img = texture2D(uAtlas, vAt).rgb; float lum = dot(img, vec3(0.299, 0.587, 0.114));
  vec3 duo = mix(vec3(0.05, 0.01, 0.04), vec3(0.7, 0.28, 0.52), lum);
  vec3 col = mix(duo, img, 0.35 + 0.65 * vS.x); col *= mix(1.0, 0.18, vS.y);
  if (!gl_FrontFacing) col *= 0.3;
  col *= mix(0.6, 1.0, smoothstep(0.0, -0.1, d));
  float f = 1.0 - exp(-uDen * uDen * vD * vD);
  gl_FragColor = vec4(mix(col, uFog, clamp(f, 0.0, 1.0)), 1.0); }'''
VS_DUST = r'''attribute float aS; attribute vec3 aC; uniform float uTime; uniform float uPR; uniform float uFocus; uniform float uSwirl; varying vec3 vC; varying float vA; varying float vB;
void main(){ vec3 p = position; float t = uTime;
  p.y = mod(p.y + 7.0 + t * (0.05 + aS * 0.12), 30.0) - 7.0;
  p.x += sin(t * 0.21 + aS * 31.0 + p.y * 0.35) * 0.45; p.z += cos(t * 0.17 + aS * 17.0 + p.y * 0.3) * 0.45;
  float sr = length(p.xz), sa = uSwirl * (t * 1.6 + 3.0 / (sr + 0.4)), cs = cos(sa), sn = sin(sa);
  p.xz = mat2(cs, -sn, sn, cs) * p.xz * mix(1.0, 0.42, uSwirl);
  vec4 mv = modelViewMatrix * vec4(p, 1.0); float d = max(0.3, -mv.z);
  float coc = clamp(abs(d - uFocus) / d * 2.2, 0.0, 1.0);
  float core = (2.0 + aS * aS * 4.5) * (14.0 / d);
  float sz = core + coc * (8.0 + aS * 30.0) * (9.0 / d + 0.3);
  gl_PointSize = clamp(uPR * sz, 1.0, 96.0);
  float tw = 0.55 + 0.45 * sin(t * (0.6 + aS * 1.6) + aS * 40.0);
  vA = tw * mix(1.0, 0.12 + 0.18 * aS, smoothstep(0.0, 0.7, coc)) * smoothstep(48.0, 14.0, d) * smoothstep(0.4, 2.2, d);
  vA = clamp(vA, 0.0, 1.0); vB = coc; vC = aC;
  gl_Position = projectionMatrix * mv; }'''
FS_DUST = r'''varying vec3 vC; varying float vA; varying float vB;
void main(){ float r = length(gl_PointCoord - 0.5) * 2.0; if (r > 1.0) discard;
  float sharp = exp(-r * r * 9.0) + exp(-r * r * 60.0) * 0.8;
  float disc = smoothstep(1.0, 0.8, r) * (0.72 + 0.28 * smoothstep(0.5, 0.92, r));
  float a = mix(sharp, disc, smoothstep(0.15, 0.6, vB));
  gl_FragColor = vec4(vC * a * vA * 1.4, 1.0); }'''
VS_UV = r'''varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }'''
FS_CARD = r'''uniform sampler2D uTex; uniform float uAmt; uniform float uTime; varying vec2 vUv;
float rb(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
void main(){ vec2 p = (vUv - 0.5) * vec2(1.543, 1.0); float d = rb(p, vec2(0.771, 0.5), 0.06); if (d > 0.0) discard;
  vec3 col = texture2D(uTex, vUv).rgb; col *= mix(0.55, 1.0, smoothstep(0.0, -0.12, d)); col *= 0.55 + 0.45 * uAmt;
  gl_FragColor = vec4(col, 1.0); }'''
FS_GLOW = r'''varying vec3 vN; varying vec3 vV; void main(){ float f = pow(abs(dot(vN, vV)), 3.0); gl_FragColor = vec4(vec3(1.0, 0.05, 0.55) * f * 0.35, 1.0); }'''
VS_GLOW = r'''varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }'''
FS_FIN = r'''uniform sampler2D tDiffuse; uniform float uTime; uniform float uFringe; uniform float uGrain; varying vec2 vUv;
float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main(){ vec2 c = vUv - 0.5; float r2 = dot(c, c); vec2 o = c * r2 * uFringe * 0.08;
  vec3 col = vec3(texture2D(tDiffuse, vUv + o).r, texture2D(tDiffuse, vUv).g, texture2D(tDiffuse, vUv - o).b);
  col *= 1.0 - r2 * 1.1; col += (h(vUv * 1000.0 + fract(uTime)) - 0.5) * uGrain; gl_FragColor = vec4(col, 1.0); }'''

def sh(s):
    return json.dumps(s)

JS = r'''  var spine = q(".dgn-spine"), PROJ = __PROJ__, SRC = __SRC__, KF = __KF__, STATE = __STATE__, L = 14;
  var spUI = { intro: q(".dgn-sp__intro"), head: q(".dgn-sp__head"), filt: q(".dgn-sp__filter"), proj: q(".dgn-sp__proj"), tip: q(".dgn-sp__tip"), title: q(".dgn-sp__title"), cat: q(".dgn-sp__cat"), desc: q(".dgn-sp__desc") };
  var spP = { t: 0, c: 0 }, spST = null, curCat = "all", activeJ = -2, TH = null, studio = /studio/.test(location.hash), spGo = function () {};
  if (motion) gsap.from(qa(".dgn-hero__row > *"), { y: 24, opacity: 0, duration: 1, stagger: 0.1, delay: 0.7, ease: "power3.out" });
  function ease(a) { return a * a * (3 - 2 * a); }
  function kv(tr, pos) { if (pos <= tr[0][0]) return tr[0][1]; for (var i = 1; i < tr.length; i++) if (pos <= tr[i][0]) return tr[i - 1][1] + (tr[i][1] - tr[i - 1][1]) * ease((pos - tr[i - 1][0]) / (tr[i][0] - tr[i - 1][0])); return tr[tr.length - 1][1]; }
  function readVals(pos) {
    var o = {};
    if (TH) { if (!studio) TH.sheet.sequence.position = Math.max(0, Math.min(L, pos)); Object.keys(TH.objs).forEach(function (k) { o[k] = TH.objs[k].value; }); return o; }
    Object.keys(KF).forEach(function (k) { o[k] = {}; Object.keys(KF[k]).forEach(function (p) { o[k][p] = kv(KF[k][p], pos); }); });
    return o;
  }
  function scramble(el, txt) {
    if (motion && typeof ScrambleTextPlugin !== "undefined") { gsap.to(el, { duration: 0.9, scrambleText: { text: txt, chars: "ΑΒΓΔΘΛΞΠΣΦΨΩ01#%&", revealDelay: 0.15, speed: 0.6 } }); return; }
    if (!motion) { el.textContent = txt; return; }
    var ch = "ΑΒΓΔΘΛΞΠΣΦΨΩ01#%&", f = 0, id = el.dataset.sid = String(Math.random());
    (function tick() { if (el.dataset.sid !== id) return; f++; var n = Math.floor(f / 2), s = ""; for (var i = 0; i < txt.length; i++) s += i < n || txt[i] === " " ? txt[i] : ch[Math.floor(Math.random() * ch.length)]; el.textContent = s; if (n < txt.length) requestAnimationFrame(tick); })();
  }
  function match(j) { return curCat === "all" || PROJ[j].c.indexOf(curCat) >= 0; }
  function setProj(j) {
    if (j === activeJ) return; activeJ = j;
    spUI.proj.classList.toggle("on", j >= 0);
    if (j < 0) return;
    spUI.cat.textContent = PROJ[j].cl; spUI.desc.textContent = PROJ[j].d; scramble(spUI.title, PROJ[j].n);
  }
  function step(dir) {
    var j = activeJ < 0 ? (dir > 0 ? -1 : PROJ.length) : activeJ;
    for (var k = 0; k < PROJ.length; k++) { j = (j + dir + PROJ.length) % PROJ.length; if (match(j)) { spGo(j); return; } }
  }
  q(".dgn-prev").addEventListener("click", function () { step(-1); });
  q(".dgn-next2").addEventListener("click", function () { step(1); });
  qa(".dgn-fbtn").forEach(function (b) {
    b.addEventListener("click", function () {
      curCat = b.dataset.c;
      qa(".dgn-fbtn").forEach(function (x) { var on = x === b; x.classList.toggle("on", on); x.setAttribute("aria-pressed", on ? "true" : "false"); });
      if (activeJ < 0 || !match(activeJ)) step(1);
    });
  });
  function loadTheatre() {
    if (lite || still || !G) return;
    var url = "https://cdn.jsdelivr.net/npm/@theatre/browser-bundles@0.7.2/dist/" + (studio ? "core-and-studio.js" : "core-only.min.js");
    try {
      import(url).then(function () {
        var T = window.Theatre; if (!T || !T.core) return;
        if (studio && T.studio) T.studio.initialize();
        var core = T.core, project = core.getProject("DigiGlow Spine", { state: STATE }), sheet = project.sheet("Journey"), objs = {};
        Object.keys(KF).forEach(function (k) {
          var props = {};
          Object.keys(KF[k]).forEach(function (p) { var vs = KF[k][p].map(function (x) { return x[1]; }); props[p] = core.types.number(vs[0], { range: [Math.min.apply(null, vs) - 30, Math.max.apply(null, vs) + 30] }); });
          objs[k] = sheet.object(k, props);
        });
        project.ready.then(function () { TH = { sheet: sheet, objs: objs }; root.classList.add("dgn-theatre"); });
      }).catch(function () {});
    } catch (e) {}
  }

  if (GL && spine) try { (function () {
    var cv = q("canvas", spine), r = new THREE.WebGLRenderer({ canvas: cv, antialias: true, powerPreference: "high-performance" });
    r.setPixelRatio(Math.min(DPR, 1.5)); r.setClearColor(0x0b0709, 1);
    var scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(40, 1, 0.1, 200), FOG = new THREE.Color(0x0b0709);
    var world = new THREE.Group(); scene.add(world);
    var N = lite ? 150 : 230, R = 3.4, STEP = 0.5, DY = 0.088, Y0 = -4, CC = 4, CR = 4, CW = 480, CH = 320, P = PROJ.length;
    var atlas = document.createElement("canvas"); atlas.width = CW * CC; atlas.height = CH * CR;
    var actx = atlas.getContext("2d"), atex = new THREE.CanvasTexture(atlas);
    var PAL = [["#2a0016", "#ff0785"], ["#1b0615", "#9e36ff"], ["#12061c", "#8fa2ff"], ["#2a0016", "#f01eae"], ["#1b0615", "#ff8ac8"]];
    function proc(ctx, x, y, w, h, j, seed) {
      var g = ctx.createLinearGradient(x, y, x + w, y + h), pl = PAL[j % 5];
      g.addColorStop(0, pl[0]); g.addColorStop(1, pl[1]); ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
      ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
      ctx.globalAlpha = 0.12; ctx.strokeStyle = "#fff"; ctx.lineWidth = Math.max(1, w / 400);
      for (var k = 0; k < 14; k++) { var yy = y + h * (k / 14); ctx.beginPath(); ctx.moveTo(x, yy + Math.sin(seed + k) * h * 0.06); ctx.bezierCurveTo(x + w * 0.3, y + h * ((Math.sin(seed * 3 + k) + 1) / 2), x + w * 0.7, y + h * ((Math.cos(seed + k * 2) + 1) / 2), x + w, yy); ctx.stroke(); }
      ctx.globalAlpha = 0.92; ctx.fillStyle = "#fff"; ctx.font = "800 " + Math.round(h * 0.13) + "px Manrope, sans-serif"; ctx.fillText(PROJ[j].n, x + w * 0.07, y + h * 0.86, w * 0.86);
      ctx.restore();
    }
    function cover(ctx, img, iw, ih, x, y, w, h) { var s = Math.max(w / iw, h / ih), sw = w / s, sh = h / s; ctx.drawImage(img, (iw - sw) / 2, (ih - sh) / 2, sw, sh, x, y, w, h); }
    var CELLS = CC * CR, cellSrc = [];
    for (var c = 0; c < CELLS; c++) { cellSrc[c] = c % SRC.length; proc(actx, (c % CC) * CW, Math.floor(c / CC) * CH, CW, CH, SRC[cellSrc[c]].p, c * 1.7); }
    atex.needsUpdate = true;

    var tg = new THREE.PlaneGeometry(0.98, 0.64), aCell = new Float32Array(N * 4), aState = new Float32Array(N * 3);
    var TP = new Int16Array(N), TA = new Float32Array(N), TY = new Float32Array(N), HI = new Float32Array(N), DIM = new Float32Array(N), RR = new Float32Array(N), SS = new Float32Array(N), peel = new Uint8Array(N);
    for (var i = 0; i < N; i++) {
      var cc = (i * 5 + Math.floor(i / CELLS)) % CELLS, cx = cc % CC, cy = Math.floor(cc / CC);
      aCell.set([cx / CC, 1 - (cy + 1) / CR, 1 / CC, 1 / CR], i * 4);
      TP[i] = SRC[cellSrc[cc]].p; TA[i] = i * STEP; TY[i] = Y0 + i * DY; RR[i] = R; SS[i] = 1; aState[i * 3 + 2] = Math.random();
    }
    tg.setAttribute("aCell", new THREE.InstancedBufferAttribute(aCell, 4));
    var stA = new THREE.InstancedBufferAttribute(aState, 3); stA.setUsage(THREE.DynamicDrawUsage); tg.setAttribute("aState", stA);
    var tmat = new THREE.ShaderMaterial({ uniforms: { uAtlas: { value: atex }, uTime: { value: 0 }, uFog: { value: FOG }, uDen: { value: 0.045 } }, vertexShader: __VS_TILE__, fragmentShader: __FS_TILE__, side: THREE.DoubleSide });
    var tiles = new THREE.InstancedMesh(tg, tmat, N); tiles.frustumCulled = false; world.add(tiles);

    var LQ = { uCut: { value: 99 }, uPhase: { value: 0 }, uAmp: { value: 0.25 }, uSwell: { value: 0 }, uT: { value: 0 }, uRip: { value: [new THREE.Vector4(0, 0, -99, 0), new THREE.Vector4(0, 0, -99, 0), new THREE.Vector4(0, 0, -99, 0), new THREE.Vector4(0, 0, -99, 0)] }, uRim: { value: new THREE.Color(0xff0785) }, uRimK: { value: 0.7 } };
    var roomEnv = null, crt = null, cubeCam = null;
    if (THREE.RoomEnvironment) { try { roomEnv = new THREE.PMREMGenerator(r).fromScene(new THREE.RoomEnvironment(), 0.04).texture; } catch (e) { roomEnv = null; } }
    function rshape(w, h, rr) { var sp = new THREE.Shape(), x = -w / 2, y = -h / 2; sp.moveTo(x + rr, y); sp.lineTo(x + w - rr, y); sp.quadraticCurveTo(x + w, y, x + w, y + rr); sp.lineTo(x + w, y + h - rr); sp.quadraticCurveTo(x + w, y + h, x + w - rr, y + h); sp.lineTo(x + rr, y + h); sp.quadraticCurveTo(x, y + h, x, y + h - rr); sp.lineTo(x, y + rr); sp.quadraticCurveTo(x, y, x + rr, y); return sp; }
    function slab(w, h, dd, rr) { var g = new THREE.ExtrudeGeometry(rshape(w - rr * 1.2, h - rr * 1.2, rr), { depth: dd, bevelEnabled: true, bevelThickness: dd * 0.6, bevelSize: rr * 0.6, bevelSegments: 4, curveSegments: 6 }); g.center(); g.computeVertexNormals(); return g; }
    var gmat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0, roughness: 0.14, transmission: 1, thickness: 0.3, ior: 1.5, iridescence: 0.3, iridescenceIOR: 1.3, clearcoat: 1, clearcoatRoughness: 0.06, attenuationColor: new THREE.Color(0xffc2e2), attenuationDistance: 1.4, envMap: roomEnv, envMapIntensity: 1.3 });
    var gtiles = new THREE.InstancedMesh(slab(1.05, 0.7, 0.04, 0.08), gmat, N); gtiles.frustumCulled = false; world.add(gtiles);
    var gcol = new THREE.Color(), gW = new THREE.Color(0xffffff), gP = new THREE.Color(0xff6fb8), gD = new THREE.Color(0x3a2a33);
    for (var gi = 0; gi < N; gi++) gtiles.setColorAt(gi, gW);
    var cmat = gmat.clone(); cmat.roughness = 0.05; cmat.thickness = 0.6; cmat.attenuationDistance = 2.4; cmat.iridescence = 0.45;
    var lmat = new THREE.ShaderMaterial({ uniforms: { uAtlas: { value: atex }, uPhase: LQ.uPhase, uAmp: LQ.uAmp, uSwell: LQ.uSwell, uCut: LQ.uCut, uFog: { value: FOG }, uDen: { value: 0.045 } }, vertexShader: __VS_DRILL__, fragmentShader: __FS_DRILL__, side: THREE.DoubleSide, extensions: { derivatives: true } });
    var liquid = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 36, lite ? 40 : 72, lite ? 120 : 240, true), lmat); liquid.position.y = 6; liquid.frustumCulled = false; world.add(liquid);
    var dl1 = new THREE.DirectionalLight(0xffffff, 1.1); dl1.position.set(5, 12, 9); scene.add(dl1);
    var pl1 = new THREE.PointLight(0xff0785, 3, 30); pl1.position.set(-6, 4, 6); scene.add(pl1);
    var rips = LQ.uRip.value, ri = 0, lastRip = -1, liqPh = 0, lastT = 0, lastPos = 0, drillDir = 1, cardSw = 0, cubeTick = 0;
    function addRip(wp, s) { var p = liquid.worldToLocal(wp.clone()); rips[ri].set(p.y, Math.atan2(p.x, p.z), LQ.uT.value, s); ri = (ri + 1) % 4; lastRip = LQ.uT.value; }
    var hp = []; for (var k = 0; k <= 400; k++) { var u = k / 400 * (N - 1); hp.push(new THREE.Vector3(Math.sin(u * STEP) * (R - 0.2), Y0 + u * DY - 0.42, Math.cos(u * STEP) * (R - 0.2))); }
    var helix = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(hp), 800, 0.012, 5, false), new THREE.MeshBasicMaterial({ color: 0x9e36ff, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending, depthWrite: false }));
    world.add(helix);

    var DN = lite ? 600 : 1900, dp = new Float32Array(DN * 3), ds = new Float32Array(DN), dc = new Float32Array(DN * 3), DC = [[1, 0.78, 0.42], [1, 0.88, 0.62], [1, 0.7, 0.36], [0.74, 0.9, 0.5], [1, 0.92, 0.75], [1, 0.5, 0.72]];
    for (var d = 0; d < DN; d++) { var rad = 1.6 + Math.pow(Math.random(), 0.55) * 13, an = Math.random() * Math.PI * 2, cr = Math.random(); dp.set([Math.sin(an) * rad, -7 + Math.random() * 30, Math.cos(an) * rad], d * 3); ds[d] = Math.random(); dc.set(DC[cr < 0.3 ? 0 : cr < 0.55 ? 1 : cr < 0.72 ? 2 : cr < 0.84 ? 3 : cr < 0.93 ? 4 : 5], d * 3); }
    var dg = new THREE.BufferGeometry(); dg.setAttribute("position", new THREE.BufferAttribute(dp, 3)); dg.setAttribute("aS", new THREE.BufferAttribute(ds, 1)); dg.setAttribute("aC", new THREE.BufferAttribute(dc, 3));
    var dmat = new THREE.ShaderMaterial({ uniforms: { uTime: { value: 0 }, uPR: { value: 1 }, uFocus: { value: 9 }, uSwirl: { value: 0 } }, vertexShader: __VS_DUST__, fragmentShader: __FS_DUST__, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    var dust = new THREE.Points(dg, dmat); dust.frustumCulled = false; scene.add(dust);
    var logoG = new THREE.Group(), lmatP = null; scene.add(logoG);
    function buildLogo() {
      if (lite || lmatP) return;
      var lc = document.createElement("canvas"), LW = 600, LH = 330; lc.width = LW; lc.height = LH; var lx = lc.getContext("2d");
      function sq(x, y, col) { lx.fillStyle = col; lx.beginPath(); if (lx.roundRect) lx.roundRect(x, y, 48, 40, 5); else lx.rect(x, y, 48, 40); lx.fill(); }
      sq(234, 20, "#f4ed79"); sq(320, 20, "#bee47a"); sq(196, 62, "#0ebedf"); sq(276, 62, "#e22399"); sq(354, 62, "#df1604");
      function fit(txt, w, y, weight, col) { lx.font = weight + " 100px Manrope, sans-serif"; var m = lx.measureText(txt).width, sz = 100 * w / m; lx.font = weight + " " + sz.toFixed(1) + "px Manrope, sans-serif"; lx.fillStyle = col; lx.textAlign = "center"; lx.textBaseline = "alphabetic"; lx.fillText(txt, LW / 2, y); }
      fit("DigiGlow Media", 372, 196, 800, "#f6efe9"); fit("A Creative Agency", 232, 250, 700, "#ff2a9a");
      var dd = lx.getImageData(0, 0, LW, LH).data, cand = [];
      for (var y = 0; y < LH; y += 1) for (var x = 0; x < LW; x += 1) { var i = (y * LW + x) * 4; if (dd[i + 3] > 150) cand.push(i); }
      var LN = Math.min(7000, cand.length), at = new Float32Array(LN * 3), ar = new Float32Array(LN * 3), ac = new Float32Array(LN * 3), as = new Float32Array(LN), sc = 3.6 / LW;
      for (var k = 0; k < LN; k++) {
        var ci = cand[Math.floor(Math.random() * cand.length)], px = (ci / 4) % LW, py = Math.floor(ci / 4 / LW);
        at.set([(px - LW / 2) * sc, (LH / 2 - py) * sc, 0], k * 3);
        var a = Math.random() * Math.PI * 2, rr = 1.5 + Math.random() * 4.5; ar.set([Math.cos(a) * rr, Math.sin(a) * rr, (Math.random() - 0.5) * 3], k * 3);
        ac.set([dd[ci] / 255, dd[ci + 1] / 255, dd[ci + 2] / 255], k * 3); as[k] = Math.random();
      }
      var lg = new THREE.BufferGeometry(); lg.setAttribute("position", new THREE.BufferAttribute(at, 3)); lg.setAttribute("aR", new THREE.BufferAttribute(ar, 3)); lg.setAttribute("aC", new THREE.BufferAttribute(ac, 3)); lg.setAttribute("aS", new THREE.BufferAttribute(as, 1));
      lmatP = new THREE.ShaderMaterial({ uniforms: { uF: { value: 0 }, uTime: { value: 0 }, uPR: { value: dmat.uniforms.uPR.value } }, vertexShader: __VS_LOGO__, fragmentShader: __FS_LOGO__, transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending });
      var lp = new THREE.Points(lg, lmatP); lp.frustumCulled = false; lp.renderOrder = 9; logoG.add(lp); logoG.visible = false;
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { try { buildLogo(); } catch (e) { dbg(e); } }); else setTimeout(buildLogo, 1500);

    var cards = PROJ.map(function (pj, j) {
      var cvs = document.createElement("canvas"); cvs.width = 960; cvs.height = 640; var cx2 = cvs.getContext("2d"); proc(cx2, 0, 0, 960, 640, j, j * 3.1);
      var tex = new THREE.CanvasTexture(cvs);
      var m = new THREE.ShaderMaterial({ uniforms: { uTex: { value: tex }, uAmt: { value: 0 }, uTime: { value: 0 } }, vertexShader: __VS_UV__, fragmentShader: __FS_CARD__, side: THREE.DoubleSide });
      var me = new THREE.Group(), img = new THREE.Mesh(new THREE.PlaneGeometry(2.84, 1.84), m), gl2 = new THREE.Mesh(slab(3, 2, 0.08, 0.18), cmat);
      img.frustumCulled = false; gl2.frustumCulled = false; me.add(img); me.add(gl2); me.visible = false; scene.add(me);
      return { me: me, m: m, glass: gl2, ctx: cx2, tex: tex, vid: null, has: false, anchor: -1 };
    });

    var comp = null, bloom = null, fin = null;
    if (!lite && THREE.EffectComposer && THREE.RenderPass && THREE.UnrealBloomPass && THREE.ShaderPass) {
      try {
        comp = new THREE.EffectComposer(r); comp.addPass(new THREE.RenderPass(scene, cam));
        bloom = new THREE.UnrealBloomPass(new THREE.Vector2(512, 512), 0.5, 0.5, 0.42); comp.addPass(bloom);
        fin = new THREE.ShaderPass({ uniforms: { tDiffuse: { value: null }, uTime: { value: 0 }, uFringe: { value: 0.5 }, uGrain: { value: 0.06 } }, vertexShader: __VS_UV__, fragmentShader: __FS_FIN__ }); comp.addPass(fin);
      } catch (e) { comp = null; }
    }

    var o = new THREE.Object3D(), eul = new THREE.Euler(), fwd = new THREE.Vector3(), rgt = new THREE.Vector3(), upv = new THREE.Vector3(), front = new THREE.Vector3(), anc = new THREE.Vector3(), tgt = new THREE.Vector3();
    var m4 = new THREE.Matrix4(), fq = new THREE.Quaternion(), aq = new THREE.Quaternion(), wq = new THREE.Quaternion();
    var outK = 0, flashEl = null, dEnd = new THREE.Vector3(), mx = 0, my = 0, smx = 0, smy = 0, spin = 0, vel = 0, drag = null, hov = -1, hovPending = false, lastFov = 0, ray = new THREE.Raycaster(), mv = new THREE.Vector2(), K1 = lite || still ? 1 : 0.12;

    function camFrom(v) {
      var C = v.Camera, th = C.orbit * Math.PI / 180;
      if (C.fov !== lastFov) { cam.fov = C.fov; cam.updateProjectionMatrix(); lastFov = C.fov; }
      rgt.set(Math.cos(th), 0, -Math.sin(th));
      var dv = v.Outro ? ease(Math.max(0, Math.min(1, v.Outro.dive))) : 0, fr = 1 - dv;
      cam.position.set(Math.sin(th) * C.distance, C.height - smy * 0.5 * fr, Math.cos(th) * C.distance).addScaledVector(rgt, smx * 0.6 * fr);
      tgt.set(0, C.height + C.look, 0).addScaledVector(rgt, C.shift);
      if (dv > 0) {
        cam.position.lerp(dEnd.set(Math.sin(th) * 0.02, 4, Math.cos(th) * 0.02), dv); tgt.lerp(dEnd.set(0, -6, 0), dv);
        cam.up.set(0, 1, 0).lerp(dEnd.set(-Math.sin(th), 0, -Math.cos(th)), Math.min(1, dv * 1.4)).normalize();
        var fv = C.fov + (68 - C.fov) * dv; if (fv !== lastFov) { cam.fov = fv; cam.updateProjectionMatrix(); lastFov = fv; }
      } else cam.up.set(0, 1, 0);
      cam.lookAt(tgt);
    }
    function updCards(focus, t) {
      cam.getWorldDirection(fwd); rgt.crossVectors(fwd, cam.up).normalize(); upv.crossVectors(rgt, fwd).normalize();
      front.copy(cam.position).addScaledVector(fwd, 5.4).addScaledVector(rgt, 1.45).addScaledVector(upv, 0.32);
      m4.lookAt(cam.position, front, upv); fq.setFromRotationMatrix(m4);
      world.getWorldQuaternion(wq);
      cards.forEach(function (cd, j) {
        var a = Math.max(0, 1 - Math.abs(focus - j) * 1.6); a = ease(a);
        cd.me.visible = a > 0.002; cardSw = Math.max(cardSw, a * (1 - a) * 4);
        if (cd.vid) { if (a > 0.3 && cd.vid.paused) { var pr = cd.vid.play(); if (pr && pr.catch) pr.catch(function () {}); } else if (a <= 0.3 && !cd.vid.paused) cd.vid.pause(); }
        if (!cd.me.visible) { cd.anchor = -1; return; }
        if (cd.anchor < 0) { var best = -1, bd = 1e9; for (var i = 0; i < N; i++) if (TP[i] === j) { var dd = Math.abs(TY[i] - cam.position.y - 0.3); if (dd < bd) { bd = dd; best = i; } } cd.anchor = best; }
        var ii = cd.anchor; if (ii < 0) return;
        anc.set(Math.sin(TA[ii]) * RR[ii], TY[ii], Math.cos(TA[ii]) * RR[ii]).applyMatrix4(world.matrixWorld);
        eul.set(0, TA[ii], 0); aq.setFromEuler(eul).premultiply(wq);
        cd.me.position.lerpVectors(anc, front, a); cd.me.quaternion.slerpQuaternions(aq, fq, a); cd.me.scale.setScalar(0.35 + 0.65 * a);
        cd.m.uniforms.uAmt.value = a; cd.m.uniforms.uTime.value = t;
        if (a > 0.04) peel[ii] = 1;
      });
    }
    function updTiles(t) {
      var filt = curCat !== "all";
      for (var i = 0; i < N; i++) {
        var ok = match(TP[i]);
        var th = Math.min(1, (i === hov ? 1 : 0) + (filt && ok ? 0.6 : 0)), td = ok ? 0 : 1, tr = R + (filt && ok ? 0.45 : 0) + (i === hov ? 0.35 : 0) + outK * 9, ts = (peel[i] ? 0 : ok ? 1 : 0.8) * (1 - outK);
        HI[i] += (th - HI[i]) * K1; DIM[i] += (td - DIM[i]) * K1; RR[i] += (tr - RR[i]) * K1; SS[i] += (ts - SS[i]) * (peel[i] ? 0.3 : K1);
        o.position.set(Math.sin(TA[i]) * RR[i], TY[i] + Math.sin(t * 0.8 + i * 0.3) * 0.03, Math.cos(TA[i]) * RR[i]);
        o.rotation.set(0, TA[i], 0); o.scale.setScalar(Math.max(0.001, SS[i])); o.updateMatrix(); tiles.setMatrixAt(i, o.matrix); gtiles.setMatrixAt(i, o.matrix); gcol.copy(gW).lerp(gP, HI[i] * 0.8).lerp(gD, DIM[i] * 0.8); gtiles.setColorAt(i, gcol);
        aState[i * 3] = HI[i]; aState[i * 3 + 1] = DIM[i];
      }
      tiles.instanceMatrix.needsUpdate = true; stA.needsUpdate = true; gtiles.instanceMatrix.needsUpdate = true; if (gtiles.instanceColor) gtiles.instanceColor.needsUpdate = true;
    }
    var shown = { intro: -1, work: -1 };
    function ui(pos, focus) {
      var io = Math.max(0, Math.min(1, 1 - (pos - 0.15) / 0.9));
      if (Math.abs(io - shown.intro) > 0.01) { shown.intro = io; spUI.intro.style.opacity = io.toFixed(2); spUI.intro.style.visibility = io < 0.02 ? "hidden" : ""; }
      var w = pos > 1.25 && pos < 10.2 ? 1 : 0;
      if (w !== shown.work) { shown.work = w; spUI.head.classList.toggle("on", !!w); spUI.filt.classList.toggle("on", !!w); }
      var j = Math.round(focus); setProj(w && j >= 0 && j < P && Math.abs(focus - j) < 0.32 ? j : -1);
    }
    function draw(v, t) {
      if (comp) { bloom.strength = v.Scene.glow; fin.uniforms.uTime.value = t; fin.uniforms.uFringe.value = v.Scene.fringe; fin.uniforms.uGrain.value = v.Scene.grain; comp.render(); }
      else r.render(scene, cam);
    }
    function frame(t, pos) {
      var v = readVals(pos); outK = v.Outro ? Math.min(1, Math.max(0, v.Outro.dive * 2)) : 0;
      smx += (mx - smx) * 0.05; smy += (my - smy) * 0.05;
      if (!drag) { spin += vel; vel *= 0.94; }
      world.rotation.y = spin + v.Scene.spin * Math.PI / 180 + t * 0.04;
      camFrom(v); world.updateMatrixWorld(true);
      if (lmatP) { var lf = v.Outro.logo; logoG.visible = lf > 0.001 && lf < 1.999; if (logoG.visible) { cam.getWorldDirection(fwd); logoG.position.copy(cam.position).addScaledVector(fwd, 3.4); logoG.quaternion.copy(cam.quaternion); lmatP.uniforms.uF.value = lf; lmatP.uniforms.uTime.value = t; lmatP.uniforms.uPR.value = dmat.uniforms.uPR.value; } }
      peel.fill(0); cardSw = 0; updCards(v.Focus.card, t);
      if (hovPending && !drag) {
        hovPending = false; ray.setFromCamera(mv, cam); var hit = ray.intersectObject(tiles), nh = hit.length && hit[0].instanceId !== undefined ? hit[0].instanceId : -1;
        if (nh !== hov) { hov = nh; spUI.tip.classList.toggle("on", hov >= 0); cv.style.cursor = hov >= 0 ? "pointer" : ""; if (hov >= 0) spUI.tip.textContent = PROJ[TP[hov]].n; }
        if (nh < 0 && t - lastRip > 0.2) { var lh = ray.intersectObject(liquid); if (lh.length) addRip(lh[0].point, 0.16); }
      }
      updTiles(t);
      tmat.uniforms.uTime.value = t; dmat.uniforms.uTime.value = t; dmat.uniforms.uFocus.value = v.Camera.distance * (1 - outK) + 5 * outK; dmat.uniforms.uSwirl.value = v.Outro.swirl;
      LQ.uCut.value = v.Outro.dive > 0.001 ? 34 - 41 * Math.min(1, v.Outro.dive * 1.6) : 99; helix.material.opacity = 0.25 * (1 - outK); if (flashEl) flashEl.style.opacity = Math.max(0, v.Outro.flash).toFixed(3);
      var dtt = Math.max(0, Math.min(0.1, t - lastT)), Lq = v.Liquid, dps = pos - lastPos; lastT = t; lastPos = pos;
      if (Math.abs(dps) > 0.0005) drillDir += ((dps > 0 ? 1 : -1) - drillDir) * 0.2;
      liqPh += dtt * Lq.flow * 1.6 * drillDir + dps * 2.4;
      LQ.uPhase.value = liqPh + (lite || still ? 3 : 0); LQ.uAmp.value = Lq.amp; LQ.uT.value = t; LQ.uRimK.value = Lq.pink;
      LQ.uSwell.value += (cardSw * 0.14 - LQ.uSwell.value) * (lite || still ? 1 : 0.1); liquid.scale.set(Lq.radius, 1, Lq.radius);
      if (cubeCam && cubeTick++ % 3 === 0) { liquid.visible = false; gtiles.visible = false; cards.forEach(function (cd) { cd.glass.visible = false; }); cubeCam.position.set(0, cam.position.y, 0); cubeCam.update(r, scene); liquid.visible = true; gtiles.visible = true; cards.forEach(function (cd) { cd.glass.visible = true; }); }
      if (!lite) ui(pos, v.Focus.card);
      draw(v, t);
    }
    function size() {
      var w = spine.clientWidth, h = spine.clientHeight; r.setSize(w, h, false); cam.aspect = w / Math.max(1, h); cam.updateProjectionMatrix();
      if (comp) { comp.setPixelRatio(DPR); comp.setSize(w, h); }
      dmat.uniforms.uPR.value = DPR * h / 900;
    }
    size();

    var redraw = function () {};
    function loadSrc(s, cb) {
      if (s.v) {
        var vd = document.createElement("video"); vd.crossOrigin = "anonymous"; vd.muted = true; vd.loop = true; vd.playsInline = true; vd.preload = "auto";
        vd.addEventListener("loadeddata", function () { try { vd.currentTime = Math.min(2, (vd.duration || 6) / 3); } catch (e) {} }, { once: true });
        vd.addEventListener("seeked", function () { cb(vd, vd.videoWidth, vd.videoHeight); }, { once: true });
        vd.src = s.u; vd.load();
      } else { var im = new Image(); im.crossOrigin = "anonymous"; im.decoding = "async"; im.onload = function () { cb(im, im.naturalWidth, im.naturalHeight); }; im.src = s.u; }
    }
    function loadAll() {
      SRC.forEach(function (s, si) {
        if (lite && s.v) return;
        loadSrc(s, function (el, iw, ih) {
          try {
            for (var c = 0; c < CELLS; c++) if (cellSrc[c] === si) cover(actx, el, iw, ih, (c % CC) * CW, Math.floor(c / CC) * CH, CW, CH);
            atex.needsUpdate = true;
            var cd = cards[s.p];
            if (!cd.has) { cd.has = true; if (s.v && !lite) { cd.vid = el; var vt = new THREE.VideoTexture(el); cd.m.uniforms.uTex.value = vt; } else { cover(cd.ctx, el, iw, ih, 0, 0, 960, 640); cd.tex.needsUpdate = true; } }
            redraw();
          } catch (e) {}
        });
      });
    }
    setTimeout(loadAll, lite ? 600 : 1200);

    if (lite || still) {
      redraw = function () { frame(3, 0); };
      redraw(); window.addEventListener("resize", function () { size(); redraw(); });
      return;
    }
    root.classList.add("dgn-gl");
    loadTheatre();

    cv.addEventListener("pointermove", function (e) {
      var b = cv.getBoundingClientRect(); mx = (e.clientX - b.left) / b.width * 2 - 1; my = (e.clientY - b.top) / b.height * 2 - 1;
      spUI.tip.style.transform = "translate(" + (e.clientX - b.left + 18) + "px," + (e.clientY - b.top + 18) + "px)";
      if (drag) { var dx = e.clientX - drag.x; drag.x = e.clientX; drag.m += Math.abs(dx); spin += dx * 0.006; vel = dx * 0.006; return; }
      mv.set(mx, -my); hovPending = true;
    });
    cv.addEventListener("pointerdown", function (e) { if (hov < 0) { ray.setFromCamera(mv, cam); var lh2 = ray.intersectObject(liquid); if (lh2.length) addRip(lh2[0].point, 0.5); } drag = { x: e.clientX, m: 0 }; vel = 0; cv.classList.add("grabbing"); if (cv.setPointerCapture) cv.setPointerCapture(e.pointerId); });
    function up() { if (!drag) return; var m = drag.m; drag = null; cv.classList.remove("grabbing"); if (m < 5 && hov >= 0) spGo(TP[hov]); }
    cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", up);
    cv.addEventListener("pointerleave", function () { mx = 0; my = 0; hov = -1; spUI.tip.classList.remove("on"); cv.style.cursor = ""; });

    flashEl = document.createElement("div"); flashEl.setAttribute("aria-hidden", "true"); flashEl.style.cssText = "position:absolute;inset:0;z-index:2;pointer-events:none;opacity:0;background:radial-gradient(circle at 50% 50%, rgba(255,226,170,0.95), rgba(255,150,90,0.55) 32%, rgba(255,7,133,0.18) 55%, rgba(11,7,9,0) 75%)"; spine.appendChild(flashEl);
    var tunEl = root.querySelector(".dgn-tun");
    if (G) spST = ScrollTrigger.create({ trigger: spine, start: "top top", end: function () { return "+=" + Math.round(window.innerHeight * 8.4); }, pin: true, onUpdate: function (s) { spP.t = s.progress; }, onLeave: function () { if (tunEl) tunEl.classList.add("dgn-show"); }, onEnterBack: function () { if (tunEl) tunEl.classList.remove("dgn-show"); } });
    spGo = function (j) {
      if (!spST) return;
      var best = 0, bd = 1e9;
      for (var p = 0; p <= L; p += 0.02) { var fv = TH ? kv(KF.Focus.card, p) : readVals(p).Focus.card, dd = Math.abs(fv - j); if (dd < bd) { bd = dd; best = p; } }
      goY(spST.start + (best / L) * (spST.end - spST.start));
    };
    window.addEventListener("resize", size);
    var on = false, t0 = performance.now(), pf = { n: 0, acc: 0, last: 0, done: false }, bad = false;
    function perf(now) { if (pf.done) return; if (pf.last) { pf.acc += Math.min(200, now - pf.last); pf.n++; } pf.last = now; if (pf.n >= 90) { pf.done = true; if (pf.acc / pf.n > 30) { comp = null; cubeCam = null; r.setPixelRatio(1); size(); } } }
    function loop(now) { if (!on) return; perf(now); spP.c += (spP.t - spP.c) * 0.075; if (!bad) { try { frame((now - t0) / 1000, spP.c * L); } catch (e) { bad = true; dbg(e); } } requestAnimationFrame(loop); }
    seen(spine, function (v) { on = v; pf.last = 0; if (v) requestAnimationFrame(loop); });
  })(); } catch (e) { dbg(e); }

'''

VS_DRILL = r'''uniform float uPhase; uniform float uAmp; uniform float uSwell; varying float vLy;
varying vec2 vC; varying vec3 vN; varying vec3 vV; varying float vFl; varying float vD;
void main(){ float th = uv.x * 6.2831853; float y = position.y; vLy = y;
  float F = 3.0, K = 1.9; float a = F * th + y * K + uPhase;
  float fl = 0.5 + 0.5 * cos(a); float r = 1.0 + uAmp * (fl - 0.5) * 1.4 + uSwell;
  vec3 rad = vec3(sin(th), 0.0, cos(th)); vec3 tng = vec3(cos(th), 0.0, -sin(th));
  float dth = -uAmp * 0.7 * F * sin(a), dy = -uAmp * 0.7 * K * sin(a);
  vec3 n = normalize(rad - tng * dth / r - vec3(0.0, 1.0, 0.0) * dy);
  vec4 mv = modelViewMatrix * vec4(rad * r + vec3(0.0, y, 0.0), 1.0);
  vN = normalize(normalMatrix * n); vV = normalize(-mv.xyz); vD = -mv.z; vFl = fl;
  vC = vec2((a / F) / 6.2831853 * 14.0, y * 2.15);
  gl_Position = projectionMatrix * mv; }'''
FS_DRILL = r'''uniform sampler2D uAtlas; uniform vec3 uFog; uniform float uDen; uniform float uCut; varying float vLy;
varying vec2 vC; varying vec3 vN; varying vec3 vV; varying float vFl; varying float vD;
float h21(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
void main(){ if (vLy > uCut) discard; vec2 id = floor(vC); vec2 f = fract(vC); vec2 w = fwidth(vC) * 1.2;
  float k = floor(h21(vec2(mod(id.x, 14.0), id.y)) * 16.0); float ix = mod(k, 4.0), iy = floor(k / 4.0);
  vec2 m = vec2(0.05, 0.07); vec2 q = clamp((f - m) / (1.0 - 2.0 * m), 0.01, 0.99);
  vec2 e = min(f, 1.0 - f);
  float pic = smoothstep(m.x - w.x, m.x + w.x, e.x) * smoothstep(m.y - w.y, m.y + w.y, e.y);
  float gap = smoothstep(0.0, w.x + 0.015, e.x) * smoothstep(0.0, w.y + 0.02, e.y);
  float lip = (1.0 - pic) * smoothstep(m.x * 0.45, m.x, e.x) * smoothstep(m.y * 0.45, m.y, e.y);
  vec3 img = texture2D(uAtlas, (vec2(ix, 3.0 - iy) + q) / 4.0).rgb;
  vec3 frm = vec3(0.12, 0.112, 0.118) + vec3(0.28) * lip;
  vec3 base = mix(frm, img, pic) * gap;
  vec3 n = normalize(vN); vec3 L = normalize(vec3(0.45, 0.65, 0.6));
  float dif = max(dot(n, L), 0.0); float spe = pow(max(dot(reflect(-L, n), normalize(vV)), 0.0), 36.0);
  float face = clamp(dot(n, normalize(vV)), 0.0, 1.0);
  vec3 col = base * (0.42 + 0.85 * dif) * mix(0.3, 1.0, smoothstep(0.0, 0.55, vFl)) + vec3(1.0) * spe * 0.35 * (0.4 + 0.6 * pic);
  col *= 0.55 + 0.45 * face;
  float fg = 1.0 - exp(-uDen * uDen * vD * vD);
  gl_FragColor = vec4(mix(col, uFog, clamp(fg, 0.0, 1.0)), 1.0); }'''

VS_LOGO = r'''attribute vec3 aR; attribute vec3 aC; attribute float aS; uniform float uF; uniform float uTime; uniform float uPR; varying vec3 vC; varying float vA;
void main(){ float form = clamp(uF * 1.45 - aS * 0.45, 0.0, 1.0); form = form * form * (3.0 - 2.0 * form);
  float burst = clamp(uF - 1.0, 0.0, 1.0);
  float an = uTime * (0.6 + aS * 0.8) + aS * 6.2831; float cs = cos(an), sn = sin(an);
  vec3 st = vec3(cs * aR.x - sn * aR.y, sn * aR.x + cs * aR.y, aR.z);
  vec3 p = mix(st, position, form);
  p.xy += vec2(sin(uTime * 2.0 + aS * 40.0), cos(uTime * 1.7 + aS * 30.0)) * 0.012 * form;
  vec3 dir = normalize(position + vec3(aR.xy * 0.25, 0.6 + aS));
  p += dir * burst * burst * (3.0 + aS * 5.0);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = uPR * (2.2 + aS * 2.2) * (1.0 + (1.0 - form) * 1.4) * (1.0 + burst * 2.0);
  vC = mix(vec3(1.0, 0.8, 0.45), aC, form);
  vA = smoothstep(0.0, 0.25, uF) * (1.0 - burst) * (0.75 + 0.25 * sin(uTime * 3.0 + aS * 50.0));
  gl_Position = projectionMatrix * mv; }'''
FS_LOGO = r'''varying vec3 vC; varying float vA;
void main(){ float r = length(gl_PointCoord - 0.5) * 2.0; if (r > 1.0) discard;
  float a = exp(-r * r * 5.0) + exp(-r * r * 40.0) * 0.6;
  gl_FragColor = vec4(vC * a * vA * 1.7, 1.0); }'''

def js():
    s = JS
    for k, v in {'__PROJ__': J(PROJ), '__SRC__': J(SRC), '__KF__': J(KF), '__STATE__': J(STATE), '__VS_TILE__': sh(VS_TILE), '__FS_TILE__': sh(FS_TILE),
                 '__VS_DUST__': sh(VS_DUST), '__FS_DUST__': sh(FS_DUST), '__VS_UV__': sh(VS_UV), '__FS_CARD__': sh(FS_CARD), '__VS_GLOW__': sh(VS_GLOW),
                 '__FS_GLOW__': sh(FS_GLOW), '__FS_FIN__': sh(FS_FIN), '__VS_DRILL__': sh(VS_DRILL), '__VS_LOGO__': sh(VS_LOGO), '__FS_LOGO__': sh(FS_LOGO), '__FS_DRILL__': sh(FS_DRILL), '__LIQ__': sh(open('/home/claude/noir/liq_noise.glsl').read())}.items():
        s = s.replace(k, v)
    return s

T = 'https://cdn.jsdelivr.net/npm/three@0.147.0/'
GS = 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/'
SCRIPTS = ''.join(f'<script src="{u}"></script>\n' for u in [
    T + 'build/three.min.js', T + 'examples/js/environments/RoomEnvironment.js', T + 'examples/js/shaders/CopyShader.js', T + 'examples/js/shaders/LuminosityHighPassShader.js',
    T + 'examples/js/postprocessing/Pass.js', T + 'examples/js/postprocessing/EffectComposer.js', T + 'examples/js/postprocessing/RenderPass.js',
    T + 'examples/js/postprocessing/ShaderPass.js', T + 'examples/js/postprocessing/UnrealBloomPass.js',
    GS + 'gsap.min.js', GS + 'ScrollTrigger.min.js', GS + 'ScrambleTextPlugin.min.js', 'https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js'])
