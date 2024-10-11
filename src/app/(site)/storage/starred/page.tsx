'use client';

import Button from '../../../components/core/button';
import FileCard from '../../../components/core/filecard';
import FileRow from '../../../components/core/filerow';
import FolderCard from '../../../components/core/foldercard';
import FolderRow from '../../../components/core/folderrow';
import Image from 'next/image';
import { useState } from 'react';
import { FaTh, FaList, FaChevronDown } from 'react-icons/fa';
import add from '@/public/add.png';
import arrowbtm from '@/public/arrow_btm.png';
import Lightarrowbtm from '@/public/arrow_btm_light.png';
import arrowUp from '@/public/arrow_up.png';
import LightarrowUp from '@/public/arrow_up_light.png';
import magicBlue from '@/public/magicBlue.png';
import useTheme from '@/src/hooks/useTheme';
import { Folder, File } from '@/src/types/shared';

const folders: Folder[] = [
  {
    id: '1',
    name: 'Important Docs',
    items: 12,
    size: '150 MB',
    color: 'blue',
    date: '15 June 2024',
  },
  { id: '2', name: 'Projects', items: 58, size: '700 MB', color: 'yellow', date: '20 May 2024' },
];

const files: File[] = [
  { id: '3', name: 'contract.pdf', size: '2.1 MB', date: '10 July 2024', url: '' },
  { id: '4', name: 'design.psd', size: '120 MB', date: '02 July 2024', url: '' },
];

const Starred = () => {
  const [isListView, setIsListView] = useState(false);
  const { theme } = useTheme();
  const isEmpty = folders.length === 0 && files.length === 0;

  const handleClick = () => {
    return 'hello';
  };

  return (
    <>
      <div className="flex justify-between items-center mb-16 mt-20">
        <div className="flex items-center gap-x-12">
          <div className="flex items-center gap-x-2">
            <h2 className="text-3xl font-normal">Starred</h2>
            <button>
              <FaChevronDown />
            </button>
          </div>
          <div className="hover:cursor-pointer">
            <Button
              text="Manage Starred"
              icon={<Image src={magicBlue} alt="" />}
              color={1}
              onClick={handleClick}
            />
          </div>
        </div>
        <div className="flex gap-4 lg:gap-8 items-center relative z-[50]">
          <div className="flex gap-2 lg:gap-4 items-center">
            <div
              className={`flex items-center cursor-pointer justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-[4px] ${!isListView && 'dark:bg-[#222222] bg-[#EFEFEF]'}`}
              onClick={() => setIsListView(false)}
              onKeyDown={event => {
                if (event.key === 'Enter' || event.key === ' ') {
                  setIsListView(false);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <FaTh
                className={`dark:text-white text-dar-card w-5 lg:w-6 ${!isListView && 'text-blue-500'}`}
              />
            </div>
            <div
              className={`flex items-center cursor-pointer justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-[4px] ${isListView && 'dark:bg-[#222222] bg-[#EFEFEF]'}`}
              onClick={() => setIsListView(true)}
              onKeyDown={event => {
                if (event.key === 'Enter' || event.key === ' ') {
                  setIsListView(true);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <FaList
                className={`dark:text-white text-dar-card w-5 lg:w-6 ${isListView && 'text-blue-500'}`}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="flex items-center px-3 py-2 lg:px-4 lg:py-2 rounded-full gap-2 dark:bg-[#252525] bg-[#ECECEC]">
              <p className="dark:text-white text-dar-card font-regular">Name</p>
              <Image src={theme === 'dark' ? arrowbtm : Lightarrowbtm} alt="arrowUp rotate-90" />
            </div>
            <Image src={theme === 'dark' ? arrowUp : LightarrowUp} alt="arrowUp" />
          </div>
        </div>
      </div>
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center h-[400px] text-center">
          <Image src={add} alt="No starred items" />
          <p className="text-2xl text-gray-400">No starred items</p>
        </div>
      ) : (
        <>
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
                  {files.map((file, index) => (
                    <FileRow key={index} name={file.name} size={file.size} date={file.date} />
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
              {files.map((file, index) => (
                <FileCard key={index} fileName={file.name} fileSize={file.size} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Starred;
