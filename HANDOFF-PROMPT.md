# Handoff prompt: DigiGlow Media homepage "noir"

Paste everything below into the new Claude chat, and attach these files:
1. `digiglow-homepage-noir.txt` (the current full code, the source of truth)
2. `RULES.md`
3. `noir-source.zip` (optional: the Python build scripts that generated the txt; they expect to live in `/home/claude/noir` and are run with `python3 build.py && python3 clean.py`. Editing the txt directly is fine too)

---

You are continuing an existing web design project with me. I work at DigiGlow Media, a creative agency in Thessaloniki (digiglowmedia.gr). We have been building a new homepage together, and I'm moving the work to this account. The attached `digiglow-homepage-noir.txt` is the latest version and the source of truth. Read it fully before changing anything, and read `RULES.md`.

## What we are building
- A homepage for digiglowmedia.gr, delivered as ONE ready-to-paste Elementor Free HTML widget: a single file containing all the HTML, CSS and JS, with Windows CRLF line endings.
- Dark, premium, cinematic style ("noir"), with brand pink #ff0785 and accents #ff2a9a and #ff8ac8, on a dark background #0b0709.
- Sections are connected scroll stories: pinned GSAP ScrollTrigger scenes with three.js, each handing off to the next.
- Copy is in Greek. Service names stay in English, as on the live site.

## Files and folder
- Main working folder on my PC: `OneDrive - Ελληνικό Ανοικτό Πανεπιστήμιο\Έγγραφα\GitHub\Workspace\new homepage noir`
- `digiglow-homepage-noir.txt`: the deliverable, using real site image and video URLs
- `digiglow-homepage-noir-preview.html`: the same page with picsum placeholder photos, for testing outside WordPress
- `RULES.md`: the rules below
- When you change the page, update BOTH the txt and the preview, keeping them identical except for the image URLs. Then give me the updated txt.

## Hard rules
- Keep working on the existing files; only create new files when I ask.
- Don't do things I didn't ask for. If something extra seems useful, offer it in one line instead.
- Visible copy: no full stops, no dashes, no numeric counters (01, 02 and so on).
- No code comments.
- Font: Manrope. Breakpoints: 1536px, 1033px, 768px.
- No header in the widget. Leave 110 to 170px free at the top for the site's own header, and never put content in that zone.
- No heavy animation on phones and tablets: they get light static fallbacks.
- No fabricated testimonials. Team names stay `[Όνομα]` until I send them.
- Allowed libraries: GSAP, ScrollTrigger, three.js, Theatre.js.

## Technical setup inside the txt
- Libraries are loaded sequentially by a small loader (`var dgnLibs = [[url, checkFn], ...]`, then `dgnMain()`) from cdn.jsdelivr.net:
  - three.js 0.147.0, plus examples/js: RoomEnvironment, EffectComposer, Pass, RenderPass, ShaderPass, UnrealBloomPass, CopyShader, LuminosityHighPassShader
  - GSAP 3.13.0 with ScrollTrigger and ScrambleTextPlugin
  - The inline script carries `data-no-optimize`, `data-no-defer`, `data-cfasync="false"`, `data-pagespeed-no-defer` and `nowprocket`, so WordPress optimizers don't break it.
- Everything is wrapped in `<div class="dgn">`, and all classes are prefixed `dgn-`.
- `.dgn-gl` is added on capable desktops. Lite mode (phones and tablets) and reduced-motion (`still`) skip the 3D.
- Pinned sections chain by overlap: each next section has `margin-top: -100vh` and stays `visibility: hidden` until the previous section's ScrollTrigger `onLeave` adds `.dgn-show` (`onEnterBack` removes it). Matching colours or light at the hand-off make it seamless.
- Helper functions inside `dgnMain`: `q`, `qa`, `seen` (IntersectionObserver, so render loops only run while visible) and `dbg` (errors go to `window.__dgnErr`).
- GLSL: never use GLSL ES 3.0 reserved words as variable names (`flat`, `smooth`, `sample`, `input`, `output`, `filter`). A variable named `flat` once caused a black render.

## Page structure, in order
1. **Hero, `.dgn-spine`.**
   - A drill-shaped cylinder covered in small picture frames (a shader texture atlas) spins left or right with the scroll direction, inside a helix of pink glass tiles with project cards.
   - Gold bokeh dust with depth of field drifts around it.
   - Project filter buttons and project info sit on screen.
   - Outro: the camera dives into the drill, the dust swirls, and the DigiGlow logo forms from 7000 particles (5 coloured squares, "DigiGlow Media" and "A Creative Agency"). Then a flash leads into the tunnel.
   - Timeline length L = 14; pin length is `innerHeight * 8.4`.
2. **Work list, `.dgn-work`:** mobile only, a list of 5 projects.
3. **Tunnel, `.dgn-tun`:**
   - "Τι κάνουμε" / "Μπείτε στον πυρήνα της δουλειάς μας", with 5 stops: Στρατηγική, Branding, Websites, Video, Καμπάνιες.
   - Glowing rings and dust, ending in a warm exit light. A veil turns into a warm radial gradient (#fff4e6, #ffd8ae, #f2a27c) that hands off to the services.
4. **Services, `.dgn-svx`: the treasure grotto (the CURRENT version, approved).**
   - Arriving: the light fades and the view goes from over-exposed and blurred to sharp, into a dark cave. A beam of warm light falls on a wooden chest with gold bands.
   - The scene: dark rocks, a small rippling pool, coins on the stone floor, and gold dust swirling.
   - Intro: the title "Όλα όσα χρειάζεται η μάρκα σας *σε ένα σημείο*" appears, then the lid opens to show glowing gold coins.
   - As you scroll, 7 service models rise from the chest one by one. Each hovers above the chest while its card shows on the left, then moves into a slow orbit around the chest. The models, in the same order as the services:
     - Digital Marketing: the DigiGlow ball, a glossy dark sphere with the logo and text, a pink ring, and 5 orbiting logo cubes
     - Event Management: a mirror disco ball
     - PR & Communication: a vintage microphone with a pink ring
     - Web Development: a laptop showing the Avenue Restaurant site
     - Branding & Design: the logo as 5 glossy 3D blocks
     - AI Creation: a microchip with a pink "AI" on top
     - Reel Strategy: a phone playing a reel
   - Each card holds the service list as tags and two buttons:
     - "Ζητήστε προσφορά" goes to https://digiglowmedia.gr/contact-us/
     - "Μάθετε περισσότερα" goes to /service-web-development/ for Web Development, /service-reels/ for Reel Strategy, and /expertise/ for the rest
   - Logo colours: #f4ed79, #bee47a, #0ebedf, #e22399, #df1604. Pin length is `innerHeight * 7`.
   - Mobile: stacked dark glass cards with the buttons and no 3D.
5. **Team, `.dgn-team`:** office photo, roles with `[Όνομα]`, address Λεωφόρος Νίκης 1 Θεσσαλονίκη, phone +30 231 607 0788, email digi@digiglowmedia.gr with a copy button.

## The 7 service groups (from the live site)
- **Digital Marketing:** Social Media Marketing, Google Ads & Performance Marketing, SEO, Content Marketing, Email Marketing & Automation, Analytics & Reporting
- **Event Management:** Event Management Services, Venue & Vendor Management, Creative & Production, Marketing & Promotion
- **PR & Communication:** Media Relations Strategy, Publicity Plans, Handling of Negative Publicity, Media Monitoring, CSR, Crisis Management, Consumer Relations, Corporate & Public Affairs Strategies, Marketing Consulting
- **Web Development:** Discovery & UX/UI, Development & CMS, Performance, SEO & Security
- **Branding & Design:** Brand Strategy, Visual Identity, Brand System & Stationery, Content & Art Direction
- **AI Creation:** Scripting & Storyboarding, AI Video Generation, Editing & On-Screen Messaging, Publishing & Performance
- **Reel Strategy:** Strategy & Content Pillars, Scripting, Filming, Publishing & Analysis

## Rejected ideas: never bring these back
- Chess king
- Lens hero ("cinema lens dive")
- Liquid pour into the photo
- Liquid metal colour model
- Liquid thread process section
- Unrolling wall services
- White glass cards
- Sunrise above the clouds services
- "Eyes adjusting to daylight" sunlit table with polaroids
- Vault of gems services
- Plain gems as the relics in the chest (replaced by the 7 service models)

## Still open
- Real team names and photos.
- The tunnel's 5 stops repeat the services; they could become short value lines. Ask me before changing them.
- A full scroll test of all pinned hand-offs on the live site.

## How I like to work
- I write short messages, often in mixed Greek and English. Read them carefully, and ask one short question only when a choice really changes the result.
- When I ask for ideas, give me 2 or 3 concrete options with your pick, and wait for me to choose.
- When I say "do it" or pick an option, build it fully, check it renders (if you can run a browser, render the three.js scene and look at it), then update both files and give me the txt.
- If I say "revert" or "restore", go back exactly to the previous approved version.
- Keep replies short: what changed, what you checked, and what's left.
