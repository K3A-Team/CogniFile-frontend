'use client';

import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import addCollaborator from '@/public/add_collaborator.png';
import arrowbtm from '@/public/arrow_btm.png';
import arrowUp from '@/public/arrow_up.png';
import close from '@/public/close.webp';
import magicBlue from '@/public/magicBlue.png';
import settingsOrange from '@/public/settings_orange.svg';
import Button from '@/src/app/components/core/button';
import Input from '@/src/app/components/core/input';

interface Workspace {
  imagePath: string;
  id: string;
  rootFolderId: string;
  name: string;
  members: {
    firstName: string;
    lastName: string;
    id: string;
    email: string;
  }[];
}

const ShareCard = ({ SharedInfos, onClose }: { SharedInfos: Workspace; onClose: () => void }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [members, setMembers] = useState(SharedInfos.members); // New state for members list

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('userEmail', email);
    formData.append('workspaceId', SharedInfos.id);
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null); // Clear previous messages

    try {
      const response = await fetch('/api/storage/shared/add', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 200) {
        const newCollaborator = await response.json(); // Assuming API returns the newly added collaborator
        setMembers([...members, newCollaborator]); // Update members list
        setSuccessMessage('Collaborator added successfully!');
        setEmail('');
        setTimeout(() => setSuccessMessage(null), 3000); // Optional: Clear message after 3 seconds
        window.location.reload();
      } else {
        throw new Error('Failed to add collaborator');
      }
    } catch (err) {
      setError('Could not add collaborator. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-dar-card text-white p-4 rounded-[8px] shadow-md w-[400px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Share {SharedInfos.name}</h2>
        <Image
          src={close}
          alt="Close"
          className="lg:w-8 w-8 hover:cursor-pointer"
          onClick={onClose}
        />
      </div>

      <Input
        placeholder="Add people, groups, or calendar events"
        isPassword={false}
        isOTP={false}
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="mt-4">
        <h3 className="text-sm font-semibold">Users with access</h3>
        <div className="items-center mt-8">
          {members.map(infos => (
            <div key={infos.id} className="w-full flex justify-between items-start mt-4">
              <div>
                <p className="font-semibold">
                  {infos.firstName} {infos.lastName}
                </p>
                <p className="text-sm text-gray-500">{infos.email}</p>
              </div>
              <Image src={close} alt="Remove" className="lg:w-8 w-8 hover:cursor-pointer" />
            </div>
          ))}
        </div>
      </div>

      <button
        className="mt-6 w-full py-2 px-4 lg:scale-100 scale-75 bg-gradient-to-r dark:from-[#DEDEDE] dark:to-[#787878] text-dar-card font-semibold rounded-full transition-all"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
};

const SharedStorage = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null); // Track the selected workspace
  const [isCardOpen, setIsCardOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/storage/shared');
        setWorkspaces(response.data.content);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-16 mt-20">
        <div className="flex items-center gap-x-12">
          <div className="flex items-center gap-x-2">
            <h2 className="text-3xl font-normal">My Storage</h2>
            <button>
              <FaChevronDown />
            </button>
          </div>
          <div className="hover:cursor-pointer">
            <Button
              text="Enhanced File Hierarchy"
              icon={<Image src={magicBlue} alt="" />}
              color={1}
              onClick={() => 'clicked'}
            />
          </div>
        </div>
        <div className="flex gap-8 items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center px-4 py-2 rounded-full gap-2 bg-[#252525]">
              <p className="text-white font-regular">Name</p>
              <Image src={arrowbtm} alt="arrowUp rotate-90" />
            </div>
            <Image src={arrowUp} alt="arrowUp" />
          </div>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center gap-6 h-full mt-20">
          <div className="text-center">
            <Image
              src={settingsOrange}
              alt="Loading Icon"
              className={`mx-auto mb-4 ${loading ? 'animate-spin' : ''}`}
            />
            <p className="text-2xl lg:text-4xl bg-Orange-gradient bg-clip-text text-transparent">
              Loading shared storages...
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {workspaces.map(workspace => (
            <button
              key={workspace.id}
              className="flex flex-col gap-y-4 items-center p-5 rounded-lg bg-dar-card"
              onClick={() => {
                setSelectedWorkspace(workspace);
                setIsCardOpen(true);
              }}
            >
              <div className="w-full bg-[#1E1E1E] rounded hover:bg-[#282828] flex items-center justify-center py-3">
                <Image src={addCollaborator} alt="Collaborator" width={24} height={24} />
              </div>
              <img src={workspace.imagePath} className="w-60 h-52 object-cover rounded-md" />
              <h3 className="text-lg font-semibold text-white">{workspace.name}</h3>
            </button>
          ))}
        </div>
      )}

      {isCardOpen && selectedWorkspace && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dar-card p-8 rounded-lg relative">
            {/* Pass the setIsCardOpen function as onSave */}
            <ShareCard SharedInfos={selectedWorkspace} onClose={() => setIsCardOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default SharedStorage;
