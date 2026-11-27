const fs = require('fs');
const path = require('path');

const SRC = __dirname;
const W = path.resolve(SRC, '..');
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const { categories, hideProjects = [] } = require(path.join(SRC, 'content.js'));

const esc = (s) => String(s).replace(/&(?!amp;|lt;|gt;|quot;|#)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pad = (n) => String(n).padStart(2, '0');
const GO = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>';
const RIGHT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const fileOf = (p) => p.page || p.slug + '.html';
const ICONS = 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/';
const TOOLS = {
  'WordPress': ['wordpress', '#21759B'], 'WooCommerce': ['woocommerce', '#96588A'], 'HTML': ['html5', '#E34F26'], 'CSS': ['css3', '#1572B6'],
  'JavaScript': ['javascript', '#E2C400'], 'React': ['react', '#2FB8D9'], 'PHP': ['php', '#777BB4'], 'Python': ['python', '#3776AB'],
  'NodeJS': ['nodedotjs', '#5FA04E'], 'GSAP': ['greensock', '#6BA800'], 'ThreeJS': ['threedotjs', '#111111'], 'Figma': ['figma', '#F24E1E'],
  'Photoshop': ['adobephotoshop', '#31A8FF'], 'Illustrator': ['adobeillustrator', '#FF9A00'], 'ChatGPT': ['openai', '#412991'], 'Claude': ['claude', '#D97757'],
  'Google Analytics': ['googleanalytics', '#E37400'], 'Blender': ['blender', '#E87D0D'], 'After Effects': ['adobeaftereffects', '#9999FF'],
  'YouTube': ['youtube', '#FF0000'],
  'Meta': ['meta', '#0467DF'], 'Facebook': ['facebook', '#0866FF'], 'Instagram': ['instagram', '#FF0069'], 'TikTok': ['tiktok', '#111111'], 'LinkedIn': ['linkedin', '#0A66C2'],
  'Google Ads': ['googleads', '#4285F4'], 'Google Tag Manager': ['googletagmanager', '#246FDB'], 'Search Console': ['googlesearchconsole', '#458CF5'], 'Looker Studio': ['looker', '#4285F4'],
  'Semrush': ['semrush', '#FF642D'], 'Yoast SEO': ['yoast', '#A61E69'], 'Mailchimp': ['mailchimp', '#241C15'], 'Brevo': ['brevo', '#0B996E'], 'Canva': ['canva', '#00C4CC'],
  'Premiere Pro': ['adobepremierepro', '#9999FF'], 'Hotjar': ['hotjar', '#FF3C00'],
  'Lightroom': ['adobelightroom', '#31A8FF'], 'InDesign': ['adobeindesign', '#FF3366'], 'DaVinci Resolve': ['davinciresolve', '#233A51'], 'DJI': ['dji', '#111111'],
  'Sony': ['sony', '#111111'], 'OBS Studio': ['obsstudio', '#302E31'], 'Vimeo': ['vimeo', '#1AB7EA'], 'Eventbrite': ['eventbrite', '#F05537'],
  'Google Forms': ['googleforms', '#7248B9'], 'Google Sheets': ['googlesheets', '#34A853'], 'Notion': ['notion', '#111111'], 'Trello': ['trello', '#0052CC'],
  'Miro': ['miro', '#E2B800'], 'Zoom': ['zoom', '#0B5CFF'], 'Google Meet': ['googlemeet', '#00897B'], 'VS Code': ['https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/vscode/vscode-plain.svg', '#007ACC'],
  'Higgsfield': [svg('<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h8A2.5 2.5 0 0 1 17 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-8A2.5 2.5 0 0 1 4 17.5zM9 9.2v5.6l4.6-2.8zM19.5 3l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7zM20 14l.5 1.2 1.2.5-1.2.5-.5 1.2-.5-1.2-1.2-.5 1.2-.5z"/>'), '#111111'],
  'API Integrations': [svg('<path d="M8.5 3a3 3 0 0 0-3 3v3.2c0 .9-.6 1.6-1.5 1.8l-.9.2v1.6l.9.2c.9.2 1.5.9 1.5 1.8V18a3 3 0 0 0 3 3h1.5v-2.2H8.6a.9.9 0 0 1-.9-.9v-3.5c0-1.2-.6-2.2-1.6-2.4 1-.3 1.6-1.2 1.6-2.4V6.1c0-.5.4-.9.9-.9H10V3zm7 0H14v2.2h1.4c.5 0 .9.4.9.9v3.5c0 1.2.6 2.1 1.6 2.4-1 .2-1.6 1.2-1.6 2.4v3.5c0 .5-.4.9-.9.9H14V21h1.5a3 3 0 0 0 3-3v-3.2c0-.9.6-1.6 1.5-1.8l.9-.2v-1.6l-.9-.2c-.9-.2-1.5-.9-1.5-1.8V6a3 3 0 0 0-3-3zM10 11h1.6v1.8H10zm2.4 0H14v1.8h-1.6z"/>'), '#ff0785'],
  'SEO': [svg('<path d="M10.5 3a7.5 7.5 0 0 1 6 12l4.3 4.3-1.6 1.6-4.3-4.3A7.5 7.5 0 1 1 10.5 3zm0 2.2a5.3 5.3 0 1 0 0 10.6 5.3 5.3 0 0 0 0-10.6zM7.4 11.6h1.8v2.3H7.4zm2.6-2.3h1.8v4.6H10zm2.6-2.2h1.8v6.8h-1.8z"/>'), '#34A853'],
  'SQL': [svg('<path d="M12 3c-4.4 0-8 1.4-8 3.2v11.6C4 19.6 7.6 21 12 21s8-1.4 8-3.2V6.2C20 4.4 16.4 3 12 3zm0 1.9c3.6 0 6 1 6 1.4s-2.4 1.4-6 1.4-6-1-6-1.4 2.4-1.4 6-1.4zM6 8.6c1.5.7 3.6 1 6 1s4.5-.3 6-1V12c0 .4-2.4 1.4-6 1.4S6 12.4 6 12zm0 5.7c1.5.7 3.6 1 6 1s4.5-.3 6-1v3.5c0 .4-2.4 1.4-6 1.4s-6-1-6-1.4z"/>'), '#00758F']
};
function svg(inner) { return 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">' + inner + '</svg>'); }

const ICON = {
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.3-4.3"/>',
  edit: '<path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5 17z"/><path d="M14.5 7.5l2 2"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.2a4.2 4.2 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z"/>',
  chart: '<path d="M4 19l6-6 4 4 6.5-8"/><path d="M15 9h5.5v5.5"/>',
  code: '<path d="M8.5 8l-4.5 4 4.5 4M15.5 8l4.5 4-4.5 4M13.5 5.5l-3 13"/>',
  shield: '<path d="M12 3l7.5 3v5.3c0 4.6-3.2 8.4-7.5 9.7-4.3-1.3-7.5-5.1-7.5-9.7V6z"/><path d="M9 12l2.2 2.2L15.5 10"/>',
  bolt: '<path d="M13.5 2.5L5 13.5h6.5l-1 8 8.5-11h-6.5z"/>',
  users: '<circle cx="9" cy="8.5" r="3.2"/><path d="M3.5 19.5a5.5 5.5 0 0 1 11 0"/><circle cx="17" cy="9.5" r="2.6"/><path d="M15.6 14.3a4.6 4.6 0 0 1 5 5.2"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  star: '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 17l-5.2 2.7 1-5.9-4.3-4.1 5.9-.8z"/>'
};
const icon = (n) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON[n] || ICON.star}</svg>`;const pagesList = [];
for (const c of categories) {
  c.file = fileOf(c);
  for (const ch of c.children) {
    ch.parent = c;
    if (!ch.page) { ch.slug = c.slug + '-' + ch.slug; ch.file = ch.slug + '.html'; } else ch.file = ch.page;
  }
}

function syncMenu() {
  const file = path.join(W, 'index.html');
  let t = read(file);
  for (const c of categories) {
    const re = new RegExp('(<div class="dg-mega__list" id="dgMega-' + c.key + '">\\s*<ul>)[\\s\\S]*?(\\n\\s*</ul>)');
    if (!re.test(t)) throw new Error('mega menu list for ' + c.key + ' not found');
    const items = c.children.map((ch) => `\n                      <li><a href="${esc(ch.file)}" data-dg-svc-link="${ch.key}"><span data-en="${esc(ch.menuEn)}">${esc(ch.menuEl)}</span></a></li>`).join('');
    t = t.replace(re, (m, a, b) => a + items + b);
  }
  const keys = new Set();
  const hdr = [], ftr = [];
  for (const c of categories) {
    const contact = 'contact.html?service=' + c.contactService;
    hdr.push(`      ${JSON.stringify(c.key)}: { el: ${JSON.stringify(c.menuEl)}, en: ${JSON.stringify(c.menuEn)}, file: ${JSON.stringify(c.file)}, elSlug: ${JSON.stringify(c.slug)}, enSlug: ${JSON.stringify(c.slug + '-en')}, elContact: ${JSON.stringify(contact)}, enContact: ${JSON.stringify(contact)} }`);
    ftr.push(`    ${JSON.stringify(c.key)}: { elSlug: ${JSON.stringify(c.slug)}, enSlug: ${JSON.stringify(c.slug + '-en')}, file: ${JSON.stringify(c.file)}, contact: ${JSON.stringify(contact)} }`);
    keys.add(c.key);
    for (const ch of c.children) {
      if (ch.keepMap) continue;
      const slug = ch.elSlug || ch.slug;
      const cc = 'contact.html?service=' + (ch.contactService || c.contactService);
      hdr.push(`      ${JSON.stringify(ch.key)}: { el: ${JSON.stringify(ch.menuEl)}, en: ${JSON.stringify(ch.menuEn)}, file: ${JSON.stringify(ch.file)}, elSlug: ${JSON.stringify(slug)}, enSlug: ${JSON.stringify(slug + '-en')}, elContact: ${JSON.stringify(cc)}, enContact: ${JSON.stringify(cc)} }`);
      ftr.push(`    ${JSON.stringify(ch.key)}: { elSlug: ${JSON.stringify(slug)}, enSlug: ${JSON.stringify(slug + '-en')}, file: ${JSON.stringify(ch.file)}, contact: ${JSON.stringify(cc)} }`);
      keys.add(ch.key);
    }
  }
  const keyRe = (k) => new RegExp('^\\s*("' + k + '"|' + (/^[a-z]+$/.test(k) ? k : '"' + k + '"') + '):');
  const hs = t.indexOf('home: { el: "Αρχική"');
  if (hs < 0) throw new Error('header page map not found');
  const hOpen = t.lastIndexOf('const pages = {', hs), hClose = t.indexOf('\n    };', hs);
  let lines = t.slice(hOpen + 'const pages = {'.length, hClose).split('\n').filter((l) => l.trim() && ![...keys].some((k) => keyRe(k).test(l)));
  lines = lines.map((l) => l.replace(/,\s*$/, '')).concat(hdr);
  t = t.slice(0, hOpen) + 'const pages = {\n' + lines.join(',\n') + t.slice(hClose);
  const fp = t.indexOf('const key = link.dataset.dgFooterPage;');
  const fOpen = t.lastIndexOf('const pages = {', fp), fClose = t.indexOf('\n  };', fOpen);
  if (fOpen < 0 || fClose < 0 || fClose > fp) throw new Error('footer page map not found');
  let body = t.slice(fOpen + 'const pages = {'.length, fClose);
  for (const k of keys) body = body.replace(new RegExp('\\n\\s*' + (/^[a-z]+$/.test(k) ? '"?' + k + '"?' : '"' + k + '"') + ':\\s*\\{[^}]*\\},?', 'g'), '');
  body = body.replace(/,\s*$/, '') + ',\n' + ftr.join(',\n');
  t = t.slice(0, fOpen) + 'const pages = {' + body + t.slice(fClose);
  fs.writeFileSync(file, t);
}

function shell() {
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
  const a = all.indexOf('/* Υπηρεσίες pop-out toggle (header menu + footer) */');
  if (a < 0) throw new Error('services toggle script not found');
  const tb = all.indexOf('<button type="button" class="dg-top"');
  if (tb < 0) throw new Error('back to top button not found in index.html');
  const top = all.slice(tb, all.indexOf('</script>', tb) + 9);
  return {
    top,
    header, headerCss: L.slice(hdrCssStart, hdrCssEnd + 1).join('\n'), headerJs: L.slice(hdrJsStart, hdrJsEnd + 1).join('\n'),
    footer: L.slice(ftStart, ftEnd + 1).join('\n'), svcJs: all.slice(a, all.indexOf('})();', a) + 5)
  };
}

function projects() {
  const f = path.join(W, 'projects.html');
  if (!fs.existsSync(f)) return [];
  const t = read(f);
  return [...t.matchAll(/<article class="dgw-c[^"]*" data-c="([^"]*)"[^>]*>([\s\S]*?)<\/article>/g)].map((m) => {
    const h = m[2];
    const media = (h.match(/<div class="dgw-c__media[^"]*"([^>]*)>([\s\S]*?)<\/div>/) || [])[2] || '';
    const style = ((h.match(/<div class="dgw-c__media[^"]*"[^>]*style="([^"]*)"/) || [])[1]) || '';
    const title = (h.match(/<h2[^>]*>([\s\S]*?)<\/h2>/) || [])[1] || '';
    const eye = (h.match(/<p class="dgw-c__eye">([\s\S]*?)<\/p>/) || [])[1] || '';
    return { tags: m[1].split(/\s+/), media, style, title, eye, placeholder: /picsum\.photos/.test(media) };
  }).filter((p) => !p.placeholder && p.title && !hideProjects.some((n) => (p.title + ' ' + p.eye).toLowerCase().includes(n.toLowerCase())));
}

const crumbs = (list) => `<nav class="dgs-crumbs" aria-label="Διαδρομή">${list.map((x, i) => (i ? '<span aria-hidden="true">›</span>' : '') + (x.href ? `<a href="${esc(x.href)}">${esc(x.t)}</a>` : `<span aria-current="page">${esc(x.t)}</span>`)).join('')}</nav>`;

function hero(p, trail, eyebrow) {
  const chips = (p.hero.chips || []).slice(0, 3).map((c, i) => `<span class="dgs-chip dgs-chip--${i + 1}"><i></i>${esc(c)}</span>`).join('');
  return `  <section class="dgs-hero" data-dg-nav-theme="light">
    <div class="dgs-orbs" aria-hidden="true"><span class="dgs-orb dgs-orb--1"></span><span class="dgs-orb dgs-orb--2"></span><span class="dgs-orb dgs-orb--3"></span></div>
    <div class="dgs-wrap dgs-hero__in">
      <div data-dgs-reveal>
        ${crumbs(trail)}
        <p class="dgs-eye">${esc(eyebrow)}</p>
        <h1 class="dgs-h1">${esc(p.title)} <em>${esc(p.accent)}</em></h1>
        <p class="dgs-lead">${esc(p.lead)}</p>
        <div class="dgs-acts"><a class="dgs-btn" href="#dgs-form">Ζητήστε προσφορά ${RIGHT}</a><a class="dgs-btn dgs-btn--ghost" href="#dgs-next">${p.children ? 'Οι υπηρεσίες' : 'Τι περιλαμβάνει'}</a></div>
      </div>
      <figure class="dgs-art" aria-hidden="true" data-dgs-reveal style="--i:2">
        <div class="dgs-browser"><div class="dgs-browser__bar"><i></i><i></i><i></i></div><img src="${esc(p.hero.image)}" alt=""${p.hero.position ? ` style="object-position: ${esc(p.hero.position)}"` : ''} fetchpriority="high"></div>
        ${chips}
      </figure>
    </div>
  </section>`;
}

const head = (eye, h2, sub) => `      <header class="dgs-head" data-dgs-reveal><div><p class="dgs-eye">${esc(eye)}</p><h2 class="dgs-h2">${h2}</h2></div>${sub ? `<p>${esc(sub)}</p>` : ''}</header>`;

const SECTIONS = {
  services: (c) => `  <section class="dgs-sec" id="dgs-next" data-dg-nav-theme="light">
    <div class="dgs-wrap">
${head('Οι υπηρεσίες μας', `${esc(c.servicesTitle || 'Τι κάνουμε στο')} <em>${esc(c.menuEl)}</em>`)}
      <div class="dgs-cards">
${c.children.map((ch, i) => `        <a class="dgs-card" href="${esc(ch.file)}" data-dgs-reveal style="--i:${i}"><span class="dgs-go">${GO}</span><h3>${esc(ch.menuEl)}</h3><p>${esc(ch.short)}</p><ul class="dgs-tags">${(ch.tags || []).map((t) => `<li>${esc(t)}</li>`).join('')}</ul></a>`).join('\n')}
      </div>${c.children.some((ch) => ch.offers) ? `
      <div class="dgs-offers">
        <h3 class="dgs-offers__t" data-dgs-reveal>${esc(c.offersTitle || 'Αναλυτικά, τι μπορούμε να φτιάξουμε για εσάς')}</h3>
        <div class="dgs-offers__grid">
${c.children.filter((ch) => ch.offers).map((ch, i) => `          <div class="dgs-offer" data-dgs-reveal style="--i:${i}"><a class="dgs-offer__h" href="${esc(ch.file)}">${esc(ch.menuEl)} ${RIGHT}</a><ul>${ch.offers.map((o) => `<li>${esc(o)}</li>`).join('')}</ul></div>`).join('\n')}
        </div>
      </div>` : ''}
    </div>
  </section>`,
  includes: (p) => `  <section class="dgs-sec" id="dgs-next" data-dg-nav-theme="light">
    <div class="dgs-wrap">
${head('Τι περιλαμβάνει', `Όλα όσα <em>χρειάζεστε</em>`)}
      <div class="dgs-feats">
${p.includes.map((x, i) => `        <article class="dgs-feat" data-dgs-reveal style="--i:${i % 3}"><b class="dgs-feat__i">${icon('check')}</b><h3>${esc(x.t)}</h3><p>${esc(x.d)}</p></article>`).join('\n')}
      </div>
    </div>
  </section>`,
  benefits: (p) => `  <section class="dgs-sec">
    <div class="dgs-wrap">
${head('DigiGlow Media', esc(p.benefitsTitle || 'Γιατί να μας επιλέξετε'))}
      <div class="dgs-bens">
${p.benefits.map((b, i) => `        <div class="dgs-ben" data-dgs-reveal style="--i:${i}"><b class="dgs-ben__i">${icon(b.i)}</b><h3>${esc(b.t)}</h3><p>${esc(b.d)}</p></div>`).join('\n')}
      </div>
    </div>
  </section>`,
  steps: (p) => `  <section class="dgs-sec" data-dg-nav-theme="light">
    <div class="dgs-wrap">
${head('Η διαδικασία', `Πώς <em>δουλεύουμε</em>`)}
      <ol class="dgs-steps" style="--n:${p.steps.length}">
${p.steps.map((s, i) => `        <li class="dgs-step" data-dgs-reveal style="--i:${i}"><b>${pad(i + 1)}</b><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></li>`).join('\n')}
      </ol>
    </div>
  </section>`,
  tools: (p) => {
    const list = p.tools || (p.parent && p.parent.tools) || [];
    if (!list.length) return '';
    return `  <section class="dgs-sec" data-dg-nav-theme="light">
    <div class="dgs-wrap">
${head('Εργαλεία', `Με τι <em>δουλεύουμε</em>`)}
      <ul class="dgs-tools">
${list.map((n, i) => { const t = TOOLS[n]; if (!t) throw new Error('unknown tool ' + n + ', add it to TOOLS in build-services.js'); const u = /^(https?:|data:)/.test(t[0]) ? t[0] : ICONS + t[0] + '.svg'; return `        <li class="dgs-tool" style="--c:${t[1]};--u:url('${u}');--i:${i % 8}" data-dgs-reveal><i aria-hidden="true"></i><span>${esc(n)}</span></li>`; }).join('\n')}
      </ul>
    </div>
  </section>`;
  },
  projects: (p, ctx) => {
    const tag = p.projectTag || (p.parent && p.parent.projectTag);
    const plain = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
    const list = p.projects
      ? p.projects.map((n) => ctx.projects.find((x) => plain(x.title).includes(n.toLowerCase()) || plain(x.eye).includes(n.toLowerCase()))).filter(Boolean).slice(0, 3)
      : ctx.projects.map((x, i) => ({ x, i })).filter((o) => o.x.tags.includes(tag))
        .sort((a, b) => (a.x.tags[0] !== tag) - (b.x.tags[0] !== tag) || a.x.tags.length - b.x.tags.length || a.i - b.i)
        .map((o) => o.x).slice(0, 3);
    if (!list.length) return '';
    return `  <section class="dgs-sec" data-dg-nav-theme="light">
    <div class="dgs-wrap">
${head('Projects', `Projects που <em>μιλάνε</em>`)}
      <div class="dgs-projs">
${list.map((x, i) => `        <article class="dgs-proj" data-dg-nav-theme="dark" data-dgs-reveal style="--i:${i}"><div class="dgs-proj__m"${x.style ? ` style="${x.style}"` : ''}>${x.media.trim()}</div><a href="projects.html?f=${esc(tag)}"><small>${x.eye}</small><h3>${x.title}</h3></a></article>`).join('\n')}
      </div>
      <div class="dgs-more"><a class="dgs-btn dgs-btn--ghost" href="projects.html?f=${esc(tag)}">Όλα τα Projects ${RIGHT}</a></div>
    </div>
  </section>`;
  },
  siblings: (p) => {
    const c = p.parent;
    const sibs = c.children.filter((x) => x !== p);
    return `  <section class="dgs-sec" data-dg-nav-theme="light">
    <div class="dgs-wrap">
${head(c.menuEl, `Δείτε <em>επίσης</em>`)}
      <div class="dgs-sibs">
${sibs.map((x, i) => `        <a class="dgs-sib" href="${esc(x.file)}" data-dgs-reveal style="--i:${i}"><span><small>Υπηρεσία</small>${esc(x.menuEl)}</span>${RIGHT}</a>`).join('\n')}
        <a class="dgs-sib" href="${esc(c.file)}" data-dgs-reveal style="--i:${sibs.length}"><span><small>Όλη η κατηγορία</small>${esc(c.menuEl)}</span>${RIGHT}</a>
      </div>
    </div>
  </section>`;
  },
  faq: (p) => `  <section class="dgs-sec" data-dg-nav-theme="light">
    <div class="dgs-wrap dgs-faq">
${head('Συχνές ερωτήσεις', `Ό,τι πρέπει <em>να γνωρίζετε</em>`).replace('class="dgs-head"', 'class="dgs-head" style="margin:0"')}
      <div class="dgs-faq__list">
${p.faq.map((f, i) => `        <details data-dgs-reveal style="--i:${i}"${i === 0 ? ' open' : ''}><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('\n')}
      </div>
    </div>
  </section>`,
  cta: (p, ctx) => {
    const service = p.menuEl;
    const id = 'dgs-f-' + p.key;
    return `  <section class="dgs-sec" id="dgs-form">
    <div class="dgs-wrap">
      <div class="${ctx.dark ? '' : 'dgs-band '}dgs-cta" data-dg-nav-theme="dark" data-dgs-reveal>
        <div class="dgs-cta__txt">
          <p class="dgs-eye">Το επόμενο βήμα</p>
          <h2 class="dgs-h2">${esc(p.cta.title)}</h2>
          <p>${esc(p.cta.text)}</p>
          <ul class="dgs-cta__alt">
            <li><a href="contact.html?service=${esc(p.contactService || p.parent.contactService)}">Αναλυτικό brief ${RIGHT}</a></li>
          </ul>
        </div>
        <form class="dgs-form" data-dgs-form novalidate>
          <input type="hidden" name="service" value="${esc(service)}">
          <input type="hidden" name="page" value="${esc(p.file)}">
          <span class="dgs-form__svc">Υπηρεσία <b>${esc(service)}</b></span>
          <div class="dgs-form__grid">
            <label class="dgs-fld"><span>Ονοματεπώνυμο *</span><input type="text" name="name" autocomplete="name" required></label>
            <label class="dgs-fld"><span>Τηλέφωνο *</span><input type="tel" name="phone" autocomplete="tel" required></label>
            <label class="dgs-fld dgs-fld--full"><span>Email *</span><input type="email" name="email" autocomplete="email" required></label>
            <label class="dgs-fld dgs-fld--full"><span>Πείτε μας λίγα λόγια</span><textarea name="message" rows="3"></textarea></label>
          </div>
          <label class="dgs-consent"><input type="checkbox" name="consent" required><span>Συμφωνώ με την επεξεργασία των στοιχείων μου σύμφωνα με την <a href="/privacy-policy/">Πολιτική Απορρήτου</a> *</span></label>
          <label class="dgs-hp" aria-hidden="true">Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label>
          <div class="dgs-form__nav"><button type="submit" class="dgs-btn">${esc(p.cta.button)} ${RIGHT}</button><p class="dgs-form__err" role="alert" id="${id}-err"></p></div>
          <div class="dgs-form__done" hidden><svg viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24"/><path d="M15 27l7 7 15-16"/></svg><h3>Λάβαμε το μήνυμά σας</h3><p>Ευχαριστούμε, θα σας απαντήσουμε μέσα σε μία εργάσιμη ημέρα</p></div>
        </form>
      </div>
    </div>
  </section>`;
  }
};

const ORDER = { category: ['services', 'benefits', 'steps', 'tools', 'projects', 'faq', 'cta'], child: ['includes', 'benefits', 'steps', 'tools', 'projects', 'siblings', 'faq', 'cta'] };

function render(p, kind, ctx) {
  const order = (p.sections || ORDER[kind]).filter((s) => !(p.hide || []).includes(s));
  const c = kind === 'category' ? p : p.parent;
  const trail = [{ t: 'Αρχική', href: 'index.html' }, { t: 'Υπηρεσίες' }];
  if (kind === 'category') trail.push({ t: p.menuEl }); else trail.push({ t: c.menuEl, href: c.file }, { t: p.menuEl });
  trail[1].href = undefined;
  const parts = [hero(p, trail, kind === 'category' ? 'Υπηρεσίες' : c.menuEl)];
  let k = 0;
  for (const s of order) {
    if (!SECTIONS[s]) throw new Error('unknown section ' + s);
    ctx.dark = k % 2 === 0;
    const html = SECTIONS[s](p, ctx);
    if (!html) continue;
    parts.push(html.replace(/<section class="dgs-sec([^"]*)"([^>]*)>/, (m, cls, rest) => `<section class="dgs-sec${cls}${ctx.dark ? ' dgs-dark' : ''}"${rest.replace(/\s*data-dg-nav-theme="[^"]*"/, '')} data-dg-nav-theme="${ctx.dark ? 'dark' : 'light'}">`));
    k++;
  }
  return `<main class="dgs" style="--cat:${esc(c.color || '#ff0785')}">\n${parts.filter(Boolean).join('\n\n')}\n</main>`;
}

function page(sh, p, body) {
  const css = read(path.join(SRC, 'services.css')), js = read(path.join(SRC, 'services.js'));
  return `<!doctype html>
<html lang="el">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.seoTitle)}</title>
<meta name="description" content="${esc(p.seoDesc)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Manrope:wght@200..800&display=swap" rel="stylesheet">
<style>html{scroll-behavior:smooth}body{margin:0;background:#fffafb}</style>
</head>
<body>
<!-- ===== Shared header (copied from index.html) ===== -->
${sh.header}
${sh.headerCss}
${sh.headerJs}

<!-- ===== Service page ===== -->
<style>
${css}</style>
${body}

<!-- ===== Shared footer (copied from index.html) ===== -->
${sh.footer}

<script>
${sh.svcJs}
${js}</script>
${sh.top}
</body>
</html>
`;
}

syncMenu();
const sh = shell();
const ctx = { projects: projects() };
const out = {};
for (const c of categories) {
  out[c.file] = page(sh, c, render(c, 'category', ctx));
  for (const ch of c.children) if (!ch.page) out[ch.file] = page(sh, ch, render(ch, 'child', ctx));
}
for (const [f, html] of Object.entries(out)) {
  if (/[.!](?=<\/(p|h[1-3]|summary|li|small|span)>)/.test((html.match(/<main class="dgs"[\s\S]*?<\/main>/) || [''])[0])) console.log('note: ' + f + ' has a full stop at the end of a text');
  const words = ((html.match(/<main class="dgs"[\s\S]*?<\/main>/) || [''])[0]).replace(/<[^>]+>/g, '\n').split('\n').filter((l) => /[–—]|(?<!\d)-|-(?!\d)/.test(l));
  if (words.length) console.log('note: ' + f + ' has a dash in: ' + words.map((l) => l.trim()).join(' | '));
  fs.writeFileSync(path.join(W, f), html);
  console.log(f, Math.round(html.length / 1024) + ' KB');
}
console.log('menu and page links updated in index.html, now rebuild the other pages so they get the new menu');
