import json
import spine as SP
OUT = '/home/claude/noir/'
U = 'https://digiglowmedia.gr/wp-content/uploads/'
C = 'https://digiglowmedia.gr/contact-us/'
W = 'https://digiglowmedia.gr/works/'

SVC = [('Στρατηγική', 'και Branding', 'Έρευνα, τοποθέτηση και ταυτότητα που κάνουν το brand σας σαφές και αξιόπιστο', 'Brand strategy, λογότυπο, εγχειρίδιο'),
       ('Web', 'Development', 'Εταιρικά websites και eshop γρήγορα, ασφαλή και σχεδιασμένα για μετατροπές', 'UX και UI, eshop, SEO'),
       ('Video', 'και Reels', 'Εταιρικό video και reels που αφηγούνται την ιστορία σας και χτίζουν αναγνωρισιμότητα', 'Σενάριο, γύρισμα, μοντάζ'),
       ('Performance', 'Marketing', 'Καμπάνιες σε Meta και Google με ακριβή στόχευση και διαφανείς αναφορές', 'Meta Ads, Google Ads, Analytics'),
       ('Events', 'και Κάλυψη', 'Σχεδιασμός, επικοινωνία και κάλυψη εκδηλώσεων που συνεχίζουν να αποδίδουν', 'Οργάνωση, προβολή, video'),
       ('PR', 'και Επικοινωνία', 'Στρατηγική επικοινωνία και διάχυση για εταιρείες και ευρωπαϊκά έργα', 'Δελτία τύπου, ΜΜΕ, διάχυση')]
WORK = [('Avenue Restaurant', 'Website και στρατηγική', 'vid', '2026/09/Avenue.mp4'),
        ('The Place', 'Brand ecosystem και reels', 'vid', '2026/08/THE-PLACE.mp4'),
        ('Maxus Hellas', 'Εταιρικό video', 'vid', '2026/08/MAXUS.mp4'),
        ('Techstars Startup Weekend', 'Events, website και κάλυψη', 'img', '2026/08/techstars_1.png'),
        ('Avenue Experience', 'Εμπειρία και κρατήσεις', 'img', '2026/08/Avenue_2.png')]
STEPS = [('Ανάλυση', 'Γνωρίζουμε την επιχείρηση, την αγορά και τον ανταγωνισμό και εντοπίζουμε τις πραγματικές ευκαιρίες'),
         ('Στρατηγική', 'Ορίζουμε θέση, μήνυμα, κανάλια και KPIs σε ένα πλάνο με σαφείς προτεραιότητες'),
         ('Υλοποίηση', 'Δημιουργικό, περιεχόμενο και πλατφόρμες από την ίδια ομάδα, με συνέπεια και ταχύτητα'),
         ('Μέτρηση', 'Σαφείς αναφορές και συνεχής βελτίωση, ώστε η γραμμή να ανεβαίνει διαρκώς')]
ROLES = ['Υπεύθυνος συνεργασίας', 'Στρατηγική και branding', 'Web development', 'Video και reels', 'Performance marketing', 'PR και επικοινωνία']
WHEN = ['Άμεσα', 'Μέσα στον μήνα', 'Μέσα στο τρίμηνο', 'Απλώς εξερευνώ']
FAQ = [('Με τι είδους επιχειρήσεις συνεργάζεστε;', 'Συνεργαζόμαστε με επιχειρήσεις κάθε μεγέθους, εταιρικές ομάδες και δημόσιους φορείς, σε κλάδους όπως η λιανική, η εστίαση, ο τουρισμός, η βιομηχανία, η εκπαίδευση και τα ευρωπαϊκά έργα'),
       ('Πόσο κοστίζει μια συνεργασία;', 'Το κόστος εξαρτάται από το εύρος και τους στόχους σας, γι’ αυτό μετά την πρώτη συνάντηση σας στέλνουμε αναλυτική πρόταση με σαφή προϋπολογισμό, είτε για μεμονωμένο έργο είτε για μηνιαία συνεργασία'),
       ('Σε πόσο χρόνο θα δούμε αποτελέσματα;', 'Οι καμπάνιες δίνουν μετρήσιμα δεδομένα από τις πρώτες εβδομάδες, ενώ το SEO, το branding και το περιεχόμενο χτίζουν αποτελέσματα που μεγαλώνουν με τον χρόνο'),
       ('Μπορείτε να αναλάβετε μόνο ένα κομμάτι, όπως το website;', 'Ναι, μπορούμε να ξεκινήσουμε από μία υπηρεσία, όπως ένα website ή μια καμπάνια, και να επεκτείνουμε τη συνεργασία όταν και αν το χρειαστείτε'),
       ('Πώς μετράτε και πώς μας ενημερώνετε;', 'Ορίζουμε μαζί KPIs από την αρχή, έχετε έναν υπεύθυνο συνεργασίας και λαμβάνετε τακτικές αναφορές με σαφή αποτελέσματα και τα επόμενα βήματα')]

def media(k, s, lazy=True):
    if k == 'vid':
        return f'<video src="{U}{s}" muted loop playsinline preload="metadata" aria-hidden="true"></video>'
    return f'<img src="{U}{s}" alt="" loading="lazy" decoding="async">'

tabs = ''.join(f'<button type="button" role="tab" class="dgn-tab{" on" if i == 0 else ""}" aria-selected="{"true" if i == 0 else "false"}" data-i="{i}">{a} {b}</button>' for i, (a, b, d, inc) in enumerate(SVC))
rows = ''.join(f'<li><a class="dgn-row" href="{W}" data-i="{i}"><span class="dgn-row__m">{media(k, s)}</span><b><span>{n}</span></b><em>{d}</em><i aria-hidden="true"></i></a></li>' for i, (n, d, k, s) in enumerate(WORK))
prev = ''.join(f'<div class="dgn-pv" data-i="{i}">{media(k, s)}</div>' for i, (n, d, k, s) in enumerate(WORK))
steps = ''.join(f'<li class="dgn-st{" on" if i == 0 else ""}"><b>{t}</b><span>{d}</span></li>' for i, (t, d) in enumerate(STEPS))
roles = ''.join(f'<li><span>[Όνομα]</span><em>{r}</em></li>' for r in ROLES)
schips = ''.join(f'<label class="dgn-chip"><input type="checkbox" name="svc" value="{a} {b}"><span>{a} {b}</span></label>' for a, b, d, inc in SVC)
wchips = ''.join(f'<label class="dgn-chip"><input type="radio" name="when" value="{w}"{" checked" if i == 0 else ""}><span>{w}</span></label>' for i, w in enumerate(WHEN))
faqs = ''.join(f'<div class="dgn-q"><h3><button type="button" id="dgn-qb{i}" aria-expanded="false" aria-controls="dgn-qa{i}"><span>{q}</span><i aria-hidden="true"></i></button></h3><div class="dgn-a" id="dgn-qa{i}" role="region" aria-labelledby="dgn-qb{i}"><p>{a}</p></div></div>' for i, (q, a) in enumerate(FAQ))
ld = json.dumps({'@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': [{'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': a}} for q, a in FAQ]}, ensure_ascii=False)
nodes = ''.join(f'<span class="dgn-node"><i></i>{t}</span>' for t, d in STEPS)
svcjs = json.dumps([[a + ' ' + b, d, inc] for a, b, d, inc in SVC], ensure_ascii=False)
cta = ''.join(f'<span class="dgn-ch">{c}</span>' if c != ' ' else ' ' for c in 'Ας μιλήσουμε')

CSS = r'''@import url("https://fonts.googleapis.com/css2?family=GFS+Didot&family=JetBrains+Mono:wght@400;700&family=Manrope:wght@200..800&display=swap");

  .dgn {
    --bg: #0b0709;
    --bg2: #150b12;
    --fg: #f4eef1;
    --soft: rgba(244, 238, 241, 0.64);
    --line: rgba(244, 238, 241, 0.14);
    --mag: #ff0785;
    --pink: #ff8ac8;
    --grad: linear-gradient(90deg, #ff0785 0%, #f01eae 44%, #9e36ff 100%);
    --btn: linear-gradient(100deg, #07090d, #670033 50%, #ff0785);
    --sans: "Manrope", "Segoe UI", system-ui, -apple-system, sans-serif;
    --serif: "GFS Didot", "Didot", Georgia, serif;
    --mono: "JetBrains Mono", ui-monospace, "SFMono-Regular", Consolas, monospace;
    --gut: clamp(20px, 4.4vw, 64px);
    position: relative;
    width: 100vw;
    margin-left: calc(50% - 50vw);
    overflow-x: clip;
    background: var(--bg);
    color: var(--fg);
    font-family: var(--sans);
    font-size: 16px;
    line-height: 1.5;
    text-align: left;
    color-scheme: dark;
  }

  .dgn *,
  .dgn *::before,
  .dgn *::after {
    box-sizing: border-box;
  }

  .dgn h1,
  .dgn h2,
  .dgn h3,
  .dgn p,
  .dgn ul,
  .dgn ol {
    margin: 0;
    padding: 0;
    color: inherit;
    font-family: var(--sans);
    text-transform: none;
    list-style: none;
  }

  .dgn a {
    color: inherit;
    text-decoration: none;
  }

  .dgn button,
  .dgn input,
  .dgn textarea {
    font-family: var(--sans);
    text-transform: none;
    letter-spacing: normal;
    box-shadow: none;
  }

  .dgn em {
    font-family: var(--serif);
    font-style: italic;
    font-weight: 400;
    letter-spacing: -0.02em;
  }

  .dgn :focus-visible {
    outline: 2px solid var(--mag);
    outline-offset: 3px;
  }

  .dgn-wrap {
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 var(--gut);
  }

  .dgn-h2 {
    font-size: clamp(40px, 5vw, 78px);
    font-weight: 800;
    line-height: 0.98;
    letter-spacing: -0.055em;
    text-wrap: balance;
  }

  .dgn-h2 em {
    color: var(--pink);
  }

  .dgn-w {
    display: inline-block;
    overflow: hidden;
    vertical-align: top;
    padding-bottom: 0.1em;
    margin-bottom: -0.1em;
  }

  .dgn-w > span {
    display: inline-block;
  }

  .dgn-sub {
    max-width: 440px;
    font-size: clamp(15px, 1.15vw, 17px);
    line-height: 1.6;
    color: var(--soft);
  }

  .dgn-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-height: 56px;
    padding: 0 28px;
    border: 0;
    border-radius: 999px;
    background: var(--btn);
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
  }

  .dgn-ghost {
    background: transparent;
    border: 1px solid rgba(244, 238, 241, 0.3);
  }

  .dgn-link {
    position: relative;
    display: inline-block;
    padding-bottom: 4px;
    font-size: 15px;
    font-weight: 700;
  }

  .dgn-link::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background: currentColor;
    transform-origin: right;
    transition: transform 0.5s cubic-bezier(0.65, 0, 0.2, 1);
  }

  .dgn-link:hover::after {
    transform: scaleX(0);
    transform-origin: left;
  }

  .dgn-head {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    gap: 20px 40px;
    margin-bottom: clamp(40px, 5vw, 70px);
  }

  .dgn-hint {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    font-weight: 700;
    color: var(--soft);
  }

  .dgn-hint::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--mag);
    box-shadow: 0 0 0 0 rgba(255, 7, 133, 0.6);
    animation: dgnPulse 2s infinite;
  }

  @keyframes dgnPulse {
    70% {
      box-shadow: 0 0 0 12px rgba(255, 7, 133, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 7, 133, 0);
    }
  }

  .dgn canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    touch-action: pan-y;
  }

  .dgn-hero__row {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px 40px;
  }

  .dgn-hero__acts {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 14px 24px;
    margin-top: 22px;
  }

__SPCSS__  .dgn-svc {
    position: relative;
    height: 100vh;
    min-height: 720px;
    overflow: hidden;
    background: radial-gradient(ellipse 50% 60% at 70% 55%, rgba(158, 54, 255, 0.16), transparent 70%), var(--bg);
  }

  .dgn-svc canvas {
    cursor: grab;
  }

  .dgn-svc canvas.grabbing {
    cursor: grabbing;
  }

  .dgn-svc__in {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;
    max-width: 1440px;
    pointer-events: none;
  }

  .dgn-svc__in > * {
    max-width: 480px;
    pointer-events: auto;
  }

  .dgn-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .dgn-tab {
    padding: 10px 15px;
    border: 1px solid rgba(244, 238, 241, 0.2);
    border-radius: 999px;
    background: rgba(11, 7, 9, 0.5);
    color: var(--fg);
    font-size: 13.5px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.3s, border-color 0.3s;
  }

  .dgn-tab:hover {
    border-color: var(--pink);
  }

  .dgn-tab.on {
    border-color: transparent;
    background: var(--btn);
  }

  .dgn-info h3 {
    font-size: clamp(30px, 3vw, 46px);
    font-weight: 800;
    letter-spacing: -0.05em;
    line-height: 1;
  }

  .dgn-info p {
    margin-top: 14px;
    color: var(--soft);
    font-size: 16.5px;
    line-height: 1.6;
  }

  .dgn-info small {
    display: block;
    margin-top: 16px;
    font-size: 13.5px;
    font-weight: 700;
    color: var(--pink);
  }

  .dgn-work {
    padding: clamp(110px, 11vw, 160px) 0;
  }

  .dgn-rows {
    border-top: 1px solid var(--line);
  }

  .dgn-row {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto 40px;
    align-items: center;
    gap: 30px;
    padding: clamp(24px, 2.6vw, 38px) 0;
    border-bottom: 1px solid var(--line);
    overflow: hidden;
  }

  .dgn-row::before {
    content: "";
    position: absolute;
    inset: 0;
    background: var(--grad);
    opacity: 0.1;
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.5s cubic-bezier(0.65, 0, 0.2, 1);
  }

  .dgn-row:hover::before {
    transform: scaleY(1);
  }

  .dgn-row b {
    position: relative;
    font-size: clamp(30px, 4.4vw, 70px);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.055em;
    transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1), color 0.4s;
  }

  .dgn-row b span {
    display: inline-block;
  }

  .dgn-row:hover b {
    transform: translateX(20px);
    color: var(--pink);
  }

  .dgn-row em {
    position: relative;
    font-size: clamp(16px, 1.4vw, 20px);
    color: var(--soft);
    text-align: right;
  }

  .dgn-row i {
    position: relative;
    width: 40px;
    height: 40px;
    border: 1px solid var(--line);
    border-radius: 50%;
    transition: background 0.4s, transform 0.5s;
  }

  .dgn-row i::before {
    content: "";
    position: absolute;
    left: 13px;
    top: 13px;
    width: 12px;
    height: 12px;
    border-top: 2px solid currentColor;
    border-right: 2px solid currentColor;
  }

  .dgn-row:hover i {
    background: var(--mag);
    border-color: var(--mag);
    transform: rotate(45deg);
  }

  .dgn-row__m {
    display: none;
  }

  .dgn-float {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 30;
    width: clamp(280px, 26vw, 400px);
    aspect-ratio: 4 / 5;
    margin: calc(clamp(280px, 26vw, 400px) * -0.625) 0 0 calc(clamp(280px, 26vw, 400px) * -0.5);
    border-radius: 20px;
    overflow: hidden;
    pointer-events: none;
    visibility: hidden;
    background: var(--bg2);
    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.6);
  }

  .dgn-pv {
    position: absolute;
    inset: 0;
    clip-path: inset(100% 0 0 0);
  }

  .dgn-pv.on {
    clip-path: inset(0 0 0 0);
    z-index: 2;
  }

  .dgn-pv img,
  .dgn-pv video,
  .dgn-row__m img,
  .dgn-row__m video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .dgn-land {
    position: relative;
    height: 100vh;
    min-height: 700px;
    overflow: hidden;
    background: radial-gradient(ellipse 60% 50% at 60% 40%, rgba(255, 7, 133, 0.1), transparent 70%), var(--bg);
  }

  .dgn-land__in {
    position: relative;
    z-index: 2;
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr auto;
    padding-top: clamp(90px, 9vw, 130px);
    padding-bottom: clamp(40px, 5vw, 70px);
    pointer-events: none;
  }

  .dgn-steps {
    grid-row: 3;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 24px;
  }

  .dgn-st {
    position: relative;
    padding-top: 20px;
    opacity: 0.35;
    transition: opacity 0.5s;
  }

  .dgn-st::before,
  .dgn-st::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    background: var(--line);
  }

  .dgn-st::after {
    height: 2px;
    background: var(--grad);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.7s cubic-bezier(0.65, 0, 0.2, 1);
  }

  .dgn-st.on {
    opacity: 1;
  }

  .dgn-st.on::after {
    transform: scaleX(1);
  }

  .dgn-st b {
    display: block;
    font-size: clamp(22px, 2vw, 30px);
    font-weight: 800;
    letter-spacing: -0.04em;
  }

  .dgn-st span {
    display: block;
    margin-top: 8px;
    font-size: 15px;
    line-height: 1.55;
    color: var(--soft);
  }

  .dgn-team {
    padding: clamp(110px, 11vw, 160px) 0;
  }

  .dgn-team__grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(40px, 6vw, 100px);
    align-items: center;
  }

  .dgn-tilt {
    perspective: 1200px;
  }

  .dgn-team__img {
    position: relative;
    aspect-ratio: 4 / 5;
    overflow: hidden;
    border-radius: 26px;
    background: var(--bg2);
    transform-style: preserve-3d;
  }

  .dgn-team__img img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.08);
  }

  .dgn-team__img::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at var(--gx, 50%) var(--gy, 30%), rgba(255, 138, 200, 0.35), transparent 45%);
    mix-blend-mode: screen;
    opacity: var(--go, 0);
    transition: opacity 0.4s;
    pointer-events: none;
  }

  .dgn-roles {
    margin-top: 34px;
  }

  .dgn-roles li {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 20px;
    padding: 16px 0;
    border-top: 1px solid var(--line);
    transition: padding 0.4s;
  }

  .dgn-roles li:hover {
    padding-left: 12px;
  }

  .dgn-roles li:last-child {
    border-bottom: 1px solid var(--line);
  }

  .dgn-roles span {
    font-size: 18px;
    font-weight: 700;
  }

  .dgn-roles em {
    font-size: 18px;
    color: var(--pink);
    text-align: right;
  }

  .dgn-office {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
    margin-top: 34px;
  }

  .dgn-office small {
    display: block;
    font-size: 12.5px;
    font-weight: 700;
    color: var(--soft);
  }

  .dgn-office span,
  .dgn-office a {
    display: block;
    margin-top: 4px;
    font-size: 15.5px;
    font-weight: 700;
    overflow-wrap: anywhere;
  }

  .dgn-copy {
    margin-top: 8px;
    padding: 0 0 2px;
    border: 0;
    border-bottom: 1px solid currentColor;
    background: none;
    color: var(--pink);
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
  }

  .dgn-contact {
    padding: clamp(110px, 11vw, 160px) 0;
    background: radial-gradient(ellipse 50% 60% at 85% 30%, rgba(255, 7, 133, 0.14), transparent 70%), var(--bg2);
  }

  .dgn-contact__grid {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    gap: clamp(40px, 6vw, 100px);
    align-items: start;
  }

  .dgn-contact .dgn-sub {
    margin-top: 22px;
  }

  .dgn-bar {
    height: 2px;
    margin-bottom: 40px;
    background: var(--line);
    overflow: hidden;
  }

  .dgn-bar span {
    display: block;
    height: 100%;
    background: var(--grad);
    transform: scaleX(0.16);
    transform-origin: left;
    transition: transform 0.6s cubic-bezier(0.65, 0, 0.2, 1);
  }

  .dgn-wiz {
    position: relative;
    min-height: 300px;
  }

  .dgn-pane {
    display: none;
  }

  .dgn-pane.on {
    display: block;
  }

  .dgn-pane label.dgn-qt,
  .dgn-pane p.dgn-qt {
    display: block;
    margin-bottom: 22px;
    font-size: clamp(26px, 2.6vw, 40px);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.045em;
  }

  .dgn-qt em {
    color: var(--pink);
  }

  .dgn-pane input[type="text"],
  .dgn-pane input[type="email"],
  .dgn-pane textarea {
    display: block;
    width: 100%;
    padding: 12px 0 14px;
    border: 0;
    border-bottom: 2px solid rgba(244, 238, 241, 0.25);
    border-radius: 0;
    background: transparent;
    color: var(--fg);
    font-size: clamp(20px, 1.8vw, 26px);
    font-weight: 600;
    outline: none;
    transition: border-color 0.3s;
  }

  .dgn-pane textarea {
    min-height: 120px;
    resize: vertical;
    font-size: 18px;
  }

  .dgn-pane input:focus,
  .dgn-pane textarea:focus {
    border-bottom-color: var(--mag);
  }

  .dgn-pane input::placeholder,
  .dgn-pane textarea::placeholder {
    color: rgba(244, 238, 241, 0.3);
  }

  .dgn-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .dgn-chip {
    position: relative;
    cursor: pointer;
  }

  .dgn-chip input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .dgn-chip span {
    display: inline-flex;
    padding: 13px 18px;
    border: 1px solid rgba(244, 238, 241, 0.22);
    border-radius: 999px;
    font-size: 15px;
    font-weight: 700;
    transition: background 0.3s, border-color 0.3s, transform 0.3s;
  }

  .dgn-chip:hover span {
    border-color: var(--pink);
  }

  .dgn-chip input:checked + span {
    border-color: transparent;
    background: var(--btn);
  }

  .dgn-chip input:focus-visible + span {
    outline: 2px solid var(--mag);
    outline-offset: 3px;
  }

  .dgn-err {
    display: block;
    min-height: 22px;
    margin-top: 10px;
    font-size: 14px;
    font-weight: 700;
    color: #ff8aa5;
  }

  .dgn-nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 14px 20px;
    margin-top: 26px;
  }

  .dgn-nav small {
    font-size: 13px;
    font-weight: 600;
    color: var(--soft);
  }

  .dgn-sum {
    display: grid;
    gap: 2px;
    margin-bottom: 26px;
  }

  .dgn-sum div {
    display: grid;
    grid-template-columns: 140px minmax(0, 1fr);
    gap: 16px;
    padding: 12px 0;
    border-bottom: 1px solid var(--line);
    font-size: 15.5px;
  }

  .dgn-sum dt {
    color: var(--soft);
    font-weight: 600;
  }

  .dgn-sum dd {
    margin: 0;
    font-weight: 700;
    overflow-wrap: anywhere;
  }

  .dgn-faq {
    padding: clamp(110px, 11vw, 160px) 0;
  }

  .dgn-faq__grid {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    gap: clamp(40px, 6vw, 100px);
  }

  .dgn-q {
    border-top: 1px solid var(--line);
  }

  .dgn-q:last-child {
    border-bottom: 1px solid var(--line);
  }

  .dgn-q h3 {
    font-size: inherit;
  }

  .dgn-q button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    width: 100%;
    padding: 28px 0;
    border: 0;
    background: none;
    color: var(--fg);
    text-align: left;
    font-size: clamp(18px, 1.6vw, 23px);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.25;
    cursor: pointer;
    transition: color 0.3s, padding 0.4s;
  }

  .dgn-q button:hover {
    color: var(--pink);
    padding-left: 10px;
  }

  .dgn-q button i {
    position: relative;
    flex: none;
    width: 22px;
    height: 22px;
  }

  .dgn-q button i::before,
  .dgn-q button i::after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 22px;
    height: 2px;
    margin-top: -1px;
    background: currentColor;
    transition: transform 0.45s cubic-bezier(0.65, 0, 0.2, 1);
  }

  .dgn-q button i::after {
    transform: rotate(90deg);
  }

  .dgn-q.open button i::after {
    transform: rotate(0deg);
  }

  .dgn-a {
    height: 0;
    overflow: hidden;
  }

  .dgn-a p {
    max-width: 640px;
    padding: 0 40px 30px 0;
    font-size: 16.5px;
    line-height: 1.65;
    color: var(--soft);
  }

  .dgn-final {
    padding: clamp(110px, 12vw, 180px) 0;
    text-align: center;
    overflow: hidden;
    background: radial-gradient(ellipse 50% 60% at 50% 100%, rgba(255, 7, 133, 0.22), transparent 70%), var(--bg);
  }

  .dgn-final h2 {
    font-size: clamp(60px, 12vw, 200px);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.06em;
  }

  .dgn-ch {
    display: inline-block;
    font-weight: 800;
    transition: color 0.3s;
  }

  .dgn-circle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: clamp(150px, 14vw, 200px);
    height: clamp(150px, 14vw, 200px);
    margin-top: clamp(30px, 4vw, 50px);
    border-radius: 50%;
    background: var(--btn);
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    line-height: 1.25;
    text-align: center;
  }

  .dgn-cur {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 40;
    width: 36px;
    height: 36px;
    margin: -18px 0 0 -18px;
    border: 1.5px solid rgba(255, 138, 200, 0.8);
    border-radius: 50%;
    pointer-events: none;
    opacity: 0;
    transition: width 0.35s, height 0.35s, margin 0.35s, background 0.35s, opacity 0.3s;
  }

  .dgn-cur.big {
    width: 76px;
    height: 76px;
    margin: -38px 0 0 -38px;
    background: rgba(255, 7, 133, 0.12);
  }

  html.lenis,
  html.lenis body {
    height: auto;
  }

  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }

  .dgn-kick {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 18px;
    font-family: var(--mono);
    font-size: 12.5px;
    color: var(--soft);
  }

  .dgn-kick::before {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--mag);
    box-shadow: 0 0 12px var(--mag);
  }

  .dgn-glass {
    border: 1px solid rgba(255, 169, 220, 0.2);
    border-radius: 24px;
    background: linear-gradient(160deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.015));
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 30px 80px rgba(0, 0, 0, 0.35);
  }

  .dgn-info.dgn-glass {
    padding: 24px 26px;
  }

  .dgn-formbox {
    padding: clamp(24px, 3vw, 44px);
  }

  .dgn-nodes {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
  }

  .dgn-node {
    position: absolute;
    left: 0;
    top: 0;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin: -46px 0 0 16px;
    padding: 7px 12px;
    border: 1px solid rgba(255, 169, 220, 0.18);
    border-radius: 999px;
    background: rgba(11, 7, 9, 0.6);
    font-family: var(--mono);
    font-size: 12.5px;
    color: var(--soft);
    white-space: nowrap;
    transition: color 0.4s, border-color 0.4s, background 0.4s;
  }

  .dgn-node i {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }

  .dgn-node.on {
    color: #fff;
    border-color: rgba(255, 7, 133, 0.7);
    background: rgba(103, 0, 51, 0.55);
  }

  .dgn-chip2 {
    position: absolute;
    left: 18px;
    bottom: 18px;
    z-index: 2;
    padding: 9px 14px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 999px;
    background: rgba(11, 7, 9, 0.55);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    font-family: var(--mono);
    font-size: 12.5px;
  }

  .dgn-q {
    transition: background 0.4s, box-shadow 0.4s;
  }

  .dgn-q.open {
    background: linear-gradient(90deg, rgba(255, 7, 133, 0.07), transparent 70%);
    box-shadow: inset 2px 0 0 var(--mag);
  }

  .dgn-q.open button {
    padding-left: 18px;
    color: var(--pink);
  }

  .dgn-q.open .dgn-a p {
    padding-left: 18px;
  }

  .dgn-orb {
    position: relative;
    display: inline-grid;
    place-items: center;
    width: clamp(230px, 20vw, 290px);
    height: clamp(230px, 20vw, 290px);
    margin-top: clamp(20px, 3vw, 40px);
  }

  .dgn-orb svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
    animation: dgnSpin 22s linear infinite;
  }

  .dgn-orb text {
    fill: rgba(244, 238, 241, 0.6);
    font-family: var(--mono);
    font-size: 11.5px;
    letter-spacing: 0.08em;
  }

  .dgn-orb .dgn-circle {
    margin: 0;
    box-shadow: 0 0 60px rgba(255, 7, 133, 0.35);
  }

  @keyframes dgnSpin {
    to {
      transform: rotate(360deg);
    }
  }

  .dgn-chap {
    position: fixed;
    left: 50%;
    bottom: 22px;
    z-index: 25;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px;
    border: 1px solid rgba(255, 169, 220, 0.25);
    border-radius: 16px;
    background: rgba(11, 7, 9, 0.6);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    opacity: 0;
    transform: translate(-50%, 20px);
    transition: opacity 0.5s, transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1);
    pointer-events: none;
  }

  .dgn-chap.on {
    opacity: 1;
    transform: translate(-50%, 0);
    pointer-events: auto;
  }

  .dgn-chap button {
    width: 36px;
    height: 36px;
    border: 1px solid rgba(244, 238, 241, 0.2);
    border-radius: 10px;
    background: none;
    color: var(--fg);
    font-family: var(--mono);
    font-size: 12px;
    cursor: pointer;
    transition: background 0.3s, border-color 0.3s;
  }

  .dgn-chap button:hover {
    border-color: var(--mag);
    background: var(--mag);
  }

  .dgn-chap__t {
    min-width: 140px;
    font-family: var(--mono);
    font-size: 13px;
    text-align: center;
  }

  .dgn-grain {
    position: fixed;
    inset: -50%;
    z-index: 24;
    pointer-events: none;
    opacity: 0.07;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
    animation: dgnGrain 0.9s steps(6) infinite;
  }

  @keyframes dgnGrain {
    0% {
      transform: translate(0, 0);
    }
    20% {
      transform: translate(-4%, 3%);
    }
    40% {
      transform: translate(3%, -5%);
    }
    60% {
      transform: translate(-6%, -2%);
    }
    80% {
      transform: translate(5%, 4%);
    }
    100% {
      transform: translate(0, 0);
    }
  }

  @media (max-width: 1033px) {
    .dgn-nodes,
    .dgn-chap {
      display: none;
    }

__LITE__    .dgn-svc {
      height: auto;
      min-height: 0;
      background: var(--bg);
    }

    .dgn-svc canvas {
      position: relative;
      height: 46vh;
      min-height: 300px;
      cursor: auto;
    }

    .dgn-svc__in {
      height: auto;
      padding-top: 30px;
      padding-bottom: 90px;
    }

    .dgn-svc__in > * {
      max-width: none;
    }

    .dgn-svc .dgn-hint {
      display: none;
    }

    .dgn-row {
      grid-template-columns: 88px minmax(0, 1fr) 40px;
      gap: 18px;
    }

    .dgn-row__m {
      position: relative;
      display: block;
      width: 88px;
      aspect-ratio: 4 / 5;
      overflow: hidden;
      border-radius: 12px;
      background: var(--bg2);
    }

    .dgn-row em {
      grid-column: 2;
      grid-row: 2;
      margin-top: -10px;
      text-align: left;
      font-size: 15px;
    }

    .dgn-row b {
      font-size: clamp(24px, 5vw, 40px);
    }

    .dgn-row__m {
      grid-row: 1 / span 2;
    }

    .dgn-row i {
      grid-column: 3;
      grid-row: 1 / span 2;
    }

    .dgn-float,
    .dgn-cur {
      display: none;
    }

    .dgn-land {
      height: auto;
      min-height: 0;
    }

    .dgn-land canvas {
      position: relative;
      height: 44vh;
      min-height: 280px;
    }

    .dgn-land__in {
      grid-template-rows: auto auto;
      gap: 0;
      padding-bottom: 90px;
    }

    .dgn-steps {
      grid-row: auto;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .dgn-st {
      opacity: 1;
    }

    .dgn-st::after {
      transform: scaleX(1);
    }

    .dgn-team__grid,
    .dgn-contact__grid,
    .dgn-faq__grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
__LITE768__    .dgn-steps,
    .dgn-office {
      grid-template-columns: 1fr;
    }

    .dgn-sum div {
      grid-template-columns: 1fr;
      gap: 2px;
    }

    .dgn-a p {
      padding-right: 0;
    }
  }

  .dgn canvas.dgn-pour {
    position: fixed;
    inset: 0;
    z-index: 6;
    width: 100vw;
    height: 100vh;
    display: none;
    pointer-events: none;
  }

  @media (min-width: 1034px) {
    .dgn-work {
      display: none;
    }
  }'''

HTML = f'''<div class="dgn">
__SPHTML__
  <section class="dgn-work" aria-label="Επιλεγμένα έργα">
    <div class="dgn-wrap">
      <div class="dgn-head"><h2 class="dgn-h2 dgn-split">Έργα που <em>μένουν</em></h2><a class="dgn-link" href="{W}">Όλα τα έργα</a></div>
      <ul class="dgn-rows">{rows}</ul>
    </div>
    <div class="dgn-float" aria-hidden="true">{prev}</div>
  </section>

  <section class="dgn-team" aria-label="Η ομάδα και το γραφείο μας">
    <div class="dgn-wrap dgn-team__grid">
      <div class="dgn-tilt"><div class="dgn-team__img"><img src="{U}2026/03/About-us.avif" alt="Η ομάδα της DigiGlow Media" loading="lazy" decoding="async"><span class="dgn-chip2">Λεωφόρος Νίκης 1, Θεσσαλονίκη</span></div></div>
      <div>
        <p class="dgn-kick">Ομάδα και γραφείο</p>
        <h2 class="dgn-h2 dgn-split">Μία ομάδα, <em>ένα γραφείο</em> στη Θεσσαλονίκη</h2>
        <ul class="dgn-roles">{roles}</ul>
        <div class="dgn-office"><div><small>Γραφείο</small><span>Λεωφόρος Νίκης 1, Θεσσαλονίκη</span></div><div><small>Τηλέφωνο</small><a href="tel:+302316070788">+30 231 607 0788</a></div><div><small>Email</small><a href="mailto:digi@digiglowmedia.gr">digi@digiglowmedia.gr</a><button type="button" class="dgn-copy">Αντιγραφή email</button></div></div>
      </div>
    </div>
  </section>

  <div class="dgn-cur" aria-hidden="true"></div>
  <div class="dgn-grain" aria-hidden="true"></div>
</div>'''

JS = r'''(function () {
  var root = document.querySelector(".dgn");
  if (!root || root.dataset.ready) return;
  root.dataset.ready = "1";
  var still = false;
  var lite = window.matchMedia("(max-width: 1033px)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var GL = typeof THREE !== "undefined";
  var G = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
  var motion = G && !still;
  var heavy = motion && !lite;
  if (G) gsap.registerPlugin(ScrollTrigger);
  if (G && typeof ScrambleTextPlugin !== "undefined") gsap.registerPlugin(ScrambleTextPlugin);
  function dbg(e) { (window.__dgnErr = window.__dgnErr || []).push(String((e && (e.stack || e.message)) || e)); }
  window.addEventListener("error", function (e) { dbg((e.message || "resource") + " " + (e.filename || (e.target && e.target.src) || "") + ":" + (e.lineno || "")); }, true);
  var LN = null;
  if (heavy && fine && typeof Lenis !== "undefined") { try { LN = new Lenis({ lerp: 0.1 }); LN.on("scroll", ScrollTrigger.update); gsap.ticker.add(function (t) { LN.raf(t * 1000); }); gsap.ticker.lagSmoothing(0); } catch (e) { LN = null; } }
  function goY(y) { if (LN) LN.scrollTo(y, { duration: 1.4 }); else window.scrollTo({ top: y, behavior: "smooth" }); }
  var DPR = Math.min(window.devicePixelRatio || 1, lite ? 1.25 : 1.75);
  var SVC = __SVC__;
  function seen(el, cb) { if ("IntersectionObserver" in window) new IntersectionObserver(function (e) { cb(e[0].isIntersecting); }, { rootMargin: "120px" }).observe(el); else cb(true); }
  function q(s, el) { return (el || root).querySelector(s); }
  function qa(s, el) { return Array.prototype.slice.call((el || root).querySelectorAll(s)); }
  function renderer(cv) { var r = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true }); r.setPixelRatio(DPR); return r; }
  function fit(r, cam, el) { var w = el.clientWidth, h = el.clientHeight; r.setSize(w, h, false); cam.aspect = w / Math.max(1, h); cam.updateProjectionMatrix(); }

  qa("video").forEach(function (v) {
    seen(v, function (on) { if (on) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause(); });
  });

  qa(".dgn-split").forEach(function (h) {
    var out = [];
    Array.prototype.slice.call(h.childNodes).forEach(function (n) {
      if (n.nodeType === 3) n.textContent.split(/(\s+)/).forEach(function (t) { if (!t) return; if (/^\s+$/.test(t)) out.push(document.createTextNode(" ")); else { var w = document.createElement("span"); w.className = "dgn-w"; var s = document.createElement("span"); s.textContent = t; w.appendChild(s); out.push(w); } });
      else { var w2 = document.createElement("span"); w2.className = "dgn-w"; var s2 = document.createElement("span"); s2.appendChild(n.cloneNode(true)); w2.appendChild(s2); out.push(w2); }
    });
    h.textContent = ""; out.forEach(function (n) { h.appendChild(n); });
    if (!motion) return;
    var inner = qa(".dgn-w > span", h);
    if (h.tagName === "H1") gsap.from(inner, { yPercent: 110, rotate: 4, duration: 1.2, ease: "power4.out", stagger: 0.06, delay: 0.2 });
    else gsap.from(inner, { yPercent: 110, rotate: 4, duration: 1, ease: "power4.out", stagger: 0.05, scrollTrigger: { trigger: h, start: "top 85%" } });
  });

__SPJS__  if (q(".dgn-svc")) {
  var svc = q(".dgn-svc"), tabs = qa(".dgn-tab"), info = q(".dgn-info");
  var rot = { y: 0 }, sel = 0, svcDraw = function () {};
  function choose(i, fromRot) {
    i = ((i % 6) + 6) % 6;
    if (i === sel && fromRot) return;
    sel = i;
    tabs.forEach(function (t, k) { t.classList.toggle("on", k === i); t.setAttribute("aria-selected", k === i ? "true" : "false"); });
    info.querySelector("h3").textContent = SVC[i][0]; info.querySelector("p").textContent = SVC[i][1]; info.querySelector("small").textContent = SVC[i][2];
    if (motion) gsap.fromTo(info.children, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power3.out" });
    if (!fromRot) {
      var target = -i * Math.PI / 3, cur = rot.y, d = target - cur;
      d = ((d + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
      if (motion) gsap.to(rot, { y: cur + d, duration: 1, ease: "power3.inOut", onUpdate: svcDraw }); else { rot.y = cur + d; svcDraw(); }
    }
  }
  tabs.forEach(function (t, k) { t.addEventListener("click", function () { choose(k); }); });
  q(".dgn-tabs").addEventListener("keydown", function (e) { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); var n = sel + (e.key === "ArrowRight" ? 1 : -1); choose(n); tabs[((n % 6) + 6) % 6].focus(); } });

  if (GL) try { (function () {
    var cv = q("canvas", svc), r = renderer(cv);
    var scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    scene.add(new THREE.HemisphereLight(0xffd6ec, 0x12040c, 0.7));
    var k1 = new THREE.PointLight(0xff0785, 3, 40); k1.position.set(6, 5, 8); scene.add(k1);
    var k2 = new THREE.PointLight(0x8fa2ff, 2.2, 40); k2.position.set(-8, -3, 6); scene.add(k2);
    var dl = new THREE.DirectionalLight(0xffffff, 0.6); dl.position.set(0, 8, 10); scene.add(dl);
    var geos = [new THREE.TorusKnotGeometry(0.75, 0.26, 160, 24), new THREE.BoxGeometry(1.4, 1.4, 1.4), new THREE.CylinderGeometry(0.85, 0.85, 1.2, 48), new THREE.OctahedronGeometry(1.15, 0), new THREE.TorusGeometry(0.9, 0.32, 32, 80), new THREE.IcosahedronGeometry(1.1, 0)];
    var ring = new THREE.Group(), R = 3.6, objs = [], env = null;
    if (THREE.RoomEnvironment && THREE.MeshPhysicalMaterial && !lite) { try { var pm = new THREE.PMREMGenerator(r); env = pm.fromScene(new THREE.RoomEnvironment(), 0.04).texture; scene.environment = env; } catch (e) { env = null; } }
    geos.forEach(function (g, i) {
      var mat = env ? new THREE.MeshPhysicalMaterial({ color: 0xffd3ea, metalness: 0.05, roughness: 0.1, transmission: 0.9, thickness: 1.4, ior: 1.45, iridescence: 1, iridescenceIOR: 1.35, iridescenceThicknessRange: [160, 640], clearcoat: 1, clearcoatRoughness: 0.06, envMapIntensity: 1.6, attenuationColor: new THREE.Color(0xff0785), attenuationDistance: 2.4, emissive: 0xff0785, emissiveIntensity: 0, flatShading: i === 3 || i === 5 })
        : new THREE.MeshStandardMaterial({ color: 0x3a0a26, roughness: 0.22, metalness: 0.75, emissive: 0xff0785, emissiveIntensity: 0, flatShading: i === 3 || i === 5 });
      var me = new THREE.Mesh(g, mat), a = i * Math.PI / 3;
      me.position.set(Math.sin(a) * R, 0, Math.cos(a) * R); me.userData.i = i; ring.add(me); objs.push(me);
    });
    scene.add(ring);
    var hov = -1, ray = new THREE.Raycaster(), mv = new THREE.Vector2(), drag = null, vel = 0, spin = 0;
    function size() { fit(r, cam, cv); var wide = !lite && cam.aspect > 1.2; ring.position.set(wide ? 3.2 : 0, wide ? -0.3 : 0, 0); cam.position.set(0, 2.2, wide ? 12.5 : 11); cam.lookAt(wide ? 3.2 : 0, -0.2, 0); }
    var LK = lite || still ? 1 : 0.15;
    function frame(t) {
      ring.rotation.y = rot.y + spin;
      objs.forEach(function (me, i) {
        var a = i * Math.PI / 3 + ring.rotation.y, front = Math.max(0, Math.cos(a));
        var s = 0.8 + Math.pow(front, 6) * 0.55 + (hov === i ? 0.12 : 0);
        me.scale.x += (s - me.scale.x) * LK; me.scale.y = me.scale.z = me.scale.x;
        me.rotation.x = t * 0.4 + i; me.rotation.y = t * 0.6 + i * 2;
        me.material.emissiveIntensity += ((i === sel ? 0.35 : hov === i ? 0.18 : 0) - me.material.emissiveIntensity) * LK;
        me.position.y = Math.sin(t * 1.2 + i) * 0.15;
      });
      r.render(scene, cam);
    }
    function snap() { var i = Math.round(-(rot.y + spin) / (Math.PI / 3)); rot.y += spin; spin = 0; choose(i, true); var tg = -i * Math.PI / 3; if (motion) gsap.to(rot, { y: tg, duration: 0.9, ease: "power3.out", onUpdate: svcDraw }); else { rot.y = tg; svcDraw(); } }
    function pick(e) { var b = cv.getBoundingClientRect(); mv.set((e.clientX - b.left) / b.width * 2 - 1, -((e.clientY - b.top) / b.height) * 2 + 1); ray.setFromCamera(mv, cam); var h = ray.intersectObjects(objs); return h.length ? h[0].object.userData.i : -1; }
    cv.addEventListener("pointerdown", function (e) { drag = { x: e.clientX, y: e.clientY, last: e.clientX, moved: 0 }; vel = 0; if (G) gsap.killTweensOf(rot); cv.classList.add("grabbing"); if (cv.setPointerCapture) cv.setPointerCapture(e.pointerId); });
    cv.addEventListener("pointermove", function (e) {
      if (drag) { var dx = e.clientX - drag.last; drag.last = e.clientX; drag.moved += Math.abs(dx); spin += dx * 0.009; vel = dx * 0.009; if (lite || still) frame(3); return; }
      if (!lite) { hov = pick(e); cv.style.cursor = hov >= 0 ? "pointer" : ""; }
    });
    function up(e) {
      if (!drag) return; cv.classList.remove("grabbing");
      var moved = drag.moved; drag = null;
      if (moved < 6) { var i = pick(e); if (i >= 0) { rot.y += spin; spin = 0; choose(i); return; } }
      if (motion && Math.abs(vel) > 0.004) { var iv = { v: vel }; gsap.to(iv, { v: 0, duration: 0.8, ease: "power2.out", onUpdate: function () { spin += iv.v; svcDraw(); }, onComplete: snap }); }
      else snap();
    }
    cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", up);
    cv.addEventListener("pointerleave", function () { hov = -1; });
    size();
    window.addEventListener("resize", function () { size(); frame(3); });
    if (lite || still) { svcDraw = function () { frame(3); }; frame(3); return; }
    if (heavy) ScrollTrigger.create({ trigger: svc, start: "top bottom", end: "bottom top", onUpdate: function (s) { if (!drag) spin += s.getVelocity() * 0.000012; } });
    var on = false, t0 = performance.now(), idle = 0;
    function loop(now) { if (!on) return; frame((now - t0) / 1000); requestAnimationFrame(loop); }
    var snapTimer; if (G) ScrollTrigger.addEventListener("scrollEnd", function () { if (!drag && Math.abs(spin) > 0.001) { clearTimeout(snapTimer); snapTimer = setTimeout(snap, 120); } });
    seen(svc, function (v) { on = v; if (v) requestAnimationFrame(loop); });
  })(); } catch (e) { dbg(e); }

  }
  var work = q(".dgn-work"), fl = q(".dgn-float"), pvs = qa(".dgn-pv"), rowsEl = qa(".dgn-row");
  if (heavy && fine) {
    var fx = gsap.quickTo(fl, "x", { duration: 0.6, ease: "power3" }), fy = gsap.quickTo(fl, "y", { duration: 0.6, ease: "power3" }), fr = gsap.quickTo(fl, "rotation", { duration: 0.8, ease: "power3" });
    var lastX = 0, curIdx = -1, shown = false;
    gsap.set(fl, { scale: 0.6, autoAlpha: 0 });
    window.addEventListener("pointermove", function (e) { fx(e.clientX); fy(e.clientY); fr(Math.max(-12, Math.min(12, (e.clientX - lastX) * 0.6))); lastX = e.clientX; }, { passive: true });
    rowsEl.forEach(function (row, i) {
      row.addEventListener("pointerenter", function () {
        if (!shown) { shown = true; gsap.to(fl, { scale: 1, autoAlpha: 1, duration: 0.5, ease: "power3.out" }); }
        if (i === curIdx) return;
        pvs.forEach(function (p, k) { if (k !== i) p.classList.remove("on"); });
        var p = pvs[i]; p.classList.add("on"); gsap.fromTo(p, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power3.inOut" });
        var v = p.querySelector("video"); if (v) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }
        curIdx = i;
      });
    });
    q(".dgn-rows").addEventListener("pointerleave", function () { shown = false; curIdx = -1; gsap.to(fl, { scale: 0.6, autoAlpha: 0, duration: 0.4, ease: "power3.in" }); });
    gsap.from(rowsEl, { yPercent: 60, opacity: 0, duration: 0.9, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: ".dgn-rows", start: "top 80%" } });
  }

  if (q(".dgn-land")) {
  var land = q(".dgn-land"), sts = qa(".dgn-st"), lp = { p: lite || still ? 1 : 0 };
  function setStep(p) { var k = Math.min(sts.length - 1, Math.floor(p * sts.length * 0.999)); sts.forEach(function (s, i) { s.classList.toggle("on", i <= k); }); }
  if (heavy) ScrollTrigger.create({ trigger: land, start: "top top", end: "+=2400", pin: true, scrub: 0.6, onUpdate: function (s) { lp.p = s.progress; setStep(s.progress); } });
  if (GL) try { (function () {
    var cv = q("canvas", land), r = renderer(cv);
    var scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(45, 1, 0.1, 200);
    scene.fog = new THREE.Fog(0x0b0709, 18, 46);
    var pts = [new THREE.Vector3(-14, -5, 2), new THREE.Vector3(-8, -3.2, 0), new THREE.Vector3(-3, -2.4, -2), new THREE.Vector3(1, -0.2, -1), new THREE.Vector3(5, 0.6, -3), new THREE.Vector3(9, 3.2, -2), new THREE.Vector3(14, 6, -4)];
    var curve = new THREE.CatmullRomCurve3(pts);
    var tg = new THREE.TubeGeometry(curve, 420, 0.09, 10, false), total = tg.index ? tg.index.count : 0;
    var tube = new THREE.Mesh(tg, new THREE.MeshBasicMaterial({ color: 0xff0785 })); scene.add(tube);
    var glow = new THREE.Mesh(new THREE.TubeGeometry(curve, 420, 0.32, 10, false), new THREE.MeshBasicMaterial({ color: 0xff0785, transparent: true, opacity: 0.16, depthWrite: false })); scene.add(glow);
    var head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 24, 24), new THREE.MeshBasicMaterial({ color: 0xffffff })); scene.add(head);
    var halo = new THREE.Mesh(new THREE.SphereGeometry(0.7, 24, 24), new THREE.MeshBasicMaterial({ color: 0xff0785, transparent: true, opacity: 0.25, depthWrite: false })); scene.add(halo);
    var nodes = [0.08, 0.38, 0.66, 0.94].map(function (u) {
      var g = new THREE.Group(), p = curve.getPointAt(u);
      var ringM = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.04, 12, 64), new THREE.MeshBasicMaterial({ color: 0x5a3550 }));
      var dot = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 16), new THREE.MeshBasicMaterial({ color: 0x5a3550 }));
      var stem = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, p.y + 7, 6), new THREE.MeshBasicMaterial({ color: 0x3a2033 }));
      stem.position.y = -(p.y + 7) / 2;
      g.add(ringM); g.add(dot); g.add(stem); g.position.copy(p); scene.add(g);
      return { u: u, g: g, ring: ringM, dot: dot };
    });
    var grid = new THREE.GridHelper(80, 64, 0x3a1530, 0x221019); grid.position.y = -7; scene.add(grid);
    var hot = new THREE.Color(0xff0785), cold = new THREE.Color(0x5a3550);
    var mx = 0, my = 0;
    land.addEventListener("pointermove", function (e) { var b = land.getBoundingClientRect(); mx = (e.clientX - b.left) / b.width * 2 - 1; my = (e.clientY - b.top) / b.height * 2 - 1; });
    var NK = lite || still ? 1 : 0.12, pv = new THREE.Vector3(), nlab = qa(".dgn-node", land);
    var cur = lp.p, camPos = new THREE.Vector3(), look = new THREE.Vector3();
    function frame(t) {
      cur += (lp.p - cur) * (lite || still ? 1 : 0.08);
      var u = Math.max(0.001, Math.min(1, cur));
      if (total) { var n = Math.floor(total * u / 3) * 3; tg.setDrawRange(0, n); glow.geometry.setDrawRange(0, n); }
      var hp = curve.getPointAt(u); head.position.copy(hp); halo.position.copy(hp); halo.scale.setScalar(1 + Math.sin(t * 4) * 0.15);
      nodes.forEach(function (nd) { var a = u >= nd.u; var c = a ? hot : cold; nd.ring.material.color.lerp(c, NK); nd.dot.material.color.lerp(c, NK); var s = a ? 1 + Math.sin(t * 2 + nd.u * 9) * 0.06 : 0.7; nd.g.scale.x += (s - nd.g.scale.x) * (NK === 1 ? 1 : 0.1); nd.g.scale.y = nd.g.scale.z = nd.g.scale.x; nd.g.rotation.y = mx * 0.6; });
      if (lite || still) { camPos.set(0, 2, 26); look.set(0, 0, -1); }
      else { camPos.set(hp.x * 0.55 - 3 + mx * 2, hp.y + 3.2 - my * 1.5, 15 - u * 3); look.set(hp.x * 0.7 + 2, hp.y * 0.8, -2); }
      cam.position.lerp(camPos, lite || still ? 1 : 0.08); cam.lookAt(look);
      if (!lite) nodes.forEach(function (nd, k) { var el = nlab[k]; if (!el) return; pv.copy(nd.g.position).project(cam); if (pv.z > 1) { el.style.opacity = 0; return; } el.style.opacity = ""; el.style.transform = "translate(" + ((pv.x + 1) / 2 * cv.clientWidth).toFixed(1) + "px," + ((1 - pv.y) / 2 * cv.clientHeight).toFixed(1) + "px)"; el.classList.toggle("on", u >= nd.u); });
      r.render(scene, cam);
    }
    function size() { fit(r, cam, cv); }
    size(); cam.position.set(-10, 0, 15);
    window.addEventListener("resize", function () { size(); frame(2); });
    if (lite || still) { frame(2); return; }
    var on = false, t0 = performance.now();
    function loop(now) { if (!on) return; frame((now - t0) / 1000); requestAnimationFrame(loop); }
    seen(land, function (v) { on = v; if (v) requestAnimationFrame(loop); });
  })(); } catch (e) { dbg(e); }

  }
  var tilt = q(".dgn-tilt"), timg = q(".dgn-team__img");
  if (motion) {
    if (lite) gsap.fromTo(timg, { clipPath: "inset(30% 20% 30% 20% round 26px)" }, { clipPath: "inset(0% 0% 0% 0% round 26px)", ease: "none", scrollTrigger: { trigger: tilt, start: "top 85%", end: "top 35%", scrub: 0.6 } });
    gsap.from(qa(".dgn-roles li"), { opacity: 0, x: 30, duration: 0.7, stagger: 0.07, ease: "power3.out", scrollTrigger: { trigger: q(".dgn-roles"), start: "top 80%" } });
    if (q(".dgn-final")) gsap.fromTo(q(".dgn-final h2"), { scale: 0.8, opacity: 0.2 }, { scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: q(".dgn-final"), start: "top 90%", end: "top 30%", scrub: true } });
  }
  if (heavy && fine) {
    var tx = gsap.quickTo(timg, "rotationY", { duration: 0.6, ease: "power3" }), ty = gsap.quickTo(timg, "rotationX", { duration: 0.6, ease: "power3" });
    tilt.addEventListener("pointermove", function (e) { var b = tilt.getBoundingClientRect(), px = (e.clientX - b.left) / b.width, py = (e.clientY - b.top) / b.height; tx((px - 0.5) * 14); ty((0.5 - py) * 14); timg.style.setProperty("--gx", px * 100 + "%"); timg.style.setProperty("--gy", py * 100 + "%"); timg.style.setProperty("--go", 1); });
    tilt.addEventListener("pointerleave", function () { tx(0); ty(0); timg.style.setProperty("--go", 0); });
  }
  if (GL && G && !lite && timg) try { (function () {
    var pimg = timg.querySelector("img"), pc = document.createElement("canvas"); pc.className = "dgn-pour"; pc.setAttribute("aria-hidden", "true"); root.appendChild(pc);
    var pr = new THREE.WebGLRenderer({ canvas: pc, alpha: true, antialias: false, premultipliedAlpha: true }), PD = Math.min(DPR, 1.5); pr.setPixelRatio(PD); pr.setClearColor(0x000000, 0);
    var PU = { uRes: { value: new THREE.Vector2() }, uRect: { value: new THREE.Vector4() }, uP: { value: 0 }, uT: { value: 0 }, uDp: { value: PD } };
    var ps = new THREE.Scene(), pcam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    ps.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({ uniforms: PU, vertexShader: "void main(){ gl_Position = vec4(position.xy, 0.0, 1.0); }", fragmentShader: __POUR__, transparent: true, premultipliedAlpha: true, depthTest: false, depthWrite: false })));
    function psize() { pr.setSize(window.innerWidth, window.innerHeight, false); PU.uRes.value.set(window.innerWidth * PD, window.innerHeight * PD); }
    psize(); window.addEventListener("resize", psize);
    var pst = { p: 0 }, pvis = false, pon = false, pt0 = performance.now();
    if (pimg) pimg.style.opacity = "0";
    gsap.to(pst, { p: 1, ease: "none", scrollTrigger: { trigger: timg, start: "top bottom", end: "center 50%", scrub: 0.6 } });
    function ploop(now) {
      if (!pon) return;
      var p = pst.p, act = p > 0.002 && p < 0.998;
      if (act !== pvis) { pvis = act; pc.style.display = act ? "block" : "none"; }
      if (pimg) pimg.style.opacity = Math.max(0, Math.min(1, (p - 0.55) / 0.11)).toFixed(3);
      if (act) { var bb = timg.getBoundingClientRect(); PU.uRect.value.set(bb.left * PD, bb.top * PD, bb.width * PD, bb.height * PD); PU.uP.value = p; PU.uT.value = (now - pt0) / 1000; pr.render(ps, pcam); }
      requestAnimationFrame(ploop);
    }
    seen(q(".dgn-team"), function (v) { pon = v; if (v) requestAnimationFrame(ploop); });
  })(); } catch (e) { dbg(e); var pi = timg.querySelector("img"); if (pi) pi.style.opacity = ""; }

  var cp = q(".dgn-copy");
  cp.addEventListener("click", function () {
    var done = function () { cp.textContent = "Αντιγράφηκε"; setTimeout(function () { cp.textContent = "Αντιγραφή email"; }, 1800); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText("digi@digiglowmedia.gr").then(done, done); else done();
  });

  if (q("#dgnWiz")) {
  var wiz = q("#dgnWiz"), panes = qa(".dgn-pane", wiz), bar = q(".dgn-bar span"), back = q(".dgn-back"), next = q(".dgn-next"), kb = q(".dgn-kb"), werr = q(".dgn-err", wiz), at = 0;
  var F = { name: q("#dgnName"), co: q("#dgnCo"), mail: q("#dgnMail"), msg: q("#dgnMsg") };
  function vals() {
    return { name: F.name.value.trim(), co: F.co.value.trim(), mail: F.mail.value.trim(), msg: F.msg.value.trim(),
      svc: qa('input[name="svc"]:checked', wiz).map(function (i) { return i.value; }), when: (q('input[name="when"]:checked', wiz) || { value: "" }).value };
  }
  function check(k, v) {
    if (k === "name" && !v.name) return "Γράψτε το όνομά σας για να συνεχίσουμε";
    if (k === "svc" && !v.svc.length) return "Επιλέξτε τουλάχιστον μία υπηρεσία";
    if (k === "mail" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.mail)) return v.mail ? "Το email δεν φαίνεται σωστό" : "Γράψτε το email σας";
    return "";
  }
  function go(n) {
    var from = panes[at], to = panes[n], dir = n > at ? 1 : -1;
    at = n; werr.textContent = "";
    bar.style.transform = "scaleX(" + ((n + 1) / panes.length) + ")";
    back.hidden = n === 0 || n === panes.length - 1;
    var last = n === panes.length - 1;
    next.hidden = last; kb.hidden = last;
    next.textContent = n === panes.length - 2 ? "Ολοκλήρωση" : "Συνέχεια";
    var focusIt = function () { var f = to.querySelector("input:not([type=checkbox]):not([type=radio]), textarea"); if (f) f.focus({ preventScroll: true }); };
    if (motion) {
      gsap.to(from, { x: -40 * dir, opacity: 0, duration: 0.3, ease: "power2.in", onComplete: function () { from.classList.remove("on"); gsap.set(from, { clearProps: "all" }); to.classList.add("on"); gsap.fromTo(to, { x: 40 * dir, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: "power3.out", onComplete: focusIt }); } });
    } else { from.classList.remove("on"); to.classList.add("on"); focusIt(); }
  }
  wiz.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = vals(), k = panes[at].dataset.k, m = check(k, v);
    if (m) { werr.textContent = m; if (motion) gsap.fromTo(panes[at], { x: -10 }, { x: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" }); return; }
    if (at === panes.length - 2) {
      var none = "δεν συμπληρώθηκε";
      var rowsD = [["Όνομα", v.name], ["Εταιρεία", v.co || none], ["Υπηρεσίες", v.svc.join(", ")], ["Έναρξη", v.when], ["Email", v.mail]];
      var dl = q(".dgn-sum", wiz); dl.textContent = "";
      rowsD.forEach(function (rw) { var d = document.createElement("div"), dt = document.createElement("dt"), dd = document.createElement("dd"); dt.textContent = rw[0]; dd.textContent = rw[1]; d.appendChild(dt); d.appendChild(dd); dl.appendChild(d); });
      q('[data-v="name"]', wiz).textContent = v.name;
      var body = rowsD.map(function (rw) { return rw[0] + " " + rw[1]; }).join("\n") + "\n\n" + v.msg;
      q(".dgn-mailgo", wiz).setAttribute("href", "mailto:digi@digiglowmedia.gr?subject=" + encodeURIComponent("Νέο μήνυμα από " + (v.co || v.name)) + "&body=" + encodeURIComponent(body));
    }
    go(at + 1);
  });
  back.addEventListener("click", function () { if (at > 0) go(at - 1); });
  F.msg.addEventListener("keydown", function (e) { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); wiz.requestSubmit ? wiz.requestSubmit() : next.click(); } });
  wiz.addEventListener("change", function () { werr.textContent = ""; });
  }

  var qs = qa(".dgn-q");
  function setQ(el, open) {
    var b = el.querySelector("button"), a = el.querySelector(".dgn-a");
    el.classList.toggle("open", open); b.setAttribute("aria-expanded", open ? "true" : "false");
    if (motion) gsap.to(a, { height: open ? "auto" : 0, duration: open ? 0.55 : 0.4, ease: "power3.inOut" }); else a.style.height = open ? "auto" : "0px";
  }
  qs.forEach(function (el) { el.querySelector("button").addEventListener("click", function () { var o = !el.classList.contains("open"); qs.forEach(function (x) { if (x !== el && x.classList.contains("open")) setQ(x, false); }); setQ(el, o); }); });

  if (heavy && fine) {
    var chs = qa(".dgn-ch"), fin = q(".dgn-final") || document.createElement("div");
    fin.addEventListener("pointermove", function (e) {
      chs.forEach(function (c) { var b = c.getBoundingClientRect(), dx = e.clientX - (b.left + b.width / 2), dy = e.clientY - (b.top + b.height / 2), d = Math.sqrt(dx * dx + dy * dy), k = Math.max(0, 1 - d / 320);
        c.style.fontWeight = Math.round(200 + 600 * (1 - k)); c.style.color = k > 0.55 ? "#ff8ac8" : ""; gsap.to(c, { y: -k * 26, duration: 0.4, ease: "power3.out", overwrite: true }); });
    });
    fin.addEventListener("pointerleave", function () { chs.forEach(function (c) { c.style.fontWeight = ""; c.style.color = ""; gsap.to(c, { y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" }); }); });

    qa(".dgn-mag").forEach(function (b) {
      var bx = gsap.quickTo(b, "x", { duration: 0.5, ease: "elastic.out(1, 0.4)" }), by = gsap.quickTo(b, "y", { duration: 0.5, ease: "elastic.out(1, 0.4)" });
      b.addEventListener("pointermove", function (e) { var rc = b.getBoundingClientRect(); bx((e.clientX - rc.left - rc.width / 2) * 0.3); by((e.clientY - rc.top - rc.height / 2) * 0.3); });
      b.addEventListener("pointerleave", function () { bx(0); by(0); });
    });

    var cur = q(".dgn-cur"), cx = gsap.quickTo(cur, "x", { duration: 0.35, ease: "power3" }), cy = gsap.quickTo(cur, "y", { duration: 0.35, ease: "power3" });
    window.addEventListener("pointermove", function (e) { var inside = root.contains(e.target); cur.style.opacity = inside ? 1 : 0; cx(e.clientX); cy(e.clientY); cur.classList.toggle("big", !!(e.target.closest && e.target.closest("a, button, label, .dgn-svc canvas, .dgn-spine canvas, .dgn-chap"))); }, { passive: true });
  }

  var grain = q(".dgn-grain"); seen(root, function (v) { grain.style.display = v ? "" : "none"; });
  var chap = q(".dgn-chap");
  if (heavy && fine && chap) {
    var CHS = [[".dgn-svc", "Υπηρεσίες"], [".dgn-land", "Μέθοδος"], [".dgn-team", "Ομάδα"], [".dgn-contact", "Επικοινωνία"], [".dgn-faq", "Ερωτήσεις"], [".dgn-final", "Συνάντηση"]].map(function (c) { return { el: q(c[0]), n: c[1] }; });
    var chI = -1, chT = q(".dgn-chap__t");
    CHS.forEach(function (c, i) { ScrollTrigger.create({ trigger: c.el, start: "top 60%", end: "bottom 60%", onToggle: function (s) { if (s.isActive) { if (chI !== i) { chI = i; scramble(chT, c.n); } chap.classList.add("on"); } else if (chI === i) { chI = -1; chap.classList.remove("on"); } } }); });
    qa("button", chap).forEach(function (bt) { bt.addEventListener("click", function () { var n = Math.max(0, Math.min(CHS.length - 1, (chI < 0 ? 0 : chI) + Number(bt.dataset.d))), el = CHS[n].el, pe = el.parentElement && el.parentElement.classList.contains("pin-spacer") ? el.parentElement : el; goY(pe.getBoundingClientRect().top + window.scrollY); }); });
  }

  if (G) window.addEventListener("load", function () { ScrollTrigger.refresh(); });
  if (/debug/.test(location.hash)) setTimeout(function () { var d = document.createElement("pre"); d.style.cssText = "position:fixed;left:10px;bottom:10px;z-index:99999;max-width:90vw;max-height:40vh;overflow:auto;padding:12px;background:#000;color:#0f0;font:12px monospace;white-space:pre-wrap"; d.textContent = "GL " + GL + "  GSAP " + G + "  Lenis " + !!LN + "\n" + ((window.__dgnErr || []).join("\n") || "no errors"); document.body.appendChild(d); }, 4000);
})();'''.replace('__SVC__', svcjs).replace('__POUR__', json.dumps(open('/home/claude/noir/pour.glsl').read()))

SCRIPTS = ('<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>\n'
           '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>\n'
           '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>\n')
CSS = CSS.replace('__SPCSS__', SP.CSS).replace('__LITE__', SP.LITE).replace('__LITE768__', SP.LITE768)
HTML = HTML.replace('__SPHTML__', SP.html(C, W).rstrip('\n'))
JS = JS.replace('__SPJS__', SP.js())
SCRIPTS = SP.SCRIPTS
snippet = '<style>\n  ' + CSS + '\n</style>\n\n' + HTML + '\n\n' + SCRIPTS + '<script>\n' + JS + '\n</script>\n'
with open(OUT + 'digiglow-homepage-noir.txt', 'w', encoding='utf-8', newline='\r\n') as f:
    f.write(snippet)
with open(OUT + 'digiglow-homepage-noir-preview.html', 'w', encoding='utf-8', newline='\r\n') as f:
    f.write('<!doctype html>\n<html lang="el">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>DigiGlow Noir</title>\n<style>body{margin:0;background:#0b0709}</style>\n</head>\n<body>\n' + snippet + '</body>\n</html>\n')
with open(OUT + 'noir-artifact.html', 'w', encoding='utf-8') as f:
    f.write('<title>DigiGlow Noir Homepage</title>\n<style>html,body{background:#0b0709;color:#f4eef1;color-scheme:dark}</style>\n' + snippet)
open('/tmp/claude-0/-home-claude/7aceea92-98ce-5ed8-b9e4-115ae63c36a7/scratchpad/noir.js', 'w').write(JS)
print('ok', len(snippet))
