/* ===== Tunnel: services tube scene ===== */
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
    for (var c = 0; c < 16; c++) { var tg2 = tctx.createLinearGradient(0, 0, 480, 320); tg2.addColorStop(0, TPAL[c % 6]); tg2.addColorStop(1, ["#ff0785", "#9e36ff", "#8fa2ff", "#f01eae", "#ce0080", "#c9a36a"][c % 6]); tctx.save(); tctx.translate((c % 4) * 480, Math.floor(c / 4) * 320); tctx.fillStyle = tg2; tctx.fillRect(0, 0, 480, 320); tctx.restore(); }
    ttex.needsUpdate = true;
    var TU = { uAtlas: { value: ttex }, uFog: { value: TFOG }, uStops: { value: STOPS }, uPhase: { value: 0 }, uT: { value: 0 } };
    var tgeo = new THREE.CylinderGeometry(1, 1, 74, lite ? 48 : 72, lite ? 260 : 420, true); tgeo.translate(0, -33, 0);
    var tube = new THREE.Mesh(tgeo, new THREE.ShaderMaterial({ uniforms: TU, vertexShader: "uniform float uPhase; uniform float uStops[5];\nvarying vec2 vC; varying float vD; varying float vY; varying float vFl; varying float vFace;\nvoid main(){ float th = uv.x * 6.2831853; float y = position.y; float w = 0.0;\n  for (int i = 0; i < 5; i++) { float dy = y - uStops[i]; w += exp(-dy * dy * 0.08); }\n  float F = 4.0, K = 0.55; float a = F * th + y * K + uPhase; float fl = 0.5 + 0.5 * cos(a);\n  float r = 3.0 * (1.0 + 0.35 * w) + 0.22 * (fl - 0.5);\n  vec4 mv = modelViewMatrix * vec4(sin(th) * r, y, cos(th) * r, 1.0);\n  vec3 n = normalize(normalMatrix * vec3(-sin(th), 0.0, -cos(th)));\n  vD = -mv.z; vY = y; vFl = fl; vFace = abs(dot(n, normalize(-mv.xyz)));\n  vC = vec2((a / F) / 6.2831853 * 18.0, y * 1.35);\n  gl_Position = projectionMatrix * mv; }", fragmentShader: "uniform vec3 uFog; uniform float uStops[5]; uniform float uT;\nvarying vec2 vC; varying float vD; varying float vY; varying float vFl; varying float vFace;\nfloat h21(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }\n" + CIRC + "void main(){ vec3 cc = circ(vec2(vC.x * 1.3333333, vC.y), uT);\n  float glow = 0.0; for (int i = 0; i < 5; i++) { float dy = vY - uStops[i]; glow += exp(-dy * dy * 0.22); }\n  vec3 col = vec3(0.016, 0.01, 0.016) * (0.6 + 0.4 * vFl) + vec3(0.3, 0.06, 0.2) * pow(1.0 - vFace, 2.5) * 0.25;\n  col += (vec3(0.561, 0.004, 0.365) * 1.8 * (cc.x + cc.y * 0.35) + vec3(1.0, 0.6, 0.85) * cc.z * 1.2) * (0.75 + 0.25 * vFace) * (1.0 + glow * 0.6) + vec3(1.0, 0.72, 0.45) * glow * 0.04;\n  float fg = 1.0 - exp(-vD * vD * 0.0024);\n  gl_FragColor = vec4(mix(col, uFog, clamp(fg, 0.0, 1.0)), 1.0); }", side: THREE.DoubleSide, extensions: { derivatives: true } }));
    tube.frustumCulled = false;
    var tw = new THREE.Group(); tw.add(tube); ts.add(tw);
    var VSU = "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }", rings = [];
    STOPS.forEach(function (y) {
      var rm = new THREE.ShaderMaterial({ uniforms: { uI: { value: 1 }, uCol: { value: new THREE.Color(1.0, 0.62, 0.5) } }, vertexShader: VSU, fragmentShader: "uniform float uI; uniform vec3 uCol; varying vec2 vUv;\nvoid main(){ float r = length(vUv - 0.5) * 2.0; float a = exp(-pow((r - 0.66) * 9.0, 2.0)) * 0.9 + exp(-r * 3.2) * 0.06;\n  gl_FragColor = vec4(uCol * a * uI, 1.0); }", transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
      var rp = new THREE.Mesh(new THREE.PlaneGeometry(8.6, 8.6), rm); rp.rotation.x = -Math.PI / 2; rp.position.y = y; ts.add(rp); rings.push(rm);
    });
    var xm = new THREE.ShaderMaterial({ uniforms: { uI: { value: 0 } }, vertexShader: VSU, fragmentShader: "uniform float uI; varying vec2 vUv;\nvoid main(){ float r = length(vUv - 0.5) * 2.0; float a = pow(max(0.0, 1.0 - r), 1.6);\n  gl_FragColor = vec4(vec3(1.0, 0.86, 0.72) * a * uI, 1.0); }", transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    var xp = new THREE.Mesh(new THREE.PlaneGeometry(9, 9), xm); xp.rotation.x = -Math.PI / 2; xp.position.y = -61; ts.add(xp);
    var TDN = lite ? 400 : 180, tdp = new Float32Array(TDN * 3), tds = new Float32Array(TDN), tdc = new Float32Array(TDN * 3), TDC = [[1, 0.78, 0.42], [1, 0.88, 0.62], [1, 0.7, 0.36], [0.74, 0.9, 0.5], [1, 0.5, 0.72]];
    for (var d = 0; d < TDN; d++) { var rr = Math.pow(Math.random(), 0.6) * 2.6, an = Math.random() * Math.PI * 2; tdp.set([Math.sin(an) * rr, 8 - Math.random() * 72, Math.cos(an) * rr], d * 3); tds[d] = Math.random(); tdc.set(TDC[d % 5], d * 3); }
    var tdg = new THREE.BufferGeometry(); tdg.setAttribute("position", new THREE.BufferAttribute(tdp, 3)); tdg.setAttribute("aS", new THREE.BufferAttribute(tds, 1)); tdg.setAttribute("aC", new THREE.BufferAttribute(tdc, 3));
    var tdm = new THREE.ShaderMaterial({ uniforms: { uTime: { value: 0 }, uPR: { value: 1 }, uFocus: { value: 4 } }, vertexShader: "attribute float aS; attribute vec3 aC; uniform float uTime; uniform float uPR; uniform float uFocus; uniform float uSwirl; varying vec3 vC; varying float vA; varying float vB;\nvoid main(){ vec3 p = position; float t = uTime;\n  p.y = mod(p.y + 64.0 + t * (0.05 + aS * 0.12), 72.0) - 64.0;\n  p.x += sin(t * 0.21 + aS * 31.0 + p.y * 0.35) * 0.45; p.z += cos(t * 0.17 + aS * 17.0 + p.y * 0.3) * 0.45;\n  float sr = length(p.xz), sa = uSwirl * (t * 1.6 + 3.0 / (sr + 0.4)), cs = cos(sa), sn = sin(sa);\n  p.xz = mat2(cs, -sn, sn, cs) * p.xz * mix(1.0, 0.42, uSwirl);\n  vec4 mv = modelViewMatrix * vec4(p, 1.0); float d = max(0.3, -mv.z);\n  float coc = clamp(abs(d - uFocus) / d * 2.2, 0.0, 1.0);\n  float core = (2.0 + aS * aS * 4.5) * (14.0 / d);\n  float sz = core + coc * (8.0 + aS * 30.0) * (9.0 / d + 0.3);\n  gl_PointSize = clamp(uPR * sz, 1.0, 96.0);\n  float tw = 0.55 + 0.45 * sin(t * (0.6 + aS * 1.6) + aS * 40.0);\n  vA = tw * mix(1.0, 0.12 + 0.18 * aS, smoothstep(0.0, 0.7, coc)) * smoothstep(48.0, 14.0, d) * smoothstep(0.4, 2.2, d);\n  vA = clamp(vA, 0.0, 1.0); vB = coc; vC = aC;\n  gl_Position = projectionMatrix * mv; }", fragmentShader: "varying vec3 vC; varying float vA; varying float vB;\nvoid main(){ float r = length(gl_PointCoord - 0.5) * 2.0; if (r > 1.0) discard;\n  float sharp = exp(-r * r * 9.0) + exp(-r * r * 60.0) * 0.8;\n  float disc = smoothstep(1.0, 0.8, r) * (0.72 + 0.28 * smoothstep(0.5, 0.92, r));\n  float a = mix(sharp, disc, smoothstep(0.15, 0.6, vB));\n  gl_FragColor = vec4(vC * a * vA * 1.4, 1.0); }", transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    var tdust = new THREE.Points(tdg, tdm); tdust.frustumCulled = false;
    var tOrb = lite ? null : orbs(ts, 40, function () { var a = Math.random() * 6.283, r = Math.pow(Math.random(), 0.6) * 2.4; return [Math.sin(a) * r, 8 - Math.random() * 72, Math.cos(a) * r]; }, 0.06, 0.12);
    var CY = [[0, 9], [0.1, 1.5]];
    STOPS.forEach(function (y, i) { CY.push([PS[i] - 0.045, y + 5.2]); CY.push([PS[i] + 0.045, y + 3.4]); });
    CY.push([0.88, -48.5]); CY.push([0.97, -58.6]); CY.push([1, -59]);
    var tp = { t: 0, c: 0 }, tmx = 0, tmy = 0, tsx = 0, tsy = 0, act = -2, introOff = null, tt0 = performance.now();
    function tframe(t, p) {
      if (DJ.ptClear && DJ.tunST && window.scrollY >= DJ.tunST.start - 1) DJ.ptClear();
      tsx += (tmx - tsx) * 0.05; tsy += (tmy - tsy) * 0.05;
      var y = kv(CY, p), inside = Math.max(0, Math.min(1, (6 - y) / 4));
      tc.position.set(tsx * 0.5 * inside, y, tsy * 0.5 * inside);
      tc.lookAt(-tsx * 1.6 * inside, y - 10, -tsy * 1.6 * inside);
      tw.rotation.y = t * 0.12 + p * 5; TU.uPhase.value = t * 0.4; TU.uT.value = t;
      var near = -1;
      rings.forEach(function (rm, i) { var dd = Math.abs(p - PS[i]); rm.uniforms.uI.value = 0.3 + 1.1 * Math.max(0, 1 - dd / 0.08); if (dd < 0.065) near = i; });
      xm.uniforms.uI.value = Math.max(0, Math.min(1, (p - 0.84) / 0.13)) * 2.4;
      tdm.uniforms.uTime.value = t; orbTick(tOrb, t, -64, 72, 0, tc);
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
    DJ.tunST = ScrollTrigger.create({ trigger: tun, start: "top top", end: function () { return "+=" + Math.round(window.innerHeight * 5); }, pin: true, onUpdate: function (s) { tp.t = s.progress; } });
    var ton = false, tbad = false;
    function tloop(now) { if (!ton) return; tp.c += (tp.t - tp.c) * 0.08; if (!tbad) { try { tframe((now - tt0) / 1000, tp.c); } catch (e) { tbad = true; dbg(e); } } requestAnimationFrame(tloop); }
    seen(tun, function (v) { ton = v; if (v) requestAnimationFrame(tloop); });
  })(); } catch (e) { dbg(e); }

