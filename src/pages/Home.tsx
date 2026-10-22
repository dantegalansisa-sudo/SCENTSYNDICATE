import Hero from '../sections/Hero';
import { BestSellers, Community, Editorial, NewArrivals, PromoBento, ShopCategories, TrustBar } from '../sections/HomeSections';

export default function Home() {
  return (
    <div className="home">
      <Hero />
      <TrustBar />
      <ShopCategories />
      <BestSellers />
      <PromoBento />
      <NewArrivals />
      <Editorial />
      <Community />
    </div>
  );
}
