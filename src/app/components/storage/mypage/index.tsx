'use client';

import Breadcrumb from '../../core/breadcrumb';
import Button from '../../core/button';
import Cardadd from '../../core/cardadd';
import FileCard from '../../core/filecard';
import FileRow from '../../core/filerow';
import FolderCard from '../../core/foldercard';
import CombinedComponent from '../../core/foldergrid';
import FolderRow from '../../core/folderrow';
import MenuCard from '../../core/menucard';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaTh, FaList } from 'react-icons/fa';
import add from '@/public/add.png';
import arrowbtm from '@/public/arrow_btm.png';
import arrowUp from '@/public/arrow_up.png';
import magicBlue from '@/public/magicBlue.png';
import settingsOrange from '@/public/settings_orange.svg';
import { FolderResponse } from '@/src/types/responses';
import { Folder, File } from '@/src/types/shared';
import api from '@/src/utils/axios';

const MyPage = ({ folderId }: { folderId: string }) => {
  const router = useRouter();
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
    const transformResponse = (res: FolderResponse) => {
      const { folder } = res;

      const filespart = folder.files.map(file => ({
        id: file.id,
        name: file.name,
        size: file.size,
        date: 'Unknown',
        url: file.url,
      }));

      const folderspart = folder.subFolders.map(subFolder => ({
        id: subFolder.id,
        name: subFolder.name,
        items: subFolder.children,
        size: 'Unknown',
        color: 'blue',
        date: 'Unknown',
      }));

      return { folderspart, filespart };
    };

    const fetchBreadcrumbs = async (initialFolderId: string) => {
      const items = [];
      let currentFolderId = initialFolderId;
      let currentFolder = null;

      while (currentFolderId) {
        const res = await api.post(`/api/folders`, { folderId: currentFolderId });
        currentFolder = res.data.folder;

        items.unshift({
          folderId: currentFolder.id,
          folderName: currentFolder.parent ? currentFolder.name : 'My Storage',
        });

        currentFolderId = currentFolder.parent ? currentFolder.parent.id : null;
      }

      setBreadcrumbItems(items);
    };

    api
      .post(`/api/folders`, { folderId })
      .then(res => {
        const transformed = transformResponse(res.data);

        setFolders(transformed.folderspart);
        setFiles(transformed.filespart);
        fetchBreadcrumbs(folderId).then(() => setLoading(false));
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
    api.delete(`/api/files/${id}`).then(() => {
      setFiles(prev => prev.filter(file => file.id !== id));
    });
  };

  const handleRemoveFolder = (id: string) => {
    api.delete(`/api/folders/${id}`).then(() => {
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
          const response = await fetch('/api/files/upload', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            return response
              .clone()
              .json()
              .then(data => {
                throw new Error(data.message);
              });
          }

          const result = await response.json();
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

      const response = await fetch('/api/folders/create', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Folder creation failed');
      }

      const result = await response.json();

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

  const handleUploadFolder = async () => {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.webkitdirectory = true;
      input.multiple = true;
  
      const fileSelectionPromise = new Promise<FileList | null>((resolve) => {
        input.onchange = (event) => {
          const target = event.target as HTMLInputElement;
          resolve(target.files);
        };
      });
  
      input.click();
  
      const files = await fileSelectionPromise;
  
      if (!files || files.length === 0) {
        console.log('No folder selected');
        alert('No folder selected');
        return;
      }

      toggleMenu();
    
      const formData = new FormData();

      formData.append('folderId', folderId);

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fullPath = file.webkitRelativePath || file.name;
        formData.append('files', file, fullPath);
      }


      const response = await fetch('/api/folders/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Folder upload failed');
      }

      const result = await response.json();

      console.log(result)  

      setFolders(prev => [
        ...prev,
        {
          id: result.folder.id,
          name: result.folder.name,
          items: result.folder.subFolders.length + result.folder.files.length,
          size: 'Unknown',
          color: 'blue',
          date: result.folder.interactionDate.split('T')[0],
        },
      ]);

    } catch (error) {
      console.error('Error uploading folder:', error);
      alert('An error occurred while uploading the folder');
    }
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <>
      <div className="flex flex-col-reverse gap-6 lg:flex-row lg:justify-between items-start lg:items-center mb-8 lg:mb-16 mt-10 lg:mt-20">
        {/* Breadcrumb (always aligned left) and second Enhanced File Hierarchy Button for large screens */}
        <div className="w-full lg:w-auto flex justify-start items-center gap-4">
          <div className="relative">
            <Breadcrumb
              items={breadcrumbItems}
              onToggleMenu={toggleMenu}
              isMenuVisible={isMenuVisible}
            />
            {isMenuVisible && (
              <MenuCard
                items={[
                  {
                    iconSrc: '/iconCards/addfolder.png',
                    label: 'New Folder',
                    handler: handleCreatingFolder,
                  },
                  {
                    iconSrc: '/iconCards/importfile.png',
                    label: 'Import File',
                    handler: handleUploadFile,
                  },
                  { iconSrc: '/iconCards/importfolder.png',
                    label: 'Import Folder',
                    handler: handleUploadFolder
                  },
                  { iconSrc: '/iconCards/color.png', label: 'Apply Theme' },
                ]}
              />
            )}
          </div>

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
          <div className="flex gap-6 lg:gap-8 items-center">
            <div className="flex gap-2 lg:gap-4 items-center">
              <div
                className="flex items-center cursor-pointer justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-[4px] bg-[#222222]"
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
                  className={`text-white w-5 lg:w-6 ${!isListView && 'text-selected-sidebar'}`}
                />
              </div>
              <div
                className="flex items-center cursor-pointer justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-[4px] bg-[#222222]"
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
                  className={`text-white w-5 lg:w-6 ${isListView && 'text-selected-sidebar'}`}
                />
              </div>
            </div>

            {/* Sort by Name */}
            <div className="flex items-center gap-2 lg:gap-4">
              <div className="flex items-center px-3 py-2 lg:px-4 lg:py-2 rounded-full gap-2 bg-[#252525]">
                <p className="text-white font-regular">Name</p>
                <Image src={arrowbtm} alt="arrowUp rotate-90" />
              </div>
              <Image src={arrowUp} alt="arrowUp" />
            </div>
          </div>
        </div>
      </div>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center h-[400px] text-center">
          <Image src={add} alt="No files or folders" />
          <p className="text-2xl text-gray-400">No files or folders</p>
        </div>
      ) : (
        <>
          {isListView ? (
            <div className="w-full">
              <table className="table-auto w-full text-left">
                <tbody className="space-y-2 w-full">
                  {folders.map((folder, index) => (
                    <Link
                      key={index}
                      href={`/storage/${folder.id}`}
                      className="w-full justify-between"
                    >
                      <FolderRow
                        color={folder.color}
                        name={folder.name}
                        items={folder.items}
                        size={folder.size}
                        date={folder.date}
                      />
                    </Link>
                  ))}
                  {files.map((file, index) => (
                    <FileRow key={index} name={file.name} size={file.size} date={file.date} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {folders.map(folder => (
                <button
                  type="button"
                  key={folder.id}
                  onClick={() => folder.id && handleNavigation(folder.id)}
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      folder.id && handleNavigation(folder.id);
                    }
                  }}
                >
                  <FolderCard
                    color={folder.color}
                    name={folder.name}
                    items={folder.items}
                    size={folder.size}
                    onRemove={() => folder.id !== undefined && handleRemoveFolder(folder.id)}
                  />
                </button>
              ))}
              {files.map(file => (
                <div
                  key={file.id}
                  onClick={() => file.url && file.name && handleDownload(file.url, file.name)} // Trigger download on click
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      if (file.url && file.name) {
                        handleDownload(file.url, file.name); // Trigger download on Enter or Space key press
                      }
                    }
                  }}
                >
                  <FileCard
                    fileName={file.name}
                    fileSize={file.size}
                    animateIn={true}
                    customAnimation="animate-fade-in-up"
                    onRemove={() => file.id !== undefined && handleRemoveFile(file.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}

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
        <CombinedComponent onClose={() => setIsModalOpen(false)} folderId={folderId} />
      )}
    </>
  );
};

export default MyPage;
