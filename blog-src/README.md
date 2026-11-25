# Blog

The blog page (`blog.html`) and every post page (`blog-<name>.html`) in the Workspace are built from this folder. Don't edit those output files by hand; edit the files here and rebuild.

## Add a new post

1. Copy a post in `posts/` (for example `restaurant-website.html`) and rename it. The file name becomes the page name: `posts/seo-basics.html` → `blog-seo-basics.html`. Use lowercase Latin letters and dashes.
2. Change the settings between the two `---` lines and write the article below them.
3. Rebuild:

```
node blog-src/build-blog.js
```

Run it from the Workspace folder. The new post appears on the blog page automatically, newest first.

## Post settings

| Setting | Needed | What it does |
|---|---|---|
| `title` | yes | Post title |
| `date` | yes | `2026-11-24` format; posts are sorted by it |
| `kind` | yes | `guide` (Οδηγός), `case` (Ιστορία έργου) or `news` (Νέα της ομάδας); drives the blog filters |
| `topic` | yes | Small label, e.g. `Web Development` |
| `excerpt` | yes | Text on the blog card |
| `image` | yes | Card picture, e.g. `assets/web/avenue-home.webp` |
| `image-position` | no | Crop focus of the card picture, e.g. `50% 40%` |
| `lead` | no | Subtitle under the post title (default: excerpt) |
| `featured` | no | `yes` puts the post in the big box at the top of the blog page |
| `feature-text` | no | Text in that big box (default: lead) |
| `hero` | no | `device` (laptop and phone mockup) or `photo` (one photo) |
| `hero-browser`, `hero-phone`, `hero-phone-label` | no | Pictures and button text for `device` |
| `hero-photo`, `hero-photo-alt`, `hero-caption` | no | Picture, description and caption for `photo` |
| `take` | no | "Με μια ματιά" summary points, one per line starting with `- ` |
| `project-title`, `project-href`, `project-image`, `project-text` | no | "Σχετικό έργο" card at the end |
| `cta-title`, `cta-button`, `cta-href` | no | The pink "Το επόμενο βήμα" box |
| `author` | no | Default: Συντακτική ομάδα DigiGlow Media |
| `link` | no | Makes a card that opens another page instead of a post (no post page is built) |
| `status` | no | `draft` hides the post |

## Writing the article

Each part of the article is a section with an id and a heading; the table of contents and reading time are made from them automatically:

```html
<section id="first-part">
  <h2>Heading of the part</h2>
  <p>Paragraph</p>
  <p class="dgb-quote">Highlighted sentence</p>
  <p><a class="dgb-inline" href="projects.html">Link with underline →</a></p>
</section>
```

Design source: `../blog-template` (glow version).
