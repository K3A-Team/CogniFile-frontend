'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/src/app/components/core/input';

type Form = {
  email: string;
  password: string;
};

interface LoginSuccessResponse {
  success: true;
  message: string;
}

interface LoginErrorResponse {
  success: false;
  message: string;
}

function LoginFormView() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit: onSubmit,
  } = useForm<Form>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (data: Form) => {
    setError('');
    setLoading(true);

    try {
      const response = await axios.post<LoginSuccessResponse | LoginErrorResponse>(
        '/api/auth/login',
        { ...data },
      );

      const { data: responseData } = response;

      if (responseData.success) {
        setSuccess(responseData.message ?? 'Successfully logged in');
        await new Promise(resolve => setTimeout(resolve, 2000));
        router.push('/home');
      } else {
        setError(responseData.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'An error occurred during login');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)} className="flex flex-col gap-6 w-full">
      <div className="flex flex-col items-start gap-3">
        <div className="flex justify-center gap-2 flex-col w-full">
          <Input
            placeholder="Email"
            isPassword={false}
            isOTP={false}
            //@ts-expect-error
            register={register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,4}$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && (
            <p className="text-[#b73939] font-medium text-sm w-full text-left ml-4">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="flex justify-center gap-2 flex-col w-full">
          <Input
            placeholder="Password"
            isPassword
            isOTP={false}
            //@ts-expect-error
            register={register('password', {
              required: 'Password is required',
            })}
          />
          {errors.password && (
            <p className="text-[#b73939] font-medium text-sm w-full text-left ml-4">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>
      {!!error && (
        <p
          className="text-[#b73939] font-medium text-xl w-full flex text-center justify-center"
          style={{ lineBreak: 'anywhere' }}
        >
          {error}
        </p>
      )}
      {!!success && (
        <p
          className="text-green font-medium text-xl w-full flex text-center justify-center"
          style={{ lineBreak: 'anywhere' }}
        >
          {success}
        </p>
      )}
      <button
        type="submit"
        className={`w-full bg-gradient-to-r from-[#DEDEDE] to-[#787878] text-cf-dark font-semibold rounded-full px-16 py-4 text-xl transition duration-300 ease-in-out transform hover:from-[#c0c0c0] hover:to-[#5e5e5e] hover:shadow-lg flex items-center justify-center ${
          loading ? 'cursor-not-allowed' : ''
        }`}
        disabled={loading}
      >
        {loading ? (
          <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        ) : (
          'Login'
        )}
      </button>
    </form>
  );
}

export default LoginFormView;
