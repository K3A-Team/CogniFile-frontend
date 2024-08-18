import Image, { StaticImageData } from 'next/image';
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

const FileRow = ({ name, size, date }: { name: string; size: string; date: string }) => {
  const fileExtension = getFileExtension(name);
  const imageSrc = extensionToImageMap[fileExtension] || documentIcon;

  return (
    <tr className="hover:bg-gray-800">
      <td className="px-4 py-3 flex items-center">
        <Image src={imageSrc} alt={name} className="w-8 h-6 mr-3" />
        {name}
      </td>
      <td className="px-4 py-3 text-gray-400">{size}</td>
      <td className="px-4 py-3 text-gray-400">{date}</td>
      <td className="px-4 py-3 text-gray-400 text-right">...</td>
    </tr>
  );
};

export default FileRow;
