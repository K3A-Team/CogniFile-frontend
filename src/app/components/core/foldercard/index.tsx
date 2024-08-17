import Image, { StaticImageData } from 'next/image';
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
}: {
  color: string;
  name: string;
  items: number;
  size: string;
}) => {
  const imageSrc = colorToImageMap[color];
  return (
    <button className="flex flex-col gap-2 items-center px-2 py-3">
      <Image src={imageSrc} alt={name} className="mb-2" />

      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-400 text-sm">{items} Items</p>
      <p className="text-gray-400 text-sm">{size}</p>
    </button>
  );
};

export default FolderCard;
