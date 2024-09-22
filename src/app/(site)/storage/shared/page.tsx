'use client';

import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import arrowbtm from '@/public/arrow_btm.png';
import arrowUp from '@/public/arrow_up.png';
import magicBlue from '@/public/magicBlue.png';
import settingsOrange from '@/public/settings_orange.svg';
import Button from '@/src/app/components/core/button';

interface Workspace {
  imagePath: string;
  id: string;
  rootFolderId: string;
  name: string;
  members: {
    firstName: string;
    lastName: string;
    id: string;
    email: string;
  }[];
}

const SharedStorage = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/storage/shared');
        setWorkspaces(response.data.content);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      {loading ? (
        <div className="flex justify-center gap-6 h-full mt-20">
          <div className="text-center">
            <Image
              src={settingsOrange}
              alt="Loading Icon"
              className={`mx-auto mb-4 ${loading ? 'animate-spin' : ''}`}
            />
            <p className="text-2xl lg:text-4xl bg-Orange-gradient bg-clip-text text-transparent">
              Loading shared storages...
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {workspaces.map(workspace => (
            <button
              key={workspace.id}
              className="flex flex-col gap-y-4 items-center p-5 rounded-lg bg-dar-card"
              onClick={() => {
                router.push(`/storage/shared/${workspace.rootFolderId}`);
              }}
            >
              <img src={workspace.imagePath} className="w-60 h-52 object-cover rounded-md" />
              <h3 className="text-lg font-semibold text-white">{workspace.name}</h3>
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default SharedStorage;
