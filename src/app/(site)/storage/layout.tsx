'use client';

import Chatbot from '../../components/core/chatbot';
import ProfileIcon from '../../components/core/profileicon';
import Image from 'next/image';
import Link from 'next/link';
import params from '@/public/params.svg';
import Search from '@/src/app/components/core/search';
import Sidebar from '@/src/app/components/core/sidebar';

const StorageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 px-4 lg:px-16 pt-16 bg-cf-dark w-full relative z-[5] flex flex-col">
        <div className="container mx-auto">
          <div className="flex flex-col-reverse lg:flex-row justify-between items-center mt-8 lg:mt-0 mb-8 gap-y-4">
            <Search />
            {/* Hide Profile and Settings on mobile screens */}
            <div className="w-full h-16 justify-center lg:justify-end items-center lg:w-auto hidden lg:flex">
              <div className="flex gap-4 lg:gap-8 items-center">
                <Link href="/settings">
                  <Image src={params} alt="params" className="w-8 lg:w-10" />
                </Link>
                <ProfileIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">{children}</div>

        {/* Center the chatbot icon horizontally at the bottom */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 lg:static lg:left-auto lg:transform-none">
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

export default StorageLayout;
