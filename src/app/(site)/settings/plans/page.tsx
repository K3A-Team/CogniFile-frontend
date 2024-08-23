import Plans from '../../../components/landing/plans';
import Image from 'next/image';
import React from 'react';
import arrowLeft from '@/public/arrow_left.png';
import ProfileIcon from '@/src/app/components/core/profileicon';

function PlansPage() {
  return (
    <div className="overflow-y-scroll flex px-20 w-full flex-col gap-10 h-screen">
      <div className="w-full h-16 flex justify-between items-center">
        <Image src={arrowLeft} alt="arrow_left" />
        <ProfileIcon />
      </div>
      <div className="pb-12">
        <Plans />
      </div>
    </div>
  );
}

export default PlansPage;
