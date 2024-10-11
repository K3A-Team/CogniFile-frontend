'use client';

import Chatbot from '../../components/core/chatbot';
import ProfileIcon from '../../components/core/profileicon';
import { useTheme } from '../../components/core/theme';
import Image from 'next/image';
import Link from 'next/link';
import dark from '@/public/dark.png';
import light from '@/public/light.png';
import params from '@/public/params.svg';
import Lightparams from '@/public/params_light.svg';
import Sidebar from '@/src/app/components/core/sidebar';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />

      <div className="flex px-4 py-6 lg:px-20 lg:py-12 lg:w-[85%] flex-col gap-10 bg-[#F9F9F9] dark:bg-[#1F1F1F] relative">
        <div className="w-full h-16 flex justify-end items-center">
          <div className="flex gap-4 lg:gap-8 items-center">
            <button onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}>
              <Image src={theme === 'light' ? light : dark} alt="Theme" className="h-12 w-12" />
            </button>
            <Link href="/settings">
              <Image
                src={theme === 'dark' ? params : Lightparams}
                alt="params"
                className="w-8 lg:w-10"
              />
            </Link>
            <ProfileIcon />
          </div>
        </div>

        <div className="flex-1 relative">{children}</div>

        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 lg:static lg:left-auto lg:transform-none">
          <Chatbot />
        </div>

        {/* Center the chatbot icon horizontally at the bottom */}
      </div>
    </div>
  );
};

export default HomeLayout;
