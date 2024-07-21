import Image from 'next/image';
import shape1 from '@/public/shape1.png';
import shape2 from '@/public/shape2.png';
import shape3 from '@/public/shape3.png';
import shape4 from '@/public/shape4.png';

const Hero = () => {
  return (
    <section className="py-20 relative">
      <div className="w-full px-20 lg:px-60 text-center">
        <div className="flex justify-center w-full">
          <div className="flex items-center justify-between mb-8 px-2 border border-white rounded-full">
            <input
              type="text"
              placeholder="Find The Best Productivity software"
              className="rounded-full px-6 py-3 focus:outline-none bg-transparent  w-96"
            />
            <button className="text-cf-dark bg-white rounded-full px-4 py-2">➔</button>
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Discover The Best Productivity Tool Effortlessly
        </h1>
        <button className="bg-white text-cf-dark rounded-full px-16 py-4 font-bold text-lg">
          Try For Free
        </button>
        <p className="mt-6 text-lg">
          Over <span className="font-bold">200+ tools</span> and graphic design, Lorem ipsum is a
          placeholder text <br />
          commonly used to demonstrate the visual.
        </p>
      </div>
      <Image src={shape1} alt="Shape 1" className="absolute top-10 left-10 w-10 h-10" />
      <Image src={shape2} alt="Shape 2" className="absolute top-1/2 left-1/4 w-10 h-10" />
      <Image src={shape3} alt="Shape 3" className="absolute top-10 right-10 w-10 h-10" />
      <Image src={shape4} alt="Shape 4" className="absolute bottom-40 right-1/4 w-10 h-10" />
    </section>
  );
};
export default Hero;
