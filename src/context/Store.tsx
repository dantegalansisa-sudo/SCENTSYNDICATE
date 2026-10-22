import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import dict, { type TKey } from '../data/i18n';
import { DISCOUNTS, FREE_SHIPPING, SHIPPING_FEE, getProduct, sizesFor, type Lang, type Localized } from '../data/products';

export interface CartLine {
  productId: string;
  sizeId: string;
  qty: number;
}

interface StoreValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: TKey) => string;
  l: (v: Localized) => string;
  cart: CartLine[];
  add: (productId: string, sizeId: string, qty?: number) => void;
  setQty: (productId: string, sizeId: string, qty: number) => void;
  remove: (productId: string, sizeId: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  code: string | null;
  applyCode: (c: string) => boolean;
  discount: number;
  shipping: number;
  total: number;
  cartOpen: boolean;
  setCartOpen: (o: boolean) => void;
  lastAdded: number;
}

const StoreCtx = createContext<StoreValue | null>(null);

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — cart lives in memory only */
  }
}

export function linePrice(line: CartLine) {
  const p = getProduct(line.productId);
  const s = p && sizesFor(p).find((x) => x.id === line.sizeId);
  return s ? s.price : 0;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => load<Lang>('ss-lang', 'en'));
  const [cart, setCart] = useState<CartLine[]>(() => load<CartLine[]>('ss-cart', []));
  const [code, setCode] = useState<string | null>(() => load<string | null>('ss-code', null));
  const [cartOpen, setCartOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState(0);

  useEffect(() => save('ss-cart', cart), [cart]);
  useEffect(() => save('ss-code', code), [code]);
  useEffect(() => {
    save('ss-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback((k: TKey) => dict[k][lang], [lang]);
  const l = useCallback((v: Localized) => v[lang], [lang]);

  const add = useCallback((productId: string, sizeId: string, qty = 1) => {
    setCart((c) => {
      const i = c.findIndex((x) => x.productId === productId && x.sizeId === sizeId);
      if (i === -1) return [...c, { productId, sizeId, qty }];
      const next = [...c];
      next[i] = { ...next[i], qty: Math.min(10, next[i].qty + qty) };
      return next;
    });
    setLastAdded(Date.now());
  }, []);

  const setQty = useCallback((productId: string, sizeId: string, qty: number) => {
    setCart((c) =>
      qty <= 0
        ? c.filter((x) => !(x.productId === productId && x.sizeId === sizeId))
        : c.map((x) => (x.productId === productId && x.sizeId === sizeId ? { ...x, qty: Math.min(10, qty) } : x)),
    );
  }, []);

  const remove = useCallback((productId: string, sizeId: string) => setQty(productId, sizeId, 0), [setQty]);
  const clear = useCallback(() => {
    setCart([]);
    setCode(null);
  }, []);

  const applyCode = useCallback((c: string) => {
    const key = c.trim().toUpperCase();
    if (DISCOUNTS[key] !== undefined) {
      setCode(key);
      return true;
    }
    return false;
  }, []);

  const value = useMemo<StoreValue>(() => {
    const count = cart.reduce((n, x) => n + x.qty, 0);
    const subtotal = cart.reduce((n, x) => n + linePrice(x) * x.qty, 0);
    const discount = code ? Math.round(subtotal * DISCOUNTS[code] * 100) / 100 : 0;
    const after = subtotal - discount;
    const shipping = count === 0 || after >= FREE_SHIPPING ? 0 : SHIPPING_FEE;
    return {
      lang,
      setLang: setLangState,
      t,
      l,
      cart,
      add,
      setQty,
      remove,
      clear,
      count,
      subtotal,
      code,
      applyCode,
      discount,
      shipping,
      total: after + shipping,
      cartOpen,
      setCartOpen,
      lastAdded,
    };
  }, [lang, t, l, cart, add, setQty, remove, clear, code, applyCode, cartOpen, lastAdded]);

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const v = useContext(StoreCtx);
  if (!v) throw new Error('useStore must be used inside StoreProvider');
  return v;
}

export const money = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: n % 1 === 0 ? 0 : 2 });
