import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { money, useStore } from '../context/Store';
import { getProduct, sizesFor, type Product } from '../data/products';
import MagneticButton from '../components/MagneticButton';
import ProductVisual from '../components/ProductVisual';
import Seal from '../components/Seal';
import { IconArrow, IconBag, IconSearch } from '../components/Icons';
import { EASE } from '../utils';

const HERO_IDS = ['baccarat-rouge-540', 'black-orchid', 'chanel-no5', 'creed-aventus', 'flowerbomb'];
const heroProducts = HERO_IDS.map((id) => getProduct(id)!) as Product[];
const fromPrice = (p: Product) => Math.min(...sizesFor(p).map((s) => s.price));

function useCycle(len: number, ms: number, paused: boolean) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((x) => (x + 1) % len), ms);
    return () => clearInterval(id);
  }, [len, ms, paused, i]);
  return [i, setI] as const;
}

function SearchBar() {
  const { t } = useStore();
  const nav = useNavigate();
  const [q, setQ] = useState('');
  return (
    <form className="hsearch" onSubmit={(e) => { e.preventDefault(); nav(`/shop?q=${encodeURIComponent(q)}`); }} role="search">
      <IconSearch />
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('shop.search')} aria-label={t('nav.search')} />
      <button type="submit" aria-label={t('nav.search')}><IconArrow /></button>
    </form>
  );
}

/**
 * Bottle "drops" onto the podium and lands dead-centre: the bottle sits in a
 * full-width flex lane above the podium, so every image is centred regardless
 * of its proportions.
 */
function Showcase({ p, compact }: { p: Product; compact?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className={`showcase${compact ? ' showcase--compact' : ''}`} style={{ ['--accent' as string]: p.accent }}>
      <motion.div className="showcase__halo" key={`halo-${p.id}`} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, ease: EASE.out }} />
      <div className="showcase__lane">
        <AnimatePresence mode="wait">
          <motion.div
            key={p.id}
            className="showcase__bottle"
            initial={reduce ? { opacity: 0 } : { y: -140, opacity: 0, rotate: -6 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={reduce ? { opacity: 0 } : { y: -40, opacity: 0, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 170, damping: 15, mass: 0.9 }}
          >
            <ProductVisual product={p} eager />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="podium" aria-hidden>
        <motion.div className="podium__shadow" key={`sh-${p.id}`} initial={{ scaleX: 0.5, opacity: 0.2 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: 0.25, duration: 0.6, ease: EASE.out }} />
        <div className="podium__top" />
        <div className="podium__side" />
      </div>
    </div>
  );
}

export default function Hero() {
  const { t, l, add, setCartOpen } = useStore();
  const [hover, setHover] = useState(false);
  const reduce = useReducedMotion();
  const [i, setI] = useCycle(heroProducts.length, 4800, hover || !!reduce);
  const p = heroProducts[i];
  const quick = (id: string) => {
    add(id, 'd5');
    setCartOpen(true);
  };

  return (
    <section className="hero">
      {/* Mobile-only search, app style */}
      <div className="hero__msearch"><SearchBar /></div>

      <div className="hero__grid">
        {/* Offer / headline card */}
        <motion.div className="hcard hcard--offer" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE.out }}>
          <span className="hcard__tag">{l({ en: 'Members offer · −15% first order', es: 'Oferta miembros · −15% primera orden' })}</span>
          <h1 className="hero__title">
            {[t('hero.title1'), t('hero.title2')].map((w, k) => (
              <span className="reveal__mask" key={w}>
                <motion.span className={`reveal__word${k ? ' hero__italic' : ''}`} initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 1.1, delay: 0.15 + k * 0.12, ease: EASE.cinematic }}>
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>
          <p className="hero__sub">{l({ en: 'Niche, designer and Arabian fragrances — authentic full bottles and hand-poured decants from $9.', es: 'Fragancias nicho, de diseñador y árabes: frascos auténticos y decants servidos a mano desde $9.' })}</p>
          <div className="hero__dsearch"><SearchBar /></div>
          <div className="hero__ctas">
            <MagneticButton to="/shop" className="btn btn--dark">{l({ en: 'Shop now', es: 'Comprar ahora' })} <IconArrow /></MagneticButton>
            <MagneticButton to="/collections/decants" className="btn btn--line">{l({ en: 'Decants from $9', es: 'Decants desde $9' })}</MagneticButton>
          </div>
          <ul className="hero__trust">
            <li><strong>4.9★</strong> {l({ en: '2,400+ members', es: '2,400+ miembros' })}</li>
            <li><strong>100%</strong> {l({ en: 'authentic', es: 'auténtico' })}</li>
            <li><strong>24h</strong> {l({ en: 'dispatch', es: 'despacho' })}</li>
          </ul>
          <img src="images/botanical-arch.webp" alt="" className="hcard__botanic" aria-hidden />
        </motion.div>

        {/* Product showcase card */}
        <motion.div
          className="hcard hcard--product"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE.out }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{ ['--accent' as string]: p.accent }}
        >
          <div className="hcard__top">
            <span className="hcard__label">{t('hero.featured')} · 0{i + 1}</span>
            {p.approved && <Seal size={64} tone="amber" />}
          </div>
          <motion.div
            className="hcard__stage"
            drag={reduce ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (Math.abs(info.offset.x) < 50) return;
              setHover(true);
              setI((x) => (x + (info.offset.x < 0 ? 1 : -1) + heroProducts.length) % heroProducts.length);
            }}
          >
            <Showcase p={p} />
          </motion.div>
          <div className="hero__dots" role="tablist" aria-label="Featured fragrances">
            {heroProducts.map((hp, k) => (
              <button key={hp.id} role="tab" aria-selected={k === i} className={k === i ? 'is-on' : ''} onClick={() => { setHover(true); setI(k); }} aria-label={hp.name} />
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={p.id} className="hcard__info" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }}>
              <Link to={`/product/${p.id}`} className="hcard__name">
                <small>{p.brand}</small>
                {p.name}
              </Link>
              <div className="hcard__buy">
                <span className="hcard__price"><small>{t('from')}</small>{money(fromPrice(p))}</span>
                <button className="btn btn--amber" onClick={() => quick(p.id)}><IconBag /> {l({ en: 'Try 5 ml', es: 'Prueba 5 ml' })}</button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Bento side tiles (desktop) */}
        <motion.div className="hero__tiles" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: EASE.out }}>
          <Link to="/sets" className="htile htile--sage">
            <span className="htile__kicker">{l({ en: 'Discovery set', es: 'Set de descubrimiento' })}</span>
            <strong>{l({ en: '5 icons, $59', es: '5 íconos, $59' })}</strong>
            <span className="htile__cta">{l({ en: 'Shop sets', es: 'Ver sets' })} <IconArrow /></span>
            <div className="htile__img"><ProductVisual product={getProduct('the-initiation')!} /></div>
          </Link>
          <Link to="/collections/arabian-inspired" className="htile htile--rose">
            <span className="htile__kicker">{l({ en: 'Arabian & Inspired', es: 'Árabes e Inspirados' })}</span>
            <strong>{l({ en: 'From $39', es: 'Desde $39' })}</strong>
            <span className="htile__cta">{l({ en: 'Explore', es: 'Explorar' })} <IconArrow /></span>
            <div className="htile__img"><ProductVisual product={getProduct('lattafa-khamrah')!} /></div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
