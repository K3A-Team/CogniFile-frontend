'use client';

import MenuCard from '../menucard';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Adjust the import path as necessary

const ProfileIcon = () => {
  const router = useRouter();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [initials, setInitials] = useState('');

  const handleMenuToggle = () => {
    setIsMenuVisible(!isMenuVisible);
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
      label: 'Logout',
      handler: handleLogoutClick,
    },
  ];

  useEffect(() => {
    const getInitials = (firstName: string, lastName: string) => {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    const fetchUserProfile = async () => {
      return await axios.get('/api/profile');
    };

    fetchUserProfile().then(response => {
      const { firstName, lastName } = response.data.user;
      setInitials(getInitials(firstName, lastName));
    });
  }, []);

  return (
    <div className="relative">
      <button
        className="rounded-full dark:bg-dar-card bg-white text-xl h-16 w-16 font-regular flex items-center justify-center dark:text-white text-[#AAAAAA]"
        onClick={handleMenuToggle}
      >
        <p>{initials}</p>
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
