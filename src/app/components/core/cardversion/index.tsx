import Image from 'next/image';
import React from 'react';
import info from '@/public/iconCards/info.png';

function CardVersion() {
  return (
    <div className="rounded-[8px] bg-dar-card p-5 gap-8 flex flex-col items-center">
      <Image src={info} alt="info" />
      <div className="flex flex-col gap-2 text-lg">
        <p className="text-white opacity-45 text-center leading-relaxed">
          Another Version of the <br></br> uploaded file is detected do <br></br> you want to save
          it as V1.1 in <br></br> a new Folder ?
        </p>
      </div>
      <div className="gap-4 flex items-center">
        <p className="text-white opacity-60">Decline</p>
        <div className="text-[#191919] px-4 py-2 rounded-full bg-white text-sm">Accept</div>
      </div>
    </div>
  );
}

export default CardVersion;
