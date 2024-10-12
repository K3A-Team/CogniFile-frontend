'use client';

import Button from '../../../core/button';
import StorageContainer from '../../container';
import ViewSwitcher from '../../view-switcher';
import TrashModal from '../modal';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import arrowbtm from '@/public/arrow_btm.png';
import Lightarrowbtm from '@/public/arrow_btm_light.png';
import arrowUp from '@/public/arrow_up.png';
import LightarrowUp from '@/public/arrow_up_light.png';
import magicBlue from '@/public/magicBlue.png';
import settingsOrange from '@/public/settings_orange.svg';
import useTheme from '@/src/hooks/useTheme';
import { FolderResponse } from '@/src/types/responses';
import { Folder, File } from '@/src/types/shared';
import api from '@/src/utils/axios';

const TrashPage = ({ folderId }: { folderId: string }) => {
  const { theme } = useTheme();
  const [isListView, setIsListView] = useState(false);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const transformResponse = (res: FolderResponse) => {
      const { folder } = res;

      const filesPart = folder.files.map(file => ({
        id: file.id,
        name: file.name,
        size: file.size,
        date: 'Unknown',
        url: file.url,
      }));

      const foldersPart = folder.subFolders.map(subFolder => ({
        id: subFolder.id,
        name: subFolder.name,
        items: subFolder.children,
        size: 'Unknown',
        color: 'blue',
        date: 'Unknown',
      }));

      return { foldersPart, filesPart };
    };

    api
      .post(`/api/folders`, { folderId })
      .then(res => {
        const transformed = transformResponse(res.data);
        setFolders(transformed.foldersPart);
        setFiles(transformed.filesPart);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [folderId]);

  const isEmpty = folders.length === 0 && files.length === 0;

  const handleEmptyTrash = () => {
    api.delete(`/api/trash`).then(() => {
      setFolders([]);
      setFiles([]);
    });
    setShowModal(false);
  };

  const handleNavigation = () => {
    // Logic to navigate to folder
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
      <div className="flex justify-center gap-6 h-full mt-20 lg:mt-60">
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
      {/* Header with "Trash" title and buttons */}
      <div className="flex justify-between items-center mb-16 mt-20">
        <div className="flex items-center gap-x-12">
          <div className="flex items-center gap-x-2">
            <h2 className="text-3xl font-normal">Trash</h2>
            <button>
              <FaChevronDown />
            </button>
          </div>
          <div className="hover:cursor-pointer">
            <Button
              text="Empty Trash"
              icon={<Image src={magicBlue} alt="" />}
              color={1}
              onClick={() => setShowModal(true)}
            />
          </div>
        </div>

        {/* View Switcher (grid/list) */}
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

      {/* Content (folders and files) */}
      <StorageContainer
        isListView={isListView}
        isEmpty={isEmpty}
        folders={folders}
        files={files}
        onNavigate={handleNavigation}
        onDownload={handleDownload}
      />

      {/* Empty Trash Confirmation Modal */}
      <TrashModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleEmptyTrash}
      />
    </>
  );
};

export default TrashPage;
