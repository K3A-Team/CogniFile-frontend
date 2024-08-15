'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import Input from '@/src/app/components/core/input';
import MiniFooter from '@/src/app/components/core/miniFooter';
import MiniNavbar from '@/src/app/components/core/miniNavbar';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  rootFolderId: string;
}

interface RegisterSuccessResponse {
  success: true;
  user: User;
  token: string;
}

interface RegisterErrorResponse {
  success: false;
  message: string;
}

export default function Register() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post<RegisterSuccessResponse | RegisterErrorResponse>(
        'http://34.41.104.20/auth/register',
        { firstName, lastName, email, password },
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
        if (error.response?.status === 201) {
          setError(error.response.data.message || 'User already exists');
        } else {
          setError(error.response?.data?.message || 'An error occurred during registration');
        }
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <MiniNavbar />
      <div className="md:py-24 md:px-36 py-16 px-8 w-[90%] md:w-auto bg-[#191919] rounded-[1rem] flex flex-col items-center justify-center gap-12">
        <div className="flex flex-col gap-10 items-center justify-center w-full">
          <div className="flex flex-col gap-4 items-center justify-center w-full">
            <h2 className="font-semibold text-white text-3xl text-center">
              Create your CogniFile account
            </h2>
            <p className="text-white opacity-40 font-medium text-sm text-center">
              Try Cognifile for free. No credit card required
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            <div className="flex flex-col items-start gap-3">
              <div className="flex flex-col w-full md:flex-row items-center gap-3">
                <Input
                  placeholder="Firstname"
                  isPassword={false}
                  isOTP={false}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setFirstName(event.target.value)
                  }
                  value={firstName}
                />
                <Input
                  placeholder="Lastname"
                  isPassword={false}
                  isOTP={false}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setLastName(event.target.value)
                  }
                  value={lastName}
                />
              </div>
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
              <Input
                placeholder="Confirm Password"
                isPassword
                isOTP={false}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(event.target.value)
                }
                value={confirmPassword}
              />
            </div>
            {error && <p className="text-[#b73939] font-medium text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#DEDEDE] to-[#787878] text-cf-dark font-semibold rounded-full px-16 py-4 text-2xl"
            >
              Register
            </button>
          </form>
        </div>
        <div className="flex gap-1">
          <p className="text-white opacity-30 font-medium text-[1rem]">Already have an account ?</p>
          <Link
            className="text-white opacity-70 font-medium text-[1rem] underline hover:cursor-pointer"
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
