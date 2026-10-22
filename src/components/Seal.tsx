import { motion } from 'framer-motion';
import { useId } from 'react';

interface Props {
  size?: number;
  className?: string;
  tone?: 'amber' | 'dark' | 'cream';
  spin?: boolean;
}

/** "Approved by the Syndicate" seal — the recurring brand stamp. */
export default function Seal({ size = 120, className = '', tone = 'amber', spin = true }: Props) {
  const id = `seal${useId().replace(/:/g, '')}`;
  return (
    <motion.div
      className={`seal seal--${tone} ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.22 }}
      initial={{ scale: 0.4, opacity: 0, rotate: -40 }}
      whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.2 }}
      aria-label="Approved by the Syndicate"
      role="img"
    >
      <svg viewBox="0 0 200 200" className={spin ? 'seal__ring seal__ring--spin' : 'seal__ring'}>
        <defs>
          <path id={id} d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
        </defs>
        <circle cx="100" cy="100" r="97" className="seal__edge" />
        <circle cx="100" cy="100" r="58" className="seal__inner" />
        <text className="seal__text">
          <textPath href={`#${id}`} startOffset="0" textLength="470">
            APPROVED BY THE SYNDICATE ✦ APPROVED BY THE SYNDICATE ✦
          </textPath>
        </text>
      </svg>
      <div className="seal__center">
        <span className="seal__ss">SS</span>
      </div>
    </motion.div>
  );
}
