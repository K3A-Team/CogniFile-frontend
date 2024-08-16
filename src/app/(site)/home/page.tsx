'use client';

import Button from '../../components/core/button';
import Search from '../../components/core/search';
import Sidebar from '../../components/core/sidebar';
import Image from 'next/image';
import { useState } from 'react';
import { FaList, FaTh } from 'react-icons/fa';
import arrowbtm from '@/public/arrow_btm.png';
import arrowUp from '@/public/arrow_up.png';
import magicBlue from '@/public/magicBlue.png';
import magicOrange from '@/public/magicOrange.png';
import magicRed from '@/public/magicRed.png';
import params from '@/public/params.svg';

const Home = () => {
  const [isListView, setIsListView] = useState(false);

  return (
    <div className="flex h-screen gap-0 w-screen">
      <Sidebar />
      <div className="flex px-20 py-12 w-[85%] flex-col gap-10">
        <div className="w-full h-16 flex justify-end items-center">
          <div className="flex gap-8 items-center">
            <Image src={params} alt="params" className="w-10" />
            <div className="rounded-full bg-dar-card text-xl h-16 w-16 font-regular flex items-center justify-center">
              <p>AB</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full gap-16">
          <div className="flex flex-col gap-10 items-center">
            <div className="flex gap-12">
              <div className="hover:cursor-pointer">
                <Button
                  text="Enhanced File Hierarchy"
                  icon={<Image src={magicBlue} alt="" />}
                  color={1}
                />
              </div>
              <div className="hover:cursor-pointer">
                <Button
                  text="Remove duplications"
                  icon={<Image src={magicOrange} alt="" />}
                  color={2}
                />
              </div>
              <div className="hover:cursor-pointer">
                <Button
                  text="Malicious file detector"
                  icon={<Image src={magicRed} alt="" />}
                  color={3}
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-8">
              <div className="scale-[1.3]">
                <Search />
              </div>

              <div className="flex gap-8 items-center">
                <div className="flex gap-4 items-center">
                  <div
                    className="flex items-center cursor-pointer justify-center w-14 h-14 rounded-[4px] bg-[#222222]"
                    onClick={() => setIsListView(false)}
                    onKeyDown={event => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        setIsListView(false);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <FaTh className={`text-white w-6 ${!isListView && 'text-blue-500'}`} />
                  </div>
                  <div
                    className="flex items-center cursor-pointer justify-center w-14 h-14 rounded-[4px] bg-[#222222]"
                    onClick={() => setIsListView(true)}
                    onKeyDown={event => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        setIsListView(true);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <FaList className={`text-white w-6 ${isListView && 'text-blue-500'}`} />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center px-4 py-2 rounded-full gap-2 bg-[#252525]">
                    <p className="text-white font-regular">Name</p>
                    <Image src={arrowbtm} alt="arrowUp rotate-90" />
                  </div>
                  <Image src={arrowUp} alt="arrowUp" />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-8 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((folder, index) => (
              <div key={index} className="w-[171px] h-[200px] bg-[#252525]"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
