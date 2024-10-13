'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import arrowbtm from '@/public/arrow_btm.png';
import Lightarrowbtm from '@/public/arrow_btm_light.png';
import arrowUp from '@/public/arrow_up.png';
import LightarrowUp from '@/public/arrow_up_light.png';
import magicBlue from '@/public/magicBlue.png';
import settingsOrange from '@/public/settings_orange.svg';
import Button from '@/src/app/components/core/button';
import StorageContainer from '@/src/app/components/storage/container';
import ViewSwitcher from '@/src/app/components/storage/view-switcher';
import { Folder, File } from '@/src/types/shared';
import { fetchRecentFiles } from '@/src/utils/api/storage';

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
        const result = await fetchRecentFiles();
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

  const handleNavigation = (folderId: string) => {
    // Handle folder navigation logic
    return `Navigating to folder: ${folderId}`;
  };

  const handleDownload = (url: string, fileName: string) => {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

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
        {/* Breadcrumb (for Recents) and Enhanced File Hierarchy Button */}
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

        {/* Layout buttons and Enhanced File Hierarchy button for mobile */}
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-12 justify-center lg:justify-end w-full lg:w-auto">
          {/* Enhanced File Hierarchy Button for mobile */}
          <div className="block lg:hidden hover:cursor-pointer">
            <Button
              text="Enhanced File Hierarchy"
              icon={<Image src={magicBlue} alt="" />}
              color={1}
            />
          </div>

          {/* Layout view buttons (grid/list) */}
          <div className="flex gap-4 lg:gap-8 items-center relative z-[50]">
            <ViewSwitcher isListView={isListView} toggleView={setIsListView} />
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

      <StorageContainer
        isListView={isListView}
        isEmpty={isEmpty}
        folders={folders}
        files={files}
        onNavigate={handleNavigation}
        onDownload={handleDownload}
      />
    </>
  );
};

export default Recents;
