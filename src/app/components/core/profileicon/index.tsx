'use client';

import MenuCard from '../menucard';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Adjust the import path as necessary

const ProfileIcon = () => {
  const router = useRouter();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleProfileClick = () => {
    // Handle profile logic here
    return 'profile clicked';
  };

  const handleLogoutClick = () => {
    // Handle logout logic here
    axios
      .post('/api/auth/logout')
      .then(() => {
        router.push('/auth/login');
      })
      .catch(error => {
        throw new Error(error);
      });
  };

  const menuItems = [
    {
      label: 'Profile',
      handler: handleProfileClick,
    },
    {
      label: 'Logout',
      handler: handleLogoutClick,
    },
  ];

  return (
    <div className="relative">
      <button
        className="rounded-full bg-dar-card text-xl h-16 w-16 font-regular flex items-center justify-center"
        onClick={handleMenuToggle}
      >
        <p>AB</p>
      </button>

      {isMenuVisible && (
        <div className="absolute top-2 -left-60">
          <MenuCard items={menuItems} />
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
