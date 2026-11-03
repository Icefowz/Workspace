import json
import spine as SP

SERV = [
    ('Στρατηγική', 'Ξεκαθαρίζουμε στόχους, κοινό και μήνυμα πριν από κάθε κίνηση'),
    ('Branding', 'Ταυτότητα, λογότυπο και ύφος που αναγνωρίζονται με την πρώτη ματιά'),
    ('Websites', 'Γρήγορα και όμορφα websites σχεδιασμένα για να φέρνουν επαφές και πωλήσεις'),
    ('Video', 'Reels, εταιρικά video και κάλυψη events με κινηματογραφική ματιά'),
    ('Καμπάνιες', 'Social media και διαφήμιση με μετρήσιμα αποτελέσματα και συνεχή βελτίωση'),
]

items = ''.join(f'<li class="dgn-tun__it"><h3>{t}</h3><p>{d}</p></li>' for t, d in SERV)

HTML = f'''  <section class="dgn-tun" aria-label="Τι κάνουμε">
    <canvas aria-hidden="true"></canvas>
    <div class="dgn-tun__veil" aria-hidden="true"></div>
    <div class="dgn-wrap dgn-tun__in">
      <div class="dgn-tun__intro"><p class="dgn-kick">Τι κάνουμε</p><h2 class="dgn-h2">Μπείτε στον <em>πυρήνα</em> της δουλειάς μας</h2></div>
      <ol class="dgn-tun__list">{items}</ol>
    </div>
  </section>
'''

CSS = r'''  .dgn-tun {
    position: relative;
    padding: clamp(100px, 10vw, 150px) 0;
    overflow: hidden;
    background: var(--bg);
  }

  .dgn-tun canvas {
    opacity: 0.4;
  }

  .dgn-tun__veil {
    position: absolute;
    inset: 0;
    z-index: 2;
    background: var(--bg);
    opacity: 0;
    pointer-events: none;
  }

  .dgn-tun__in {
    position: relative;
    z-index: 3;
  }

  .dgn .dgn-tun__list {
    display: grid;
    gap: clamp(36px, 5vw, 60px);
    margin-top: clamp(44px, 6vw, 80px);
  }

  .dgn-tun__it h3 {
    font-size: clamp(40px, 7vw, 120px);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.06em;
  }

  .dgn-tun__it p {
    max-width: 460px;
    margin-top: 14px;
    font-size: clamp(15px, 1.2vw, 18px);
    line-height: 1.6;
    color: var(--soft);
  }

  .dgn-tgl.dgn-tun {
    height: 100vh;
    min-height: 640px;
    padding: 0;
  }

  .dgn-tgl.dgn-tun canvas {
    opacity: 1;
  }

  .dgn-gl .dgn-tgl.dgn-tun {
    z-index: 2;
    margin-top: -100vh;
  }

  .dgn-gl .dgn-tgl.dgn-tun:not(.dgn-show) {
    visibility: hidden;
  }

  .dgn-tgl .dgn-tun__in {
    position: absolute;
    inset: 0;
    max-width: none;
    pointer-events: none;
  }

  .dgn-tgl .dgn-tun__intro,
  .dgn-tgl .dgn-tun__it {
    position: absolute;
    left: 50%;
    top: 50%;
    width: min(900px, 88vw);
    text-align: center;
    transform: translate(-50%, -50%);
  }

  .dgn-tgl .dgn-tun__intro {
    transition: opacity 0.6s, filter 0.6s;
  }

  .dgn-tgl .dgn-tun__intro.off {
    opacity: 0;
    filter: blur(8px);
  }

  .dgn .dgn-tgl .dgn-tun__list {
    margin: 0;
  }

  .dgn-tgl .dgn-tun__it {
    opacity: 0;
    filter: blur(10px);
    transform: translate(-50%, -38%) scale(0.92);
    transition: opacity 0.7s, filter 0.7s, transform 0.9s cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  .dgn-tgl .dgn-tun__it.on {
    opacity: 1;
    filter: none;
    transform: translate(-50%, -50%);
  }

  .dgn-tgl .dgn-tun__it h3 {
    font-size: clamp(60px, 9vw, 150px);
    text-shadow: 0 0 40px rgba(255, 200, 140, 0.35), 0 0 90px rgba(255, 7, 133, 0.25);
  }

  .dgn-tgl .dgn-tun__it p {
    margin: 18px auto 0;
    color: rgba(244, 238, 241, 0.86);
  }

'''

VS_TUN = r'''uniform float uPhase; uniform float uStops[5];
varying vec2 vC; varying float vD; varying float vY; varying float vFl; varying float vFace;
void main(){ float th = uv.x * 6.2831853; float y = position.y; float w = 0.0;
  for (int i = 0; i < 5; i++) { float dy = y - uStops[i]; w += exp(-dy * dy * 0.08); }
  float F = 4.0, K = 0.55; float a = F * th + y * K + uPhase; float fl = 0.5 + 0.5 * cos(a);
  float r = 3.0 * (1.0 + 0.35 * w) + 0.22 * (fl - 0.5);
  vec4 mv = modelViewMatrix * vec4(sin(th) * r, y, cos(th) * r, 1.0);
  vec3 n = normalize(normalMatrix * vec3(-sin(th), 0.0, -cos(th)));
  vD = -mv.z; vY = y; vFl = fl; vFace = abs(dot(n, normalize(-mv.xyz)));
  vC = vec2((a / F) / 6.2831853 * 18.0, y * 1.35);
  gl_Position = projectionMatrix * mv; }'''

FS_TUN = r'''uniform sampler2D uAtlas; uniform vec3 uFog; uniform float uStops[5];
varying vec2 vC; varying float vD; varying float vY; varying float vFl; varying float vFace;
float h21(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
void main(){ vec2 id = floor(vC); vec2 f = fract(vC); vec2 w = fwidth(vC) * 1.2;
  float k = floor(h21(vec2(mod(id.x, 18.0), id.y)) * 16.0); float ix = mod(k, 4.0), iy = floor(k / 4.0);
  vec2 m = vec2(0.05, 0.07); vec2 q = clamp((f - m) / (1.0 - 2.0 * m), 0.01, 0.99); vec2 e = min(f, 1.0 - f);
  float pic = smoothstep(m.x - w.x, m.x + w.x, e.x) * smoothstep(m.y - w.y, m.y + w.y, e.y);
  float gap = smoothstep(0.0, w.x + 0.015, e.x) * smoothstep(0.0, w.y + 0.02, e.y);
  float lip = (1.0 - pic) * smoothstep(m.x * 0.45, m.x, e.x) * smoothstep(m.y * 0.45, m.y, e.y);
  vec3 img = texture2D(uAtlas, (vec2(ix, 3.0 - iy) + q) / 4.0).rgb;
  vec3 base = mix(vec3(0.12, 0.112, 0.118) + vec3(0.28) * lip, img, pic) * gap;
  float glow = 0.0; for (int i = 0; i < 5; i++) { float dy = vY - uStops[i]; glow += exp(-dy * dy * 0.22); }
  vec3 col = base * (0.24 + 0.6 * vFace) * mix(0.45, 1.0, vFl) + base * glow * 0.4 + vec3(1.0, 0.72, 0.45) * glow * 0.06 * (1.0 - pic);
  float fg = 1.0 - exp(-vD * vD * 0.0024);
  gl_FragColor = vec4(mix(col, uFog, clamp(fg, 0.0, 1.0)), 1.0); }'''

FS_RING = r'''uniform float uI; uniform vec3 uCol; varying vec2 vUv;
void main(){ float r = length(vUv - 0.5) * 2.0; float a = exp(-pow((r - 0.66) * 9.0, 2.0)) * 0.9 + exp(-r * 3.2) * 0.06;
  gl_FragColor = vec4(uCol * a * uI, 1.0); }'''

FS_EXIT = r'''uniform float uI; varying vec2 vUv;
void main(){ float r = length(vUv - 0.5) * 2.0; float a = pow(max(0.0, 1.0 - r), 1.6);
  gl_FragColor = vec4(vec3(1.0, 0.86, 0.72) * a * uI, 1.0); }'''

VS_TDUST = SP.VS_DUST.replace('p.y = mod(p.y + 7.0 + t * (0.05 + aS * 0.12), 30.0) - 7.0;', 'p.y = mod(p.y + 64.0 + t * (0.05 + aS * 0.12), 72.0) - 64.0;')
assert VS_TDUST != SP.VS_DUST

JS = r'''
  var tun = q(".dgn-tun");
  if (tun && GL) try { (function () {
    var tcv = q("canvas", tun), tr = new THREE.WebGLRenderer({ canvas: tcv, antialias: true, powerPreference: "high-performance" });
    tr.setPixelRatio(Math.min(DPR, 1.5)); tr.setClearColor(0x0b0709, 1);
    var ts = new THREE.Scene(), tc = new THREE.PerspectiveCamera(68, 1, 0.05, 120), TFOG = new THREE.Color(0x0b0709);
    tc.up.set(0, 0, -1);
    var STOPS = [-10, -20, -30, -40, -50], PS = [0.2, 0.35, 0.5, 0.65, 0.8], items = qa(".dgn-tun__it", tun), intro = q(".dgn-tun__intro", tun), veil = q(".dgn-tun__veil", tun);
    var tat = document.createElement("canvas"); tat.width = 1920; tat.height = 1280;
    var tctx = tat.getContext("2d"), ttex = new THREE.CanvasTexture(tat);
    var TPAL = ["#2a0016", "#3a0c2a", "#1b0615", "#12061c", "#2c1020", "#20101c"];
    for (var c = 0; c < 16; c++) { var tg2 = tctx.createLinearGradient(0, 0, 480, 320); tg2.addColorStop(0, TPAL[c % 6]); tg2.addColorStop(1, ["#ff0785", "#9e36ff", "#8fa2ff", "#f01eae", "#ff8ac8", "#c9a36a"][c % 6]); tctx.save(); tctx.translate((c % 4) * 480, Math.floor(c / 4) * 320); tctx.fillStyle = tg2; tctx.fillRect(0, 0, 480, 320); tctx.restore(); }
    ttex.needsUpdate = true;
    var TU = { uAtlas: { value: ttex }, uFog: { value: TFOG }, uStops: { value: STOPS }, uPhase: { value: 0 } };
    var tgeo = new THREE.CylinderGeometry(1, 1, 74, lite ? 48 : 72, lite ? 260 : 420, true); tgeo.translate(0, -33, 0);
    var tube = new THREE.Mesh(tgeo, new THREE.ShaderMaterial({ uniforms: TU, vertexShader: __VS_TUN__, fragmentShader: __FS_TUN__, side: THREE.DoubleSide, extensions: { derivatives: true } }));
    tube.frustumCulled = false;
    var tw = new THREE.Group(); tw.add(tube); ts.add(tw);
    var VSU = __VS_UV__, rings = [];
    STOPS.forEach(function (y) {
      var rm = new THREE.ShaderMaterial({ uniforms: { uI: { value: 1 }, uCol: { value: new THREE.Color(1.0, 0.62, 0.5) } }, vertexShader: VSU, fragmentShader: __FS_RING__, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
      var rp = new THREE.Mesh(new THREE.PlaneGeometry(8.6, 8.6), rm); rp.rotation.x = -Math.PI / 2; rp.position.y = y; ts.add(rp); rings.push(rm);
    });
    var xm = new THREE.ShaderMaterial({ uniforms: { uI: { value: 0 } }, vertexShader: VSU, fragmentShader: __FS_EXIT__, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    var xp = new THREE.Mesh(new THREE.PlaneGeometry(9, 9), xm); xp.rotation.x = -Math.PI / 2; xp.position.y = -61; ts.add(xp);
    var TDN = lite ? 400 : 1200, tdp = new Float32Array(TDN * 3), tds = new Float32Array(TDN), tdc = new Float32Array(TDN * 3), TDC = [[1, 0.78, 0.42], [1, 0.88, 0.62], [1, 0.7, 0.36], [0.74, 0.9, 0.5], [1, 0.5, 0.72]];
    for (var d = 0; d < TDN; d++) { var rr = Math.pow(Math.random(), 0.6) * 2.6, an = Math.random() * Math.PI * 2; tdp.set([Math.sin(an) * rr, 8 - Math.random() * 72, Math.cos(an) * rr], d * 3); tds[d] = Math.random(); tdc.set(TDC[d % 5], d * 3); }
    var tdg = new THREE.BufferGeometry(); tdg.setAttribute("position", new THREE.BufferAttribute(tdp, 3)); tdg.setAttribute("aS", new THREE.BufferAttribute(tds, 1)); tdg.setAttribute("aC", new THREE.BufferAttribute(tdc, 3));
    var tdm = new THREE.ShaderMaterial({ uniforms: { uTime: { value: 0 }, uPR: { value: 1 }, uFocus: { value: 4 } }, vertexShader: __VS_TDUST__, fragmentShader: __FS_DUST__, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    var tdust = new THREE.Points(tdg, tdm); tdust.frustumCulled = false; ts.add(tdust);
    var CY = [[0, 9], [0.1, 1.5]];
    STOPS.forEach(function (y, i) { CY.push([PS[i] - 0.045, y + 5.2]); CY.push([PS[i] + 0.045, y + 3.4]); });
    CY.push([0.88, -48.5]); CY.push([0.97, -58.6]); CY.push([1, -59]);
    var tp = { t: 0, c: 0 }, tmx = 0, tmy = 0, tsx = 0, tsy = 0, act = -2, introOff = null, tt0 = performance.now();
    function tframe(t, p) {
      tsx += (tmx - tsx) * 0.05; tsy += (tmy - tsy) * 0.05;
      var y = kv(CY, p), inside = Math.max(0, Math.min(1, (6 - y) / 4));
      tc.position.set(tsx * 0.5 * inside, y, tsy * 0.5 * inside);
      tc.lookAt(-tsx * 1.6 * inside, y - 10, -tsy * 1.6 * inside);
      tw.rotation.y = t * 0.12 + p * 5; TU.uPhase.value = t * 0.4;
      var near = -1;
      rings.forEach(function (rm, i) { var dd = Math.abs(p - PS[i]); rm.uniforms.uI.value = 0.3 + 1.1 * Math.max(0, 1 - dd / 0.08); if (dd < 0.065) near = i; });
      xm.uniforms.uI.value = Math.max(0, Math.min(1, (p - 0.84) / 0.13)) * 2.4;
      tdm.uniforms.uTime.value = t;
      if (!lite) {
        if (near !== act) { act = near; items.forEach(function (it, i) { it.classList.toggle("on", i === near); }); }
        var io = p > 0.07; if (io !== introOff) { introOff = io; intro.classList.toggle("off", io); }
        veil.style.opacity = Math.max(0, Math.min(1, (p - 0.93) / 0.065)).toFixed(3);
      }
      tr.render(ts, tc);
    }
    function tsize() { var w = tun.clientWidth, h = tun.clientHeight; tr.setSize(w, h, false); tc.aspect = w / Math.max(1, h); tc.updateProjectionMatrix(); tdm.uniforms.uPR.value = Math.min(DPR, 1.5) * h / 900; }
    var tredraw = function () {};
    var timgs = SRC.filter(function (s) { return !s.v; });
    function tload() {
      timgs.forEach(function (s, si) {
        var im = new Image(); im.crossOrigin = "anonymous"; im.decoding = "async";
        im.onload = function () { try { for (var c = 0; c < 16; c++) if (c % timgs.length === si) { var sc = Math.max(480 / im.naturalWidth, 320 / im.naturalHeight), sw = 480 / sc, sh = 320 / sc; tctx.drawImage(im, (im.naturalWidth - sw) / 2, (im.naturalHeight - sh) / 2, sw, sh, (c % 4) * 480, Math.floor(c / 4) * 320, 480, 320); } ttex.needsUpdate = true; tredraw(); } catch (e) {} };
        im.src = s.u;
      });
    }
    if (lite || still || !G) {
      tsize(); tredraw = function () { tframe(2, 0.3); }; tredraw();
      setTimeout(tload, 900);
      window.addEventListener("resize", function () { tsize(); tredraw(); });
      return;
    }
    tun.classList.add("dgn-tgl");
    tsize(); setTimeout(tload, 1400);
    window.addEventListener("resize", tsize);
    tun.addEventListener("pointermove", function (e) { var b = tun.getBoundingClientRect(); tmx = (e.clientX - b.left) / b.width * 2 - 1; tmy = (e.clientY - b.top) / b.height * 2 - 1; });
    tun.addEventListener("pointerleave", function () { tmx = 0; tmy = 0; });
    var svEl = root.querySelector(".dgn-svx");
    if (svEl) veil.style.background = "radial-gradient(circle at 50% 50%, #fff4e6 0%, #ffd8ae 42%, #f2a27c 100%)";
    ScrollTrigger.create({ trigger: tun, start: "top top", end: function () { return "+=" + Math.round(window.innerHeight * 5); }, pin: true, onUpdate: function (s) { tp.t = s.progress; }, onLeave: function () { if (svEl) svEl.classList.add("dgn-show"); }, onEnterBack: function () { if (svEl) svEl.classList.remove("dgn-show"); } });
    var ton = false, tbad = false;
    function tloop(now) { if (!ton) return; tp.c += (tp.t - tp.c) * 0.08; if (!tbad) { try { tframe((now - tt0) / 1000, tp.c); } catch (e) { tbad = true; dbg(e); } } requestAnimationFrame(tloop); }
    seen(tun, function (v) { ton = v; if (v) requestAnimationFrame(tloop); });
  })(); } catch (e) { dbg(e); }
'''


def js():
    s = JS
    for k, v in {'__VS_TUN__': json.dumps(VS_TUN), '__FS_TUN__': json.dumps(FS_TUN), '__FS_RING__': json.dumps(FS_RING), '__FS_EXIT__': json.dumps(FS_EXIT),
                 '__VS_UV__': json.dumps(SP.VS_UV), '__VS_TDUST__': json.dumps(VS_TDUST), '__FS_DUST__': json.dumps(SP.FS_DUST)}.items():
        s = s.replace(k, v)
    return s
