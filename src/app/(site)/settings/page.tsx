'use client';

import Input from '../../components/core/input';
import ProfileIcon from '../../components/core/profileicon';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import arrowLeft from '@/public/arrow_left.png';
import whiteCheck from '@/public/check_white.png';
import axios from '@/src/utils/axios';

interface UserProfile {
  lastName: string;
  firstName: string;
  id: string;
  portfolioId: string;
  trial: string;
  trashFolderId: string;
  rootFolderId: string;
  authId: string | null;
  usedSpace: string;
  email: string;
}

function Settings() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [storage, setStorage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get<{ success: boolean; user: UserProfile }>('/api/profile');
        const { trial } = response.data.user;
        setUserProfile(response.data.user);

        switch (trial) {
          case 'basic':
            setStorage(100);
            break;

          case 'standard':
            setStorage(500);
            break;

          case 'premium':
            setStorage(2);
            break;

          default:
            setStorage(5);
        }
        setIsLoading(false); // Data has been fetched, stop loading
      } catch (error) {
        setUserProfile(null);
        setIsLoading(false); // Even in case of error, stop loading
      }
    };

    fetchUserProfile();
  }, []);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (isLoading) {
    // Display loading state
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex px-20 w-full flex-col gap-10 h-screen">
      <div className="w-full h-16 flex justify-between items-center">
        <Link href="/">
          <Image src={arrowLeft} alt="arrow_left" />
        </Link>
        <ProfileIcon />
      </div>

      <div className="w-full flex justify-between items-start">
        <div className="flex flex-col gap-10 w-[55%]">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-end">
              <p className="font-regular text-3xl">{userProfile?.usedSpace || '0 B'}</p>
              <p className="text-white opacity-40">
                {' '}
                used from {storage.toString()} {Number(storage) < 10 ? 'TB' : 'GB'}
              </p>
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

            {/* Plan Section */}
            {userProfile?.trial === 'basic' ? (
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
                      <p className="text-lg">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : userProfile?.trial === 'standard' ? (
              <div className="bg-[#191919] px-10 py-16 rounded-[2rem] flex flex-col justify-between h-[760px]">
                <div className="flex flex-col gap-2">
                  <h3 className="text-3xl font-extrabold">Standard Plan</h3>
                  <p className="text-[#BA9457] text-2xl">24.99 $US/month</p>
                </div>
                <ul className="text-[#E3E3E3]">
                  {[
                    '500 GB Storage',
                    'All features of the Basic Plan',
                    'Natural language search (multiple languages + voice search)',
                    'Automatic file hierarchy suggestion',
                    'Malicious files detection',
                    'Advanced file search (search by image, voice)',
                    'Automatic file translation (limited to 10 files per week)',
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center mb-4">
                      <Image src={whiteCheck} alt="Check" className="w-8 h-8 mr-2" />
                      <p className="text-lg">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-[#191919] px-10 py-16 rounded-[2rem] flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                  <h3 className="text-3xl font-extrabold">Premium Plan</h3>
                  <p className="text-[#8C57BA] text-2xl">49.99 $US/month</p>
                </div>
                <ul className="text-[#E3E3E3] mt-8">
                  {[
                    '2 TB Storage',
                    'All features of the Standard Plan',
                    'Unlimited automatic file translation',
                    'Enhanced data backup with versioning',
                    'Priority customer support',
                    'Possibility to deploy the app locally',
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center mb-4">
                      <Image src={whiteCheck} alt="Check" className="w-8 h-8 mr-2" />
                      <p className="text-lg">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right-hand side profile and usage information */}
        <div className="flex flex-col gap-10 w-[35%]">
          <div className="rounded-[24px] bg-dar-card p-12 flex flex-col gap-20">
            <div className="flex flex-col gap-6 items-center">
              <div className="rounded-full bg-[#151515] text-3xl h-24 w-24 font-regular flex items-center justify-center">
                <p>
                  {userProfile ? getInitials(userProfile.firstName, userProfile.lastName) : 'AB'}
                </p>
              </div>
              <p className="font-regular text-2xl">
                {userProfile
                  ? `${userProfile.firstName} ${userProfile.lastName}`
                  : 'Abdelkarim Bengherbia'}
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div className="flex justify-between">
                <Input
                  placeholder="Firstname"
                  isPassword={false}
                  isOTP={false}
                  value={userProfile ? userProfile.firstName : ''}
                />
                <Input
                  placeholder="LastName"
                  isPassword={false}
                  isOTP={false}
                  value={userProfile ? userProfile.lastName : ''}
                />
              </div>
              <Input
                placeholder="Email"
                isPassword={false}
                isOTP={false}
                value={userProfile ? userProfile.email : ''}
              />
            </div>
          </div>
          <div className="flex flex-col gap-8 w-full items-start">
            <p className="text-2xl font-regular">Usage</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col p-5 gap-4 text-xl bg-dar-card rounded-[8px] w-[150px]">
                <p>Photos</p>
                <p className="text-[#98429C]">0</p>
              </div>
              <div className="flex flex-col p-5 gap-4 text-xl bg-dar-card rounded-[8px] w-[150px]">
                <p>Documents</p>
                <p className="text-[#819C42]">6</p>
              </div>
              <div className="flex flex-col p-5 gap-4 text-xl bg-dar-card rounded-[8px] w-[150px]">
                <p>Videos</p>
                <p className="text-[#FF8418]">0</p>
              </div>
              <div className="flex flex-col p-5 gap-4 text-xl bg-dar-card rounded-[8px] w-[150px]">
                <p>Folder</p>
                <p className="text-[#1890FF]">3</p>
              </div>
              <div className="flex flex-col p-5 gap-4 text-xl bg-dar-card rounded-[8px] w-[150px]">
                <p>Tags</p>
                <p className="text-[#FADB14]">6</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
