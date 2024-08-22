'use client';

import Image from 'next/image';
import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import arrowbtm from '@/public/arrow_btm.png';
import arrowUp from '@/public/arrow_up.png';
import earth from '@/public/images/earth.jpg';
import google from '@/public/images/google.jpg';
import magicBlue from '@/public/magicBlue.png';
import Button from '@/src/app/components/core/button';

// Replace with your actual image paths

const sharedWorkspaces = [
  { name: 'A2SV K3A Workspace', image: google },
  { name: 'A2SV K3A Workspace', image: earth },
];

const SharedStorage = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-16 mt-20">
        <div className="flex items-center gap-x-12">
          <div className="flex items-center gap-x-2">
            <h2 className="text-3xl font-normal">My Storage</h2>
            <button>
              <FaChevronDown />
            </button>
          </div>
          <div className="hover:cursor-pointer">
            <Button
              text="Enhanced File Hierarchy"
              icon={<Image src={magicBlue} alt="" />}
              color={1}
              onClick={() => 'clicked'}
            />
          </div>
        </div>
        <div className="flex gap-8 items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center px-4 py-2 rounded-full gap-2 bg-[#252525]">
              <p className="text-white font-regular">Name</p>
              <Image src={arrowbtm} alt="arrowUp rotate-90" />
            </div>
            <Image src={arrowUp} alt="arrowUp" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {sharedWorkspaces.map((workspace, index) => (
          <button
            key={index}
            className="flex flex-col gap-y-4 items-center p-5 rounded-lg bg-dar-card"
          >
            <Image
              src={workspace.image}
              alt={workspace.name}
              className="w-60 h-52 object-cover rounded-md"
            />

            <h3 className="text-lg font-semibold text-white">{workspace.name}</h3>
          </button>
        ))}
      </div>
    </>
  );
};

export default SharedStorage;
