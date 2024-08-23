import Chatbot from '../../components/core/chatbot';
import ProfileIcon from '../../components/core/profileicon';
import Image from 'next/image';
import Link from 'next/link';
import params from '@/public/params.svg';
import Search from '@/src/app/components/core/search';
import Sidebar from '@/src/app/components/core/sidebar';

const StorageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 px-16 pt-16 bg-cf-dark h-screen overflow-hidden w-full relative z-[5]">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Search />
            <div className="w-full h-16 flex justify-end items-center">
              <div className="flex gap-8 items-center">
                <Link href="/settings">
                  <Image src={params} alt="params" className="w-10" />
                </Link>
                <ProfileIcon />
              </div>
            </div>
          </div>
        </div>
        {children}
        <Chatbot />
      </div>
    </div>
  );
};
export default StorageLayout;
