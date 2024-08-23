/* eslint-disable camelcase */
'use client';

import FolderCard from '../foldercard';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect, MouseEventHandler } from 'react';
import settingsBlue from '@/public/settings_blue.svg';
import { FolderHierarchy } from '@/src/types/responses';

/* eslint-disable camelcase */

/* eslint-disable camelcase */

/* eslint-disable camelcase */

const CombinedComponent = ({
  folderId,
  onClose,
}: {
  folderId: string;
  onClose: MouseEventHandler;
}) => {
  const router = useRouter();
  const [loadingTwo, setLoadingTwo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [folders, setFolders] = useState<
    { id: number; color: string; name: string; items: number; size: string }[]
  >([]);
  const [aiExplanation, setAiExplanation] = useState('');
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    // Function to fetch the AI-generated structure
    const fetchAiStructure = async () => {
      try {
        const response = await axios.post('/api/hierarchy', { folderID: folderId });
        const { ai_structure, ai_explanation, id: transactionId } = response.data.result;
        setTransactionId(transactionId);
        // Transform the ai_structure into the format required by the FolderCard
        const transformedFolders = ai_structure.children.map(
          (folder: FolderHierarchy, index: number) => ({
            id: index + 1, // Assuming you need a unique id for each folder
            color: index % 2 === 0 ? 'blue' : 'green', // Example logic to alternate colors
            name: folder.name,
            items: folder.files.length + folder.children.length, // Count files and subfolders as items
            size: 'Unknown', // Size is not provided, you may calculate or set a default
          }),
        );

        setFolders(transformedFolders);
        setAiExplanation(ai_explanation);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchAiStructure();
  }, [folderId]);

  const handleApprove = async () => {
    setLoadingTwo(true);
    try {
      await axios.get(`/api/hierarchy/${transactionId}`);
      router.push(`/storage/${folderId}`);
    } catch (error) {
      throw new Error(String(error));
    } finally {
      setLoadingTwo(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-16">
      <div className="bg-dar-card rounded-2xl w-2/3 h-[700px] p-16 overflow-y-scroll relative">
        {loading ? (
          <div className="flex items-center justify-center gap-6 p-32 h-full">
            <div className="text-center">
              <Image
                src={settingsBlue}
                alt="Loading Icon"
                className={`mx-auto mb-4 ${loading ? 'animate-spin' : ''}`}
              />
              <p className="text-4xl bg-Blue-gradient bg-clip-text text-transparent">
                Generating the new hierarchy
              </p>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-4xl font-medium text-white text-center mb-12">
              AI-Generated Folder Structure
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 h-full">
              {folders.map(folder => (
                <FolderCard
                  key={folder.id}
                  color={folder.color}
                  name={folder.name}
                  items={folder.items}
                  size={folder.size}
                />
              ))}
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white">AI Explanation</h3>
              <p className="text-gray-400 mt-2">{aiExplanation}</p>
            </div>
            <div className="mt-12 flex justify-center gap-4">
              <button className="text-gray-400" onClick={onClose}>
                Discard
              </button>
              <button
                type="submit"
                onClick={handleApprove}
                className={`px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 hover:text-gray-800 transform hover:scale-105 transition duration-300 ease-in-out ${
                  loadingTwo ? 'cursor-not-allowed' : ''
                }`}
                disabled={loadingTwo}
              >
                {loadingTwo ? (
                  <div className="w-6 h-6 border-4 border-t-transparent border-[#191919] rounded-full animate-spin"></div>
                ) : (
                  'Approve changes'
                )}
              </button>
            </div>
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white py-1 px-3 rounded-full"
        >
          x
        </button>
      </div>
    </div>
  );
};

export default CombinedComponent;
