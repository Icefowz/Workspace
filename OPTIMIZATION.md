# DigiGlow Noir: optimization notes

What was optimized on the homepage (`index.html`) in November 2026, how it was done, and how to repeat it.
Committed on branch `updates1` as `0e963fc`.

## Results

| | Before | After |
|---|---|---|
| index.html | 343 KB | 304 KB |
| CSS (inline) | 120 KB | 103 KB |
| JS (inline) | 173 KB | 152 KB |
| Scripts loaded from CDN | 12 | 5 |
| Images loaded at page start | ~80 of 86 | 9 of 86 |
| Images from outside the project | 71 | 0 |
| 3D ball model | 962 KB GLB | 11 KB WebP |
| Local photos | 3025 KB | 1004 KB |
| Client logos + brand images | 1370 KB (remote) | 463 KB (local) |

---

## 1. Lazy loading (HTML)

- Every `<img>` below the hero has `loading="lazy" decoding="async"`.
- Kept eager on purpose: header logo (`.dg-wd-nav__logo`), menu logo (`.dg-wd-menu__logo`) and the hero photo (`fetchpriority="high"`).
- Client logos marquee: lazy alone made logos appear blank as they slid in, so a small script (end of `<body>`) switches every logo to `eager` once the strip is within 800px (`IntersectionObserver`, `rootMargin: "800px 0px"`). They stay out of the first load but are ready before visible.

```js
var strip = document.querySelector(".dg-clients-strip");
var io = new IntersectionObserver(function (e) {
  if (e[0].isIntersecting) { io.disconnect(); strip.querySelectorAll('img[loading="lazy"]').forEach(function (i) { i.loading = "eager"; }); }
}, { rootMargin: "800px 0px" });
io.observe(strip);
```

Note: images used as WebGL textures (work rows, drill cards) are loaded by JS with `new Image()`, so `loading="lazy"` on the `<img>` does not affect them.

## 2. Outside images moved into the project (Node.js + sharp)

- 36 unique images were loaded from `digiglowmedia.gr/wp-content/uploads` and `sugartia-staging`. They would break when the old WordPress goes away.
- Now in `assets/clients/` (34 logos) and `assets/brand/` (header logo, footer logo, footer globe).
- Rules used:
  - Logos: max 480px on the long side (shown at max ~190 CSS px; 480 covers 2x screens + the `--dgcm-z` zoom). Never enlarge.
  - Footer globe: 720px. Header logo: kept at its original 240x135.
  - WebP `quality 88, alphaQuality 100, effort 6`. Transparency kept.
  - If a WebP came out bigger than the original, retry `lossless` / `nearLossless` / `quality 80` and keep the smallest.
- File names: original name lowercased, extension → `.webp`.

## 3. Photos resized and converted (sharp)

Sizes chosen from how big each image is actually drawn:

| Folder | Used at | Saved as |
|---|---|---|
| `assets/web/` (work images) | 3D cards draw 960x640; phone rows ~full width | 1200px wide, WebP q80 |
| `assets/how/` (bento cards) | up to ~885 CSS px | 1600px wide, WebP q80 |
| `assets/team/` | 227 CSS px max; 3D crop 512x512 | short side 640px, WebP q82 |
| `assets/hero/` | full screen | kept 2000x1116, re-encoded WebP q82 |

All `.jpg` references in `index.html` (img tags and the `SRC` JSON for the drill) were switched to `.webp`, and the old JPGs deleted.

```js
// core of the conversion (Node.js, npm i sharp@0.33.5)
const out = await sharp(src).resize({ width: 1200, withoutEnlargement: true })
  .webp({ quality: 80, effort: 6, smartSubsample: true }).toBuffer();
```

## 4. The 3D ball: GLB → WebP (three.js)

- `ball_texture-web.glb` (962 KB) was 916 KB of PNG texture; its 3D mesh was never used. The code only drew the texture onto a 1024x512 canvas.
- Now: `assets/ball-texture.webp`, 1024x512 (exactly the size the canvas uses), 11 KB, transparency kept. Loaded with a plain `new Image()` → `THREE.CanvasTexture`.
- This also removed the extra `GLTFLoader.js` download.
- Checked pixel by pixel against the old texture: mean difference 0.6/255, not flipped.

## 5. WebGL zero-size warnings (three.js)

- At ≤1033px the drill section (`.dgn-spine`) is hidden by CSS, so its canvas is 0x0, but the renderer still drew into it on every image load (~400 console warnings).
- Fix in the drill `draw()`:

```js
if (!cv.width || !cv.height) return; /* section hidden: nothing to draw into */
```

- Check: `canvas.getContext("webgl2").getError()` returns `NO_ERROR` after load.

## 6. Placeholders replaced

- 7 picsum images (work rows + drill cards for The Place and Maxus Hellas) replaced with real photos from the project pages on digiglowmedia.gr:
  `theplace-magazine`, `theplace-coupon`, `theplace-bags`, `maxus-t60`, `maxus-press` (all in `assets/web/`, 1200px WebP).

## 7. SEO

```html
<meta name="description" content="Δημιουργικό γραφείο στη Θεσσαλονίκη για branding, websites, video, social media και καμπάνιες. Δημιουργικότητα που ξεχωρίζει, στρατηγική που αποδίδει.">
```

150 characters. On WordPress the SEO plugin (Yoast / Rank Math) controls this tag and the page title: paste it there too.

## 8. Reduced motion (JS `prefers-reduced-motion`)

- A `calm` flag: `matchMedia("(prefers-reduced-motion: reduce)")`, or add `?dgcalm` to the URL to test.
- Same layout; only motion that runs by itself stops. Scroll still drives everything.
  - Hero lens: no auto-wander (desktop idle and phone), follows the pointer only.
  - The D: `pose()` time frozen (`if (calm) t = 0`), no lava pulse (`DUf.uT = 0`).
  - Drill: no liquid flow, no slow idle spin.
- Do NOT use the old `still` flag: it drops the drill's scroll pinning on desktop and the D floats over wrong sections. `still` stays `false`.
- CSS animations already had `@media (prefers-reduced-motion: reduce)` rules.

## 9. Code cleanup

### CSS (postcss + postcss-selector-parser)

- Removed 126 rules + 6 selector parts whose class/id appears nowhere else in the page (HTML or JS). Classes inside `:not(...)` are ignored. Empty `@media` blocks removed.
- They were leftovers of rejected designs (signal board, footlights, member cards, office block…).
- Verified with a computed-style diff: in the browser, apply the old CSS then the new CSS to the same page and compare `getComputedStyle` of every element (+ `::before`/`::after`) at 390, 1024 and 1440px → 0 differences. (A deliberate test change was detected, so the check works.)
- Duplicate rules across the 5 style blocks were NOT merged: that can change which rule wins.

### JS / 3D (three.js, GLSL)

Removed because it could never run or never show:

- Bloom: `EffectComposer` / `UnrealBloomPass` code (`DRILL_FX` was always `false`) and its 7 CDN scripts (CopyShader, LuminosityHighPassShader, Pass, EffectComposer, RenderPass, ShaderPass, UnrealBloomPass). Also removed from the plugin (`build.js` VENDOR list and `digiglow-noir.php` enqueue list).
- `cubeCam` (never created).
- Drill: hidden ball network `netG` (~110 balls, rods, pulses, point light) built on every load.
- Hidden aurora background that was still updated every frame.
- Disabled X-ray lens (`uLens` / `lensT`) and its shader code.
- The D: unused crystal / chrome / holographic looks (`uCry`, `uChr`, `uHolo`, `ENVC`, `holoP`, `dScr`); the holo part ran on every pixel at 0 strength. Hidden D balls (`dBalls`).

Checked: no shader or script errors in hero, drill, tunnel (1440px) and phone (390px).

---

## How to repeat this later

1. **Find remote images:** search `index.html` for `https?://…\.(png|jpe?g|webp|gif)`. Download, resize with sharp, save in `assets/`, replace the URLs.
2. **Find heavy local images:** list `assets/` with sizes and dimensions (`sharp(file).metadata()`), compare with the size each is drawn at (browser: `getBoundingClientRect()` × 2 for retina, or the canvas size for WebGL textures).
3. **Lazy loading:** every `<img>` without `loading=` except header/menu logos and the hero → add `loading="lazy" decoding="async"`.
4. **Dead CSS:** for every class/id in the CSS, check if the token appears anywhere outside `<style>`. If not, the rule can't match.
5. **Dead JS:** look for feature flags that are always off (`= false`), objects created with `.visible = false` that are never shown, and uniforms that are always 0.
6. **Verify:** computed-style diff for CSS; console + `window.__dgnErr` + `gl.getError()` for JS; screenshots of each section.

### Gotchas

- `index.html` uses CRLF line endings: match `\r?\n` in replace scripts.
- In the GLSL strings, line breaks are a literal `\n` inside JS strings.
- The browser pane in the Claude app throttles animation when hidden: scroll-triggered reveals and IntersectionObserver may not fire there, so screenshots can look empty.
- `PowerShell @(@(a,b))` flattens arrays: don't loop pairs that way.

### Not done yet / ideas

- Rebuild the WordPress plugin so the live site gets all of this (it also needs the new `assets/` images copied in).
- LiteSpeed (Hostinger): exclude `.dgn` images from its own lazy-load, keep `data-no-optimize` on the 3D scripts.
- Optional: AVIF versions of the hero photos; self-host three.js/GSAP on the standalone page (the plugin already does).
- Remove the `?dgdebug` panel and `?dgcalm` test switch when no longer needed.
