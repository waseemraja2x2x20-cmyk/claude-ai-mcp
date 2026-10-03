// Builds the static site into dist/. Run: node build.mjs
// Each article gets its own URL (/articles/<slug>) with its own title, description and share image.
import { mkdirSync, writeFileSync, readFileSync, rmSync, cpSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { POSTS } from './src/posts.mjs';

const SITE = 'https://thegrowthframework.live';
const NAME = 'The Growth Framework';
const IG = 'https://www.instagram.com/breaking_patrens_growth/';
const HANDLE = '@breaking_patrens_growth';
const OUT = 'dist';
// Email sign-up (Supabase). Both values are public by design: the key can only ADD rows to the
// subscribers table (see supabase/subscribers.sql). Leave empty to hide the form.
const SIGNUP = { url: '', key: '' };

const COLORS = { Mind: 'mind', Body: 'body-p', Money: 'money' };
const PSX = ['what-is-psx-alpha', 'five-numbers-before-a-psx-stock', 'index-is-not-your-portfolio', 'crypto-and-psx-risk', 'one-page-trade-plan'];
// Topic links on the pillar cards. Each one points at a real page.
const PILLARS = {
  Mind: { key: 'mind', line: 'Discipline, focus and habits that hold up on low days.', topics: [
    ['Discipline beats motivation', 'https://www.instagram.com/p/Dd9UwNLDPtd/'],
    ['Focus blocks and deep work', '/articles/one-focused-block'],
    ['Decision journals and weekly reviews', '/articles/decision-journal']] },
  Body: { key: 'body', line: 'Simple training, sleep and food you can keep for life.', topics: [
    ['Strength training at home', '/articles/strength-twice-a-week'],
    ['Daily walking', '/articles/walk-every-day'],
    ['Sleep, food and longevity', '/articles/longevity-basics']] },
  Money: { key: 'money', line: 'Rules before moods: risk, investing and PSX research.', topics: [
    ['Risk management', '/articles/crypto-and-psx-risk'],
    ['PSX Alpha research', '/psx'],
    ['Long-term planning', '/articles/longevity-and-money']] },
};
const SOCIAL = [
  { n: 'Instagram', h: HANDLE, u: IG, k: 'IG', bg: 'linear-gradient(135deg,#f58529,#dd2a7b,#8134af)' },
  { n: 'Pinterest', h: '@wraja7325', u: 'https://www.pinterest.com/wraja7325/', k: 'P', bg: '#e60023' },
  { n: 'Facebook', h: '@wander.sky', u: 'https://www.facebook.com/wander.sky', k: 'f', bg: '#1877f2' },
  { n: 'LinkedIn', h: 'Muhammad Waseem Raja', u: 'https://www.linkedin.com/in/muhammad-waseem-raja-848a25323/', k: 'in', bg: '#0a66c2' },
];
const NAV = [['/mind', 'Mind'], ['/body', 'Body'], ['/money', 'Money'], ['/psx', 'PSX Alpha'], ['/guides', 'Free guides'], ['/about', 'About']];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const fmt = d => { const p = d.split('-'); return (+p[2]) + ' ' + MONTHS[p[1] - 1] + ' ' + p[0]; };
const url = path => SITE + (path === '/' ? '/' : path);
const ext = href => href.startsWith('http') ? " target='_blank' rel='noopener'" : '';
const count = name => POSTS.filter(p => p.pillar === name).length;
const postUrl = p => '/articles/' + p.slug;

// Fingerprint assets so browsers pick up changes straight away.
const css = readFileSync('src/styles.css', 'utf8');
const js = readFileSync('src/site.js', 'utf8');
const ver = s => createHash('sha1').update(s).digest('hex').slice(0, 8);
const CSS_HREF = '/assets/styles.css?v=' + ver(css);
const JS_SRC = '/assets/site.js?v=' + ver(js);

function layout({ path, title, description, og = 'default', type = 'website', jsonld, head = '', body }) {
  const full = path === '/' ? title : title + ' · ' + NAME;
  const navHtml = NAV.map(([h, t]) => `<a href="${h}"${path === h || (h !== '/' && path.startsWith(h + '/')) ? ' aria-current="page"' : ''}>${t}</a>`).join('');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(full)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url(path)}">
<meta property="og:site_name" content="${NAME}">
<meta property="og:type" content="${type}">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url(path)}">
<meta property="og:image" content="${SITE}/og/${og}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="en_PK">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0c0d10">
<link rel="alternate" type="application/rss+xml" title="${NAME}" href="/feed.xml">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230c0d10'/%3E%3Ccircle cx='22' cy='38' r='9' fill='%23a082ff'/%3E%3Ccircle cx='32' cy='24' r='9' fill='%233ddc84'/%3E%3Ccircle cx='42' cy='38' r='9' fill='%23ffc454'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=JetBrains+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="${CSS_HREF}">
<script>try{var t=localStorage.getItem('tgf-theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}</script>
${head}${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld).replace(/</g, '\\u003c')}</script>\n` : ''}</head>
<body>
<header class="top">
  <div class="wrap">
    <a class="brand" href="/" aria-label="${NAME} home"><span class="dots" aria-hidden="true"><i style="background:var(--mind)"></i><i style="background:var(--body)"></i><i style="background:var(--money)"></i></span>${NAME}</a>
    <button class="iconbtn menubtn" id="menuBtn" aria-expanded="false" aria-controls="nav">Menu</button>
    <nav class="nav" id="nav" aria-label="Main">
      ${navHtml}
      <button class="iconbtn" id="themeBtn" type="button" aria-label="Switch light or dark theme">Theme</button>
    </nav>
    <a class="igbtn" href="${IG}" target="_blank" rel="noopener">IG <span>Follow</span></a>
  </div>
</header>
<main id="app">
${body}
</main>
<footer>
  <div class="wrap">
    <div class="fgrid">
      <div>
        <a class="brand" href="/"><span class="dots" aria-hidden="true"><i style="background:var(--mind)"></i><i style="background:var(--body)"></i><i style="background:var(--money)"></i></span>${NAME}</a>
        <p>Better life through mind, body and money. Simple, sourced notes for ambitious people in Pakistan and South Asia.</p>
      </div>
      <div><h4>Read</h4><ul><li><a href="/mind">Mind</a></li><li><a href="/body">Body</a></li><li><a href="/money">Money</a></li><li><a href="/psx">PSX Alpha</a></li><li><a href="/articles">All articles</a></li></ul></div>
      <div><h4>Connect</h4><ul>${SOCIAL.map(s => `<li><a href="${s.u}" target="_blank" rel="noopener">${s.n === 'Instagram' ? 'Instagram ' + HANDLE : s.n}</a></li>`).join('')}<li><a href="/guides">Free guides</a></li><li><a href="/about">About Waseem</a></li></ul></div>
    </div>
    ${shareBar(url(path), path === '/' ? NAME + ': better life through mind, body and money' : title + ' · ' + NAME, path === '/' ? 'Share the site' : 'Share this page')}
    <p class="fine">Educational content only. Not medical or financial advice. Talk to a doctor or a licensed adviser before acting. © <span id="yr">${new Date().getFullYear()}</span> ${NAME} · thegrowthframework.live</p>
  </div>
</footer>
<script src="${JS_SRC}" defer></script>
</body>
</html>
`;
}

function shareBar(u0, text, label) {
  const u = encodeURIComponent(u0), x = encodeURIComponent(text);
  return `<div class='share'><b>${label}</b>` +
    `<a href='https://www.facebook.com/sharer/sharer.php?u=${u}' target='_blank' rel='noopener'>Facebook</a>` +
    `<a href='https://www.linkedin.com/sharing/share-offsite/?url=${u}' target='_blank' rel='noopener'>LinkedIn</a>` +
    `<a href='https://pinterest.com/pin/create/button/?url=${u}&amp;description=${x}' target='_blank' rel='noopener'>Pinterest</a>` +
    `<a href='https://wa.me/?text=${x}%20${u}' target='_blank' rel='noopener'>WhatsApp</a></div>`;
}

const chip = p => `<span class='chip'><i></i>${p}</span>`;
const metaLine = p => `<span class='meta'><time datetime='${p.date}'>${fmt(p.date)}</time> · ${p.read} min read</span>`;
const card = p => `<a class='card ${COLORS[p.pillar]}' href='${postUrl(p)}' data-pillar='${p.pillar}'>${chip(p.pillar)}<h3>${esc(p.title)}</h3><p>${esc(p.lede)}</p>${metaLine(p)}</a>`;
const feature = p => `<a class='feature ${COLORS[p.pillar]}' href='${postUrl(p)}'>${chip(p.pillar)}<h3>${esc(p.title)}</h3><p>${esc(p.lede)}</p>${metaLine(p)}</a>`;

function slide(cls, label, cnt, title, extra = '') {
  return `<div class='slide ${cls}'><div class='sc'><b>${label}</b><span>${cnt}</span></div>${title ? `<div class='st'>${title}</div>` : ''}${extra}<div class='sl'>${HANDLE}</div></div>`;
}
function igEmbeds() {
  const E = [
    ['https://www.instagram.com/p/Dd9UwNLDPtd/', slide('mind', 'MIND', '1/7', 'Discipline beats <em>motivation</em>')],
    ['https://www.instagram.com/reel/Dd9U27ejXVO/', slide('mind', 'REEL', '0:10', 'Motivation fades. <em>Habits stay.</em>', "<span class='play'></span>")],
    ['https://www.instagram.com/p/Dd6txghlwSY/', slide('body-p', 'BODY', '1/7', 'Push-ups, <em>done right</em>', "<div class='sub' style='margin-top:10px'>No gym needed. Knee option for beginners.</div>")],
  ];
  return "<div class='embeds'>" + E.map(x => `<blockquote class='instagram-media' data-instgrm-permalink='${x[0]}?utm_source=ig_embed' data-instgrm-version='14'><a href='${x[0]}' target='_blank' rel='noopener' style='padding:0'>${x[1]}<span style='display:block;padding:12px 14px'>View on Instagram →</span></a></blockquote>`).join('') + '</div>';
}
const socials = () => "<div class='socials'>" + SOCIAL.map(s => `<a class='social' href='${s.u}' target='_blank' rel='noopener'><i style='background:${s.bg}'>${s.k}</i><div><b>${s.n}</b><span>${esc(s.h)}</span></div></a>`).join('') + '</div>';

function signupForm(source, heading = 'Get new articles by email') {
  if (!SIGNUP.url || !SIGNUP.key) return '';
  return `<form class='signup' data-url='${SIGNUP.url}' data-key='${SIGNUP.key}' data-source='${source}' novalidate>` +
    `<label for='su-${source}'>${heading}</label>` +
    `<div class='signup-row'><input id='su-${source}' type='email' name='email' autocomplete='email' inputmode='email' placeholder='you@example.com' required maxlength='254'>` +
    `<input class='hp' type='text' name='website' tabindex='-1' autocomplete='off' aria-hidden='true'>` +
    `<button class='btn solid' type='submit'>Sign up</button></div>` +
    `<p class='signup-note' role='status' aria-live='polite'>New articles and free guides. No spam, unsubscribe any time.</p></form>`;
}

function psxBand(withLink, cls = 'block band money') {
  return `<section class='${cls}'><div class='wrap split'><div><span class='chip'><i></i>PSX Alpha</span><h2 style='margin-top:16px'>Research a PSX stock in <span class='acc'>five numbers</span>.</h2><p>PSX Alpha is a simple, repeatable way to look at Pakistan Stock Exchange companies before you read the headlines. Facts first, then opinion.</p>${withLink ? "<div class='ctas'><a class='btn solid' href='/psx'>Explore PSX Alpha</a></div>" : ''}</div>` +
    "<ol class='numbers'><li><div>Earnings per share (EPS) and its trend<small>Is profit per share growing over several years?</small></div></li><li><div>Price-to-earnings (P/E)<small>How much you pay for each rupee of profit.</small></div></li><li><div>Dividend yield and payout<small>Cash returned, and whether it is sustainable.</small></div></li><li><div>Debt against equity<small>How much of the business is borrowed.</small></div></li><li><div>Cash from operations<small>Do reported profits turn into real cash?</small></div></li></ol></div></section>";
}
const line = (style = '') => `<div class='wrap'><div class='line'${style ? ` style='${style}'` : ''}></div></div>`;

// ---------- pages ----------
const pages = [];
const page = (path, file, opts) => pages.push({ path, file, html: layout({ path, ...opts }) });

// Old links used #fragments (e.g. /#five-numbers-before-a-psx-stock). Send them to the new pages.
const LEGACY = { home: '/', mind: '/mind', body: '/body', money: '/money', psx: '/psx', guides: '/guides', about: '/about', all: '/articles' };
const legacyRedirect = `<script>(function(){var h=location.hash.slice(1);if(!h||h==='latest')return;var R=${JSON.stringify(LEGACY)},S=${JSON.stringify(POSTS.map(p => p.slug))};var t=R[h]||(S.indexOf(h)>=0?'/articles/'+h:null);if(t&&t!=='/')location.replace(t+location.search)})();</script>\n`;

{ // home
  const latest = POSTS.slice(0, 7);
  let h = `<section class='hero'><div class='wrap hero-grid'><div>` +
    `<span class='eyebrow'>${HANDLE} · Pakistan</span>` +
    `<h1 style='margin-top:16px'>Better life through <span class='m'>mind</span>, <span class='b'>body</span> &amp; <span class='y'>money</span>.</h1>` +
    `<p class='lead'>Short, sourced notes on discipline, simple training, healthy desi food and sensible investing, plus PSX Alpha: a method for researching Pakistan Stock Exchange stocks.</p>` +
    `<div class='ctas'><a class='btn solid' href='#latest'>Read the latest</a><a class='btn ghost' href='${IG}' target='_blank' rel='noopener'>Follow on Instagram</a></div>` +
    `</div><div class='hero-art' aria-hidden='true'>${slide('body-p', 'BODY', '1/7', 'Push-ups, <em>done right</em>')}${slide('mind', 'MIND', '1/7', 'Discipline beats <em>motivation</em>')}</div></div><div class='giant' aria-hidden='true'>GROW</div></section>`;
  h += line();
  h += `<section class='block'><div class='wrap'><div class='sechead'><h2>Three pillars, one framework</h2><a href='/articles/why-one-framework'>Why all three →</a></div><div class='pillars'>`;
  for (const n of ['Mind', 'Body', 'Money']) {
    const P = PILLARS[n];
    h += `<div class='pillar ${COLORS[n]}'><span class='count'>${count(n)} articles</span><h3><a href='/${P.key}'>${n}</a></h3><p>${P.line}</p><ul>${P.topics.map(([t, href]) => `<li><a href='${href}'${ext(href)}>${t}</a></li>`).join('')}</ul></div>`;
  }
  h += `</div></div></section>`;
  h += `<section class='block' id='latest' style='padding-top:0'><div class='wrap'><div class='sechead'><h2>Latest articles</h2><a href='/articles'>All ${POSTS.length} articles →</a></div>${feature(latest[0])}<div class='grid'>${latest.slice(1).map(card).join('')}</div></div></section>`;
  h += psxBand(true);
  h += `<section class='block'><div class='wrap'><div class='sechead'><h2>Follow along</h2><a href='${IG}' target='_blank' rel='noopener'>${HANDLE} →</a></div><p style='color:var(--muted);margin:-12px 0 24px;max-width:40em'>New carousels and Reels every day on Instagram. Career and markets updates on LinkedIn.</p>${igEmbeds()}${socials()}</div></section>`;
  h += `<section class='block band'><div class='wrap split'><div><span class='eyebrow'>Free</span><h2 style='margin-top:12px'>Free trading guides</h2></div><div><p>Get the <b>Trading Guidelines</b> and <b>Risk Management Guide</b> PDFs for free. Comment <b>GUIDE</b> on any trading post on Instagram and the guide is sent to you.</p><div class='ctas'><a class='btn ${SIGNUP.url ? 'ghost' : 'solid'}' href='/guides'>See the guides</a></div>${signupForm('home')}</div></div></section>`;
  page('/', 'index.html', {
    title: NAME + ' · Mind, Body & Money',
    description: 'Better life through mind, body and money. Practical notes on discipline, simple training, healthy food and sensible investing, plus PSX Alpha: a method for researching Pakistan Stock Exchange stocks.',
    head: legacyRedirect,
    jsonld: { '@context': 'https://schema.org', '@type': 'WebSite', name: NAME, url: SITE + '/', description: 'Better life through mind, body and money.', inLanguage: 'en' },
    body: h,
  });
}

for (const name of ['Mind', 'Body', 'Money']) { // pillar pages
  const P = PILLARS[name], list = POSTS.filter(p => p.pillar === name);
  let h = `<div class='${COLORS[name]}'><section class='wrap pagehead'>${chip(name)}<h1 style='margin-top:18px'>${name}</h1><p>${P.line}</p></section>${line('margin-top:28px')}`;
  h += `<section class='block'><div class='wrap'>${list.length ? feature(list[0]) + `<div class='grid'>${list.slice(1).map(card).join('')}</div>` : "<p class='empty'>New articles are on the way.</p>"}</div></section></div>`;
  page('/' + P.key, P.key + '.html', { title: name, description: `${P.line} ${list.length} short, sourced articles from ${NAME}.`, og: P.key, body: h });
}

{ // all articles
  let h = `<section class='wrap pagehead'><span class='eyebrow'>Library</span><h1 style='margin-top:14px'>All articles</h1><p>${POSTS.length} short reads across mind, body and money.</p></section><section class='block' style='padding-top:28px'><div class='wrap'><div class='filters' role='group' aria-label='Filter by pillar'>`;
  for (const n of ['All', 'Mind', 'Body', 'Money']) h += `<button type='button' class='${COLORS[n] || ''}' data-p='${n}' aria-pressed='${n === 'All'}'>${n === 'All' ? '' : "<i class='dot'></i>"}${n}</button>`;
  h += `</div><div class='grid'>${POSTS.map(card).join('')}</div></div></section>`;
  page('/articles', 'articles.html', { title: 'All articles', description: `All ${POSTS.length} articles from ${NAME}: discipline, training, food, money and PSX research.`, og: 'articles', body: h });
}

{ // PSX Alpha
  const list = POSTS.filter(p => PSX.includes(p.slug));
  let h = `<div class='money'><section class='wrap pagehead'><span class='chip'><i></i>PSX Alpha</span><h1 style='margin-top:18px'>PSX Alpha</h1><p>A plain-language method for researching Pakistan Stock Exchange stocks: check the numbers, keep risk rules, and think in years, not days.</p></section>${line('margin-top:28px')}</div>`;
  h += psxBand(false, 'block money');
  h += `<section class='block band'><div class='wrap'><div class='sechead'><h2>PSX and risk articles</h2></div><div class='grid'>${list.map(card).join('')}</div></div></section>`;
  h += `<section class='block'><div class='wrap'><p class='meta'>PSX Alpha is educational research, not a buy or sell recommendation. Markets carry risk. Talk to a licensed adviser before investing.</p></div></section>`;
  page('/psx', 'psx.html', { title: 'PSX Alpha: research a PSX stock in five numbers', description: 'PSX Alpha is a plain-language method for researching Pakistan Stock Exchange stocks: EPS, P/E, dividend yield, debt and cash from operations.', og: 'psx', body: h });
}

{ // guides
  let h = `<section class='wrap pagehead'><span class='eyebrow'>Free resources</span><h1 style='margin-top:14px'>Free guides</h1><p>Practical PDFs to help you trade and invest with rules instead of moods.</p></section>${line('margin-top:28px')}`;
  h += `<section class='block'><div class='wrap'><div class='guides'>` +
    `<div class='guide money'><div class='doc'></div><span class='status free'>Free</span><h3>Trading Guidelines</h3><p>Golden rules for PSX and crypto trading, a pre-trade checklist, a trading plan template and a journal format.</p></div>` +
    `<div class='guide money'><div class='doc'></div><span class='status free'>Free</span><h3>Risk Management Guide</h3><p>The 1% rule, position sizing with a PSX example, stop-losses, risk/reward and why big losses are hard to recover.</p></div>` +
    `<div class='guide mind'><div class='doc'></div><span class='status'>Coming soon</span><h3>Trading Journal &amp; Risk Planner</h3><p>A printable journal and planner to log every trade, review your week and keep your risk rules in one place.</p></div>` +
    `</div><div class='how'><h3 style='font-size:24px'>How to get a free guide</h3><ol><li>Open any trading post on <a href='${IG}' target='_blank' rel='noopener'>${HANDLE}</a>.</li><li>Comment <b>GUIDE</b>.</li><li>The PDF is sent to you in your messages.</li></ol></div>${signupForm('guides', 'Or get the guides and new articles by email')}` +
    `<p class='meta' style='margin-top:20px'>Educational content, not financial advice.</p></div></section>`;
  page('/guides', 'guides.html', { title: 'Free trading guides', description: 'Free Trading Guidelines and Risk Management Guide PDFs for PSX and crypto traders in Pakistan.', og: 'guides', body: h });
}

{ // about
  let h = `<section class='wrap pagehead'><span class='eyebrow'>About</span><h1 style='margin-top:14px'>Discipline first. <span style='color:var(--mind)'>Then</span> everything else.</h1><p>${NAME} is run by Waseem Raja, a retired Pakistan Army officer who now writes about the habits, health and money rules that keep a life on track.</p></section>${line('margin-top:28px')}`;
  h += `<section class='block'><div class='wrap split'><div><h2>Waseem's background</h2><p>Twenty-one years of service taught one lesson that carries into everything here: rules and routines beat moods. This site turns that into simple, sourced notes for mind, body and money.</p></div><ul class='facts'>` +
    `<li><b>Service</b><span>Pakistan Army, 1999–2021. Retired as a Major after 21 years.</span></li>` +
    `<li><b>Experience</b><span>Mechanised Forces, Infantry and Civil Armed Forces. Led teams of 200 to 700 people.</span></li>` +
    `<li><b>UN mission</b><span>UN peacekeeping with UNMIL (United Nations Mission in Liberia), 2006–2007.</span></li>` +
    `<li><b>Final post</b><span>Heavy Industries Taxila (HIT), 2018–2021, running major logistics and movement operations.</span></li>` +
    `<li><b>Markets</b><span>About four years trading crypto and following the Pakistan Stock Exchange as a long-term investor.</span></li>` +
    `<li><b>Based in</b><span>Rawalpindi / Islamabad, Pakistan.</span></li>` +
    `</ul></div></section>`;
  h += `<section class='block' style='padding-top:0'><div class='wrap'><div class='sechead'><h2>Connect with Waseem</h2></div>${socials()}</div></section>`;
  h += `<section class='block band'><div class='wrap'><div class='sechead'><h2>How we write</h2></div><div class='pillars'>` +
    `<div class='pillar mind' style='min-height:0'><h3>Sourced</h3><p>Health facts come from trusted sources such as the NHS, Mayo Clinic, Harvard, NIH and USDA. No made-up numbers.</p></div>` +
    `<div class='pillar body-p' style='min-height:0'><h3>Simple</h3><p>Short sentences, clear steps and one action you can take today.</p></div>` +
    `<div class='pillar money' style='min-height:0'><h3>Honest</h3><p>No miracle cures and no get-rich promises. Educational content, never medical or financial advice.</p></div>` +
    `</div></div></section>`;
  page('/about', 'about.html', {
    title: 'About Waseem Raja', description: 'Waseem Raja is a retired Pakistan Army Major who writes about discipline, health and money rules at The Growth Framework.', og: 'about',
    jsonld: { '@context': 'https://schema.org', '@type': 'Person', name: 'Waseem Raja', url: SITE + '/about', sameAs: SOCIAL.map(s => s.u) }, body: h,
  });
}

POSTS.forEach((p, i) => { // articles
  const newer = POSTS[i - 1], older = POSTS[i + 1], P = PILLARS[p.pillar];
  let h = `<div class='wrap ${COLORS[p.pillar]}'><article class='article'><nav class='crumbs' aria-label='Breadcrumb'><a href='/'>Home</a> / <a href='/${P.key}'>${p.pillar}</a></nav><div style='margin-top:22px'>${chip(p.pillar)}</div><h1>${esc(p.title)}</h1><p class='lede'>${esc(p.lede)}</p><div class='meta'><time datetime='${p.date}'>${fmt(p.date)}</time> · ${p.read} min read · By <a href='/about'>Waseem Raja</a></div><div class='content'>${p.body}</div>`;
  h += shareBar(url(postUrl(p)), p.title + ' · ' + NAME, 'Share this article');
  h += signupForm('article');
  h += `<p class='disclaimer'>Educational content only. This is not medical or financial advice. Check facts with qualified professionals before you act.</p><nav class='nextprev' aria-label='More articles'>`;
  if (older) h += `<a href='${postUrl(older)}'><span>Older</span><strong>${esc(older.title)}</strong></a>`;
  if (newer) h += `<a href='${postUrl(newer)}'><span>Newer</span><strong>${esc(newer.title)}</strong></a>`;
  h += `</nav></article></div>`;
  page(postUrl(p), 'articles/' + p.slug + '.html', {
    title: p.title, description: p.lede, og: p.slug, type: 'article',
    head: `<meta property="article:published_time" content="${p.date}">\n<meta property="article:section" content="${p.pillar}">\n`,
    jsonld: {
      '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title, description: p.lede,
      datePublished: p.date, dateModified: p.date, articleSection: p.pillar, inLanguage: 'en',
      image: `${SITE}/og/${p.slug}.jpg`, mainEntityOfPage: url(postUrl(p)),
      author: { '@type': 'Person', name: 'Waseem Raja', url: SITE + '/about' },
      publisher: { '@type': 'Organization', name: NAME, url: SITE + '/' },
    },
    body: h,
  });
});

pages.push({ path: null, file: '404.html', html: layout({
  path: '/404', title: 'Page not found', description: 'This page could not be found.',
  body: `<section class='wrap pagehead notfound'><span class='eyebrow'>404</span><h1 style='margin-top:14px'>Page not found</h1><p>The page may have moved. Try the latest articles instead.</p><div class='ctas' style='margin-top:28px'><a class='btn solid' href='/articles'>All articles</a><a class='btn ghost' href='/'>Home</a></div></section>`,
}).replace(/<link rel="canonical"[^>]*>\n/, '<meta name="robots" content="noindex">\n') });

// ---------- write ----------
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT + '/articles', { recursive: true });
mkdirSync(OUT + '/assets', { recursive: true });
for (const p of pages) writeFileSync(`${OUT}/${p.file}`, p.html);
writeFileSync(OUT + '/assets/styles.css', css);
writeFileSync(OUT + '/assets/site.js', js);
if (existsSync('public')) cpSync('public', OUT, { recursive: true });

const newest = POSTS.map(p => p.date).sort().at(-1);
const lastmod = path => { const p = POSTS.find(x => postUrl(x) === path); return p ? p.date : newest; };
writeFileSync(OUT + '/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  pages.filter(p => p.path).map(p => `  <url><loc>${url(p.path)}</loc><lastmod>${lastmod(p.path)}</lastmod></url>`).join('\n') + '\n</urlset>\n');
writeFileSync(OUT + '/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
const rfc822 = d => new Date(d + 'T06:00:00+05:00').toUTCString();
writeFileSync(OUT + '/feed.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>\n<title>${NAME}</title>\n<link>${SITE}/</link>\n<atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>\n<description>Better life through mind, body and money.</description>\n<language>en</language>\n` +
  POSTS.map(p => `<item><title>${esc(p.title)}</title><link>${url(postUrl(p))}</link><guid>${url(postUrl(p))}</guid><pubDate>${rfc822(p.date)}</pubDate><category>${p.pillar}</category><description>${esc(p.lede)}</description></item>`).join('\n') + '\n</channel></rss>\n');
// Vercel reads vercel.json from the project's root directory (this folder); copy it into dist/ too for CLI deploys of dist/.
cpSync('vercel.json', OUT + '/vercel.json');

console.log(`Built ${pages.length} pages into ${OUT}/`);
