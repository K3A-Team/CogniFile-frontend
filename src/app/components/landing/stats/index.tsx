import Image from 'next/image';
import Link from 'next/link';
import arrow from '@/public/arrow.png';

const Stats = () => {
  return (
    <section className="bg-black text-white p-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-stretch">
          <div
            className="relative bg-gray-800 p-4 rounded-lg shadow-lg bg-datacenter bg-cover bg-center"
            style={{ height: '430px' }}
          >
            <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
            <div className="relative z-10">
              <p className="text-gray-400 mb-2">20+ Tools</p>
              <h3 className="text-xl font-semibold">Remote Working Tool</h3>
            </div>
            <div className="absolute bottom-4 right-4 text-xl">
              <Link href="#" className="flex items-center text-white">
                <Image src={arrow} alt="Arrow" className="ml-2" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-y-8">
            <div
              className="relative bg-gray-800 p-4 rounded-lg shadow-lg"
              style={{ height: '200px' }}
            >
              <div className="relative z-10">
                <p className="text-gray-400 mb-2">60+ Tools</p>
                <h3 className="text-xl font-semibold">Project Managments</h3>
              </div>
              <div className="absolute bottom-4 right-4 text-xl">
                <Link href="#" className="flex items-center text-white">
                  <Image src={arrow} alt="Arrow" className="ml-2" />
                </Link>
              </div>
            </div>
            <div
              className="relative bg-gray-800 p-4 rounded-lg shadow-lg"
              style={{ height: '200px' }}
            >
              <div className="relative z-10">
                <p className="text-gray-400 mb-2">1.3k+ Tools</p>
                <h3 className="text-xl font-semibold">Collaborations</h3>
              </div>
              <div className="absolute bottom-4 right-4 text-xl">
                <Link href="#" className="flex items-center text-white">
                  <Image src={arrow} alt="Arrow" className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-8">
            <div
              className="relative bg-gray-800 p-4 rounded-lg shadow-lg"
              style={{ height: '200px' }}
            >
              <div className="relative z-10">
                <p className="text-gray-400 mb-2">20+ Tools</p>
                <h3 className="text-xl font-semibold">AI Tool</h3>
              </div>
              <div className="absolute bottom-4 right-4 text-xl">
                <Link href="#" className="flex items-center text-white">
                  <Image src={arrow} alt="Arrow" className="ml-2" />
                </Link>
              </div>
            </div>
            <div className="flex gap-x-8">
              <div
                className="relative bg-gray-800 p-4 rounded-lg shadow-lg flex-1"
                style={{ height: '200px' }}
              >
                <div className="relative z-10">
                  <p className="text-gray-400 mb-2">2.6k+ Tools</p>
                  <h3 className="text-xl font-semibold">Time Tracking</h3>
                </div>
                <div className="absolute bottom-4 right-4 text-xl">
                  <Link href="#" className="flex items-center text-white">
                    <Image src={arrow} alt="Arrow" className="ml-2" />
                  </Link>
                </div>
              </div>
              <div
                className="relative bg-gray-800 p-4 rounded-lg shadow-lg flex-1"
                style={{ height: '200px' }}
              >
                <div className="relative z-10">
                  <p className="text-gray-400 mb-2">89+ Tools</p>
                  <h3 className="text-xl font-semibold">Mindful Tools</h3>
                </div>
                <div className="absolute bottom-4 right-4 text-xl">
                  <Link href="#" className="flex items-center text-white">
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
