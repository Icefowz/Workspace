=== DigiGlow Noir ===
Version: 1.0.0
Requires at least: 6.0
Requires PHP: 7.4

The DigiGlow Media noir homepage as a blank full-page template, without Elementor or any page builder.

== Install ==
1. Plugins > Add New > Upload Plugin > choose digiglow-noir.zip > Install > Activate.
2. Pages > open the homepage (or create a page) > Page Attributes > Template > "DigiGlow Noir (full page)" > Update.
   Leave the page content empty. Do not open it with Elementor.
3. Settings > Reading > "Your homepage displays" > A static page > choose that page.

== What it does ==
* Outputs the page from the plugin files only. No theme header, footer or theme CSS on this page.
* Loads CSS and JS as separate cached files. three.js, GSAP and the fonts are stored inside the plugin (no outside CDN).
* Removes theme, block and Elementor styles from this page only. Other pages are untouched.
* Adds security headers on this page: nosniff, SAMEORIGIN frames, strict referrer, no camera/mic/location access.

== LiteSpeed Cache ==
The plugin marks its scripts with data-no-optimize, so LiteSpeed will not combine or delay them.
If the page breaks after enabling JS options, add "dgn-" to LiteSpeed Cache > Page Optimization > Tuning > JS Excludes and JS Deferred / Delayed Excludes.

== Videos ==
The Place and Maxus videos are read from /wp-content/uploads/2026/08/THE-PLACE.mp4 and MAXUS.mp4.

== Placeholders still to replace ==
* The 4 step card photos (picsum.photos).
* The 6 Q&A answers ([Απάντηση]).
