'use client';

import Input from '../../components/core/input';
import ProfileIcon from '../../components/core/profileicon';
import Image from 'next/image';
import React from 'react';
import arrowLeft from '@/public/arrow_left.png';
import whiteCheck from '@/public/check_white.png';

function Settings() {
  return (
    <div className="flex px-20 w-full flex-col gap-10 h-screen">
      <div className="w-full h-16 flex justify-between items-center">
        <Image src={arrowLeft} alt="arrow_left" />
        <ProfileIcon />
      </div>

      <div className="w-full flex justify-between items-start">
        <div className="flex flex-col gap-10 w-[55%]">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-end">
              <p className="font-regular text-3xl">1,18 GO</p>
              <p className="text-white opacity-40">used from 100GO</p>
            </div>
            <div className="rounded-full bg-[#F2F2F2] h-1 w-full">
              <div className="rounded-full bg-[#E63C18] h-1 w-4"></div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex justify-between w-full items-center">
              <p className="text-2xl font-regular">Current Plan</p>
              <button className="bg-cf-gray-two py-2 px-6 rounded-md text-white">
                Upgrade Storage Size
              </button>
            </div>

            <div className="bg-[#191919] px-10 py-16 rounded-[2rem] flex flex-col justify-between h-[640px]">
              <div className="flex flex-col gap-2">
                <h3 className="text-3xl font-extrabold">Basic Plan</h3>
                <p className="text-[#6EBA57] text-2xl">9.99 $US/month</p>
              </div>
              <ul className="text-[#E3E3E3]">
                {[
                  '100 GB Storage',
                  'Chatbot',
                  'Natural language search',
                  'Automatic file categorization and tagging',
                  'Duplicate files detection',
                  'Automatic version control detection',
                  'Data backup',
                ].map((feature, index) => (
                  <li key={index} className="flex items-center mb-4">
                    <Image src={whiteCheck} alt="Check" className="w-8 h-8 mr-2" />
                    <p className="text-lg md:text-sm lg:text-md xl:text-lg">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10 w-[35%]">
          <div className="rounded-[24px] bg-dar-card p-12 flex flex-col gap-20">
            <div className="flex flex-col gap-6 items-center">
              <div className="rounded-full bg-[#151515] text-3xl h-24 w-24 font-regular flex items-center justify-center">
                <p>AB</p>
              </div>
              <p className="font-regular text-2xl">Abdelkarim Bengherbia</p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Input
                placeholder="Email"
                isPassword={false}
                isOTP={false}
                value={'la_bengherbia@esi.dz'}
              />
              <Input placeholder="Email" isPassword={true} isOTP={false} value={'***********'} />
            </div>
          </div>
          <div className="flex flex-col gap-8 w-full items-start">
            <p className="text-2xl font-regular">Usage</p>
            <div className="grid gap-2 grid-cols-3">
              <div className="flex flex-col p-5 gap-4 text-xl bg-dar-card rounded-[8px] w-[150px]">
                <p>Photos</p>
                <p className="text-[#98429C]">302</p>
              </div>
              <div className="flex flex-col p-5 gap-4 text-xl bg-dar-card rounded-[8px] w-[150px]">
                <p>Documents</p>
                <p className="text-[#819C42]">600</p>
              </div>
              <div className="flex flex-col p-5 gap-4 text-xl bg-dar-card rounded-[8px] w-[150px]">
                <p>Videos</p>
                <p className="text-[#FF8418]">40</p>
              </div>
              <div className="flex flex-col p-5 gap-4 text-xl bg-dar-card rounded-[8px] w-[150px]">
                <p>Folder</p>
                <p className="text-[#1890FF]">40</p>
              </div>
              <div className="flex flex-col p-5 gap-4 text-xl bg-dar-card rounded-[8px] w-[150px]">
                <p>Tags</p>
                <p className="text-[#FADB14]">4</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
