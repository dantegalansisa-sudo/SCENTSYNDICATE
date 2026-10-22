import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../context/Store';
import { collections } from '../data/products';
import { IconBag, IconClose, IconGift, IconGrid, IconHome, IconInstagram, IconMenu, IconSearch } from './Icons';
import { EASE } from '../utils';

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`wordmark ${className}`} aria-label="Scent Syndicate — home">
      <span className="wordmark__a">Scent</span>
      <span className="wordmark__b">Syndicate</span>
    </Link>
  );
}

function LangToggle() {
  const { lang, setLang } = useStore();
  return (
    <div className="lang" role="group" aria-label="Language">
      {(['en', 'es'] as const).map((x) => (
        <button key={x} className={lang === x ? 'is-on' : ''} onClick={() => setLang(x)} aria-pressed={lang === x}>
          {x.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function BagButton({ className = '' }: { className?: string }) {
  const { count, setCartOpen, lastAdded, t } = useStore();
  return (
    <button className={`bagbtn ${className}`} onClick={() => setCartOpen(true)} aria-label={`${t('nav.bag')} (${count})`}>
      <IconBag />
      <AnimatePresence>
        {count > 0 && (
          <motion.span key={lastAdded} className="bagbtn__count" initial={{ scale: 0.3 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 15 }}>
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export default function Header() {
  const { t, l } = useStore();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [menu, setMenu] = useState(false);
  const overHero = pathname === '/' && !scrolled;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    setMenu(false);
    setMega(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
  }, [menu]);

  return (
    <>
      <div className="announce" role="note">
        <div className="announce__track">
          <span>{t('announce')}</span>
          <span aria-hidden>{t('announce')}</span>
        </div>
      </div>
      <header className={`header ${overHero ? 'header--clear' : 'header--solid'}`} onMouseLeave={() => setMega(false)}>
        <div className="header__inner">
          {/* desktop nav */}
          <nav className="header__nav header__nav--left" aria-label="Primary">
            <NavLink to="/shop">{t('nav.shop')}</NavLink>
            <button className="header__mega-trigger" onMouseEnter={() => setMega(true)} onFocus={() => setMega(true)} aria-expanded={mega}>
              {t('nav.collections')}
            </button>
            <NavLink to="/sets">{t('nav.sets')}</NavLink>
          </nav>

          <button className="header__icon header__menu-btn" onClick={() => setMenu(true)} aria-label={t('nav.menu')}>
            <IconMenu />
          </button>

          <Wordmark />

          <div className="header__nav header__nav--right">
            <NavLink to="/about" className="hide-sm">{t('nav.about')}</NavLink>
            <NavLink to="/faq" className="hide-sm">{t('nav.faq')}</NavLink>
            <LangToggle />
            <Link to="/shop?focus=1" className="header__icon hide-sm" aria-label={t('nav.search')}><IconSearch /></Link>
            <BagButton className="header__icon" />
          </div>
        </div>

        <AnimatePresence>
          {mega && (
            <motion.div
              className="mega"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: EASE.out }}
              onMouseEnter={() => setMega(true)}
            >
              <div className="mega__inner">
                {collections.map((c, i) => (
                  <motion.div key={c.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i, duration: 0.4 }}>
                    <Link to={`/collections/${c.id}`} className="mega__item">
                      <span className="mega__kicker">{l(c.kicker)}</span>
                      <span className="mega__title">{l(c.title)}</span>
                    </Link>
                  </motion.div>
                ))}
                <div className="mega__img" style={{ backgroundImage: 'url(images/model-woman-noir.webp)' }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* mobile full-screen menu */}
      <AnimatePresence>
        {menu && (
          <motion.div
            className="mmenu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: EASE.premium }}
          >
            <div className="mmenu__top">
              <LangToggle />
              <button className="header__icon" onClick={() => setMenu(false)} aria-label="Close"><IconClose /></button>
            </div>
            <nav className="mmenu__nav">
              {[
                ['/shop', t('nav.shop')],
                ...collections.map((c) => [`/collections/${c.id}`, l(c.title)]),
                ['/about', t('nav.about')],
                ['/faq', t('nav.faq')],
                ['/contact', t('nav.contact')],
              ].map(([to, label], i) => (
                <motion.div key={to} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.045, ease: EASE.out, duration: 0.6 }}>
                  <Link to={to}>{label}</Link>
                </motion.div>
              ))}
            </nav>
            <a className="mmenu__ig" href="https://instagram.com" target="_blank" rel="noreferrer"><IconInstagram /> @scentsyndicate</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Thumb-reach bottom bar for phones. */
export function TabBar() {
  const { t, count, setCartOpen } = useStore();
  const nav = useNavigate();
  return (
    <nav className="tabbar" aria-label="Quick">
      <NavLink to="/" end><IconHome /><span>{t('nav.home')}</span></NavLink>
      <NavLink to="/shop"><IconGrid /><span>{t('nav.shop').split(' ')[0]}</span></NavLink>
      <button onClick={() => nav('/shop?focus=1')}><IconSearch /><span>{t('nav.search')}</span></button>
      <NavLink to="/sets"><IconGift /><span>Sets</span></NavLink>
      <button onClick={() => setCartOpen(true)} className="tabbar__bag">
        <IconBag />
        {count > 0 && <em>{count}</em>}
        <span>{t('nav.bag')}</span>
      </button>
    </nav>
  );
}
