'use client';

import Image from 'next/image';
import Link from 'next/link';
import shortLogo from '@/public/logo_short.png';

const MiniNavbar = () => {
  return (
    <nav className="w-full py-6 px-12 border-b dark:border-b-[#787878] border-[#535353] flex flex-col gap-8 z-10 dark:bg-[#1F1F1F] bg-white">
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex items-center justify-center">
          <Link href="/">
            <Image src={shortLogo} alt="Logo" className="lg:w-20 w-16" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default MiniNavbar;
