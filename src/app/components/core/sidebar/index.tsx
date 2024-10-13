'use client';

import ProfileIcon from '../profileicon';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import shortLogoLight from '@/public/ShortLogoLight.png';
import dark from '@/public/dark.png';
import folderSelected from '@/public/folders-selected.png';
import folders from '@/public/folders.png';
import homeSelected from '@/public/home-slected.png';
import home from '@/public/home.png';
import light from '@/public/light.png';
import shortLogoDark from '@/public/logo_short.png';
import params from '@/public/params.svg';
import recentsSelected from '@/public/recent-selected.png';
import recents from '@/public/recent.png';
import sharedSelected from '@/public/shared-selected.png';
import shared from '@/public/shared.png';
import staredSelected from '@/public/stared-selected.png';
import stared from '@/public/stared.png';
import trashSelected from '@/public/trash-selected.png';
import trash from '@/public/trash.png';

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const mainLinks = [
    {
      href: '/storage',
      label: 'Home',
      icon: <Image src={home} alt="Logo" className="w-5" />,
      iconSelected: <Image src={homeSelected} alt="Logo" className="w-5" />,
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

  const moreLinks = [
    {
      href: '/storage/recents',
      label: 'Recents',
      icon: <Image src={stared} alt="Logo" className="w-5" />,
      iconSelected: <Image src={staredSelected} alt="Logo" className="w-5" />,
    },
    {
      href: '/storage/starred',
      label: 'Stared',
      icon: <Image src={recents} alt="Logo" className="w-5" />,
      iconSelected: <Image src={recentsSelected} alt="Logo" className="w-5" />,
    },
    {
      href: '/storage/trash',
      label: 'Trash',
      icon: <Image src={trash} alt="Logo" className="w-5" />,
      iconSelected: <Image src={trashSelected} alt="Logo" className="w-5" />,
    },
  ];

  return (
    <div className="relative lg:w-[15%]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 dark:bg-dar-card bg-white p-2 rounded-md z-50"
      >
        <FaBars className="dark:text-white text-dar-card text-2xl" />
      </button>

      <div className="lg:hidden flex justify-end gap-4 items-center fixed top-4 right-4 z-50">
        <button onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}>
          <Image src={theme === 'light' ? light : dark} alt="Theme" className="h-12 w-12" />
        </button>
        <Link href="/settings">
          <Image src={params} alt="params" className="w-6 h-6" />
        </Link>
        <ProfileIcon />
      </div>

      {/* Sidebar for Large Screens and Mobile */}
      <div
        className={`bg-white text-[#595959] dark:bg-dar-card dark:text-white py-12 lg:w-full fixed z-[100] lg:static top-0 h-full flex flex-col transition-transform duration-300 transform lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button for Mobile */}
        <div className="lg:hidden flex justify-end pr-4 pb-4">
          <button onClick={() => setIsOpen(false)}>
            <FaTimes className="text-white text-2xl" />
          </button>
        </div>

        <div className="flex justify-center items-center mb-20 px-2">
          <Image
            src={theme === 'light' ? shortLogoLight : shortLogoDark}
            alt="Logo"
            className="lg:w-20 w-16"
          />
        </div>

        <div className="mb-8">
          <h2 className="font-medium text-[#595959] text-sm mb-4 px-5">Drive Storage</h2>
          <ul className="flex flex-col">
            {mainLinks.map(link => (
              <li
                key={link.href}
                className={`flex items-center px-5 py-3 text-lg  ${
                  pathname === link.href
                    ? 'dark:bg-Gray-gradient bg-Blue-gradient dark:text-selected-sidebar text-white'
                    : 'dark:text-cf-white-text text-[#8C8C8C]'
                }`}
              >
                <Link href={link.href}>
                  <div className="flex items-center w-full gap-3">
                    {theme === 'dark'
                      ? pathname === link.href
                        ? link.iconSelected
                        : link.icon
                      : pathname === link.href
                        ? link.icon
                        : link.iconSelected}
                    <span>{link.label}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* <div className="mb-8">
          <h2 className="font-medium text-[#595959] text-sm mb-4 px-5">Tags</h2>
          <ul className="flex flex-col">
            {tagLinks.map(link => (
              <li
                key={link.href}
                className={`flex items-center px-5 py-3 text-lg text-cf-white-text ${
                  pathname === link.href ? 'bg-Gray-gradient text-selected-sidebar' : ''
                }`}
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
        </div> */}

        <div className="mb-8">
          <h2 className="font-medium text-[#595959] text-sm mb-4 px-5">More</h2>
          <ul className="flex flex-col">
            {moreLinks.map(link => (
              <li
                key={link.href}
                className={`flex items-center px-5 py-3 text-lg ${
                  pathname === link.href
                    ? 'dark:bg-Gray-gradient bg-Blue-gradient dark:text-selected-sidebar text-white'
                    : 'dark:text-cf-white-text text-[#8C8C8C]'
                }`}
              >
                <Link href={link.href}>
                  <div className="flex items-center w-full gap-3">
                    {theme === 'dark'
                      ? pathname === link.href
                        ? link.iconSelected
                        : link.icon
                      : pathname === link.href
                        ? link.icon
                        : link.iconSelected}
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
          <div className="w-full dark:bg-white bg-[#F5F5F5] h-2 rounded-full mb-4">
            <div className="bg-cf-blue h-2 rounded-full" style={{ width: '22%' }}></div>
          </div>
          <button className="dark:bg-cf-gray-two w-full py-2 px-2 rounded-md dark:text-white text-[#373737] bg-[#F0F0F0]">
            Upgrade Storage Size
          </button>
        </div>
      </div>

      {/* Overlay to close sidebar on mobile */}
      {isOpen && (
        <button
          className="fixed inset-0 lg:hidden"
          onClick={() => setIsOpen(false)}
          // eslint-disable-next-line id-length
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsOpen(false);
            }
          }}
          tabIndex={0}
        ></button>
      )}
    </div>
  );
};

export default Sidebar;
