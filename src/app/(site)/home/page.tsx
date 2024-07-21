'use client';

import Sidebar from '../../components/core/sidebar';
import Image from 'next/image';
import { useState } from 'react';
import { FaSearch, FaCog, FaSortAlphaDown, FaTh, FaList, FaChevronDown } from 'react-icons/fa';
import { FaArrowUpLong } from 'react-icons/fa6';
import folderBlue from '@/public/folder_blue.png';
import folderGreen from '@/public/folder_green.png';
import folderYellow from '@/public/folder_yellow.png';

const folders = [
  { name: 'Slide', items: 54, size: '223 MB', color: folderBlue, date: '20 July 2024' },
  { name: 'Gathering', items: 230, size: '322 MB', color: folderYellow, date: '20 July 2024' },
  { name: 'Design', items: 2153, size: '500 MB', color: folderBlue, date: '20 July 2024' },
  { name: 'Memory', items: 650, size: '890 MB', color: folderYellow, date: '20 July 2024' },
  { name: 'Directory', items: 12, size: '40 MB', color: folderGreen, date: '20 July 2024' },
  { name: 'Ebook', items: 24, size: '12 MB', color: folderGreen, date: '20 July 2024' },
  { name: 'Tools', items: 550, size: '126 MB', color: folderGreen, date: '20 July 2024' },
  { name: 'Library', items: 344, size: '980 MB', color: folderGreen, date: '20 July 2024' },
  { name: 'Familiy', items: 210, size: '441 MB', color: folderYellow, date: '20 July 2024' },
  { name: 'Office Work', items: 403, size: '140 MB', color: folderBlue, date: '20 July 2024' },
];

const Home = () => {
  const [isListView, setIsListView] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        {' '}
        {/* Added ml-64 to make space for the fixed sidebar */}
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center bg-transparent border border-white rounded-full px-4 py-2 w-full md:w-1/2">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search in the storage"
                className="bg-transparent focus:outline-none text-white w-full"
              />
              <div className="flex items-center space-x-2">
                <FaCog className="text-gray-400" />
                <FaSortAlphaDown className="text-gray-400" />
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <button className="p-2 rounded-full">
                <FaCog className="text-white" size={24} />
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-full bg-cf-dark-two text-white">
                <span className="text-lg font-semibold">AB</span>
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-x-4">
              <div className="flex items-center gap-x-2">
                <h2 className="text-2xl font-semibold">Home</h2>
                <FaChevronDown />
              </div>
              <button className="border text-cf-blue border-cf-blue rounded-full px-4 py-2">
                Enhanced File Hierarchy
              </button>
            </div>
            <div className="flex justify-end items-center mt-4">
              <FaTh
                className={`text-white mx-2 cursor-pointer ${!isListView && 'text-blue-500'}`}
                onClick={() => setIsListView(false)}
              />
              <FaList
                className={`text-white mx-2 cursor-pointer ${isListView && 'text-blue-500'}`}
                onClick={() => setIsListView(true)}
              />
              <div className="bg-cf-dark-two px-4 py-2 mx-2 flex items-center rounded-full">
                <span className="mr-1">Name</span>
                <FaChevronDown />
              </div>
              <FaArrowUpLong className="text-white" />
            </div>
          </div>
          {isListView ? (
            <div className="w-full">
              <table className="table-auto w-full text-left">
                <thead>
                  <tr className="text-gray-500">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Items</th>
                    <th className="px-4 py-2">Size</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {folders.map((folder, index) => (
                    <tr key={index} className="border-b border-gray-700 hover:bg-gray-800">
                      <td className="px-4 py-2 flex items-center">
                        <Image src={folder.color} alt={folder.name} className="w-6 h-6 mr-3" />
                        {folder.name}
                      </td>
                      <td className="px-4 py-2 text-gray-400">{folder.items} items</td>
                      <td className="px-4 py-2 text-gray-400">{folder.size}</td>
                      <td className="px-4 py-2 text-gray-400">{folder.date}</td>
                      <td className="px-4 py-2 text-gray-400 text-right">...</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {folders.map((folder, index) => (
                <div key={index} className="flex flex-col items-center p-4 rounded-lg">
                  <button>
                    <Image src={folder.color} alt={folder.name} className="mb-2" />
                  </button>
                  <h3 className="text-lg font-semibold">{folder.name}</h3>
                  <p className="text-gray-400 text-sm">{folder.items} Items</p>
                  <p className="text-gray-400 text-sm">{folder.size}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
