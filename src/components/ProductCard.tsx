import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { sizesFor, type Product } from '../data/products';
import { money, useStore } from '../context/Store';
import ProductVisual from './ProductVisual';
import Seal from './Seal';
import Stars from './Stars';
import { IconPlus } from './Icons';
import { rise } from '../utils';

interface Props {
  product: Product;
  tone?: 'light' | 'blush';
  showSeal?: boolean;
}

export default function ProductCard({ product, tone = 'light', showSeal = true }: Props) {
  const { t, l, add, setCartOpen } = useStore();
  const sizes = sizesFor(product);
  const from = Math.min(...sizes.map((s) => s.price));
  const primary = sizes[0];

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    add(product.id, primary.id);
    setCartOpen(true);
  };

  return (
    <motion.article className={`pcard pcard--${tone}`} variants={rise}>
      <Link to={`/product/${product.id}`} className="pcard__link">
        <div className="pcard__stage">
          <div className="pcard__plinth" aria-hidden />
          <div className="pcard__visual">
            <ProductVisual product={product} />
          </div>
          <div className="pcard__badges">
            {product.isNew && <span className="badge">{t('new')}</span>}
            {product.bestSeller && <span className="badge badge--ghost">{t('bestseller')}</span>}
          </div>
          {showSeal && product.approved && <Seal size={64} className="pcard__seal" tone="amber" />}
          <button className="pcard__quick" onClick={quickAdd} aria-label={`${t('quickAdd')} ${product.name}`}>
            <IconPlus />
            <span>{t('quickAdd')} · {money(primary.price)}</span>
          </button>
        </div>
        <div className="pcard__meta">
          <span className="pcard__brand">{product.brand}</span>
          <h3 className="pcard__name">{product.name}</h3>
          <p className="pcard__tag">{l(product.tagline)}</p>
          <div className="pcard__row">
            <span className="pcard__price">
              {product.kind === 'fragrance' ? `${t('from')} ${money(from)}` : money(from)}
              {product.compareAt && <s>{money(product.compareAt)}</s>}
            </span>
            <span className="pcard__rating"><Stars value={product.rating} small /> {product.reviews}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
