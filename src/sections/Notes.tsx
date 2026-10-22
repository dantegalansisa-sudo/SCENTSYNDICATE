import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useStore } from '../context/Store';
import { getProduct } from '../data/products';
import { useIsDesktop } from '../hooks/useMedia';
import RevealText from '../components/RevealText';
import Mist from '../components/Mist';
import type { TKey } from '../data/i18n';

const LAYERS: { key: 'top' | 'heart' | 'base'; notes: string[]; glyph: string }[] = [
  { key: 'top', notes: ['Bergamot', 'Saffron', 'Pink Pepper'], glyph: '◐' },
  { key: 'heart', notes: ['Jasmine', 'Black Orchid', 'Rose'], glyph: '✿' },
  { key: 'base', notes: ['Amberwood', 'Vanilla', 'Oud'], glyph: '▲' },
];

const product = getProduct('black-orchid')!;

/** Note illustrations: citrus slice, petals, wood rings. */
function NoteArt({ kind }: { kind: 'top' | 'heart' | 'base' }) {
  if (kind === 'top')
    return (
      <svg viewBox="0 0 100 100" className="noteart">
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="50" r="33" fill="currentColor" opacity=".12" />
        {Array.from({ length: 8 }, (_, i) => (
          <line key={i} x1="50" y1="50" x2={50 + 33 * Math.cos((i * Math.PI) / 4)} y2={50 + 33 * Math.sin((i * Math.PI) / 4)} stroke="currentColor" strokeWidth="1.2" />
        ))}
      </svg>
    );
  if (kind === 'heart')
    return (
      <svg viewBox="0 0 100 100" className="noteart">
        {Array.from({ length: 6 }, (_, i) => (
          <ellipse key={i} cx="50" cy="28" rx="11" ry="22" fill="currentColor" opacity=".16" stroke="currentColor" strokeWidth="1.2" transform={`rotate(${i * 60} 50 50)`} />
        ))}
        <circle cx="50" cy="50" r="6" fill="currentColor" />
      </svg>
    );
  return (
    <svg viewBox="0 0 100 100" className="noteart">
      {[40, 31, 23, 15, 8].map((r, i) => (
        <ellipse key={r} cx={50 + i} cy="50" rx={r} ry={r * 0.92} fill="none" stroke="currentColor" strokeWidth="1.3" opacity={0.4 + i * 0.12} />
      ))}
    </svg>
  );
}

function LayerBody({ i }: { i: number }) {
  const { t } = useStore();
  const layer = LAYERS[i];
  return (
    <>
      <div className="layer__art"><NoteArt kind={layer.key} /></div>
      <div>
        <span className="layer__num">0{i + 1}</span>
        <h3>{t(`notes.${layer.key}` as TKey)}</h3>
        <p>{t(`notes.${layer.key}.d` as TKey)}</p>
        <ul className="chips">
          {layer.notes.map((n) => <li key={n}>{n}</li>)}
        </ul>
      </div>
    </>
  );
}

/** Desktop: each layer surfaces in sequence as the pinned section scrolls. */
function ScrollLayer({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const seg = [i / 3, (i + 0.55) / 3];
  const opacity = useTransform(progress, seg, [0.12, 1]);
  const x = useTransform(progress, seg, [60, 0]);
  return (
    <motion.div className={`layer layer--${LAYERS[i].key}`} style={{ opacity, x }}>
      <LayerBody i={i} />
    </motion.div>
  );
}

function InViewLayer({ i }: { i: number }) {
  return (
    <motion.div
      className={`layer layer--${LAYERS[i].key}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, delay: 0.05 }}
    >
      <LayerBody i={i} />
    </motion.div>
  );
}

function NotesMobile() {
  const { t } = useStore();
  return (
    <section className="notes notes--mob sec">
      <span className="kicker">{t('notes.kicker')}</span>
      <RevealText tag="h2" className="h-display">{t('notes.title')}</RevealText>
      <motion.div className="notes__mbottle" initial={{ opacity: 0, y: 60, rotate: -6 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1.1 }}>
        <Mist count={8} />
        <img src={product.image} alt={product.name} loading="lazy" className="float" />
      </motion.div>
      {LAYERS.map((_, i) => <InViewLayer key={i} i={i} />)}
    </section>
  );
}

function NotesDesktop() {
  const { t } = useStore();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  // Section warms from amber light to deep amber to near-black as the scent "dries down".
  const bg = useTransform(scrollYProgress, [0, 0.45, 1], ['#f4e6cc', '#efd9b8', '#e9dcd0']);
  const rot = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  const lift = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const vapor = useTransform(scrollYProgress, [0, 1], [0.3, 0.9]);

  return (
    <motion.section ref={ref} className="notes notes--desk" style={{ backgroundColor: bg }}>
      <div className="notes__sticky">
        <div className="notes__left">
          <span className="kicker">{t('notes.kicker')}</span>
          <RevealText tag="h2" className="h-display">{t('notes.title')}</RevealText>
          <motion.div className="notes__bottle" style={{ rotate: rot, y: lift }}>
            <motion.div className="notes__vapor" style={{ opacity: vapor }}><Mist count={12} /></motion.div>
            <img src={product.image} alt={`${product.brand} ${product.name}`} loading="lazy" />
          </motion.div>
        </div>
        <div className="notes__layers">
          {LAYERS.map((_, i) => <ScrollLayer key={i} i={i} progress={scrollYProgress} />)}
        </div>
      </div>
    </motion.section>
  );
}

export default function Notes() {
  return useIsDesktop() ? <NotesDesktop /> : <NotesMobile />;
}
