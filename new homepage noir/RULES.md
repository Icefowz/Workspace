# DigiGlow Media homepage noir: project rules

## Delivery
- Site: digiglowmedia.gr homepage, built as one ready-to-paste Elementor Free HTML widget
- Main deliverable: `digiglow-homepage-noir.txt` (full code, real site URLs, Windows CRLF line endings)
- Preview: `digiglow-homepage-noir-preview.html` (same page with placeholder photos, for checking outside WordPress)
- Main working folder: `GitHub\Workspace\new homepage noir`
- Keep working on the existing files; only create new files when asked
- Don't add things that weren't asked for

## Visible copy
- No full stops
- No dashes
- No numeric counters (01, 02 and so on)
- No fabricated testimonials or reviews
- Team names stay as `[Όνομα]` until real names are provided

## Code
- No comments in the code
- Font: Manrope
- Breakpoints: 1536px, 1033px, 768px
- No header in the widget; leave 110 to 170px free at the top of the page for the site header
- No heavy animation on phones and tablets (they get light fallbacks)
- Allowed libraries: GSAP (with ScrollTrigger), three.js, Theatre.js
- Libraries load from cdn.jsdelivr.net: three.js r147, GSAP 3.13.0
- In shaders, avoid GLSL ES 3.0 reserved words as variable names (`flat`, `smooth`, `sample`, `input`, `output`, `filter`)

## Current page structure (in order)
1. Hero: drill spine of picture frames that spins with the scroll direction, pink glass tile helix with cards, gold bokeh dust, DigiGlow logo particle outro
2. Work list (mobile only)
3. Tunnel: "Τι κάνουμε", 5 stops, ends in a warm exit light
4. Services: treasure grotto. The chest opens and 7 service models rise one by one (DigiGlow ball, disco ball, microphone, Avenue laptop, logo blocks, AI chip, reel phone), each with its card and the "Ζητήστε προσφορά" and "Μάθετε περισσότερα" buttons
5. Team and office

Sections connect by overlapping pinned scroll scenes, so each one hands off to the next with a matching colour or light.

## Rejected ideas (do not bring back)
- Chess king
- Lens hero
- Liquid pour into the photo
- Liquid thread process section
- Unrolling wall services
- White glass cards
- Sunrise above the clouds services
- Sunlit table with polaroids services
- Vault of gems services

## Still open
- Real team names and photos
- Tunnel stops repeat the services; they could become short value lines instead
- Full scroll test of the pinned sections on the live site
