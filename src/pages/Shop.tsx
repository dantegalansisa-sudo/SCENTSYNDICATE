import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useParams, useSearchParams } from 'react-router-dom';
import { useStore } from '../context/Store';
import { brands, families, getCollection, inCollection, products, sizesFor, type CollectionId, type Product } from '../data/products';
import ProductCard from '../components/ProductCard';
import RevealText from '../components/RevealText';
import { IconClose, IconFilter, IconSearch } from '../components/Icons';
import { EASE, stagger } from '../utils';
import type { TKey } from '../data/i18n';
import NotFound from './NotFound';

const PRICE_BANDS = [
  { id: 'u50', min: 0, max: 50 },
  { id: '50-150', min: 50, max: 150 },
  { id: '150-300', min: 150, max: 300 },
  { id: 'o300', min: 300, max: Infinity },
] as const;

type Sort = 'featured' | 'low' | 'high' | 'rating';

const fullPrice = (p: Product) => sizesFor(p)[0].price;

function toggle<T>(list: T[], v: T) {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="fgroup">
      <legend>{title}</legend>
      <div className="fgroup__opts">{children}</div>
    </fieldset>
  );
}

function Check({ on, label, onClick }: { on: boolean; label: string; onClick: () => void }) {
  return (
    <button type="button" className={`fchip${on ? ' is-on' : ''}`} aria-pressed={on} onClick={onClick}>
      {label}
    </button>
  );
}

export default function Shop() {
  const { id } = useParams();
  const collection = id ? getCollection(id) : undefined;
  const { t, l } = useStore();
  const [params, setParams] = useSearchParams();
  const searchRef = useRef<HTMLInputElement>(null);

  const [q, setQ] = useState(() => params.get('q') ?? '');
  const [fBrands, setBrands] = useState<string[]>([]);
  const [fFam, setFam] = useState<string[]>([]);
  const [fPrice, setPrice] = useState<string[]>([]);
  const [fType, setType] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>('featured');
  const [sheet, setSheet] = useState(false);

  useEffect(() => {
    if (params.get('focus')) {
      searchRef.current?.focus({ preventScroll: false });
      params.delete('focus');
      setParams(params, { replace: true });
    }
  }, [params, setParams]);

  useEffect(() => {
    setBrands([]); setFam([]); setPrice([]); setType([]);
    setQ(params.get('q') ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = products.filter((p) => (collection ? inCollection(p, collection.id as CollectionId) : true));
    if (needle) {
      list = list.filter((p) =>
        [p.name, p.brand, p.family, ...p.notes.top, ...p.notes.heart, ...p.notes.base].join(' ').toLowerCase().includes(needle),
      );
    }
    if (fBrands.length) list = list.filter((p) => fBrands.includes(p.brand));
    if (fFam.length) list = list.filter((p) => fFam.includes(p.family));
    if (fPrice.length) list = list.filter((p) => fPrice.some((b) => { const band = PRICE_BANDS.find((x) => x.id === b)!; const pr = fullPrice(p); return pr >= band.min && pr < band.max; }));
    if (fType.length)
      list = list.filter((p) => fType.some((ty) => (ty === 'set' ? p.kind === 'set' : p.kind === 'fragrance')));
    const sorted = [...list];
    if (sort === 'low') sorted.sort((a, b) => fullPrice(a) - fullPrice(b));
    if (sort === 'high') sorted.sort((a, b) => fullPrice(b) - fullPrice(a));
    if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating);
    if (sort === 'featured') sorted.sort((a, b) => Number(!!b.approved) + Number(!!b.bestSeller) - (Number(!!a.approved) + Number(!!a.bestSeller)));
    return sorted;
  }, [q, fBrands, fFam, fPrice, fType, sort, collection]);

  if (id && !collection) return <NotFound />;

  const active = fBrands.length + fFam.length + fPrice.length + fType.length;
  const clear = () => { setBrands([]); setFam([]); setPrice([]); setType([]); };

  const filters = (
    <>
      <Group title={t('shop.type')}>
        {(['fragrance', 'decant', 'set'] as const).map((ty) => (
          <Check key={ty} on={fType.includes(ty)} label={t(`type.${ty}` as TKey)} onClick={() => setType(toggle(fType, ty))} />
        ))}
      </Group>
      <Group title={t('shop.family')}>
        {families.map((f) => <Check key={f} on={fFam.includes(f)} label={t(`fam.${f}` as TKey)} onClick={() => setFam(toggle(fFam, f))} />)}
      </Group>
      <Group title={t('shop.price')}>
        {PRICE_BANDS.map((b) => <Check key={b.id} on={fPrice.includes(b.id)} label={t(`price.${b.id}` as TKey)} onClick={() => setPrice(toggle(fPrice, b.id))} />)}
      </Group>
      <Group title={t('shop.brand')}>
        {brands.map((b) => <Check key={b} on={fBrands.includes(b)} label={b} onClick={() => setBrands(toggle(fBrands, b))} />)}
      </Group>
      {active > 0 && <button className="fclear" onClick={clear}>{t('shop.clear')} ({active})</button>}
    </>
  );

  const tone = collection?.tone ?? 'dark';

  return (
    <div className="shop">
      <header className={`pagehead pagehead--${tone}`}>
        {collection && <motion.img className="pagehead__img" src={collection.image} alt="" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, ease: EASE.out }} />}
        <div className="pagehead__copy">
          <motion.span className="kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{collection ? l(collection.kicker) : 'Scent Syndicate'}</motion.span>
          <RevealText tag="h1" immediate className="h-display" key={collection?.id ?? 'all'}>{collection ? l(collection.title) : t('shop.title')}</RevealText>
          <motion.p className="lede" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            {collection ? l(collection.blurb) : t('shop.sub')}
          </motion.p>
        </div>
      </header>

      <div className="shop__bar">
        <label className="search">
          <IconSearch />
          <input ref={searchRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('shop.search')} aria-label={t('nav.search')} type="search" />
        </label>
        <button className="shop__filterbtn" onClick={() => setSheet(true)}>
          <IconFilter /> {t('shop.filters')} {active > 0 && <em>{active}</em>}
        </button>
        <label className="shop__sort">
          <span>{t('shop.sort')}</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            {(['featured', 'low', 'high', 'rating'] as const).map((s) => <option key={s} value={s}>{t(`shop.sort.${s}` as TKey)}</option>)}
          </select>
        </label>
      </div>

      <div className="shop__body">
        <aside className="shop__side" aria-label={t('shop.filters')}>{filters}</aside>
        <div className="shop__results">
          <p className="shop__count">{results.length} {t('shop.results')}</p>
          {results.length === 0 ? (
            <p className="shop__none">{t('shop.none')}</p>
          ) : (
            <motion.div className="pgrid" variants={stagger} initial="hidden" animate="visible" key={results.map((p) => p.id).join()}>
              {results.map((p) => <ProductCard key={p.id} product={p} />)}
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {sheet && (
          <>
            <motion.div className="scrim" onClick={() => setSheet(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div
              className="sheet"
              role="dialog"
              aria-label={t('shop.filters')}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.5, ease: EASE.premium }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_, info) => info.offset.y > 120 && setSheet(false)}
            >
              <div className="sheet__grip" />
              <div className="sheet__head">
                <h3>{t('shop.filters')}</h3>
                <button onClick={() => setSheet(false)} aria-label="Close"><IconClose /></button>
              </div>
              <div className="sheet__body">{filters}</div>
              <button className="btn btn--dark btn--block" onClick={() => setSheet(false)}>{t('shop.show')} {results.length} {t('shop.results')}</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
