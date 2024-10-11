import { Metadata } from 'next';
import Link from 'next/link';
import ForgetFormView from '@/src/app/components/auth/forgetformview';

export const metadata: Metadata = {
  title: 'CogniFile | Forget Password',
  description: 'Forgot your password? No worries, reset it here!',
};

export default function Forget() {
  return (
    <div className="sm:my-10 md:px-36 py-16 px-8 w-full sm:w-[90%] max-w-[656px] md:w-auto flex-1 bg-[#191919] rounded-[1rem] flex flex-col items-center justify-center gap-12">
      <div className="flex flex-col gap-10 items-center justify-center w-full">
        <div className="flex flex-col gap-4 items-center justify-center w-full">
          <h2 className="font-semibold text-white text-3xl text-center">Forgot your password</h2>
          <p className="text-white opacity-40 font-medium text-sm text-center">
            No worries, drop your email and we will send you a link to reset your password.
          </p>
        </div>
        <ForgetFormView />
      </div>
      <div className="flex gap-1">
        <p className="text-white opacity-30 font-medium text-[1rem]">Already have an account?</p>
        <Link
          className="text-white opacity-70 font-medium text-[1rem] underline"
          href="/auth/login"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
