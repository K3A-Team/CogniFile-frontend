import Image from 'next/image';
import React from 'react';
import { FaCog, FaSortAlphaDown } from 'react-icons/fa';
import earth from '@/public/images/earth.jpg';
import google from '@/public/images/google.jpg';

// Replace with your actual image paths

const sharedWorkspaces = [
  { name: 'A2SV K3A Workspace', image: google },
  { name: 'A2SV K3A Workspace', image: earth },
];

const SharedStorage = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center bg-transparent border border-white rounded-full px-4 py-2 w-full md:w-1/2">
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
          <h2 className="text-2xl font-semibold">Shared Storage</h2>
          <button className="border text-cf-blue border-cf-blue rounded-full px-4 py-2">
            Enhanced File Hierarchy
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {sharedWorkspaces.map((workspace, index) => (
          <div key={index} className="flex flex-col items-center p-4 rounded-lg bg-gray-800">
            <button>
              <Image
                src={workspace.image}
                alt={workspace.name}
                className="mb-4 w-60 h-40 object-cover rounded-md"
              />
            </button>
            <h3 className="text-lg font-semibold text-white">{workspace.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SharedStorage;
