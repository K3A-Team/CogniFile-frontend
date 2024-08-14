import Image from 'next/image';
import Link from 'next/link';
import arrow from '@/public/arrow.png';

const Stats = () => {
  return (
    <section className="text-white w-[84vw] h-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 justify-items-stretch">
          <div
            className="relative bg-[#191919] p-4 rounded-[2rem] bg-datacenter bg-cover bg-center"
            style={{ height: '430px' }}
          >
            <p className="text-[#D9D9D9] absolute top-6 left-6 font-semibold text-xl">20+ Tools</p>
            <h3 className="absolute text-2xl lg:text-3xl bottom-6 left-6 font-semibold">
              Remote <br></br> Working Tool
            </h3>
            <div className="absolute bottom-6 right-6 text-xl">
              <Link href="#" className="flex items-center text-white">
                <Image src={arrow} alt="Arrow" className="ml-2" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-y-8">
            <div
              className="relative bg-[#191919] p-4 rounded-[2rem] group transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#DB6868] hover:to-[#AD3333]"
              style={{ height: '200px' }}
            >
              <p className="text-[#D9D9D9] absolute top-6 left-6 font-semibold text-xl transition-colors duration-300">
                60+ Tools
              </p>
              <h3 className="absolute text-2xl xl:text-3xl bottom-6 left-6 font-semibold transition-colors duration-300">
                Project <br></br>Managments
              </h3>
              <div className="absolute bottom-4 right-4 text-xl">
                <Link href="#" className="flex items-center text-white">
                  <Image src={arrow} alt="Arrow" className="ml-2" />
                </Link>
              </div>
            </div>
            <div
              className="relative bg-[#191919] p-4 rounded-[2rem] group transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#DEDEDE] hover:to-[#777777]"
              style={{ height: '200px' }}
            >
              <p className="text-[#D9D9D9] absolute top-6 left-6 font-semibold text-xl transition-colors duration-300 group-hover:text-[#191919]">
                1.3k+ Tools
              </p>
              <h3 className="absolute text-2xl xl:text-3xl bottom-6 left-6 font-semibold transition-colors duration-300 group-hover:text-[#191919]">
                Collaborations
              </h3>
              <div className="absolute bottom-4 right-4 text-xl">
                <Link href="#" className="flex items-center text-white">
                  <Image src={arrow} alt="Arrow" className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-8">
            <div
              className="relative bg-[#191919] p-4 rounded-[2rem] group transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#68A7DB] hover:to-[#3376AD]"
              style={{ height: '200px' }}
            >
              <p className="text-[#D9D9D9] absolute top-6 left-6 font-semibold text-xl transition-colors duration-300">
                20+ Tools
              </p>
              <h3 className="absolute text-2xl xl:text-3xl bottom-6 left-6 font-semibold transition-colors duration-300">
                AI Tool
              </h3>
              <div className="absolute bottom-4 right-4 text-xl">
                <Link href="#" className="flex items-center transition-colors duration-300">
                  <Image src={arrow} alt="Arrow" className="ml-2" />
                </Link>
              </div>
            </div>

            <div className="flex gap-x-8">
              <div
                className="relative bg-[#191919] p-4 rounded-[2rem] group transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#DBA568] hover:to-[#AD7033] flex-1"
                style={{ height: '200px' }}
              >
                <p className="text-[#D9D9D9] absolute top-6 left-6 font-semibold text-xl transition-colors duration-300">
                  2.6k+ Tools
                </p>
                <h3 className="absolute text-xl xl:text-3xl bottom-6 left-6 font-semibold transition-colors duration-300">
                  Files <br></br> Tracking
                </h3>
                <div className="absolute bottom-4 right-4 text-xl">
                  <Link href="#" className="flex items-center transition-colors duration-300">
                    <Image src={arrow} alt="Arrow" className="ml-2" />
                  </Link>
                </div>
              </div>
              <div
                className="relative bg-[#191919] p-4 rounded-[2rem] group transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#87DB68] hover:to-[#53AD33] flex-1"
                style={{ height: '200px' }}
              >
                <p className="text-[#D9D9D9] absolute top-6 left-6 font-semibold text-xl transition-colors duration-300 group-hover:text-[#191919]">
                  89+ Tools
                </p>
                <h3 className="absolute text-xl xl:text-3xl bottom-6 left-6 font-semibold transition-colors duration-300 group-hover:text-[#191919]">
                  Mindful <br></br> Tools
                </h3>
                <div className="absolute bottom-4 right-4 text-xl group-hover:text-[#191919]">
                  <Link href="#" className="flex items-center transition-colors duration-300">
                    <Image src={arrow} alt="Arrow" className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Stats;
