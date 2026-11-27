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

console.log(fs.readdirSync(OUT).map((f) => f + ' ' + Math.round(fs.statSync(OUT + f).size / 1024) + ' KB').join('\n'));
