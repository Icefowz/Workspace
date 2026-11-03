precision highp float;
uniform vec2 uRes; uniform vec4 uRect; uniform float uP; uniform float uT; uniform float uDp;
float hs(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(hs(i), hs(i + vec2(1.0, 0.0)), f.x), mix(hs(i + vec2(0.0, 1.0)), hs(i + vec2(1.0, 1.0)), f.x), f.y); }
float fbm(vec2 p){ return vn(p) * 0.55 + vn(p * 2.1 + 3.1) * 0.3 + vn(p * 4.3 + 7.7) * 0.15; }
float rbox(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
vec3 chrome(float v){ v = fract(v); vec3 a = vec3(0.08, 0.01, 0.05), b = vec3(0.55, 0.06, 0.3), c = vec3(1.0, 0.35, 0.7), d = vec3(1.0, 0.92, 0.96);
  return v < 0.35 ? mix(a, b, v / 0.35) : v < 0.6 ? mix(b, c, (v - 0.35) / 0.25) : v < 0.72 ? mix(c, d, (v - 0.6) / 0.12) : mix(d, a, (v - 0.72) / 0.28); }
void main(){
  float s = uDp; vec2 px = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y); vec2 c = uRect.xy + uRect.zw * 0.5;
  float sIn = smoothstep(0.0, 0.3, uP), sOut = smoothstep(0.6, 0.84, uP);
  float top = mix(0.0, uRect.y + uRect.w * 0.25, sOut), bot = mix(0.0, uRect.y + uRect.w, sIn);
  float cx = c.x + sin(px.y * 0.012 / s + uT * 1.4) * 10.0 * s;
  float w = (15.0 + 6.0 * sin(px.y * 0.03 / s - uT * 5.0)) * s * (1.0 - sOut * 0.75);
  float dx = px.x - cx;
  float stream = smoothstep(w, w - 2.0 * s, abs(dx)) * step(top, px.y) * smoothstep(bot + 2.0 * s, bot - 6.0 * s, px.y);
  vec2 q = px - c; float d = rbox(q, uRect.zw * 0.5, 26.0 * s);
  float inside = smoothstep(1.5 * s, -1.5 * s, d);
  float fill = smoothstep(0.16, 0.6, uP);
  float surf = uRect.y + uRect.w * (1.0 - fill) + (sin(px.x * 0.02 / s + uT * 3.0) * 7.0 + (fbm(vec2(px.x * 0.01 / s, uT)) - 0.5) * 18.0) * s * (1.0 - fill * 0.6);
  float liq = inside * smoothstep(surf - 1.5 * s, surf + 1.5 * s, px.y);
  stream *= (1.0 - inside * step(surf, px.y)) * (1.0 - smoothstep(0.7, 0.84, uP));
  vec3 col = chrome(clamp(dx / max(w, 0.001), -1.0, 1.0) * 0.45 + 0.55 + px.y * 0.0015 / s - uT * 0.4);
  float a = stream;
  float rv = smoothstep(0.64, 0.96, uP);
  float n = fbm(px / s * 0.006 + vec2(0.0, uT * 0.05)) + 0.05;
  float keep = rv > 0.0 ? smoothstep(rv * 1.1 - 0.05, rv * 1.1 + 0.03, n) : 1.0;
  float edge = rv > 0.0 ? (1.0 - smoothstep(0.0, 0.07, abs(n - rv * 1.1))) * liq : 0.0;
  liq *= keep;
  float h0 = fbm(px / s * 0.0045 + vec2(uT * 0.08, -uT * 0.25)), hx = fbm((px + vec2(2.0, 0.0) * s) / s * 0.0045 + vec2(uT * 0.08, -uT * 0.25)), hy = fbm((px + vec2(0.0, 2.0) * s) / s * 0.0045 + vec2(uT * 0.08, -uT * 0.25));
  vec2 g = vec2(hx - h0, hy - h0) * 28.0;
  vec3 lc = chrome(0.5 + g.y * 0.6 + g.x * 0.3 + (px.y - surf) * 0.0012 / s) + vec3(1.0, 0.6, 0.85) * smoothstep(14.0 * s, 0.0, abs(px.y - surf)) * (1.0 - fill * 0.5) * 0.5;
  col = mix(col, lc, liq); a = max(a, liq);
  vec3 pink = vec3(1.0, 0.03, 0.52);
  float glow = exp(-abs(d) / (6.0 * s)) * smoothstep(0.68, 0.9, uP) * (1.0 - smoothstep(0.95, 1.0, uP));
  vec3 rgb = col * a + pink * (edge * 1.2 + glow);
  gl_FragColor = vec4(rgb, clamp(max(a, max(edge, glow * 0.9)), 0.0, 1.0));
}
