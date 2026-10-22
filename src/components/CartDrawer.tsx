import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { linePrice, money, useStore } from '../context/Store';
import { FREE_SHIPPING, getProduct, sizesFor } from '../data/products';
import ProductVisual from './ProductVisual';
import { IconClose, IconMinus, IconPlus } from './Icons';
import { EASE } from '../utils';

export function CodeField() {
  const { t, applyCode, code } = useStore();
  const [val, setVal] = useState('');
  const [err, setErr] = useState(false);
  return (
    <form
      className="codefield"
      onSubmit={(e) => {
        e.preventDefault();
        setErr(!applyCode(val));
      }}
    >
      <input value={val} onChange={(e) => { setVal(e.target.value); setErr(false); }} placeholder={code ? `✓ ${code}` : t('cart.code')} aria-label={t('cart.code')} />
      <button type="submit">{t('cart.apply')}</button>
      {err ? <small className="codefield__err">{t('cart.invalid')}</small> : !code && <small>{t('cart.try')}</small>}
    </form>
  );
}

export function Totals() {
  const { t, subtotal, discount, shipping, total, code } = useStore();
  return (
    <dl className="totals">
      <div><dt>{t('cart.subtotal')}</dt><dd>{money(subtotal)}</dd></div>
      {discount > 0 && <div className="totals__disc"><dt>{t('cart.discount')} · {code}</dt><dd>−{money(discount)}</dd></div>}
      <div><dt>{t('cart.shipping')}</dt><dd>{shipping === 0 ? t('cart.free') : money(shipping)}</dd></div>
      <div className="totals__total"><dt>{t('cart.total')}</dt><dd>{money(total)}</dd></div>
    </dl>
  );
}

export default function CartDrawer() {
  const { t, l, cart, cartOpen, setCartOpen, setQty, remove, subtotal, discount } = useStore();
  const nav = useNavigate();
  const left = Math.max(0, FREE_SHIPPING - (subtotal - discount));
  const progress = Math.min(1, (subtotal - discount) / FREE_SHIPPING);

  useEffect(() => {
    if (!cartOpen) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setCartOpen(false);
    window.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', esc);
      document.body.style.overflow = '';
    };
  }, [cartOpen, setCartOpen]);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div className="scrim" onClick={() => setCartOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-label={t('cart.title')}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: EASE.premium }}
            drag={false}
          >
            <div className="drawer__head">
              <h2>{t('cart.title')}</h2>
              <button onClick={() => setCartOpen(false)} aria-label="Close"><IconClose /></button>
            </div>

            {cart.length > 0 && (
              <div className="shipbar">
                <p>{left > 0 ? <><strong>{money(left)}</strong> {t('cart.away')}</> : <>✦ {t('cart.unlocked')}</>}</p>
                <div className="shipbar__track"><motion.div className="shipbar__fill" animate={{ scaleX: progress }} transition={{ duration: 0.8, ease: EASE.out }} /></div>
              </div>
            )}

            <div className="drawer__body">
              {cart.length === 0 ? (
                <div className="drawer__empty">
                  <p>{t('cart.empty')}</p>
                  <Link to="/shop" className="btn btn--dark" onClick={() => setCartOpen(false)}>{t('cart.continue')}</Link>
                </div>
              ) : (
                <ul className="lines">
                  <AnimatePresence initial={false}>
                    {cart.map((line) => {
                      const p = getProduct(line.productId);
                      const s = p && sizesFor(p).find((x) => x.id === line.sizeId);
                      if (!p || !s) return null;
                      return (
                        <motion.li key={line.productId + line.sizeId} layout initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30, height: 0 }} className="line">
                          <Link to={`/product/${p.id}`} className="line__img" onClick={() => setCartOpen(false)}><ProductVisual product={p} /></Link>
                          <div className="line__info">
                            <span className="line__brand">{p.brand}</span>
                            <strong>{p.name}</strong>
                            <span className="line__size">{l(s.label)}</span>
                            <div className="qty qty--sm">
                              <button onClick={() => setQty(p.id, s.id, line.qty - 1)} aria-label="−"><IconMinus /></button>
                              <span>{line.qty}</span>
                              <button onClick={() => setQty(p.id, s.id, line.qty + 1)} aria-label="+"><IconPlus /></button>
                            </div>
                          </div>
                          <div className="line__end">
                            <span>{money(linePrice(line) * line.qty)}</span>
                            <button className="line__rm" onClick={() => remove(p.id, s.id)}>{t('cart.remove')}</button>
                          </div>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="drawer__foot">
                <CodeField />
                <Totals />
                <button className="btn btn--amber btn--block" onClick={() => { setCartOpen(false); nav('/checkout'); }}>
                  {t('cart.checkout')}
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
