import { Metadata } from 'next';
import Link from 'next/link';
import RegisterFormView from '@/src/app/components/auth/registerformview';
import MiniFooter from '@/src/app/components/core/miniFooter';
import MiniNavbar from '@/src/app/components/core/miniNavbar';

export const metadata: Metadata = {
  title: 'CogniFile | Register',
  description: 'Create your CogniFile account, your AI powered smart file manager!',
};

export default function Email() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center gap-8 flex-col">
      <MiniNavbar />
      <div className="sm:my-10 md:py-24 md:px-36 py-16 px-8 w-full max-sm:flex-1 sm:w-[90%] max-w-[1036px] md:w-auto dark:bg-[#191919] bg-[#F9F9F9] sm:rounded-[1rem] flex flex-col items-center justify-center gap-12">
        <div className="flex flex-col gap-10 items-center justify-center w-full">
          <div className="flex flex-col gap-4 items-center justify-center w-full">
            <h2 className="font-semibold dark:text-white text-[#191919] text-3xl text-center">
              Create your CogniFile account
            </h2>
            <p className="dark:text-white text-[#191919] opacity-40 font-medium text-sm text-center">
              Try Cognifile for free. No credit card required
            </p>
          </div>
          <RegisterFormView />
        </div>
        <div className="flex gap-1">
          <p className="dark:text-white text-[#191919] opacity-30 font-medium text-[1rem]">
            Already have an account ?
          </p>
          <Link
            className="dark:text-white text-[#191919] opacity-70 font-medium text-[1rem] underline hover:cursor-pointer"
            href={'/auth/login'}
          >
            Login
          </Link>
        </div>
      </div>
      <MiniFooter />
    </div>
  );
}
