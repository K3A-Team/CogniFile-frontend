'use client';

import FileCard from '../filecard';
import axios from 'axios';
import debounce from 'lodash/debounce';
import Image from 'next/image';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Camera from '@/public/Camera.svg';
import LightCamera from '@/public/LightCamera.svg';
import LightMicrophone from '@/public/LightMicrophone.svg';
import Microphone from '@/public/Microphone.svg';
import shape7 from '@/public/Power-light.png';
import shape5 from '@/public/Power.png';
import SearchIcon from '@/public/Search.svg';
import LightSearchIcon from '@/public/search_light.svg';
import useTheme from '@/src/hooks/useTheme';

interface Query {
  text: string;
}

interface SearchResult {
  writeId: string[];
  tags: string[];
  readId: string[];
  size: string;
  id: string;
  url: string;
  folder: string;
  ownerId: string;
  interactionDate: string;
  name: string;
}

interface SearchResponse {
  success: boolean;
  result: SearchResult[];
}

function Search() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState('');
  const [query, setQuery] = useState<Query>({ text: '' });
  const [isSearching, setIsSearching] = useState(false);
  const { theme } = useTheme();

  const performSearch = useCallback(async (searchText: string) => {
    if (!searchText.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    try {
      const response = await axios.post<SearchResponse>('/api/search', { query: searchText });
      if (response.data.success) {
        setSearchResults(response.data.result);
        setError('');
      } else {
        setSearchResults([]);
        setError('No results found.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      setSearchResults([]);
    }
    setIsSearching(false);
  }, []);

  const debouncedSearch = useMemo(() => debounce(performSearch, 300), [performSearch]);

  useEffect(() => {
    debouncedSearch(query.text);
    // Cleanup function to cancel any pending debounced calls
    return () => debouncedSearch.cancel();
  }, [query.text, debouncedSearch]);

  return (
    <div className="relative z-[99]">
      <form className="h-14 sm:w-[540px] w-[80vw] border dark:border-white border-[#7D7D7D] rounded-full flex px-2 py-2 justify-between">
        <div className="flex items-center justify-center gap-2 w-[70%] z-10">
          <div className="w-8 h-8 flex items-center justify-center cursor-pointer">
            <Image src={shape5} alt="Shape 5" className="dark:block hidden h-6 w-auto" />
            <Image src={shape7} alt="Shape 5" className="block dark:hidden h-6 w-auto" />
          </div>
          <input
            type="text"
            value={query.text}
            onChange={event => setQuery({ text: event.target.value })}
            placeholder={'Search in the storage'}
            className="bg-transparent outline-none dark:placeholder:text-[#FFFFFF] placeholder:text-[#262626] placeholder:sm:text-lg placeholder:text-sm w-full"
          />
        </div>
        <div className="flex items-center justify-center gap-4">
          <Image src={theme === 'dark' ? Camera : LightCamera} alt="Camera" className="w-7" />
          <Image
            src={theme === 'dark' ? Microphone : LightMicrophone}
            alt="Microphone"
            className="w-6"
          />
          <div className="dark:bg-[#4C4C4C] bg-[#F0F0F0] h-10 w-10 rounded-full flex items-center justify-center hover:cursor-pointer">
            <Image
              src={theme === 'dark' ? SearchIcon : LightSearchIcon}
              alt="Search"
              className="w-5"
            />
          </div>
        </div>
      </form>
      {isSearching && (
        <div className="w-full bg-dar-card h-[400px] rounded-[8px] absolute top-16 overflow-y-scroll flex items-center justify-center">
          <p className="text-white">Searching...</p>
        </div>
      )}
      {!isSearching && searchResults.length > 0 && (
        <div className="w-full bg-dar-card h-[400px] rounded-[8px] absolute top-16 overflow-y-scroll">
          <div className="grid grid-cols-2 gap-8 p-16">
            {searchResults.map(file => (
              <a href={file.url} download key={file.id}>
                <FileCard fileName={file.name} fileSize={file.size} />
              </a>
            ))}
          </div>
        </div>
      )}
      {error && <p className="text-red-500 mt-2 absolute top-16">{error}</p>}
    </div>
  );
}

export default Search;
