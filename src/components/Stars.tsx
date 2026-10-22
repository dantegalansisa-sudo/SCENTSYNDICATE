export default function Stars({ value, small }: { value: number; small?: boolean }) {
  return (
    <span className={`stars${small ? ' stars--sm' : ''}`} aria-label={`${value} / 5`}>
      <span className="stars__base">★★★★★</span>
      <span className="stars__fill" style={{ width: `${(value / 5) * 100}%` }}>★★★★★</span>
    </span>
  );
}
