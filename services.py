import json
import spine as SP

GROUPS = [
    ('Digital Marketing', 'Παρουσία στα κανάλια που μετράνε, με στόχο πελάτες και όχι απλά likes',
     ['Social Media Marketing', 'Google Ads & Performance Marketing', 'SEO', 'Content Marketing', 'Email Marketing & Automation', 'Analytics & Reporting']),
    ('Event Management', 'Events που κυλούν άψογα και αφήνουν αποτύπωμα',
     ['Event Management Services', 'Venue & Vendor Management', 'Creative & Production', 'Marketing & Promotion']),
    ('PR & Communication', 'Επικοινωνία που χτίζει εμπιστοσύνη και κάνει τη μάρκα σας να μένει στη μνήμη',
     ['Media Relations Strategy', 'Publicity Plans', 'Handling of Negative Publicity', 'Media Monitoring', 'CSR', 'Crisis Management', 'Consumer Relations', 'Corporate & Public Affairs Strategies', 'Marketing Consulting']),
    ('Web Development', 'Websites σαν προϊόν, γρήγορα, ασφαλή και φτιαγμένα για μετατροπές',
     ['Discovery & UX/UI', 'Development & CMS', 'Performance, SEO & Security']),
    ('Branding & Design', 'Ταυτότητα κομψή, σύγχρονη και αναγνωρίσιμη σε κάθε σημείο επαφής',
     ['Brand Strategy', 'Visual Identity', 'Brand System & Stationery', 'Content & Art Direction']),
    ('AI Creation', 'Video με AI που μεταφέρει το μήνυμα με κίνηση και τυπογραφία',
     ['Scripting & Storyboarding', 'AI Video Generation', 'Editing & On-Screen Messaging', 'Publishing & Performance']),
    ('Reel Strategy', 'Reels με στρατηγική, σενάριο και ανάλυση που σταματούν το scroll',
     ['Strategy & Content Pillars', 'Scripting', 'Filming', 'Publishing & Analysis']),
]


def esc(t):
    return t.replace('&', '&amp;')


LINKS = ['https://digiglowmedia.gr/expertise/', 'https://digiglowmedia.gr/expertise/', 'https://digiglowmedia.gr/expertise/', 'https://digiglowmedia.gr/service-web-development/', 'https://digiglowmedia.gr/expertise/', 'https://digiglowmedia.gr/expertise/', 'https://digiglowmedia.gr/service-reels/']

cards = ''.join(
    '<article class="dgn-svx__card"><h3>' + esc(t) + '</h3><p>' + d + '</p><ul>' + ''.join(f'<li style="--i:{k}">{esc(s)}</li>' for k, s in enumerate(items)) + '</ul>'
    + '<div class="dgn-svx__cta"><a class="dgn-btn dgn-mag" href="https://digiglowmedia.gr/contact-us/">Ζητήστε προσφορά</a><a class="dgn-link" href="' + LINKS[n] + '">Μάθετε περισσότερα</a></div></article>'
    for n, (t, d, items) in enumerate(GROUPS))

HTML = f'''  <section class="dgn-svx" aria-label="Υπηρεσίες">
    <canvas aria-hidden="true"></canvas>
    <div class="dgn-svx__veil" aria-hidden="true"></div>
    <div class="dgn-svx__in">
      <div class="dgn-wrap dgn-svx__head"><p class="dgn-kick">Υπηρεσίες</p><h2 class="dgn-h2">Όλα όσα χρειάζεται η μάρκα σας <em>σε ένα σημείο</em></h2></div>
      <div class="dgn-svx__track">{cards}</div>
    </div>
  </section>
'''

CSS = r'''  .dgn-svx {
    position: relative;
    padding: clamp(100px, 10vw, 150px) 0;
    overflow: hidden;
    background: var(--bg);
  }

  .dgn-svx canvas {
    display: none;
  }

  .dgn-svx__veil {
    position: absolute;
    inset: 0;
    z-index: 2;
    background: radial-gradient(circle at 50% 50%, #fff4e6 0%, #ffd8ae 42%, #f2a27c 100%);
    opacity: 0;
    pointer-events: none;
  }

  .dgn-svx__in {
    position: relative;
    z-index: 3;
  }

  .dgn .dgn-svx__track {
    display: grid;
    gap: 20px;
    margin-top: clamp(40px, 5vw, 70px);
    padding: 0 var(--gut);
  }

  .dgn-svx__card {
    padding: clamp(24px, 2.4vw, 36px);
    border: 1px solid rgba(255, 169, 220, 0.24);
    border-radius: 26px;
    background: linear-gradient(160deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.02));
    -webkit-backdrop-filter: blur(16px);
    backdrop-filter: blur(16px);
  }

  .dgn-svx__card h3 {
    font-size: clamp(28px, 2.6vw, 44px);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.045em;
  }

  .dgn-svx__card p {
    max-width: 420px;
    margin-top: 12px;
    font-size: 15.5px;
    line-height: 1.6;
    color: var(--soft);
  }

  .dgn .dgn-svx__card ul {
    display: grid;
    gap: 2px;
    margin-top: 22px;
    border-top: 1px solid var(--line);
  }

  .dgn-svx__card li {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid var(--line);
    font-family: var(--mono);
    font-size: 13.5px;
    transition: color 0.5s calc(var(--i) * 0.07s), opacity 0.5s calc(var(--i) * 0.07s), transform 0.6s calc(var(--i) * 0.07s) cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  .dgn-svx__card li::before {
    content: "";
    width: 7px;
    height: 7px;
    flex: none;
    border-radius: 50%;
    background: var(--mag);
    box-shadow: 0 0 10px var(--mag);
  }

  .dgn-svx__cta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 14px 22px;
    margin-top: 26px;
  }

  .dgn-sgl.dgn-svx {
    height: 100vh;
    min-height: 640px;
    padding: 0;
  }

  .dgn-sgl.dgn-svx canvas {
    display: block;
  }

  .dgn-gl .dgn-sgl.dgn-svx {
    z-index: 3;
    margin-top: -100vh;
  }

  .dgn-gl .dgn-sgl.dgn-svx:not(.dgn-show) {
    visibility: hidden;
  }

  .dgn-sgl .dgn-svx__in {
    position: absolute;
    inset: 0;
  }

  .dgn-sgl .dgn-svx__head {
    position: absolute;
    left: 0;
    right: 0;
    top: clamp(120px, 15vh, 170px);
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s, transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  .dgn-sgl .dgn-svx__head.on {
    opacity: 1;
    transform: none;
  }

  .dgn .dgn-sgl .dgn-svx__track {
    position: absolute;
    left: var(--gut);
    top: 57%;
    display: block;
    width: min(560px, 42vw);
    margin: 0;
    padding: 0;
  }

  .dgn-sgl .dgn-svx__head h2 {
    text-shadow: 0 2px 30px rgba(60, 10, 40, 0.45);
  }

  .dgn-sgl .dgn-svx__card {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background: linear-gradient(160deg, rgba(36, 14, 30, 0.74), rgba(16, 8, 14, 0.62));
    border-color: rgba(255, 169, 220, 0.32);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45), 0 0 60px rgba(255, 7, 133, 0.12);
    opacity: 0;
    transform: translate(-24px, -50%);
    pointer-events: none;
    transition: opacity 0.6s, transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  .dgn-sgl .dgn-svx__card.on {
    opacity: 1;
    transform: translate(0, -50%);
    pointer-events: auto;
  }

  .dgn-sgl .dgn-svx__card li {
    color: rgba(244, 238, 241, 0.4);
    transform: translateX(-8px);
  }

  .dgn-sgl .dgn-svx__card.on li {
    color: var(--fg);
    transform: none;
  }

  .dgn .dgn-sgl .dgn-svx__card ul {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 18px;
    border-top: 0;
  }

  .dgn-sgl .dgn-svx__card li {
    padding: 6px 12px;
    border: 1px solid rgba(255, 169, 220, 0.22);
    border-radius: 99px;
    font-size: 12px;
  }

  .dgn-sgl .dgn-svx__card h3 {
    font-size: clamp(30px, 2.6vw, 44px);
  }

  .dgn-sgl .dgn-svx__card p {
    margin-top: 10px;
    font-size: 15px;
  }

  .dgn-sgl .dgn-svx__cta {
    margin-top: 22px;
  }

  @media (max-width: 1536px) {
    .dgn .dgn-sgl .dgn-svx__track {
      width: min(520px, 44vw);
    }
  }

'''


FS_WATER = r"""uniform float uT; uniform float uExpo; uniform float uOpen; uniform vec3 uL; varying vec3 vW;
float hs(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(hs(i), hs(i + vec2(1.0, 0.0)), f.x), mix(hs(i + vec2(0.0, 1.0)), hs(i + vec2(1.0, 1.0)), f.x), f.y); }
float wh(vec2 p){ return vn(p * 0.9 + vec2(uT * 0.25, uT * 0.18)) * 0.6 + vn(p * 2.1 - vec2(uT * 0.31, -uT * 0.22)) * 0.4; }
void main(){ vec2 q = vW.xz; float e = 0.04; float h = wh(q);
  vec3 N = normalize(vec3((h - wh(q + vec2(e, 0.0))) * 3.0, 1.0, (h - wh(q + vec2(0.0, e))) * 3.0));
  vec3 V = normalize(vW - cameraPosition); float fr = 0.04 + 0.96 * pow(1.0 - max(dot(-V, N), 0.0), 5.0);
  vec3 R = reflect(V, N); float g = length(q - vec2(0.0, 0.0));
  vec3 col = vec3(0.012, 0.03, 0.034) + vec3(0.02, 0.07, 0.07) * h;
  col += vec3(1.0, 0.72, 0.36) * pow(max(dot(R, normalize(vec3(-cameraPosition.x * 0.1, 0.55, -1.0))), 0.0), 40.0) * (0.15 + 0.6 * uOpen) * exp(-g * 0.25);
  col += vec3(1.0, 0.86, 0.66) * pow(max(dot(R, uL), 0.0), 300.0) * 1.2;
  col += vec3(1.0, 0.7, 0.35) * fr * 0.35 * exp(-g * 0.2) * (0.3 + uOpen);
  float edge = smoothstep(3.2, 2.0, length((q - vec2(-3.6, 2.6)) * vec2(0.6, 1.0)));
  gl_FragColor = vec4(col * uExpo, edge * 0.92); }"""

VS_BEAM = r"""varying vec3 vN; varying vec3 vP; varying float vY;
void main(){ vY = uv.y; vec4 w = modelMatrix * vec4(position, 1.0); vP = w.xyz; vN = normalize(mat3(modelMatrix) * normal); gl_Position = projectionMatrix * viewMatrix * w; }"""

FS_BEAM = r"""uniform float uI; uniform float uExpo; uniform vec3 uC; varying vec3 vN; varying vec3 vP; varying float vY;
void main(){ float e = abs(dot(normalize(vN), normalize(cameraPosition - vP)));
  float a = pow(e, 2.2) * (0.35 + 0.65 * vY) * smoothstep(0.0, 0.12, vY) * smoothstep(1.0, 0.85, vY);
  gl_FragColor = vec4(mix(vec3(1.0, 0.86, 0.68), uC, 0.3) * a * uI * uExpo, 1.0); }"""

VS_SDUST = SP.VS_DUST.replace('p.y = mod(p.y + 7.0 + t * (0.05 + aS * 0.12), 30.0) - 7.0;', 'p.y = mod(p.y + 0.5 + t * (0.04 + aS * 0.1), 7.0) - 0.5;')
assert VS_SDUST != SP.VS_DUST

JS = r"""
  var svx = q(".dgn-svx");
  if (svx && GL && G && !lite && !still) try { (function () {
    var scv = q("canvas", svx), sr = new THREE.WebGLRenderer({ canvas: scv, antialias: true, powerPreference: "high-performance" });
    sr.setPixelRatio(Math.min(DPR, 1.25)); sr.setClearColor(0x070405, 1);
    sr.toneMapping = THREE.ACESFilmicToneMapping; sr.toneMappingExposure = 1; sr.shadowMap.enabled = true; sr.shadowMap.type = THREE.PCFSoftShadowMap;
    var ssc = new THREE.Scene(), scm = new THREE.PerspectiveCamera(40, 1, 0.1, 200);
    var es = new THREE.Scene(), ecol = function (r, g, b) { return new THREE.MeshBasicMaterial({ color: new THREE.Color(r, g, b), side: THREE.DoubleSide }); };
    es.add(new THREE.Mesh(new THREE.BoxGeometry(40, 40, 40), new THREE.MeshBasicMaterial({ color: 0x0a0608, side: THREE.BackSide })));
    function epanel(m, w, h, x, y, z) { var pl = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m); pl.position.set(x, y, z); pl.lookAt(0, 0, 0); es.add(pl); }
    epanel(ecol(4, 3.6, 3), 12, 8, 2, 15, -8); epanel(ecol(3, 2.6, 2), 4, 16, -16, 6, -4); epanel(ecol(2.4, 1.2, 1.6), 4, 12, 16, 2, 3); epanel(ecol(3, 2.2, 1), 8, 3, -6, 3, 16);
    var esd = 7, erd = function () { esd = (esd * 16807) % 2147483647; return esd / 2147483647; }, EP = [[3, 2.8, 2.5], [2.6, 2.5, 2.4], [3, 2.2, 1.4], [3.2, 3, 2.8], [2.4, 1.4, 2]];
    for (var ek = 0; ek < 70; ek++) { var th = erd() * 6.283, ph = Math.acos(2 * erd() - 1), ec = EP[ek % 5]; epanel(ecol(ec[0], ec[1], ec[2]), 0.6 + erd() * 2.4, 0.4 + erd() * 1.4, 18 * Math.sin(ph) * Math.cos(th), 18 * Math.cos(ph), 18 * Math.sin(ph) * Math.sin(th)); }
    try { ssc.environment = new THREE.PMREMGenerator(sr).fromScene(es, 0.04).texture; } catch (e) {}
    function cnv(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
    var wc = cnv(512, 512), wx = wc.getContext("2d");
    wx.fillStyle = "#4a2a18"; wx.fillRect(0, 0, 512, 512);
    for (var pk = 0; pk < 4; pk++) { wx.fillStyle = pk % 2 ? "#563220" : "#43261a"; wx.fillRect(0, pk * 128, 512, 126); wx.fillStyle = "#1e0f08"; wx.fillRect(0, pk * 128 + 126, 512, 2); }
    for (var gl2 = 0; gl2 < 260; gl2++) { wx.strokeStyle = "rgba(20,8,4," + (0.08 + erd() * 0.18).toFixed(2) + ")"; wx.lineWidth = 1 + erd() * 2; var gy = erd() * 512; wx.beginPath(); wx.moveTo(0, gy); wx.bezierCurveTo(170, gy + (erd() - 0.5) * 14, 340, gy + (erd() - 0.5) * 14, 512, gy + (erd() - 0.5) * 10); wx.stroke(); }
    var wtex = new THREE.CanvasTexture(wc);
    var wood = new THREE.MeshStandardMaterial({ map: wtex, roughness: 0.75, metalness: 0, envMapIntensity: 0.25 });
    var gold = new THREE.MeshStandardMaterial({ color: 0xe0a948, roughness: 0.28, metalness: 1, envMapIntensity: 1 });
    var chest = new THREE.Group(), CW = 2.6, CH = 1.25, CD = 1.6; chest.position.set(0, 0, 0); chest.rotation.y = -0.32; ssc.add(chest);
    function part(geo, m, x, y, z) { var o = new THREE.Mesh(geo, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; return o; }
    var T = 0.08;
    chest.add(part(new THREE.BoxGeometry(CW, T, CD), wood, 0, T / 2, 0));
    chest.add(part(new THREE.BoxGeometry(CW, CH, T), wood, 0, CH / 2, CD / 2 - T / 2));
    chest.add(part(new THREE.BoxGeometry(CW, CH, T), wood, 0, CH / 2, -CD / 2 + T / 2));
    chest.add(part(new THREE.BoxGeometry(T, CH, CD), wood, CW / 2 - T / 2, CH / 2, 0));
    chest.add(part(new THREE.BoxGeometry(T, CH, CD), wood, -CW / 2 + T / 2, CH / 2, 0));
    [-0.95, 0.95].forEach(function (bx) { chest.add(part(new THREE.BoxGeometry(0.14, CH + 0.04, CD + 0.06), gold, bx, CH / 2, 0)); });
    chest.add(part(new THREE.BoxGeometry(CW + 0.06, 0.1, CD + 0.06), gold, 0, CH - 0.03, 0));
    chest.add(part(new THREE.BoxGeometry(0.34, 0.42, 0.06), gold, 0, CH - 0.28, CD / 2 + 0.03));
    var lid = new THREE.Group(); lid.position.set(0, CH, -CD / 2); chest.add(lid);
    var lidArc = new THREE.CylinderGeometry(CD / 2, CD / 2, CW, 28, 1, false, 0, Math.PI); lidArc.rotateZ(Math.PI / 2); lidArc.rotateX(-Math.PI / 2);
    var woodD = wood.clone(), goldD = gold.clone(); woodD.side = THREE.DoubleSide; goldD.side = THREE.DoubleSide;
    var lm = part(lidArc, woodD, 0, 0, CD / 2); lm.rotation.x = Math.PI / 2; lid.add(lm);
    [-0.95, 0.95].forEach(function (bx) { var bg = new THREE.CylinderGeometry(CD / 2 + 0.03, CD / 2 + 0.03, 0.14, 28, 1, false, 0, Math.PI); bg.rotateZ(Math.PI / 2); bg.rotateX(-Math.PI / 2); var b = part(bg, goldD, bx, 0, CD / 2); b.rotation.x = Math.PI / 2; lid.add(b); });
    var CN = 260, coinG = new THREE.CylinderGeometry(0.11, 0.11, 0.022, 18), coins = new THREE.InstancedMesh(coinG, gold, CN), dm = new THREE.Object3D();
    for (var ci = 0; ci < CN; ci++) {
      if (ci < 170) { var cx = (erd() - 0.5) * (CW - 0.3), cz = (erd() - 0.5) * (CD - 0.3), mound = 1 - Math.pow(Math.abs(cx) / (CW / 2), 2) * 0.6 - Math.pow(Math.abs(cz) / (CD / 2), 2) * 0.6; dm.position.set(cx, CH - 0.18 + mound * 0.32 + erd() * 0.06, cz); }
      else { var ca = erd() * 6.283, cr = 1.3 + Math.pow(erd(), 1.6) * 2.2; dm.position.set(Math.cos(ca) * cr * 1.3, 0.012 + erd() * 0.01, Math.sin(ca) * cr * 0.8 + 0.6); }
      dm.rotation.set((erd() - 0.5) * (ci < 170 ? 0.9 : 0.15), erd() * 6.28, (erd() - 0.5) * (ci < 170 ? 0.9 : 0.15)); dm.updateMatrix(); coins.setMatrixAt(ci, dm.matrix);
    }
    coins.castShadow = true; coins.receiveShadow = true; chest.add(coins);
    var fc = cnv(512, 512), fx = fc.getContext("2d"); fx.fillStyle = "#3b2c2a"; fx.fillRect(0, 0, 512, 512);
    for (var fi = 0; fi < 9000; fi++) { fx.fillStyle = "rgba(" + (erd() > 0.5 ? "90,70,62," : "18,12,12,") + (0.05 + erd() * 0.12).toFixed(2) + ")"; var fr2 = 1 + erd() * 5; fx.fillRect(erd() * 512, erd() * 512, fr2, fr2); }
    var ftex = new THREE.CanvasTexture(fc); ftex.wrapS = ftex.wrapT = THREE.RepeatWrapping; ftex.repeat.set(10, 10);
    var floor = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.MeshStandardMaterial({ map: ftex, roughness: 0.95, envMapIntensity: 0.06 }));
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; ssc.add(floor);
    var rockM = new THREE.MeshStandardMaterial({ color: 0x1a1214, roughness: 1, flatShading: true, envMapIntensity: 0.02 });
    function rock(r, x, y, z, sx, sy, sz) { var g = new THREE.IcosahedronGeometry(r, 2), pa = g.attributes.position, v = new THREE.Vector3(); for (var ri = 0; ri < pa.count; ri++) { v.fromBufferAttribute(pa, ri); var k = 1 + (Math.sin(v.x * 2.1 + v.y * 1.3) * Math.cos(v.z * 1.7 - v.y) * 0.18) + (erd() - 0.5) * 0.06; pa.setXYZ(ri, v.x * k, v.y * k, v.z * k); } g.computeVertexNormals(); var o = new THREE.Mesh(g, rockM); o.position.set(x, y, z); o.scale.set(sx, sy, sz); o.castShadow = true; o.receiveShadow = true; ssc.add(o); }
    rock(3, -9, 1, -7, 1.6, 2.2, 1); rock(3, -2, 0.5, -10, 2.4, 2.6, 1); rock(3, 6, 1, -9, 2, 2.4, 1.2); rock(3, 11, 0, -3, 1.2, 2.2, 1.6); rock(2, 4.2, 0.3, -3.2, 0.9, 0.6, 0.8); rock(2, -5.6, 0.1, -2.6, 0.8, 0.45, 0.7); rock(3, -13, 0, 1, 1.2, 2.6, 2); rock(1.6, 6.5, 0, 2.5, 1, 0.5, 1);
    var water = new THREE.Mesh(new THREE.PlaneGeometry(20, 12), new THREE.ShaderMaterial({ uniforms: { uT: { value: 0 }, uExpo: { value: 1 }, uOpen: { value: 0 }, uL: { value: new THREE.Vector3(-0.2, 0.9, -0.4).normalize() } }, vertexShader: "varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }", fragmentShader: __FS_WATER__, transparent: true, depthWrite: false }));
    water.rotation.x = -Math.PI / 2; water.position.set(-1, 0.03, 4.2); ssc.add(water);
    var hemi = new THREE.HemisphereLight(0x8a7090, 0x2a1810, 0.25); ssc.add(hemi);
    var spot = new THREE.SpotLight(0xffe2b8, 3.4, 0, 0.42, 0.65, 0); spot.position.set(1.6, 16, 1.2); spot.target.position.set(0, 0.6, 0); spot.castShadow = true; spot.shadow.mapSize.set(1024, 1024); spot.shadow.bias = -0.0005; spot.shadow.radius = 5; ssc.add(spot); ssc.add(spot.target);
    var glow = new THREE.PointLight(0xffa83c, 0, 9, 1.6); glow.position.set(0, 1.9, 0); ssc.add(glow);
    var gc = cnv(256, 256), gx = gc.getContext("2d"), gg = gx.createRadialGradient(128, 128, 0, 128, 128, 128); gg.addColorStop(0, "rgba(255,214,140,1)"); gg.addColorStop(0.3, "rgba(255,160,60,0.45)"); gg.addColorStop(1, "rgba(255,120,40,0)"); gx.fillStyle = gg; gx.fillRect(0, 0, 256, 256);
    var halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(gc), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0 })); halo.position.set(0, 1.7, 0); halo.scale.set(5, 3.4, 1); ssc.add(halo);
    var halo2 = new THREE.Sprite(halo.material.clone()); halo2.scale.set(2.6, 2.6, 1); ssc.add(halo2);
    var bm = new THREE.ShaderMaterial({ uniforms: { uI: { value: 0.5 }, uExpo: { value: 1 }, uC: { value: new THREE.Vector3(1, 0.85, 0.6) } }, vertexShader: __VS_BEAM__, fragmentShader: __FS_BEAM__, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    var beam = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 2.9, 16, 48, 1, true), bm); beam.position.set(0.8, 8, 0.6); beam.rotation.z = -0.1; beam.rotation.x = 0.07; ssc.add(beam);
    var FT = [], LC = ["#f4ed79", "#bee47a", "#0ebedf", "#e22399", "#df1604"];
    function phys(o) { var m = new THREE.MeshPhysicalMaterial(o); return m; }
    function ctex(w, h, fn) { var c = cnv(w, h), x = c.getContext("2d"), t = new THREE.CanvasTexture(c); t.anisotropy = 4; fn(x, w, h); t.needsUpdate = true; t.c = c; t.x = x; t.redraw = function () { fn(x, w, h); t.needsUpdate = true; }; return t; }
    function rrect(x, a, b, w, h, r) { x.beginPath(); x.moveTo(a + r, b); x.arcTo(a + w, b, a + w, b + h, r); x.arcTo(a + w, b + h, a, b + h, r); x.arcTo(a, b + h, a, b, r); x.arcTo(a, b, a + w, b, r); x.closePath(); }
    function logoMark(x, cx, cy, s) { var P = [[-0.5, -1, 0], [0.5, -1, 1], [-1, 0, 2], [0, 0, 3], [1, 0, 4]]; P.forEach(function (q) { x.fillStyle = LC[q[2]]; x.fillRect(cx + q[0] * s * 1.08 - s / 2, cy + q[1] * s * 1.08 - s / 2, s, s); }); }
    var imgs = SRC.filter(function (s) { return !s.v; }), avSrc = (imgs.filter(function (s) { return /avenue/i.test(s.u); })[0] || imgs[0] || {}).u, rlSrc = (imgs[1] || imgs[0] || {}).u;
    function loadInto(url, tex, draw) { if (!url) return; var im = new Image(); im.crossOrigin = "anonymous"; im.onload = function () { try { draw(tex.x, im); tex.needsUpdate = true; } catch (e) {} }; im.src = url; }
    function cover(x, im, a, b, w, h) { var sc = Math.max(w / im.naturalWidth, h / im.naturalHeight), sw = w / sc, sh = h / sc; x.drawImage(im, (im.naturalWidth - sw) / 2, (im.naturalHeight - sh) / 2, sw, sh, a, b, w, h); }
    var MK = [
      function () {
        var g = new THREE.Group(), tx = ctex(1024, 512, function (x, w, h) { var gr = x.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, "#2a0a1e"); gr.addColorStop(0.5, "#120610"); gr.addColorStop(1, "#2a0a1e"); x.fillStyle = gr; x.fillRect(0, 0, w, h); x.fillStyle = "#ff0785"; x.fillRect(0, h * 0.5 + 58, w, 6);
          [0, 512].forEach(function (ox) { logoMark(x, ox + 256, 190, 34); x.fillStyle = "#f6efe9"; x.font = "800 50px Manrope, sans-serif"; x.textAlign = "center"; x.fillText("DigiGlow Media", ox + 256, 300); x.fillStyle = "#ff2a9a"; x.font = "700 26px Manrope, sans-serif"; x.fillText("A Creative Agency", ox + 256, 340); }); }); FT.push(tx);
        g.add(new THREE.Mesh(new THREE.SphereGeometry(1, 64, 40), phys({ map: tx, roughness: 0.22, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 0.9 })));
        var ring = new THREE.Mesh(new THREE.TorusGeometry(1.45, 0.012, 8, 120), new THREE.MeshBasicMaterial({ color: 0xff2a9a })); ring.rotation.x = 1.25; g.add(ring);
        var orb = new THREE.Group(); orb.rotation.x = 1.25 - Math.PI / 2; g.add(orb);
        LC.forEach(function (c, k) { var cb = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), phys({ color: c, roughness: 0.25, clearcoat: 1, emissive: c, emissiveIntensity: 0.15 })); var a = k / 5 * 6.283; cb.position.set(Math.cos(a) * 1.45, 0, Math.sin(a) * 1.45); orb.add(cb); });
        g.userData.tick = function (t) { orb.rotation.y = t * 0.8; }; g.userData.spin = 1; return g;
      },
      function () {
        var g = new THREE.Group(), geo = new THREE.SphereGeometry(0.95, 28, 18).toNonIndexed(); geo.computeVertexNormals();
        g.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0xe8e2ea, metalness: 1, roughness: 0.12, flatShading: true, envMapIntensity: 1.4 })));
        var cap = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.16, 16), new THREE.MeshStandardMaterial({ color: 0xc9a14a, metalness: 1, roughness: 0.3 })); cap.position.y = 1.0; g.add(cap);
        var rod = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.9, 8), cap.material); rod.position.y = 1.5; g.add(rod);
        g.userData.spin = 1; return g;
      },
      function () {
        var g = new THREE.Group(), chrome = new THREE.MeshStandardMaterial({ color: 0xd8d4dc, metalness: 1, roughness: 0.22 });
        var head = new THREE.Mesh(new THREE.SphereGeometry(0.5, 40, 28), new THREE.MeshStandardMaterial({ color: 0x2a2228, metalness: 0.9, roughness: 0.45 })); head.position.y = 0.62; g.add(head);
        var grill = new THREE.Mesh(new THREE.SphereGeometry(0.515, 18, 12), new THREE.MeshStandardMaterial({ color: 0xcfc8d4, metalness: 1, roughness: 0.25, wireframe: true })); grill.position.y = 0.62; g.add(grill);
        var band = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.06, 12, 48), new THREE.MeshStandardMaterial({ color: 0xff0785, metalness: 0.5, roughness: 0.3, emissive: 0xff0785, emissiveIntensity: 0.35 })); band.rotation.x = Math.PI / 2; band.position.y = 0.3; g.add(band);
        var body = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.15, 1.25, 32), new THREE.MeshStandardMaterial({ color: 0x141015, metalness: 0.6, roughness: 0.35 })); body.position.y = -0.38; g.add(body);
        var tip = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.13, 0.12, 32), chrome); tip.position.y = -1.05; g.add(tip);
        g.rotation.z = -0.22; g.userData.k = 1.25; g.userData.spin = 1; return g;
      },
      function () {
        var g = new THREE.Group(), alu = new THREE.MeshStandardMaterial({ color: 0x9b98a2, metalness: 0.85, roughness: 0.32 });
        var base = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.07, 1.4), alu); base.position.set(0, -0.62, 0.55); g.add(base);
        var lidg = new THREE.Group(); lidg.position.set(0, -0.585, -0.15); lidg.rotation.x = -0.18; g.add(lidg);
        var back = new THREE.Mesh(new THREE.BoxGeometry(2.1, 1.38, 0.05), alu); back.position.y = 0.69; lidg.add(back);
        var st = ctex(1024, 640, function (x, w, h) { x.fillStyle = "#0d0a0c"; x.fillRect(0, 0, w, h); x.fillStyle = "#26222a"; x.fillRect(0, 0, w, 54); ["#ff5f57", "#febc2e", "#28c840"].forEach(function (c, k) { x.fillStyle = c; x.beginPath(); x.arc(30 + k * 26, 27, 8, 0, 6.3); x.fill(); }); x.fillStyle = "#3a3540"; rrect(x, 140, 13, 740, 28, 14); x.fill(); x.fillStyle = "#cfc8d4"; x.font = "500 17px Manrope, sans-serif"; x.fillText("avenue-restaurant.gr", 170, 33); var gr = x.createLinearGradient(0, 54, w, h); gr.addColorStop(0, "#3a1d12"); gr.addColorStop(1, "#140a08"); x.fillStyle = gr; x.fillRect(0, 54, w, h - 54); x.fillStyle = "#f6efe9"; x.font = "800 64px Manrope, sans-serif"; x.fillText("Avenue", 70, 360); });
        loadInto(avSrc, st, function (x, im) { cover(x, im, 0, 54, 1024, 586); x.fillStyle = "rgba(0,0,0,0.25)"; x.fillRect(0, 54, 1024, 586); x.fillStyle = "#f6efe9"; x.font = "800 64px Manrope, sans-serif"; x.fillText("Avenue", 70, 560); });
        var scr = new THREE.Mesh(new THREE.PlaneGeometry(1.96, 1.24), new THREE.MeshBasicMaterial({ map: st, toneMapped: false })); scr.position.set(0, 0.69, 0.028); lidg.add(scr);
        g.userData.face = 1; return g;
      },
      function () {
        var g = new THREE.Group(), P = [[-0.5, 1, 0], [0.5, 1, 1], [-1, 0, 2], [0, 0, 3], [1, 0, 4]], geo = new THREE.BoxGeometry(0.62, 0.62, 0.62);
        P.forEach(function (q, k) { var m = new THREE.Mesh(geo, phys({ color: LC[q[2]], roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.05, emissive: LC[q[2]], emissiveIntensity: 0.3 })); m.position.set(q[0] * 0.68, q[1] * 0.68 - 0.34, 0); m.userData.k = k; g.add(m); });
        g.userData.tick = function (t) { g.children.forEach(function (m, k) { m.rotation.y = Math.sin(t * 1.3 + k) * 0.25; m.position.z = Math.sin(t * 1.1 + k * 1.3) * 0.08; }); };
        g.userData.face = 1; return g;
      },
      function () {
        var g = new THREE.Group(), tilt = new THREE.Group(); tilt.rotation.x = 1.05; g.add(tilt);
        tilt.add(new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.18, 1.6), new THREE.MeshStandardMaterial({ color: 0x1a141a, metalness: 0.4, roughness: 0.45 })));
        var at = ctex(512, 512, function (x, w, h) { x.fillStyle = "#cfc9d2"; x.fillRect(0, 0, w, h); x.strokeStyle = "rgba(0,0,0,0.12)"; for (var k = 0; k < 512; k += 6) { x.beginPath(); x.moveTo(0, k); x.lineTo(w, k); x.stroke(); } x.fillStyle = "#ff0785"; x.font = "800 230px Manrope, sans-serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("AI", 256, 270); }); FT.push(at);
        var top = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.05, 1.05), [null, null, new THREE.MeshStandardMaterial({ map: at, metalness: 0.8, roughness: 0.3 }), null, null, null].map(function (m) { return m || new THREE.MeshStandardMaterial({ color: 0xbdb7c2, metalness: 0.9, roughness: 0.3 }); })); top.position.y = 0.115; tilt.add(top);
        var pin = new THREE.BoxGeometry(0.07, 0.04, 0.26), pm = new THREE.MeshStandardMaterial({ color: 0xe0b45a, metalness: 1, roughness: 0.25 });
        for (var k = 0; k < 9; k++) { var o = -0.64 + k * 0.16; [[o, 0.93, 0], [o, -0.93, 0], [0.93, o, 1], [-0.93, o, 1]].forEach(function (q) { var m = new THREE.Mesh(pin, pm); m.position.set(q[0], -0.02, q[1]); if (q[2]) m.rotation.y = Math.PI / 2; tilt.add(m); }); }
        var glw = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 1.9), new THREE.MeshBasicMaterial({ color: 0xff2a9a, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending, depthWrite: false })); glw.rotation.x = -Math.PI / 2; glw.position.y = -0.11; tilt.add(glw);
        g.userData.face = 1; return g;
      },
      function () {
        var g = new THREE.Group(), sh = new THREE.Shape(), w = 1.0, h = 2.0, r = 0.16; sh.moveTo(-w / 2 + r, -h / 2); sh.lineTo(w / 2 - r, -h / 2); sh.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r); sh.lineTo(w / 2, h / 2 - r); sh.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2); sh.lineTo(-w / 2 + r, h / 2); sh.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r); sh.lineTo(-w / 2, -h / 2 + r); sh.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
        var bg = new THREE.ExtrudeGeometry(sh, { depth: 0.08, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 3, curveSegments: 10 }); bg.center();
        g.add(new THREE.Mesh(bg, new THREE.MeshStandardMaterial({ color: 0x2a2430, metalness: 0.9, roughness: 0.25 })));
        function ui(x, W, H) { x.fillStyle = "#fff"; x.beginPath(); x.arc(W / 2, H / 2, 70, 0, 6.3); x.globalAlpha = 0.85; x.fill(); x.globalAlpha = 1; x.fillStyle = "#ff0785"; x.beginPath(); x.moveTo(W / 2 - 22, H / 2 - 36); x.lineTo(W / 2 + 38, H / 2); x.lineTo(W / 2 - 22, H / 2 + 36); x.closePath(); x.fill(); ["#ff2a9a", "#ffffff", "#ffffff"].forEach(function (c, k) { x.fillStyle = c; x.beginPath(); x.arc(W - 60, H - 380 + k * 90, 26, 0, 6.3); x.fill(); }); x.fillStyle = "rgba(255,255,255,0.35)"; x.fillRect(40, H - 60, W - 80, 8); x.fillStyle = "#ff0785"; x.fillRect(40, H - 60, (W - 80) * 0.62, 8); x.fillStyle = "#fff"; x.font = "800 34px Manrope, sans-serif"; x.fillText("@digiglowmedia", 40, H - 110); }
        var rt = ctex(512, 1024, function (x, W, H) { var gr = x.createLinearGradient(0, 0, W, H); gr.addColorStop(0, "#ff2a9a"); gr.addColorStop(1, "#3a0b5c"); x.fillStyle = gr; x.fillRect(0, 0, W, H); ui(x, W, H); });
        loadInto(rlSrc, rt, function (x, im) { cover(x, im, 0, 0, 512, 1024); var gr = x.createLinearGradient(0, 500, 0, 1024); gr.addColorStop(0, "rgba(0,0,0,0)"); gr.addColorStop(1, "rgba(0,0,0,0.6)"); x.fillStyle = gr; x.fillRect(0, 0, 512, 1024); ui(x, 512, 1024); });
        var scr = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.9), new THREE.MeshBasicMaterial({ map: rt, toneMapped: false })); scr.position.z = 0.072; g.add(scr);
        g.userData.face = 1; return g;
      }
    ];
    var scards = qa(".dgn-svx__card", svx), gems = [], N = scards.length, HOME = new THREE.Vector3(0, 1.0, 0), HOVER = new THREE.Vector3(0, 3.3, 0.35);
    for (var i = 0; i < N; i++) {
      var m = MK[i % MK.length](); m.traverse(function (o) { if (o.isMesh) o.castShadow = true; });
      m.position.copy(HOME); m.scale.setScalar(0.01); m.visible = false; ssc.add(m);
      gems.push({ m: m, a: 0, s: 0.01, p: HOME.clone(), tp: new THREE.Vector3(), ry: m.rotation.y });
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { FT.forEach(function (t) { t.redraw(); }); });
    var SDN = 1500, sdp = new Float32Array(SDN * 3), sds = new Float32Array(SDN), sdc = new Float32Array(SDN * 3), SDC = [[1, 0.78, 0.4], [1, 0.86, 0.55], [1, 0.7, 0.3], [1, 0.92, 0.7]];
    for (var d = 0; d < SDN; d++) { var da = erd() * 6.283, dr = 0.6 + Math.pow(erd(), 0.7) * 5.5; sdp.set([Math.cos(da) * dr, -0.5 + erd() * 7, Math.sin(da) * dr], d * 3); sds[d] = erd(); sdc.set(SDC[d % 4], d * 3); }
    var sdg = new THREE.BufferGeometry(); sdg.setAttribute("position", new THREE.BufferAttribute(sdp, 3)); sdg.setAttribute("aS", new THREE.BufferAttribute(sds, 1)); sdg.setAttribute("aC", new THREE.BufferAttribute(sdc, 3));
    var sdm = new THREE.ShaderMaterial({ uniforms: { uTime: { value: 0 }, uPR: { value: 1 }, uFocus: { value: 9.5 }, uSwirl: { value: 0 } }, vertexShader: __VS_SDUST__, fragmentShader: __FS_DUST__, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    var sdust = new THREE.Points(sdg, sdm); sdust.frustumCulled = false; ssc.add(sdust);
    var sveil = q(".dgn-svx__veil", svx), shead = q(".dgn-svx__head", svx);
    var sp = { t: 0, c: 0 }, smx = 0, smy = 0, tmx2 = 0, tmy2 = 0, sact = -2, sheadOn = null, st0 = performance.now(), blurOn = null, look = new THREE.Vector3(), lt = -1;
    function ssize() { var w = svx.clientWidth, h = svx.clientHeight; sr.setSize(w, h, false); scm.aspect = w / Math.max(1, h); scm.updateProjectionMatrix(); sdm.uniforms.uPR.value = Math.min(DPR, 1.25) * h / 900; }
    function sm(a, b, x) { x = Math.max(0, Math.min(1, (x - a) / (b - a))); return x * x * (3 - 2 * x); }
    function sframe(t, p) {
      var dt = lt < 0 ? 0.016 : Math.min(0.1, Math.max(0, t - lt)); lt = t; var k = 1 - Math.pow(0.0005, dt);
      smx += (tmx2 - smx) * 0.05; smy += (tmy2 - smy) * 0.05;
      var intro = sm(0, 0.2, p), open = sm(0.12, 0.22, p), f = Math.max(-1, Math.min(N - 1, (p - 0.24) / 0.7 * (N - 0.5)));
      var ex = 1 + 4 * Math.pow(1 - sm(0, 0.15, p), 2);
      var bl = 14 * (1 - sm(0.01, 0.13, p)), bs = bl > 0.2;
      if (bs || blurOn) { scv.style.filter = bs ? "blur(" + bl.toFixed(1) + "px)" : ""; blurOn = bs; }
      var off = 2.5 * Math.min(1.2, scm.aspect / 1.6);
      scm.position.set(-off + smx * 0.6 + Math.sin(p * 3.1) * 0.4, 3.0 + 1.5 * (1 - intro) - smy * 0.3, 7.6 + 6 * (1 - intro) - p * 0.6);
      look.set(-off + smx * 0.3, 1.7 - smy * 0.2, 0); scm.lookAt(look);
      sr.toneMappingExposure = ex;
      lid.rotation.x = -1.95 * open;
      glow.intensity = 2.6 * open * (0.85 + 0.15 * Math.sin(t * 2.3));
      halo.material.opacity = 0.75 * open; halo2.position.copy(HOVER); halo2.material.opacity = 0;
      bm.uniforms.uI.value = 0.42 + 0.2 * open; bm.uniforms.uExpo.value = ex;
      water.material.uniforms.uT.value = t; water.material.uniforms.uExpo.value = ex; water.material.uniforms.uOpen.value = open;
      sdm.uniforms.uTime.value = t; sdm.uniforms.uSwirl.value = 0.05 + 0.2 * open;
      var near = -1, hv = 0;
      gems.forEach(function (g, i) {
        var dd = f - i, a, s, tp = g.tp;
        if (f < -0.5 || dd < -0.5) { tp.copy(HOME); s = 0.01; a = 0; }
        else if (dd < 0.5) { tp.copy(HOVER); tp.y += Math.sin(t * 1.2) * 0.1; s = 0.72; a = 1; near = i; hv = 1 - Math.abs(dd) * 1.6; }
        else { var oa = i * 6.283 / N + t * 0.18; tp.set(Math.cos(oa) * 2.9, 2.3 + Math.sin(t * 0.9 + i) * 0.15, Math.sin(oa) * 1.9 - 0.2); s = 0.32; a = 0.5; }
        g.p.lerp(tp, k * 0.5); g.s += (s - g.s) * k * 0.5; g.a += (a - g.a) * k * 0.5;
        g.m.visible = g.s > 0.03 && open > 0.5; g.m.position.copy(g.p); g.m.scale.setScalar(g.s * (g.m.userData.k || 1));
        g.m.rotation.y = g.m.userData.spin ? i * 0.7 + t * (0.25 + 0.5 * g.a) : -0.35 + Math.sin(t * 0.6 + i) * (0.35 + 0.2 * (1 - g.a)) + (1 - g.a) * Math.sin(i * 2.1) * 0.8;
        if (g.m.userData.tick) g.m.userData.tick(t);
      });
      halo2.material.opacity = 0.35 * Math.max(0, hv);
      if (p < 0.2) near = -1;
      if (near !== sact) { sact = near; scards.forEach(function (cd, i) { cd.classList.toggle("on", i === near); }); }
      sveil.style.opacity = Math.max(0, 1 - p / 0.06).toFixed(3);
      var ho = p > 0.05 && p < 0.2; if (ho !== sheadOn) { sheadOn = ho; shead.classList.toggle("on", ho); }
      sr.render(ssc, scm);
    }
    svx.classList.add("dgn-sgl");
    ssize();
    window.addEventListener("resize", ssize);
    svx.addEventListener("pointermove", function (e) { var r = svx.getBoundingClientRect(); tmx2 = (e.clientX - r.left) / r.width * 2 - 1; tmy2 = (e.clientY - r.top) / r.height * 2 - 1; });
    svx.addEventListener("pointerleave", function () { tmx2 = 0; tmy2 = 0; });
    ScrollTrigger.create({ trigger: svx, start: "top top", end: function () { return "+=" + Math.round(window.innerHeight * 7); }, pin: true, onUpdate: function (s) { sp.t = s.progress; } });
    var son = false, sbad = false;
    function sloop(now) { if (!son) return; sp.c += (sp.t - sp.c) * 0.08; if (!sbad) { try { sframe((now - st0) / 1000, sp.c); } catch (er) { sbad = true; dbg(er); } } requestAnimationFrame(sloop); }
    seen(svx, function (v) { son = v; if (v) requestAnimationFrame(sloop); });
  })(); } catch (e) { dbg(e); }
"""


def js():
    s = JS
    for k, v in {'__FS_WATER__': FS_WATER, '__VS_BEAM__': VS_BEAM, '__FS_BEAM__': FS_BEAM, '__VS_SDUST__': VS_SDUST, '__FS_DUST__': SP.FS_DUST}.items():
        s = s.replace(k, json.dumps(v))
    return s
