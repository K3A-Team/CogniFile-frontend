'use client';

import Button from '../../../components/core/button';
import FileCard from '../../../components/core/filecard';
import FileRow from '../../../components/core/filerow';
import FolderCard from '../../../components/core/foldercard';
import FolderRow from '../../../components/core/folderrow';
import axios from 'axios';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaTh, FaList, FaChevronDown } from 'react-icons/fa';
import add from '@/public/add.png';
import arrowbtm from '@/public/arrow_btm.png';
import Lightarrowbtm from '@/public/arrow_btm_light.png';
import arrowUp from '@/public/arrow_up.png';
import LightarrowUp from '@/public/arrow_up_light.png';
import magicBlue from '@/public/magicBlue.png';
import settingsOrange from '@/public/settings_orange.svg';
import { useTheme } from '@/src/app/components/core/theme';
import { Folder, File } from '@/src/types/shared';

type RecentItem = {
  name: string;
  size: string;
  children: number;
  interactionDate: string;
  type: 'folder' | 'file';
};

const Recents = () => {
  const [isListView, setIsListView] = useState(false);
  const { theme } = useTheme();
  const [folders, setFolders] = useState<Folder[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/storage/recent');
        const { result } = response.data;

        const parsedFolders: Folder[] = result
          .filter((item: RecentItem) => item.type === 'folder')
          .map((folder: RecentItem, index: number) => ({
            id: index.toString(),
            name: folder.name,
            items: folder.children,
            size: folder.size,
            color: index % 2 === 0 ? 'blue' : 'yellow',
            date: new Date(folder.interactionDate).toLocaleDateString(),
          }));

        const parsedFiles: File[] = result
          .filter((item: RecentItem) => item.type === 'file')
          .map((file: RecentItem, index: number) => ({
            id: index + parsedFolders.length,
            name: file.name,
            size: file.size,
            date: new Date(file.interactionDate).toLocaleDateString(),
          }));

        setFolders(parsedFolders);
        setFiles(parsedFiles);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const isEmpty = folders.length === 0 && files.length === 0;

  if (loading) {
    return (
      <div className="flex justify-center gap-6 h-full mt-20">
        <div className="text-center">
          <Image
            src={settingsOrange}
            alt="Loading Icon"
            className={`mx-auto mb-4 ${loading ? 'animate-spin' : ''}`}
          />
          <p className="text-2xl lg:text-4xl bg-Orange-gradient bg-clip-text text-transparent">
            Loading files and folders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col-reverse gap-6 lg:flex-row lg:justify-between items-start lg:items-center mb-8 lg:mb-16 mt-10 lg:mt-20">
        {/* Breadcrumb (always aligned left) and second Enhanced File Hierarchy Button for large screens */}
        <div className="w-full lg:w-auto flex justify-start items-center gap-4">
          <div className="flex items-center gap-x-2">
            <h2 className="text-xl lg:text-3xl font-normal">Recents</h2>
            <button className="text-lg lg:text-2xl">
              <FaChevronDown />
            </button>
          </div>

          {/* Second Enhanced File Hierarchy Button for large screens */}
          <div className="hidden lg:block hover:cursor-pointer">
            <Button
              text="Enhanced File Hierarchy"
              icon={<Image src={magicBlue} alt="" />}
              color={1}
            />
          </div>
        </div>

        {/* Layout buttons and first Enhanced File Hierarchy button for mobile */}
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-12 justify-center lg:justify-end w-full lg:w-auto">
          {/* First Enhanced File Hierarchy Button for mobile */}
          <div className="block lg:hidden hover:cursor-pointer">
            <Button
              text="Enhanced File Hierarchy"
              icon={<Image src={magicBlue} alt="" />}
              color={1}
            />
          </div>

          {/* Layout view buttons (grid/list) */}
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
      </div>
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center h-[400px] text-center">
          <Image src={add} alt="No recent items" />
          <p className="text-lg lg:text-2xl text-gray-400">No recent items</p>
        </div>
      ) : (
        <>
          {isListView ? (
            <div className="w-full overflow-x-auto">
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
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

export default Recents;
