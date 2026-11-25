const fs = require('fs');
const path = require('path');

const SRC = __dirname;
const W = path.resolve(SRC, '..');
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');

const all = read(path.join(W, 'index.html'));
const L = all.split('\n');
const find = (re, from = 0) => { for (let i = from; i < L.length; i++) if (re.test(L[i])) return i; throw new Error('index.html marker not found ' + re); };
const hdrStart = find(/^<header id="dgmHeader"/), hdrEnd = find(/^<\/header>/, hdrStart);
const hdrCssStart = find(/^<style>/, hdrEnd), hdrCssEnd = find(/^<\/style>/, hdrCssStart);
const hdrJsStart = find(/^<script>/, hdrCssEnd), hdrJsEnd = find(/^<\/script>/, hdrJsStart);
const ftStart = find(/^<!-- DigiGlow footer -->/), ftEnd = find(/^<\/script>/, find(/^<div class="dg-web-footer-v2"/, ftStart));
const cur = '<a class="is-current" href="https://digiglowmedia.gr/" aria-current="page" data-dg-page-link="home">';
let header = L.slice(hdrStart, hdrEnd + 1).join('\n');
if (!header.includes(cur)) throw new Error('home link not found in header');
header = header.replace(cur, '<a href="https://digiglowmedia.gr/" data-dg-page-link="home">');
const headerCss = L.slice(hdrCssStart, hdrCssEnd + 1).join('\n');
const headerJs = L.slice(hdrJsStart, hdrJsEnd + 1).join('\n');
const footer = L.slice(ftStart, ftEnd + 1).join('\n');
const a = all.indexOf('/* Υπηρεσίες pop-out toggle (header menu + footer) */');
if (a < 0) throw new Error('services toggle script not found');
const svcJs = all.slice(a, all.indexOf('})();', a) + 5);
const css = read(path.join(SRC, 'blog.css'));

const KIND = {
  guide: { one: 'Οδηγός', many: 'Οδηγοί', pick: 'Επιλεγμένος οδηγός', read: 'Διαβάστε τον οδηγό', toc: 'Στον οδηγό', tocName: 'Περιεχόμενα οδηγού' },
  case: { one: 'Ιστορία έργου', many: 'Ιστορίες έργων', pick: 'Επιλεγμένη ιστορία έργου', read: 'Διαβάστε την ιστορία', toc: 'Στο άρθρο', tocName: 'Περιεχόμενα άρθρου' },
  news: { one: 'Νέα της ομάδας', many: 'Νέα της ομάδας', pick: 'Επιλεγμένο νέο', read: 'Διαβάστε το άρθρο', toc: 'Στο άρθρο', tocName: 'Περιεχόμενα άρθρου' }
};
const MONTHS = ['Ιανουαρίου', 'Φεβρουαρίου', 'Μαρτίου', 'Απριλίου', 'Μαΐου', 'Ιουνίου', 'Ιουλίου', 'Αυγούστου', 'Σεπτεμβρίου', 'Οκτωβρίου', 'Νοεμβρίου', 'Δεκεμβρίου'];
const ARROW = '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const ARROW_UP = '<span class="dgb-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 17L17 7M8 7h9v9"/></svg></span>';
const esc = (s) => String(s).replace(/&(?!amp;|lt;|gt;|quot;|#)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const attr = (s) => esc(s);

function parse(file) {
  const raw = read(file);
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(path.basename(file) + ': the post must start with a --- block');
  const meta = {};
  let list = null;
  m[1].split('\n').forEach((line, i) => {
    if (!line.trim()) return;
    const item = line.match(/^\s*-\s+(.*)$/);
    if (item && list) { meta[list].push(item[1].trim()); return; }
    const kv = line.match(/^([a-z][\w-]*):\s*(.*)$/);
    if (!kv) throw new Error(`${path.basename(file)} line ${i + 2}: expected "name: value", got "${line}"`);
    if (kv[2].trim() === '') { meta[kv[1]] = []; list = kv[1]; } else { meta[kv[1]] = kv[2].trim(); list = null; }
  });
  meta.slug = path.basename(file, '.html');
  meta.body = m[2].trim();
  for (const k of ['title', 'date', 'kind', 'topic', 'excerpt', 'image']) if (!meta[k]) throw new Error(`${meta.slug}: missing "${k}"`);
  if (!KIND[meta.kind]) throw new Error(`${meta.slug}: kind must be guide, case or news`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.date)) throw new Error(`${meta.slug}: date must look like 2026-11-24`);
  if (!meta.link && !meta.body) throw new Error(`${meta.slug}: no article text and no link`);
  meta.href = meta.link || `blog-${meta.slug}.html`;
  return meta;
}

const posts = fs.readdirSync(path.join(SRC, 'posts')).filter((f) => f.endsWith('.html')).sort()
  .map((f) => parse(path.join(SRC, 'posts', f)))
  .filter((p) => p.status !== 'draft')
  .sort((x, y) => y.date.localeCompare(x.date) || x.title.localeCompare(y.title));
if (!posts.length) throw new Error('no posts in blog-src/posts');

const fmtDate = (d) => { const [y, m, day] = d.split('-').map(Number); return `${day} ${MONTHS[m - 1]} ${y}`; };
const readTime = (html) => Math.max(1, Math.round(html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length / 200));
const pos = (v) => (v ? ` style="object-position:${attr(v)}"` : '');

function stage(p, eager) {
  if (p.hero === 'photo') {
    const src = p['hero-photo'] || p.image;
    return `        <figure class="dgb-photo"><img src="${attr(src)}" alt="${attr(p['hero-photo-alt'] || '')}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'}>${p['hero-caption'] ? `<figcaption>${esc(p['hero-caption'])}</figcaption>` : ''}</figure>`;
  }
  const browser = p['hero-browser'] || p.image, phone = p['hero-phone'];
  return `        <figure class="dgb-stage" aria-hidden="true">
          <div class="dgb-browser"><div class="dgb-browser__bar"><i></i><i></i><i></i></div><img src="${attr(browser)}" alt=""${eager ? ' fetchpriority="high"' : ' loading="lazy"'}></div>${phone ? `
          <div class="dgb-phone"><img src="${attr(phone)}" alt="" loading="lazy">${p['hero-phone-label'] ? `<b>${esc(p['hero-phone-label'])}</b>` : ''}</div>` : ''}
        </figure>`;
}

function card(p, copy) {
  const k = KIND[p.kind];
  const ext = /^https?:/.test(p.href) ? ' target="_blank" rel="noopener"' : '';
  return `        <article class="dgb-card" data-kind="${p.kind}"${copy ? ' data-feature-copy hidden' : ''}>
          <div class="dgb-card__img"><img src="${attr(p.image)}" alt="" loading="lazy" decoding="async"${pos(p['image-position'])}><span class="dgb-kind">${esc(k.one)}</span>${ARROW_UP}</div>
          <div class="dgb-card__body">
            <span class="dgb-label">${esc(p.topic)}</span>
            <h3><a href="${attr(p.href)}"${ext}>${esc(p.title)}</a></h3>
            <p>${esc(p.excerpt)}</p>
          </div>
        </article>`;
}

function page({ title, desc, body }) {
  return `<!doctype html>
<html lang="el">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${attr(desc)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Manrope:wght@200..800&display=swap" rel="stylesheet">
<style>html{scroll-behavior:smooth}body{margin:0;background:#fffafb}</style>
</head>
<body>
<!-- ===== Shared header (copied from index.html) ===== -->
${header}
${headerCss}
${headerJs}

<!-- ===== Blog ===== -->
<style>
${css}</style>
${body}
<!-- ===== Shared footer (copied from index.html) ===== -->
${footer}

<script>
${svcJs}
</script>
</body>
</html>
`;
}

const fill = (tpl, map) => tpl.replace(/\{\{([A-Z]+)\}\}/g, (m, k) => { if (!(k in map)) throw new Error('unknown placeholder ' + m); return map[k]; });

const featured = posts.find((p) => p.featured === 'yes' && !p.link) || posts.find((p) => !p.link);
const kinds = Object.keys(KIND).filter((k) => posts.some((p) => p.kind === k));
const feature = featured ? `
      <section class="dgb-feat" aria-labelledby="dgb-feat-t">
        <div>
          <span class="dgb-label">${esc(KIND[featured.kind].pick)} · ${esc(featured.topic)}</span>
          <h2 id="dgb-feat-t">${esc(featured.title)}</h2>
          <p>${esc(featured['feature-text'] || featured.lead || featured.excerpt)}</p>
          <a class="dgb-btn" href="${attr(featured.href)}">${esc(KIND[featured.kind].read)} ${ARROW}</a>
        </div>
${stage(featured, true).replace(/^ {8}/gm, '        ')}
      </section>` : '';
const filters = [`          <button type="button" data-filter="all" aria-pressed="true">Όλα</button>`]
  .concat(kinds.length > 1 ? kinds.map((k) => `          <button type="button" data-filter="${k}" aria-pressed="false">${esc(KIND[k].many)}</button>`) : []).join('\n');
const cards = posts.filter((p) => p !== featured).map((p) => card(p)).concat(featured ? [card(featured, true)] : []).join('\n\n');

const out = {};
out['blog.html'] = page({
  title: 'Ιδέες & Νέα | DigiGlow Media',
  desc: 'Οδηγοί για την επιχείρησή σας, ιστορίες από τα έργα μας και νέα της ομάδας DigiGlow Media',
  body: fill(read(path.join(SRC, 'archive.html')), { FEATURE: feature, FILTERS: filters, CARDS: cards })
});

const postTpl = read(path.join(SRC, 'post.html'));
for (const p of posts.filter((x) => !x.link)) {
  const k = KIND[p.kind];
  const secs = [...p.body.matchAll(/<section id="([^"]+)">\s*<h2>([\s\S]*?)<\/h2>/g)];
  if (!secs.length) throw new Error(`${p.slug}: the article needs at least one <section id="..."><h2>...</h2>`);
  const toc = secs.map((s) => `        <a href="#${s[1]}">${s[2].trim()}</a>`).join('\n');
  const take = p.take && p.take.length ? `      <aside class="dgb-take"><h2>Με μια ματιά</h2><ul>\n${p.take.map((t) => `        <li>${esc(t)}</li>`).join('\n')}\n      </ul></aside>\n` : '';
  const project = p['project-title'] ? `      <a class="dgb-project" href="${attr(p['project-href'] || 'projects.html')}"><img src="${attr(p['project-image'] || p.image)}" alt="" loading="lazy"${pos(p['project-image-position'])}><span><span class="dgb-label">Σχετικό έργο</span><b>${esc(p['project-title'])} ↗</b><span>${esc(p['project-text'] || '')}</span></span></a>` : '';
  const cta = p['cta-title'] ? `      <aside class="dgb-band"><span class="dgb-label">Το επόμενο βήμα</span><h2>${esc(p['cta-title'])}</h2><a class="dgb-btn" href="${attr(p['cta-href'] || 'contact.html')}">${esc(p['cta-button'] || 'Επικοινωνία')} ${ARROW}</a></aside>` : '';
  const others = posts.filter((x) => x !== p && !x.link).sort((x, y) => (y.kind === p.kind) - (x.kind === p.kind));
  const related = others.slice(0, 1).map((x) => `        <a href="${attr(x.href)}">${esc(x.title)} ${ARROW}</a>`).concat([`        <a href="blog.html">Όλα τα άρθρα ${ARROW}</a>`]).join('\n');
  const body = p.body.split('\n').map((l) => '      ' + l).join('\n');
  out[`blog-${p.slug}.html`] = page({
    title: `${p.title} | DigiGlow Media`,
    desc: p.lead || p.excerpt,
    body: '<!-- ===== Blog post ===== -->\n' + fill(postTpl, {
      LABEL: `${esc(k.one)} · ${esc(p.topic)}`, TITLE: esc(p.title), LEAD: esc(p.lead || p.excerpt),
      AUTHOR: esc(p.author || 'Συντακτική ομάδα DigiGlow Media'), DATE: fmtDate(p.date), READ: ((n) => `${n} ${n === 1 ? 'λεπτό' : 'λεπτά'}`)(readTime(p.body)),
      STAGE: stage(p, true), TOCNAME: k.tocName, TOCTITLE: k.toc, TOC: toc, TAKE: take, BODY: body,
      PROJECT: project, CTA: cta, RELATED: related
    })
  });
}

for (const f of fs.readdirSync(W)) {
  if (/^blog-.+\.html$/.test(f) && !out[f] && read(path.join(W, f)).includes('<!-- ===== Blog post ===== -->')) {
    fs.unlinkSync(path.join(W, f));
    console.log('removed old ' + f);
  }
}
for (const [f, html] of Object.entries(out)) {
  fs.writeFileSync(path.join(W, f), html);
  console.log(f, Math.round(html.length / 1024) + ' KB');
}
