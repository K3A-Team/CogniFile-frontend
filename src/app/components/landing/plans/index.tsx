import Image from 'next/image';
import arrow from '@/public/arrow.png';
import whiteCheck from '@/public/check_white.png';

const Plans = () => {
  return (
    <section className="text-white p-20">
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          All the tools you need in one package
        </h2>
        <p className="text-gray-400 mb-12 text-center">
          Securely store and share files, easily sign and send important documents, back up your
          work, all in one location, for streamlined and effective file organization.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-black p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-semibold mb-2">Basic Plan</h3>
              <p className="text-cf-green text-lg mb-4">9.99 $US/month</p>
              <ul className="text-gray-400 mb-6">
                {[
                  '100 GB Storage',
                  'Chatbot',
                  'Natural language search',
                  'Automatic file categorization and tagging',
                  'Duplicate files detection',
                  'Automatic version control detection',
                  'Data backup',
                ].map((feature, index) => (
                  <li key={index} className="flex items-start mb-2">
                    <Image src={whiteCheck} alt="Check" className="w-5 h-5 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <button className="flex items-center justify-between bg-gray-700 text-white rounded-xl px-6 py-2 mt-auto hover:bg-cf-green">
              <span>Buy plan</span>
              <Image src={arrow} alt="Arrow" className="ml-2" />
            </button>
          </div>
          <div className="bg-black p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-semibold mb-2">Standard Plan</h3>
              <p className="text-cf-yellow text-lg mb-4">24.99/month</p>
              <ul className="text-gray-400 mb-6">
                {[
                  '500 GB Storage',
                  'All features of the Basic Plan',
                  'Natural language search (multiple languages + voice search)',
                  'Automatic file hierarchy suggestion',
                  'Malicious files detection',
                  'Advanced file search (search by image, voice)',
                  'Automatic file translation (limited to 10 files per week)',
                ].map((feature, index) => (
                  <li key={index} className="flex items-start mb-2">
                    <Image src={whiteCheck} alt="Check" className="w-5 h-5 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <button className="flex items-center justify-between bg-gray-700 text-white rounded-xl px-6 py-2 mt-auto hover:bg-cf-yellow">
              <span>Buy plan</span>
              <Image src={arrow} alt="Arrow" className="ml-2" />
            </button>
          </div>
          <div className="bg-black p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-semibold mb-2">Premium Plan</h3>
              <p className="text-cf-purple text-lg mb-4">49.99 $US/month</p>
              <ul className="text-gray-400 mb-6">
                {[
                  '2 TB Storage',
                  'All features of the Standard Plan',
                  'Unlimited automatic file translation',
                  'Enhanced data backup with versioning',
                  'Priority customer support',
                  'Possibility to deploy the app locally',
                ].map((feature, index) => (
                  <li key={index} className="flex items-start mb-2">
                    <Image src={whiteCheck} alt="Check" className="w-5 h-5 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <button className="flex items-center justify-between bg-gray-700 text-white rounded-xl px-6 py-2 mt-auto hover:bg-cf-purple">
              <span>Buy plan</span>
              <Image src={arrow} alt="Arrow" className="ml-2" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 mt-8">
          <div className="bg-black p-6 rounded-lg shadow-lg flex justify-between items-center gap-x-20 py-20">
            <div className="flex-1">
              <h3 className="text-3xl font-semibold mb-2">Enterprise Plan</h3>
              <p className="text-cf-blue text-lg mb-4">Custom pricing</p>
              <button className="w-1/2 flex items-center justify-between bg-gray-700 text-white rounded-xl px-6 py-2 mt-auto hover:bg-cf-blue">
                <span>Buy plan</span>
                <Image src={arrow} alt="Arrow" className="ml-2" />
              </button>
            </div>
            <ul className="text-gray-400 mb-6">
              {[
                'Customizable storage (starting at 5 TB)',
                'All features of the Premium Plan',
                'Custom integration and API access',
                'Custom training and onboarding sessions',
                'SLA (Service Level Agreement) with guaranteed uptime',
                'Priority client support',
              ].map((feature, index) => (
                <li key={index} className="flex items-start mb-2">
                  <Image src={whiteCheck} alt="Check" className="w-5 h-5 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plans;
