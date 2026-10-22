import { useStore } from '../context/Store';
import MagneticButton from '../components/MagneticButton';
import Mist from '../components/Mist';

export default function NotFound() {
  const { t } = useStore();
  return (
    <section className="done">
      <Mist count={12} />
      <span className="kicker">404</span>
      <h1 className="h-display">{t('notFound')}</h1>
      <MagneticButton to="/" className="btn btn--amber">{t('back')}</MagneticButton>
    </section>
  );
}
