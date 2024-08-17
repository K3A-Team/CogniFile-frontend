'use client';

import FolderCard from '../foldercard';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import settingsBlue from '@/public/settings_blue.svg';

const CombinedComponent = () => {
  const [loading, setLoading] = useState(true);
  const [folders, setFolders] = useState([
    { id: 1, color: 'blue', name: 'Documents', items: 10, size: '120 MB', customAnimation: '' },
    { id: 2, color: 'green', name: 'Music', items: 54, size: '2.3 GB', customAnimation: '' },
    { id: 3, color: 'yellow', name: 'Pictures', items: 230, size: '5.1 GB', customAnimation: '' },
    { id: 4, color: 'blue', name: 'Videos', items: 120, size: '8.2 GB', customAnimation: '' },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      let timeout = 500;
      const mergeTimeout = setTimeout(() => {
        mergeFolders([1, 2], 'Custom Merged Folder');
      }, timeout);

      timeout += 500;

      const divideTimeout = setTimeout(() => {
        divideFolder(3, 3, ['Pictures Part 1', 'Pictures Part 2', 'Pictures Part 3']);
      }, timeout);

      return () => {
        clearTimeout(mergeTimeout);
        clearTimeout(divideTimeout);
      };
    }
  }, [loading]);

  const mergeFolders = (folderIds: number[], newName: string) => {
    if (folderIds.length < 2) return;

    const firstFolderIndex = folders.findIndex(folder => folder.id === folderIds[0]);

    const mergedFolder = folderIds.reduce(
      (acc, folderId) => {
        const folder = folders.find(folder => folder.id === folderId) as (typeof folders)[number];
        return {
          ...acc,
          name: newName,
          items: acc.items + folder.items,
          size: `${parseInt(acc.size) + parseInt(folder.size)} GB`,
          customAnimation: '',
        };
      },
      {
        id: folders.length + 1,
        color: 'green',
        name: '',
        items: 0,
        size: '0 GB',
        customAnimation: '',
      },
    );

    const fadeAnimations = folders.map((folder, index) => {
      if (folderIds.includes(folder.id)) {
        if (index < firstFolderIndex) return 'animate-fade-out-right';
        if (index > firstFolderIndex) return 'animate-fade-out-left';
      }
      return '';
    });

    folders.forEach((folder, index) => {
      if (folderIds.includes(folder.id)) {
        setTimeout(() => {
          const newFolder = {
            ...folder,
            customAnimation: fadeAnimations[index],
          };
          setFolders(prevFolders =>
            prevFolders.map(folderItem => (folderItem.id === folder.id ? newFolder : folderItem)),
          );
        }, 0);
      }
    });

    setTimeout(() => {
      const updatedFolders = folders.filter(folder => !folderIds.includes(folder.id));
      updatedFolders.splice(firstFolderIndex, 0, mergedFolder);
      setFolders(updatedFolders);
    }, 500);
  };

  const divideFolder = (folderId: number, parts: number, customNames: string[]) => {
    const folder = folders.find(folder => folder.id === folderId);

    if (!folder || parts < 2 || customNames.length !== parts) return;

    const folderIndex = folders.findIndex(folder => folder.id === folderId);

    setFolders(prevFolders =>
      prevFolders.map(folder =>
        folder.id === folderId ? { ...folder, customAnimation: 'animate-fade-out-down' } : folder,
      ),
    );

    setTimeout(() => {
      const fadeAnimations = Array(parts).fill('');

      for (let index = 0; index < parts; index++) {
        if (index === 0) {
          fadeAnimations[index] = 'animate-fade-in-up';
        } else {
          fadeAnimations[index] = 'animate-fade-in-right';
        }
      }

      const dividedFolders = Array.from({ length: parts }, (_element, index) => ({
        id: folders.length + 1 + index,
        color: ['yellow', 'blue', 'green'][index % 3],
        name: customNames[index],
        items: Math.floor(folder.items / parts),
        size: `${(parseInt(folder.size) / parts).toFixed(1)} GB`,
        customAnimation: fadeAnimations[index],
      }));

      setFolders(prevFolders =>
        prevFolders
          .filter(folder => folder.id !== folderId)
          .slice(0, folderIndex)
          .concat(dividedFolders)
          .concat(prevFolders.slice(folderIndex + 1)),
      );
    }, 500);
  };

  return (
    <div className="w-2/3 h-[600px] bg-dar-card rounded-2xl">
      {loading ? (
        <div className="flex items-center justify-center gap-6 p-32 h-full">
          <div className="text-center">
            <Image
              src={settingsBlue}
              alt="Loading Icon"
              className={`mx-auto mb-4 ${loading ? 'animate-spin' : ''}`}
            />
            <p className="text-4xl bg-Blue-gradient bg-clip-text text-transparent">
              Generating the new hierarchy
            </p>
          </div>
        </div>
      ) : (
        <div className="p-6 overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 h-full">
            {folders.map(folder => (
              <FolderCard
                key={folder.id}
                color={folder.color}
                name={folder.name}
                items={folder.items}
                size={folder.size}
                animateIn={true}
                customAnimation={folder.customAnimation}
                onRemove={() =>
                  setFolders(prevFolders =>
                    prevFolders.filter(folderItem => folderItem.id !== folder.id),
                  )
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CombinedComponent;
