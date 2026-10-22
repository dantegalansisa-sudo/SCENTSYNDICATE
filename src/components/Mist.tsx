import { useMemo } from 'react';

/** Soft drifting vapor + rising droplets. Pure CSS; frozen under reduced motion. */
export default function Mist({ count = 14, className = '' }: { count?: number; className?: string }) {
  const motes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i * 37 + 11) % 100,
        size: 2 + ((i * 7) % 5),
        delay: -((i * 1.7) % 12),
        dur: 10 + ((i * 3) % 9),
      })),
    [count],
  );
  return (
    <div className={`mist ${className}`} aria-hidden>
      <div className="mist__cloud mist__cloud--a" />
      <div className="mist__cloud mist__cloud--b" />
      {motes.map((m, i) => (
        <span
          key={i}
          className="mist__mote"
          style={{ left: `${m.left}%`, width: m.size, height: m.size, animationDelay: `${m.delay}s`, animationDuration: `${m.dur}s` }}
        />
      ))}
    </div>
  );
}
