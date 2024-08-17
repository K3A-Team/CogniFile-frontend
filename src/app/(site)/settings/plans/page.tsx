import Plans from '../../../components/landing/plans';
import Image from 'next/image';
import React from 'react';
import arrowLeft from '@/public/arrow_left.png';

function PlansPage() {
  return (
    <div className="overflow-y-scroll flex px-20 w-full flex-col gap-10 h-screen">
      <div className="w-full h-16 flex justify-between items-center">
        <Image src={arrowLeft} alt="arrow_left" />
        <div className="rounded-full bg-dar-card text-xl h-16 w-16 font-regular flex items-center justify-center">
          <p>AB</p>
        </div>
      </div>
      <div className="pb-12">
        <Plans />
      </div>
    </div>
  );
}

export default PlansPage;
