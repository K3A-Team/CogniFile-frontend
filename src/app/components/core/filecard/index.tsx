'use client';

import MenuCard from '../menucard';
import Image, { StaticImageData } from 'next/image';
import { useState, useEffect, useRef } from 'react';
import documentIcon from '@/public/document.png';
import imageIcon from '@/public/image.png';
import videoIcon from '@/public/video.png';

const extensionToImageMap: { [key: string]: StaticImageData } = {
  doc: documentIcon,
  docx: documentIcon,
  pdf: documentIcon,
  jpg: imageIcon,
  jpeg: imageIcon,
  png: imageIcon,
  gif: imageIcon,
  mp4: videoIcon,
  mov: videoIcon,
  avi: videoIcon,
};

const getFileExtension = (fileName: string) => {
  return fileName.split('.').pop()?.toLowerCase() || '';
};

const FileCard = ({
  fileName,
  fileSize,
  animateIn,
  customAnimation,
  onRemove,
}: {
  fileName: string;
  fileSize: string;
  animateIn?: boolean;
  customAnimation?: string;
  onRemove?: () => void;
}) => {
  const [mounted, setMounted] = useState(animateIn);
  const [showMenu, setShowMenu] = useState(false); // State to manage menu visibility
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 }); // State to manage menu position
  const cardRef = useRef<HTMLDivElement>(null); // Reference for the card element

  const fileExtension = getFileExtension(fileName);
  const imageSrc = extensionToImageMap[fileExtension] || documentIcon;

  useEffect(() => {
    if (animateIn) {
      setMounted(true);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [animateIn]);

  const handleRemove = () => {
    setMounted(false);
    if (onRemove) {
      setTimeout(() => onRemove(), 500); // Wait for the animation to finish before removing the element
    }
  };

  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setMenuPosition({ x: event.clientX, y: event.clientY }); // Set menu position based on click location
    setShowMenu(true);
  };

  return (
    <div
      ref={cardRef}
      className={`relative hover:bg-[#252525] flex flex-col gap-2 items-center p-4 rounded-lg text-center transition-all transform ${
        mounted ? (customAnimation ? customAnimation : 'animate-fade-in-up') : ''
      }`}
      onContextMenu={handleRightClick} // Right-click to show the context menu
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleRightClick(e as unknown as React.MouseEvent);
        }
      }} // Handle keyboard interaction
      role="button"
      tabIndex={0}
    >
      <Image src={imageSrc} alt={fileName} className="mb-2" />
      <h3 className="text-lg font-semibold">{fileName}</h3>
      <p className="text-gray-400 text-sm">{fileSize}</p>

      {showMenu && (
        <div
          className="absolute z-50"
          style={{ top: `${menuPosition.y / 5}px`, left: `${menuPosition.x / 10}px` }}
        >
          <MenuCard
            items={[
              {
                label: 'Delete File',
                handler: e => {
                  e.stopPropagation(); // Prevent link click or other event propagation
                  handleRemove();
                },
              },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default FileCard;
