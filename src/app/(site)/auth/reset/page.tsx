'use client';

import Link from 'next/link';
import { useState } from 'react';
import Input from '@/src/app/components/core/input';
import MiniFooter from '@/src/app/components/core/miniFooter';
import MiniNavbar from '@/src/app/components/core/miniNavbar';

type OnContinueFunction = () => void;
interface StepProps {
  onContinue: OnContinueFunction;
}

function Step1({ onContinue }: StepProps) {
  const [email, setEmail] = useState('');
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onContinue();
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <MiniNavbar />
      <div className="md:py-24 md:px-36 py-16 px-8 w-[90%] md:w-auto md:min-w-[40%] bg-[#191919] rounded-[1rem] flex flex-col items-center justify-center gap-12">
        <div className="flex flex-col gap-10 items-center justify-center w-full">
          <div className="flex flex-col gap-4 items-center justify-center w-full">
            <h2 className="font-semibold text-white text-3xl text-center">Reset your password</h2>
            <p className="text-white opacity-40 font-medium text-sm text-center">
              Manage your password using your mail adress
            </p>
          </div>
          <div className="flex flex-col gap-6 w-full">
            <Input
              placeholder="Email"
              isPassword={false}
              isOTP={false}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(event.target.value)
              }
              value={email}
            />
            <button
              className="w-full bg-gradient-to-r from-[#DEDEDE] to-[#787878] text-cf-dark font-semibold rounded-full px-16 py-4 text-2xl"
              onClick={handleSubmit}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <MiniFooter />
    </div>
  );
}

function Step2({ onContinue }: StepProps) {
  const [one, setOne] = useState('');
  const [two, setTwo] = useState('');
  const [three, setThree] = useState('');
  const [four, setFour] = useState('');
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onContinue();
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <MiniNavbar />
      <div className="md:py-24 md:px-36 py-16 px-8 w-[90%] md:w-auto md:min-w-[40%] bg-[#191919] rounded-[1rem] flex flex-col items-center justify-center gap-12">
        <div className="flex flex-col gap-10 items-center justify-center w-full">
          <div className="flex flex-col gap-4 items-center justify-center w-full">
            <h2 className="font-semibold text-white text-3xl text-center">Reset your password</h2>
            <p className="text-white opacity-40 font-medium text-sm text-center">
              Manage your password using your mail adress
            </p>
          </div>
          <div className="flex flex-col gap-6 w-full justify-center items-center">
            <div className="flex w-full justify-between">
              <div>
                <Input
                  placeholder=""
                  isPassword={false}
                  isOTP
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setOne(event.target.value)
                  }
                  value={one}
                />
              </div>
              <div>
                <Input
                  placeholder=""
                  isPassword={false}
                  isOTP
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setTwo(event.target.value)
                  }
                  value={two}
                />
              </div>
              <div>
                <Input
                  placeholder=""
                  isPassword={false}
                  isOTP
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setThree(event.target.value)
                  }
                  value={three}
                />
              </div>
              <div>
                <Input
                  placeholder=""
                  isPassword={false}
                  isOTP
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setFour(event.target.value)
                  }
                  value={four}
                />
              </div>
            </div>
            <button
              className="w-full bg-gradient-to-r from-[#DEDEDE] to-[#787878] text-cf-dark font-semibold rounded-full px-16 py-4 text-2xl"
              onClick={handleSubmit}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <MiniFooter />
    </div>
  );
}

function Step3({ onContinue }: StepProps) {
  const [password, setPassword] = useState('');
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onContinue();
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <MiniNavbar />
      <div className="md:py-24 md:px-36 py-16 px-8 w-[90%] md:w-auto md:min-w-[40%] bg-[#191919] rounded-[1rem] flex flex-col items-center justify-center gap-12">
        <div className="flex flex-col gap-10 items-center justify-center w-full">
          <div className="flex flex-col gap-4 items-center justify-center w-full">
            <h2 className="font-semibold text-white text-3xl text-center">Reset your password</h2>
            <p className="text-white opacity-40 font-medium text-sm text-center">
              Manage your password using your mail adress
            </p>
          </div>
          <div className="flex flex-col gap-6 w-full">
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
                setPassword(event.target.value)
              }
              value={password}
            />
            <button
              className="w-full bg-gradient-to-r from-[#DEDEDE] to-[#787878] text-cf-dark font-semibold rounded-full px-16 py-4 text-2xl"
              onClick={handleSubmit}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <MiniFooter />
    </div>
  );
}

function Step4() {
  return (
    <div className="relative w-screen flex items-center justify-center">
      <MiniNavbar />
      <div className="md:py-24 md:px-36 py-16 px-8 w-[90%] md:w-auto md:min-w-[40%] bg-[#191919] rounded-[1rem] flex flex-col items-center justify-center gap-12">
        <div className="flex flex-col gap-10 items-center justify-center w-full">
          <div className="flex flex-col gap-4 items-center justify-center w-full">
            <h2 className="font-semibold text-white text-3xl text-center">
              Password updated successfully
            </h2>
            <p className="text-white opacity-40 font-medium text-xl text-center">
              Your password has been updated successfully, you can{' '}
              <br className="hidden md:block"></br> always reset your password for more security
            </p>
          </div>
          <Link className="flex flex-col gap-6 w-full" href={'/auth/login'}>
            <button className="w-full bg-gradient-to-r from-[#DEDEDE] to-[#787878] text-cf-dark font-semibold rounded-full px-16 py-4 text-2xl">
              Continue
            </button>
          </Link>
        </div>
      </div>
      <MiniFooter />
    </div>
  );
}

export default function Reset() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  switch (currentStep) {
    case 1:
      return <Step1 onContinue={nextStep} />;

    case 2:
      return <Step2 onContinue={nextStep} />;

    case 3:
      return <Step3 onContinue={nextStep} />;

    case 4:
      return <Step4 />;

    default:
      return null;
  }
}
