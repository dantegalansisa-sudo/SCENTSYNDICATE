import { getProduct, type Product } from '../data/products';
import GlassBottle from './GlassBottle';

/** Product photo, illustrated bottle, or a fanned trio for sets. */
export default function ProductVisual({ product, eager }: { product: Product; eager?: boolean }) {
  if (product.kind === 'set' && product.setItems) {
    const items = product.setItems.slice(0, 3).map(getProduct).filter(Boolean) as Product[];
    return (
      <div className="set-fan">
        {items.map((p, i) => (
          <div className="set-fan__item" key={p.id} style={{ ['--i' as string]: i - (items.length - 1) / 2 }}>
            <ProductVisual product={p} eager={eager} />
          </div>
        ))}
      </div>
    );
  }
  if (product.image) {
    return <img src={product.image} alt={`${product.brand} ${product.name}`} loading={eager ? 'eager' : 'lazy'} decoding="async" draggable={false} />;
  }
  return product.art ? <GlassBottle art={product.art} /> : null;
}
