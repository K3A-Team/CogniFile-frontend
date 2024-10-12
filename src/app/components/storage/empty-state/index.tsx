import Image from 'next/image';
import add from '@/public/add.png';

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-[400px] text-center">
    <Image src={add} alt="No files or folders" />
    <p className="text-2xl text-gray-400">No files or folders</p>
  </div>
);

export default EmptyState;
