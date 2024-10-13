'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import dark from '@/public/dark.png';
import light from '@/public/light.png';
import params from '@/public/params.svg';
import Lightparams from '@/public/params_light.svg';
import Chatbot from '@/src/app/components/core/chatbot';
import ProfileIcon from '@/src/app/components/core/profileicon';
import Search from '@/src/app/components/core/search';
import Sidebar from '@/src/app/components/core/sidebar';
import '@/src/styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  showSearch?: boolean;
}) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />

      <div className="flex px-4 py-6 lg:px-20 lg:py-12 lg:w-[85%] flex-col gap-10 bg-[#F9F9F9] dark:bg-[#1F1F1F] relative mt-12 lg:mt-0">
        <div className="w-full h-16 flex justify-center lg:justify-between items-center mt-8 lg">
          <Search />
          <div className="lg:flex gap-4 lg:gap-8 items-center hidden">
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
      </div>
    </div>
  );
}
