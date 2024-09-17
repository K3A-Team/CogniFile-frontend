'use client';

import Image from 'next/image';
import React, { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import eyeOff from '@/public/eye-off.webp';
import eyeOn from '@/public/eye-on.webp';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  isPassword: boolean;
  isOTP: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  //eslint-disable-next-line
  register?: UseFormRegister<any>;
}

const Input = ({
  placeholder,
  isPassword,
  isOTP,
  onChange,
  value,
  register,
  ...rest
}: InputProps) => {
  const [inputType, setInputType] = useState(isPassword ? 'password' : 'text');

  const togglePasswordVisibility = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  return (
    <div className="relative w-full">
      <input
        type={inputType}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={`${isOTP ? '2xl:w-24 2xl:h-24 md:w-18 md:h-18 h-16 w-16 bg-[#474747] rounded-[16px] 2xl:rounded-[20px] border-2 border-[#474747] font-semibold text-3xl focus:border-white focus:outline-none text-white text-center flex items-center justify-center' : 'w-full px-8 py-5 placeholder:text-[#989898] text-[16px] text-white bg-[#303030] rounded-full outline-none'}`}
        {...register}
        {...rest}
      />
      {isPassword && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-8 top-1/2 transform -translate-y-1/2"
        >
          {inputType === 'password' ? (
            <Image src={eyeOff} alt="Shape 5" className="h-6 w-auto" />
          ) : (
            <Image src={eyeOn} alt="Shape 5" className="h-6 w-auto" />
          )}
        </button>
      )}
    </div>
  );
};

export default Input;
