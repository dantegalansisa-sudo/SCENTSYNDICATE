import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useStore } from '../context/Store';
import Seal from '../components/Seal';

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return <motion.span style={{ opacity, y }} className="manifesto__word">{word} </motion.span>;
}

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / 1800);
      setN(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n.toLocaleString('en-US')}{suffix}</span>;
}

export default function Manifesto() {
  const { t } = useStore();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
  const words = t('manifesto.text').split(' ');

  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: imgP } = useScroll({ target: imgRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(imgP, [0, 1], ['-8%', '8%']);

  return (
    <section className="manifesto sec sec--stone">
      <div className="manifesto__grid">
        <div className="manifesto__textcol">
          <span className="kicker kicker--dark">{t('manifesto.kicker')}</span>
          <div ref={ref} className="manifesto__text" aria-label={t('manifesto.text')}>
            {words.map((w, i) => (
              <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
            ))}
          </div>
          <div className="stats">
            <div><strong><Counter to={2400} suffix="+" /></strong><span>{t('stats.members')}</span></div>
            <div><strong><Counter to={180} suffix="+" /></strong><span>{t('stats.fragrances')}</span></div>
            <div><strong><Counter to={100} suffix="%" /></strong><span>{t('stats.authentic')}</span></div>
          </div>
        </div>
        <motion.div
          ref={imgRef}
          className="manifesto__img"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.img src="images/model-man-spray.webp" alt="A Syndicate member applying fragrance" style={{ y: imgY }} loading="lazy" />
          <Seal size={92} tone="cream" className="manifesto__seal" />
        </motion.div>
      </div>
    </section>
  );
}
