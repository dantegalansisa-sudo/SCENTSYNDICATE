import Hero from '../sections/Hero';
import Manifesto from '../sections/Manifesto';
import Approved from '../sections/Approved';
import Notes from '../sections/Notes';
import { BestSellers, CollectionsShowcase, Community, Decants, NewArrivals } from '../sections/HomeSections';

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Approved />
      <Notes />
      <CollectionsShowcase />
      <NewArrivals />
      <Decants />
      <BestSellers />
      <Community />
    </>
  );
}
