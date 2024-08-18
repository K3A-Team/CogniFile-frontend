'use client';

import Image, { StaticImageData } from 'next/image';
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (animateIn) {
      setMounted(true);
    }
  }, [animateIn]);

  const handleRemove = () => {
    setMounted(false);
    if (onRemove) {
      // Wait for the animation to finish before removing the element
      setTimeout(() => onRemove(), 500);
    }
  };

  return (
    <div
      className={`flex flex-col gap-2 items-center p-4 rounded-lg text-center transition-all transform ${
        mounted ? (customAnimation ? customAnimation : 'animate-fade-in-up') : ''
      }`}
      onClick={handleRemove}
      onKeyDown={handleRemove}
      role="button"
      tabIndex={0}
    >
      <Image src={colorToImageMap[color]} alt={name} className="mb-2" />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-400 text-sm">{items} Items</p>
      <p className="text-gray-400 text-sm">{size}</p>
    </div>
  );
};

export default FolderCard;
