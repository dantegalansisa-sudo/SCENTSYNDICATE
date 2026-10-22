import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useStore } from '../context/Store';
import { products } from '../data/products';
import { useIsDesktop } from '../hooks/useMedia';
import ProductCard from '../components/ProductCard';
import RevealText from '../components/RevealText';
import Seal from '../components/Seal';
import MagneticButton from '../components/MagneticButton';
import { IconArrow } from '../components/Icons';
import { stagger } from '../utils';

const picks = products.filter((p) => p.approved);

function Intro() {
  const { t } = useStore();
  return (
    <div className="approved__intro">
      <span className="kicker">{t('featured.kicker')}</span>
      <RevealText tag="h2" className="h-display">{t('featured.title')}</RevealText>
      <p className="lede">{t('featured.sub')}</p>
      <MagneticButton to="/shop" className="btn btn--line">{t('viewAll')} <IconArrow /></MagneticButton>
    </div>
  );
}

/** Desktop: pinned horizontal gallery driven by vertical scroll. */
function ApprovedDesktop() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);

  useLayoutEffect(() => {
    const measure = () => track.current && setDist(Math.max(0, track.current.scrollWidth - window.innerWidth + 80));
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const sp = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const x = useTransform(sp, [0, 1], [0, -dist]);
  const sealRot = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="approved approved--desk sec--blush" style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="approved__sticky">
        <motion.div className="approved__bigseal" style={{ rotate: sealRot }}>
          <Seal size={420} tone="amber" spin={false} />
        </motion.div>
        <motion.div ref={track} className="approved__track" style={{ x }}>
          <Intro />
          <motion.div className="approved__cards" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
            {picks.map((p) => <ProductCard key={p.id} product={p} tone="blush" />)}
          </motion.div>
        </motion.div>
        <div className="approved__progress"><motion.i style={{ scaleX: bar }} /></div>
      </div>
    </section>
  );
}

function ApprovedMobile() {
  return (
    <section className="approved approved--mob sec sec--blush">
      <div className="approved__mseal"><Seal size={150} tone="amber" /></div>
      <Intro />
      <motion.div className="hscroll" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
        {picks.map((p) => <ProductCard key={p.id} product={p} tone="blush" />)}
      </motion.div>
    </section>
  );
}

export default function Approved() {
  return useIsDesktop() ? <ApprovedDesktop /> : <ApprovedMobile />;
}
