import Link from 'next/link';

const MiniFooter = () => {
  return (
    <footer className="block w-full max-sm:border-t-[0.5px] max-sm:border-[#787878]">
      <div className="bg-[#191919] md:px-6">
        <div className="py-6 px-16 xl:px-0 container m-auto flex lg:justify-between items-center justify-center text-center text-lg">
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

export default MiniFooter;
