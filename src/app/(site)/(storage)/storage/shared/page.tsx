'use client';

import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import addCollaborator from '@/public/add_collaborator.png';
import arrowbtm from '@/public/arrow_btm.png';
import arrowUp from '@/public/arrow_up.png';
import close from '@/public/close.webp';
import settingsOrange from '@/public/settings_orange.svg';
import Cardadd from '@/src/app/components/core/cardadd';
// Import the Cardadd component
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
  const [members, setMembers] = useState(SharedInfos.members);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('userEmail', email);
    formData.append('workspaceId', SharedInfos.id);
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const response = await fetch('/api/storage/shared/add', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 200) {
        const newCollaborator = await response.json();
        setMembers([...members, newCollaborator]);
        setSuccessMessage('Collaborator added successfully!');
        setEmail('');
        setTimeout(() => setSuccessMessage(null), 3000);
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
  const [isAddCardOpen, setIsAddCardOpen] = useState(false); // Track the "Add shared storage" card
  const router = useRouter();

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

  const handleCreateSharedStorage = async (name: string, image: File | null) => {
    // If no name is provided, show an error
    if (!name) {
      toast.error('Storage name is required', {
        position: 'bottom-right',
        theme: 'dark',
      });
      return;
    }
    setIsAddCardOpen(false);
    // Show a loading toast while creating the shared storage
    const toastId = toast.loading('Creating shared storage...', {
      position: 'bottom-right',
      theme: 'dark',
    });

    try {
      // Create form data and append storage name and image if present
      const formData = new FormData();
      formData.append('name', name);
      if (image) {
        formData.append('image', image);
      }
      // Send the POST request to the backend to create the shared storage
      const response = await axios.post('/api/storage/shared', formData);

      if (!response.data.success) {
        const result = await response.data;
        throw new Error(result.message || 'Failed to create shared storage');
      }

      const result = await response.data.storageId;

      setWorkspaces([
        ...workspaces,
        {
          id: result.id,
          imagePath: result.imagePath,
          name: result.name,
          rootFolderId: result.rootFolderId,
          members: [],
        },
      ]);

      // If successful, update the UI and show a success toast
      toast.update(toastId, {
        render: 'Shared storage created successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
        theme: 'dark',
      });

      // Optionally: You can reload the page or trigger a UI update here
      window.location.reload();
    } catch (error) {
      // Show error toast in case of failure
      toast.update(toastId, {
        render: error instanceof Error ? error.message : 'An unknown error occurred',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
        theme: 'dark',
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-16 mt-20">
        <div className="flex items-center gap-x-6">
          <div className="flex items-center gap-x-2">
            <h2 className="text-3xl font-normal">My Storage</h2>
          </div>
          <div className="hover:cursor-pointer">
            <button
              className={`p-[1px] bg-white rounded-full flex items-center justify-center gap-2`}
              onClick={() => setIsAddCardOpen(true)} // Open the "Add shared storage" card
            >
              <div className="bg-[#1f1f1f] flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-clip-border">
                <span className={`bg-white text-transparent bg-clip-text text-lg`}>
                  Add a shared storage
                </span>
              </div>
            </button>
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
      ) : workspaces.length === 0 ? (
        <div className="text-center mt-12 text-lg text-gray-500">
          No available shared storages for you.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {workspaces.map(workspace => (
            <button
              key={workspace.id}
              className="flex flex-col gap-y-4 items-center p-5 rounded-lg bg-dar-card"
              onClick={() => {
                setSelectedWorkspace(workspace);
              }}
            >
              <div
                className="w-full bg-[#1E1E1E] rounded hover:bg-[#282828] flex items-center justify-center py-3"
                onClick={() => {
                  setIsCardOpen(true);
                }}
                onKeyDown={event => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    setIsCardOpen(true);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <Image src={addCollaborator} alt="Collaborator" width={24} height={24} />
              </div>
              <Image
                src={workspace.imagePath}
                className="w-60 h-52 object-cover rounded-md"
                alt="shared storage"
                onClick={() => {
                  router.push(`/storage/shared/${workspace.rootFolderId}`);
                }}
                onKeyDown={event => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    router.push(`/storage/shared/${workspace.rootFolderId}`);
                  }
                }}
                role="button"
                tabIndex={0}
              />
              <h3
                className="text-lg font-semibold text-white"
                onClick={() => {
                  router.push(`/storage/shared/${workspace.rootFolderId}`);
                }}
                onKeyDown={event => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    router.push(`/storage/shared/${workspace.rootFolderId}`);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                {workspace.name}
              </h3>
            </button>
          ))}
        </div>
      )}

      {isCardOpen && selectedWorkspace && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dar-card p-8 rounded-lg relative">
            <ShareCard SharedInfos={selectedWorkspace} onClose={() => setIsCardOpen(false)} />
          </div>
        </div>
      )}

      {isAddCardOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dar-card p-8 rounded-lg relative">
            <Cardadd
              title="Add a Shared Storage"
              inputPlaceholder="Storage name"
              onCancel={() => setIsAddCardOpen(false)}
              onCreate={handleCreateSharedStorage}
              includeFileInput={true}
            />
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default SharedStorage;
