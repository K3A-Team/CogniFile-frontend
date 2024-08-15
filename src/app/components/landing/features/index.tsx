import Image from 'next/image';
import chatgpt from '@/public/chatgpt.png';
import cloud from '@/public/cloud.png';
import folder from '@/public/folder.png';
import security from '@/public/security.png';

const Features = () => {
  return (
    <section className="bg-[#191919] text-white w-screen py-20 flex flex-col items-center gap-20">
      <div className="flex flex-col justify-center gap-6">
        <h2 className="text-3xl lg:text-5xl font-extrabold leading-normal lg:leading-normal text-center w-[80%] lg:w-[100%] m-auto">
          CogniFile helps you and your business <br></br> at every step.
        </h2>
      </div>

      <div className="container mx-auto text-center w-[80%] m-auto lg:w-[100%]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="flex flex-col items-center gap-4 py-6 px-4 hover:bg-[#1F1F1F] rounded-[1rem]">
            <div className="flex flex-col items-center gap-2">
              <Image src={cloud} alt="Cloud" className="mb-4 h-16 w-auto" />
              <h3 className="text-[26px] font-extrabold mb-2">Store your files</h3>
            </div>
            <p className="text-white opacity-60 text-center text-xl">
              Securely store and share files, easily sign and send important documents, back up your
              work, all in one place, for efficient and organized file management.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 py-6 px-4 hover:bg-[#1F1F1F] rounded-[1rem]">
            <div className="flex flex-col items-center gap-2">
              <Image src={chatgpt} alt="Cloud" className="mb-4 h-16 w-auto" />
              <h3 className="text-[26px] font-extrabold mb-2">AI support features</h3>
            </div>
            <p className="text-white opacity-60 text-center text-xl">
              Securely store and share files, easily sign and send important documents, back up your
              work, all in one place, for efficient and organized file management.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 py-6 px-4 hover:bg-[#1F1F1F] rounded-[1rem]">
            <div className="flex flex-col items-center gap-2">
              <Image src={folder} alt="Cloud" className="mb-4 h-16 w-auto" />
              <h3 className="text-[26px] font-extrabold mb-2 text-nowrap">
                Automatic file structure
              </h3>
            </div>
            <p className="text-white opacity-60 text-center text-xl">
              Securely store and share files, easily sign and send important documents, back up your
              work, all in one place, for efficient and organized file management.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 py-6 px-4 hover:bg-[#1F1F1F] rounded-[1rem]">
            <div className="flex flex-col items-center gap-2">
              <Image src={security} alt="Cloud" className="mb-4 h-16 w-auto" />
              <h3 className="text-[26px] font-extrabold mb-2">Security and backup</h3>
            </div>
            <p className="text-white opacity-60 text-center text-xl">
              Securely store and share files, easily sign and send important documents, back up your
              work, all in one place, for efficient and organized file management.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Features;
