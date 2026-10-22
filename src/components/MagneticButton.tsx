import { useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  strength?: number;
}

/** CTA that leans toward the pointer. The native cursor is kept as-is. */
export default function MagneticButton({ children, to, href, onClick, className = 'btn', type = 'button', disabled, strength = 0.3 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const move = (e: React.PointerEvent) => {
    if (!ref.current || e.pointerType !== 'mouse') return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: (e.clientX - (r.left + r.width / 2)) * strength, y: (e.clientY - (r.top + r.height / 2)) * strength });
  };

  const inner = to ? (
    <Link to={to} className={className} onClick={onClick}>{children}</Link>
  ) : href ? (
    <a href={href} className={className} target="_blank" rel="noreferrer">{children}</a>
  ) : (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>{children}</button>
  );

  return (
    <motion.span
      ref={ref}
      className="magnetic"
      onPointerMove={move}
      onPointerLeave={() => setPos({ x: 0, y: 0 })}
      animate={pos}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.6 }}
    >
      {inner}
    </motion.span>
  );
}
