import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { money, useStore } from '../context/Store';
import { collections, families, getProduct, products, reviews, sizesFor, type Family } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductVisual from '../components/ProductVisual';
import RevealText from '../components/RevealText';
import MagneticButton from '../components/MagneticButton';
import Seal from '../components/Seal';
import Stars from '../components/Stars';
import { IconArrow, IconBag, IconCheck, IconInstagram } from '../components/Icons';
import { EASE, stagger } from '../utils';
import type { TKey } from '../data/i18n';

/* ——— Trust strip ——— */
export function TrustBar() {
  const { l } = useStore();
  const items = [
    { en: '100% authentic, batch-verified', es: '100% auténtico, batch verificado' },
    { en: 'Decants 3 · 5 · 10 ml', es: 'Decants 3 · 5 · 10 ml' },
    { en: 'Free shipping over $100', es: 'Envío gratis sobre $100' },
    { en: 'Ships in 24h from Puerto Rico', es: 'Sale en 24h desde Puerto Rico' },
  ];
  return (
    <motion.ul className="trustbar" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      {items.map((x) => (
        <motion.li key={x.en} variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
          <IconCheck /> {l(x)}
        </motion.li>
      ))}
    </motion.ul>
  );
}

/* ——— Shop by collection: compact category tiles ——— */
export function ShopCategories() {
  const { l, t } = useStore();
  const thumbs: Record<string, string> = {
    'niche-luxury': 'baccarat-rouge-540',
    designer: 'dior-sauvage',
    'arabian-inspired': 'lattafa-khamrah',
    decants: 'creed-aventus',
    'discovery-sets': 'the-initiation',
    'new-arrivals': 'miss-dior',
  };
  return (
    <section className="block">
      <div className="block__head">
        <h2 className="h-block">{l({ en: 'Shop by collection', es: 'Compra por colección' })}</h2>
        <Link to="/shop" className="link-more">{t('viewAll')} <IconArrow /></Link>
      </div>
      <motion.div className="cats" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        {collections.map((c, i) => (
          <motion.div key={c.id} variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE.out } } }}>
            <Link to={`/collections/${c.id}`} className={`cat cat--${i % 6}`}>
              <span className="cat__name">{l(c.title)}</span>
              <span className="cat__img"><ProductVisual product={getProduct(thumbs[c.id])!} /></span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ——— Best sellers, filterable by olfactory family ——— */
export function BestSellers() {
  const { t, l } = useStore();
  const [fam, setFam] = useState<Family | 'all'>('all');
  const pool = products.filter((p) => p.kind === 'fragrance');
  const shown = (fam === 'all' ? pool.filter((p) => p.bestSeller || p.approved) : pool.filter((p) => p.family === fam)).slice(0, 8);
  return (
    <section className="block block--white">
      <div className="block__head">
        <div>
          <span className="kicker kicker--dark">{t('best.kicker')}</span>
          <RevealText tag="h2" className="h-block">{l({ en: 'Find your signature', es: 'Encuentra tu firma' })}</RevealText>
        </div>
        <Link to="/shop" className="link-more">{l({ en: 'Shop all', es: 'Ver tienda' })} <IconArrow /></Link>
      </div>
      <div className="tabs" role="tablist">
        {(['all', ...families] as const).map((f) => (
          <button key={f} role="tab" aria-selected={fam === f} className={fam === f ? 'is-on' : ''} onClick={() => setFam(f)}>
            {fam === f && <motion.span layoutId="tabpill" className="tabs__pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            <span>{f === 'all' ? l({ en: 'Best sellers', es: 'Más vendidos' }) : t(`fam.${f}` as TKey)}</span>
          </button>
        ))}
      </div>
      <motion.div className="pgrid pgrid--4" layout>
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.4, ease: EASE.out }}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

/* ——— Promo bento: discovery set + decants ——— */
export function PromoBento() {
  const { l, add, setCartOpen } = useStore();
  const set = getProduct('the-initiation')!;
  const decant = getProduct('baccarat-rouge-540')!;
  const d5 = sizesFor(decant).find((s) => s.id === 'd5')!;
  return (
    <section className="block">
      <div className="bento">
        <motion.div className="promo promo--sage" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9, ease: EASE.out }}>
          <div className="promo__copy">
            <span className="promo__tag">{l({ en: 'Save $39', es: 'Ahorra $39' })}</span>
            <h3>{l({ en: 'Not sure yet? Start with The Initiation.', es: '¿Aún no decides? Empieza con The Initiation.' })}</h3>
            <p>{l({ en: '5 Syndicate icons in 3 ml + $15 credit toward your first full bottle.', es: '5 íconos del Syndicate en 3 ml + $15 de crédito para tu primer frasco.' })}</p>
            <div className="promo__buy">
              <span className="promo__price">{money(set.fullPrice)} <s>{money(set.compareAt!)}</s></span>
              <button className="btn btn--dark" onClick={() => { add(set.id, 'set'); setCartOpen(true); }}><IconBag /> {l({ en: 'Add to bag', es: 'Añadir' })}</button>
            </div>
          </div>
          <motion.div className="promo__visual" initial={{ y: 40, rotate: -4 }} whileInView={{ y: 0, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE.out }}>
            <ProductVisual product={set} />
          </motion.div>
          <Seal size={84} tone="dark" className="promo__seal" />
        </motion.div>

        <motion.div className="promo promo--amber" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9, delay: 0.12, ease: EASE.out }}>
          <div className="promo__copy">
            <span className="promo__tag">{l({ en: 'Try before you commit', es: 'Prueba antes de decidir' })}</span>
            <h3>{l({ en: 'Any scent in 3, 5 or 10 ml', es: 'Cualquier aroma en 3, 5 o 10 ml' })}</h3>
            <div className="vials">
              {[3, 5, 10].map((ml, k) => (
                <motion.span key={ml} className="vialchip" initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + k * 0.12 }}>
                  <i style={{ height: 24 + k * 14 }} />{ml} ml
                </motion.span>
              ))}
            </div>
            <div className="promo__buy">
              <span className="promo__price"><small>BR540 · 5 ml</small> {money(d5.price)}</span>
              <MagneticButton to="/collections/decants" className="btn btn--dark">{l({ en: 'Shop decants', es: 'Ver decants' })} <IconArrow /></MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ——— New arrivals row ——— */
export function NewArrivals() {
  const { t } = useStore();
  const items = products.filter((p) => p.isNew).slice(0, 4);
  return (
    <section className="block block--rose">
      <div className="block__head">
        <div>
          <span className="kicker kicker--dark">{t('new.kicker')}</span>
          <RevealText tag="h2" className="h-block">{t('new.title')}</RevealText>
        </div>
        <Link to="/collections/new-arrivals" className="link-more">{t('viewAll')} <IconArrow /></Link>
      </div>
      <motion.div className="pgrid pgrid--4 hscroll-sm" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
        {items.map((p) => <ProductCard key={p.id} product={p} />)}
      </motion.div>
    </section>
  );
}

/* ——— Brand editorial: one image, one idea, one CTA ——— */
export function Editorial() {
  const { l } = useStore();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  return (
    <section ref={ref} className="block">
      <div className="editorial">
        <div className="editorial__img">
          <motion.img src="images/model-woman-silk.webp" alt="" style={{ y }} loading="lazy" />
        </div>
        <div className="editorial__copy">
          <Seal size={96} tone="amber" />
          <RevealText tag="h2" className="h-display">{l({ en: 'Approved by the Syndicate', es: 'Aprobado por el Syndicate' })}</RevealText>
          <p className="lede">{l({ en: 'Every bottle is sourced from authorized distributors, every decant hand-poured from the original. If the circle would not wear it, we do not sell it.', es: 'Cada frasco viene de distribuidores autorizados y cada decant se sirve a mano del original. Si el círculo no lo usaría, no lo vendemos.' })}</p>
          <div className="editorial__ctas">
            <MagneticButton to="/shop" className="btn btn--amber">{l({ en: 'Shop the collection', es: 'Comprar la colección' })} <IconArrow /></MagneticButton>
            <Link to="/about" className="link-more">{l({ en: 'Our story', es: 'Nuestra historia' })} <IconArrow /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ——— Reviews + Instagram join ——— */
export function Community() {
  const { t, l } = useStore();
  const [done, setDone] = useState(false);
  return (
    <section className="block block--sage">
      <div className="block__head block__head--center">
        <span className="kicker kicker--dark">{t('reviews.kicker')}</span>
        <h2 className="h-block">{t('reviews.title')}</h2>
      </div>
      <div className="reviews__marquee">
        <div className="reviews__track">
          {[...reviews, ...reviews].map((r, i) => (
            <figure className="review" key={i} aria-hidden={i >= reviews.length}>
              <Stars value={r.rating} small />
              <blockquote>“{l(r.text)}”</blockquote>
              <figcaption><strong>{r.name}</strong> · {r.city}<span>{r.product}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="join">
        <div>
          <h3>{t('community.title')}</h3>
          <p>{l({ en: 'Early drops, private decant lists and 15% off your first order.', es: 'Lanzamientos anticipados, listas privadas de decants y 15% en tu primera orden.' })}</p>
        </div>
        {done ? (
          <p className="join__ok">✦ {t('community.joined')}</p>
        ) : (
          <form className="joinform" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
            <input type="email" required placeholder={t('community.email')} aria-label={t('community.email')} />
            <button className="btn btn--dark" type="submit">{t('community.join')}</button>
          </form>
        )}
        <a className="join__ig" href="https://instagram.com" target="_blank" rel="noreferrer"><IconInstagram /> @scentsyndicate</a>
      </div>
    </section>
  );
}
