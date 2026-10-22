import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStore, money } from '../context/Store';
import { getProduct, sizesFor, type Product } from '../data/products';
import { useIsDesktop } from '../hooks/useMedia';
import MagneticButton from '../components/MagneticButton';
import Seal from '../components/Seal';
import Mist from '../components/Mist';
import { IconArrow } from '../components/Icons';
import { EASE } from '../utils';

const HERO_IDS = ['baccarat-rouge-540', 'black-orchid', 'chanel-no5', 'creed-aventus'];
const heroProducts = HERO_IDS.map((id) => getProduct(id)!) as Product[];

function useCycle(len: number, ms: number, paused: boolean) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((x) => (x + 1) % len), ms);
    return () => clearInterval(id);
  }, [len, ms, paused, i]);
  return [i, setI] as const;
}

function Pedestal({ className = '' }: { className?: string }) {
  return (
    <div className={`pedestal ${className}`} aria-hidden>
      <div className="pedestal__top" />
      <div className="pedestal__body" />
      <div className="pedestal__shadow" />
    </div>
  );
}

function HeroTitle({ immediateDelay = 0.4 }: { immediateDelay?: number }) {
  const { t } = useStore();
  return (
    <h1 className="hero__title">
      {[t('hero.title1'), t('hero.title2')].map((line, i) => (
        <span className="reveal__mask hero__line" key={line}>
          <motion.span
            className={`reveal__word${i === 1 ? ' hero__italic' : ''}`}
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.2, delay: immediateDelay + i * 0.14, ease: EASE.cinematic }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

/* ———————————————————— DESKTOP: light, editorial, cinematic ———————————————————— */
function HeroDesktop() {
  const { t, l } = useStore();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(false);
  const [i, setI] = useCycle(heroProducts.length, 5600, hover || !!reduce);
  const p = heroProducts[i];

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const sp = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  // The title splits apart while the bottle rises through the gap.
  const leftX = useTransform(sp, [0, 1], ['0vw', '-22vw']);
  const rightX = useTransform(sp, [0, 1], ['0vw', '22vw']);
  const wordsO = useTransform(sp, [0, 0.7], [1, 0]);
  const bottleY = useTransform(sp, [0, 1], [0, -140]);
  const bottleScale = useTransform(sp, [0, 1], [1, 1.18]);
  const archScale = useTransform(sp, [0, 1], [1, 1.35]);
  const archO = useTransform(sp, [0, 0.8], [1, 0.2]);
  const uiO = useTransform(sp, [0, 0.4], [1, 0]);
  const uiY = useTransform(sp, [0, 0.4], [0, 40]);

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const onMove = (e: React.PointerEvent) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };

  return (
    <section ref={ref} className="hero hero--desk" onPointerMove={onMove}>
      <div className="hero__glow" style={{ ['--accent' as string]: p.accent }} />
      <div className="hero__sun" aria-hidden />
      <Mist count={18} />

      <motion.img
        src="images/botanical-arch.webp"
        alt=""
        className="hero__arch"
        style={{ scale: archScale, opacity: archO, x: tilt.x * -14, y: tilt.y * -8 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.2, ease: EASE.out }}
      />

      <h1 className="hero__type" aria-label={`${t('hero.title1')} ${t('hero.title2')}`}>
        <motion.span className="hero__type-a" style={{ x: leftX, opacity: wordsO }} aria-hidden>
          <span className="reveal__mask">
            <motion.span className="reveal__word" initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 1.3, delay: 0.3, ease: EASE.cinematic }}>
              {t('hero.title1')}
            </motion.span>
          </span>
        </motion.span>
        <motion.span className="hero__type-b" style={{ x: rightX, opacity: wordsO }} aria-hidden>
          <span className="reveal__mask">
            <motion.span className="reveal__word hero__italic" initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 1.3, delay: 0.48, ease: EASE.cinematic }}>
              {t('hero.title2')}
            </motion.span>
          </span>
        </motion.span>
      </h1>

      <motion.div className="hero__center" style={{ x: tilt.x * 10, y: tilt.y * 6 }}>
        <Pedestal />
        <motion.div className="hero__bottle" style={{ y: bottleY, scale: bottleScale }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={p.id}
              src={p.image}
              alt={`${p.brand} ${p.name}`}
              initial={{ opacity: 0, y: 70, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: -50, rotate: 3 }}
              transition={{ duration: 0.9, ease: EASE.out }}
              className="float"
              draggable={false}
            />
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <motion.span className="kicker hero__kicker" style={{ opacity: uiO }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        {t('hero.kicker')}
      </motion.span>

      <motion.div className="hero__copy" style={{ opacity: uiO, y: uiY }}>
        <motion.p className="hero__sub" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1, ease: EASE.out }}>
          {t('hero.sub')}
        </motion.p>
        <motion.div className="hero__ctas" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 1, ease: EASE.out }}>
          <MagneticButton to="/shop" className="btn btn--amber">{t('hero.cta')} <IconArrow /></MagneticButton>
          <MagneticButton to="/collections/decants" className="btn btn--line">{t('hero.cta2')}</MagneticButton>
        </motion.div>
      </motion.div>

      <motion.aside
        className="hero__feature"
        style={{ opacity: uiO, y: uiY }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3, duration: 1, ease: EASE.out }}>
          <Seal size={92} tone="amber" className="hero__seal" />
          <span className="kicker kicker--sm">{t('hero.featured')} · 0{i + 1}/0{heroProducts.length}</span>
          <AnimatePresence mode="wait">
            <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.5 }}>
              <Link to={`/product/${p.id}`} className="hero__feature-link">
                <span className="hero__feature-brand">{p.brand}</span>
                <span className="hero__feature-name">{p.name}</span>
                <span className="hero__feature-tag">{l(p.tagline)}</span>
                <span className="hero__feature-price">{t('from')} {money(Math.min(...sizesFor(p).map((s) => s.price)))} <IconArrow /></span>
              </Link>
            </motion.div>
          </AnimatePresence>
          <div className="hero__thumbs" role="tablist" aria-label="Featured fragrances">
            {heroProducts.map((hp, k) => (
              <button key={hp.id} role="tab" aria-selected={k === i} className={k === i ? 'is-on' : ''} onClick={() => setI(k)} aria-label={hp.name}>
                <img src={hp.image} alt="" />
                {k === i && !hover && !reduce && <motion.span className="hero__thumb-bar" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 5.6, ease: 'linear' }} />}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.aside>

      <motion.div className="hero__scroll" style={{ opacity: uiO }}>
        <span>{t('hero.scroll')}</span>
        <i />
      </motion.div>
    </section>
  );
}

/* ———————————————————— MOBILE: thumb-first, Instagram-native ———————————————————— */
function HeroMobile() {
  const { t, l, add, setCartOpen } = useStore();
  const reduce = useReducedMotion();
  const [touched, setTouched] = useState(false);
  const [i, setI] = useCycle(heroProducts.length, 4200, touched || !!reduce);
  const p = heroProducts[i];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bottleY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const branchX = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const go = (dir: number) => {
    setTouched(true);
    setI((x) => (x + dir + heroProducts.length) % heroProducts.length);
  };

  return (
    <section ref={ref} className="hero hero--mob">
      <div className="hero__glow" style={{ ['--accent' as string]: p.accent }} />
      <Mist count={10} />
      <motion.img src="images/magnolia-branch.webp" alt="" className="hero__branch" style={{ x: branchX }} initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.6, delay: 0.6, ease: EASE.out }} />

      <div className="hero__mtop">
        <motion.span className="kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>{t('hero.kicker')}</motion.span>
        <HeroTitle immediateDelay={0.25} />
      </div>

      <motion.div
        className="hero__mstage"
        drag={reduce ? false : 'x'}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.25}
        onDragEnd={(_, info) => {
          if (info.offset.x < -50) go(1);
          else if (info.offset.x > 50) go(-1);
        }}
        style={{ y: bottleY }}
      >
        <Pedestal className="pedestal--sm" />
        <AnimatePresence mode="wait">
          <motion.img
            key={p.id}
            src={p.image}
            alt={`${p.brand} ${p.name}`}
            className="hero__mbottle float"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.7, ease: EASE.out }}
            draggable={false}
          />
        </AnimatePresence>
        <Seal size={70} className="hero__mseal" tone="amber" />
      </motion.div>

      <div className="hero__mfoot">
        <div className="hero__dots" role="tablist">
          {heroProducts.map((hp, k) => (
            <button key={hp.id} className={k === i ? 'is-on' : ''} onClick={() => { setTouched(true); setI(k); }} aria-label={hp.name} />
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={p.id} className="hero__mcaption" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
            <Link to={`/product/${p.id}`}>
              <span>{p.brand}</span>
              <strong>{p.name}</strong>
              <em>{l(p.tagline)}</em>
            </Link>
          </motion.div>
        </AnimatePresence>
        <div className="hero__mctas">
          <button className="btn btn--amber" onClick={() => { add(p.id, 'd5'); setCartOpen(true); }}>
            {l({ en: 'Try 5 ml', es: 'Prueba 5 ml' })} · {money(sizesFor(p).find((s) => s.id === 'd5')!.price)}
          </button>
          <Link to="/shop" className="btn btn--line">{t('nav.shop')}</Link>
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  return useIsDesktop() ? <HeroDesktop /> : <HeroMobile />;
}
