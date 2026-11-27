# Service pages

Every category page (like Web Development) and service page (like UX/UI Design) is generated from two templates and one content file.

## Files

- `content.js`: all categories and their services, with every text, picture, FAQ and step
- `services.css`: the design of every service page
- `services.js`: the scroll fade in
- `build-services.js`: builds the pages and keeps the header menu and footer links in sync

## Build

From the Workspace folder:

```
node services-src/build-services.js
```

It writes `service-<category>.html` for each category and `service-<category>-<service>.html` for each service, and it updates the Υπηρεσίες menu in `index.html`. After a build, rebuild the other pages (and the blog with `node blog-src/build-blog.js`) so they get the updated menu.

## Add a category

Copy the Web Development block in `content.js`, change `key` to the key the menu already uses for that category (`dm`, `events`, `pr`, `strategy`, `branding`), then fill in the texts. Only categories listed in `content.js` are generated, the rest of the menu stays as it is.

## Add a service

Add an entry to the category's `children`. Give it a `key`, `slug`, menu names, texts and lists (`includes`, `benefits`, `steps`, `faq`, `cta`).

A service that already has its own designed page uses `page: 'file.html'` instead, like Κατασκευή Ιστοσελίδων & E-shops which links to `web-development.html`.

## Change one page only

- `hide: ['steps', 'faq']` removes sections from that page
- `sections: ['includes', 'faq', 'cta']` sets the exact sections and order

Category sections: `services`, `benefits`, `steps`, `projects`, `faq`, `cta`.
Service sections: `includes`, `benefits`, `steps`, `projects`, `siblings`, `faq`, `cta`.

## Hero pictures

Each page's hero picture is set in `content.js` with `hero: { image: '...' }`. The pictures in `assets/services/` are SVG illustrations drawn by `hero-art.js`, with no client projects. To change one, edit its block in `hero-art.js` and run:

```
node services-src/hero-art.js
```

## Projects

The projects section takes 3 cards from `projects.html` whose filter tags include the page's `projectTag` (web, social, ads, reels, branding, events, support). Projects whose main tag (the first one in their `data-c`) matches come first, so a project shows first on the pages of its main service. Its button opens the Projects page with that filter already selected.

To choose the projects yourself, add `projects: ['Sugartia', 'Avenue', 'Mpatsiolas']` to a category or service (names as they appear on the cards).

Visible copy has no full stops or dashes. The build prints a note if a text ends with a full stop.
