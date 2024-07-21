import Footer from '../components/core/footer';
import Navbar from '../components/core/navbar';
import Features from '../components/landing/features';
import Hero from '../components/landing/hero';
import Plans from '../components/landing/plans';
import Stats from '../components/landing/stats';
import Try from '../components/landing/try';

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Stats />
      <Plans />
      <Features />
      <Try />
      <Footer />
    </div>
  );
}
