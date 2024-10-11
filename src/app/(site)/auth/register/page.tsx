import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import OAuthButton from '@/src/app/components/core/oauthbutton';

export const metadata: Metadata = {
  title: 'CogniFile | Register',
  description: 'Create your CogniFile account, your AI powered smart file manager!',
};

export default function Register() {
  return (
    <div className="sm:my-10 md:px-36 py-16 px-8 w-full sm:w-[90%] max-w-[815px] md:w-auto flex-1 dark:bg-[#191919] bg-[#F9F9F9] rounded-[1rem] flex flex-col items-center justify-center gap-12">
      <div className="flex flex-col gap-10 items-center justify-center w-full">
        <div className="flex flex-col gap-4 items-center justify-center w-full">
          <h2 className="font-semibold dark:text-white text-[#191919] text-3xl text-center">
            Connect to your CogniFile account
          </h2>
          <p className="dark:text-white text-[#191919] opacity-40 font-medium text-sm text-center">
            Try Cognifile for free. No credit card required
          </p>
        </div>
        <Suspense>
          <div className="flex flex-col w-full gap-3">
            <OAuthButton type="Email" operation="register" />
            <OAuthButton type="Google" operation="register" />
            <OAuthButton type="Github" operation="register" />
          </div>
        </Suspense>
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
