import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { linePrice, money, useStore } from '../context/Store';
import { getProduct, products, sizesFor, type Localized } from '../data/products';
import { CodeField, Totals } from '../components/CartDrawer';
import ProductVisual from '../components/ProductVisual';
import RevealText from '../components/RevealText';
import MagneticButton from '../components/MagneticButton';
import Seal from '../components/Seal';
import Mist from '../components/Mist';
import { IconArrow, IconInstagram, IconPlus, IconTiktok, IconWhatsapp } from '../components/Icons';
import { EASE } from '../utils';

/* ———————————————— Discovery Sets & Bundles ———————————————— */
export function Sets() {
  const { t, l, add, setCartOpen } = useStore();
  const sets = products.filter((p) => p.kind === 'set');
  return (
    <div className="sets">
      <header className="pagehead pagehead--dark pagehead--center">
        <Mist count={12} />
        <div className="pagehead__copy">
          <span className="kicker">{t('sets.kicker')}</span>
          <RevealText tag="h1" immediate className="h-display">{t('sets.title')}</RevealText>
          <p className="lede">{t('sets.sub')}</p>
        </div>
      </header>
      {sets.map((s, i) => {
        const items = s.setItems!.map(getProduct).filter(Boolean);
        return (
          <section key={s.id} className={`setrow sec ${i % 2 ? 'sec--stone' : 'sec--beige'}`}>
            <motion.div className="setrow__visual" initial={{ opacity: 0, x: i % 2 ? 60 : -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.1, ease: EASE.out }}>
              <div className="setrow__box" aria-hidden />
              <ProductVisual product={s} />
              {s.approved && <Seal size={88} tone="dark" className="setrow__seal" />}
            </motion.div>
            <div className="setrow__copy">
              <span className="kicker kicker--dark">0{i + 1} · {s.concentration}</span>
              <RevealText tag="h2" className="h-display">{s.name}</RevealText>
              <p className="setrow__tag">{l(s.tagline)}</p>
              <p className="lede lede--dark">{l(s.description)}</p>
              <ul className="setrow__items">
                {items.map((p) => p && <li key={p.id}><Link to={`/product/${p.id}`}>{p.brand} — {p.name}</Link></li>)}
              </ul>
              <div className="setrow__buy">
                <span className="setrow__price">{money(s.fullPrice)}{s.compareAt && <s>{money(s.compareAt)}</s>}</span>
                {s.compareAt && <span className="badge">{t('sets.save')} {money(s.compareAt - s.fullPrice)}</span>}
              </div>
              <div className="setrow__ctas">
                <MagneticButton className="btn btn--dark" onClick={() => { add(s.id, 'set'); setCartOpen(true); }}><IconPlus /> {t('add')}</MagneticButton>
                <Link to={`/product/${s.id}`} className="link-arrow link-arrow--dark">{l({ en: 'Details', es: 'Detalles' })} <IconArrow /></Link>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

/* ———————————————— About ———————————————— */
const chapters: { kicker: Localized; title: Localized; body: Localized; img: string }[] = [
  {
    kicker: { en: 'Chapter I · The Obsession', es: 'Capítulo I · La Obsesión' },
    title: { en: 'It started with a single bottle.', es: 'Todo empezó con un solo frasco.' },
    body: {
      en: 'Scent Syndicate began in San Juan as a group chat of friends trading decants, arguing about longevity and hunting batches. The chat became a waitlist. The waitlist became a community.',
      es: 'Scent Syndicate nació en San Juan como un chat de amigos intercambiando decants, discutiendo duración y cazando batches. El chat se convirtió en lista de espera. La lista, en comunidad.',
    },
    img: 'images/model-man-spray.webp',
  },
  {
    kicker: { en: 'Chapter II · The Standard', es: 'Capítulo II · El Estándar' },
    title: { en: 'Approved by the Syndicate.', es: 'Aprobado por el Syndicate.' },
    body: {
      en: 'Nothing reaches our shelves unless the circle has worn it, tested it and stands behind it. Every bottle is sourced from authorized distributors and every decant is hand-poured from the original, labeled and sealed.',
      es: 'Nada llega a nuestras repisas sin que el círculo lo haya usado, probado y respaldado. Cada frasco viene de distribuidores autorizados y cada decant se sirve a mano del original, etiquetado y sellado.',
    },
    img: 'images/model-woman-noir.webp',
  },
  {
    kicker: { en: 'Chapter III · The Circle', es: 'Capítulo III · El Círculo' },
    title: { en: 'Exclusive, never exclusionary.', es: 'Exclusivo, nunca excluyente.' },
    body: {
      en: 'Luxury perfumery should feel like a private club where everyone is welcome. Whether you own forty bottles or are searching for your first signature, there is a seat for you at the table.',
      es: 'La perfumería de lujo debe sentirse como un club privado donde todos son bienvenidos. Tengas cuarenta frascos o busques tu primera firma, hay un asiento para ti en la mesa.',
    },
    img: 'images/model-woman-champagne.webp',
  },
];

function Chapter({ c, i }: { c: (typeof chapters)[number]; i: number }) {
  const { l } = useStore();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  return (
    <section ref={ref} className={`chapter sec ${['sec--stone', 'sec--blush', 'sec--beige'][i]} ${i % 2 ? 'chapter--flip' : ''}`}>
      <motion.div className="chapter__img" initial={{ clipPath: 'inset(0 0 100% 0)' }} whileInView={{ clipPath: 'inset(0 0 0% 0)' }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.3, ease: EASE.premium }}>
        <motion.img src={c.img} alt="" style={{ y }} loading="lazy" />
      </motion.div>
      <div className="chapter__copy">
        <span className={`kicker ${i === 1 ? '' : 'kicker--dark'}`}>{l(c.kicker)}</span>
        <RevealText tag="h2" className="h-display">{l(c.title)}</RevealText>
        <motion.p className="lede" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.9 }}>{l(c.body)}</motion.p>
        {i === 1 && <Seal size={120} tone="amber" />}
      </div>
    </section>
  );
}

export function About() {
  const { t, l } = useStore();
  return (
    <div className="about">
      <header className="pagehead pagehead--amber pagehead--center">
        <Mist count={14} />
        <motion.img src="images/botanical-arch.webp" alt="" className="about__arch" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 0.9, scale: 1 }} transition={{ duration: 1.6, ease: EASE.out }} />
        <div className="pagehead__copy">
          <span className="kicker">{t('about.kicker')}</span>
          <RevealText tag="h1" immediate className="h-display">{t('about.title')}</RevealText>
        </div>
      </header>
      {chapters.map((c, i) => <Chapter key={i} c={c} i={i} />)}
      <section className="values sec sec--sage">
        {[
          { n: '01', t: { en: 'Authenticity', es: 'Autenticidad' }, d: { en: 'Sourced from authorized distributors. Batch codes on request.', es: 'De distribuidores autorizados. Códigos de batch a solicitud.' } },
          { n: '02', t: { en: 'Discovery', es: 'Descubrimiento' }, d: { en: 'Decants of everything, so you never blind-buy again.', es: 'Decants de todo, para que nunca compres a ciegas.' } },
          { n: '03', t: { en: 'Community', es: 'Comunidad' }, d: { en: 'Drops, meetups and scent talk with 2,400+ members.', es: 'Lanzamientos, encuentros y charlas con más de 2,400 miembros.' } },
        ].map((v, i) => (
          <motion.div key={v.n} className="value" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.8 }}>
            <span>{v.n}</span>
            <h3>{l(v.t)}</h3>
            <p>{l(v.d)}</p>
          </motion.div>
        ))}
        <div className="values__cta"><MagneticButton to="/shop" className="btn btn--amber">{t('hero.cta')} <IconArrow /></MagneticButton></div>
      </section>
    </div>
  );
}

/* ———————————————— FAQ ———————————————— */
const faqs: { cat: Localized; items: { q: Localized; a: Localized }[] }[] = [
  {
    cat: { en: 'Decants', es: 'Decants' },
    items: [
      { q: { en: 'What is a decant?', es: '¿Qué es un decant?' }, a: { en: 'A decant is a smaller portion of an original fragrance, transferred by hand from the authentic bottle into a glass atomizer. It lets you wear a fragrance for days or weeks before buying the full bottle.', es: 'Un decant es una porción más pequeña de una fragancia original, transferida a mano del frasco auténtico a un atomizador de cristal. Te permite usarla días o semanas antes de comprar el frasco completo.' } },
      { q: { en: 'How many sprays are in each size?', es: '¿Cuántos sprays trae cada tamaño?' }, a: { en: 'Roughly 45 sprays in 3 ml, 75 in 5 ml and 150 in 10 ml.', es: 'Aproximadamente 45 sprays en 3 ml, 75 en 5 ml y 150 en 10 ml.' } },
      { q: { en: 'Are decants made from authentic bottles?', es: '¿Los decants vienen de frascos auténticos?' }, a: { en: 'Always. Every decant is poured from a bottle in our own collection, which we purchase from authorized distributors. We never use testers or refills.', es: 'Siempre. Cada decant se sirve de un frasco de nuestra colección, comprado a distribuidores autorizados. Nunca usamos testers ni recargas.' } },
    ],
  },
  {
    cat: { en: 'Authenticity', es: 'Autenticidad' },
    items: [
      { q: { en: 'Are your fragrances 100% authentic?', es: '¿Sus fragancias son 100% auténticas?' }, a: { en: 'Yes. Every product is approved by the Syndicate: sourced from authorized distributors, verified by batch code and inspected before it ships.', es: 'Sí. Cada producto está aprobado por el Syndicate: de distribuidores autorizados, verificado por código de batch e inspeccionado antes de enviarse.' } },
      { q: { en: 'What does "Inspired" mean?', es: '¿Qué significa "Inspirado"?' }, a: { en: 'Some Arabian houses create original fragrances inspired by famous scent profiles. They are authentic products of their own brands — never counterfeits.', es: 'Algunas casas árabes crean fragancias originales inspiradas en perfiles famosos. Son productos auténticos de sus propias marcas, nunca falsificaciones.' } },
    ],
  },
  {
    cat: { en: 'Orders & Shipping', es: 'Pedidos y Envíos' },
    items: [
      { q: { en: 'Where do you ship?', es: '¿A dónde envían?' }, a: { en: 'We ship from Puerto Rico to all of Puerto Rico and the 50 US states. Free shipping on orders over $100.', es: 'Enviamos desde Puerto Rico a toda la isla y a los 50 estados de EE. UU. Envío gratis en pedidos sobre $100.' } },
      { q: { en: 'How fast will my order arrive?', es: '¿Qué tan rápido llega mi pedido?' }, a: { en: 'Orders ship within 24 hours on business days. Puerto Rico: 1–3 days. Mainland US: 3–5 days.', es: 'Los pedidos salen en 24 horas laborables. Puerto Rico: 1–3 días. EE. UU. continental: 3–5 días.' } },
      { q: { en: 'Can I pick up in person?', es: '¿Puedo recoger en persona?' }, a: { en: 'Yes — local pickup in San Juan is available by appointment. Message us on Instagram or WhatsApp.', es: 'Sí, recogido local en San Juan con cita previa. Escríbenos por Instagram o WhatsApp.' } },
    ],
  },
  {
    cat: { en: 'Returns', es: 'Devoluciones' },
    items: [
      { q: { en: 'What is your return policy?', es: '¿Cuál es su política de devoluciones?' }, a: { en: 'Sealed full bottles can be returned within 14 days for a full refund. For hygiene reasons, opened bottles and decants are final sale — unless they arrive damaged, in which case we replace them immediately.', es: 'Los frascos sellados se pueden devolver en 14 días con reembolso completo. Por higiene, frascos abiertos y decants son venta final, excepto si llegan dañados: en ese caso los reemplazamos de inmediato.' } },
    ],
  },
];

export function FAQ() {
  const { t, l } = useStore();
  const [open, setOpen] = useState<string | null>('0-0');
  return (
    <div className="faq">
      <header className="pagehead pagehead--stone pagehead--center">
        <div className="pagehead__copy">
          <span className="kicker kicker--dark">{t('faq.kicker')}</span>
          <RevealText tag="h1" immediate className="h-display">{t('faq.title')}</RevealText>
        </div>
      </header>
      <section className="sec sec--cream faq__body">
        {faqs.map((g, gi) => (
          <div key={gi} className="faq__group">
            <h2 className="faq__cat">{l(g.cat)}</h2>
            {g.items.map((it, ii) => {
              const key = `${gi}-${ii}`;
              const on = open === key;
              return (
                <div key={key} className={`qa${on ? ' is-on' : ''}`}>
                  <button className="qa__q" onClick={() => setOpen(on ? null : key)} aria-expanded={on}>
                    <span>{l(it.q)}</span>
                    <i aria-hidden />
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div className="qa__a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: EASE.out }}>
                        <p>{l(it.a)}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ))}
        <div className="faq__more">
          <p>{l({ en: 'Still curious?', es: '¿Aún con dudas?' })}</p>
          <MagneticButton to="/contact" className="btn btn--dark">{t('nav.contact')} <IconArrow /></MagneticButton>
        </div>
      </section>
    </div>
  );
}

/* ———————————————— Contact ———————————————— */
export function Contact() {
  const { t } = useStore();
  const [sent, setSent] = useState(false);
  return (
    <div className="contact">
      <section className="contact__grid">
        <div className="contact__side">
          <Mist count={10} />
          <span className="kicker">{t('contact.kicker')}</span>
          <RevealText tag="h1" immediate className="h-display">{t('contact.title')}</RevealText>
          <p className="lede">{t('contact.sub')}</p>
          <ul className="contact__links">
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer"><IconInstagram /> @scentsyndicate</a></li>
            <li><a href="https://wa.me/17870000000" target="_blank" rel="noreferrer"><IconWhatsapp /> WhatsApp · (787) 000-0000</a></li>
            <li><a href="https://tiktok.com" target="_blank" rel="noreferrer"><IconTiktok /> @scentsyndicate</a></li>
            <li><a href="mailto:hello@scentsyndicate.com">hello@scentsyndicate.com</a></li>
          </ul>
          <motion.img src="images/model-woman-champagne.webp" alt="" className="contact__img" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.3, ease: EASE.out }} />
        </div>
        <div className="contact__formwrap">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="ok" className="contact__ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <Seal size={130} tone="dark" />
                <p>{t('f.sent')}</p>
              </motion.div>
            ) : (
              <motion.form key="form" className="form" onSubmit={(e) => { e.preventDefault(); setSent(true); }} exit={{ opacity: 0, y: -20 }}>
                <label><span>{t('f.name')}</span><input required autoComplete="name" /></label>
                <label><span>{t('f.email')}</span><input type="email" required autoComplete="email" /></label>
                <label><span>{t('f.subject')}</span>
                  <select defaultValue="rec">
                    <option value="rec">Recommendation / Recomendación</option>
                    <option value="order">Order / Pedido</option>
                    <option value="decant">Custom decants</option>
                    <option value="other">Other / Otro</option>
                  </select>
                </label>
                <label><span>{t('f.message')}</span><textarea rows={5} required /></label>
                <MagneticButton type="submit" className="btn btn--dark">{t('f.send')} <IconArrow /></MagneticButton>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

/* ———————————————— Checkout (simulated) ———————————————— */
export function Checkout() {
  const { t, l, cart, clear, total } = useStore();
  const [done, setDone] = useState<null | { id: string; total: number }>(null);

  if (done) {
    return (
      <section className="done">
        <Mist count={16} />
        <Seal size={180} tone="amber" />
        <RevealText tag="h1" immediate className="h-display">{t('checkout.done')}</RevealText>
        <p className="lede">{t('checkout.doneSub')}</p>
        <p className="done__id">{t('checkout.order')} #{done.id} · {money(done.total)}</p>
        <MagneticButton to="/shop" className="btn btn--amber">{t('cart.continue')} <IconArrow /></MagneticButton>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className="done">
        <h1 className="h-display">{t('cart.title')}</h1>
        <p className="lede">{t('cart.empty')}</p>
        <MagneticButton to="/shop" className="btn btn--amber">{t('cart.continue')}</MagneticButton>
      </section>
    );
  }

  return (
    <div className="checkout">
      <form
        className="checkout__form form"
        onSubmit={(e) => {
          e.preventDefault();
          setDone({ id: `SS${Math.floor(100000 + Math.random() * 899999)}`, total });
          clear();
          window.scrollTo(0, 0);
        }}
      >
        <h1 className="h-display">{t('checkout.title')}</h1>
        <p className="checkout__demo">{t('checkout.demo')}</p>
        <h2 className="pdp__h">{t('checkout.contact')}</h2>
        <label><span>{t('f.email')}</span><input type="email" required autoComplete="email" /></label>
        <h2 className="pdp__h">{t('checkout.shipping')}</h2>
        <label><span>{t('f.name')}</span><input required autoComplete="name" /></label>
        <label><span>{t('f.address')}</span><input required autoComplete="street-address" /></label>
        <div className="form__row">
          <label><span>{t('f.city')}</span><input required defaultValue="San Juan" autoComplete="address-level2" /></label>
          <label><span>{t('f.zip')}</span><input required inputMode="numeric" autoComplete="postal-code" /></label>
        </div>
        <button className="btn btn--amber btn--block" type="submit">{t('checkout.place')} · {money(total)}</button>
      </form>
      <aside className="checkout__summary">
        <ul className="lines">
          {cart.map((line) => {
            const p = getProduct(line.productId)!;
            const s = sizesFor(p).find((x) => x.id === line.sizeId)!;
            return (
              <li className="line" key={line.productId + line.sizeId}>
                <span className="line__img"><ProductVisual product={p} /><em>{line.qty}</em></span>
                <div className="line__info"><span className="line__brand">{p.brand}</span><strong>{p.name}</strong><span className="line__size">{l(s.label)}</span></div>
                <div className="line__end"><span>{money(linePrice(line) * line.qty)}</span></div>
              </li>
            );
          })}
        </ul>
        <CodeField />
        <Totals />
      </aside>
    </div>
  );
}
