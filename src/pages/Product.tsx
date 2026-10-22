import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { money, useStore } from '../context/Store';
import { getProduct, products, reviews, sizesFor, type Product as P } from '../data/products';
import { profiles, type Season } from '../data/profiles';
import { useIsDesktop } from '../hooks/useMedia';
import ProductVisual from '../components/ProductVisual';
import ProductCard from '../components/ProductCard';
import RevealText from '../components/RevealText';
import Seal from '../components/Seal';
import Stars from '../components/Stars';
import Mist from '../components/Mist';
import { IconCheck, IconMinus, IconPlus } from '../components/Icons';
import { EASE, stagger } from '../utils';
import type { TKey } from '../data/i18n';
import NotFound from './NotFound';

const TIERS = ['top', 'heart', 'base'] as const;
const SEASONS: Season[] = ['spring', 'summer', 'fall', 'winter'];

/* ——— The olfactory journey: three acts, revealed by scroll ——— */
function TierCard({ p, i }: { p: P; i: number }) {
  const { t } = useStore();
  const k = TIERS[i];
  return (
    <>
      <span className="journey__time">{t(`pdp.t${i}` as TKey)}</span>
      <h3>{t(`notes.${k}` as TKey)}</h3>
      <p>{t(`notes.${k}.d` as TKey)}</p>
      <ul className="journey__notes">
        {p.notes[k].map((n, j) => (
          <motion.li key={n} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + j * 0.1 }}>
            {n}
          </motion.li>
        ))}
      </ul>
    </>
  );
}

function ScrollTier({ p, i, progress }: { p: P; i: number; progress: MotionValue<number> }) {
  const start = i / 3;
  // The first act is already on stage when the section pins; the last one stays.
  const opacity = useTransform(progress, [start, start + 0.12, start + 0.3, start + 0.36], [i === 0 ? 1 : 0, 1, 1, i === 2 ? 1 : 0]);
  const y = useTransform(progress, [start, start + 0.12], [i === 0 ? 0 : 50, 0]);
  return (
    <motion.div className={`journey__tier journey__tier--${i}`} style={{ opacity, y }}>
      <TierCard p={p} i={i} />
    </motion.div>
  );
}

function JourneyDesktop({ p }: { p: P }) {
  const { t } = useStore();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const bg = useTransform(scrollYProgress, [0, 0.5, 1], ['#f6ecdb', '#f1e2da', '#e7e4d6']);
  const rot = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const lift = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const ring = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.section ref={ref} className="journey journey--desk" style={{ backgroundColor: bg }}>
      <div className="journey__sticky">
        <div className="journey__head">
          <span className="kicker kicker--dark">{t('pdp.journey')}</span>
          <p>{t('pdp.journeySub')}</p>
        </div>
        <div className="journey__stage">
          <svg className="journey__ring" viewBox="0 0 400 400" aria-hidden>
            <circle cx="200" cy="200" r="190" />
            <motion.circle cx="200" cy="200" r="190" style={{ pathLength: ring }} className="journey__ring-fill" />
          </svg>
          <Mist count={10} />
          <motion.div className="journey__bottle" style={{ rotate: rot, y: lift }}>
            <ProductVisual product={p} />
          </motion.div>
        </div>
        <div className="journey__tiers">
          {TIERS.map((_, i) => <ScrollTier key={i} p={p} i={i} progress={scrollYProgress} />)}
        </div>
      </div>
    </motion.section>
  );
}

function JourneyMobile({ p }: { p: P }) {
  const { t } = useStore();
  return (
    <section className="journey journey--mob sec">
      <span className="kicker kicker--dark">{t('pdp.journey')}</span>
      <p className="journey__sub">{t('pdp.journeySub')}</p>
      {TIERS.map((_, i) => (
        <motion.div key={i} className={`journey__tier journey__tier--${i}`} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8, ease: EASE.out }}>
          <TierCard p={p} i={i} />
        </motion.div>
      ))}
    </section>
  );
}

/* ——— Character meters ——— */
function Meter({ label, value, scale }: { label: string; value: number; scale: string[] }) {
  return (
    <div className="meter">
      <div className="meter__top"><span>{label}</span><strong>{scale[value - 1]}</strong></div>
      <div className="meter__track">
        {Array.from({ length: 5 }, (_, i) => (
          <motion.i
            key={i}
            className={i < value ? 'is-on' : ''}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.12, duration: 0.6, ease: EASE.out }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Product() {
  const { id } = useParams();
  const p = id ? getProduct(id) : undefined;
  const { t, l, add, setCartOpen } = useStore();
  const desktop = useIsDesktop();
  const [sizeId, setSizeId] = useState('');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const rot = useTransform(scrollYProgress, [0, 1], [0, -8]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, -60]);

  useEffect(() => {
    if (p) setSizeId(sizesFor(p)[0].id);
    setQty(1);
  }, [p]);

  if (!p) return <NotFound />;

  const profile = profiles[p.id];
  const sizes = sizesFor(p);
  const size = sizes.find((s) => s.id === sizeId) ?? sizes[0];
  const setItems = p.setItems?.map(getProduct).filter(Boolean) as P[] | undefined;
  const related = products.filter((x) => x.id !== p.id && (x.family === p.family || x.collections.some((c) => p.collections.includes(c)))).slice(0, 4);
  const scale = t('pdp.lv').split(' · ');

  const buy = () => {
    add(p.id, size.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
    setTimeout(() => setCartOpen(true), 350);
  };

  return (
    <div className="pdp" style={{ ['--accent' as string]: p.accent }}>
      {/* 1 · Presentation & purchase */}
      <div className="pdp__grid" ref={ref}>
        <div className="pdp__stage">
          <div className="pdp__glow" />
          <Mist count={12} />
          <span className="pdp__ghost" aria-hidden>{p.name}</span>
          <div className="pdp__pedestal" aria-hidden />
          <motion.div
            className="pdp__visual"
            style={{ rotate: rot, y: lift }}
            initial={{ opacity: 0, y: 80, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE.out }}
          >
            <div className="float"><ProductVisual product={p} eager /></div>
          </motion.div>
          {p.approved && <Seal size={104} tone="amber" className="pdp__seal" />}
        </div>

        <div className="pdp__info">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/shop">{t('nav.shop')}</Link> / <span>{p.brand}</span>
          </nav>
          <motion.span className="pdp__brand" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{p.brand}</motion.span>
          <RevealText tag="h1" immediate className="pdp__name" key={p.id}>{p.name}</RevealText>
          <p className="pdp__tagline">{l(p.tagline)}</p>
          {profile && <p className="pdp__mood">{l(profile.mood)}</p>}
          <div className="pdp__rating"><Stars value={p.rating} /> <span>{p.rating} · {p.reviews} {t('reviewsWord')}</span></div>
          <p className="pdp__desc">{l(p.description)}</p>

          <dl className="pdp__facts">
            <div><dt>{t('family')}</dt><dd>{t(`fam.${p.family}` as TKey)}</dd></div>
            <div><dt>{t('gender')}</dt><dd>{t(`g.${p.gender}` as TKey)}</dd></div>
            <div><dt>{p.kind === 'set' ? t('shop.type') : 'Concentration'}</dt><dd>{p.concentration}</dd></div>
          </dl>

          {setItems && (
            <div className="pdp__set">
              <h3 className="pdp__h">{t('includes')}</h3>
              <ul>
                {setItems.map((s) => (
                  <li key={s.id}><Link to={`/product/${s.id}`}><span className="pdp__setimg"><ProductVisual product={s} /></span><span><small>{s.brand}</small>{s.name}</span></Link></li>
                ))}
              </ul>
            </div>
          )}

          <div className="sizes" role="radiogroup" aria-label={t('size')}>
            <h3 className="pdp__h">{t('size')}</h3>
            {sizes.map((s) => (
              <button key={s.id} role="radio" aria-checked={s.id === size.id} className={`size${s.id === size.id ? ' is-on' : ''}`} onClick={() => setSizeId(s.id)}>
                <span className="size__label">{l(s.label)}</span>
                <span className="size__price">{money(s.price)}{s.compareAt && <s>{money(s.compareAt)}</s>}</span>
                {s.ml && s.id !== 'full' && <span className="size__unit">{money(s.price / s.ml)}/ml</span>}
              </button>
            ))}
          </div>

          <p className={`stock stock--${p.stock}`}><i />{p.stock === 'low' ? t('lowStock') : t('inStock')}</p>

          <div className="buyrow">
            <div className="qty" aria-label={t('qty')}>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="−"><IconMinus /></button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="+"><IconPlus /></button>
            </div>
            <button className="btn btn--amber btn--grow" onClick={buy}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={String(added)} initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} transition={{ duration: 0.25 }} className="btn__swap">
                  {added ? <><IconCheck /> {t('added')}</> : <>{t('add')} · {money(size.price * qty)}</>}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>

          <ul className="assure">
            <li><IconCheck /> {t('authentic.1')}</li>
            <li><IconCheck /> {t('authentic.2')}</li>
            <li><IconCheck /> {t('authentic.3')}</li>
          </ul>
        </div>
      </div>

      {/* 2 · The story */}
      {profile && (
        <section className="story sec sec--ivory">
          <span className="kicker kicker--dark">{t('pdp.story')}</span>
          <motion.p className="story__text" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1.1, ease: EASE.out }}>
            {l(profile.story)}
          </motion.p>
          <motion.img
            src="images/magnolia-branch.webp"
            alt=""
            className="story__branch"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: EASE.out }}
          />
        </section>
      )}

      {/* 3 · The olfactory journey */}
      {desktop ? <JourneyDesktop p={p} /> : <JourneyMobile p={p} />}

      {/* 4 · Character */}
      {profile && (
        <section className="character sec sec--stone">
          <div className="character__head">
            <span className="kicker kicker--dark">{t('pdp.character')}</span>
            <RevealText tag="h2" className="h-sub">{l(profile.mood)}</RevealText>
          </div>
          <div className="character__grid">
            <Meter label={t('pdp.longevity')} value={profile.longevity} scale={scale} />
            <Meter label={t('pdp.sillage')} value={profile.sillage} scale={scale} />
            <div className="character__block">
              <span className="character__label">{t('pdp.seasons')}</span>
              <div className="pills">
                {SEASONS.map((s) => <span key={s} className={profile.seasons.includes(s) ? 'is-on' : ''}>{t(`s.${s}` as TKey)}</span>)}
              </div>
            </div>
            <div className="character__block">
              <span className="character__label">{t('pdp.time')}</span>
              <div className="pills">
                {(['day', 'night'] as const).map((d) => <span key={d} className={profile.time.includes(d) ? 'is-on' : ''}>{d === 'day' ? '☼' : '☾'} {t(`d.${d}` as TKey)}</span>)}
              </div>
            </div>
            <div className="character__block character__block--wide">
              <span className="character__label">{t('pdp.occasion')}</span>
              <p>{l(profile.occasion)}</p>
            </div>
          </div>
        </section>
      )}

      {/* 5 · Verdict */}
      {profile && (
        <section className="verdict sec sec--champagne">
          <Seal size={150} tone="amber" />
          <span className="kicker kicker--dark">{t('pdp.verdict')}</span>
          <RevealText tag="p" className="verdict__quote">{`“${l(profile.verdict)}”`}</RevealText>
        </section>
      )}

      <section className="pdp__reviews sec sec--blush">
        <h2 className="h-sub">{t('reviews.kicker')}</h2>
        <div className="pdp__reviewgrid">
          {reviews.slice(0, 3).map((r, i) => (
            <motion.figure key={i} className="review review--static" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Stars value={r.rating} small />
              <blockquote>“{l(r.text)}”</blockquote>
              <figcaption><strong>{r.name}</strong> · {r.city}</figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      <section className="sec sec--cream">
        <h2 className="h-sub">{t('related')}</h2>
        <motion.div className="grid4 hscroll-sm" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          {related.map((x) => <ProductCard key={x.id} product={x} />)}
        </motion.div>
      </section>

      {/* Mobile: purchase always within thumb reach */}
      <div className="buybar">
        <div>
          <strong>{p.name}</strong>
          <span>{l(size.label)} · {money(size.price)}</span>
        </div>
        <button className="btn btn--amber" onClick={buy}>{added ? t('added') : t('add')}</button>
      </div>
    </div>
  );
}
