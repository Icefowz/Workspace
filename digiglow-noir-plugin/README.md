# DigiGlow Noir: how to edit

## Where things are

| You want to change | Edit this file |
|---|---|
| Brand colours, button gradient, spacing | `digiglow-noir/src/css/tokens.css` |
| Fonts (`@font-face`) | `digiglow-noir/src/css/fonts.css` (font files in `assets/fonts/`) |
| Buttons, headings, cursor, grain, shared helpers | `digiglow-noir/src/css/base.css` |
| A section's look on desktop | `digiglow-noir/src/css/sections/<section>.css` |
| Anything for tablets and phones | `digiglow-noir/src/css/responsive.css` (one file, headings per section) |
| A section's text or HTML | `digiglow-noir/templates/sections/<nn>-<section>.php` |
| Section order on the page | `digiglow-noir/templates/noir-page.php` (`$dgn_sections` list) |
| Images, 3D model | `digiglow-noir/assets/media/` |
| Shared JS helpers, device checks, floating orbs | `digiglow-noir/src/js/00-core.js` |
| Hero flashlight reveal | `digiglow-noir/src/js/01-hero.js` |
| Shared shader snippets (circuit lines, chrome) | `digiglow-noir/src/js/02-shaders.js` |
| Projects data, filters, project panel, 3D drill | `digiglow-noir/src/js/03-drill.js` |
| Services tunnel | `digiglow-noir/src/js/04-tunnel.js` |
| The 3D D's journey and landing | `digiglow-noir/src/js/05-d-journey.js` |
| Bento card entrances, Q&A open/close | `digiglow-noir/src/js/06-bento.js` |
| Copy email, cursor, grain, debug panel | `digiglow-noir/src/js/07-page-end.js` |
| Library fallback loader | `digiglow-noir/src/js/08-loader.js` |

Sections: `hero`, `drill` (projects), `tunnel` (services), `d-landing` (DIGIGLOW MEDIA), `bento` (how we work + Q&A).

### Important about the JS files
Files `00` to `07` are joined in number order **inside one shared function**, so they can use each other's variables
(for example `q()`, `qa()`, `seen()`, `lite`, `DJ`). That is why a single file may not run on its own,
and why the order must not change. Add new code to the file of the section it belongs to.
Adding `?debug` is not needed: open the page with `#debug` at the end of the URL to see any errors.

## Build after editing

```
node build.js
```

This makes `assets/css/noir.css` and `assets/js/noir.js` (minified), a local `test.html` preview, and `digiglow-noir.zip`.
CSS is joined in this order: tokens, fonts, base, sections, responsive. `responsive.css` must stay last.

## Update the live site

Plugins > Add New > Upload Plugin > `digiglow-noir.zip` > Replace current with uploaded.

`src/` and `_unused.css` are not uploaded. `src/css/_unused.css` holds old rules from removed designs, for reference only.
