'use client'

import axios from 'axios';
import { useState } from 'react';
import Input from '@/src/app/components/core/input';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type Form = {
    email?: string;
    token: string;
    new_password: string;
    new_password_confirm: string;
}

interface LoginSuccessResponse {
    success: true;
    message: string;
}

interface LoginErrorResponse {
    success: false;
    message: string;
}

function ResetFormView({ email, token } : { email?: string, token?: string }) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const router = useRouter();

    const { register, formState: { errors }, handleSubmit: onSubmit, watch } = useForm<Form>({
        defaultValues: {
            email: email ?? '',
            token: token ?? '',
            new_password: '',
            new_password_confirm: '',
        },
    });
    
    const handleReset = async (data: Form) => {
        setError('');
        setLoading(true);

        try {
            const response = await axios.post<LoginSuccessResponse | LoginErrorResponse>(
                '/api/auth/reset-password',
                {
                    email: data.email,
                    token: data.token,
                    new_password: data.new_password,
                },
            );

            if (response.data.success) {
                setSuccess(response?.data?.message ?? 'Password reset successful');
                await new Promise(resolve => setTimeout(resolve, 3500));
                router.push('/auth/login');
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'An error occurred during the request');
            } else {
                setError('An unexpected error occurred');
            }
            await new Promise(resolve => setTimeout(resolve, 3500));
            router.push('/');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmit(handleReset)} className="flex flex-col gap-6 w-full">
            <div className='flex justify-center gap-2 flex-col w-full'>
                <Input
                    placeholder="Password"
                    isPassword
                    isOTP={false}
                    //@ts-ignore
                    register={
                        register('new_password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters',
                            },
                        })
                    }
                />
                {
                    errors.new_password && <p className="text-[#b73939] font-medium text-sm w-full text-left ml-4">{errors.new_password.message}</p>
                }
            </div>
            <div className='flex justify-center gap-2 flex-col w-full'>
                <Input
                    placeholder="Cofirm Password"
                    isPassword
                    isOTP={false}
                    //@ts-ignore
                    register={
                        register('new_password_confirm', {
                            required: 'Password field is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters',
                            },
                            validate: value => value === watch('new_password') || 'Passwords do not match',
                        })
                    }
                />
                {
                    errors.new_password_confirm && <p className="text-[#b73939] font-medium text-sm w-full text-left ml-4">{errors.new_password_confirm.message}</p>
                }
            </div>
            {
                !!error && <p className="text-[#b73939] font-medium text-xl w-full flex text-center justify-center" style={{ lineBreak: 'anywhere' }}>{error}</p>
            }
            {
                !!success && <p className="text-green font-medium text-xl w-full flex text-center justify-center" style={{ lineBreak: 'anywhere' }}>{success}</p>
            }
            <button
                type="submit"
                className={`w-full bg-gradient-to-r from-[#DEDEDE] to-[#787878] text-cf-dark font-semibold rounded-full py-4 text-xl transition duration-300 ease-in-out transform hover:from-[#c0c0c0] hover:to-[#5e5e5e] hover:shadow-lg flex items-center justify-center ${
                    loading ? 'cursor-not-allowed' : ''
                }`}
                disabled={loading}
            >
                {loading ? (
                    <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                ) : (
                    'Reset Password'
                )}
            </button>
        </form>
    );
}

export default ResetFormView;