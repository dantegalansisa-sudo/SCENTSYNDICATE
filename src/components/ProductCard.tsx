import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { sizesFor, type Product } from '../data/products';
import { money, useStore } from '../context/Store';
import ProductVisual from './ProductVisual';
import Stars from './Stars';
import { IconBag, IconCheck } from './Icons';
import { rise } from '../utils';

interface Props {
  product: Product;
  tone?: 'light' | 'blush';
}

export default function ProductCard({ product, tone = 'light' }: Props) {
  const { t, add, setCartOpen } = useStore();
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const sizes = sizesFor(product);
  const from = Math.min(...sizes.map((s) => s.price));
  const primary = sizes[0];

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    add(product.id, primary.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
    setTimeout(() => setCartOpen(true), 300);
  };

  return (
    <motion.article className={`pcard pcard--${tone}`} variants={rise} style={{ ['--accent' as string]: product.accent }}>
      <Link to={`/product/${product.id}`} className="pcard__link">
        <div className="pcard__stage">
          <div className="pcard__halo" aria-hidden />
          <div className="pcard__visual">
            <ProductVisual product={product} />
          </div>
          <div className="pcard__badges">
            {product.isNew && <span className="badge">{t('new')}</span>}
            {!product.isNew && product.bestSeller && <span className="badge badge--ghost">{t('bestseller')}</span>}
            {product.approved && <span className="badge badge--seal">✦ Approved</span>}
          </div>
          <button
            className={`pcard__heart${liked ? ' is-on' : ''}`}
            onClick={(e) => { e.preventDefault(); setLiked((v) => !v); }}
            aria-label="Wishlist"
            aria-pressed={liked}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" /></svg>
          </button>
        </div>
        <div className="pcard__meta">
          <span className="pcard__brand">{product.brand}</span>
          <h3 className="pcard__name">{product.name}</h3>
          <span className="pcard__rating"><Stars value={product.rating} small /> {product.reviews}</span>
          <div className="pcard__row">
            <span className="pcard__price">
              {product.kind === 'fragrance' && <small>{t('from')}</small>}
              {money(from)}
              {product.compareAt && <s>{money(product.compareAt)}</s>}
            </span>
            <motion.button
              className={`pcard__add${added ? ' is-done' : ''}`}
              onClick={quickAdd}
              whileTap={{ scale: 0.9 }}
              aria-label={`${t('quickAdd')} ${product.name} · ${money(primary.price)}`}
            >
              {added ? <IconCheck /> : <IconBag />}
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
