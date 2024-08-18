'use client';

import Image from 'next/image';
import React from 'react';

interface MenuItem {
  iconSrc?: string;
  label: string;
}

interface MenuCardProps {
  items: MenuItem[];
}

const MenuCard: React.FC<MenuCardProps> = ({ items }) => {
  return (
    <div className="bg-dar-card text-white p-4 rounded-[8px] shadow-md w-64 flex items-center justify-center">
      <ul className="w-full">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center py-2 px-2 w-full cursor-pointer hover:bg-[#1E1E1E]"
          >
            {item.iconSrc && (
              <Image src={item.iconSrc} alt={item.label} width={18} height={18} className="mr-3" />
            )}
            <span className="text-white opacity-45">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuCard;
