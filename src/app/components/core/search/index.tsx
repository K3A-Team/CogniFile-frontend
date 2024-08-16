'use client';

import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Camera from '@/public/Camera.svg';
import Microphone from '@/public/Microphone.svg';
import shape5 from '@/public/Power.png';
import SearchIcon from '@/public/Search.svg';
import shape7 from '@/public/shape7.png';

interface Query {
  text: string;
  NaturalSearch: boolean;
}

interface Result {
  files: Array<object>;
  folders: Array<object>;
}

interface ResponseSearch {
  success: boolean;
  result: Result;
}

interface ResponseNatural {
  success: boolean;
  message: string;
}

function Search() {
  const [searchResults, setSearchResults] = useState<object>({});
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [naturalSearch, SetNaturalSearch] = useState(false);
  const [query, setQuery] = useState<Query>({ text: '', NaturalSearch: naturalSearch });

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!query.text.trim() || !token) return;

    try {
      if (naturalSearch) {
        const response = await axios.post<ResponseNatural>(
          `http://34.41.104.20/search/natural_language`,
          { query: query.text },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 200) {
          setSearchResults(response.data);
        } else {
          setSearchResults({});
          setError('No results found.');
        }
      } else {
        const response = await axios.get<ResponseSearch>(
          `http://34.41.104.20/search/query_search?search=${query.text}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 200) {
          setSearchResults(response.data);
        } else {
          setSearchResults({});
          setError('No results found.');
        }
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="h-14 sm:w-[540px] w-[80vw]  border border-white rounded-full flex px-2 py-2 justify-between"
      >
        <div className="flex items-center justify-center gap-2 w-[70%]">
          {naturalSearch ? (
            <div className="w-8 h-8 flex items-center justify-center cursor-pointer">
              <Image
                src={shape5}
                alt="Shape 5"
                className="h-6 w-auto"
                onClick={() => {
                  SetNaturalSearch(false);
                  query.NaturalSearch = !false;
                }}
              />
            </div>
          ) : (
            <div className="w-8 h-8 flex items-center justify-center cursor-pointer">
              <Image
                src={shape7}
                alt="Shape 7"
                className="h-6 w-auto"
                onClick={() => {
                  SetNaturalSearch(true);
                  query.NaturalSearch = true;
                }}
              />
            </div>
          )}
          <input
            type="text"
            value={query.text}
            onChange={event => setQuery({ text: event.target.value, NaturalSearch: naturalSearch })}
            placeholder={'Search in the storage'}
            className="bg-transparent outline-none placeholder:text-[#FFFFFF] placeholder:sm:text-lg placeholder:text-sm w-full"
          />
        </div>

        <div className="flex items-center justify-center gap-4">
          <Image src={Camera} alt="Camera" className="w-7" />
          <Image src={Microphone} alt="Microphone" className="w-6" />
          <button
            type="submit"
            className="bg-[#4C4C4C] h-10 w-10 rounded-full flex items-center justify-center hover:cursor-pointer"
          >
            <Image src={SearchIcon} alt="Search" className="w-5" />
          </button>
        </div>
      </form>
      {error && <p>{error}</p>}
      {searchResults.toString()}
    </div>
  );
}

export default Search;
