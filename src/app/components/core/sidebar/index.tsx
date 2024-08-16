'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaFolder, FaTags, FaTrash, FaStar } from 'react-icons/fa';
import logoShort from '@/public/logo_short.png';

const Sidebar = () => {
  const mainLinks = [
    {
      href: '/storage',
      label: 'Home',
      icon: <FaHome className="text-cf-white-text mr-3" />,
      iconSelected: <FaHome className="text-selected-sidebar mr-3" />,
    },
    {
      href: '/storage/shared',
      label: 'My Storage',
      icon: <FaFolder className="text-cf-white-text mr-3" />,
      iconSelected: <FaFolder className="text-selected-sidebar mr-3" />,
    },
    {
      href: '/shared-storage',
      label: 'Shared Storage',
      icon: <FaFolder className="text-cf-white-text mr-3" />,
      iconSelected: <FaFolder className="text-selected-sidebar mr-3" />,
    },
  ];

  const tagLinks = [
    { href: '/tags/yellow', label: 'Yellow', color: 'bg-cf-yellow' },
    { href: '/tags/blue', label: 'Blue', color: 'bg-cf-blue' },
    { href: '/tags/green', label: 'Green', color: 'bg-cf-green' },
    {
      href: '/tags/add',
      label: 'Add more tag',
      icon: <FaTags className="text-cf-white-text mr-3" />,
    },
  ];

  const moreLinks = [
    {
      href: '/recents',
      label: 'Recents',
      icon: <FaFolder className="text-cf-white-text mr-3" />,
      iconSelected: <FaFolder className="text-selected-sidebar mr-3" />,
    },
    {
      href: '/stared',
      label: 'Stared',
      icon: <FaStar className="text-cf-white-text mr-3" />,
      iconSelected: <FaStar className="text-selected-sidebar mr-3" />,
    },
    {
      href: '/trash',
      label: 'Trash',
      icon: <FaTrash className="text-cf-white-text mr-3" />,
      iconSelected: <FaTrash className="text-selected-sidebar mr-3" />,
    },
  ];
  const pathname = usePathname();

  return (
    <div className="bg-dar-card text-white h-screen py-4 w-64 fixed">
      <div className="flex justify-center items-center mb-4 px-2">
        <Image src={logoShort} alt="Logo" className="w-20" />
      </div>
      <div className="mb-2">
        <h2 className="text-gray-500 text-sm uppercase mb-2 px-5">Drive Storage</h2>
        <ul className="flex flex-col">
          {mainLinks.map(link => (
            <li
              key={link.href}
              className={`flex items-center px-5 py-3 text-lg text-cf-white-text ${pathname === link.href ? 'bg-Gray-gradient text-selected-sidebar' : ''}`}
            >
              <Link href={link.href}>
                <div className="flex items-center w-full">
                  {pathname === link.href ? link.iconSelected : link.icon}
                  <span>{link.label}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-2">
        <h2 className="text-gray-500 text-sm uppercase mb-2 px-5">Tags</h2>
        <ul className="flex flex-col">
          {tagLinks.map(link => (
            <li
              key={link.href}
              className={`flex items-center px-5 py-3 text-lg text-cf-white-text ${pathname === link.href ? 'bg-Gray-gradient text-selected-sidebar' : ''}`}
            >
              <Link href={link.href}>
                <div className="flex items-center w-full">
                  {link.color ? (
                    <span className={`${link.color} w-3 h-3 rounded-full mr-3`}></span>
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
      <div className="mb-2">
        <h2 className="text-gray-500 text-sm uppercase mb-2 px-5">More</h2>
        <ul className="flex flex-col">
          {moreLinks.map(link => (
            <li
              key={link.href}
              className={`flex items-center px-5 py-3 text-lg text-cf-white-text ${pathname === link.href ? 'bg-Gray-gradient text-selected-sidebar' : ''}`}
            >
              <Link href={link.href}>
                <div className="flex items-center w-full">
                  {pathname === link.href ? link.iconSelected : link.icon}
                  <span>{link.label}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto px-5">
        <h2 className="text-gray-500 text-sm uppercase mb-2">Storage</h2>
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
