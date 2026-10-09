import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ShoppingBasket, Search, Receipt, ChartLine, Scale, Sparkles, ShieldCheck, History, BadgeCheck,
  Store, Upload, Menu, X, ArrowRight, MapPin, Mail, Camera, Languages, Landmark, Check, LoaderCircle,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const APP = '/app/';
const cfg = typeof window !== 'undefined' ? window.SASTACHECK || {} : {};
const EMAIL = cfg.contactEmail || 'waseemraja2x2x20@gmail.com';
const IG = cfg.instagram || '';
const HERO_IMG = 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=2000&q=70';
const STORE_IMG = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=70';
const rs = n => 'Rs ' + n.toLocaleString('en-PK');

/* ---------------- Logo ---------------- */
function Logo({ light }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary">
        <ShoppingBasket className="h-5 w-5 text-white" strokeWidth={2.2} />
      </span>
      <span className={`font-display text-lg font-extrabold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>
        Sasta<span className="text-accent">Check</span>
      </span>
    </span>
  );
}

/* ---------------- 1. Navbar ---------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  const links = [['#how', 'How it works'], ['#features', 'Features'], ['#stores', 'For stores'], ['#contact', 'Contact']];
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-[max(env(safe-area-inset-top),12px)]">
      <nav className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 ${scrolled ? 'glass shadow-2xl' : 'bg-transparent'}`}>
        <a href="#top" aria-label="SastaCheck home"><Logo light /></a>
        <div className="hidden items-center gap-7 md:flex">
          {links.map(([h, t]) => <a key={h} href={h} className="text-sm font-medium text-white/80 hover:text-white">{t}</a>)}
        </div>
        <div className="flex items-center gap-2">
          <a href={APP} className="magnetic-btn btn-primary hidden !py-2.5 sm:inline-flex">Open SastaCheck <ArrowRight className="h-4 w-4" /></a>
          <button className="rounded-full p-2 text-white md:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
        </div>
      </nav>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-ink px-6 pt-[max(env(safe-area-inset-top),20px)] anim-fadein">
          <div className="flex items-center justify-between"><Logo light /><button className="p-2 text-white" onClick={() => setOpen(false)} aria-label="Close menu"><X /></button></div>
          <div className="mt-12 flex flex-col gap-6">
            {links.map(([h, t]) => <a key={h} href={h} onClick={() => setOpen(false)} className="font-display text-3xl font-bold text-white">{t}</a>)}
            <a href={APP} className="magnetic-btn btn-primary mt-4 self-start">Open SastaCheck <ArrowRight className="h-4 w-4" /></a>
          </div>
        </div>
      )}
    </header>
  );
}

/* Signature shape: a rupee coin. Reused in the hero particles and the receipt card. */
function Coin({ className = '', size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="#e2a32b" stroke="#b07c17" strokeWidth="2" />
      <circle cx="20" cy="20" r="13" fill="none" stroke="#fbefd4" strokeOpacity=".7" strokeWidth="1.5" />
      <text x="20" y="25" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="13" fill="#0b1410">Rs</text>
    </svg>
  );
}

/* ---------------- 2. Hero ---------------- */
function Hero() {
  const root = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-hero]', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.12, delay: 0.15 });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section id="top" ref={root} className="relative flex min-h-[100dvh] items-end overflow-hidden bg-ink text-white">
      <img src={HERO_IMG} alt="Fresh vegetables piled high on a market stall" className="absolute inset-0 h-full w-full object-cover opacity-60"
        onError={e => { e.currentTarget.style.display = 'none'; }} />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute right-6 top-28 hidden h-56 w-56 sm:block" aria-hidden="true">
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} className="absolute anim-float" style={{ left: `${(i * 37) % 80}%`, top: `${(i * 53) % 70}%`, animationDelay: `${i * 0.9}s`, opacity: 0.85 - i * 0.12 }}>
            <Coin size={22 + (i % 3) * 8} />
          </div>
        ))}
      </div>
      <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-32 sm:pb-24">
        <p data-hero className="eyebrow text-accent">Rawalpindi · Islamabad · Lahore · Karachi</p>
        <h1 data-hero className="mt-5 max-w-4xl font-display text-[clamp(2.6rem,8vw,6rem)] font-extrabold leading-[0.95] tracking-tight">
          Sasta kahan hai?<br />
          <span className="font-serif text-[1.05em] font-semibold italic text-accent">Ab pata chalega.</span>
        </h1>
        <p data-hero className="mt-6 max-w-xl text-lg text-white/80">
          Compare your whole monthly grocery basket across supermarkets and your local kiryana, per kg and per litre,
          using real receipts from shoppers like you.
        </p>
        <div data-hero className="mt-9 flex flex-wrap gap-3">
          <a href={APP} className="magnetic-btn btn-primary">Compare my basket <ArrowRight className="h-4 w-4" /></a>
          <a href="#how" className="magnetic-btn btn-ghost">How it works</a>
        </div>
        <p data-hero className="mt-6 font-urdu text-xl text-white/70" dir="rtl" lang="ur">سستا کہاں ہے؟ اب پتا چلے گا</p>
      </div>
    </section>
  );
}

/* ---------------- 3. Features ---------------- */
function Shuffler() {
  const [rows, setRows] = useState([
    { s: 'Local Kiryana', p: 2790, u: 'Rs 279/kg' },
    { s: 'Imtiaz', p: 2840, u: 'Rs 284/kg' },
    { s: 'Carrefour', p: 2955, u: 'Rs 296/kg' },
  ]);
  useEffect(() => {
    const t = setInterval(() => setRows(r => [...r.slice(1), r[0]]), 2600);
    return () => clearInterval(t);
  }, []);
  const best = Math.min(...rows.map(r => r.p));
  return (
    <div className="relative h-44">
      {rows.map((r, i) => (
        <div key={r.s} className="absolute inset-x-0 rounded-2xl border border-ink/10 bg-white px-4 py-3 shadow-lg transition-all duration-700"
          style={{ top: i * 22, transform: `scale(${1 - i * 0.05})`, zIndex: 3 - i, filter: i ? `brightness(${1 - i * 0.04})` : 'none' }}>
          <div className="flex items-center justify-between">
            <span className="font-display font-bold">{r.s}</span>
            <span className={`font-mono text-lg ${r.p === best ? 'text-primary' : ''}`}>{rs(r.p)}</span>
          </div>
          <div className="mt-1 flex items-center justify-between font-mono text-xs text-ink/50">
            <span>Atta 10 kg</span><span>{r.u}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function CoinReceipt() {
  const coins = [12, 36, 58, 80];
  return (
    <div className="relative h-44 overflow-hidden rounded-2xl bg-ink">
      {coins.map((x, i) => (
        <div key={x} className="absolute" style={{ left: `${x}%`, top: 0 }}>
          <div className="anim-fall" style={{ animationDelay: `${i * 0.65}s` }}><Coin size={22} /></div>
          <div className="anim-ripple absolute left-[-9px] top-[160px] h-10 w-10 rounded-full border-2 border-accent" style={{ animationDelay: `${i * 0.65}s` }} />
        </div>
      ))}
      <div className="absolute inset-x-4 bottom-4 rounded-lg bg-paper px-3 py-2 font-mono text-[11px] text-ink">
        <div className="flex justify-between"><span>DALDA OIL 1L</span><span>470</span></div>
        <div className="flex justify-between"><span>SUGAR 1KG</span><span>168</span></div>
        <div className="mt-1 border-t border-dashed border-ink/30 pt-1 text-primary">+2 prices added to the map</div>
      </div>
    </div>
  );
}

function HistoryCursor() {
  const pts = [458, 462, 475, 482, 468, 470];
  const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  const [i, setI] = useState(5);
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % pts.length), 1400);
    return () => clearInterval(t);
  }, []);
  const lo = 450, hi = 490, x = k => 14 + k * 54, y = v => 92 - ((v - lo) / (hi - lo)) * 76;
  return (
    <div className="relative h-44 rounded-2xl bg-paper p-3">
      <svg viewBox="0 0 300 120" className="h-full w-full">
        <polyline points={pts.map((v, k) => `${x(k)},${y(v)}`).join(' ')} fill="none" stroke="#0e6b45" strokeWidth="2.5" />
        {pts.map((v, k) => <circle key={k} cx={x(k)} cy={y(v)} r={k === i ? 6 : 3} fill={k === i ? '#e2a32b' : '#0e6b45'} style={{ transition: 'r .3s' }} />)}
        {months.map((m, k) => <text key={m} x={x(k)} y="114" textAnchor="middle" fontSize="10" fill="#0b141099" fontFamily="JetBrains Mono, monospace">{m}</text>)}
      </svg>
      <div className="absolute rounded-lg bg-ink px-2.5 py-1.5 font-mono text-xs text-white shadow-lg transition-all duration-500"
        style={{ left: `calc(${(x(i) / 300) * 100}% - 34px)`, top: `${(y(pts[i]) / 120) * 100 - 30}%` }}>
        {months[i]} · {rs(pts[i])}
      </div>
    </div>
  );
}

function Features() {
  const root = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-feature]', { y: 50, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: root.current, start: 'top 75%' } });
    }, root);
    return () => ctx.revert();
  }, []);
  const items = [
    { t: 'Per kg, not per pack', d: 'A 900 ml bottle and a 1 litre bottle are compared fairly. You see the real price per kg, litre or piece.', c: <Shuffler /> },
    { t: 'Every receipt counts', d: 'Snap a receipt and its prices join the map, with the store and date. Local markets are covered, not just websites.', c: <CoinReceipt /> },
    { t: 'Six months of history', d: 'See whether a price is high this month before you buy. Prices are never overwritten.', c: <HistoryCursor /> },
  ];
  return (
    <section id="features" ref={root} className="relative bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <p className="eyebrow text-primary">What makes it different</p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          The cheapest item is not always the <span className="font-serif italic text-primary">cheapest basket.</span>
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map(f => (
            <article key={f.t} data-feature className="card flex flex-col gap-5 p-6">
              {f.c}
              <div>
                <h3 className="font-display text-xl font-bold">{f.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{f.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 4. Pillars ---------------- */
function CountUp({ to, decimals = 0, suffix = '' }) {
  const el = useRef(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf, started = false;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started) return;
      started = true;
      const t0 = performance.now(), dur = 1600;
      const tick = t => { const k = Math.min(1, (t - t0) / dur); setV(to * (1 - Math.pow(1 - k, 3))); if (k < 1) raf = requestAnimationFrame(tick); };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={el}>{v.toFixed(decimals)}{suffix}</span>;
}

function Pillars() {
  const stats = [
    { n: 36, d: 0, s: '%', t: 'of household spending in Pakistan goes on food', src: 'PBS Household Income and Expenditure Survey' },
    { n: 30, d: 0, s: '%', pre: '21–', t: 'how much more retail prices can be than wholesale', src: 'Federal price analysis, 2026' },
    { n: 11.1, d: 1, s: '%', t: 'consumer price inflation in August 2026', src: 'Pakistan Bureau of Statistics' },
  ];
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white sm:py-28">
      <div className="absolute inset-0 grid-bg" />
      <div className="relative mx-auto max-w-6xl px-5">
        <p className="eyebrow text-accent">Why it matters</p>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {stats.map(s => (
            <div key={s.t} className="border-t border-white/15 pt-6">
              <div className="font-display text-6xl font-extrabold tracking-tight text-accent">
                {s.pre}<CountUp to={s.n} decimals={s.d} suffix={s.s} />
              </div>
              <p className="mt-3 text-lg text-white/85">{s.t}</p>
              <p className="mt-2 font-mono text-[11px] text-white/45">Source: {s.src}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 5. Protocol (sticky stack) ---------------- */
function Protocol() {
  const root = useRef(null);
  const steps = [
    { k: '01', icon: ShoppingBasket, t: 'Add your monthly basket', d: 'Atta, cheeni, daal, oil, chai, doodh. Search in English, Roman Urdu or Urdu: cheeni, chini and چینی all find sugar.' },
    { k: '02', icon: Scale, t: 'We compare every store', d: 'Supermarkets, online stores and the kiryana down the road, each price brought to Rs per kg, litre or piece.' },
    { k: '03', icon: Check, t: 'Buy the smart way', d: 'Three plans: everything from one store, the cheapest of each item, or the best two-store trip that saves the most for the least running around.' },
  ];
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('[data-step]');
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, { scale: 0.9, filter: 'blur(4px)', opacity: 0.4, ease: 'none',
          scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 25%', scrub: true } });
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section id="how" ref={root} className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <p className="eyebrow text-primary">How it works</p>
        <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Three steps to a cheaper month.</h2>
        <div className="mt-14">
          {steps.map(({ k, icon: Icon, t, d }) => (
            <div key={k} data-step className="sticky top-24 mb-8 grid min-h-[340px] gap-8 rounded-4xl bg-ink p-8 text-white shadow-2xl sm:grid-cols-[auto,1fr] sm:p-12">
              <div className="flex items-start gap-4">
                <span className="font-mono text-sm text-accent">{k}</span>
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-primary"><Icon className="h-8 w-8" /></span>
              </div>
              <div className="self-end">
                <h3 className="font-display text-3xl font-extrabold sm:text-4xl">{t}</h3>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/75">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 6. Services grid ---------------- */
function ServicesGrid() {
  const tiles = [
    { icon: ShoppingBasket, t: 'Basket compare', d: 'One store, cheapest each, or best two stores, totalled for you.' },
    { icon: Languages, t: 'Urdu and Roman search', d: 'Type the way you talk: anday, doodh, آٹا. It understands.' },
    { icon: Receipt, t: 'Receipt reading', d: 'Upload a photo; AI reads store, date and prices for you to check.' },
    { icon: ChartLine, t: 'Price history', d: 'Six months of prices per item, so you can spot a bad month.' },
    { icon: Landmark, t: 'DC rate vs market', d: 'Official rate next to what shops actually charge, with the gap in %.' },
    { icon: Sparkles, t: 'AI basket planner', d: 'Give a budget and family size; get a sensible monthly list.' },
  ];
  return (
    <section id="services" className="bg-ink py-24 text-white sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <p className="eyebrow text-accent">Everything in the app</p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Built for how Pakistan shops.</h2>
        <div className="mt-14 grid gap-px overflow-hidden rounded-4xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map(({ icon: Icon, t, d }) => (
            <a key={t} href={APP} className="group bg-ink p-8 transition-colors hover:bg-ink-3">
              <Icon className="h-7 w-7 text-accent transition-transform group-hover:-translate-y-1" />
              <h3 className="mt-6 font-display text-xl font-bold">{t}</h3>
              <p className="mt-2 text-white/65">{d}</p>
              <span className="mt-6 inline-flex items-center gap-1 font-mono text-xs text-white/40 group-hover:text-accent">Try it <ArrowRight className="h-3 w-3" /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 7. Trust signals ---------------- */
function TrustSignals() {
  const root = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-trust]', { y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' } });
    }, root);
    return () => ctx.revert();
  }, []);
  const badges = [
    { icon: BadgeCheck, t: 'Verified, community, older', d: 'Every price shows where it came from and how old it is, so you know what to trust.' },
    { icon: History, t: 'Nothing is overwritten', d: 'Each report is kept with its store and date. That history is what makes the prices reliable.' },
    { icon: ShieldCheck, t: 'Free for shoppers', d: 'No paid placements in the price list. Stores cannot pay to look cheaper.' },
  ];
  return (
    <section ref={root} className="bg-paper py-24">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-3">
        {badges.map(({ icon: Icon, t, d }) => (
          <div key={t} data-trust className="flex gap-4 rounded-4xl border border-ink/10 bg-white p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary"><Icon /></span>
            <div><h3 className="font-display text-lg font-bold">{t}</h3><p className="mt-1 text-ink/70">{d}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- 8. Contact (for stores) ---------------- */
function ContactForm() {
  const [state, setState] = useState('idle');
  const [err, setErr] = useState('');
  const [file, setFile] = useState(null);
  const [over, setOver] = useState(false);
  const submit = async e => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (!cfg.supabaseUrl || !cfg.supabaseAnonKey) { setErr(`The form is not connected yet. Email us at ${EMAIL}.`); return; }
    setState('sending'); setErr('');
    const h = { apikey: cfg.supabaseAnonKey, authorization: `Bearer ${cfg.supabaseAnonKey}` };
    try {
      let file_path = null;
      if (file) {
        file_path = `${Date.now()}-${file.name.replace(/[^\w.-]+/g, '_').slice(-80)}`;
        const up = await fetch(`${cfg.supabaseUrl}/storage/v1/object/price-lists/${file_path}`, { method: 'POST', headers: { ...h, 'content-type': file.type || 'application/octet-stream' }, body: file });
        if (!up.ok) throw new Error('upload');
      }
      const r = await fetch(`${cfg.supabaseUrl}/rest/v1/leads`, {
        method: 'POST', headers: { ...h, 'content-type': 'application/json', prefer: 'return=minimal' },
        body: JSON.stringify({ name: f.get('name'), email: f.get('email'), phone: f.get('phone') || null, area: f.get('area') || null, message: f.get('message') || null, file_path }),
      });
      if (!r.ok) throw new Error('save');
      setState('sent');
    } catch {
      setState('idle'); setErr(`Sending failed. Try again, or email us at ${EMAIL}.`);
    }
  };
  const input = 'w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-[15px] outline-none focus:border-primary';
  return (
    <section id="stores" className="relative overflow-hidden bg-paper pb-24 sm:pb-32">
      <div className="absolute inset-0 grid-bg-light" />
      <div id="contact" className="relative mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-4xl bg-ink p-8 text-white sm:p-10">
          <img src={STORE_IMG} alt="Groceries on supermarket shelves" className="absolute inset-0 h-full w-full object-cover opacity-30" onError={e => { e.currentTarget.style.display = 'none'; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/30" />
          <div className="relative">
            <Store className="h-8 w-8 text-accent" />
            <p className="eyebrow mt-6 text-accent">For stores and kiryana owners</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight">Fair prices? <span className="font-serif italic text-accent">Let shoppers see them.</span></h2>
            <p className="mt-4 text-white/75">Send your price list and we add your shop to SastaCheck, so nearby shoppers can find you. Listing is free while we launch in Rawalpindi and Islamabad.</p>
            <div className="mt-8 space-y-3 text-white/80">
              <p className="flex items-center gap-3"><Mail className="h-5 w-5 text-accent" /><span className="select-all">{EMAIL}</span></p>
              {IG && <p className="flex items-center gap-3"><Camera className="h-5 w-5 text-accent" /><a href={`https://instagram.com/${IG.replace('@', '')}`} target="_blank" rel="noopener" className="underline">{IG}</a></p>}
              <p className="flex items-center gap-3"><MapPin className="h-5 w-5 text-accent" />Rawalpindi and Islamabad first</p>
            </div>
          </div>
        </div>
        <div className="card p-6 sm:p-8">
          {state === 'sent' ? (
            <div className="grid h-full place-items-center py-16 text-center anim-fadein">
              <div><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary text-white"><Check /></span>
                <h3 className="mt-5 font-display text-2xl font-bold">Thank you. We will be in touch.</h3>
                <p className="mt-2 text-ink/70">We usually reply within two working days.</p></div>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-medium">Your name<input name="name" required className={input} autoComplete="name" /></label>
              <label className="grid gap-1.5 text-sm font-medium">Email<input name="email" type="email" required className={input} autoComplete="email" /></label>
              <label className="grid gap-1.5 text-sm font-medium">Phone (optional)<input name="phone" type="tel" className={input} autoComplete="tel" /></label>
              <label className="grid gap-1.5 text-sm font-medium">Shop name and area<input name="area" className={input} placeholder="e.g. Al-Madina Store, Saddar" /></label>
              <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">Message<textarea name="message" rows="3" className={input} placeholder="What you sell and when your prices change" /></label>
              <label onDragOver={e => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)}
                onDrop={e => { e.preventDefault(); setOver(false); const f = e.dataTransfer.files[0]; if (f) setFile(f); }}
                className={`sm:col-span-2 grid cursor-pointer place-items-center gap-1 rounded-2xl border-2 border-dashed p-6 text-center text-sm transition ${over ? 'border-primary bg-primary/5' : 'border-ink/15'}`}>
                <Upload className="h-6 w-6 text-primary" />
                <span className="font-medium">{file ? file.name : 'Add your price list (optional)'}</span>
                <span className="text-ink/50">Photo, PDF or spreadsheet, up to 10 MB</span>
                <input type="file" className="sr-only" accept="image/*,.pdf,.csv,.xlsx,.xls" onChange={e => setFile(e.target.files[0] || null)} />
              </label>
              {err && <p className="text-sm text-red-700 sm:col-span-2">{err}</p>}
              <button disabled={state === 'sending'} className="magnetic-btn btn-dark sm:col-span-2 disabled:opacity-60">
                {state === 'sending' ? <><LoaderCircle className="h-4 w-4 animate-spin" /> Sending</> : <>Send <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 9. Footer ---------------- */
function Footer() {
  return (
    <footer className="bg-ink pb-[max(env(safe-area-inset-bottom),24px)] pt-16 text-white/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-sm">Grocery prices for Pakistan, from receipts, stores and markets. Compare your basket and save every month.</p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 font-mono text-xs">
            <span className="pulse-dot h-2 w-2 rounded-full bg-primary-light" /> Prices updating · Rawalpindi &amp; Islamabad
          </p>
        </div>
        <div>
          <p className="eyebrow text-white/40">App</p>
          <ul className="mt-4 space-y-2.5">
            <li><a href={APP} className="hover:text-white">Compare my basket</a></li>
            <li><a href={APP} className="hover:text-white">Search prices</a></li>
            <li><a href={APP} className="hover:text-white">Report a price</a></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-white/40">SastaCheck</p>
          <ul className="mt-4 space-y-2.5">
            <li><a href="#stores" className="hover:text-white">For stores</a></li>
            <li><span className="select-all">{EMAIL}</span></li>
            <li><Link to="/privacy" className="hover:text-white">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-6xl flex-wrap justify-between gap-2 border-t border-white/10 px-5 pt-6 font-mono text-xs text-white/40">
        <span>© {new Date().getFullYear()} SastaCheck</span><span>Prices are reported by shoppers and stores and can change. Check at the counter.</span>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => { ScrollTrigger.refresh(); }, []);
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pillars />
        <Protocol />
        <ServicesGrid />
        <TrustSignals />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

/* ---------------- Legal pages ---------------- */
function Legal({ title, children }) {
  useEffect(() => { window.scrollTo(0, 0); document.title = `${title} · SastaCheck`; }, [title]);
  return (
    <div className="min-h-screen bg-paper">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <Link to="/" aria-label="SastaCheck home"><Logo /></Link>
        <h1 className="mt-10 font-display text-4xl font-extrabold">{title}</h1>
        <div className="mt-6 space-y-4 leading-relaxed text-ink/80 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink">{children}</div>
        <p className="mt-10 font-mono text-xs text-ink/50">Last updated 9 October 2026 · Questions: {EMAIL}</p>
      </div>
    </div>
  );
}

export function Privacy() {
  return (
    <Legal title="Privacy">
      <p>SastaCheck collects only what it needs to compare grocery prices.</p>
      <h2>What we store</h2>
      <p>Prices you report, with the store, city and date. If you sign in, your email address and your saved basket. If you upload a receipt, the photo is sent to our AI provider (Google Gemini) to read the prices and is not stored by SastaCheck.</p>
      <h2>What others see</h2>
      <p>Reported prices are public, without your name or email. Your basket and email are private.</p>
      <h2>Store sign-ups</h2>
      <p>Details sent through the "For stores" form are used only to contact you about listing your shop.</p>
      <h2>Deleting your data</h2>
      <p>Email us and we will delete your account, basket and the prices you reported.</p>
    </Legal>
  );
}

export function Terms() {
  return (
    <Legal title="Terms">
      <p>SastaCheck is a free service that shows grocery prices reported by shoppers and stores.</p>
      <h2>Prices can be wrong</h2>
      <p>Prices change often and reports can be mistaken. Always check the price at the counter. SastaCheck is not responsible for the price a shop charges you.</p>
      <h2>Reporting fairly</h2>
      <p>Report only prices you actually saw or paid. We may remove reports that look false and block accounts that post them.</p>
      <h2>AI features</h2>
      <p>Receipt reading and the basket planner use AI and can make mistakes. Check the results before you save or shop.</p>
    </Legal>
  );
}
