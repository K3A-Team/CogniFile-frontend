'use client';

import Button from '../../core/button';
import FileCard from '../../core/filecard';
import FileRow from '../../core/filerow';
import FolderCard from '../../core/foldercard';
import FolderRow from '../../core/folderrow';
import TrashModal from '../../core/trashmodal';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaTh, FaList, FaChevronDown } from 'react-icons/fa';
import add from '@/public/add.png';
import arrowbtm from '@/public/arrow_btm.png';
import arrowUp from '@/public/arrow_up.png';
import magicBlue from '@/public/magicBlue.png';
import settingsOrange from '@/public/settings_orange.svg';
import { FolderResponse } from '@/src/types/responses';
import { Folder, File } from '@/src/types/shared';
import api from '@/src/utils/axios';

const TrashPage = ({ folderId }: { folderId: string }) => {
  const [isListView, setIsListView] = useState(false);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleEmptyTrash = () => {
    // Console.log('Trash emptied');
    setShowModal(false);
  };

  useEffect(() => {
    const transformResponse = (res: FolderResponse) => {
      let idCounter = 1;
      const { folder } = res;

      const filespart = folder.files.map(file => ({
        id: idCounter++,
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

    api
      .post(`/api/folders`, { folderId })
      .then(res => {
        const transformed = transformResponse(res.data);
        setFolders(transformed.folderspart);
        setFiles(transformed.filespart);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        throw new Error(err.message);
      });
  }, [folderId]);

  const isEmpty = folders.length === 0 && files.length === 0;

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
                <tbody className="space-y-8 w-full">
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
              {folders.map((folder, index) => (
                <Link key={index} href={`/storage/${folder.id}`}>
                  <FolderCard
                    color={folder.color}
                    name={folder.name}
                    items={folder.items}
                    size={folder.size}
                  />
                </Link>
              ))}
              {files.map(file => (
                <a href={file.url} download key={file.id}>
                  <FileCard
                    fileName={file.name}
                    fileSize={file.size}
                    animateIn={true}
                    customAnimation="animate-fade-in-up"
                  />
                </a>
              ))}
            </div>
          )}
        </>
      )}
      <TrashModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleEmptyTrash}
      />
    </>
  );
};

export default TrashPage;
