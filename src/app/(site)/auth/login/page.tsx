'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Input from '@/src/app/components/core/input';
import MiniFooter from '@/src/app/components/core/miniFooter';
import MiniNavbar from '@/src/app/components/core/miniNavbar';

interface User {
  lastName: string;
  firstName: string;
  email: string;
  rootFolderId: string;
}

interface LoginSuccessResponse {
  success: true;
  user: User;
  token: string;
}

interface LoginErrorResponse {
  success: false;
  message: string;
}

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post<LoginSuccessResponse | LoginErrorResponse>(
        'http://34.41.104.20:8000/auth/login',
        { email, password },
      );

      const { data } = response;

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/dashboard');
      } else {
        setError(data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'An error occurred during login');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <MiniNavbar />
      <div className="my-16 md:py-24 md:px-36 py-16 px-8 w-[90%] md:w-auto bg-[#191919] rounded-[1rem] flex flex-col items-center justify-center gap-12">
        <div className="flex flex-col gap-10 items-center justify-center w-full">
          <div className="flex flex-col gap-4 items-center justify-center w-full">
            <h2 className="font-semibold text-white text-3xl text-center">
              Connect to your CogniFile account
            </h2>
            <p className="text-white opacity-40 font-medium text-sm text-center">
              Try Cognifile for free. No credit card required
            </p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full">
            <div className="flex flex-col items-start gap-3">
              <Input
                placeholder="Email"
                isPassword={false}
                isOTP={false}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(event.target.value)
                }
                value={email}
              />
              <Input
                placeholder="Password"
                isPassword
                isOTP={false}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(event.target.value)
                }
                value={password}
              />
              <div className="flex justify-between items-center w-full">
                <Link
                  className="text-[#397AB7] underline font-medium text-sm hover:cursor-pointer"
                  href={'/auth/reset'}
                >
                  Forget password ?
                </Link>
                {error && <p className="text-[#b73939] font-medium text-sm">{error}</p>}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#DEDEDE] to-[#787878] text-cf-dark font-semibold rounded-full px-16 py-4 text-2xl"
            >
              Login
            </button>
          </form>
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
      <MiniFooter />
    </div>
  );
}
