'use client';

import FileCard from '../filecard';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import settingsOrange from '@/public/settings_orange.svg';
import { File } from '@/src/types/shared';

const duplicatedFiles: { [key: string]: File[] } = {
  'file1.pdf': [
    { id: '1', name: 'file1.pdf', size: '2.3 MB', date: '2022-01-01', url: '' },
    { id: '2', name: 'file1.pdf', size: '2.3 MB', date: '2022-01-02', url: '' },
  ],
  'file2.pdf': [
    { id: '3', name: 'file2.pdf', size: '1.8 MB', date: '2022-01-01', url: '' },
    { id: '4', name: 'file2.pdf', size: '1.8 MB', date: '2022-01-03', url: '' },
    { id: '5', name: 'file2.pdf', size: '1.8 MB', date: '2022-01-04', url: '' },
  ],
  'file3.pdf': [
    { id: '6', name: 'file3.pdf', size: '4.7 MB', date: '2022-01-01', url: '' },
    { id: '7', name: 'file3.pdf', size: '4.7 MB', date: '2022-01-02', url: '' },
  ],
};

const DuplicatedFilesSimulation = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // Simulate loading for 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-2/3 h-[700px] bg-dar-card rounded-2xl py-12 px-14">
      {loading ? (
        <div className="flex items-center justify-center gap-6 h-full">
          <div className="text-center">
            <Image
              src={settingsOrange} // Use the orange version of the settings icon
              alt="Loading Icon"
              className={`mx-auto mb-4 ${loading ? 'animate-spin' : ''}`}
            />
            <p className="text-4xl bg-Orange-gradient bg-clip-text text-transparent">
              Detecting duplicated files
            </p>
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col">
          {/* Title */}
          <h2 className="text-4xl font-medium text-white text-center mb-12">
            Duplicated files detections
          </h2>

          {/* Duplicated Files List */}
          <div className="overflow-y-auto flex-grow scrollbar-custom">
            <div className="space-y-6">
              {Object.entries(duplicatedFiles).map(([fileName, files]) => (
                <div
                  key={fileName}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
                >
                  {files.map(file => (
                    <div key={file.id} className="p-[2px] rounded-lg bg-Orange-gradient">
                      <div className="bg-dar-card rounded-lg p-4">
                        <FileCard fileName={file.name} fileSize={file.size} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex justify-center gap-4">
            <button className="text-gray-400">Discard</button>
            <button className="px-4 py-2 bg-white text-black rounded-full">Approve changes</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DuplicatedFilesSimulation;
