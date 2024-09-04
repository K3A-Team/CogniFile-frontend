import Link from 'next/link';
import MiniFooter from '@/src/app/components/core/miniFooter';
import MiniNavbar from '@/src/app/components/core/miniNavbar';
import LoginFormView from '@/src/app/components/auth/loginformview';
import { Metadata } from 'next';

export const metadata : Metadata = {
  title: 'CogniFile | Login',
  description: 'Login to your CogniFile account, your AI powered smart file manager!',
}

export default function Login() {

  return (
    <div className="min-h-screen w-screen flex items-center justify-center flex-col">
      <MiniNavbar />
      <div className='flex-1 flex items-center justify-center'>
        <div className="sm:my-10 md:px-36 py-16 px-8 w-full sm:w-[90%] max-w-[815px] md:w-auto flex-1 bg-[#191919] rounded-[1rem] flex flex-col items-center justify-center gap-12">
          <div className="flex flex-col gap-10 items-center justify-center w-full">
            <div className="flex flex-col gap-4 items-center justify-center w-full">
              <h2 className="font-semibold text-white text-3xl text-center">
                Connect to your CogniFile account
              </h2>
              <p className="text-white opacity-40 font-medium text-sm text-center">
                Try Cognifile for free. No credit card required
              </p>
            </div>
            <LoginFormView />
          </div>
          <div className="flex gap-1">
            <p className="text-white opacity-30 font-medium text-[1rem]">
              You don’t have an account ?
            </p>
            <Link
              className="text-white opacity-70 font-medium text-[1rem] underline hover:cursor-pointer"
              href={'/auth/register'}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
      <MiniFooter />
    </div>
  );
}
