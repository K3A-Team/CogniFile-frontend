import MiniFooter from '@/src/app/components/core/miniFooter';
import MiniNavbar from '@/src/app/components/core/miniNavbar';
import ResetFormView from '@/src/app/components/auth/resetformview';
import Link from 'next/link';
import { Metadata } from 'next';

type Props = {
  searchParams: {
    token: string,
    email: string
  };
};

export const metadata : Metadata = {
  title: 'CogniFile | Reset password',
  description: 'Manage your password using your mail adress',
}

function ResetPassword({ searchParams: { token, email } }: Props) {

  if (!token || !email) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center flex-col">
        <MiniNavbar />
        <div className='flex flex-1 items-center justify-center my-10'>
          <div className="md:py-24 md:px-36 py-16 px-8 w-[90%] md:w-auto md:min-w-[40%] bg-[#191919] rounded-[1rem] flex flex-col items-center justify-center gap-12">
            <div className="flex flex-col gap-4 items-center justify-center w-full">
              <h2 className="font-semibold text-white text-3xl text-center">Invalid reset link</h2>
              <p className="text-white opacity-40 font-medium text-sm text-center">
                The reset link you are trying to use is invalid.
              </p>
            </div>
          </div>
        </div>
        <MiniFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center flex-col">
      <MiniNavbar />
      <div className='flex flex-1 items-center justify-center my-10'>
        <div className="md:py-24 md:px-36 py-16 px-8 w-[90%] md:w-auto md:min-w-[40%] bg-[#191919] rounded-[1rem] flex flex-col items-center justify-center gap-12">
          <div className="flex flex-col gap-10 items-center justify-center w-full">
            <div className="flex flex-col gap-4 items-center justify-center w-full">
              <h2 className="font-semibold text-white text-3xl text-center">Reset your password</h2>
              <p className="text-white opacity-40 font-medium text-sm text-center">
                Manage your password using your mail adress
              </p>
            </div>
            <ResetFormView
              token={token}
              email={email}
            />
          </div>
          <div className="flex gap-1">
            <p className="text-white opacity-30 font-medium text-[1rem]">
            Already have an account?
            </p>
            <Link
              className="text-white opacity-70 font-medium text-[1rem] underline hover:cursor-pointer"
              href={'/auth/login'}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
      <MiniFooter />
    </div>
  );
}

export default ResetPassword;