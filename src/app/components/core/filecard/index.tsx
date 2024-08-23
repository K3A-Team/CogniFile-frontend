'use client';

import Image, { StaticImageData } from 'next/image';
import { useState, useEffect } from 'react';
// Example image imports for different file types
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
  // Add more extensions as needed
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

  const fileExtension = getFileExtension(fileName);
  const imageSrc = extensionToImageMap[fileExtension] || documentIcon;

  useEffect(() => {
    if (animateIn) {
      setMounted(true);
    }
  }, [animateIn]);

  const handleRemove = () => {
    setMounted(false);
    if (onRemove) {
      setTimeout(() => onRemove(), 500); // Wait for the animation to finish before removing the element
    }
  };

  return (
    <div
      className={`hover:bg-[#252525] flex flex-col gap-2 items-center p-4 rounded-lg text-center transition-all transform ${
        mounted ? (customAnimation ? customAnimation : 'animate-fade-in-up') : ''
      }`}
      onClick={handleRemove}
      onKeyDown={handleRemove}
      role="button"
      tabIndex={0}
    >
      <Image src={imageSrc} alt={fileName} className="mb-2" />
      <h3 className="text-lg font-semibold">{fileName}</h3>
      <p className="text-gray-400 text-sm">{fileSize}</p>
    </div>
  );
};

export default FileCard;
