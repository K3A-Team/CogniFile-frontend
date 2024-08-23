'use client';

import Button from '../../components/core/button';
import FileCard from '../../components/core/filecard';
import FileRow from '../../components/core/filerow';
import FolderCard from '../../components/core/foldercard';
import FolderRow from '../../components/core/folderrow';
import ProfileIcon from '../../components/core/profileicon';
import Search from '../../components/core/search';
import Sidebar from '../../components/core/sidebar';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaList, FaTh } from 'react-icons/fa';
import add from '@/public/add.png';
import arrowbtm from '@/public/arrow_btm.png';
import arrowUp from '@/public/arrow_up.png';
import magicBlue from '@/public/magicBlue.png';
import magicOrange from '@/public/magicOrange.png';
import magicRed from '@/public/magicRed.png';
import params from '@/public/params.svg';
import settingsOrange from '@/public/settings_orange.svg';
import { Folder, File } from '@/src/types/shared';

type RecentItem = {
  name: string;
  size: string;
  children: number;
  interactionDate: string;
  type: 'folder' | 'file';
};

const Home = () => {
  const [isListView, setIsListView] = useState(false);
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

  const handleClick = () => {
    return 'clicked';
  };

  return (
    <div className="flex gap-0 w-screen">
      <Sidebar />
      <div className="flex px-20 py-12 w-[85%] flex-col gap-10">
        <div className="w-full h-16 flex justify-end items-center">
          <div className="flex gap-8 items-center">
            <Link href="/settings">
              <Image src={params} alt="params" className="w-10" />
            </Link>
            <ProfileIcon />
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
                  onClick={handleClick}
                />
              </div>
              <div className="hover:cursor-pointer">
                <Button
                  text="Remove duplications"
                  icon={<Image src={magicOrange} alt="" />}
                  color={2}
                  onClick={handleClick}
                />
              </div>
              <div className="hover:cursor-pointer">
                <Button
                  text="Malicious file detector"
                  icon={<Image src={magicRed} alt="" />}
                  color={3}
                  onClick={handleClick}
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

          {loading ? (
            <div className="flex justify-center gap-6 h-full mt-20">
              <div className="text-center">
                <Image
                  src={settingsOrange}
                  alt="Loading Icon"
                  className={`mx-auto mb-4 ${loading ? 'animate-spin' : ''}`}
                />
                <p className="text-4xl bg-Orange-gradient bg-clip-text text-transparent">
                  Loading files and folders...
                </p>
              </div>
            </div>
          ) : (
            <>
              {isEmpty ? (
                <div className="flex flex-col items-center justify-center h-[400px] text-center">
                  <Image src={add} alt="No recent items" />
                  <p className="text-2xl text-gray-400">No recent items</p>
                </div>
              ) : isListView ? (
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
        </div>
      </div>
    </div>
  );
};

export default Home;
