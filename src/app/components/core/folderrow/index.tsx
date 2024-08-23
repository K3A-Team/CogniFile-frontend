import Image, { StaticImageData } from 'next/image';
import folderBlue from '@/public/folder_blue.png';
import folderGreen from '@/public/folder_green.png';
import folderYellow from '@/public/folder_yellow.png';

const colorToImageMap: { [key: string]: StaticImageData } = {
  blue: folderBlue,
  green: folderGreen,
  yellow: folderYellow,
};

const FolderRow = ({
  color,
  name,
  items,
  size,
  date,
}: {
  color: string;
  name: string;
  items: number;
  size: string;
  date: string;
}) => {
  const imageSrc = colorToImageMap[color]; // Map the color string to the corresponding imagereturn (

  return (
    <tr className="hover:bg-[#252525] w-full flex items-center justify-between">
      <td className="px-4 py-3 flex items-center">
        <Image src={imageSrc} alt={name} className="w-8 h-6 mr-3" />
        {name}
      </td>
      <td className="px-4 py-3 text-gray-400">{items} items</td>
      <td className="px-4 py-3 text-gray-400">{size}</td>
      <td className="px-4 py-3 text-gray-400">{date}</td>
      <td className="px-4 py-3 text-gray-400 text-right">...</td>
    </tr>
  );
};

export default FolderRow;
