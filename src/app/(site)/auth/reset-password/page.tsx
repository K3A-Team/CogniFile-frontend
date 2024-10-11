import { Metadata } from 'next';
import Link from 'next/link';
import ResetFormView from '@/src/app/components/auth/resetformview';

type Props = {
  searchParams: {
    token: string;
    email: string;
  };
};

export const metadata: Metadata = {
  title: 'CogniFile | Reset password',
  description: 'Manage your password using your mail address',
};

export default function ResetPassword({ searchParams: { token, email } }: Props) {
  if (!token || !email) {
    return (
      <div className="md:py-24 md:px-36 py-16 px-8 w-[90%] md:w-auto md:min-w-[40%] dark:bg-[#191919] bg-[#F9F9F9] rounded-[1rem] flex flex-col items-center justify-center gap-12">
        <div className="flex flex-col gap-4 items-center justify-center w-full">
          <h2 className="font-semibold dark:text-white text-[#191919] text-3xl text-center">
            Invalid reset link
          </h2>
          <p className="dark:text-white text-[#191919] opacity-40 font-medium text-sm text-center">
            The reset link you are trying to use is invalid.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="md:py-24 md:px-36 py-16 px-8 w-[90%] md:w-auto md:min-w-[40%] bg-[#191919] rounded-[1rem] flex flex-col items-center justify-center gap-12">
      <div className="flex flex-col gap-10 items-center justify-center w-full">
        <div className="flex flex-col gap-4 items-center justify-center w-full">
          <h2 className="font-semibold text-white text-3xl text-center">Reset your password</h2>
          <p className="text-white opacity-40 font-medium text-sm text-center">
            Manage your password using your mail address
          </p>
        </div>
        <ResetFormView token={token} email={email} />
      </div>
      <div className="flex gap-1">
        <p className="dark:text-white text-[#191919] opacity-30 font-medium text-[1rem]">
          Already have an account?
        </p>
        <Link
          className="dark:text-white text-[#191919] opacity-70 font-medium text-[1rem] underline"
          href="/auth/login"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
