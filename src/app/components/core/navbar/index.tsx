'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import dark from '@/public/dark.png';
import shortLogo from '@/public/logo_short.png';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="absolute top-0 w-screen py-6 px-12 border-b border-b-[#787878] flex flex-col gap-8 z-10 bg-[#1F1F1F]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <Image src={shortLogo} alt="Logo" className="lg:w-20 w-16" />
          </Link>
        </div>
        <div className="lg:flex hidden gap-x-8 items-center">
          <button>
            <Image src={dark} alt="Dark" className="h-12 w-12" />
          </button>
          <Link href="/auth/login" className="text-white mr-4">
            Sign in
          </Link>
          <Link
            href="/auth/register"
            className="text-white border border-white bg-cf-dark rounded-full px-4 py-2 hover:invert"
          >
            Sign up - For free
          </Link>
        </div>

        <button
          className="lg:hidden flex flex-col gap-2 hover:cursor-pointer"
          onClick={() => setToggle(!toggle)}
          onKeyDown={event => {
            if (event.key === 'Enter' || event.key === ' ') {
              setToggle(!toggle);
            }
          }}
          aria-label="Toggle menu"
        >
          <div className="bg-white w-10 h-[2px] rounded-full"></div>
          <div className="bg-white w-10 h-[2px] rounded-full"></div>
          <div className="bg-white w-10 h-[2px] rounded-full"></div>
        </button>
      </div>

      {toggle ? (
        <div className="w-full py-8 animate-fadeIn">
          <div className="flex flex-col gap-8 items-center">
            <Link
              href="/auth/register"
              className="text-white border border-white bg-cf-dark rounded-full px-4 py-2 hover:invert"
            >
              Sign up - For free
            </Link>
            <Link href="/auth/login" className="text-white hover:underline">
              Sign in
            </Link>
            <button>
              <Image src={dark} alt="Dark" className="h-12 w-12" />
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </nav>
  );
};

export default Navbar;
