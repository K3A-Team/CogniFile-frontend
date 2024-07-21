import Image from 'next/image';
import Link from 'next/link';
import logoShort from '@/public/logo_short.png';
import macos from '@/public/macos.png';
import windows from '@/public/windows.png';

const Footer = () => {
  return (
    <footer className="border-t border-t-white  pt-10">
      <div className="mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-20">
          <div className="flex flex-col items-start">
            <Image src={logoShort} alt="Logo Short" className="mb-4 w-12" />
            <p className="text-lg font-semibold mb-2">
              We growing up your organization with AI supported storage.
            </p>
            <p className="text-gray-400">Sofiane, 2024.</p>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:col-span-2">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Platform</h3>
              <ul className="text-gray-400">
                <li className="mb-1">
                  <Link href="#">Plans & Pricing</Link>
                </li>
                <li className="mb-1">
                  <Link href="#">Personal AI Manager</Link>
                </li>
                <li className="mb-1">
                  <Link href="#">AI Business Writer</Link>
                </li>
              </ul>
            </div>
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Company</h3>
              <ul className="text-gray-400">
                <li className="mb-1">
                  <Link href="#">Blog</Link>
                </li>
                <li className="mb-1">
                  <Link href="#">Careers</Link>
                </li>
                <li className="mb-1">
                  <Link href="#">News</Link>
                </li>
              </ul>
            </div>
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Resources</h3>
              <ul className="text-gray-400">
                <li className="mb-1">
                  <Link href="#">Documentation</Link>
                </li>
                <li className="mb-1">
                  <Link href="#">Papers</Link>
                </li>
                <li className="mb-1">
                  <Link href="#">Press Conferences</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-start">
              <h3 className="text-lg font-semibold mb-2">Get the app</h3>
              <div className="flex flex-col gap-y-2">
                <button className="bg-transparent border border-white text-white rounded-full px-4 py-2 mb-2 flex items-center gap-x-2">
                  <Image src={windows} alt="windows h-10" /> Windows
                </button>
                <button className="bg-transparent border border-white text-white rounded-full px-4 py-2 flex items-center gap-x-2">
                  <Image src={macos} alt="macos h-10" /> macOS
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-black mt-10 py-4 px-20 text-center text-gray-400 text-sm flex justify-between items-center">
          <p>&copy; 2024 CogniFile. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link href="#" className="hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:underline">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
