'use client';

import Input from '../input';
import React, { useState } from 'react';

interface CardProps {
  title: string;
  inputPlaceholder: string;
  onCancel: () => void;
  onCreate: (name: string, image: File | null) => void;
  includeFileInput?: boolean; // Optional prop to include file input
}

const Cardadd: React.FC<CardProps> = ({
  title,
  inputPlaceholder,
  onCancel,
  onCreate,
  includeFileInput,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setImage(file);
  };

  return (
    <div className="bg-dar-card text-white p-6 rounded-lg shadow-md w-72 z-[110]">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <Input
        isPassword={false}
        isOTP={false}
        placeholder={inputPlaceholder}
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
      />

      {/* Conditionally render the file input with enhanced styling */}
      {includeFileInput && (
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2" htmlFor="image">
            Select an image
          </label>
          <div className="relative w-full">
            <input
              type="file"
              accept="image/*"
              id="image"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-600 file:text-white
                hover:file:bg-blue-700
              "
            />
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm text-white opacity-70 hover:opacity-100 transition-opacity"
        >
          Cancel
        </button>
        <button
          onClick={() => onCreate(inputValue, image)}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Cardadd;
