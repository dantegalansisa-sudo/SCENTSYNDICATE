import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { money, useStore } from '../context/Store';
import { getProduct, products, sizesFor, type Product as P } from '../data/products';
import { profiles, type Season } from '../data/profiles';
import ProductVisual from '../components/ProductVisual';
import ProductCard from '../components/ProductCard';
import Seal from '../components/Seal';
import Stars from '../components/Stars';
import { IconBag, IconCheck, IconMinus, IconPlus } from '../components/Icons';
import { EASE, stagger } from '../utils';
import type { TKey } from '../data/i18n';
import NotFound from './NotFound';

const TIERS = ['top', 'heart', 'base'] as const;
const SEASONS: Season[] = ['spring', 'summer', 'fall', 'winter'];
type Tab = 'notes' | 'character' | 'story';

function Meter({ label, value, scale }: { label: string; value: number; scale: string[] }) {
  return (
    <div className="meter">
      <div className="meter__top"><span>{label}</span><strong>{scale[value - 1]}</strong></div>
      <div className="meter__track">
        {Array.from({ length: 5 }, (_, i) => (
          <motion.i key={i} className={i < value ? 'is-on' : ''} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: EASE.out }} />
        ))}
      </div>
    </div>
  );
}

function Details({ p }: { p: P }) {
  const { t, l } = useStore();
  const profile = profiles[p.id];
  const [tab, setTab] = useState<Tab>('notes');
  const tabs: { id: Tab; label: string }[] = [
    { id: 'notes', label: t('pyramid') },
    ...(profile ? [{ id: 'character' as Tab, label: t('pdp.character') }, { id: 'story' as Tab, label: t('pdp.story') }] : []),
  ];
  const scale = t('pdp.lv').split(' · ');

  return (
    <div className="details">
      <div className="tabs tabs--sm" role="tablist">
        {tabs.map((x) => (
          <button key={x.id} role="tab" aria-selected={tab === x.id} className={tab === x.id ? 'is-on' : ''} onClick={() => setTab(x.id)}>
            {tab === x.id && <motion.span layoutId="pdptab" className="tabs__pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            <span>{x.label}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }} className="details__panel">
          {tab === 'notes' && (
            <ol className="notelist">
              {TIERS.map((k, i) => (
                <motion.li key={k} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                  <span className={`notelist__dot notelist__dot--${i}`} />
                  <div>
                    <strong>{t(`notes.${k}` as TKey)} <em>{t(`pdp.t${i}` as TKey)}</em></strong>
                    <span>{p.notes[k].join(' · ')}</span>
                  </div>
                </motion.li>
              ))}
            </ol>
          )}
          {tab === 'character' && profile && (
            <div className="charpanel">
              <Meter label={t('pdp.longevity')} value={profile.longevity} scale={scale} />
              <Meter label={t('pdp.sillage')} value={profile.sillage} scale={scale} />
              <div className="pills">
                {SEASONS.map((s) => <span key={s} className={profile.seasons.includes(s) ? 'is-on' : ''}>{t(`s.${s}` as TKey)}</span>)}
                {(['day', 'night'] as const).map((d) => <span key={d} className={profile.time.includes(d) ? 'is-on' : ''}>{d === 'day' ? '☼' : '☾'} {t(`d.${d}` as TKey)}</span>)}
              </div>
              <p className="charpanel__occ"><span>{t('pdp.occasion')}</span> {l(profile.occasion)}</p>
            </div>
          )}
          {tab === 'story' && profile && (
            <div className="storypanel">
              <p>{l(profile.story)}</p>
              <blockquote><Seal size={54} tone="amber" spin={false} /> “{l(profile.verdict)}”</blockquote>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Product() {
  const { id } = useParams();
  const nav = useNavigate();
  const p = id ? getProduct(id) : undefined;
  const { t, l, add, setCartOpen } = useStore();
  const [sizeId, setSizeId] = useState('');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

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
  const total = size.price * qty;

  const buy = () => {
    add(p.id, size.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
    setTimeout(() => setCartOpen(true), 350);
  };

  return (
    <div className="pdp" style={{ ['--accent' as string]: p.accent }}>
      <div className="pdp__wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <button onClick={() => nav(-1)} className="crumbs__back" aria-label="Back">←</button>
          <Link to="/shop">{t('nav.shop')}</Link> / <span>{p.brand}</span>
        </nav>

        <div className="pdp__grid">
          {/* Gallery card */}
          <motion.div className="pdp__gallery" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE.out }}>
            <div className="pdp__halo" />
            <div className="pdp__lane">
              <motion.div className="pdp__bottle" initial={{ y: -120, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 160, damping: 15, delay: 0.15 }}>
                <ProductVisual product={p} eager />
              </motion.div>
            </div>
            <div className="podium podium--pdp" aria-hidden>
              <div className="podium__shadow" />
              <div className="podium__top" />
              <div className="podium__side" />
            </div>
            {p.approved && <Seal size={84} tone="amber" className="pdp__seal" />}
            {profile && <span className="pdp__moodtag">{l(profile.mood)}</span>}
          </motion.div>

          {/* Info */}
          <div className="pdp__info">
            <span className="pdp__brand">{p.brand}</span>
            <h1 className="pdp__name">{p.name}</h1>
            <div className="pdp__rating"><Stars value={p.rating} /> <span>{p.rating} · {p.reviews} {t('reviewsWord')}</span></div>
            <p className="pdp__desc"><em>{l(p.tagline)}</em> {l(p.description)}</p>

            {setItems && (
              <div className="pdp__set">
                {setItems.map((s) => (
                  <Link key={s.id} to={`/product/${s.id}`}><span className="pdp__setimg"><ProductVisual product={s} /></span>{s.name}</Link>
                ))}
              </div>
            )}

            <div className="sizes" role="radiogroup" aria-label={t('size')}>
              <span className="pdp__h">{t('size')}</span>
              <div className="sizes__row">
                {sizes.map((s) => (
                  <button key={s.id} role="radio" aria-checked={s.id === size.id} className={`size${s.id === size.id ? ' is-on' : ''}`} onClick={() => setSizeId(s.id)}>
                    <span className="size__label">{s.id === 'full' ? `${s.ml} ml` : s.id === 'set' ? 'Set' : `${s.ml} ml`}</span>
                    <span className="size__price">{money(s.price)}</span>
                  </button>
                ))}
              </div>
              <span className="sizes__hint">{l(size.label)}{size.compareAt ? ` · ${l({ en: 'was', es: 'antes' })} ${money(size.compareAt)}` : ''}</span>
            </div>

            <div className="buyrow">
              <div className="qty" aria-label={t('qty')}>
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="−"><IconMinus /></button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="+"><IconPlus /></button>
              </div>
              <div className="buyrow__total"><small>{l({ en: 'Total price', es: 'Precio total' })}</small><strong>{money(total)}</strong></div>
              <button className="btn btn--amber btn--grow" onClick={buy}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={String(added)} initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} transition={{ duration: 0.25 }} className="btn__swap">
                    {added ? <><IconCheck /> {t('added')}</> : <><IconBag /> {t('add')}</>}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
            <p className={`stock stock--${p.stock}`}><i />{p.stock === 'low' ? t('lowStock') : t('inStock')}</p>

            <Details p={p} />

            <ul className="assure">
              <li><IconCheck /> {t('authentic.1')}</li>
              <li><IconCheck /> {t('authentic.2')}</li>
              <li><IconCheck /> {t('authentic.3')}</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="block block--white">
        <div className="block__head">
          <h2 className="h-block">{t('related')}</h2>
          <Link to="/shop" className="link-more">{t('viewAll')}</Link>
        </div>
        <motion.div className="pgrid pgrid--4 hscroll-sm" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          {related.map((x) => <ProductCard key={x.id} product={x} />)}
        </motion.div>
      </section>

      {/* Mobile: purchase always within thumb reach */}
      <div className="buybar">
        <div>
          <span>{l({ en: 'Total price', es: 'Precio total' })}</span>
          <strong>{money(total)}</strong>
        </div>
        <button className="btn btn--amber" onClick={buy}><IconBag /> {added ? t('added') : t('add')}</button>
      </div>
    </div>
  );
}
