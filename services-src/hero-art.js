// Builds the three service hero illustrations as SVG files
const fs = require('fs');
const OUT = require('path').join(__dirname, '..', 'assets', 'services') + '/';
fs.mkdirSync(OUT, { recursive: true });

const PINK = '#ff0785', MAG = '#670033', YEL = '#e8e06a', BLUE = '#4fb3d9', GREEN = '#91b76b', INK = '#14090f';
const FONT = "Manrope, 'Segoe UI', Arial, sans-serif";
const r = (x, y, w, h, rx, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"${extra}/>`;
const t = (x, y, s, fill, txt, w = 700, extra = '') => `<text x="${x}" y="${y}" font-size="${s}" font-weight="${w}" fill="${fill}"${extra}>${txt}</text>`;
const wrap = (defs, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" font-family="${FONT}">
<defs>
<linearGradient id="pk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${PINK}"/><stop offset="1" stop-color="${MAG}"/></linearGradient>
<linearGradient id="dark" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0d070b"/><stop offset=".6" stop-color="#2a0618"/><stop offset="1" stop-color="${MAG}"/></linearGradient>
<radialGradient id="glow" cx=".78" cy=".22" r=".6"><stop offset="0" stop-color="${PINK}" stop-opacity=".5"/><stop offset="1" stop-color="${PINK}" stop-opacity="0"/></radialGradient>
<pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#fff" fill-opacity=".07"/></pattern>
<pattern id="dotsL" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="${MAG}" fill-opacity=".13"/></pattern>
<filter id="sh" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000" flood-opacity=".45"/></filter>
<filter id="shL" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="${MAG}" flood-opacity=".22"/></filter>
${defs}
</defs>
${body}
</svg>
`;
const check = (cx, cy, s, bg, fg) => `<circle cx="${cx}" cy="${cy}" r="${s}" fill="${bg}"/><path d="M${cx - s * .45} ${cy + s * .02}l${s * .3} ${s * .3} ${s * .55}-${s * .6}" fill="none" stroke="${fg}" stroke-width="${s * .28}" stroke-linecap="round" stroke-linejoin="round"/>`;

/* 1. Web Development: code editor turning into a live website and phone */
{
  const code = [
    [0, [[PINK, 34], [BLUE, 70], ['#fff', 40]]],
    [1, [[YEL, 52], ['#fff', 90]]],
    [2, [[BLUE, 44], [GREEN, 110]]],
    [2, [[BLUE, 60], [GREEN, 72]]],
    [1, [[YEL, 30], ['#fff', 50], [PINK, 40]]],
    [0, [[PINK, 40]]],
    [0, []],
    [0, [[PINK, 60], [YEL, 46], ['#fff', 30]]],
    [1, [[BLUE, 84], [GREEN, 56]]],
    [1, [[BLUE, 52], ['#fff', 66]]],
    [2, [[YEL, 70], [GREEN, 40]]],
    [1, [[PINK, 30]]],
    [0, [[PINK, 24]]],
  ];
  let lines = '';
  code.forEach(([ind, parts], i) => {
    const y = 132 + i * 19;
    lines += t(62, y + 7, 9, '#fff', String(i + 1), 600, ' fill-opacity=".25" text-anchor="end"');
    let x = 78 + ind * 18;
    parts.forEach(([c, w]) => { lines += r(x, y, w, 7, 3.5, c, c === '#fff' ? ' fill-opacity=".45"' : ' fill-opacity=".9"'); x += w + 7; });
  });
  const editor = `<g filter="url(#sh)">${r(36, 70, 330, 330, 16, '#1a0f16', ' stroke="#fff" stroke-opacity=".08"')}
${r(36, 70, 330, 36, 16, '#24141e')}${r(36, 90, 330, 16, 0, '#24141e')}
${r(48, 80, 92, 26, 8, '#1a0f16')}<circle cx="62" cy="93" r="4" fill="${PINK}"/>${t(72, 97, 11, '#fff', 'index html', 600, ' fill-opacity=".8"')}
${t(156, 97, 11, '#fff', 'style css', 600, ' fill-opacity=".35"')}${t(232, 97, 11, '#fff', 'app js', 600, ' fill-opacity=".35"')}
${lines}${r(78 + 18 * 2 + 77, 341, 2, 12, 1, PINK)}</g>`;

  const site = `<g filter="url(#sh)">${r(300, 128, 360, 268, 14, '#fff')}
${r(300, 128, 360, 34, 14, '#fbf3f7')}${r(300, 148, 360, 14, 0, '#fbf3f7')}
<circle cx="322" cy="145" r="8" fill="url(#pk)"/>${r(338, 141, 40, 8, 4, INK)}
${r(430, 142, 30, 6, 3, '#d9c8d1')}${r(470, 142, 30, 6, 3, '#d9c8d1')}${r(510, 142, 30, 6, 3, '#d9c8d1')}${r(592, 136, 52, 18, 9, 'url(#pk)')}
${r(322, 186, 150, 14, 7, INK)}${r(322, 206, 120, 14, 7, PINK)}${r(322, 230, 140, 6, 3, '#cdbfc6')}${r(322, 242, 110, 6, 3, '#cdbfc6')}
${r(322, 262, 70, 22, 11, 'url(#pk)')}${r(400, 262, 62, 22, 11, '#fff', ' stroke="#e3d3db"')}
${r(492, 178, 150, 112, 12, 'url(#hero)')}<circle cx="612" cy="204" r="18" fill="${YEL}"/><path d="M492 290l46-50 30 28 26-22 48 44z" fill="#fff" fill-opacity=".28"/>
${[0, 1, 2].map((k) => `${r(322 + k * 110, 308, 98, 72, 10, '#f7eef2')}${r(330 + k * 110, 316, 82, 34, 7, k === 1 ? YEL : k === 2 ? BLUE : PINK, ' fill-opacity=".75"')}${r(330 + k * 110, 358, 54, 6, 3, INK, ' fill-opacity=".7"')}${r(330 + k * 110, 368, 34, 5, 2.5, '#cdbfc6')}`).join('')}</g>`;

  const phone = `<g filter="url(#sh)">${r(632, 196, 128, 250, 24, '#120a10')}${r(640, 204, 112, 234, 18, '#fff')}${r(676, 210, 40, 8, 4, '#120a10')}
${r(650, 228, 92, 70, 10, 'url(#hero)')}<circle cx="720" cy="246" r="9" fill="${YEL}"/>
${r(650, 308, 70, 9, 4.5, INK)}${r(650, 322, 86, 5, 2.5, '#cdbfc6')}${r(650, 332, 64, 5, 2.5, '#cdbfc6')}${r(650, 346, 54, 18, 9, 'url(#pk)')}
${r(650, 376, 42, 42, 8, '#f7eef2')}${r(700, 376, 42, 42, 8, '#f7eef2')}${r(656, 382, 30, 20, 5, PINK, ' fill-opacity=".7"')}${r(706, 382, 30, 20, 5, BLUE, ' fill-opacity=".7"')}</g>`;

  const score = `<g filter="url(#sh)">${r(372, 410, 178, 58, 29, '#fff')}
<circle cx="402" cy="439" r="19" fill="none" stroke="#e8f3df" stroke-width="5"/><circle cx="402" cy="439" r="19" fill="none" stroke="#3aa35b" stroke-width="5" stroke-linecap="round" stroke-dasharray="119.4" transform="rotate(-90 402 439)"/>
${t(402, 443.5, 12, '#1d6b35', '100', 800, ' text-anchor="middle"')}${t(430, 435, 12, INK, 'Performance', 800)}${t(430, 451, 10.5, '#8a7a83', 'PageSpeed score', 600)}</g>`;

  const tag = `<g filter="url(#sh)" transform="rotate(-8 560 92)">${r(530, 66, 62, 52, 14, YEL)}<path d="M550 82l-9 10 9 10M572 82l9 10-9 10M564 80l-6 24" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></g>`;

  const svg = wrap(`<linearGradient id="hero" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${PINK}"/><stop offset=".55" stop-color="#b8005e"/><stop offset="1" stop-color="${MAG}"/></linearGradient>`,
    `${r(0, 0, 800, 500, 0, 'url(#dark)')}${r(0, 0, 800, 500, 0, 'url(#glow)')}${r(0, 0, 800, 500, 0, 'url(#dots)')}
<path d="M366 236 C 380 236, 384 236, 300 236" stroke="${PINK}" stroke-width="0"/>
${editor}${site}${phone}${score}${tag}`);
  fs.writeFileSync(OUT + 'web-development.svg', svg);
}

/* 2. UX/UI Design: design canvas with a wireframe turning into the final screen */
{
  const layers = ['Home', 'Header', 'Hero', 'Κουμπιά', 'Cards', 'Footer'];
  const panel = `${r(0, 0, 150, 500, 0, '#fff')}${r(150, 0, 1, 500, 0, '#ecdfe6')}
${t(20, 34, 10, '#8a7a83', 'LAYERS', 800, ' letter-spacing="1.5"')}
${layers.map((l, i) => `${i === 2 ? r(10, 48 + i * 30, 130, 26, 7, '#ffe3f1') : ''}${r(22 + (i ? 10 : 0), 57 + i * 30, 10, 8, 2, i === 2 ? PINK : '#b9a8b1')}${t(40 + (i ? 10 : 0), 65 + i * 30, 11.5, i === 2 ? PINK : INK, l, i === 2 ? 800 : 600)}`).join('')}
${t(20, 268, 10, '#8a7a83', 'ΧΡΩΜΑΤΑ', 800, ' letter-spacing="1.5"')}
${[PINK, MAG, YEL, INK].map((c, i) => `<circle cx="${32 + i * 30}" cy="292" r="11" fill="${c}"/>`).join('')}
${t(20, 340, 10, '#8a7a83', 'ΤΥΠΟΓΡΑΦΙΑ', 800, ' letter-spacing="1.5"')}${t(20, 384, 38, INK, 'Aa', 800)}${t(76, 372, 11, INK, 'Manrope', 800)}${t(76, 388, 10.5, '#8a7a83', 'Bold 800', 600)}
${t(20, 430, 10, '#8a7a83', 'GRID', 800, ' letter-spacing="1.5"')}${[0, 1, 2, 3].map((k) => r(20 + k * 29, 442, 24, 34, 4, PINK, ' fill-opacity=".14"')).join('')}`;

  const wire = `<g filter="url(#shL)">${r(196, 92, 178, 330, 18, '#fff', ' stroke="#e3d3db"')}
${t(196, 80, 11, '#8a7a83', 'Wireframe', 700)}
${r(212, 110, 146, 14, 4, '#e9e0e5')}${r(212, 136, 146, 92, 8, '#f1eaee')}<path d="M212 136l146 92M358 136l-146 92" stroke="#ddd0d7" stroke-width="1.5"/>
${r(212, 242, 110, 10, 5, '#d5c6ce')}${r(212, 260, 140, 7, 3.5, '#e5dbe0')}${r(212, 273, 120, 7, 3.5, '#e5dbe0')}${r(212, 292, 64, 22, 11, '#d5c6ce')}
${r(212, 330, 68, 76, 8, '#f1eaee')}${r(290, 330, 68, 76, 8, '#f1eaee')}</g>`;

  const final = `<g filter="url(#shL)">${r(470, 70, 196, 372, 22, '#fff')}
${t(470, 58, 11, '#8a7a83', 'Τελικό design', 700)}
${r(470, 70, 196, 190, 22, 'url(#hero)')}${r(470, 240, 196, 20, 0, 'url(#hero)')}
<circle cx="492" cy="96" r="8" fill="#fff"/>${r(506, 92, 40, 8, 4, '#fff', ' fill-opacity=".85"')}${r(624, 90, 24, 3, 1.5, '#fff')}${r(624, 97, 24, 3, 1.5, '#fff')}
${r(490, 140, 120, 15, 7.5, '#fff')}${r(490, 162, 96, 15, 7.5, YEL)}${r(490, 186, 140, 6, 3, '#fff', ' fill-opacity=".6"')}${r(490, 198, 118, 6, 3, '#fff', ' fill-opacity=".6"')}
${r(490, 218, 76, 26, 13, '#fff')}${r(504, 228, 48, 6, 3, PINK)}
${r(486, 276, 80, 88, 12, '#fbf0f5')}${r(574, 276, 80, 88, 12, '#fbf0f5')}${r(494, 284, 64, 44, 8, PINK, ' fill-opacity=".8"')}${r(582, 284, 64, 44, 8, BLUE, ' fill-opacity=".8"')}
${r(494, 336, 50, 7, 3.5, INK)}${r(582, 336, 50, 7, 3.5, INK)}${r(494, 348, 34, 6, 3, '#cdbfc6')}${r(582, 348, 34, 6, 3, '#cdbfc6')}
${r(486, 378, 168, 46, 12, INK)}${r(500, 392, 70, 7, 3.5, '#fff')}${r(500, 405, 50, 6, 3, '#fff', ' fill-opacity=".45"')}<circle cx="632" cy="401" r="12" fill="${PINK}"/><path d="M627 401h10m-4-4 4 4-4 4" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
<rect x="468" y="68" width="200" height="376" rx="24" fill="none" stroke="#2f8cff" stroke-width="1.6"/>
${[[468, 68], [668, 68], [468, 444], [668, 444]].map(([x, y]) => r(x - 4, y - 4, 8, 8, 1, '#fff', ' stroke="#2f8cff" stroke-width="1.6"')).join('')}`;

  const flow = `<path d="M374 250 C 420 250, 420 200, 462 200" fill="none" stroke="${PINK}" stroke-width="2.4" stroke-dasharray="6 5"/><circle cx="374" cy="250" r="5" fill="${PINK}"/><path d="M455 194l9 6-9 6" fill="none" stroke="${PINK}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;

  const cursor = `<g filter="url(#shL)" transform="translate(690 300)"><path d="M0 0l0 26 7-7 6 13 6-3-6-12 10 0z" fill="${PINK}" stroke="#fff" stroke-width="2" stroke-linejoin="round"/>${r(14, 30, 72, 24, 12, PINK)}${t(50, 46, 11, '#fff', 'Designer', 800, ' text-anchor="middle"')}</g>`;
  const swatch = `<g filter="url(#shL)" transform="rotate(6 726 140)">${r(694, 104, 70, 76, 14, '#fff')}${r(702, 112, 54, 40, 9, YEL)}${r(702, 160, 34, 6, 3, INK)}${r(702, 170, 22, 5, 2.5, '#cdbfc6')}</g>`;

  const svg = wrap(`<linearGradient id="hero" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${PINK}"/><stop offset="1" stop-color="${MAG}"/></linearGradient>`,
    `${r(0, 0, 800, 500, 0, '#f6eff3')}${r(0, 0, 800, 500, 0, 'url(#dotsL)')}${panel}${wire}${flow}${final}${swatch}${cursor}`);
  fs.writeFileSync(OUT + 'ux-ui-design.svg', svg);
}

/* 3. Support & Maintenance: website health dashboard */
{
  const stat = (x, label, value, color, icon) => `<g filter="url(#sh)">${r(x, 62, 168, 92, 16, '#1d1119', ' stroke="#fff" stroke-opacity=".07"')}
${r(x + 16, 78, 34, 34, 10, color)}${icon(x + 33, 95)}
${t(x + 16, 134, 11, '#fff', label, 700, ' fill-opacity=".5"')}${t(x + 62, 101, 20, '#fff', value, 800)}</g>`;
  const iShield = (cx, cy) => `<path d="M${cx} ${cy - 10}l9 3.5v6c0 5.5-3.8 9.5-9 11-5.2-1.5-9-5.5-9-11v-6z" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/><path d="M${cx - 4} ${cy + 1}l3 3 5-6" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
  const iPulse = (cx, cy) => `<path d="M${cx - 11} ${cy}h5l3-7 5 14 3-7h6" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
  const iCloud = (cx, cy) => `<path d="M${cx - 8} ${cy + 7}h15a6 6 0 0 0 0-12 8 8 0 0 0-15 2 5 5 0 0 0 0 10z" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/><path d="M${cx} ${cy + 3}v-7m-3 3 3-3 3 3" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;

  const pts = [[0, 70], [40, 62], [80, 66], [120, 48], [160, 54], [200, 36], [240, 42], [280, 26], [320, 30], [360, 18]];
  const path = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${70 + x} ${210 + y}`).join(' ');
  const chart = `<g filter="url(#sh)">${r(44, 172, 410, 280, 18, '#1d1119', ' stroke="#fff" stroke-opacity=".07"')}
${t(64, 204, 13, '#fff', 'Ταχύτητα website', 800)}${r(352, 188, 86, 24, 12, '#3aa35b', ' fill-opacity=".18"')}<circle cx="366" cy="200" r="4" fill="#5fd38a"/>${t(376, 204, 11, '#5fd38a', 'Online', 800)}
${[0, 1, 2, 3].map((k) => r(70, 232 + k * 46, 362, 1, 0, '#fff', ' fill-opacity=".06"')).join('')}
<path d="${path} L430 420 L70 420 Z" fill="url(#area)"/><path d="${path}" fill="none" stroke="${PINK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
${pts.filter((_, i) => i % 3 === 0 || i === pts.length - 1).map(([x, y]) => `<circle cx="${70 + x}" cy="${210 + y}" r="4.5" fill="#1d1119" stroke="${PINK}" stroke-width="2.5"/>`).join('')}</g>`;

  const rows = [['WordPress', 1], ['WooCommerce', 1], ['Plugins', 1], ['Theme', .72]];
  const list = `<g filter="url(#sh)">${r(472, 172, 288, 280, 18, '#1d1119', ' stroke="#fff" stroke-opacity=".07"')}
${t(492, 204, 13, '#fff', 'Ενημερώσεις', 800)}
${rows.map(([n, p], i) => { const y = 232 + i * 52; return `${r(492, y, 248, 40, 11, '#fff', ' fill-opacity=".04"')}${t(506, y + 18, 12, '#fff', n, 700, ' fill-opacity=".9"')}${r(506, y + 26, 160, 5, 2.5, '#fff', ' fill-opacity=".1"')}${r(506, y + 26, 160 * p, 5, 2.5, p === 1 ? '#5fd38a' : YEL)}${p === 1 ? check(716, y + 20, 11, '#3aa35b', '#fff') : `<circle cx="716" cy="${y + 20}" r="11" fill="none" stroke="${YEL}" stroke-width="3" stroke-dasharray="48 21" />`}`; }).join('')}
${r(492, 418, 248, 2, 1, '#fff', ' fill-opacity="0"')}</g>`;

  const svg = wrap(`<linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${PINK}" stop-opacity=".45"/><stop offset="1" stop-color="${PINK}" stop-opacity="0"/></linearGradient>`,
    `${r(0, 0, 800, 500, 0, 'url(#dark)')}${r(0, 0, 800, 500, 0, 'url(#glow)')}${r(0, 0, 800, 500, 0, 'url(#dots)')}
${stat(44, 'Uptime', '100%', 'url(#pk)', iPulse)}${stat(232, 'SSL', 'Ενεργό', YEL, iShield)}${stat(420, 'Backups', 'Σήμερα', BLUE, iCloud)}
<g filter="url(#sh)">${r(608, 62, 152, 92, 16, 'url(#pk)')}${check(640, 94, 15, '#fff', PINK)}${t(624, 136, 12, '#fff', 'Όλα λειτουργούν', 800)}</g>
${chart}${list}`);
  fs.writeFileSync(OUT + 'support-maintenance.svg', svg);
}
const HERO = `<linearGradient id="hero" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${PINK}"/><stop offset=".55" stop-color="#b8005e"/><stop offset="1" stop-color="${MAG}"/></linearGradient>`;
const BG = `${r(0, 0, 800, 500, 0, 'url(#dark)')}${r(0, 0, 800, 500, 0, 'url(#glow)')}${r(0, 0, 800, 500, 0, 'url(#dots)')}`;
const card = (x, y, w, h, fill = '#1d1119') => r(x, y, w, h, 16, fill, fill === '#1d1119' ? ' stroke="#fff" stroke-opacity=".07"' : '');
const heartP = (x, y, s, fill) => `<path transform="translate(${x} ${y}) scale(${s})" d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.2a4.2 4.2 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z" fill="${fill}"/>`;
const mag = (x, y, c) => `<circle cx="${x}" cy="${y}" r="6" fill="none" stroke="${c}" stroke-width="2.6"/><path d="M${x + 4.5} ${y + 4.5}l5 5" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/>`;

/* 4. Digital Marketing: social post surrounded by ads, search and email results */
{
  const phone = `<g filter="url(#sh)">${r(298, 62, 176, 352, 28, '#120a10')}${r(306, 70, 160, 336, 21, '#fff')}${r(366, 76, 40, 8, 4, '#120a10')}
<circle cx="326" cy="106" r="11" fill="url(#pk)"/>${r(344, 99, 60, 7, 3.5, INK)}${r(344, 110, 38, 5, 2.5, '#cdbfc6')}
${r(314, 126, 144, 150, 12, 'url(#hero)')}<circle cx="420" cy="160" r="20" fill="${YEL}"/><path d="M314 262l44-46 30 30 24-20 46 40v4a12 12 0 0 1-12 12H326a12 12 0 0 1-12-12z" fill="#fff" fill-opacity=".25"/>
${heartP(316, 282, 1.1, PINK)}<circle cx="354" cy="295" r="8" fill="none" stroke="${INK}" stroke-width="2.4"/><path d="M372 289l14 6-14 6z" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>
${r(318, 314, 90, 7, 3.5, INK)}${r(318, 328, 134, 5, 2.5, '#cdbfc6')}${r(318, 338, 112, 5, 2.5, '#cdbfc6')}
${r(318, 356, 136, 38, 10, '#fbf0f5')}<circle cx="334" cy="375" r="8" fill="${YEL}"/>${r(348, 368, 70, 6, 3, INK, ' fill-opacity=".7"')}${r(348, 378, 50, 5, 2.5, '#cdbfc6')}</g>`;

  const bars = [34, 46, 40, 62, 58, 80, 96];
  const ads = `<g filter="url(#sh)">${card(40, 96, 230, 170)}${t(58, 124, 12, '#fff', 'Καμπάνιες', 700, ' fill-opacity=".6"')}${t(58, 152, 24, '#fff', '+38%', 800)}
${r(176, 108, 78, 22, 11, '#3aa35b', ' fill-opacity=".18"')}<path d="M190 124l6-7 5 4 7-8" fill="none" stroke="#5fd38a" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>${t(214, 124, 11, '#5fd38a', 'ROAS', 800)}
${bars.map((h, i) => r(60 + i * 28, 250 - h, 18, h, 5, i === bars.length - 1 ? 'url(#pk)' : PINK, i === bars.length - 1 ? '' : ` fill-opacity="${.25 + i * .07}"`)).join('')}</g>`;

  const search = `<g filter="url(#sh)">${card(60, 292, 222, 120, '#fff')}${r(76, 306, 190, 30, 15, '#f6eff3')}${mag(94, 319, PINK)}${r(112, 317, 96, 6, 3, INK, ' fill-opacity=".6"')}
<circle cx="88" cy="364" r="12" fill="url(#pk)"/>${t(88, 368.5, 12, '#fff', '1', 800, ' text-anchor="middle"')}${r(108, 352, 120, 8, 4, PINK)}${r(108, 366, 80, 5, 2.5, '#3aa35b', ' fill-opacity=".7"')}${r(108, 378, 150, 5, 2.5, '#cdbfc6')}${r(108, 390, 120, 5, 2.5, '#cdbfc6')}</g>`;

  const mail = `<g filter="url(#sh)">${card(506, 84, 246, 120, '#fff')}${r(524, 102, 42, 42, 12, YEL)}<path d="M533 115h24v17h-24zM533 116l12 9 12-9" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>
${r(580, 108, 120, 8, 4, INK)}${r(580, 124, 150, 5, 2.5, '#cdbfc6')}${r(580, 134, 110, 5, 2.5, '#cdbfc6')}
${r(524, 160, 210, 6, 3, '#f1e6ec')}${r(524, 160, 120, 6, 3, 'url(#pk)')}${t(524, 188, 11, '#8a7a83', 'Ανοίγματα', 700)}${t(734, 188, 12, INK, '52%', 800, ' text-anchor="end"')}</g>`;

  const likes = `<g filter="url(#sh)">${r(520, 238, 168, 50, 25, 'url(#pk)')}<circle cx="546" cy="263" r="15" fill="#fff"/>${heartP(536.5, 253.5, .8, PINK)}${t(570, 269, 15, '#fff', '+1 248', 800)}</g>
<g filter="url(#sh)">${r(560, 310, 192, 54, 16, '#fff')}${check(588, 337, 13, '#3aa35b', '#fff')}${t(610, 333, 12, INK, 'Νέα παραγγελία', 800)}${t(610, 349, 10.5, '#8a7a83', 'από Instagram', 600)}</g>
<g filter="url(#sh)">${r(540, 388, 150, 46, 23, '#1d1119', ' stroke="#fff" stroke-opacity=".1"')}<circle cx="564" cy="411" r="13" fill="${BLUE}"/><path d="M558 411h12M564 405v12" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>${t(584, 416, 12.5, '#fff', '326 followers', 800)}</g>`;

  const floaty = `${heartP(470, 70, 1, PINK)}${heartP(250, 60, .7, YEL)}${heartP(486, 430, .8, '#fff')}`;
  fs.writeFileSync(OUT + 'digital-marketing.svg', wrap(HERO, `${BG}${ads}${search}${phone}${mail}${likes}${floaty}`));
}

/* 5. Google/Meta Ads: campaign results with a search ad and a social ad */
{
  const kpi = (x, label, value, color) => `<g filter="url(#sh)">${card(x, 52, 176, 88)}<circle cx="${x + 24}" cy="78" r="6" fill="${color}"/>${t(x + 38, 82, 11, '#fff', label, 700, ' fill-opacity=".55"')}${t(x + 18, 120, 26, '#fff', value, 800)}</g>`;
  const pairs = [[30, 40], [38, 52], [34, 60], [52, 70], [48, 84], [66, 96], [74, 118]];
  const chart = `<g filter="url(#sh)">${card(40, 160, 432, 296)}${t(60, 192, 13, '#fff', 'Πωλήσεις από διαφημίσεις', 800)}
<circle cx="340" cy="187" r="5" fill="${BLUE}"/>${t(350, 191, 11, '#fff', 'Google', 700, ' fill-opacity=".7"')}<circle cx="408" cy="187" r="5" fill="${PINK}"/>${t(418, 191, 11, '#fff', 'Meta', 700, ' fill-opacity=".7"')}
${[0, 1, 2, 3].map((k) => r(60, 236 + k * 50, 392, 1, 0, '#fff', ' fill-opacity=".06"')).join('')}
${pairs.map(([g, m], i) => { const x = 72 + i * 54; return `${r(x, 420 - g * 1.4, 16, g * 1.4, 5, BLUE)}${r(x + 20, 420 - m * 1.6, 16, m * 1.6, 5, i === pairs.length - 1 ? 'url(#pk)' : PINK)}`; }).join('')}
${r(60, 424, 392, 1, 0, '#fff', ' fill-opacity=".12"')}</g>`;
  const gad = `<g filter="url(#sh)">${card(492, 160, 268, 128, '#fff')}${r(510, 176, 232, 26, 13, '#f6eff3')}${mag(526, 189, BLUE)}${r(542, 186, 110, 6, 3, INK, ' fill-opacity=".55"')}
${t(510, 224, 10.5, INK, 'Χορηγούμενο', 800)}${r(584, 216, 90, 6, 3, '#3aa35b', ' fill-opacity=".6"')}${r(510, 234, 190, 10, 5, '#1a5fd0')}${r(510, 252, 220, 5, 2.5, '#cdbfc6')}${r(510, 263, 170, 5, 2.5, '#cdbfc6')}</g>`;
  const mad = `<g filter="url(#sh)">${card(492, 304, 268, 152, '#fff')}<circle cx="514" cy="324" r="10" fill="url(#pk)"/>${r(530, 316, 70, 6, 3, INK)}${t(530, 336, 9.5, '#8a7a83', 'Χορηγούμενο', 700)}
${r(506, 346, 240, 66, 10, 'url(#hero)')}<circle cx="712" cy="368" r="13" fill="${YEL}"/><path d="M506 404l52-34 34 24 28-16 52 30z" fill="#fff" fill-opacity=".25"/>
${r(506, 424, 150, 7, 3.5, INK, ' fill-opacity=".7"')}${r(666, 418, 80, 26, 13, 'url(#pk)')}${t(706, 435, 10.5, '#fff', 'Αγορά τώρα', 800, ' text-anchor="middle"')}</g>`;
  const live = `<g filter="url(#sh)">${r(604, 52, 156, 88, 16, 'url(#pk)')}<circle cx="626" cy="78" r="6" fill="#5fd38a"/><circle cx="626" cy="78" r="11" fill="#5fd38a" fill-opacity=".3"/>${t(642, 82, 11, '#fff', 'Ενεργή καμπάνια', 800)}${t(622, 120, 22, '#fff', '24/7', 800)}</g>`;
  fs.writeFileSync(OUT + 'google-meta-ads.svg', wrap(HERO, `${BG}${kpi(40, 'ROAS', '4,6x', YEL)}${kpi(228, 'Conversions', '312', '#5fd38a')}${kpi(416, 'Κόστος κλικ', '0,42€', BLUE)}${live}${chart}${gad}${mad}`));
}

/* 6. SEO: search results with the first place highlighted, ranking chart and local map */
{
  const res = (y, top) => top
    ? `${r(80, y, 430, 82, 14, '#ffe3f1', ` stroke="${PINK}" stroke-width="1.6"`)}<circle cx="106" cy="${y + 41}" r="15" fill="url(#pk)"/>${t(106, y + 46.5, 15, '#fff', '1', 800, ' text-anchor="middle"')}
${r(134, y + 18, 120, 6, 3, '#3aa35b', ' fill-opacity=".7"')}${r(134, y + 32, 230, 11, 5.5, PINK)}${r(134, y + 52, 340, 6, 3, '#b9a8b1')}${r(134, y + 64, 260, 6, 3, '#b9a8b1')}`
    : `${r(134, y + 4, 110, 6, 3, '#3aa35b', ' fill-opacity=".45"')}${r(134, y + 18, 200, 10, 5, '#d9c8d1')}${r(134, y + 36, 330, 6, 3, '#e5dbe0')}${r(134, y + 48, 250, 6, 3, '#e5dbe0')}<circle cx="106" cy="${y + 26}" r="12" fill="#f1e6ec"/>`;
  const serp = `<g filter="url(#shL)">${r(56, 52, 478, 396, 20, '#fff')}${r(80, 74, 430, 44, 22, '#f6eff3')}${mag(104, 96, PINK)}${r(124, 93, 150, 7, 3.5, INK, ' fill-opacity=".7"')}<path d="M488 88v16" stroke="${PINK}" stroke-width="2"/>
${r(80, 132, 60, 6, 3, PINK)}${r(150, 132, 40, 6, 3, '#d9c8d1')}${r(200, 132, 40, 6, 3, '#d9c8d1')}${r(80, 144, 430, 1, 0, '#ecdfe6')}
${res(160, true)}${res(262)}${res(340)}</g>`;
  const pts = [[0, 92], [30, 84], [60, 88], [90, 64], [120, 58], [150, 34], [176, 14]];
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${572 + x} ${118 + y}`).join(' ');
  const rank = `<g filter="url(#shL)">${r(556, 52, 208, 182, 18, '#fff')}${t(576, 80, 12, INK, 'Θέσεις στην Google', 800)}
${r(708, 94, 40, 24, 12, YEL)}${t(728, 110.5, 12, INK, '#1', 800, ' text-anchor="middle"')}
<path d="${line} L748 214 L572 214 Z" fill="url(#area)"/><path d="${line}" fill="none" stroke="${PINK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="748" cy="132" r="5.5" fill="#fff" stroke="${PINK}" stroke-width="3"/></g>`;
  const star = (x, y) => `<path transform="translate(${x} ${y}) scale(.62)" d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 17l-5.2 2.7 1-5.9-4.3-4.1 5.9-.8z" fill="${YEL}" stroke="#c9bf3c" stroke-width="1"/>`;
  const map = `<g filter="url(#shL)">${r(556, 252, 208, 196, 18, '#fff')}<clipPath id="mc"><rect x="566" y="262" width="188" height="112" rx="12"/></clipPath>
<g clip-path="url(#mc)">${r(566, 262, 188, 112, 0, '#eef3e8')}<path d="M560 330 C 620 300, 660 350, 760 300M600 262v120M690 262l-40 120M560 290h200" stroke="#fff" stroke-width="9" fill="none"/><path d="M560 352c40-6 70 10 110 0s60-10 90 0" stroke="${BLUE}" stroke-opacity=".35" stroke-width="10" fill="none"/></g>
<path d="M660 340c-14-14-22-24-22-35a22 22 0 0 1 44 0c0 11-8 21-22 35z" fill="url(#pk)" stroke="#fff" stroke-width="2.5"/><circle cx="660" cy="305" r="8" fill="#fff"/>
${r(576, 388, 110, 7, 3.5, INK)}${[0, 1, 2, 3, 4].map((k) => star(574 + k * 16, 402)).join('')}${t(662, 416, 12, INK, '4,9', 800)}</g>`;
  fs.writeFileSync(OUT + 'seo.svg', wrap(`<linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${PINK}" stop-opacity=".3"/><stop offset="1" stop-color="${PINK}" stop-opacity="0"/></linearGradient>`,
    `${r(0, 0, 800, 500, 0, '#f6eff3')}${r(0, 0, 800, 500, 0, 'url(#dotsL)')}${serp}${rank}${map}`));
}

/* 7. Email Marketing: inbox, a designed newsletter and an automation flow */
{
  const cols = [PINK, YEL, BLUE, GREEN, '#fff'];
  const inbox = `<g filter="url(#sh)">${card(36, 52, 232, 404)}${t(56, 84, 13, '#fff', 'Εισερχόμενα', 800)}${r(208, 68, 42, 22, 11, PINK)}${t(229, 83.5, 11, '#fff', '12', 800, ' text-anchor="middle"')}
${cols.map((c, i) => { const y = 106 + i * 68; const on = i === 0; return `${r(48, y, 208, 58, 12, on ? PINK : '#fff', on ? ' fill-opacity=".18"' : ' fill-opacity=".04"')}<circle cx="72" cy="${y + 29}" r="13" fill="${c}"${c === '#fff' ? ' fill-opacity=".5"' : ''}/>${r(94, y + 16, on ? 96 : 80, 7, 3.5, '#fff', on ? '' : ' fill-opacity=".75"')}${r(94, y + 30, 140, 5, 2.5, '#fff', ' fill-opacity=".3"')}${r(94, y + 40, 110, 5, 2.5, '#fff', ' fill-opacity=".2"')}${on ? `<circle cx="240" cy="${y + 19}" r="5" fill="${PINK}"/>` : ''}`; }).join('')}</g>`;
  const mail = `<g filter="url(#sh)">${r(286, 52, 252, 404, 18, '#fff')}<clipPath id="ec"><rect x="286" y="52" width="252" height="404" rx="18"/></clipPath>
<g clip-path="url(#ec)">${r(286, 52, 252, 56, 0, 'url(#hero)')}<circle cx="310" cy="80" r="11" fill="#fff"/>${r(328, 76, 60, 8, 4, '#fff')}${r(480, 76, 40, 8, 4, '#fff', ' fill-opacity=".5"')}
${r(286, 108, 252, 120, 0, YEL)}<circle cx="470" cy="150" r="30" fill="#fff" fill-opacity=".45"/><path d="M286 228l70-56 46 34 40-24 96 46z" fill="${PINK}" fill-opacity=".85"/>
${t(412, 262, 19, INK, '20% έκπτωση', 800, ' text-anchor="middle"')}${r(316, 276, 192, 6, 3, '#cdbfc6')}${r(336, 288, 152, 6, 3, '#cdbfc6')}
${r(348, 308, 128, 36, 18, 'url(#pk)')}${t(412, 331, 12, '#fff', 'Αγορά τώρα', 800, ' text-anchor="middle"')}
${[0, 1, 2].map((k) => `${r(306 + k * 76, 362, 66, 56, 10, '#fbf0f5')}${r(314 + k * 76, 370, 50, 26, 6, [PINK, BLUE, GREEN][k], ' fill-opacity=".7"')}${r(314 + k * 76, 402, 36, 5, 2.5, INK, ' fill-opacity=".6"')}`).join('')}
${r(366, 432, 92, 5, 2.5, '#d9c8d1')}</g></g>`;
  const node = (y, fill, fg, label, ic) => `<g filter="url(#sh)">${r(560, y, 200, 56, 16, fill, fill === '#1d1119' ? ' stroke="#fff" stroke-opacity=".1"' : '')}${ic}${t(610, y + 33, 12, fg, label, 800)}</g>`;
  const link = (y) => `<path d="M660 ${y}v26" stroke="#fff" stroke-opacity=".35" stroke-width="2" stroke-dasharray="4 4"/><circle cx="660" cy="${y + 26}" r="3" fill="#fff" fill-opacity=".6"/>`;
  const flow = `${t(560, 72, 11, '#fff', 'ΑΥΤΟΜΑΤΙΣΜΟΣ', 800, ' fill-opacity=".55" letter-spacing="1.5"')}
${node(84, '#fff', INK, 'Νέα εγγραφή', `<circle cx="586" cy="112" r="13" fill="${BLUE}"/><circle cx="586" cy="108" r="4" fill="#fff"/><path d="M579 119a7 7 0 0 1 14 0" fill="#fff"/>`)}${link(140)}
${node(170, '#1d1119', '#fff', 'Αναμονή 1 μέρα', `<circle cx="586" cy="198" r="13" fill="#fff" fill-opacity=".12"/><circle cx="586" cy="198" r="7" fill="none" stroke="#fff" stroke-width="2"/><path d="M586 194v4l3 2" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/>`)}${link(226)}
${node(256, 'url(#pk)', '#fff', 'Email καλωσορίσματος', `<circle cx="586" cy="284" r="13" fill="#fff"/><path d="M579 279h14v10h-14zM579 280l7 5 7-5" fill="none" stroke="${PINK}" stroke-width="1.8" stroke-linejoin="round"/>`)}${link(312)}
${node(342, YEL, INK, 'Κουπόνι 20%', `<circle cx="586" cy="370" r="13" fill="${INK}"/><path d="M580 376l12-12M581 366h1M591 375h1" stroke="${YEL}" stroke-width="2.6" stroke-linecap="round"/>`)}
<g filter="url(#sh)">${r(590, 414, 170, 42, 21, '#1d1119', ' stroke="#fff" stroke-opacity=".1"')}${check(614, 435, 11, '#3aa35b', '#fff')}${t(634, 440, 12, '#fff', '48 πωλήσεις', 800)}</g>`;
  fs.writeFileSync(OUT + 'email-marketing.svg', wrap(HERO, `${BG}${inbox}${mail}${flow}`));
}

/* 8. Event Management: lit stage with audience, speaker badge, date and checklist */
{
  const beams = `<path d="M120 0 L300 330 L380 330 Z" fill="${YEL}" fill-opacity=".09"/><path d="M680 0 L500 330 L420 330 Z" fill="${PINK}" fill-opacity=".14"/><path d="M400 0 L340 330 L460 330 Z" fill="#fff" fill-opacity=".05"/>
<circle cx="120" cy="6" r="14" fill="${YEL}"/><circle cx="680" cy="6" r="14" fill="${PINK}"/><circle cx="400" cy="6" r="10" fill="#fff" fill-opacity=".7"/>`;
  const stage = `<g filter="url(#sh)">${r(222, 66, 356, 196, 14, '#0d070b', ' stroke="#fff" stroke-opacity=".12"')}${r(232, 76, 336, 176, 10, 'url(#hero)')}
<circle cx="400" cy="138" r="26" fill="#fff"/><path d="M390 128l22 10-22 10z" fill="${PINK}"/>${r(316, 182, 168, 12, 6, '#fff')}${r(346, 202, 108, 8, 4, YEL)}${r(372, 222, 56, 6, 3, '#fff', ' fill-opacity=".5"')}</g>
<path d="M170 300 L630 300 L700 352 L100 352 Z" fill="#2a1220"/><path d="M170 300 L630 300" stroke="${PINK}" stroke-opacity=".6" stroke-width="2"/>
<g><rect x="378" y="262" width="44" height="40" rx="6" fill="#3a1a2c"/><circle cx="400" cy="246" r="11" fill="#140a10"/><path d="M386 300v-30a14 14 0 0 1 28 0v30z" fill="#140a10"/></g>`;
  let crowd = '';
  [[372, 20, '#24101b'], [404, 18, '#1a0b14'], [436, 17, '#12070e']].forEach(([y, s, c], row) => {
    for (let x = 18 + row * 14; x < 800; x += s * 2.3) crowd += `<circle cx="${x}" cy="${y}" r="${s * .55}" fill="${c}"/><path d="M${x - s} ${y + s * 2.2}a${s} ${s} 0 0 1 ${s * 2} 0z" fill="${c}"/>`;
  });
  [[150, 360], [560, 376], [690, 352]].forEach(([x, y]) => { crowd += `<g filter="url(#sh)">${r(x, y - 30, 16, 26, 3, '#fff', ' fill-opacity=".9"')}${r(x + 2, y - 28, 12, 18, 2, BLUE)}</g>`; });
  const badge = `<g filter="url(#sh)" transform="rotate(-7 110 250)"><path d="M86 120 L110 150 L134 120" fill="none" stroke="${PINK}" stroke-width="5"/>${r(50, 150, 120, 168, 16, '#fff')}${r(50, 150, 120, 40, 16, 'url(#pk)')}${r(50, 174, 120, 16, 0, 'url(#pk)')}${r(94, 160, 32, 6, 3, '#fff', ' fill-opacity=".7"')}
<circle cx="110" cy="222" r="22" fill="${YEL}"/><circle cx="110" cy="216" r="8" fill="${INK}"/><path d="M96 236a14 14 0 0 1 28 0z" fill="${INK}"/>${r(72, 256, 76, 8, 4, INK)}${r(82, 270, 56, 6, 3, '#cdbfc6')}${r(66, 288, 88, 20, 10, INK)}${t(110, 302, 10, YEL, 'SPEAKER', 800, ' text-anchor="middle" letter-spacing="1.5"')}</g>`;
  const cal = `<g filter="url(#sh)">${r(624, 60, 136, 120, 18, '#fff')}${r(624, 60, 136, 36, 18, PINK)}${r(624, 78, 136, 18, 0, PINK)}${t(692, 85, 13, '#fff', 'ΟΚΤ', 800, ' text-anchor="middle" letter-spacing="2"')}${t(692, 152, 46, INK, '24', 800, ' text-anchor="middle"')}<circle cx="650" cy="54" r="5" fill="${INK}"/><circle cx="734" cy="54" r="5" fill="${INK}"/></g>`;
  const list = `<g filter="url(#sh)">${r(612, 200, 160, 132, 16, '#1d1119', ' stroke="#fff" stroke-opacity=".1"')}${t(630, 226, 12, '#fff', 'Πρόγραμμα', 800)}
${[0, 1, 2].map((k) => `${check(640, 252 + k * 26, 9, k < 2 ? '#3aa35b' : 'none', k < 2 ? '#fff' : 'none')}${k === 2 ? `<circle cx="640" cy="304" r="8" fill="none" stroke="${YEL}" stroke-width="2.4"/>` : ''}${r(658, 248 + k * 26, 90 - k * 14, 7, 3.5, '#fff', k < 2 ? ' fill-opacity=".75"' : ' fill-opacity=".4"')}`).join('')}</g>`;
  fs.writeFileSync(OUT + 'event-management.svg', wrap(HERO, `${BG}${beams}${stage}${crowd}${badge}${cal}${list}`));
}

/* 9. Conferences & Exhibitions: venue floor plan, agenda and speaker badge */
{
  const booths = [[86, 168, PINK], [176, 168, YEL], [266, 168, BLUE], [356, 168, GREEN], [86, 268, BLUE], [176, 268, PINK], [356, 268, YEL], [86, 352, GREEN], [176, 352, YEL], [266, 352, PINK], [356, 352, BLUE]];
  const plan = `<g filter="url(#shL)">${r(56, 52, 476, 400, 20, '#fff')}${t(80, 82, 12, INK, 'Κάτοψη χώρου', 800)}${r(420, 70, 92, 22, 11, '#ffe3f1')}${t(466, 85.5, 10.5, PINK, 'Αίθουσα Α', 800, ' text-anchor="middle"')}
${r(86, 100, 356, 50, 10, INK)}${t(264, 130, 12, '#fff', 'ΣΚΗΝΗ', 800, ' text-anchor="middle" letter-spacing="3"')}
${booths.map(([x, y, c]) => `${r(x, y, 76, 66, 8, c, ' fill-opacity=".22"')}${r(x, y, 76, 66, 8, 'none', ` stroke="${c}" stroke-width="2"`)}${r(x + 12, y + 14, 40, 6, 3, INK, ' fill-opacity=".55"')}${r(x + 12, y + 26, 26, 5, 2.5, INK, ' fill-opacity=".3"')}`).join('')}
${r(266, 268, 76, 66, 8, 'url(#pk)')}<path d="M304 286c-8-8-12-13-12-19a12 12 0 0 1 24 0c0 6-4 11-12 19z" fill="#fff"/><circle cx="304" cy="267" r="4" fill="${PINK}"/>${t(304, 318, 10, '#fff', 'Εδώ είστε', 800, ' text-anchor="middle"')}
<path d="M452 168v248" stroke="#ecdfe6" stroke-width="2" stroke-dasharray="5 5"/>${r(462, 360, 50, 56, 8, '#f6eff3')}<path d="M487 404v-28m-8 8 8-8 8 8" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
${t(487, 434, 9.5, '#8a7a83', 'ΕΙΣΟΔΟΣ', 800, ' text-anchor="middle" letter-spacing="1"')}</g>`;
  const times = ['09:30', '10:15', '11:00', '12:30'];
  const agenda = `<g filter="url(#shL)">${r(552, 52, 212, 250, 18, '#fff')}${t(572, 82, 13, INK, 'Πρόγραμμα', 800)}
${times.map((tm, i) => { const y = 102 + i * 48; const on = i === 1; return `${r(566, y, 184, 40, 10, on ? 'url(#pk)' : '#f6eff3')}${t(580, y + 25, 11.5, on ? '#fff' : PINK, tm, 800)}${r(626, y + 13, 100 - i * 8, 6, 3, on ? '#fff' : INK, on ? '' : ' fill-opacity=".6"')}${r(626, y + 24, 70, 5, 2.5, on ? '#fff' : '#cdbfc6', on ? ' fill-opacity=".6"' : '')}`; }).join('')}</g>`;
  const badge = `<g filter="url(#shL)" transform="rotate(5 660 380)">${r(586, 320, 160, 128, 16, '#fff')}<circle cx="624" cy="362" r="22" fill="${YEL}"/><circle cx="624" cy="356" r="8" fill="${INK}"/><path d="M610 376a14 14 0 0 1 28 0z" fill="${INK}"/>${r(656, 350, 72, 8, 4, INK)}${r(656, 364, 52, 6, 3, '#cdbfc6')}
${r(600, 402, 132, 30, 10, 'url(#pk)')}${t(666, 422, 11, '#fff', 'SPEAKER', 800, ' text-anchor="middle" letter-spacing="2"')}</g>`;
  fs.writeFileSync(OUT + 'conferences-exhibitions.svg', wrap(HERO, `${r(0, 0, 800, 500, 0, '#f6eff3')}${r(0, 0, 800, 500, 0, 'url(#dotsL)')}${plan}${agenda}${badge}`));
}

/* 10. Photo & Video Coverage: camera viewfinder, edit timeline and a reel */
{
  const scene = `<clipPath id="vf"><rect x="40" y="52" width="520" height="330" rx="16"/></clipPath><g clip-path="url(#vf)" filter="url(#sh)">${r(40, 52, 520, 330, 0, 'url(#scene)')}
<path d="M120 52 L230 300 L300 300 Z" fill="${YEL}" fill-opacity=".14"/><path d="M500 52 L380 300 L320 300 Z" fill="#fff" fill-opacity=".1"/>
${r(170, 110, 260, 130, 8, 'url(#hero)', ' fill-opacity=".9"')}${r(240, 160, 120, 10, 5, '#fff')}${r(266, 180, 68, 7, 3.5, YEL)}
<path d="M40 300 L560 300 L560 382 L40 382 Z" fill="#14080f"/><circle cx="300" cy="262" r="15" fill="#0b0508"/><path d="M280 300v-14a20 20 0 0 1 40 0v14z" fill="#0b0508"/>${r(286, 300, 28, 30, 4, '#2a1220')}
${[70, 130, 190, 410, 470, 530].map((x, i) => `<circle cx="${x}" cy="${340 + (i % 2) * 6}" r="13" fill="#0b0508"/><path d="M${x - 22} 382a22 22 0 0 1 44 0z" fill="#0b0508"/>`).join('')}</g>
${[[52, 64, 1, 1], [548, 64, -1, 1], [52, 370, 1, -1], [548, 370, -1, -1]].map(([x, y, sx, sy]) => `<path d="M${x} ${y + 26 * sy}V${y}H${x + 26 * sx}" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`).join('')}
<circle cx="84" cy="88" r="7" fill="#ff3b3b"/>${t(98, 93, 13, '#fff', 'REC', 800)}${t(500, 93, 13, '#fff', '00:12:48', 700, ' text-anchor="end" font-family="JetBrains Mono, Consolas, monospace"')}
${r(510, 81, 30, 14, 3, 'none', ' stroke="#fff" stroke-width="2"')}${r(513, 84, 18, 8, 1.5, '#5fd38a')}<rect x="540" y="85" width="3" height="6" rx="1" fill="#fff"/>
<rect x="270" y="186" width="60" height="44" rx="4" fill="none" stroke="${YEL}" stroke-width="2"/><path d="M300 180v8M300 228v8M264 208h8M328 208h8" stroke="${YEL}" stroke-width="2"/>`;
  const cols = [PINK, '#b8005e', YEL, BLUE, MAG, PINK, GREEN, '#b8005e', YEL];
  const tl = `<g filter="url(#sh)">${r(40, 400, 720, 76, 16, '#1d1119', ' stroke="#fff" stroke-opacity=".08"')}
${cols.map((c, i) => r(56 + i * 66, 414, 60, 30, 5, c, ` fill-opacity="${.55 + (i % 3) * .15}"`)).join('')}
${r(56, 452, 590, 12, 4, '#fff', ' fill-opacity=".08"')}${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((k) => r(60 + k * 42, 455, 30, 6, 2, BLUE, ' fill-opacity=".55"')).join('')}
<path d="M322 404v68" stroke="${PINK}" stroke-width="2.5"/><path d="M314 404h16l-8 9z" fill="${PINK}"/>${r(660, 414, 84, 50, 10, 'url(#pk)')}${t(702, 444, 12, '#fff', 'Export', 800, ' text-anchor="middle"')}</g>`;
  const reel = `<g filter="url(#sh)">${r(596, 52, 156, 300, 26, '#120a10')}${r(604, 60, 140, 284, 20, 'url(#hero)')}${r(652, 66, 44, 8, 4, '#120a10')}
<circle cx="674" cy="186" r="26" fill="#fff" fill-opacity=".9"/><path d="M666 174l20 12-20 12z" fill="${PINK}"/>
${heartP(712, 236, 1, '#fff')}${t(724, 274, 10, '#fff', '2,1K', 800, ' text-anchor="middle"')}<circle cx="724" cy="296" r="8" fill="none" stroke="#fff" stroke-width="2.2"/>
${r(616, 300, 70, 7, 3.5, '#fff')}${r(616, 314, 96, 5, 2.5, '#fff', ' fill-opacity=".6"')}${r(616, 82, 46, 16, 8, '#fff', ' fill-opacity=".25"')}${t(639, 94, 9.5, '#fff', 'Reels', 800, ' text-anchor="middle"')}</g>`;
  fs.writeFileSync(OUT + 'photo-video-coverage.svg', wrap(HERO + `<linearGradient id="scene" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a0618"/><stop offset="1" stop-color="#4a0b2c"/></linearGradient>`, `${BG}${scene}${tl}${reel}`));
}

/* 11. Sponsorship Management: sponsor wall by tier, a package and reach */
{
  const logo = (x, y, w, h, k) => {
    const cx = x + w / 2, cy = y + h / 2, s = Math.min(w, h) * .22;
    const mark = [`<circle cx="${cx - s * 1.6}" cy="${cy}" r="${s}" fill="${INK}"/>`, `<path d="M${cx - s * 2.6} ${cy + s}l${s} ${-s * 2} ${s} ${s * 2}z" fill="${PINK}"/>`, r(cx - s * 2.6, cy - s, s * 2, s * 2, s * .4, BLUE), `<circle cx="${cx - s * 1.6}" cy="${cy}" r="${s}" fill="none" stroke="${MAG}" stroke-width="${s * .5}"/>`][k % 4];
    return `${r(x, y, w, h, 10, '#fff')}${mark}${r(cx - s * .2, cy - s * .45, s * 3, s * .9, s * .45, INK, ' fill-opacity=".75"')}`;
  };
  const wall = `<g filter="url(#sh)">${r(40, 52, 440, 270, 18, '#1d1119', ' stroke="#fff" stroke-opacity=".08"')}${t(62, 84, 13, '#fff', 'Χορηγοί', 800)}
${r(64, 98, 70, 20, 10, YEL)}${t(99, 112, 10, INK, 'GOLD', 800, ' text-anchor="middle" letter-spacing="1.5"')}${logo(150, 96, 260, 64, 0)}
${r(64, 180, 70, 20, 10, '#d9d3dc')}${t(99, 194, 10, INK, 'SILVER', 800, ' text-anchor="middle" letter-spacing="1.5"')}${logo(150, 176, 125, 52, 1)}${logo(285, 176, 125, 52, 2)}
${r(64, 252, 70, 20, 10, '#c98b5a')}${t(99, 266, 10, '#fff', 'BRONZE', 800, ' text-anchor="middle" letter-spacing="1.2"')}${[0, 1, 2, 3].map((k) => logo(150 + k * 66.5, 246, 60, 44, k + 3)).join('')}</g>`;
  const pts = [[0, 60], [40, 52], [80, 54], [120, 36], [160, 30], [200, 12]];
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${68 + x} ${386 + y}`).join(' ');
  const reach = `<g filter="url(#sh)">${r(40, 340, 300, 130, 18, '#1d1119', ' stroke="#fff" stroke-opacity=".08"')}${t(62, 370, 12, '#fff', 'Προβολή χορηγών', 700, ' fill-opacity=".6"')}${t(62, 404, 28, '#fff', '2,4M', 800)}
<path d="${line} L268 456 L68 456 Z" fill="url(#area)" transform="translate(52 0)"/><path d="${line}" transform="translate(52 0)" fill="none" stroke="${PINK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${r(242, 356, 82, 22, 11, '#3aa35b', ' fill-opacity=".18"')}${t(283, 371.5, 11, '#5fd38a', '+64%', 800, ' text-anchor="middle"')}</g>`;
  const items = ['Λογότυπο στη σκηνή', 'Αναφορές στα social', 'Περίπτερο στον χώρο', 'Αναφορά προβολής'];
  const pack = `<g filter="url(#sh)">${r(500, 52, 260, 290, 18, '#fff')}${r(500, 52, 260, 84, 18, 'url(#pk)')}${r(500, 118, 260, 18, 0, 'url(#pk)')}
${r(520, 70, 64, 22, 11, YEL)}${t(552, 85.5, 10.5, INK, 'GOLD', 800, ' text-anchor="middle" letter-spacing="1.5"')}${t(520, 122, 17, '#fff', 'Πακέτο χορηγίας', 800)}
${items.map((s, i) => `${check(534, 168 + i * 40, 11, '#3aa35b', '#fff')}${t(556, 172 + i * 40, 12, INK, s, 700)}`).join('')}
${r(520, 316, 220, 2, 1, '#f1e6ec')}</g>`;
  const deck = `<g filter="url(#sh)">${r(500, 362, 260, 108, 18, '#1d1119', ' stroke="#fff" stroke-opacity=".08"')}${t(520, 390, 12, '#fff', 'Sponsorship deck', 800)}
${[0, 1, 2].map((k) => `${r(520 + k * 78, 404, 68, 46, 8, k === 0 ? 'url(#hero)' : '#2a1a24')}${r(528 + k * 78, 414, 40, 5, 2.5, '#fff', ' fill-opacity=".7"')}${r(528 + k * 78, 424, 26, 4, 2, '#fff', ' fill-opacity=".35"')}`).join('')}</g>`;
  fs.writeFileSync(OUT + 'sponsorship-management.svg', wrap(HERO + `<linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${PINK}" stop-opacity=".4"/><stop offset="1" stop-color="${PINK}" stop-opacity="0"/></linearGradient>`, `${BG}${wall}${reach}${pack}${deck}`));
}

/* ===== Shared helpers for the remaining categories ===== */
const LBG = `${r(0, 0, 800, 500, 0, '#f6eff3')}${r(0, 0, 800, 500, 0, 'url(#dotsL)')}`;
const AREA = `<linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${PINK}" stop-opacity=".4"/><stop offset="1" stop-color="${PINK}" stop-opacity="0"/></linearGradient>`;
const av = (cx, cy, s, c, fg = INK) => `<circle cx="${cx}" cy="${cy}" r="${s}" fill="${c}"/><circle cx="${cx}" cy="${cy - s * .22}" r="${s * .34}" fill="${fg}"/><path d="M${cx - s * .58} ${cy + s * .66}a${s * .58} ${s * .58} 0 0 1 ${s * 1.16} 0z" fill="${fg}"/>`;
const bars = (x, y, ws, gap, h, c, extra = '') => ws.map((w, i) => r(x, y + i * gap, w, h, h / 2, c, extra)).join('');
const person = (x, y, s, c) => `<circle cx="${x}" cy="${y}" r="${s * .5}" fill="${c}"/><path d="M${x - s} ${y + s * 2.4}a${s} ${s * 1.1} 0 0 1 ${s * 2} 0z" fill="${c}"/>`;
const donut = (cx, cy, rad, w, segs) => { const C = 2 * Math.PI * rad; let acc = 0; return segs.map(([f, c]) => { const s = `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="none" stroke="${c}" stroke-width="${w}" stroke-dasharray="${(f * C).toFixed(1)} ${C.toFixed(1)}" stroke-dashoffset="${(-acc * C).toFixed(1)}" transform="rotate(-90 ${cx} ${cy})"/>`; acc += f; return s; }).join(''); };
const lineOf = (pts, ox, oy) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${ox + x} ${oy + y}`).join(' ');
const dcard = (x, y, w, h) => r(x, y, w, h, 18, '#1d1119', ' stroke="#fff" stroke-opacity=".08"');
const save = (name, defs, body) => fs.writeFileSync(OUT + name + '.svg', wrap(HERO + AREA + defs, body));

/* 12. PR & Communication: newspaper, megaphone, mentions and a quote */
{
  const paper = `<g filter="url(#sh)" transform="rotate(-4 210 250)">${r(60, 64, 300, 350, 14, '#fff')}${t(210, 100, 20, INK, 'ΕΙΔΗΣΕΙΣ', 800, ' text-anchor="middle" letter-spacing="4"')}${r(80, 112, 260, 2, 1, INK)}${r(80, 117, 260, 1, 0, INK)}
${r(80, 132, 220, 14, 4, INK)}${r(80, 152, 170, 14, 4, INK)}${r(80, 178, 150, 110, 8, 'url(#hero)')}<circle cx="190" cy="206" r="14" fill="${YEL}"/>
${bars(242, 180, [98, 90, 98, 80, 98, 70, 92], 15, 6, '#cdbfc6')}${bars(80, 302, [260, 250, 260, 230, 255, 200], 15, 6, '#d9cdd3')}${r(80, 394, 120, 6, 3, PINK)}</g>`;
  const mega = `<g filter="url(#sh)" transform="rotate(8 380 90)">${r(330, 40, 100, 100, 26, YEL)}<g transform="translate(346 56) scale(2.8)" fill="none" stroke="${INK}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10v4h3l7 4.5v-13L7 10z"/><path d="M17.5 9.5a3.5 3.5 0 0 1 0 5M7 14l1.5 5h2.5l-1.2-4.4"/></g></g>`;
  const ment = `<g filter="url(#sh)">${dcard(420, 176, 210, 118)}${t(440, 204, 12, '#fff', 'Αναφορές στα media', 700, ' fill-opacity=".6"')}${t(440, 244, 30, '#fff', '128', 800)}
${[22, 30, 26, 40, 46, 58].map((h, i) => r(530 + i * 14, 278 - h, 9, h, 3, i === 5 ? PINK : '#5fd38a', i === 5 ? '' : ' fill-opacity=".7"')).join('')}</g>`;
  const quote = `<g filter="url(#sh)">${r(440, 318, 320, 120, 18, '#fff')}${t(462, 372, 54, PINK, '“', 800)}${bars(504, 346, [220, 200, 150], 16, 7, INK, ' fill-opacity=".7"')}${av(522, 412, 13, YEL)}${r(544, 404, 80, 6, 3, INK)}${r(544, 416, 54, 5, 2.5, '#cdbfc6')}</g>`;
  const rel = `<g filter="url(#sh)">${dcard(600, 52, 160, 106)}${t(618, 80, 12, '#fff', 'Δελτίο τύπου', 800)}${bars(618, 92, [120, 100, 110], 11, 5, '#fff', ' fill-opacity=".35"')}${r(618, 126, 80, 20, 10, 'url(#pk)')}${t(658, 140, 10, '#fff', 'Αποστολή', 800, ' text-anchor="middle"')}</g>`;
  save('pr-communication', '', `${BG}${paper}${ment}${quote}${rel}${mega}`);
}

/* 13. Communication Strategy: message house, channels and plan */
{
  const house = `<g filter="url(#shL)"><path d="M300 52 L500 150 L100 150 Z" fill="url(#pk)"/>${t(300, 132, 14, '#fff', 'Κεντρικό μήνυμα', 800, ' text-anchor="middle"')}
${[['Πελάτες', PINK], ['Συνεργάτες', BLUE], ['Media', YEL]].map(([l, c], i) => { const x = 116 + i * 126; return `${r(x, 164, 116, 172, 14, '#fff')}<circle cx="${x + 22}" cy="${190}" r="9" fill="${c}"/>${t(x + 38, 194.5, 12, INK, l, 800)}${bars(x + 14, 216, [88, 74, 82, 60, 76], 18, 7, '#d9cdd3')}`; }).join('')}
${r(100, 346, 400, 48, 14, INK)}${t(300, 376, 14, YEL, 'Αξίες και ταυτότητα', 800, ' text-anchor="middle"')}</g>`;
  const ch = `<g filter="url(#shL)">${r(528, 52, 232, 196, 18, '#fff')}${t(548, 82, 13, INK, 'Κανάλια', 800)}
${[[PINK, .9], [BLUE, .7], [YEL, .55], [GREEN, .4]].map(([c, p], i) => { const y = 102 + i * 34; return `<circle cx="556" cy="${y + 6}" r="7" fill="${c}"/>${r(572, y + 2, 70, 7, 3.5, INK, ' fill-opacity=".65"')}${r(652, y + 3, 90, 6, 3, '#f1e6ec')}${r(652, y + 3, 90 * p, 6, 3, c)}`; }).join('')}</g>`;
  const plan = `<g filter="url(#shL)">${r(528, 268, 232, 180, 18, '#fff')}${t(548, 298, 13, INK, 'Πλάνο', 800)}
${[0, 1, 2, 3].map((c) => [0, 1, 2].map((rw) => r(548 + c * 52, 314 + rw * 40, 44, 32, 7, '#f6eff3')).join('')).join('')}
${r(548, 314, 96, 32, 7, 'url(#pk)')}${r(652, 354, 96, 32, 7, YEL)}${r(600, 394, 44, 32, 7, BLUE)}${r(704, 394, 44, 32, 7, GREEN)}</g>`;
  save('communication-strategy', '', `${LBG}${house}${ch}${plan}`);
}

/* 14. Media Relations: press release, media list and clippings */
{
  const doc = `<g filter="url(#sh)">${r(44, 52, 250, 404, 16, '#fff')}${t(66, 84, 11, PINK, 'ΔΕΛΤΙΟ ΤΥΠΟΥ', 800, ' letter-spacing="2"')}${r(66, 98, 200, 14, 5, INK)}${r(66, 118, 150, 14, 5, INK)}
${bars(66, 146, [206, 196, 206, 170], 15, 6, '#cdbfc6')}${r(66, 214, 206, 100, 10, 'url(#hero)')}<circle cx="240" cy="240" r="13" fill="${YEL}"/>${bars(66, 330, [206, 200, 206, 180, 206, 120], 15, 6, '#d9cdd3')}${r(66, 428, 90, 8, 4, INK, ' fill-opacity=".6"')}</g>`;
  const rows = ['#5fd38a', '#5fd38a', '#5fd38a', YEL, YEL];
  const list = `<g filter="url(#sh)">${dcard(314, 52, 262, 262)}${t(334, 82, 13, '#fff', 'Media list', 800)}
${rows.map((s, i) => { const y = 98 + i * 42; return `${av(346, y + 16, 14, [PINK, BLUE, YEL, GREEN, '#fff'][i])}${r(370, y + 8, 100 - i * 6, 7, 3.5, '#fff', ' fill-opacity=".8"')}${r(370, y + 20, 70, 5, 2.5, '#fff', ' fill-opacity=".3"')}${s === YEL ? `<circle cx="546" cy="${y + 16}" r="9" fill="none" stroke="${YEL}" stroke-width="2.6" stroke-dasharray="40 17"/>` : check(546, y + 16, 10, '#3aa35b', '#fff')}`; }).join('')}</g>
<path d="M294 150 C 310 120, 300 100, 318 92" fill="none" stroke="${PINK}" stroke-width="2" stroke-dasharray="5 5"/>`;
  const clip = (x, y, rot, c) => `<g filter="url(#sh)" transform="rotate(${rot} ${x + 60} ${y + 60})">${r(x, y, 122, 124, 10, '#fff')}${r(x + 10, y + 10, 102, 8, 3, INK)}${r(x + 10, y + 26, 102, 46, 6, c)}${bars(x + 10, y + 80, [102, 90, 98, 70], 10, 5, '#cdbfc6')}</g>`;
  const count = `<g filter="url(#sh)">${r(596, 52, 164, 120, 18, 'url(#pk)')}${t(616, 82, 12, '#fff', 'Δημοσιεύσεις', 800, ' fill-opacity=".85"')}${t(616, 136, 44, '#fff', '24', 800)}<path d="M716 122l10-12 8 6 12-16" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  save('media-relations', '', `${BG}${doc}${list}${clip(330, 330, -5, BLUE)}${clip(470, 320, 4, YEL)}${clip(612, 196, -3, PINK)}${clip(620, 336, 6, GREEN)}${count}`);
}

/* 15. Business & Marketing Strategy: target, KPIs, goals and roadmap */
{
  const target = `<g filter="url(#sh)">${r(40, 52, 224, 196, 18, '#fff')}${[64, 48, 32, 16].map((s, i) => `<circle cx="152" cy="150" r="${s}" fill="${i % 2 ? '#fff' : PINK}"${i % 2 ? '' : ` fill-opacity="${.35 + i * .25}"`}/>`).join('')}<circle cx="152" cy="150" r="6" fill="${MAG}"/>
<path d="M236 76 L156 146" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><path d="M230 70l14 2-2 14M226 82l14 0-0 0" fill="none" stroke="${YEL}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  const kpi = (y, l, v) => `<g filter="url(#sh)">${dcard(282, y, 238, 88)}${t(302, y + 30, 12, '#fff', l, 700, ' fill-opacity=".6"')}${t(302, y + 68, 28, '#fff', v, 800)}<path d="M448 ${y + 62}l14-16 10 8 18-22" fill="none" stroke="#5fd38a" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  const goals = `<g filter="url(#sh)">${r(540, 52, 220, 404, 18, '#fff')}${t(560, 84, 14, INK, 'Στόχοι', 800)}
${[.9, .7, .55, .35, .2].map((p, i) => { const y = 108 + i * 66; return `${p > .6 ? check(570, y + 12, 11, '#3aa35b', '#fff') : `<circle cx="570" cy="${y + 12}" r="10" fill="none" stroke="#d9cdd3" stroke-width="2.4"/>`}${r(590, y + 4, 140 - i * 10, 7, 3.5, INK, ' fill-opacity=".7"')}${r(590, y + 18, 46, 5, 2.5, '#cdbfc6')}${r(560, y + 36, 180, 7, 3.5, '#f1e6ec')}${r(560, y + 36, 180 * p, 7, 3.5, i ? PINK : 'url(#pk)')}`; }).join('')}</g>`;
  const road = `<g filter="url(#sh)">${dcard(40, 268, 480, 188)}${t(60, 298, 13, '#fff', 'Roadmap', 800)}<path d="M80 352H480" stroke="#fff" stroke-opacity=".2" stroke-width="3"/>${r(80, 350.5, 160, 3, 1.5, PINK)}
${['Q1', 'Q2', 'Q3', 'Q4'].map((q, i) => { const x = 100 + i * 120; const on = i === 1, done = i === 0; return `<circle cx="${x}" cy="352" r="${on ? 14 : 11}" fill="${done ? '#3aa35b' : on ? PINK : '#1d1119'}" stroke="${done || on ? 'none' : '#fff'}" stroke-opacity=".4" stroke-width="2"/>${t(x, 330, 12, on ? PINK : '#fff', q, 800, ' text-anchor="middle"')}${bars(x - 40, 380, [80, 60, 70], 14, 6, '#fff', ` fill-opacity="${on ? .7 : .25}"`)}`; }).join('')}</g>`;
  save('business-marketing-strategy', '', `${BG}${target}${kpi(52, 'Έσοδα', '+32%')}${kpi(160, 'Νέοι πελάτες', '+18%')}${goals}${road}`);
}

/* 16. Business Strategy: business model canvas, growth and KPIs */
{
  const cells = [[56, 70, 86, 250], [148, 70, 86, 122], [148, 198, 86, 122], [240, 70, 86, 250], [332, 70, 86, 122], [332, 198, 86, 122], [424, 70, 86, 250], [56, 326, 225, 110], [287, 326, 223, 110]];
  const notes = [[PINK, YEL], [BLUE], [GREEN, PINK], [PINK, YEL, BLUE], [YEL], [BLUE, GREEN], [PINK, GREEN], [YEL, BLUE, PINK], [GREEN, PINK, YEL]];
  const canvas = `<g filter="url(#shL)">${r(40, 52, 486, 400, 18, '#fff')}${cells.map(([x, y, w, h], i) => `${r(x, y, w, h, 10, i === 3 ? '#ffe3f1' : '#f6eff3')}${r(x + 10, y + 12, Math.min(56, w - 20), 6, 3, i === 3 ? PINK : INK, i === 3 ? '' : ' fill-opacity=".55"')}${notes[i].map((c, k) => { const cols = w > 150 ? 3 : 1; const nx = x + 10 + (k % cols) * 64, ny = y + 28 + Math.floor(k / cols) * 34 + (w > 150 ? 0 : k * 0); return `${r(nx, ny, Math.min(58, w - 20), 26, 4, c, ' fill-opacity=".85"')}${r(nx + 6, ny + 8, 30, 4, 2, INK, ' fill-opacity=".45"')}`; }).join('')}`).join('')}</g>`;
  const growth = `<g filter="url(#shL)">${r(548, 52, 212, 200, 18, '#fff')}${t(568, 82, 13, INK, 'Ανάπτυξη', 800)}${[40, 56, 66, 84, 102, 128].map((h, i) => r(570 + i * 30, 228 - h, 20, h, 5, i === 5 ? 'url(#pk)' : PINK, i === 5 ? '' : ` fill-opacity="${.2 + i * .12}"`)).join('')}</g>`;
  const kpis = `<g filter="url(#shL)">${r(548, 272, 212, 176, 18, '#fff')}${t(568, 302, 13, INK, 'KPIs', 800)}
${[['92%', .92, '#3aa35b'], ['74%', .74, PINK], ['58%', .58, BLUE]].map(([v, p, c], i) => { const y = 322 + i * 40; return `${r(568, y, 90, 6, 3, INK, ' fill-opacity=".6"')}${t(740, y + 7, 12, INK, v, 800, ' text-anchor="end"')}${r(568, y + 16, 172, 7, 3.5, '#f1e6ec')}${r(568, y + 16, 172 * p, 7, 3.5, c)}`; }).join('')}</g>`;
  save('business-strategy', '', `${LBG}${canvas}${growth}${kpis}`);
}

/* 17. Marketing & Growth Strategy: funnel, channel mix and growth */
{
  const stages = [['Γνωριμία', 380, PINK], ['Ενδιαφέρον', 310, '#d4006e'], ['Αγορά', 240, '#a10052'], ['Επιστροφή', 170, YEL]];
  const funnel = `<g filter="url(#sh)">${stages.map(([l, w, c], i) => { const y = 66 + i * 90, nw = i < 3 ? stages[i + 1][1] : w - 50, cx = 240; return `<path d="M${cx - w / 2} ${y} L${cx + w / 2} ${y} L${cx + nw / 2} ${y + 78} L${cx - nw / 2} ${y + 78} Z" fill="${c}"/>${t(cx, y + 46, 15, i === 3 ? INK : '#fff', l, 800, ' text-anchor="middle"')}`; }).join('')}</g>`;
  const mix = `<g filter="url(#sh)">${r(470, 52, 290, 196, 18, '#fff')}${t(490, 82, 13, INK, 'Κανάλια', 800)}${donut(560, 160, 48, 20, [[.38, PINK], [.27, BLUE], [.2, YEL], [.15, GREEN]])}
${[PINK, BLUE, YEL, GREEN].map((c, i) => `<circle cx="640" cy="${118 + i * 26}" r="6" fill="${c}"/>${r(654, 114 + i * 26, 70 - i * 8, 7, 3.5, INK, ' fill-opacity=".6"')}`).join('')}</g>`;
  const pts = [[0, 120], [40, 108], [80, 112], [120, 86], [160, 74], [200, 46], [240, 20]];
  const grow = `<g filter="url(#sh)">${dcard(470, 268, 290, 188)}${t(490, 298, 12, '#fff', 'Πελάτες', 700, ' fill-opacity=".6"')}${t(490, 334, 28, '#fff', '+46%', 800)}
<path d="${lineOf(pts, 494, 300)} L734 440 L494 440 Z" fill="url(#area)"/><path d="${lineOf(pts, 494, 300)}" fill="none" stroke="${PINK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="734" cy="320" r="5.5" fill="#1d1119" stroke="${PINK}" stroke-width="3"/></g>`;
  save('marketing-growth-strategy', '', `${BG}${funnel}${mix}${grow}`);
}

/* 18. Market & Competitor Research: SWOT, competitor table, survey and searches */
{
  const swot = `<g filter="url(#shL)">${r(40, 52, 330, 290, 18, '#fff')}${[['S', '#3aa35b'], ['W', PINK], ['O', BLUE], ['T', '#e0a400']].map(([l, c], i) => { const x = 56 + (i % 2) * 152, y = 68 + Math.floor(i / 2) * 134; return `${r(x, y, 144, 126, 12, '#f6eff3')}${r(x + 12, y + 12, 34, 34, 9, c)}${t(x + 29, y + 36, 18, '#fff', l, 800, ' text-anchor="middle"')}${bars(x + 12, y + 60, [116, 96, 108, 70], 14, 6, '#d9cdd3')}`; }).join('')}</g>`;
  const comp = ['Εσείς', 'Α', 'Β', 'Γ'];
  const grid = [[1, 1, 1, 1], [1, 0, 1, 0], [0, 1, 1, 0], [1, 0, 0, 1]];
  const table = `<g filter="url(#shL)">${r(390, 52, 370, 210, 18, '#fff')}${t(410, 82, 13, INK, 'Ανταγωνισμός', 800)}
${comp.map((c, i) => `${i === 0 ? r(546 + i * 54, 96, 50, 152, 10, '#ffe3f1') : ''}${t(571 + i * 54, 116, 11, i === 0 ? PINK : INK, c, 800, ' text-anchor="middle"')}`).join('')}
${[0, 1, 2, 3].map((rw) => `${r(410, 136 + rw * 30, 110 - rw * 10, 7, 3.5, INK, ' fill-opacity=".6"')}${comp.map((_, i) => `<circle cx="${571 + i * 54}" cy="${140 + rw * 30}" r="7" fill="${grid[rw][i] ? (i === 0 ? PINK : '#b9a8b1') : 'none'}" stroke="${grid[rw][i] ? 'none' : '#d9cdd3'}" stroke-width="2"/>`).join('')}`).join('')}</g>`;
  const survey = `<g filter="url(#shL)">${r(390, 282, 370, 170, 18, '#fff')}${t(410, 312, 13, INK, 'Έρευνα πελατών', 800)}
${[['68%', .68, PINK], ['54%', .54, BLUE], ['31%', .31, YEL]].map(([v, p, c], i) => { const y = 330 + i * 36; return `${r(410, y, 120, 6, 3, INK, ' fill-opacity=".55"')}${r(410, y + 14, 290, 10, 5, '#f1e6ec')}${r(410, y + 14, 290 * p, 10, 5, c)}${t(740, y + 23, 12, INK, v, 800, ' text-anchor="end"')}`; }).join('')}</g>`;
  const pts = [[0, 56], [40, 50], [80, 40], [120, 44], [160, 22], [200, 14], [240, 4]];
  const search = `<g filter="url(#shL)">${r(40, 362, 330, 90, 18, '#fff')}${r(56, 378, 116, 28, 14, '#f6eff3')}${mag(74, 392, PINK)}${r(90, 389, 66, 6, 3, INK, ' fill-opacity=".6"')}${t(56, 436, 11, '#8a7a83', 'Αναζητήσεις', 700)}
<path d="${lineOf(pts, 110, 378)}" fill="none" stroke="${PINK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" transform="translate(0 0)"/><circle cx="350" cy="382" r="5" fill="#fff" stroke="${PINK}" stroke-width="3"/></g>`;
  save('market-competitor-research', '', `${LBG}${swot}${table}${survey}${search}`);
}

/* 19. Branding & Design: logo construction, palette, type and cards */
{
  const logo = `<g filter="url(#sh)">${r(40, 52, 320, 404, 18, '#fff')}${[0, 1, 2, 3, 4, 5, 6].map((k) => `<path d="M${64 + k * 45} 72V420M60 ${92 + k * 48}H340" stroke="#efe6ea" stroke-width="1"/>`).join('')}
<circle cx="200" cy="220" r="110" fill="none" stroke="${PINK}" stroke-opacity=".35" stroke-dasharray="4 5"/><circle cx="200" cy="220" r="62" fill="none" stroke="${BLUE}" stroke-opacity=".5" stroke-dasharray="4 5"/>
<circle cx="200" cy="220" r="86" fill="url(#pk)"/><path d="M168 176h34a44 44 0 0 1 0 88h-34z" fill="#fff"/><path d="M188 196h14a24 24 0 0 1 0 48h-14z" fill="${PINK}"/><circle cx="252" cy="168" r="14" fill="${YEL}"/>
${[[114, 134], [286, 306], [200, 134], [200, 306]].map(([x, y]) => r(x - 4, y - 4, 8, 8, 1, '#fff', ` stroke="${PINK}" stroke-width="1.6"`)).join('')}${r(120, 346, 160, 18, 6, INK)}${r(150, 374, 100, 8, 4, '#cdbfc6')}${t(60, 440, 10, '#8a7a83', 'LOGO CONSTRUCTION', 800, ' letter-spacing="1.5"')}</g>`;
  const sw = [[PINK, '#FF0785', '#fff'], [MAG, '#670033', '#fff'], [YEL, '#E8E06A', INK], [INK, '#14090F', '#fff']];
  const pal = `${sw.map(([c, h, f], i) => `<g filter="url(#sh)">${r(380 + i * 96, 52, 86, 160, 14, c, c === INK ? ' stroke="#fff" stroke-opacity=".15"' : '')}${t(392 + i * 96, 196, 10, f, h, 800, ' font-family="JetBrains Mono, Consolas, monospace"')}</g>`).join('')}`;
  const type = `<g filter="url(#sh)">${dcard(380, 232, 182, 224)}${t(400, 320, 68, '#fff', 'Aa', 800)}${t(400, 352, 13, '#fff', 'Manrope', 800)}${bars(400, 372, [140, 120, 90], 16, 7, '#fff', ' fill-opacity=".3"')}${r(400, 424, 40, 14, 7, PINK)}${r(446, 424, 40, 14, 7, YEL)}</g>`;
  const cards = `<g filter="url(#sh)" transform="rotate(-8 670 330)">${r(588, 260, 168, 100, 12, 'url(#pk)')}<circle cx="672" cy="310" r="22" fill="#fff"/><path d="M664 298h8a12 12 0 0 1 0 24h-8z" fill="${PINK}"/></g>
<g filter="url(#sh)" transform="rotate(5 670 400)">${r(584, 348, 172, 104, 12, INK)}<circle cx="612" cy="376" r="12" fill="url(#pk)"/>${r(632, 370, 70, 7, 3.5, '#fff')}${bars(604, 404, [110, 90, 100], 12, 5, '#fff', ' fill-opacity=".35"')}</g>`;
  save('branding-design', '', `${BG}${logo}${pal}${type}${cards}`);
}

/* 20. Corporate Identity: brand guidelines book and stationery */
{
  const mark = (cx, cy, s, bg, fg) => `<circle cx="${cx}" cy="${cy}" r="${s}" fill="${bg}"/><path d="M${cx - s * .4} ${cy - s * .5}h${s * .4}a${s * .5} ${s * .5} 0 0 1 0 ${s}h-${s * .4}z" fill="${fg}"/>`;
  const book = `<g filter="url(#shL)">${r(40, 60, 480, 380, 16, '#fff')}<path d="M280 60V440" stroke="#e6d8df" stroke-width="2"/>${r(276, 60, 8, 380, 0, '#f1e6ec')}
${t(64, 92, 10, PINK, 'BRAND GUIDELINES', 800, ' letter-spacing="2"')}${r(64, 108, 196, 120, 12, '#f6eff3')}${mark(110, 168, 30, 'url(#pk)', '#fff')}${r(150, 156, 90, 12, 5, INK)}${r(150, 174, 60, 7, 3.5, '#b9a8b1')}
${r(64, 240, 196, 120, 12, INK)}${mark(110, 300, 30, '#fff', PINK)}${r(150, 288, 90, 12, 5, '#fff')}${r(150, 306, 60, 7, 3.5, '#fff', ' fill-opacity=".4"')}${bars(64, 376, [196, 170, 180], 15, 6, '#d9cdd3')}
${[PINK, MAG, YEL, BLUE, INK].map((c, i) => `${r(304 + i * 40, 92, 32, 70, 8, c)}${r(304 + i * 40, 168, 30, 5, 2.5, '#b9a8b1')}`).join('')}
${t(304, 246, 56, INK, 'Aa', 800)}${bars(384, 210, [110, 90, 100], 14, 7, INK, ' fill-opacity=".5"')}${[0, 1, 2, 3, 4, 5].map((k) => `${r(304 + (k % 3) * 66, 276 + Math.floor(k / 3) * 66, 56, 56, 12, k % 2 ? '#ffe3f1' : '#f6eff3')}<circle cx="${332 + (k % 3) * 66}" cy="${304 + Math.floor(k / 3) * 66}" r="10" fill="${[PINK, BLUE, YEL][k % 3]}"/>`).join('')}</g>`;
  const letter = `<g filter="url(#shL)" transform="rotate(4 650 180)">${r(548, 52, 196, 260, 10, '#fff')}${mark(576, 82, 14, 'url(#pk)', '#fff')}${r(598, 76, 60, 8, 4, INK)}${bars(568, 116, [150, 140, 156, 120, 150, 140, 90], 14, 5, '#d9cdd3')}${r(568, 278, 70, 6, 3, PINK)}</g>`;
  const card = `<g filter="url(#shL)" transform="rotate(-6 660 380)">${r(566, 330, 186, 108, 12, INK)}${mark(600, 364, 18, 'url(#pk)', '#fff')}${r(628, 356, 80, 8, 4, '#fff')}${bars(588, 398, [120, 96], 13, 5, '#fff', ' fill-opacity=".4"')}</g>`;
  save('corporate-identity', '', `${LBG}${book}${letter}${card}`);
}

/* 21. Brand Strategy: positioning map, persona, values and tone of voice */
{
  const dots = [[150, 150, '#b9a8b1'], [320, 120, '#b9a8b1'], [140, 330, '#b9a8b1'], [300, 360, '#b9a8b1'], [230, 250, '#b9a8b1']];
  const map = `<g filter="url(#sh)">${r(40, 52, 400, 404, 18, '#fff')}<path d="M240 80V430M64 254H416" stroke="#e6d8df" stroke-width="2"/>
${t(240, 74, 10.5, '#8a7a83', 'PREMIUM', 800, ' text-anchor="middle" letter-spacing="1.5"')}${t(240, 448, 10.5, '#8a7a83', 'ΟΙΚΟΝΟΜΙΚΟ', 800, ' text-anchor="middle" letter-spacing="1.5"')}${t(60, 246, 10.5, '#8a7a83', 'ΚΛΑΣΙΚΟ', 800, ' letter-spacing="1.5"')}${t(420, 246, 10.5, '#8a7a83', 'ΣΥΓΧΡΟΝΟ', 800, ' text-anchor="end" letter-spacing="1.5"')}
${dots.map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="11" fill="${c}"/>`).join('')}<circle cx="352" cy="164" r="30" fill="${PINK}" fill-opacity=".18"/><circle cx="352" cy="164" r="16" fill="url(#pk)"/>${r(318, 190, 68, 22, 11, INK)}${t(352, 205, 10.5, '#fff', 'Εσείς', 800, ' text-anchor="middle"')}</g>`;
  const persona = `<g filter="url(#sh)">${dcard(460, 52, 300, 168)}${av(500, 100, 26, YEL)}${r(538, 86, 110, 9, 4.5, '#fff')}${r(538, 104, 70, 6, 3, '#fff', ' fill-opacity=".4"')}
${bars(480, 142, [250, 220, 236], 14, 6, '#fff', ' fill-opacity=".25"')}${[['34', PINK], ['Θεσσαλονίκη', BLUE]].map(([s, c], i) => `${r(480 + i * 64, 188, i ? 110 : 54, 20, 10, c, ' fill-opacity=".25"')}${t(480 + i * 64 + (i ? 55 : 27), 202, 10, '#fff', s, 800, ' text-anchor="middle"')}`).join('')}</g>`;
  const vals = [['Αυθεντικό', PINK, '#fff', 96], ['Τολμηρό', YEL, INK, 86], ['Ζεστό', BLUE, '#fff', 72]];
  let vx = 460; const values = vals.map(([s, c, f, w]) => { const g = `<g filter="url(#sh)">${r(vx, 238, w, 34, 17, c)}${t(vx + w / 2, 260, 12, f, s, 800, ' text-anchor="middle"')}</g>`; vx += w + 10; return g; }).join('');
  const tone = `<g filter="url(#sh)">${r(460, 290, 300, 166, 18, '#fff')}${t(480, 320, 13, INK, 'Tone of voice', 800)}
${[['Φιλικό', .78], ['Σοβαρό', .36], ['Παιχνιδιάρικο', .6]].map(([l, p], i) => { const y = 342 + i * 36; return `${t(480, y + 4, 11, '#8a7a83', l, 700)}${r(580, y - 2, 160, 6, 3, '#f1e6ec')}${r(580, y - 2, 160 * p, 6, 3, PINK)}<circle cx="${580 + 160 * p}" cy="${y + 1}" r="8" fill="#fff" stroke="${PINK}" stroke-width="3"/>`; }).join('')}</g>`;
  save('brand-strategy', '', `${BG}${map}${persona}${values}${tone}`);
}

/* 22. Graphic Design: poster, social post, brochure and a colour picker */
{
  const poster = `<g filter="url(#shL)" transform="rotate(-3 170 240)">${r(60, 60, 220, 360, 12, '#fff')}${r(72, 72, 196, 220, 8, 'url(#hero)')}<circle cx="200" cy="150" r="46" fill="${YEL}"/><path d="M72 292l60-70 40 40 40-30 56 60z" fill="#fff" fill-opacity=".25"/>
${r(84, 306, 160, 16, 5, INK)}${r(84, 328, 120, 16, 5, PINK)}${bars(84, 356, [170, 150, 160], 12, 5, '#cdbfc6')}${r(84, 396, 70, 10, 5, INK, ' fill-opacity=".6"')}</g>`;
  const post = `<g filter="url(#shL)">${r(304, 70, 200, 200, 14, PINK)}${[0, 1, 2, 3].map((k) => `<circle cx="${334 + k * 46}" cy="96" r="6" fill="#fff" fill-opacity=".35"/>`).join('')}${r(324, 150, 150, 18, 6, '#fff')}${r(324, 174, 110, 18, 6, YEL)}${r(324, 226, 70, 22, 11, INK)}${heartP(460, 222, 1, '#fff')}</g>`;
  const broch = `<g filter="url(#shL)">${[0, 1, 2].map((k) => `${r(300 + k * 74, 300, 72, 140, 4, k === 1 ? '#ffe3f1' : '#fff')}${r(310 + k * 74, 314, 52, k === 0 ? 40 : 8, 4, k === 0 ? BLUE : INK, k === 0 ? ' fill-opacity=".8"' : ' fill-opacity=".6"')}${bars(310 + k * 74, k === 0 ? 366 : 332, [52, 44, 50, 38, 48], 12, 5, '#cdbfc6')}`).join('')}</g>
<path d="M290 270 C 330 230, 420 300, 470 262" fill="none" stroke="${INK}" stroke-width="2.2"/>${[[290, 270], [470, 262]].map(([x, y]) => r(x - 5, y - 5, 10, 10, 1, '#fff', ` stroke="${INK}" stroke-width="2"`)).join('')}<path d="M330 230l-30 -26M420 300l30 26" stroke="${PINK}" stroke-width="1.6"/><circle cx="300" cy="204" r="4" fill="${PINK}"/><circle cx="450" cy="326" r="4" fill="${PINK}"/>`;
  const panel = `<g filter="url(#sh)">${r(540, 60, 220, 380, 18, '#1d1119')}${t(560, 90, 12, '#fff', 'Χρώματα', 800)}
<linearGradient id="pick" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="${PINK}"/></linearGradient><linearGradient id="pickD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000"/></linearGradient>
${r(560, 104, 180, 130, 10, 'url(#pick)')}${r(560, 104, 180, 130, 10, 'url(#pickD)')}<circle cx="690" cy="136" r="8" fill="none" stroke="#fff" stroke-width="3"/>
<linearGradient id="hue" x1="0" y1="0" x2="1" y2="0">${['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ff0000'].map((c, i) => `<stop offset="${(i / 6).toFixed(2)}" stop-color="${c}"/>`).join('')}</linearGradient>${r(560, 248, 180, 12, 6, 'url(#hue)')}<circle cx="712" cy="254" r="8" fill="#fff"/>
${[PINK, MAG, YEL, BLUE, GREEN].map((c, i) => r(560 + i * 37, 278, 30, 30, 8, c)).join('')}${t(560, 340, 12, '#fff', 'Layers', 800)}${[0, 1, 2].map((k) => `${r(560, 354 + k * 26, 180, 20, 6, k === 0 ? PINK : '#fff', k === 0 ? ' fill-opacity=".25"' : ' fill-opacity=".05"')}${r(572, 361 + k * 26, 80 - k * 10, 6, 3, '#fff', ' fill-opacity=".6"')}`).join('')}</g>`;
  save('graphic-design', '', `${LBG}${poster}${broch}${post}${panel}`);
}

/* 23. Offline Advertising: billboard, TV and radio */
{
  const bb = `<path d="M290 250V470M310 250V470" stroke="#3a1a2c" stroke-width="10"/><path d="M160 470H440" stroke="#3a1a2c" stroke-width="6"/>
<path d="M180 52 L150 0 L230 0 Z M300 52 L280 0 L330 0 Z M420 52 L380 0 L450 0 Z" fill="${YEL}" fill-opacity=".1"/>
<g filter="url(#sh)">${r(120, 52, 360, 210, 12, '#0d070b')}${r(132, 64, 336, 186, 8, 'url(#hero)')}<circle cx="410" cy="120" r="36" fill="${YEL}"/>${r(156, 100, 190, 20, 6, '#fff')}${r(156, 128, 140, 20, 6, YEL)}${r(156, 168, 160, 8, 4, '#fff', ' fill-opacity=".6"')}${r(156, 204, 90, 28, 14, '#fff')}${r(172, 215, 58, 6, 3, PINK)}</g>`;
  const tv = `<g filter="url(#sh)">${r(510, 60, 250, 160, 14, '#0d070b', ' stroke="#fff" stroke-opacity=".15"')}${r(522, 72, 226, 136, 8, 'url(#hero)')}<circle cx="635" cy="140" r="24" fill="#fff" fill-opacity=".9"/><path d="M627 128l20 12-20 12z" fill="${PINK}"/>${r(530, 80, 56, 18, 9, '#ff3b3b')}${t(558, 93, 9.5, '#fff', 'ON AIR', 800, ' text-anchor="middle"')}<path d="M610 220l-20 26M660 220l20 26M580 246H690" stroke="#3a1a2c" stroke-width="6" stroke-linecap="round"/></g>`;
  const radio = `<g filter="url(#sh)">${r(530, 290, 220, 130, 22, PINK)}<path d="M560 290 L640 250" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><circle cx="596" cy="356" r="36" fill="${INK}"/><circle cx="596" cy="356" r="22" fill="${MAG}"/><circle cx="596" cy="356" r="8" fill="${INK}"/>
${r(650, 322, 76, 20, 6, '#fff', ' fill-opacity=".9"')}<path d="M664 326v12M676 326v12M688 326v12M700 326v12" stroke="${PINK}" stroke-width="2"/>${[0, 1].map((k) => `<circle cx="${668 + k * 34}" cy="${376}" r="11" fill="${INK}"/>`).join('')}</g>
${[0, 1, 2].map((k) => `<path d="M${764 + k * 0} ${326 - k * 12}a${30 + k * 14} ${30 + k * 14} 0 0 1 0 ${60 + k * 24}" fill="none" stroke="${YEL}" stroke-opacity="${.7 - k * .2}" stroke-width="3" transform="translate(${-20 + k * 4} 0)"/>`).join('')}`;
  save('offline-advertising', '', `${BG}${bb}${tv}${radio}`);
}

/* 24. TV & Radio Advertising: TV spot on air, mic, schedule and waveform */
{
  const tv = `<g filter="url(#sh)">${r(40, 52, 450, 290, 16, '#0d070b', ' stroke="#fff" stroke-opacity=".15"')}${r(54, 66, 422, 262, 10, 'url(#hero)')}
<ellipse cx="300" cy="286" rx="110" ry="18" fill="#000" fill-opacity=".25"/>${r(268, 150, 64, 132, 18, '#fff')}${r(282, 126, 36, 30, 8, YEL)}${r(276, 196, 48, 50, 6, PINK)}${r(284, 206, 32, 6, 3, '#fff')}
${r(78, 116, 150, 18, 6, '#fff')}${r(78, 142, 110, 18, 6, YEL)}${r(78, 182, 130, 7, 3.5, '#fff', ' fill-opacity=".6"')}${r(70, 82, 76, 22, 11, '#ff3b3b')}<circle cx="86" cy="93" r="4" fill="#fff"/>${t(118, 97.5, 10.5, '#fff', 'ON AIR', 800, ' text-anchor="middle"')}${r(380, 82, 80, 22, 11, '#000', ' fill-opacity=".4"')}${t(420, 97.5, 11, '#fff', '0:30', 800, ' text-anchor="middle"')}</g>`;
  const wave = `<g filter="url(#sh)">${dcard(40, 362, 450, 94)}<circle cx="78" cy="409" r="18" fill="url(#pk)"/><path d="M73 401l12 8-12 8z" fill="#fff"/>${Array.from({ length: 44 }, (_, i) => { const h = 8 + Math.abs(Math.sin(i * .7) * 26 + Math.sin(i * 1.9) * 12); return r(112 + i * 8.6, 409 - h / 2, 5, h, 2.5, i < 18 ? PINK : '#fff', i < 18 ? '' : ' fill-opacity=".3"'); }).join('')}</g>`;
  const mic = `<g filter="url(#sh)">${dcard(510, 52, 250, 200)}<g transform="translate(590 76) scale(3.8)" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3.5" width="6" height="10.5" rx="3" fill="${PINK}" stroke="${PINK}"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v2.5"/></g>
${[0, 1, 2].map((k) => `<path d="M${560 - k * 14} ${110 + k * 6}a${30 + k * 14} ${40 + k * 10} 0 0 0 0 ${60 - k * 2}M${720 + k * 14} ${110 + k * 6}a${30 + k * 14} ${40 + k * 10} 0 0 1 0 ${60 - k * 2}" fill="none" stroke="${YEL}" stroke-opacity="${.7 - k * .2}" stroke-width="3" stroke-linecap="round"/>`).join('')}${r(588, 216, 94, 22, 11, '#ff3b3b')}${t(635, 231.5, 10.5, '#fff', 'ON AIR', 800, ' text-anchor="middle"')}</g>`;
  const sched = `<g filter="url(#sh)">${r(510, 272, 250, 184, 18, '#fff')}${t(530, 302, 13, INK, 'Προβολές', 800)}
${[['08:30', PINK], ['14:00', BLUE], ['20:45', YEL]].map(([tm, c], i) => { const y = 318 + i * 42; return `${r(530, y, 210, 34, 10, i === 2 ? '#ffe3f1' : '#f6eff3')}<circle cx="548" cy="${y + 17}" r="6" fill="${c}"/>${t(562, y + 22, 12, INK, tm, 800)}${r(616, y + 14, 100 - i * 10, 6, 3, INK, ' fill-opacity=".5"')}`; }).join('')}</g>`;
  save('tv-radio-advertising', '', `${BG}${tv}${wave}${mic}${sched}`);
}

/* 25. Outdoor & Transit: billboard over the city, a bus and a bus stop */
{
  const sky = `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe9f5"/><stop offset="1" stop-color="#fde6f1"/></linearGradient>`;
  const city = `${[[0, 300, 70, 120], [60, 270, 60, 150], [130, 310, 80, 110], [470, 280, 60, 140], [520, 250, 70, 170], [600, 300, 80, 120], [690, 265, 110, 155]].map(([x, y, w, h]) => r(x, y, w, h, 4, '#e6d8e6')).join('')}${r(0, 420, 800, 80, 0, '#4a3a48')}${[0, 1, 2, 3, 4, 5, 6, 7].map((k) => r(20 + k * 100, 458, 50, 6, 3, '#fff', ' fill-opacity=".7"')).join('')}`;
  const bb = `<path d="M210 250V420M310 250V420" stroke="#6a5a66" stroke-width="10"/><g filter="url(#shL)">${r(60, 48, 400, 210, 12, '#2a1a24')}${r(72, 60, 376, 186, 8, 'url(#hero)')}<circle cx="388" cy="118" r="38" fill="${YEL}"/>${r(96, 92, 200, 22, 7, '#fff')}${r(96, 122, 150, 22, 7, YEL)}${r(96, 168, 170, 8, 4, '#fff', ' fill-opacity=".6"')}${r(96, 200, 96, 28, 14, '#fff')}</g>`;
  const bus = `<g filter="url(#shL)">${r(460, 304, 310, 124, 22, '#fff')}${r(460, 304, 310, 22, 0, '#fff')}${[0, 1, 2, 3].map((k) => r(478 + k * 62, 316, 52, 40, 6, '#2a1a24')).join('')}${r(718, 316, 40, 74, 6, '#2a1a24')}
${r(478, 364, 226, 46, 8, 'url(#hero)')}${r(492, 376, 110, 10, 5, '#fff')}${r(492, 392, 70, 8, 4, YEL)}<circle cx="676" cy="387" r="13" fill="${YEL}"/>
${[520, 700].map((x) => `<circle cx="${x}" cy="428" r="20" fill="${INK}"/><circle cx="${x}" cy="428" r="8" fill="#b9a8b1"/>`).join('')}</g>`;
  const stop = `<g filter="url(#shL)">${r(40, 262, 8, 160, 3, '#6a5a66')}${r(180, 262, 8, 160, 3, '#6a5a66')}${r(32, 254, 166, 14, 6, PINK)}${r(70, 282, 92, 130, 8, '#fff')}${r(78, 290, 76, 114, 6, YEL)}${r(88, 306, 56, 10, 5, INK)}${r(88, 322, 40, 8, 4, PINK)}<circle cx="116" cy="370" r="18" fill="${PINK}"/></g>`;
  save('outdoor-transit-advertising', sky, `${r(0, 0, 800, 500, 0, 'url(#sky)')}${city}${bb}${stop}${bus}`);
}

/* 26. Media Planning & Buying: media plan gantt, budget donut, reach and bookings */
{
  const rowsP = [['TV', PINK, [[0, 3], [5, 7]]], ['Ραδιόφωνο', BLUE, [[1, 5]]], ['Υπαίθρια', YEL, [[2, 8]]], ['Έντυπα', GREEN, [[0, 2]]], ['Online', '#ff6a3d', [[0, 8]]]];
  const gantt = `<g filter="url(#sh)">${dcard(40, 52, 480, 290)}${t(60, 82, 13, '#fff', 'Media plan', 800)}
${[1, 2, 3, 4, 5, 6, 7, 8].map((k) => `${t(170 + (k - 1) * 42 + 18, 108, 10, '#fff', String(k), 700, ' fill-opacity=".45" text-anchor="middle"')}<path d="M${170 + (k - 1) * 42} 118V326" stroke="#fff" stroke-opacity=".06"/>`).join('')}
${rowsP.map(([l, c, spans], i) => { const y = 130 + i * 40; return `${t(60, y + 18, 11.5, '#fff', l, 700, ' fill-opacity=".8"')}${spans.map(([a, b]) => r(172 + a * 42, y + 6, (b - a) * 42 - 4, 18, 9, c, ' fill-opacity=".9"')).join('')}`; }).join('')}</g>`;
  const budget = `<g filter="url(#sh)">${r(540, 52, 220, 290, 18, '#fff')}${t(560, 82, 13, INK, 'Budget', 800)}${donut(650, 178, 58, 22, [[.32, PINK], [.22, BLUE], [.2, YEL], [.1, GREEN], [.16, '#ff6a3d']])}${t(650, 184, 16, INK, '100%', 800, ' text-anchor="middle"')}
${[PINK, BLUE, YEL].map((c, i) => `<circle cx="566" cy="${270 + i * 22}" r="6" fill="${c}"/>${r(580, 266 + i * 22, 90 - i * 12, 7, 3.5, INK, ' fill-opacity=".55"')}${t(740, 274 + i * 22, 11, INK, ['32%', '22%', '20%'][i], 800, ' text-anchor="end"')}`).join('')}</g>`;
  const reach = `<g filter="url(#sh)">${dcard(40, 362, 230, 94)}${t(60, 392, 12, '#fff', 'Εμβέλεια', 700, ' fill-opacity=".6"')}${t(60, 432, 28, '#fff', '1,2M', 800)}<path d="M186 430l14-14 10 8 22-24" fill="none" stroke="#5fd38a" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  const freq = `<g filter="url(#sh)">${r(288, 362, 232, 94, 18, 'url(#pk)')}${t(308, 392, 12, '#fff', 'Συχνότητα', 700, ' fill-opacity=".85"')}${t(308, 432, 28, '#fff', '4,5x', 800)}</g>`;
  const book = `<g filter="url(#sh)">${r(540, 362, 220, 94, 18, '#fff')}${t(560, 390, 12, INK, 'Κρατήσεις', 800)}${[0, 1, 2].map((k) => `${check(568 + k * 62, 422, 11, k < 2 ? '#3aa35b' : YEL, k < 2 ? '#fff' : INK)}${r(584 + k * 62, 418, 30, 6, 3, INK, ' fill-opacity=".45"')}`).join('')}</g>`;
  save('media-planning-buying', '', `${BG}${gantt}${budget}${reach}${freq}${book}`);
}

/* 27. Promotions & Brand Activations: promo stand, people, coupon and QR */
{
  const tent = `<g filter="url(#sh)"><path d="M190 120 L400 56 L610 120 Z" fill="${INK}"/>${[0, 1, 2, 3, 4, 5, 6].map((k) => `<path d="M${190 + k * 60} 120h60v34a30 30 0 0 1 -60 0z" fill="${k % 2 ? '#fff' : PINK}"/>`).join('')}${r(214, 154, 10, 210, 3, '#3a1a2c')}${r(576, 154, 10, 210, 3, '#3a1a2c')}</g>`;
  const counter = `<g filter="url(#sh)">${r(240, 250, 320, 130, 12, '#fff')}${r(240, 250, 320, 22, 12, YEL)}${r(240, 262, 320, 10, 0, YEL)}<circle cx="400" cy="320" r="34" fill="url(#pk)"/><path d="M390 304h10a16 16 0 0 1 0 32h-10z" fill="#fff"/>
${[0, 1, 2, 3, 4].map((k) => `${r(262 + k * 22, 224, 16, 26, 4, '#fff')}${r(264 + k * 22, 230, 12, 16, 3, k % 2 ? PINK : BLUE, ' fill-opacity=".8"')}`).join('')}${[0, 1, 2].map((k) => `<circle cx="${480 + k * 24}" cy="240" r="9" fill="${[YEL, PINK, GREEN][k]}"/>`).join('')}</g>`;
  const people = `${person(150, 300, 22, '#2a1220')}${person(640, 290, 22, '#2a1220')}${person(700, 320, 20, '#1d0c17')}${person(110, 340, 18, '#1d0c17')}`;
  const coupon = `<g filter="url(#sh)" transform="rotate(-8 120 400)">${r(40, 350, 170, 100, 14, YEL)}${r(50, 360, 150, 80, 10, 'none', ` stroke="${INK}" stroke-width="2" stroke-dasharray="6 5"`)}${t(125, 412, 32, INK, '20%', 800, ' text-anchor="middle"')}${t(125, 430, 10, INK, 'ΕΚΠΤΩΣΗ', 800, ' text-anchor="middle" letter-spacing="2"')}</g>`;
  let qr = ''; let s = 7; for (let y = 0; y < 11; y++) for (let x = 0; x < 11; x++) { s = (s * 9301 + 49297) % 233280; const corner = (x < 3 && y < 3) || (x > 7 && y < 3) || (x < 3 && y > 7); if (!corner && s / 233280 > .5) qr += r(626 + x * 9, 330 + y * 9, 8, 8, 1, INK); }
  const fin = (x, y) => `${r(x, y, 26, 26, 4, INK)}${r(x + 5, y + 5, 16, 16, 2, '#fff')}${r(x + 9, y + 9, 8, 8, 1, INK)}`;
  const qrCard = `<g filter="url(#sh)">${r(608, 312, 136, 148, 16, '#fff')}${qr}${fin(626, 330)}${fin(698, 330)}${fin(626, 402)}${t(676, 448, 10, INK, 'Σκανάρετε', 800, ' text-anchor="middle"')}</g>`;
  const conf = [[100, 80, PINK], [700, 90, YEL], [660, 200, BLUE], [130, 200, YEL], [740, 240, PINK], [60, 140, GREEN]].map(([x, y, c], i) => `<rect x="${x}" y="${y}" width="10" height="16" rx="2" fill="${c}" transform="rotate(${i * 37} ${x} ${y})"/>`).join('');
  save('promotions-brand-activations', '', `${BG}${conf}${people}${tent}${counter}${coupon}${qrCard}`);
}

/* 28. Film Production: clapperboard, film strip and REC */
{
  const clap = `<g filter="url(#sh)">${r(60, 170, 300, 250, 14, INK, ' stroke="#fff" stroke-opacity=".15"')}<g transform="rotate(-14 60 166)">${r(60, 130, 300, 40, 8, '#fff')}${[0, 1, 2, 3, 4, 5].map((k) => `<path d="M${76 + k * 50} 130h24l-20 40h-24z" fill="${INK}"/>`).join('')}</g>${r(60, 172, 300, 34, 0, '#fff')}${[0, 1, 2, 3, 4, 5].map((k) => `<path d="M${84 + k * 50} 172h24l-20 34h-24z" fill="${INK}"/>`).join('')}
${[['SCENE', '12'], ['TAKE', '3']].map(([l, v], i) => `${t(84 + i * 140, 240, 11, '#fff', l, 800, ' fill-opacity=".5" letter-spacing="2"')}${t(84 + i * 140, 290, 40, '#fff', v, 800)}`).join('')}<path d="M84 316H336" stroke="#fff" stroke-opacity=".15"/>${t(84, 346, 11, '#fff', 'DIRECTOR', 800, ' fill-opacity=".5" letter-spacing="2"')}${r(84, 362, 150, 10, 5, PINK)}${t(84, 400, 11, '#fff', 'DigiGlow Media', 800, ' fill-opacity=".7"')}</g>`;
  const strip = `<g transform="rotate(-10 590 260)" filter="url(#sh)">${r(380, 180, 440, 150, 6, '#120a10')}${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((k) => `${r(390 + k * 40, 188, 20, 12, 3, '#fff', ' fill-opacity=".8"')}${r(390 + k * 40, 310, 20, 12, 3, '#fff', ' fill-opacity=".8"')}`).join('')}
${[0, 1, 2, 3].map((k) => `${r(392 + k * 106, 210, 96, 90, 6, ['url(#hero)', '#2a6a8a', YEL, 'url(#pk)'][k])}<circle cx="${440 + k * 106}" cy="255" r="16" fill="#fff" fill-opacity=".35"/>`).join('')}</g>`;
  const rec = `<g filter="url(#sh)">${dcard(560, 52, 200, 70)}<circle cx="590" cy="87" r="9" fill="#ff3b3b"/>${t(608, 93, 14, '#fff', 'REC', 800)}${t(744, 93, 13, '#fff', '01:24:07', 700, ' text-anchor="end" font-family="JetBrains Mono, Consolas, monospace"')}</g>`;
  const beam = `<path d="M60 0 L300 420 L360 420 L120 0 Z" fill="${YEL}" fill-opacity=".06"/>`;
  save('film-production', '', `${BG}${beam}${strip}${clap}${rec}`);
}

/* 29. Commercial Spots: product spot frame, storyboard and colour wheels */
{
  const frame = `<g filter="url(#sh)">${r(40, 52, 480, 280, 16, '#0d070b', ' stroke="#fff" stroke-opacity=".12"')}${r(52, 64, 456, 256, 10, 'url(#hero)')}<ellipse cx="280" cy="282" rx="120" ry="20" fill="#fff" fill-opacity=".85"/>
${r(246, 140, 68, 140, 20, '#fff')}${r(262, 116, 36, 30, 8, INK)}${r(254, 190, 52, 56, 6, YEL)}${r(262, 206, 36, 6, 3, INK)}<path d="M120 64 L200 280 M440 64 L360 280" stroke="#fff" stroke-opacity=".12" stroke-width="40"/>
${r(64, 76, 62, 22, 11, '#000', ' fill-opacity=".4"')}${t(95, 91.5, 11, '#fff', '0:30', 800, ' text-anchor="middle"')}${r(64, 296, 380, 4, 2, '#fff', ' fill-opacity=".3"')}${r(64, 296, 150, 4, 2, '#fff')}<circle cx="214" cy="298" r="6" fill="#fff"/></g>`;
  const panels = [0, 1, 2, 3].map((k) => { const x = 40 + k * 182; return `<g filter="url(#sh)">${r(x, 352, 170, 104, 12, '#fff')}${r(x + 10, 362, 150, 64, 6, '#f6eff3')}${[`<circle cx="${x + 60}" cy="394" r="14" fill="none" stroke="${INK}" stroke-width="2"/><path d="M${x + 40} 426a20 18 0 0 1 40 0" fill="none" stroke="${INK}" stroke-width="2"/>`, `<rect x="${x + 70}" y="372" width="26" height="46" rx="6" fill="none" stroke="${INK}" stroke-width="2"/><path d="M${x + 20} 418h120" stroke="${INK}" stroke-width="2"/>`, `<path d="M${x + 20} 418l40-30 30 20 40-30" fill="none" stroke="${INK}" stroke-width="2"/><circle cx="${x + 130}" cy="378" r="8" fill="none" stroke="${INK}" stroke-width="2"/>`, `<circle cx="${x + 85}" cy="394" r="18" fill="none" stroke="${PINK}" stroke-width="2.4"/><path d="M${x + 79} 386l14 8-14 8z" fill="${PINK}"/>`][k]}${t(x + 14, 446, 11, PINK, String(k + 1), 800)}${r(x + 30, 440, 90, 6, 3, '#cdbfc6')}</g>`; }).join('');
  const wheel = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="34" fill="none" stroke="url(#hueC)" stroke-width="10"/><circle cx="${cx}" cy="${cy}" r="24" fill="#2a1a24"/><circle cx="${cx + 8}" cy="${cy - 6}" r="5" fill="#fff"/>`;
  const grade = `<g filter="url(#sh)">${dcard(540, 52, 220, 280)}${t(560, 82, 12, '#fff', 'Color grading', 800)}${wheel(600, 140)}${wheel(700, 140)}
${r(560, 196, 180, 116, 10, '#120a10')}<path d="M560 312 C 610 300, 640 230, 740 196" fill="none" stroke="#fff" stroke-width="2"/><path d="M560 312 C 620 296, 650 250, 740 210" fill="none" stroke="${PINK}" stroke-width="2"/><path d="M560 312 C 600 290, 680 240, 740 220" fill="none" stroke="${BLUE}" stroke-width="2"/></g>`;
  save('commercial-spots', `<linearGradient id="hueC" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff0785"/><stop offset=".33" stop-color="#e8e06a"/><stop offset=".66" stop-color="#4fb3d9"/><stop offset="1" stop-color="#91b76b"/></linearGradient>`, `${BG}${frame}${panels}${grade}`);
}

/* 30. Corporate & Product Videos: product video on a laptop, interview and testimonial */
{
  const lap = `<g filter="url(#shL)">${r(70, 52, 420, 280, 14, '#2a1a24')}${r(82, 64, 396, 250, 8, 'url(#hero)')}
<path d="M280 140 L340 170 L280 200 L220 170 Z" fill="${YEL}"/><path d="M220 170 L280 200 L280 266 L220 236 Z" fill="#fff"/><path d="M340 170 L280 200 L280 266 L340 236 Z" fill="#f1e6ec"/><path d="M244 196l12 6v24l-12 -6z" fill="${PINK}"/>
${r(82, 278, 396, 36, 0, '#000', ' fill-opacity=".35"')}<path d="M98 290l12 7-12 7z" fill="#fff"/>${r(124, 295, 300, 4, 2, '#fff', ' fill-opacity=".3"')}${r(124, 295, 120, 4, 2, '#fff')}${t(462, 301, 10, '#fff', '1:12', 700, ' text-anchor="end"')}
<path d="M30 332 H530 L500 352 H60 Z" fill="#d9cdd3"/>${r(250, 332, 60, 6, 3, '#b9a8b1')}</g>`;
  const inter = `<g filter="url(#shL)">${r(548, 52, 212, 200, 16, '#2a1a24')}${r(556, 60, 196, 184, 10, '#4a2a3a')}${r(640, 74, 90, 100, 6, '#5c3a4c')}${person(630, 120, 34, '#1a0d14')}
${r(556, 196, 150, 34, 0, 'url(#pk)')}${r(566, 204, 90, 7, 3.5, '#fff')}${r(566, 216, 60, 5, 2.5, '#fff', ' fill-opacity=".6"')}<circle cx="736" cy="76" r="6" fill="#ff3b3b"/></g>`;
  const star = (x, y) => `<path transform="translate(${x} ${y}) scale(.7)" d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 17l-5.2 2.7 1-5.9-4.3-4.1 5.9-.8z" fill="${YEL}" stroke="#c9bf3c" stroke-width="1"/>`;
  const testi = `<g filter="url(#shL)">${r(548, 272, 212, 176, 16, '#fff')}${[0, 1, 2, 3, 4].map((k) => star(566 + k * 18, 290)).join('')}${bars(568, 324, [170, 160, 120], 15, 6, INK, ' fill-opacity=".55"')}${av(584, 406, 16, BLUE)}${r(608, 398, 80, 7, 3.5, INK)}${r(608, 410, 54, 5, 2.5, '#cdbfc6')}</g>`;
  save('corporate-product-videos', '', `${LBG}${lap}${inter}${testi}`);
}

/* 31. Videos for Exhibitions & Conferences: LED wall at a booth with loops and aftermovie */
{
  let px = ''; for (let x = 0; x < 28; x++) px += `<path d="M${140 + x * 20} 70V290" stroke="#000" stroke-opacity=".12"/>`; for (let y = 0; y < 11; y++) px += `<path d="M130 ${80 + y * 20}H670" stroke="#000" stroke-opacity=".12"/>`;
  const wall = `<g filter="url(#sh)">${r(118, 52, 564, 250, 12, '#0d070b')}${r(130, 64, 540, 226, 6, 'url(#hero)')}<circle cx="560" cy="150" r="56" fill="${YEL}" fill-opacity=".9"/><circle cx="560" cy="150" r="30" fill="${PINK}"/>
${r(170, 112, 250, 26, 8, '#fff')}${r(170, 146, 180, 26, 8, YEL)}${r(170, 196, 210, 9, 4.5, '#fff', ' fill-opacity=".6"')}${px}</g>
<path d="M90 302 L710 302 L760 380 L40 380 Z" fill="#2a1220"/>${r(320, 296, 160, 86, 10, '#fff')}${r(320, 296, 160, 18, 10, PINK)}${r(320, 306, 160, 8, 0, PINK)}<circle cx="400" cy="348" r="16" fill="url(#pk)"/>`;
  const people = `${person(240, 360, 20, '#140a10')}${person(290, 380, 22, '#0d070b')}${person(530, 370, 22, '#0d070b')}${person(590, 356, 18, '#140a10')}`;
  const loop = `<g filter="url(#sh)">${dcard(40, 388, 190, 70)}<g transform="translate(58 403) scale(1.6)" fill="none" stroke="${YEL}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a6 6 0 0 1 6-6h8l-3-3M20 12a6 6 0 0 1-6 6H6l3 3"/></g>${t(110, 430, 13, '#fff', 'Loop 24/7', 800)}</g>`;
  const after = `<g filter="url(#sh)">${r(570, 388, 190, 70, 18, 'url(#pk)')}<circle cx="606" cy="423" r="18" fill="#fff"/><path d="M600 414l14 9-14 9z" fill="${PINK}"/>${t(634, 428, 13, '#fff', 'Aftermovie', 800)}</g>`;
  save('exhibition-conference-videos', '', `${BG}${wall}${people}${loop}${after}`);
}

console.log(fs.readdirSync(OUT).map((f) => f + ' ' + Math.round(fs.statSync(OUT + f).size / 1024) + ' KB').join('\n'));
