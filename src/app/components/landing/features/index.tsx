import Image from 'next/image';
import chatgpt from '@/public/chatgpt.png';
import cloud from '@/public/cloud.png';
import folder from '@/public/folder.png';
import security from '@/public/security.png';

const Features = () => {
  return (
    <section className="bg-black text-white p-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          CogniFile helps you and your business at every step.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="flex flex-col items-center">
            <Image src={cloud} alt="Cloud" className="mb-4 h-16 w-auto" />
            <h3 className="text-xl font-semibold mb-2">Stockez vos fichiers</h3>
            <p className="text-gray-400 text-center">
              Securely store and share files, easily sign and send important documents, back up your
              work, all in one location, for streamlined and effective file organization.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Image src={chatgpt} alt="Chat GPT" className="mb-4 h-16 w-auto" />
            <h3 className="text-xl font-semibold mb-2">AI support features</h3>
            <p className="text-gray-400 text-center">
              Securely store and share files, easily sign and send important documents, back up your
              work, all in one location, for streamlined and effective file organization.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Image src={folder} alt="Folder" className="mb-4 h-16 w-auto" />
            <h3 className="text-xl font-semibold mb-2">Automatic file hierarchy</h3>
            <p className="text-gray-400 text-center">
              Securely store and share files, easily sign and send important documents, back up your
              work, all in one location, for streamlined and effective file organization.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Image src={security} alt="Security" className="mb-4 h-16 w-auto" />
            <h3 className="text-xl font-semibold mb-2">Security and backup</h3>
            <p className="text-gray-400 text-center">
              Securely store and share files, easily sign and send important documents, back up your
              work, all in one location, for streamlined and effective file organization.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Features;
