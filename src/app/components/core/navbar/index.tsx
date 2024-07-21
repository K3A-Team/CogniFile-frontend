import Image from 'next/image';
import Link from 'next/link';
import dark from '@/public/dark.png';
import shortLogo from '@/public/logo_short.png';

const Navbar = () => {
  return (
    <nav className="py-4 px-8 border-b border-b-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Image src={shortLogo} alt="Logo" className="w-20" />
        </div>
        <div className="flex gap-x-4 items-center">
          <button>
            <Image src={dark} alt="Dark" className="h-8 w-8" />
          </button>
          {/* <Link href="signin" className="text-white mr-4">
            Sign in
          </Link>
          <Link href="/signup" className="text-white border border-white rounded-full px-4 py-2">
            Sign up - For free
          </Link> */}
          <Link href="/home" className="text-white border border-white rounded-full px-4 py-2">
            Go Home
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
