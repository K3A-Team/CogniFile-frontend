'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import folderSelected from '@/public/folders-selected.png';
import folders from '@/public/folders.png';
import homeSelcted from '@/public/home-slected.png';
import home from '@/public/home.png';
import logoShort from '@/public/logo_short.png';
import plus from '@/public/plus.png';
import recentsSelected from '@/public/recent-selected.png';
import recents from '@/public/recent.png';
import sharedSelected from '@/public/shared-selected.png';
import shared from '@/public/shared.png';
import staredSelected from '@/public/stared-selected.png';
import stared from '@/public/stared.png';
import trashSelected from '@/public/trash-selected.png';
import trash from '@/public/trash.png';

const Sidebar = () => {
  const mainLinks = [
    {
      href: '/home',
      label: 'Home',
      icon: <Image src={home} alt="Logo" className="w-5" />,
      iconSelected: <Image src={homeSelcted} alt="Logo" className="w-5" />,
    },
    {
      href: '/storage',
      label: 'My Storage',
      icon: <Image src={folders} alt="Logo" className="w-5" />,
      iconSelected: <Image src={folderSelected} alt="Logo" className="w-5" />,
    },
    {
      href: '/storage/shared',
      label: 'Shared Storage',
      icon: <Image src={shared} alt="Logo" className="w-5" />,
      iconSelected: <Image src={sharedSelected} alt="Logo" className="w-5" />,
    },
  ];

  const tagLinks = [
    { href: '/tags/yellow', label: 'Yellow', color: 'bg-[#FADB14]' },
    { href: '/tags/blue', label: 'Blue', color: 'bg-[#1890FF]' },
    { href: '/tags/green', label: 'Green', color: 'bg-[#52C41A]' },
    {
      href: '/tags/add',
      label: 'Add more tag',
      icon: <Image src={plus} alt="Logo" className="w-5" />,
    },
  ];

  const moreLinks = [
    {
      href: '/more/recents',
      label: 'Recents',
      icon: <Image src={stared} alt="Logo" className="w-5" />,
      iconSelected: <Image src={staredSelected} alt="Logo" className="w-5" />,
    },
    {
      href: '/more/stared',
      label: 'Stared',
      icon: <Image src={recents} alt="Logo" className="w-5" />,
      iconSelected: <Image src={recentsSelected} alt="Logo" className="w-5" />,
    },
    {
      href: '/more/trash',
      label: 'Trash',
      icon: <Image src={trash} alt="Logo" className="w-5" />,
      iconSelected: <Image src={trashSelected} alt="Logo" className="w-5" />,
    },
  ];
  const pathname = usePathname();

  return (
    <div className="bg-dar-card text-white py-12 w-[15%]">
      <div className="flex justify-center items-center mb-20 px-2">
        <Image src={logoShort} alt="Logo" className="w-20" />
      </div>

      <div className="mb-8">
        <h2 className="font-medium text-[#595959] text-sm mb-4 px-5">Drive Storage</h2>
        <ul className="flex flex-col">
          {mainLinks.map(link => (
            <li
              key={link.href}
              className={`flex items-center px-5 py-3 text-lg text-cf-white-text ${pathname === link.href ? 'bg-Gray-gradient text-selected-sidebar' : ''}`}
            >
              <Link href={link.href}>
                <div className="flex items-center w-full gap-3">
                  {pathname === link.href ? link.iconSelected : link.icon}
                  <span>{link.label}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="font-medium text-[#595959] text-sm mb-4 px-5">Tags</h2>
        <ul className="flex flex-col">
          {tagLinks.map(link => (
            <li
              key={link.href}
              className={`flex items-center px-5 py-3 text-lg text-cf-white-text ${pathname === link.href ? 'bg-Gray-gradient text-selected-sidebar' : ''}`}
            >
              <Link href={link.href}>
                <div className="flex items-center w-full gap-3">
                  {link.color ? (
                    <span className={`${link.color} w-5 h-5 rounded-full mr-3`}></span>
                  ) : (
                    link.icon
                  )}
                  <span>{link.label}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="font-medium text-[#595959] text-sm mb-4 px-5">More</h2>
        <ul className="flex flex-col">
          {moreLinks.map(link => (
            <li
              key={link.href}
              className={`flex items-center px-5 py-3 text-lg text-cf-white-text ${pathname === link.href ? 'bg-Gray-gradient text-selected-sidebar' : ''}`}
            >
              <Link href={link.href}>
                <div className="flex items-center w-full gap-3">
                  {pathname === link.href ? link.iconSelected : link.icon}
                  <span>{link.label}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto px-5">
        <h2 className="font-medium text-[#595959] text-sm mb-4">Storage</h2>
        <div className="flex justify-between mb-2">
          <span>1.1B GB of 50 GB</span>
        </div>
        <div className="w-full bg-white h-2 rounded-full mb-4">
          <div className="bg-cf-blue h-2 rounded-full" style={{ width: '22%' }}></div>
        </div>
        <button className="bg-cf-gray-two w-full py-2 px-2 rounded-md text-white">
          Upgrade Storage Size
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
