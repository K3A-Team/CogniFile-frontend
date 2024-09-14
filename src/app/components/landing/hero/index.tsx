import Image from 'next/image';
import Link from 'next/link';
import shape5 from '@/public/Power.png';
import shape6 from '@/public/arrow_right.png';
import shape1 from '@/public/shape1.png';
import shape2 from '@/public/shape2.png';
import shape3 from '@/public/shape3.png';
import shape4 from '@/public/shape4.png';

const Hero = () => {
  return (
    <section className="relative lg:scale-100 scale-60">
      <div className="w-full px-20 text-center lg:px-40">
        <div className="flex justify-center ">
          <div className="lg:scale-100 scale-75 flex items-center justify-between mb-8 px-2 border border-white rounded-full">
            <Image src={shape5} alt="Shape 5" className="h-6 w-auto" />
            <input
              type="text"
              placeholder="Find The Best Productivity software"
              className="rounded-full px-2 py-3 focus:outline-none bg-transparent w-96"
            />
            <button className="text-cf-dark bg-white rounded-full w-8 h-8 flex items-center justify-center">
              <Image src={shape6} alt="Shape 6" className="h-3 w-auto" />
            </button>
          </div>
        </div>
        <h1 className="text-4xl lg:text-7xl font-extrabold mb-6 leading-normal lg:leading-normal text-center w-[100%]">
          Discover The Best Productivity Tool Effortlessly
        </h1>
        <Link
          className="lg:scale-100 scale-75 bg-gradient-to-r from-[#DEDEDE] to-[#787878] transition-all hover:opacity-60 text-cf-dark rounded-full px-16 py-4 font-bold text-lg"
          href="/auth/register"
        >
          Try For Free
        </Link>
        <p className="mt-12 lg:text-xl leading-8 lg:w-auto max-w-[80%] m-auto">
          Over <span className="font-bold">200+ tools</span> and graphic design, Lorem ipsum is a
          placeholder text <br className="hidden lg:block" />
          commonly used to demonstrate the visual.
        </p>
      </div>
      <Image
        src={shape1}
        alt="Shape 1"
        className="hidden lg:block absolute top-10 left-10 lg:w-20 w-12 lg:h-20 h-12"
      />
      <Image
        src={shape2}
        alt="Shape 2"
        className="hidden lg:block absolute top-1/2 left-[12%] lg:w-16 w-10 lg:h-16 h-10"
      />
      <Image
        src={shape3}
        alt="Shape 3"
        className="hidden lg:block absolute top-10 right-10 lg:w-16 w-10 lg:h-16 h-10"
      />
      <Image
        src={shape4}
        alt="Shape 4"
        className="hidden lg:block absolute bottom-32 right-[20%] lg:w-16 w-10 lg:h-16 h-10"
      />
    </section>
  );
};
export default Hero;
