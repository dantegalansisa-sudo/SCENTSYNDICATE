import { motion } from 'framer-motion';
import { EASE } from '../utils';

interface Props {
  children: string;
  className?: string;
  delay?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
}

const word = {
  hidden: { y: '110%', rotate: 3 },
  visible: { y: '0%', rotate: 0, transition: { duration: 0.95, ease: EASE.premium } },
};

/**
 * Word-by-word mask reveal for editorial headlines.
 * The heading itself is observed: the words start clipped by their masks,
 * so observing them directly would never report an intersection.
 */
export default function RevealText({ children, className = '', delay = 0, tag = 'h2', immediate }: Props) {
  const Tag = motion[tag];
  const trigger = immediate ? { animate: 'visible' } : { whileInView: 'visible', viewport: { once: true, amount: 0.4 } };
  return (
    <Tag
      className={`reveal ${className}`}
      aria-label={children}
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
    >
      {children.split(' ').map((w, i) => (
        <span className="reveal__mask" key={`${w}-${i}`} aria-hidden>
          <motion.span className="reveal__word" variants={word}>
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
