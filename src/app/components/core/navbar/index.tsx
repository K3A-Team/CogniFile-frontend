'use client';

import Image from 'next/image';
import Link from 'next/link';
import dark from '@/public/dark.png';
import shortLogo from '@/public/logo_short.png';

const Navbar = () => {
  return (
    <nav className="py-6 px-12 border-b border-b-[#787878]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Image src={shortLogo} alt="Logo" className="lg:w-20 w-16" />
        </div>
        <div className="lg:flex hidden gap-x-8 items-center">
          <button>
            <Image src={dark} alt="Dark" className="h-12 w-12" />
          </button>
          <Link href="/signin" className="text-white mr-4">
            Sign in
          </Link>
          <Link
            href="/signup"
            className="text-white border border-white bg-cf-dark rounded-full px-4 py-2 hover:invert"
          >
            Sign up - For free
          </Link>
        </div>

        <div className="lg:hidden flex flex-col gap-2">
          <div className="bg-white w-10 h-[2px] rounded-full"></div>
          <div className="bg-white w-10 h-[2px] rounded-full"></div>
          <div className="bg-white w-10 h-[2px] rounded-full"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
