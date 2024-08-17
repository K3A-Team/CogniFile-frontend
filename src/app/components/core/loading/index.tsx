'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import settingsBlue from '@/public/settings_blue.svg';

const Loading = () => {
  const [spin, setSpin] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setSpin(false), 3000); // Stop spinning after 3 seconds
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex items-center justify-center gap-6 bg-dar-card p-32 rounded-2xl">
      <div className="text-center">
        <Image
          src={settingsBlue}
          alt="Loading Icon"
          className={`mx-auto mb-4 ${spin ? 'animate-spin' : ''}`}
        />
        <p className="text-4xl bg-Blue-gradient bg-clip-text text-transparent">
          Generating the new hierarchy
        </p>
      </div>
    </div>
  );
};
export default Loading;
