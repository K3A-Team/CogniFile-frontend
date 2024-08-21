'use client';

import Input from '../input';
import React, { useState } from 'react';

interface CardProps {
  title: string;
  inputPlaceholder: string;
  onCancel: () => void;
  onCreate: () => void;
}

const Cardadd: React.FC<CardProps> = ({ title, inputPlaceholder, onCancel, onCreate }) => {
  const [inputValue, setInputValue] = useState('');

  /* Const handleCreate = () => {
    onCreate();
    setInputValue('');
  }; */
  return (
    <div className="bg-dar-card text-white p-4 rounded-[8px] shadow-md w-64">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <Input
        isPassword={false}
        isOTP={false}
        placeholder={inputPlaceholder}
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
      />
      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={onCancel}
          className="px-3 py-1 text-sm text-white hover:text-white opacity-30"
        >
          Cancel
        </button>
        <button
          onClick={onCreate}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Cardadd;
