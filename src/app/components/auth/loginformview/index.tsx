'use client'

import axios from 'axios';
import { useState } from 'react';
import Input from '@/src/app/components/core/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import OAuthButton from '../../core/oauthbutton';

type Form = {
    email: string;
    password: string;
}

interface User {
    lastName: string;
    firstName: string;
    email: string;
    rootFolderId: string;
}

interface LoginSuccessResponse {
    success: true;
    user: User;
    message: string;
}

interface LoginErrorResponse {
    success: false;
    message: string;
}

function LoginFormView() {

    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const nextSearchParams = new URLSearchParams(searchParams.toString())

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>(
        nextSearchParams.get('error') ?? ''
    );
    const [success, setSuccess] = useState<string>('');

    const { register, formState: { errors }, handleSubmit: onSubmit } = useForm<Form>({
        defaultValues: {
            email: '',
            password: ''
        },
    });
    
    nextSearchParams.delete('error')
    router.replace(`${pathname}?${nextSearchParams}`)
    
    const handleLogin = async (data: Form) => {
        setError('');
        setLoading(true);

        try {
            const response = await axios.post<LoginSuccessResponse | LoginErrorResponse>(
                '/api/auth/login',
                { ...data },
            );

            if (response.data.success) {
                setSuccess(response?.data?.message ?? 'Successfully logged in');
                await new Promise(resolve => setTimeout(resolve, 2000));
                router.push('/home');
            } else {
                setError(response.data.message);
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
        <form onSubmit={onSubmit(handleLogin)} className="flex flex-col gap-6 w-full">
            <div className="flex flex-col items-start gap-3">
                <div className='flex justify-center gap-2 flex-col w-full'>
                    <Input
                        placeholder="Email"
                        isPassword={false}
                        isOTP={false}
                        //@ts-expect-error
                        register={
                            register('email', {
                            required: 'Email field is required',
                            pattern: {
                                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,4}$/,
                                message: 'Invalid email address',
                            },
                            })
                        }
                    />
                    {
                        errors.email && <p className="text-[#b73939] font-medium text-sm w-full text-left ml-4">{errors.email.message}</p>
                    }
                </div>
                <div className='flex justify-center gap-2 flex-col w-full'>
                    <Input
                        placeholder="Password"
                        isPassword
                        isOTP={false}
                        //@ts-expect-error
                        register={
                            register('password', {
                            required: 'Password field is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters',
                            },
                            })
                        }
                    />
                    {
                        errors.password && <p className="text-[#b73939] font-medium text-sm w-full text-left ml-4">{errors.password.message}</p>
                    }
                </div>
                <div className='flex flex-col w-full md:flex-row items-start gap-3'>
                    <div className='flex justify-center gap-2 flex-col w-full'>
                        <OAuthButton type='google' />
                    </div>
                    <div className='flex justify-center gap-2 flex-col w-full'>
                        <OAuthButton type='github' />
                    </div>
                </div>
                <div className="flex justify-between items-center w-full">
                    <Link
                        className="text-[#397AB7] underline font-medium text-sm hover:cursor-pointer"
                        href={'/auth/forget-password'}
                    >
                        Forget password?
                    </Link>
                </div>
                {
                    !!error && <p className="text-[#b73939] font-medium text-xl w-full flex text-center justify-center" style={{ lineBreak: 'anywhere' }}>{error}</p>
                }
                {
                    !!success && <p className="text-green font-medium text-xl w-full flex text-center justify-center" style={{ lineBreak: 'anywhere' }}>{success}</p>
                }
            </div>
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