'use client';

import Button from '../../core/button';
import Cardadd from '../../core/cardadd';
import BreadcrumbComponent from '../breadcrumb';
import StorageContainer from '../container';
import HierarchySuggestion from '../hiarechy-suggestion';
import ViewSwitcher from '../view-switcher';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import arrowbtm from '@/public/arrow_btm.png';
import Lightarrowbtm from '@/public/arrow_btm_light.png';
import arrowUp from '@/public/arrow_up.png';
import LightarrowUp from '@/public/arrow_up_light.png';
import magicBlue from '@/public/magicBlue.png';
import settingsOrange from '@/public/settings_orange.svg';
import useTheme from '@/src/hooks/useTheme';
import { Folder, File } from '@/src/types/shared';
import {
  createFolder,
  fetchBreadcrumbs,
  removeFile,
  removeFolder,
  uploadFile,
} from '@/src/utils/api/storage';
import api from '@/src/utils/axios';
import { transformResponse } from '@/src/utils/helpers/file';

const StorageMain = ({ folderId }: { folderId: string }) => {
  const router = useRouter();
  const { theme } = useTheme();
  const [isListView, setIsListView] = useState(false);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [breadcrumbItems, setBreadcrumbItems] = useState<
    { folderId: string; folderName: string }[]
  >([]);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    api
      .post(`/api/folders`, { folderId })
      .then(res => {
        const transformed = transformResponse(res.data);

        setFolders(transformed.folderspart);
        setFiles(transformed.filespart);
        fetchBreadcrumbs(folderId).then(items => {
          setLoading(false);
          setBreadcrumbItems(items);
        });
      })
      .catch(err => {
        setLoading(false);
        throw new Error(err.message);
      });
  }, [folderId]);

  const isEmpty = folders.length === 0 && files.length === 0;

  const handleEnhancedFileStructureClick = () => {
    setIsModalOpen(true);
  };

  const handleRemoveFile = (id: string) => {
    removeFile(id).then(() => {
      setFiles(prev => prev.filter(file => file.id !== id));
    });
  };

  const handleRemoveFolder = (id: string) => {
    removeFolder(id).then(() => {
      setFolders(prev => prev.filter(folder => folder.id !== id));
    });
  };
  const handleDownload = (url: string, fileName: string) => {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor); // Append to the DOM
    anchor.click(); // Trigger download
    document.body.removeChild(anchor); // Remove from the DOM
  };

  const handleNavigation = (folderId: string) => {
    router.push(`/storage/${folderId}`);
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

  const handleUploadFile = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files ? target.files[0] : null;
      if (file) {
        try {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('folderId', folderId);
          const result = await uploadFile(formData);
          setFiles(prev => [
            ...prev,
            {
              id: result.file.id,
              name: result.file.name,
              size: result.file.size,
              date: result.file.interactionDate.split('T')[0],
              url: result.file.URL,
            },
          ]);
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error('An unknown error occurred');
          }
        }
      }
    };
    input.click();
    setIsMenuVisible(false);
  };

  const handleCreatingFolder = async () => {
    setIsCreatingFolder(true);
  };

  const handleFolderCancel = () => {
    setIsCreatingFolder(false);
  };

  const handleFolderCreate = async (Name: string) => {
    try {
      const formData = new FormData();
      formData.append('folderName', Name);
      formData.append('folderId', folderId);

      const result = await createFolder(formData);

      setFolders(prev => [
        ...prev,
        {
          id: result.folder.id,
          name: result.folder.name,
          items: 0,
          size: 'Unknown',
          color: 'blue',
          date: result.folder.interactionDate.split('T')[0],
        },
      ]);
    } catch (error) {
      throw new Error('Folder creation failed');
    }
    setIsCreatingFolder(false);
    setIsMenuVisible(false);
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <>
      <div className="flex flex-col-reverse gap-6 lg:flex-row lg:justify-between items-start lg:items-center mb-8 lg:mb-16 mt-10 lg:mt-20">
        {/* Breadcrumb (always aligned left) and second Enhanced File Hierarchy Button for large screens */}
        <div className="w-full lg:w-auto flex justify-start items-center gap-4">
          <BreadcrumbComponent
            items={breadcrumbItems}
            handleCreatingFolder={handleCreatingFolder}
            handleUploadFile={handleUploadFile}
            toggleMenu={toggleMenu}
            isMenuVisible={isMenuVisible}
          />

          {/* Second Enhanced File Hierarchy Button for large screens */}
          <div className="hidden lg:block hover:cursor-pointer">
            <Button
              text="Enhanced File Hierarchy"
              icon={<Image src={magicBlue} alt="" />}
              color={1}
              onClick={handleEnhancedFileStructureClick}
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
              onClick={handleEnhancedFileStructureClick}
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
        onRemoveFolder={handleRemoveFolder}
        onRemoveFile={handleRemoveFile}
      />

      {isCreatingFolder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Cardadd
            title="New Folder"
            inputPlaceholder="Folder Name"
            onCancel={handleFolderCancel}
            onCreate={handleFolderCreate}
          />
        </div>
      )}

      {/* Center chatbot icon */}
      {isModalOpen && (
        <HierarchySuggestion onClose={() => setIsModalOpen(false)} folderId={folderId} />
      )}
    </>
  );
};

export default StorageMain;
