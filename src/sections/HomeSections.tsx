import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStore } from '../context/Store';
import { collections, products, reviews, type Collection } from '../data/products';
import ProductCard from '../components/ProductCard';
import RevealText from '../components/RevealText';
import MagneticButton from '../components/MagneticButton';
import Seal from '../components/Seal';
import Stars from '../components/Stars';
import { IconArrow, IconInstagram } from '../components/Icons';
import { EASE, stagger } from '../utils';
import type { TKey } from '../data/i18n';

/* ——— Collections: editorial pairing of models with each circle ——— */
function CollectionPanel({ c, i }: { c: Collection; i: number }) {
  const { l, t } = useStore();
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  return (
    <motion.div
      className={`colpanel colpanel--${i}`}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: EASE.out, delay: (i % 2) * 0.12 }}
    >
      <Link ref={ref} to={`/collections/${c.id}`} className={`colpanel__link colpanel__link--${c.tone}`}>
        <div className="colpanel__img">
          <motion.img src={c.image} alt="" style={{ y }} loading="lazy" />
        </div>
        <div className="colpanel__text">
          <span className="colpanel__num">0{i + 1}</span>
          <span className="colpanel__kicker">{l(c.kicker)}</span>
          <h3>{l(c.title)}</h3>
          <p>{l(c.blurb)}</p>
          <span className="colpanel__cta">{t('collections.explore')} <IconArrow /></span>
        </div>
      </Link>
    </motion.div>
  );
}

export function CollectionsShowcase() {
  const { t } = useStore();
  const shown = collections.filter((c) => c.id !== 'new-arrivals');
  return (
    <section className="cols sec sec--beige">
      <div className="sec__head">
        <span className="kicker kicker--dark">{t('collections.kicker')}</span>
        <RevealText tag="h2" className="h-display">{t('collections.title')}</RevealText>
      </div>
      <div className="cols__grid">
        {shown.map((c, i) => <CollectionPanel key={c.id} c={c} i={i} />)}
      </div>
    </section>
  );
}

/* ——— New arrivals, framed by the magnolia branch ——— */
export function NewArrivals() {
  const { t } = useStore();
  const items = products.filter((p) => p.isNew && p.kind === 'fragrance').slice(0, 4);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bx = useTransform(scrollYProgress, [0, 1], ['18%', '-6%']);
  const br = useTransform(scrollYProgress, [0, 1], [8, -4]);
  return (
    <section ref={ref} className="newarr sec sec--sage">
      <motion.img src="images/magnolia-branch.webp" alt="" className="newarr__branch" style={{ x: bx, rotate: br }} loading="lazy" />
      <div className="sec__head sec__head--row">
        <div>
          <span className="kicker">{t('new.kicker')}</span>
          <RevealText tag="h2" className="h-display">{t('new.title')}</RevealText>
        </div>
        <Link to="/collections/new-arrivals" className="link-arrow">{t('viewAll')} <IconArrow /></Link>
      </div>
      <motion.div className="grid4 hscroll-sm" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
        {items.map((p) => <ProductCard key={p.id} product={p} tone="blush" />)}
      </motion.div>
    </section>
  );
}

/* ——— Decants: vials rise in ascending size ——— */
function Vial({ ml, delay }: { ml: 3 | 5 | 10; delay: number }) {
  const h = { 3: 120, 5: 160, 10: 210 }[ml];
  return (
    <motion.div
      className="vial"
      initial={{ y: 120, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.1, delay, ease: EASE.out }}
    >
      <svg viewBox={`0 0 60 ${h}`} style={{ height: h }} aria-hidden>
        <defs>
          <linearGradient id={`vl${ml}`} x1="0" x2="1">
            <stop offset="0" stopColor="#b97a2e" />
            <stop offset=".5" stopColor="#f1c27a" />
            <stop offset="1" stopColor="#a8661f" />
          </linearGradient>
        </defs>
        <rect x="20" y="0" width="20" height="22" rx="3" fill="#1a1410" />
        <rect x="12" y="20" width="36" height={h - 22} rx="8" fill="rgba(255,255,255,.35)" stroke="rgba(26,20,16,.35)" />
        <motion.rect
          x="15"
          width="30"
          rx="6"
          fill={`url(#vl${ml})`}
          initial={{ y: h - 4, height: 0 }}
          whileInView={{ y: 40, height: h - 44 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: delay + 0.5, ease: EASE.out }}
        />
        <rect x="17" y="30" width="4" height={h - 50} rx="2" fill="rgba(255,255,255,.5)" />
      </svg>
      <strong>{ml} ml</strong>
    </motion.div>
  );
}

export function Decants() {
  const { t } = useStore();
  return (
    <section className="decants sec sec--stone">
      <div className="decants__grid">
        <div className="decants__copy">
          <span className="kicker kicker--dark">{t('decants.kicker')}</span>
          <RevealText tag="h2" className="h-display">{t('decants.title')}</RevealText>
          <p className="lede lede--dark">{t('decants.sub')}</p>
          <ul className="decants__list">
            {([3, 5, 10] as const).map((ml) => (
              <li key={ml}><strong>{ml} ml</strong><span>{t(`decants.${ml}` as TKey)}</span></li>
            ))}
          </ul>
          <MagneticButton to="/collections/decants" className="btn btn--dark">{t('hero.cta2')} <IconArrow /></MagneticButton>
        </div>
        <div className="decants__vials">
          <div className="decants__slab" aria-hidden />
          <Vial ml={3} delay={0} />
          <Vial ml={5} delay={0.15} />
          <Vial ml={10} delay={0.3} />
        </div>
      </div>
    </section>
  );
}

/* ——— Best sellers + reviews ——— */
export function BestSellers() {
  const { t, l } = useStore();
  const items = products.filter((p) => p.bestSeller).slice(0, 4);
  return (
    <section className="best sec sec--cream">
      <div className="sec__head sec__head--row">
        <div>
          <span className="kicker kicker--dark">{t('best.kicker')}</span>
          <RevealText tag="h2" className="h-display">{t('best.title')}</RevealText>
        </div>
        <Link to="/shop" className="link-arrow link-arrow--dark">{t('viewAll')} <IconArrow /></Link>
      </div>
      <motion.div className="grid4 hscroll-sm" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
        {items.map((p) => <ProductCard key={p.id} product={p} />)}
      </motion.div>

      <div className="reviews">
        <div className="reviews__head">
          <span className="kicker kicker--dark">{t('reviews.kicker')}</span>
          <h3 className="h-sub">{t('reviews.title')}</h3>
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
      </div>
    </section>
  );
}

/* ——— Community / Instagram ——— */
export function Community() {
  const { t, l } = useStore();
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const r1 = useTransform(scrollYProgress, [0, 1], [-6, 2]);

  return (
    <section ref={ref} className="community sec sec--champagne">
      <div className="community__grid">
        <div className="community__copy">
          <span className="kicker">{t('community.kicker')}</span>
          <RevealText tag="h2" className="h-display">{t('community.title')}</RevealText>
          <p className="lede">{t('community.sub')}</p>
          {done ? (
            <motion.p className="community__ok" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>✦ {t('community.joined')}</motion.p>
          ) : (
            <form className="joinform" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
              <input type="email" required placeholder={t('community.email')} aria-label={t('community.email')} />
              <button className="btn btn--amber" type="submit">{t('community.join')}</button>
            </form>
          )}
          <MagneticButton href="https://instagram.com" className="btn btn--line"><IconInstagram /> {t('community.follow')}</MagneticButton>
        </div>

        <div className="community__visual">
          <motion.div className="phone" style={{ y: y1, rotate: r1 }}>
            <div className="phone__bar"><span>scentsyndicate</span><IconInstagram /></div>
            <div className="phone__post">
              <img src="images/model-woman-silk.webp" alt="" loading="lazy" />
              <Seal size={64} tone="amber" className="phone__seal" />
            </div>
            <div className="phone__meta">
              <span>♥ 4,812</span>
              <p><strong>scentsyndicate</strong> {l({ en: 'Silk, skin and Baccarat Rouge. Who else wears it on a Tuesday? ✦', es: 'Seda, piel y Baccarat Rouge. ¿Quién más lo usa un martes? ✦' })}</p>
            </div>
          </motion.div>
          <motion.div className="igcard" style={{ y: y2 }}>
            <img src="images/model-man-suit.webp" alt="" loading="lazy" />
            <span>#ApprovedByTheSyndicate</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
