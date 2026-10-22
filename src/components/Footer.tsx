import { Link } from 'react-router-dom';
import { useStore } from '../context/Store';
import { collections } from '../data/products';
import { IconInstagram, IconTiktok, IconWhatsapp } from './Icons';
import Seal from './Seal';

export default function Footer() {
  const { t, l } = useStore();
  return (
    <footer className="footer">
      <div className="footer__giant" aria-hidden>Syndicate</div>
      <div className="footer__grid">
        <div className="footer__brand">
          <div className="footer__mark"><span>Scent</span> Syndicate</div>
          <p>{t('footer.tag')}</p>
          <div className="footer__social">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><IconInstagram /></a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok"><IconTiktok /></a>
            <a href="https://wa.me/17870000000" target="_blank" rel="noreferrer" aria-label="WhatsApp"><IconWhatsapp /></a>
          </div>
        </div>
        <div>
          <h4>{t('footer.shop')}</h4>
          <Link to="/shop">{t('nav.shop')}</Link>
          {collections.slice(0, 4).map((c) => <Link key={c.id} to={`/collections/${c.id}`}>{l(c.title)}</Link>)}
        </div>
        <div>
          <h4>{t('footer.circle')}</h4>
          <Link to="/sets">{t('nav.sets')}</Link>
          <Link to="/collections/new-arrivals">{l(collections[5].title)}</Link>
          <Link to="/about">{t('nav.about')}</Link>
        </div>
        <div>
          <h4>{t('footer.help')}</h4>
          <Link to="/faq">{t('nav.faq')}</Link>
          <Link to="/contact">{t('nav.contact')}</Link>
          <Link to="/faq">{l({ en: 'Shipping & Returns', es: 'Envíos y Devoluciones' })}</Link>
          <Link to="/faq">{l({ en: 'Authenticity', es: 'Autenticidad' })}</Link>
        </div>
        <Seal size={110} tone="amber" className="footer__seal" />
      </div>
      <div className="footer__base">
        <span>© {new Date().getFullYear()} Scent Syndicate · San Juan, Puerto Rico</span>
        <span>{t('footer.rights')}</span>
      </div>
    </footer>
  );
}
