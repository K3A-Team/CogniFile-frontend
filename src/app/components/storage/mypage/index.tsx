'use client';

import Breadcrumb from '../../core/breadcrumb';
import Button from '../../core/button';
import FileCard from '../../core/filecard';
import FileRow from '../../core/filerow';
import FolderCard from '../../core/foldercard';
import FolderRow from '../../core/folderrow';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaTh, FaList } from 'react-icons/fa';
import add from '@/public/add.png';
import arrowbtm from '@/public/arrow_btm.png';
import arrowUp from '@/public/arrow_up.png';
import magicBlue from '@/public/magicBlue.png';
import { FolderResponse } from '@/src/types/responses';
import { Folder, File } from '@/src/types/shared';
import api from '@/src/utils/axios';

const MyPage = ({ folderId }: { folderId: string }) => {
  const [isListView, setIsListView] = useState(false);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const transformResponse = (res: FolderResponse) => {
      let idCounter = 1;
      const { folder } = res;
      // Transform files
      const files = folder.files.map(file => ({
        id: idCounter++,
        name: file.name,
        size: file.size,
        date: 'Unknown', // Date is not available in your response, set it to a default or derived value
      }));

      // Transform subfolders
      const folders = folder.subFolders.map(subFolder => ({
        id: idCounter++,
        name: subFolder.name,
        items: subFolder.children, // Assuming 'children' represents the number of items
        size: 'Unknown', // Size is not available in your response, set it to a default or derived value
        color: 'blue', // Default color, adjust as needed
        date: 'Unknown', // Date is not available in your response, set it to a default or derived value
      }));

      return { folders, files };
    };

    api
      .post(`/api/folders`, { folderId })
      .then(res => {
        const transformed = transformResponse(res.data);

        setFolders(transformed.folders);
        setFiles(transformed.files);
      })
      .catch(err => {
        throw new Error(err.message);
      });
  }, [folderId]);

  //   Const folders: Folder[] = [
  //     { id: 1, name: 'Slide', items: 54, size: '223 MB', color: 'blue', date: '20 July 2024' },
  //     { id: 2, name: 'Gathering', items: 230, size: '322 MB', color: 'yellow', date: '20 July 2024' },
  //   ];

  //   Const files: File[] = [
  //     { id: 3, name: 'report.pdf', size: '2.3 MB', date: '21 July 2024' },
  //     { id: 4, name: 'image.png', size: '1.2 MB', date: '22 July 2024' },
  //   ];

  const isEmpty = folders.length === 0 && files.length === 0;
  return (
    <>
      <div className="flex justify-between items-center mb-16 mt-20">
        <div className="flex items-center gap-x-12">
          <Breadcrumb items={['My Storage', 'Cv']} />
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
              <FaTh className={`text-white w-6 ${!isListView && 'text-selected-sidebar'}`} />
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
              <FaList className={`text-white w-6 ${isListView && 'text-selected-sidebar'}`} />
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
export default MyPage;
