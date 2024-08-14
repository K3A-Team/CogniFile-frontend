import Footer from '../components/core/footer';
import Navbar from '../components/core/navbar';
import Hero from '../components/landing/hero';
import Plans from '../components/landing/plans';
import Stats from '../components/landing/stats';

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="m-auto container flex flex-col items-center gap-24 py-24">
        <Hero />
        <Stats />
        <Plans />
      </div>

      {/* 
      <Hero />
      <Stats />
      <Plans />
      <Features />
      <Try /> */}
      <Footer />
    </div>
  );
}
