'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/src/app/components/core/input';

type Form = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

interface User {
  firstName: string;
  lastName: string;
  email: string;
  rootFolderId: string;
}

interface RegisterSuccessResponse {
  success: true;
  user: User;
  message: string;
}

interface RegisterErrorResponse {
  success: false;
  message: string;
}

function RegisterFormView() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const router = useRouter();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit: onSubmit,
  } = useForm<Form>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    },
  });

  const handleSubmit = async (data: Form) => {
    setError('');
    setLoading(true);

    const toSend = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    };
    try {
      const response = await axios.post<RegisterSuccessResponse | RegisterErrorResponse>(
        '/api/auth/register',
        { ...toSend },
      );

      const { data } = response;

      if (data.success) {
        setSuccess(data?.message ?? 'Successfully registered');
        await new Promise(resolve => setTimeout(resolve, 2000));
        router.push('/home');
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)} className="flex flex-col gap-6 w-full">
      <div className="flex flex-col items-start gap-3">
        <div className="flex flex-col w-full md:flex-row items-start gap-3">
          <div className="flex justify-center gap-2 flex-col w-full">
            <Input
              placeholder="Firstname"
              isPassword={false}
              isOTP={false}
              //@ts-expect-error
              register={register('firstName', {
                required: 'First name is required',
              })}
            />
            {errors.firstName && (
              <p className="text-[#b73939] font-medium text-sm w-full text-left ml-4">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="flex justify-center gap-2 flex-col w-full">
            <Input
              placeholder="Lastname"
              isPassword={false}
              isOTP={false}
              //@ts-expect-error
              register={register('lastName', {
                required: 'Last name is required',
              })}
            />
            {errors.lastName && (
              <p className="text-[#b73939] font-medium text-sm w-full text-left ml-4">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>
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
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && (
            <p className="text-[#b73939] font-medium text-sm w-full text-left ml-4">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex justify-center gap-2 flex-col w-full">
          <Input
            placeholder="Confirm Password"
            isPassword
            isOTP={false}
            //@ts-expect-error
            register={register('confirmPassword', {
              required: 'Password confirmation is required',
              validate: value => value === watch('password') || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && (
            <p className="text-[#b73939] font-medium text-sm w-full text-left ml-4">
              {errors.confirmPassword.message}
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
          'Register'
        )}
      </button>
    </form>
  );
}

export default RegisterFormView;
