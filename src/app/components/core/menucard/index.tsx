'use client';

import Image from 'next/image';
import React from 'react';

interface MenuItem {
  iconSrc?: string;
  label: string;
  handler?: (event: React.MouseEvent<HTMLLIElement>) => void; // Pass the event to the handler
}

interface MenuCardProps {
  items: MenuItem[];
}

const MenuCard: React.FC<MenuCardProps> = ({ items }) => {
  return (
    <div className="bg-dar-card text-white p-4 rounded-[8px] shadow-md w-64 flex items-center justify-center absolute top-16 z-[105]">
      <ul className="w-full">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center py-2 px-2 w-full cursor-pointer hover:bg-[#1E1E1E]"
            onClick={event => {
              event.stopPropagation(); // Stop the event from propagating
              if (item.handler) {
                item.handler(event); // Call the handler function with the event
              }
            }}
            role="button"
            tabIndex={0}
            onKeyDown={event => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.stopPropagation(); // Stop the keydown event from propagating
                if (item.handler) {
                  item.handler(event as unknown as React.MouseEvent<HTMLLIElement>); // Trigger the handler on Enter or Space
                }
              }
            }}
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
