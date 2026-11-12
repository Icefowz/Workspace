/* ===== Loader: makes sure three.js and GSAP are present, then starts dgnMain (WordPress already loads them, so this is a fallback) ===== */
var dgnLibs = [[DGN_V + "three/build/three.min.js", function () { return !!(window.THREE); }], [DGN_V + "three/examples/js/environments/RoomEnvironment.js", function () { return !!(window.THREE && THREE.RoomEnvironment); }], [DGN_V + "three/examples/js/shaders/CopyShader.js", function () { return !!(window.THREE && THREE.CopyShader); }], [DGN_V + "three/examples/js/shaders/LuminosityHighPassShader.js", function () { return !!(window.THREE && THREE.LuminosityHighPassShader); }], [DGN_V + "three/examples/js/postprocessing/Pass.js", function () { return !!(window.THREE && THREE.Pass); }], [DGN_V + "three/examples/js/postprocessing/EffectComposer.js", function () { return !!(window.THREE && THREE.EffectComposer); }], [DGN_V + "three/examples/js/postprocessing/RenderPass.js", function () { return !!(window.THREE && THREE.RenderPass); }], [DGN_V + "three/examples/js/postprocessing/ShaderPass.js", function () { return !!(window.THREE && THREE.ShaderPass); }], [DGN_V + "three/examples/js/postprocessing/UnrealBloomPass.js", function () { return !!(window.THREE && THREE.UnrealBloomPass); }], [DGN_V + "gsap/gsap.min.js", function () { return !!(window.gsap); }], [DGN_V + "gsap/ScrollTrigger.min.js", function () { return !!(window.ScrollTrigger); }], [DGN_V + "gsap/ScrambleTextPlugin.min.js", function () { return !!(window.ScrambleTextPlugin); }]];
(function dgnLoad(i) {
  if (i >= dgnLibs.length) { dgnMain(); return; }
  if (dgnLibs[i][1]()) { dgnLoad(i + 1); return; }
  var s = document.createElement("script"); s.src = dgnLibs[i][0]; s.async = false;
  s.setAttribute("data-no-optimize", "1"); s.setAttribute("data-cfasync", "false"); s.setAttribute("nowprocket", "");
  s.onload = function () { dgnLoad(i + 1); };
  s.onerror = function () { (window.__dgnErr = window.__dgnErr || []).push("load failed " + dgnLibs[i][0]); dgnLoad(i + 1); };
  document.head.appendChild(s);
})(0);
