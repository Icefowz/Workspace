/* ===== D journey: the 3D ornate D (hero > drill > tunnel > landing), overlay canvas, poses, landing hit, sleep when off screen ===== */
  if (GL && heavy) try { (function () {
    var dcv = document.createElement("canvas"); dcv.className = "dgn-dcv"; dcv.setAttribute("aria-hidden", "true"); root.appendChild(dcv);
    var dr = new THREE.WebGLRenderer({ canvas: dcv, antialias: true, alpha: true }); dr.setPixelRatio(Math.min(DPR, 1.5)); dr.setClearColor(0x000000, 0);
    var dsc = new THREE.Scene(), dcam = new THREE.PerspectiveCamera(30, 1, 0.1, 100); dcam.position.set(0, 0, 10);
    if (THREE.RoomEnvironment) { try { dsc.environment = new THREE.PMREMGenerator(dr).fromScene(new THREE.RoomEnvironment(), 0.04).texture; } catch (e) {} }
    dsc.add(new THREE.AmbientLight(0xffffff, 0.12)); var dl = new THREE.DirectionalLight(0xffffff, 1.1); dl.position.set(3, 4, 6); dsc.add(dl); var dl2 = new THREE.PointLight(0xff4fb0, 1.2, 30); dl2.position.set(-4, -2, 4); dsc.add(dl2);
    var OD = (function () {
      /* Ornate D (from the user's gold reference): serif body + raised rims + scroll curls + studs. Units: height ~1, x 0..~0.95 */
      function body() { var s = new THREE.Shape(); s.moveTo(0.25, 0.0); s.lineTo(0.56, 0.0); s.bezierCurveTo(0.76, 0.0, 0.89, 0.19, 0.89, 0.47); s.bezierCurveTo(0.89, 0.77, 0.75, 0.965, 0.55, 0.965); s.lineTo(0.25, 0.985); s.lineTo(0.25, 0.0); return s; }
      function hole() { var h = new THREE.Path(); h.moveTo(0.385, 0.105); h.lineTo(0.385, 0.85); h.lineTo(0.5, 0.85); h.bezierCurveTo(0.66, 0.85, 0.76, 0.7, 0.76, 0.47); h.bezierCurveTo(0.76, 0.25, 0.67, 0.105, 0.52, 0.105); h.lineTo(0.385, 0.105); return h; }
      function pts(p, n) { var a = p.getSpacedPoints(n); a.pop(); return a; }
      function offs(a, d) { var n = a.length, o = []; for (var i = 0; i < n; i++) { var p = a[(i - 1 + n) % n], c = a[i], q = a[(i + 1) % n], tx = q.x - p.x, ty = q.y - p.y, l = Math.hypot(tx, ty) || 1; o.push(new THREE.Vector2(c.x + ty / l * d, c.y - tx / l * d)); } return o; }
      function area(a) { var s = 0; for (var i = 0, j = a.length - 1; i < a.length; j = i++) s += (a[j].x - a[i].x) * (a[j].y + a[i].y); return s; }
      function ring(outer, inner) { if (area(outer) < 0) outer = outer.slice().reverse(); if (area(inner) > 0) inner = inner.slice().reverse(); var s = new THREE.Shape(outer); s.holes.push(new THREE.Path(inner)); return s; }
      var OUTP = pts(body(), 260), HOLP = pts(hole(), 200), parts = [];
      var bs = body(); bs.holes.push(hole());
      parts.push(new THREE.ExtrudeGeometry(bs, { depth: 0.3, bevelEnabled: true, bevelThickness: 0.035, bevelSize: 0.009, bevelSegments: 4, curveSegments: 48 }));
      function rim(sh, z) { var g = new THREE.ExtrudeGeometry(sh, { depth: 0.026, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.006, bevelSegments: 3, curveSegments: 24 }); g.translate(0, 0, z); parts.push(g); }
      var sgn = area(OUTP) > 0 ? 1 : -1;
      rim(ring(OUTP, offs(OUTP, -0.032 * sgn)), 0.318);
      rim(ring(offs(HOLP, 0.034 * (area(HOLP) > 0 ? 1 : -1)), HOLP), 0.318);
      function curl(cx, cy, R, turns, w, a0, dir, dep, z0) {
        var N = Math.round(70 * turns), o = [], inn = [];
        for (var i = 0; i <= N; i++) { var t = i / N, a = a0 + dir * turns * 6.2832 * t, r = R * (1 - 0.8 * t), ww = w * (1 - 0.45 * t); o.push(new THREE.Vector2(cx + Math.cos(a) * r, cy + Math.sin(a) * r)); inn.push(new THREE.Vector2(cx + Math.cos(a) * (r - ww), cy + Math.sin(a) * (r - ww))); }
        var poly = o.concat(inn.reverse()); if (area(poly) < 0) poly.reverse();
        var g = new THREE.ExtrudeGeometry(new THREE.Shape(poly), { depth: dep, bevelEnabled: true, bevelThickness: 0.018, bevelSize: 0.008, bevelSegments: 3, curveSegments: 12 }); g.translate(0, 0, z0); parts.push(g);
        var core = new THREE.CylinderGeometry(R * 0.2, R * 0.2, dep, 18); core.rotateX(Math.PI / 2); core.translate(cx, cy, z0 + dep / 2); parts.push(core);
        return new THREE.Vector2(cx + Math.cos(a0) * R, cy + Math.sin(a0) * R);
      }
      function stem(a, b, bend, rad, z) { var c = new THREE.QuadraticBezierCurve3(new THREE.Vector3(a.x, a.y, z), new THREE.Vector3((a.x + b.x) / 2 + bend.x, (a.y + b.y) / 2 + bend.y, z), new THREE.Vector3(b.x, b.y, z)); parts.push(new THREE.TubeGeometry(c, 24, rad, 10, false)); }
      var C = [
        [0.19, 0.89, 0.1, 1.8, 0.036, 0.2, 1, [0.27, 0.93], [0.0, 0.03]],
        [0.145, 0.66, 0.095, 1.7, 0.034, -0.3, 1, [0.25, 0.7], [0.0, 0.03]],
        [0.13, 0.4, 0.125, 2.4, 0.036, 0.0, 1, [0.25, 0.42], [0.0, 0.0]],
        [0.18, 0.19, 0.072, 1.5, 0.028, 0.4, -1, [0.25, 0.24], [0.0, -0.02]],
        [0.15, 0.045, 0.095, 1.7, 0.034, 0.6, -1, [0.25, 0.04], [0.0, -0.02]],
        [0.81, 0.915, 0.095, 1.7, 0.034, 3.4, -1, [0.68, 0.96], [0.0, 0.03]],
        [0.95, 0.215, 0.072, 1.6, 0.028, 2.6, 1, [0.84, 0.17], [0.0, -0.02]],
        [0.69, 0.38, 0.05, 1.4, 0.022, 2.2, -1, [0.755, 0.42], [0.0, 0.0]]
      ];
      C.forEach(function (c) { var st = curl(c[0], c[1], c[2], c[3], c[4], c[5], c[6], 0.24, 0.03); stem(st, new THREE.Vector2(c[7][0], c[7][1]), new THREE.Vector2(c[8][0], c[8][1]), c[4] * 0.42, 0.16); });
      var SP = [[0.318, 0.08], [0.318, 0.17], [0.3, 0.26], [0.332, 0.33], [0.318, 0.42], [0.318, 0.52], [0.3, 0.6], [0.334, 0.66], [0.318, 0.75], [0.318, 0.86], [0.318, 0.93]];
      for (var k = 0; k < 15; k++) { var an = -1.45 + 2.9 * k / 14; SP.push([0.5 + Math.cos(an) * 0.325 + (k % 3 === 1 ? 0.012 : 0), 0.475 + Math.sin(an) * 0.432]); }
      SP.forEach(function (p, i) { var r = i % 4 === 0 ? 0.019 : i % 4 === 2 ? 0.012 : 0.015, g = new THREE.SphereGeometry(r, 14, 10); g.scale(1, 1, 0.7); g.translate(p[0], p[1], 0.338); parts.push(g); });
      var tot = 0, L = parts.map(function (g) { g = g.index ? g.toNonIndexed() : g; if (!g.attributes.normal) g.computeVertexNormals(); tot += g.attributes.position.count; return g; });
      var P = new Float32Array(tot * 3), Nn = new Float32Array(tot * 3), U = new Float32Array(tot * 2), o3 = 0;
      L.forEach(function (g) { var n = g.attributes.position.count; P.set(g.attributes.position.array, o3 * 3); Nn.set(g.attributes.normal.array, o3 * 3); if (g.attributes.uv) U.set(g.attributes.uv.array, o3 * 2); o3 += n; g.dispose(); });
      var geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.BufferAttribute(P, 3)); geo.setAttribute("normal", new THREE.BufferAttribute(Nn, 3)); geo.setAttribute("uv", new THREE.BufferAttribute(U, 2));
      function arr(a) { return a.map(function (v) { return [+v.x.toFixed(4), +v.y.toFixed(4)]; }); }
      return { geo: geo, out: arr(OUTP), hole: arr(HOLP) };
    })();
    var DOUT = OD.out, DHOLE = OD.hole, DOO = OD.out, DHH = OD.hole;
    function dInside(px, py, pl) { var c = false; for (var a = 0, b = pl.length - 1; a < pl.length; b = a++) { var xa = pl[a][0], ya = pl[a][1], xb = pl[b][0], yb = pl[b][1]; if ((ya > py) !== (yb > py) && px < (xb - xa) * (py - ya) / (yb - ya) + xa) c = !c; } return c; }
    function dEdge(px, py) { var m = 9; for (var a = 0, b = DOUT.length - 1; a < DOUT.length; b = a++) { var ax = DOUT[b][0], ay = DOUT[b][1], bx = DOUT[a][0], by = DOUT[a][1], vx = bx - ax, vy = by - ay, l2 = vx * vx + vy * vy || 1e-9, k = Math.max(0, Math.min(1, ((px - ax) * vx + (py - ay) * vy) / l2)), dx = px - ax - vx * k, dy = py - ay - vy * k; m = Math.min(m, Math.sqrt(dx * dx + dy * dy)); } return m; }
        var dgeo = OD.geo, dof = new THREE.Vector3(); dgeo.computeBoundingBox(); dgeo.boundingBox.getCenter(dof); dgeo.translate(-dof.x, -dof.y, -dof.z); var dzf = dgeo.boundingBox.max.z - dof.z, dpv = new THREE.Vector3(), HOLE = DHOLE.map(function (p) { return [0.57 + (p[0] - 0.57) * 0.95, 0.477 + (p[1] - 0.477) * 0.95]; });
    var dmat = new THREE.MeshPhysicalMaterial({ color: 0xb00c66, roughness: 0.28, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.06, sheen: 0.3, sheenColor: new THREE.Color(0xff6fb8), envMapIntensity: 0.75 });
    var DUf = { uCry: { value: 0 }, uHolo: { value: 0 }, uHs: { value: 0 }, uHb: { value: 0 }, uT: { value: 0 }, uInk: { value: 1 }, uWob: { value: 1 }, uFill: { value: 1 }, uSweep: { value: -9 }, uMd: { value: new THREE.Vector3() }, uCirc: { value: 0 }, uChr: { value: 0 }, uBtn: { value: 0 } }, DCIRC = typeof CIRC === "string" ? CIRC : "vec3 circ(vec2 p, float t){ return vec3(0.0); }\n";
    dmat.transparent = true;
    dmat.onBeforeCompile = function (sh) {
      Object.keys(DUf).forEach(function (k) { sh.uniforms[k] = DUf[k]; });
      sh.vertexShader = sh.vertexShader.replace("#include <common>", "#include <common>\nuniform float uT; uniform float uWob; uniform vec3 uMd; varying vec3 vLp;").replace("#include <begin_vertex>", "#include <begin_vertex>\n  vLp = position; transformed.x += sin(position.y * 3.0 + uT * 2.2) * 0.04 * uWob; transformed.y += sin(position.x * 3.5 + uT * 1.7) * 0.03 * uWob; transformed += uMd * max(0.0, dot(normalize(position + vec3(0.0001)), normalize(uMd + vec3(0.0001)))) * length(uMd) * 0.12 * uWob;");
      sh.fragmentShader = sh.fragmentShader.replace("#include <common>", "#include <common>\nuniform float uCry; uniform float uCirc; uniform float uChr; uniform float uBtn;\n" + DCIRC + (typeof ENVC === "string" ? ENVC : "vec3 envC(vec3 r){ return vec3(0.8); }\n") + "float dScr(vec2 p, float ang, float dens){ float c = cos(ang), s = sin(ang); p = mat2(c, -s, s, c) * p; vec2 id = floor(p); vec2 f = fract(p); float h = fract(sin(dot(id, vec2(12.9898, 78.233))) * 43758.5453); float on = step(1.0 - dens, h); float l = abs(f.y - 0.5 + (f.x - 0.5) * (h - 0.5) * 0.4); return on * smoothstep(0.0, 0.2, f.x) * (1.0 - smoothstep(0.6, 1.0, f.x)) * (1.0 - smoothstep(0.0, 0.035, l)); }\nuniform float uT; uniform float uInk; uniform float uFill; uniform float uSweep; uniform float uHolo; uniform float uHs; uniform float uHb; varying vec3 vLp;\nvec3 holoP(float h){ h = fract(h) * 3.0; vec3 a = vec3(1.0, 0.03, 0.52); vec3 b = vec3(0.55, 0.15, 1.0); vec3 c = vec3(1.0, 0.72, 0.3); return h < 1.0 ? mix(a, b, h) : (h < 2.0 ? mix(b, c, h - 1.0) : mix(c, a, h - 2.0)); }\nfloat dRip(vec2 q){ return sin(q.x * 9.0 + uT * 1.6 + sin(q.y * 7.0 - uT * 1.3) * 1.5) * sin(q.y * 8.0 - uT * 1.1 + sin(q.x * 6.0 + uT) * 1.2); }").replace("#include <clipping_planes_fragment>", "#include <clipping_planes_fragment>\n  if (vLp.y > mix(-0.62, 0.62, uFill) + 0.035 * sin(vLp.x * 14.0 + uT * 4.0) * (1.0 - step(0.999, uFill))) discard;").replace("#include <color_fragment>", "#include <color_fragment>\n  float sw = dRip(vLp.xy * 0.8 + vec2(0.0, uT * 0.05)); vec3 inkC = mix(vec3(0.32, 0.0, 0.2), vec3(0.95, 0.06, 0.58), 0.5 + 0.5 * sw); inkC = mix(inkC, vec3(0.55, 0.15, 0.85), smoothstep(0.6, 1.0, dRip(vLp.yx * 1.3 - uT * 0.1)) * 0.5); diffuseColor.rgb = mix(diffuseColor.rgb, inkC, uInk); diffuseColor.rgb *= 1.0 - 0.8 * uCirc;").replace("#include <normal_fragment_maps>", "#include <normal_fragment_maps>\n  float re = 0.02; float r0 = dRip(vLp.xy * 3.0); vec2 rg = vec2(dRip(vLp.xy * 3.0 + vec2(re, 0.0)) - r0, dRip(vLp.xy * 3.0 + vec2(0.0, re)) - r0) / re; normal = normalize(normal + vec3(rg * (0.035 * uInk + 0.012 * uHolo), 0.0));\n  float hfv = abs(dot(normal, normalize(vViewPosition))); vec3 hcol = holoP(hfv * 1.6 + vLp.x * 0.8 + vLp.y * 0.6 + uHs + uHb + r0 * 0.08); float hbd = fract(vLp.x * 0.7 + vLp.y * 0.5 - uHs * 0.5) - 0.5; float hsh = exp(-hbd * hbd * 90.0);\n  diffuseColor.rgb = mix(diffuseColor.rgb, hcol * 0.75, uHolo);").replace("#include <emissivemap_fragment>", "#include <emissivemap_fragment>\n  float swb = vLp.x + vLp.y * 0.35 - uSweep; if (uCirc > 0.001) { vec3 dnq = abs(normalize(cross(dFdx(vLp), dFdy(vLp)))); vec2 cpq = dnq.z >= max(dnq.x, dnq.y) ? vLp.xy : (dnq.x >= dnq.y ? vec2(vLp.z * 1.6 + 0.37, vLp.y) : vec2(vLp.x, vLp.z * 1.6 + 0.29)); vec3 cq = circ(cpq * 7.0 + 3.0, uT); totalEmissiveRadiance += (btnCol(0.3 + 0.7 * (0.5 + 0.5 * sin(vLp.x * 5.0 + vLp.y * 2.0))) * 1.45 * (cq.x + cq.y * 0.35) + vec3(1.0, 0.03, 0.52) * cq.z * 1.2) * uCirc; }\n  totalEmissiveRadiance += vec3(1.0, 0.78, 0.92) * exp(-swb * swb * 30.0) * 1.3 +(hcol * (0.32 + 0.4 * (1.0 - hfv)) + vec3(1.0, 0.92, 0.97) * hsh * 0.55) * uHolo;").replace("#include <output_fragment>", "outgoingLight = mix(outgoingLight, outgoingLight * 0.26 + totalEmissiveRadiance * 0.75, uCirc);\n  if (uChr > 0.001) { vec3 Vv = normalize(vViewPosition); vec3 rr = reflect(-Vv, normal); rr.y += vLp.y * 1.3; rr = normalize(rr); outgoingLight = mix(outgoingLight, envC(rr) + totalEmissiveRadiance * 0.3, uChr); }\n  if (uCry > 0.001) { vec3 Vc = normalize(vViewPosition); float fdc = abs(dot(normal, Vc)); float frc = pow(1.0 - fdc, 2.0); vec3 rc = reflect(-Vc, normal);\n  float hlc = exp(-pow((rc.x - 0.45) * 6.0, 2.0)) * (0.6 + 0.4 * rc.y) + exp(-pow((rc.y - 0.6) * 5.0, 2.0)) * 0.5 + exp(-pow((rc.x + 0.6) * 9.0, 2.0)) * 0.35;\n  float scc = dScr(vLp.xy * 9.0, 0.5, 0.3) + dScr(vLp.xy * 15.0 + 3.0, -0.9, 0.25);\n  float inr = 0.5 + 0.5 * sin(vLp.x * 7.0 + vLp.y * 5.0 + rc.x * 3.0 + uT * 0.7);\n  vec3 cry = vec3(1.0, 0.55, 0.78) * (0.2 + 0.55 * frc) + vec3(0.95, 0.28, 0.6) * (0.22 + 0.25 * inr) * fdc + vec3(1.0, 0.93, 0.97) * (hlc * 0.6 + scc * 0.45);\n  outgoingLight = mix(outgoingLight, cry, uCry); diffuseColor.a = mix(diffuseColor.a, diffuseColor.a * clamp(0.6 + 0.45 * frc + hlc * 0.3 + scc * 0.2, 0.0, 1.0), uCry); }\n  if (uBtn > 0.001) { vec3 Vb = normalize(vViewPosition); float fdb = abs(dot(normal, Vb)); vec3 bc = btnCol(clamp(vLp.x * 0.85 + 0.5, 0.0, 1.0)); outgoingLight = mix(outgoingLight, bc * (0.82 + 0.3 * fdb) + vec3(1.0, 0.03, 0.52) * pow(1.0 - fdb, 3.0) * 0.55 + totalEmissiveRadiance * 0.6 * uCirc, uBtn); diffuseColor.a = mix(diffuseColor.a, 1.0, uBtn); }\n#include <output_fragment>");
    };
    var ptc = document.createElement("canvas"); ptc.width = 512; ptc.height = 512; var ptx = ptc.getContext("2d"), ptex = new THREE.CanvasTexture(ptc), photoOn = false, flipK = 0, sweepT = -1, sweepF = 0;
    ptx.fillStyle = "#2a1020"; ptx.fillRect(0, 0, 512, 512);
    (function () { var im = new Image(); im.crossOrigin = "anonymous"; im.onload = function () { var sc = Math.max(512 / im.naturalWidth, 512 / im.naturalHeight), sw2 = 512 / sc, sh2 = 512 / sc; ptx.drawImage(im, (im.naturalWidth - sw2) / 2, (im.naturalHeight - sh2) * 0.3, sw2, sh2, 0, 0, 512, 512); ptex.needsUpdate = true; }; im.src = DGN_M + "team/photo-1.webp"; })();
    DJ.crewD = function (cc) { ptx.drawImage(cc, 0, (cc.height - cc.width) * 0.3, cc.width, cc.width, 0, 0, 512, 512); ptex.needsUpdate = true; };
    function setPhoto(on2) { if (on2 === photoOn) return; photoOn = on2; dmat.map = on2 ? ptex : null; dmat.color.set(on2 ? 0xffe2f0 : 0xb00c66); dmat.needsUpdate = true; }
    var dgrp = new THREE.Group(), dmesh = new THREE.Mesh(dgeo, dmat); dgrp.add(dmesh); dsc.add(dgrp);
    var dBalls = new THREE.Group(); dBalls.visible = false; dgrp.add(dBalls);
    (function () {
      var bp = [], tries = 0;
      while (bp.length < 46 && tries++ < 4000) { var qx = Math.random() * 0.93, qy = Math.random(), qin = dInside(qx, qy, DOUT) && dEdge(qx, qy) > 0.03, qho = false; if (!qin || qho) continue;
        var p = new THREE.Vector3(qx - dof.x, qy - dof.y, (Math.random() - 0.5) * 0.12); if (bp.some(function (o) { return o.p.distanceTo(p) < 0.07; })) continue; bp.push({ p: p, s: 0.026 + Math.random() * 0.03 }); }
      var o3d = new THREE.Object3D(), up = new THREE.Vector3(0, 1, 0), dv2 = new THREE.Vector3(), lk = [];
      bp.forEach(function (a, i) { var ds = []; bp.forEach(function (b, j) { if (j !== i) ds.push([a.p.distanceTo(b.p), j]); }); ds.sort(function (x, y) { return x[0] - y[0]; }); ds.slice(0, 2).forEach(function (dj) { var bj = dj[1]; if (dj[0] < 0.22 && !lk.some(function (l) { return (l[0] === bj && l[1] === i) || (l[0] === i && l[1] === bj); })) lk.push([i, bj]); }); });
      var rm2 = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.0035, 0.0035, 1, 6, 1), new THREE.MeshStandardMaterial({ color: 0xd8957a, metalness: 1, roughness: 0.25, emissive: 0x3a1408, emissiveIntensity: 0.6 }), Math.max(1, lk.length));
      lk.forEach(function (l, i) { var a = bp[l[0]].p, b = bp[l[1]].p; dv2.subVectors(b, a); var L = dv2.length(); o3d.position.addVectors(a, b).multiplyScalar(0.5); o3d.quaternion.setFromUnitVectors(up, dv2.normalize()); o3d.scale.set(1, L, 1); o3d.updateMatrix(); rm2.setMatrixAt(i, o3d.matrix); });
      rm2.count = lk.length; dBalls.add(rm2);
      var PN3 = lk.length * 2, pa3 = new Float32Array(PN3 * 3), pb3 = new Float32Array(PN3 * 3), ps3 = new Float32Array(PN3);
      lk.forEach(function (l, i) { for (var r = 0; r < 2; r++) { var a = bp[l[r ? 1 : 0]].p, b = bp[l[r ? 0 : 1]].p, q = i * 2 + r; pa3.set([a.x, a.y, a.z], q * 3); pb3.set([b.x, b.y, b.z], q * 3); ps3[q] = Math.random(); } });
      var pg3 = new THREE.InstancedBufferGeometry(); pg3.copy(new THREE.IcosahedronGeometry(1, 1)); pg3.setAttribute("aA", new THREE.InstancedBufferAttribute(pa3, 3)); pg3.setAttribute("aB2", new THREE.InstancedBufferAttribute(pb3, 3)); pg3.setAttribute("aS", new THREE.InstancedBufferAttribute(ps3, 1)); pg3.instanceCount = PN3;
      var dPulse = new THREE.Mesh(pg3, new THREE.ShaderMaterial({ uniforms: { uT: DUf.uT }, vertexShader: "attribute vec3 aA; attribute vec3 aB2; attribute float aS; uniform float uT; varying float vK;\nvoid main(){ float ph = fract(uT * (0.5 + aS * 0.6) + aS * 13.0); vec3 c = mix(aA, aB2, ph); vK = sin(ph * 3.14159);\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(c + position * 0.011 * (0.5 + 0.5 * vK), 1.0); }", fragmentShader: "varying float vK;\nvoid main(){ gl_FragColor = vec4(vec3(1.0, 0.62, 0.86) * (0.7 + 1.4 * vK), 1.0); }" }));
      dPulse.frustumCulled = false; dBalls.add(dPulse);
      var dGl = new THREE.PointLight(0xff5fb0, 1.6, 1.6); dGl.position.set(0, 0, 0.2); dBalls.add(dGl);
      orbGet(function () { var dbm = ORB.m.clone(); dbm.emissiveIntensity = 0.85; var im = new THREE.InstancedMesh(ORB.g, dbm, bp.length); bp.forEach(function (b, i) { o3d.position.copy(b.p); o3d.quaternion.identity(); o3d.rotation.set(Math.random() * 6.28, Math.random() * 6.28, 0); o3d.scale.setScalar(b.s); o3d.updateMatrix(); im.setMatrixAt(i, o3d.matrix); }); dBalls.add(im); });
    })();
    var LC = null, PN2 = 900, pph = new Float32Array(PN2 * 3), ppd = new Float32Array(PN2 * 3), pps = new Float32Array(PN2), pgeo = new THREE.BufferGeometry();
    for (var pi2 = 0; pi2 < PN2;) { var qx = Math.random() * 0.93, qy = Math.random(), qin = dInside(qx, qy, DOUT), qho = false; if (!qin || qho) continue;
      var hx = qx - dof.x, hy = qy - dof.y, hz = (Math.random() - 0.5) * 0.06, hl = Math.sqrt(hx * hx + hy * hy) + 0.05, pm = 2.5 + Math.random() * 4.5; pph.set([hx, hy, hz], pi2 * 3); ppd.set([hx / hl * pm + (Math.random() - 0.5) * 2.5, hy / hl * pm + (Math.random() - 0.5) * 2.5, (Math.random() - 0.3) * 4], pi2 * 3); pps[pi2] = Math.random(); pi2++; }
    pgeo.setAttribute("position", new THREE.BufferAttribute(pph, 3)); pgeo.setAttribute("aD", new THREE.BufferAttribute(ppd, 3)); pgeo.setAttribute("aS", new THREE.BufferAttribute(pps, 1));
    var PBU = { uV: { value: 0 }, uPu: { value: 0 }, uB: { value: 0 }, uK: { value: 1 }, uW: { value: 0 }, uT: { value: 0 }, uPR: { value: 1 } }, dpart = new THREE.Points(pgeo, new THREE.ShaderMaterial({ uniforms: PBU, vertexShader: "attribute vec3 aD; attribute float aS; uniform float uV; uniform float uPu; uniform float uB; uniform float uK; uniform float uW; uniform float uT; uniform float uPR; varying vec3 vC; varying float vA;\nvoid main(){ float b = clamp(uB * 1.25 - aS * 0.25, 0.0, 1.0); float an = b * (2.0 + aS * 3.0); float cs = cos(an); float sn = sin(an);\n  vec3 p = position + aD * b * uK; p.xy = mat2(cs, -sn, sn, cs) * p.xy * mix(1.0, 0.85, b);\n  if (uV > 0.5) { float vr = (length(aD.xy) * 1.1 + 0.6) * b; float vth = atan(aD.y, aD.x) * 0.35 + floor(aS * 4.0) * 1.5708 + b * b * (11.0 + aS * 6.0) + vr * 2.2; p = position * (1.0 - b) + vec3(cos(vth) * vr, sin(vth) * vr, -b * 1.2 + aD.z * b * 0.15); }\n  p += vec3(sin(uT * 2.0 + aS * 40.0), cos(uT * 1.7 + aS * 30.0), 0.0) * 0.012 * (1.0 - b);\n  vC = mix(mix(mix(vec3(0.55, 0.0, 0.27), vec3(1.0, 0.027, 0.522), aS), vec3(1.0, 0.03, 0.52), b * 0.3), mix(vec3(0.62, 0.0, 0.3), vec3(1.0, 0.1, 0.56), aS), uW); vA = (0.75 + 0.25 * sin(uT * 3.0 + aS * 50.0)) * (1.0 + uPu * 2.5);\n  vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_PointSize = uPR * (2.2 + aS * 2.2) * (1.0 + b * (1.6 + uV * 1.4)); gl_Position = projectionMatrix * mv; }", fragmentShader: "varying vec3 vC; varying float vA;\nvoid main(){ float r = length(gl_PointCoord - 0.5) * 2.0; if (r > 1.0) discard; float a = (exp(-r * r * 5.0) + exp(-r * r * 40.0) * 0.6) * vA; gl_FragColor = vec4(vC * a * 1.5, min(1.0, a)); }", transparent: true, depthWrite: false, depthTest: false, blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor, blendSrcAlpha: THREE.OneFactor, blendDstAlpha: THREE.OneMinusSrcAlphaFactor }));
    dpart.frustumCulled = false; dpart.visible = false; dgrp.add(dpart); dmat.emissive = new THREE.Color(0xff3fa0); dmat.emissiveIntensity = 0;
    var NEU = { uP: { value: 0 }, uAl: { value: 1 } }, NEF = "uniform float uP; uniform float uAl; uniform float uW; varying vec2 vUv;\nvoid main(){ if (vUv.x > uP) discard; float hd = exp(-(uP - vUv.x) * 28.0); vec3 nc = mix(vec3(1.0, 0.22, 0.64), vec3(1.0, 0.86, 0.94), step(0.9, uW) * 0.75); gl_FragColor = vec4(nc * (1.2 + 2.6 * hd * (1.0 - step(1.0, uP))) * uAl * uW, 1.0); }";
    function nloopPts(a) { return a.map(function (pt) { return new THREE.Vector3(pt[0] - dof.x, pt[1] - dof.y, dzf + 0.01); }); }
    var OUT = DOO;
    var neon = new THREE.Group(); dgrp.add(neon);
    var gcv = document.createElement("canvas"); gcv.width = gcv.height = 128; var gcx = gcv.getContext("2d"), ggr = gcx.createRadialGradient(64, 64, 0, 64, 64, 64); ggr.addColorStop(0, "rgba(255,255,255,1)"); ggr.addColorStop(0.18, "rgba(255,190,225,0.9)"); ggr.addColorStop(0.45, "rgba(255,60,160,0.35)"); ggr.addColorStop(1, "rgba(255,40,150,0)"); gcx.fillStyle = ggr; gcx.fillRect(0, 0, 128, 128);
    var dglow = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(gcv), transparent: true, opacity: 0, depthTest: false, depthWrite: false, blending: THREE.AdditiveBlending })); dglow.renderOrder = 9; dglow.visible = false; dgrp.add(dglow);
    [OUT, DHH].forEach(function (pl) { var cv2 = new THREE.CatmullRomCurve3(nloopPts(pl), true, "catmullrom", 0.0); [[0.016, 1], [0.065, 0.42]].forEach(function (rw) { var nm = new THREE.Mesh(new THREE.TubeGeometry(cv2, 240, rw[0], 6, true), new THREE.ShaderMaterial({ uniforms: Object.assign({ uW: { value: rw[1] } }, NEU), vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }", fragmentShader: NEF, transparent: true, depthTest: false, depthWrite: false, blending: THREE.AdditiveBlending })); nm.renderOrder = 5; neon.add(nm); }); });
    var iaDone = false, iaT = -1, HI = { v: 0 }, E0 = 0.4; if (G && window.ScrollTrigger) gsap.to(HI, { v: 1, ease: "none", scrollTrigger: { trigger: q(".dgn-intro") || root, start: "top top", end: function () { return "+=" + Math.round(window.innerHeight * E0); }, scrub: 0.8 } }); else HI.v = 1;
    var HV = 10 * Math.tan(15 * Math.PI / 180), DH = 1.09, J = -1, mxo = 0, myo = 0, tmo = 0, tmy = 0, landed = false, sqk = 0, wasOn = true, dt0 = performance.now(), lastT = 0;
    if (DJ.dS) { var dmI = dmat.clone(); dmI.onBeforeCompile = dmat.onBeforeCompile; dmI.transparent = false; dmI.opacity = 1; dmI.envMap = DJ.dEnv || null; dmI.envMapIntensity = 0.9; var dIn = new THREE.Mesh(dgeo, dmI); dIn.visible = false; dIn.frustumCulled = false; DJ.dS.add(dIn); DJ.dIn = { m: dIn, mat: dmI, k: 1.0 / DH }; }
    var crewLt = q(".dgn-crew__light"), word = q(".dgn-crew__stage"), slot = q(".dgn-dslot"), bl = q(".dgn-dslot i"), svxEl = q(".dgn-crew"), svCan = null;
    if (word && word.classList.contains("dgn-crew__word")) { var wn = []; Array.prototype.slice.call(word.childNodes).forEach(function (n) { if (n.nodeType === 3) { n.textContent.split("").forEach(function (ch, i) { var s = document.createElement("span"); s.className = "dgn-wl"; s.textContent = ch; s.style.setProperty("--i", i); wn.push(s); }); } else wn.push(n); }); word.textContent = ""; wn.forEach(function (n) { word.appendChild(n); }); }
    root.classList.add("dgn-d3"); if (svxEl) svxEl.classList.add("dgn-ov");
    var blk = document.createElement("div"), blkO = -1; blk.className = "dgn-blk"; blk.setAttribute("aria-hidden", "true"); root.appendChild(blk);
    var intro = q(".dgn-intro");
    if (intro && G) { root.classList.add("dgn-ipin"); ScrollTrigger.create({ trigger: intro, start: "top top", end: function () { return "+=" + window.innerHeight; }, pin: true, pinSpacing: false }); if (svxEl) { DJ.teamLen = function () { return Math.round(window.innerHeight * 2.4); }; DJ.svxST = ScrollTrigger.create({ trigger: svxEl, start: "top top", end: function () { return "+=" + Math.round(window.innerHeight * 1.7); }, pin: true }); } ScrollTrigger.refresh(); }
    function cl(x) { return Math.max(0, Math.min(1, x)); }
    function es(x) { x = cl(x); return x * x * (3 - 2 * x); }
    function lp(a, b, k) { return a + (b - a) * k; }
    function mixP(a, b, k) { return { x: lp(a.x, b.x, k), y: lp(a.y, b.y, k), h: lp(a.h, b.h, k), rx: lp(a.rx, b.rx, k), ry: lp(a.ry, b.ry, k), rz: lp(a.rz, b.rz, k) }; }
    function slotP() {
      if (!slot || !bl) return { x: 0, y: -0.6, h: 0.2, rx: 0, ry: 0, rz: 0 };
      var r = slot.getBoundingClientRect(), b = bl.getBoundingClientRect(), fs = parseFloat(getComputedStyle(slot).fontSize) || 100, W = window.innerWidth, Hh = window.innerHeight, cap = fs * 0.72;
      return { x: (r.left + r.width / 2) / W * 2 - 1, y: 1 - (b.bottom - cap / 2) / Hh * 2, h: cap / Hh, rx: 0, ry: 0, rz: 0 };
    }
    function jt() {
      var y = window.scrollY, ss = spST; if (!ss) return 0;
      var vh = window.innerHeight;
      if (y < ss.start + vh) return cl((y - ss.start) / vh);
      if (y <= ss.end) return 1 + (y - ss.start - vh) / Math.max(1, ss.end - ss.start - vh);
      var ts = DJ.tunST, vs = DJ.svxST;
      if (ts) { if (y < ts.start) return 2; if (y <= ts.end) return 2 + (y - ts.start) / Math.max(1, ts.end - ts.start); }
      if (vs) { if (y < vs.start) return 3; if (y <= vs.end) return 3 + Math.min(1, (y - vs.start) / Math.max(1, DJ.teamLen ? DJ.teamLen() : vs.end - vs.start)); return 4 + (y - vs.end) / window.innerHeight; }
      return 3;
    }
    function pose(j, t) {
      var hs = { x: -0.66 + 0.04 * Math.sin(t * 0.7), y: -0.02 + 0.05 * Math.sin(t * 0.9), h: 0.24, rx: 0.12 + 0.1 * Math.sin(t * 0.6), ry: 0.6, rz: -0.1 };
      if (j < 1) {
        j = Math.max(0, (j - E0) / (1 - E0));
        var idle = { x: 0.44, y: 0.02 + 0.02 * Math.sin(t * 0.8), h: 0.58, rx: 0.12 + myo * 0.25, ry: -0.45 + Math.sin(t * 0.5) * 0.22 + mxo * 0.5, rz: 0.08 };
        var front = { x: 0, y: 0, h: 0.95, rx: 0, ry: 0, rz: 0 };
        if (j < 0.45) return mixP(idle, front, es(j / 0.45));
        var kp = (j - 0.45) / 0.55; front.h = 0.95 * Math.pow(7.5, kp * kp); return front;
      }
      if (j < 2) {
        var pos = (j - 1) * 14, ryB = 0.6 + Math.PI * 2 + Math.min(pos, 10) * 0.9;
        var fl = DJ.ov ? { x: DJ.ox, y: DJ.oy, h: DJ.oh * es(pos / 1.1), rx: DJ.orx || 0, ry: DJ.ory || 0, rz: DJ.orz || 0 } : { x: hs.x, y: hs.y + 0.05 * Math.sin(pos * 0.5), h: hs.h * es(pos / 1.1), rx: hs.rx, ry: ryB - (1 - es(pos / 1.1)) * 2.5, rz: hs.rz };
        if (pos < 10) return fl;
        if (DJ.lv) LC = { x: DJ.lx, y: DJ.ly, h: DJ.lh }; else if (pos < 10) LC = null;
        var L = LC ? { x: LC.x, y: LC.y, h: LC.h, rx: 0, ry: DJ.ov ? 0 : Math.round(ryB / 6.2832) * 6.2832, rz: 0 } : { x: -0.25, y: 0.03, h: 0.08, rx: 0, ry: Math.round(ryB / 6.2832) * 6.2832, rz: 0 };
        if (pos < 12.3) return mixP(fl, L, es((pos - 10) / 1.2));
        if (pos < 13.6) return L;
        var k = es((pos - 13.6) / 0.4), fd = { x: 0, y: -0.05, h: 0.05, rx: L.rx + 3.2, ry: L.ry + 1.2, rz: 2.0 };
        return mixP(L, fd, k);
      }
      if (j < 3) {
        var tp2 = j - 2, orr = es(tp2 / 0.08) * (1 - es((tp2 - 0.8) / 0.08)), oa = t * 1.3 + tp2 * 14, ow = Math.min(0.66, 0.42 * 1.6 / dcam.aspect + 0.2), od = 0.5 + 0.5 * Math.sin(oa);
        var td = { x: Math.cos(oa) * ow * orr, y: -0.02 + Math.sin(oa) * 0.5 * orr * 0.9 - (1 - orr) * 0.03, h: 0.05 + (0.035 + 0.05 * od) * orr, rx: 3.2 + t * 1.4, ry: 1.2 + t * 0.9 + oa * 0.5, rz: 2.0 + t * 0.6 };
        if (tp2 > 0.86) { var kk = es((tp2 - 0.86) / 0.07), kr = cl((tp2 - 0.93) / 0.07); td.x = lp(td.x, 0, kk); td.y = lp(td.y, 0.02, kk); td.h = lp(td.h, 0.022, kk) + kr * kr * 0.9; td.rx = lp(td.rx, 0, kk); td.ry = lp(td.ry, 0, kk); td.rz = lp(td.rz, 0, kk); }
        return td;
      }
      var GE = DJ.gEntry, T = GE ? { x: GE.x, y: GE.y, h: GE.h, rx: 0, ry: 0, rz: 0 } : slotP();
      if (j < 3.45) {
        var F0 = { x: T.x + 0.04, y: 1.45, h: T.h * 1.5, rx: 0.5, ry: Math.PI * 2, rz: 0.25 }, kf = cl((j - 3.03) / 0.42);
        return mixP(F0, T, kf * kf);
      }
      return T;
    }
    function hit() {
      sqk = 1; flipK = 1; jelT = lastT; if (DJ.crewHit) DJ.crewHit();
      [svCan, word, dcv].forEach(function (el) { if (!el) return; el.classList.remove("dgn-shake"); void el.offsetWidth; el.classList.add("dgn-shake"); });
      if (word && !word.classList.contains("hit")) word.classList.add("hit");
      var wd = slot && slot.parentNode && slot.closest(".dgn-crew__word, .dgn-gs__word");
      if (wd) { var wr = wd.getBoundingClientRect(), sr = slot.getBoundingClientRect(), fsz = parseFloat(getComputedStyle(wd).fontSize) || 100, bx = document.createElement("span"); bx.className = "dgn-spks"; bx.style.left = (sr.left + sr.width / 2 - wr.left) + "px"; bx.style.top = (sr.top + sr.height * 0.55 - wr.top) + "px"; bx.style.fontSize = fsz + "px";
        for (var si = 0; si < 16; si++) { var sp = document.createElement("i"); sp.style.setProperty("--a", (si / 16 * 360 + Math.random() * 18) + "deg"); sp.style.setProperty("--d", (0.45 + Math.random() * 0.7).toFixed(2) + "em"); sp.style.animationDelay = (Math.random() * 0.08).toFixed(2) + "s"; bx.appendChild(sp); }
        wd.appendChild(bx); setTimeout(function () { if (bx.parentNode) bx.parentNode.removeChild(bx); }, 1200); }
    }
    function dsize() { var w = window.innerWidth, h = window.innerHeight; dr.setSize(w, h, false); dcam.aspect = w / Math.max(1, h); dcam.updateProjectionMatrix(); }
    dsize(); window.addEventListener("resize", dsize);
    window.addEventListener("pointermove", function (e) { tmo = e.clientX / window.innerWidth * 2 - 1; tmy = e.clientY / window.innerHeight * 2 - 1; }, { passive: true });
    var nT0 = -1, jelT = -1;
    var trail = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.ShaderMaterial({ uniforms: { uA: { value: 0 } }, transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending, vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }", fragmentShader: "uniform float uA; varying vec2 vUv;\nvoid main(){ float x = abs(vUv.x - 0.5) * 2.0; float a = uA * pow(1.0 - vUv.y, 2.0) * pow(1.0 - x * x, 3.0); gl_FragColor = vec4(mix(vec3(0.85, 0.8, 0.9), vec3(1.0), (1.0 - vUv.y) * (1.0 - x)), a * 0.7); }" })); trail.renderOrder = -1; trail.visible = false; dsc.add(trail);
    function dframe(t) {
      var jt2 = jt(); J = J < 0 ? jt2 : J + (jt2 - J) * 0.12; if (Math.abs(jt2 - J) > 1.5) J = jt2;
      mxo += (tmo - mxo) * 0.05; myo += (tmy - myo) * 0.05;
      if (!landed && J >= 3.45 && J < 4.5) { landed = true; hit(); } else if (landed && J < 3.4) { landed = false; flipK = 0; jelT = -1; setPhoto(false); if (word) word.classList.remove("hit"); }
      iaDone = HI.v >= 0.999; if (iaT < 0) iaT = t;
      var bTs = DJ.tunST, bVs = DJ.svxST, bY = window.scrollY, bo = 0;
      if (bTs && bVs) bo = bY < bVs.start - 1 ? es(((bY - bTs.start) / Math.max(1, bTs.end - bTs.start) - 0.8) / 0.17) : 1 - es((bY - bVs.start) / (window.innerHeight * 0.16));
      if (Math.abs(bo - blkO) > 0.002) { blkO = bo; blk.style.opacity = bo.toFixed(3); blk.style.visibility = bo > 0.002 ? "visible" : "hidden"; }
      if (svxEl && bTs) svxEl.classList.toggle("dgn-cshow", bY >= bTs.end - 1);
      var p = pose(J, t), dtt = Math.max(0, Math.min(0.1, t - lastT)); lastT = t; sqk = Math.max(0, sqk - dtt * 3.2);
      var on = J < 2.99 || J > 3.02; on = on && (J < 1 ? p.h < 6.5 : p.h < 1.25) && p.h > 0.004 && p.y > -1.6 && p.y < 1.8 && !(landed && jelT >= 0 && t - jelT > 0.3);
      dgrp.visible = on; if (!on) trail.visible = false;
      if (on) {
        var jd = t - jelT, s = p.h * 2 * HV / DH, sq = J >= 3.03 && J < 3.45 ? 1 + 0.42 * Math.pow(cl((J - 3.03) / 0.42), 2) : landed && jelT >= 0 && jd < 1.8 ? 1 - 0.3 * Math.sin(jd * 19) * Math.exp(-jd * 3.4) : 1 - 0.22 * Math.sin(sqk * Math.PI) * sqk;
        var ia = HI.v * 3.3, st2 = 1;
        if (!iaDone) {
          var dp2 = cl(ia / 1.5), fi = cl((ia - 1.5) / 0.9); st2 = es((ia - 2.2) / 0.9);
          NEU.uP.value = dp2 * 1.002; NEU.uAl.value = 1 - cl((ia - 2.1) / 0.5); neon.visible = NEU.uAl.value > 0.001 && NEU.uP.value > 0.01;
          dmesh.visible = ia >= 1.5; DUf.uFill.value = es(fi); s *= 1 + 0.05 * Math.sin(cl((ia - 2.3) / 0.4) * Math.PI);
          p.rx *= st2; p.ry *= st2; p.rz *= st2;
          
        } else if (J >= 2.99 && J < 3.45) {
          neon.visible = false; dmesh.visible = true; DUf.uFill.value = 1;
        } else if (neon.visible || !dmesh.visible || DUf.uFill.value < 1) { neon.visible = false; dmesh.visible = true; DUf.uFill.value = 1; }
        DUf.uCirc.value = J >= 0.97 && J < 2 ? es((J - 0.97) / 0.05) :J >= 2.86 && J < 3 ? es((J - 2.86) / 0.06) : 0;
        DUf.uBtn.value = J >= 0.97 ? es((J - 0.97) / 0.05) : 0;
        var gk = J >= 2.86 && J < 3 ? es((J - 2.86) / 0.06) : J >= 3 && J < 3.08 ? 1 - es((J - 3) / 0.08) : 0, emi = Math.max(gk * 3.5, flipK * 1.4);
        var sfd = ((DJ.stK || 0) - 0.62) / 0.11, sf = J >= 3.45 && (DJ.stK || 0) > 0 ? Math.exp(-sfd * sfd) : 0; dmat.emissiveIntensity = Math.max(emi, sf * 2.5); dglow.visible = gk > 0.01 || flipK > 0.01 || sf > 0.01; dglow.material.opacity = Math.max(gk, flipK * 0.75, sf); dglow.scale.setScalar(sf > Math.max(gk, flipK) ? 4.5 : gk > flipK ? 5 : 2.6 + (1 - flipK) * 1.4);
        DUf.uT.value = t; DUf.uInk.value = J < 1 ? 1 : 0; DUf.uWob.value = 1 - es(Math.max(0, J - E0) / 0.4);
        var mdx = (mxo - p.x), mdy = (-myo - p.y), mdd = Math.sqrt(mdx * mdx + mdy * mdy), mk = J < E0 + 0.4 ? Math.max(0, 1 - mdd / 0.9) : 0; DUf.uMd.value.set(mdx, mdy, 0.25).normalize().multiplyScalar(mk);
        if (J >= 1 && J < 1.09) { if (sweepF !== 1) { sweepF = 1; sweepT = t; } } else if (J < 1) sweepF = 0;
        if (flipK > 0) { flipK = Math.max(0, flipK - dtt / 0.6); p.x += (Math.random() - 0.5) * 0.008 * flipK; p.y += (Math.random() - 0.5) * 0.008 * flipK; if (sweepF !== 2) { sweepF = 2; sweepT = t; } } if (photoOn) setPhoto(false);
        var hpos = (J - 1) * 14; DUf.uCry.value = 0; DUf.uChr.value = 0; DUf.uHolo.value = 0; dBalls.visible = false;
        if (DUf.uHolo.value > 0) { DUf.uHs.value = hpos * 0.35 + t * 0.04; DUf.uHb.value += (Math.round(kv(KF.Focus.card, Math.max(0, Math.min(14, hpos)))) * 0.33 - DUf.uHb.value) * 0.05; }
        if (J >= 1.778 && J < 1.82 && sweepF !== 4) { sweepF = 4; sweepT = t; }
        var bpos = (J - 1) * 14, pOn = J > 1.7 && J < 2 && bpos >= 10 && bpos < 13.6; dpart.visible = pOn;
        if (pOn) { var bb = bpos < 10.5 ? es((bpos - 10) / 0.5) : bpos < 11.2 ? 1 - es((bpos - 10.5) / 0.7) : bpos < 12.3 ? 0 : bpos < 12.8 ? es((bpos - 12.3) / 0.5) : 1 - es((bpos - 12.8) / 0.8); PBU.uB.value = bb; PBU.uK.value = bpos < 11.2 ? 0.55 : 1; PBU.uW.value = bpos < 12.8 ? es((bpos - 10.3) / 0.8) : 1 - es((bpos - 12.8) / 0.35); PBU.uT.value = t; PBU.uV.value = bpos >= 12.8 ? 1 : 0; var pud = (bpos - 13.55) / 0.06; PBU.uPu.value = Math.exp(-pud * pud); PBU.uPR.value = Math.min(DPR, 1.5) * window.innerHeight / 900; }
        if (iaDone) dmesh.visible = !pOn;
       if (bpos >= 13.6 && J < 2 && sweepF !== 5) { sweepF = 5; sweepT = t; }
        dmat.opacity = J >= 1 && J < 1.72 ? 1 - 0.7 * (DJ.ob || 0) : landed && jelT >= 0 ? 1 - es(cl((t - jelT - 0.06) / 0.14)) : 1;
        DUf.uSweep.value = sweepT >= 0 && t - sweepT < 0.9 ? -0.9 + (t - sweepT) / 0.9 * 2.0 : -9;
        dgrp.position.set(p.x * HV * dcam.aspect, p.y * HV - (1 - sq) * p.h * HV, 0); dgrp.scale.set(s * (2 - sq), s * sq, s); dgrp.rotation.set(p.rx, p.ry, p.rz); if (DJ.dIn) { DJ.dIn.mat.emissiveIntensity = dmat.emissiveIntensity; if (J >= 1 && J < 2 && bpos < 10) dgrp.visible = false; }
        var tA = J >= 3.03 && J < 3.45 ? Math.sin(cl((J - 3.03) / 0.42) * Math.PI * 0.92) : 0; trail.visible = tA > 0.01; if (trail.visible) { var tl = s * (1.2 + 4.0 * tA); trail.position.set(dgrp.position.x, dgrp.position.y + tl / 2 + s * 0.15, -0.3); trail.scale.set(s * 0.55, tl, 1); trail.material.uniforms.uA.value = tA * 0.85; }
      }
      if (intro) {
        if (J > E0 + 0.45 * (1 - E0) && J < 0.995 && on) {
          dgrp.updateMatrixWorld(true); var ir = intro.getBoundingClientRect(), W = window.innerWidth, Hh = window.innerHeight, ph = "M" + (-ir.left) + " " + (-ir.top) + "H" + (W - ir.left) + "V" + (Hh - ir.top) + "H" + (-ir.left) + "Z";
          HOLE.forEach(function (hp, hi) { dpv.set(hp[0] - dof.x, hp[1] - dof.y, dzf).applyMatrix4(dgrp.matrixWorld).project(dcam); ph += (hi ? "L" : "M") + ((dpv.x + 1) / 2 * W - ir.left).toFixed(1) + " " + ((1 - dpv.y) / 2 * Hh - ir.top).toFixed(1); });
          intro.style.clipPath = "path(evenodd, \"" + ph + "Z\")"; intro.style.visibility = "";
        } else { intro.style.clipPath = ""; intro.style.visibility = J > E0 + 0.45 * (1 - E0) ? "hidden" : ""; }
      }
      var dvis = on && (dgrp.visible || trail.visible);
      if (dvis || wasOn) dr.render(dsc, dcam); /* skip drawing while the D is hidden (one last frame clears it) */
      wasOn = dvis;
    }
    window.__df = dframe;
    /* sleep the D loop once the visitor is a screen past the team section; wake on scroll back */
    var dSleep = false, D_SLEEP_J = 5;
    function dloop(now) { try { dframe((now - dt0) / 1000); } catch (e) { dbg(e); return; } if (J > D_SLEEP_J && jt() > D_SLEEP_J && !wasOn) { dSleep = true; return; } requestAnimationFrame(dloop); }
    function dWake() { if (dSleep && jt() <= D_SLEEP_J) { dSleep = false; requestAnimationFrame(dloop); } }
    window.addEventListener("scroll", dWake, { passive: true }); window.addEventListener("resize", dWake);
    window.__dsleep = function () { return dSleep; };
    requestAnimationFrame(dloop);
  })(); } catch (e) { dbg(e); }

