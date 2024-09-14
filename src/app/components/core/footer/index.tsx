import Image from 'next/image';
import Link from 'next/link';
import logoShort from '@/public/logo_short.png';
import macos from '@/public/macos.png';
import windows from '@/public/windows.png';

const Footer = () => {
  return (
    <footer className="border-t border-t-[#787878]">
      {/*Top*/}
      <div className="xl:py-24 py-16 px-8 xl:px-0 container m-auto flex justify-center xl:justify-between items-center xl:items-start">
        <div className="flex flex-col items-center xl:items-start  gap-4 xl:max-w-[35%]">
          <div className="flex items-center">
            <Image src={logoShort} alt="Logo" className="lg:w-20 w-16" />
          </div>
          <p className="text-2xl lg:text-3xl xl:text-2xl font-semibold xl:text-left text-center">
            We growing up your organization with AI supported storage.
          </p>
          <p className="text-400">K3A, {new Date().getFullYear()}.</p>
        </div>

        <div className="hidden xl:flex justify-between gap-20">
          <div className="flex flex-col gap-6">
            <h4 className="font-medium text-xl">Platform</h4>
            <p className="opacity-60 font-[400] text-lg">Plans & Pricing</p>
            <p className="opacity-60 font-[400] text-lg">AI Tools Center</p>
            <p className="opacity-60 font-[400] text-lg">AI Business Writer</p>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="font-medium text-xl">Company</h4>
            <p className="opacity-60 font-[400] text-lg">Blog</p>
            <p className="opacity-60 font-[400] text-lg">Careers</p>
            <p className="opacity-60 font-[400] text-lg">News</p>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="font-medium text-xl">Resources</h4>
            <p className="opacity-60 font-[400] text-lg">Documentation</p>
            <p className="opacity-60 font-[400] text-lg">Papers</p>
            <p className="opacity-60 font-[400] text-lg">Press Conferences</p>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="font-medium text-xl">Get the app</h4>
            <div className="flex flex-col gap-4">
              <button className="bg-cf-dark border border-white text-white rounded-full px-4 py-2 flex items-center gap-2 justify-center hover:invert">
                <Image src={windows} alt="windows h-10" />
                <p className="font-medium text-lg">Windows</p>
              </button>
              <button className="bg-cf-dark border border-white text-white rounded-full px-4 py-2 flex items-center gap-2 justify-center hover:invert">
                <Image src={macos} alt="macos h-10" />
                <p className="font-medium text-lg">MacOs</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*Bottom*/}
      <div className="bg-[#191919]">
        <div className="py-6 px-16 xl:px-0 container m-auto flex lg:justify-between items-center justify-center text-lg">
          <p>&copy; {new Date().getFullYear()} CogniFile. All rights reserved.</p>
          <div className="hidden lg:flex align-center justify-center space-x-8">
            <Link href="#" className="hover:cursor-pointer">
              Terms of Service
            </Link>
            <Link href="#" className="hover:cursor-pointer">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:cursor-pointer">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
