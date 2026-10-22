import type { BottleArt } from '../data/products';

/** Stylized glass bottle for products without photography. */
export default function GlassBottle({ art }: { art: BottleArt }) {
  const uid = art.label.replace(/\W/g, '');
  const body =
    art.shape === 'round' ? (
      <ellipse cx="100" cy="196" rx="80" ry="84" />
    ) : art.shape === 'tall' ? (
      <rect x="46" y="100" width="108" height="180" rx="10" />
    ) : (
      <rect x="24" y="116" width="152" height="164" rx="20" />
    );
  const capY = art.shape === 'tall' ? 26 : 40;
  return (
    <svg viewBox="0 0 200 290" className="glass-bottle" role="img" aria-label={art.label}>
      <defs>
        <linearGradient id={`g-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor={art.glass} />
          <stop offset="0.42" stopColor={art.liquid} />
          <stop offset="0.6" stopColor={art.liquid} stopOpacity="0.88" />
          <stop offset="1" stopColor={art.glass} />
        </linearGradient>
        <linearGradient id={`c-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor={art.cap} stopOpacity="0.75" />
          <stop offset="0.45" stopColor="#fff6dd" />
          <stop offset="1" stopColor={art.cap} />
        </linearGradient>
        <linearGradient id={`s-${uid}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.6" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="84" y={capY + 48} width="32" height="32" fill={art.cap} opacity="0.85" />
      <rect x="66" y={capY} width="68" height="54" rx="6" fill={`url(#c-${uid})`} />
      <g fill={`url(#g-${uid})`} stroke="rgba(255,255,255,.28)" strokeWidth="1.5">{body}</g>
      <rect x="50" y="146" width="9" height="110" rx="4.5" fill={`url(#s-${uid})`} />
      <rect x="60" y="190" width="80" height="36" rx="2" fill="rgba(255,248,230,.93)" />
      <text x="100" y="213" textAnchor="middle" fontFamily="Cormorant, Georgia, serif" fontSize={art.label.length > 9 ? 10 : 13} letterSpacing="2" fill="#1a1410">
        {art.label}
      </text>
    </svg>
  );
}
