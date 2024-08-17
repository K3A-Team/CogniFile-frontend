'use client';

import Button from '../../components/core/button';
import FolderCard from '../../components/core/foldercard';
import FolderRow from '../../components/core/folderrow';
import Image from 'next/image';
import { useState } from 'react';
import { FaTh, FaList, FaChevronDown } from 'react-icons/fa';
import arrowbtm from '@/public/arrow_btm.png';
import arrowUp from '@/public/arrow_up.png';
import magicBlue from '@/public/magicBlue.png';

const folders = [
  { name: 'Slide', items: 54, size: '223 MB', color: 'blue', date: '20 July 2024' },
  { name: 'Gathering', items: 230, size: '322 MB', color: 'yellow', date: '20 July 2024' },
  { name: 'Design', items: 2153, size: '500 MB', color: 'blue', date: '20 July 2024' },
  { name: 'Memory', items: 650, size: '890 MB', color: 'yellow', date: '20 July 2024' },
  { name: 'Directory', items: 12, size: '40 MB', color: 'green', date: '20 July 2024' },
  { name: 'Ebook', items: 24, size: '12 MB', color: 'green', date: '20 July 2024' },
  { name: 'Tools', items: 550, size: '126 MB', color: 'green', date: '20 July 2024' },
  { name: 'Library', items: 344, size: '980 MB', color: 'green', date: '20 July 2024' },
  { name: 'Familiy', items: 210, size: '441 MB', color: 'yellow', date: '20 July 2024' },
  { name: 'Office Work', items: 403, size: '140 MB', color: 'blue', date: '20 July 2024' },
];

const MyStorage = () => {
  const [isListView, setIsListView] = useState(false);

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
            />
          </div>
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
      {isListView ? (
        <div className="w-full">
          <table className="table-auto w-full text-left">
            <tbody className="space-y-6">
              {folders.map((folder, index) => (
                <FolderRow
                  key={index}
                  color={folder.color}
                  name={folder.name}
                  items={folder.items}
                  size={folder.size}
                  date={folder.date}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {folders.map((folder, index) => (
            <FolderCard
              key={index}
              color={folder.color}
              name={folder.name}
              items={folder.items}
              size={folder.size}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default MyStorage;
