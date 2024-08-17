import Image from 'next/image';
import params from '@/public/params.svg';
import Search from '@/src/app/components/core/search';
import Sidebar from '@/src/app/components/core/sidebar';

const StorageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-16 bg-cf-dark">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Search />
            <div className="w-full h-16 flex justify-end items-center">
              <div className="flex gap-8 items-center">
                <Image src={params} alt="params" className="w-10" />
                <div className="rounded-full bg-dar-card text-xl h-16 w-16 font-regular flex items-center justify-center">
                  <p>AB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
export default StorageLayout;
