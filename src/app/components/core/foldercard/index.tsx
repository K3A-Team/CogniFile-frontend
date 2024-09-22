'use client';

import MenuCard from '../menucard';
import Image, { StaticImageData } from 'next/image';
import { useState, useEffect, useRef } from 'react';
import folderBlue from '@/public/folder_blue.png';
import folderGreen from '@/public/folder_green.png';
import folderYellow from '@/public/folder_yellow.png';

const colorToImageMap: { [key: string]: StaticImageData } = {
  blue: folderBlue,
  green: folderGreen,
  yellow: folderYellow,
};

const FolderCard = ({
  color,
  name,
  items,
  size,
  animateIn,
  customAnimation,
  onRemove,
}: {
  color: string;
  name: string;
  items: number;
  size: string;
  animateIn?: boolean;
  customAnimation?: string;
  onRemove?: () => void;
}) => {
  const [mounted, setMounted] = useState(animateIn);
  const [showMenu, setShowMenu] = useState(false); // State to manage menu visibility
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 }); // State to manage menu position
  const cardRef = useRef<HTMLDivElement>(null); // Reference for the card element

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
    setMenuPosition({ x: event.clientX, y: event.clientY });
    setShowMenu(true);
  };

  return (
    <div
      ref={cardRef}
      className={`relative hover:bg-[#252525] flex flex-col gap-2 items-center p-4 rounded-lg text-center transition-all transform ${
        mounted ? (customAnimation ? customAnimation : 'animate-fade-in-up') : ''
      }`}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleRightClick(e as unknown as React.MouseEvent);
        }
      }} // Handle keyboard interactions
      onContextMenu={handleRightClick} // Right-click to show the context menu
      role="button"
      tabIndex={0}
    >
      <Image src={colorToImageMap[color]} alt={name} className="mb-2" />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-400 text-sm">{items} Items</p>
      <p className="text-gray-400 text-sm">{size}</p>

      {showMenu && (
        <div
          className="absolute z-50"
          style={{ top: `${menuPosition.y / 5}px`, left: `${menuPosition.x / 10}px` }}
        >
          <MenuCard
            items={[
              {
                label: 'Delete Folder',
                handler: e => {
                  e.stopPropagation(); // Prevent event propagation
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

export default FolderCard;
