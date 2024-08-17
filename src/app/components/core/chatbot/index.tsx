'use client';

import axios from 'axios';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Microphone from '@/public/Microphone.svg';
import Send from '@/public/Send.svg';
import close from '@/public/close.webp';
import cognibot from '@/public/cognibot.svg';

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatbotResponse {
  success: boolean;
  result: string;
}

function Bot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi, I'm Cognibot, I'm so excited to make your file manipulation smooth and easier than ever!",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState('');
  const [token, setToken] = useState('');

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim() || !token) return;

    setMessages(prev => [...prev, { text: input, isUser: true }]);
    setInput('');

    try {
      const response = await axios.post<ChatbotResponse>(
        'http://34.41.104.20:8000/chatbot/chatbot',
        { question: input },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.data;

      if (data.success) {
        setMessages(prev => [...prev, { text: data.result, isUser: false }]);
      } else {
        setMessages(prev => [
          ...prev,
          { text: "Sorry, I couldn't process that request.", isUser: false },
        ]);
      }
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { text: 'An error occurred. Please try again.', isUser: false },
      ]);
    }

    setInput('');
  };

  return (
    <div className="h-full w-full relative">
      <div className="flex flex-col items-start absolute bottom-0 w-full">
        <div
          className="flex flex-col h-[400px] overflow-y-scroll p-4 space-y-4 w-full gap-8 md:gap-0 "
          ref={chatContainerRef}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-center ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!message.isUser && (
                <div className="bg-white p-3 rounded-full mr-2 items-center justify-center hidden xl:flex">
                  <Image src={cognibot} alt="Logo" className="lg:w-6" />
                </div>
              )}
              <div
                className={`bg-[#303030] text-white py-4 px-6 border-[0.5px] border-white rounded-[4px] max-w-xs text-sm lg:text-md ${message.isUser ? '' : ''}`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="w-full flex justify-between">
          <div className="w-full mt-4 flex justify-between items-center bg-[#303030] rounded-full px-8">
            <input
              type="text"
              placeholder="Write something"
              value={input}
              onChange={event => setInput(event.target.value)}
              className="flex justify-between w-full bg-transparent text-white outline-none placeholder:text-[#989898]"
            />
            <Image src={Microphone} alt="Logo" className="w-5" />
          </div>
          <button type="submit" className="px-4 bg-blue-500 text-white">
            <div className="mt-4 flex items-center bg-[#303030] rounded-full px-5 py-4 hover:cursor-pointer">
              <Image src={Send} alt="Logo" className="w-8 h-7 " />
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}

function Chatbot() {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="rleative h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col gap-8 items-center w-full h-[736px] relative">
        <div
          className={` ${toggle ? 'block' : 'hidden'} xl:w-[40%] sm:w-[80%] w-[90%] px-6 py-8 lg:p-12 bg-[#191919] h-[640px] rounded-[1rem] absolute top-0 overflow-clip`}
        >
          <div className="absolute w-full px-12 py-6 bg-[#191919] flex justify-between items-center top-0 left-0 z-10 shadow-lg">
            <h2 className="text-xl">CogniBot</h2>
            <div className="flex gap-4 items-center">
              <p className="text-[#ffffff] opacity-50 underline font-medium text-md hover:cursor-pointer">
                clear
              </p>
              <Image
                src={close}
                alt="Logo"
                className="lg:w-12 w-8 hover:cursor-pointer"
                onClick={() => setToggle(false)}
              />
            </div>
          </div>
          <Bot />
        </div>

        <div
          className="bg-[#191919] h-20 w-20 rounded-full absolute bottom-0 flex items-center justify-center"
          role="button"
          tabIndex={0}
          onClick={() => setToggle(!toggle)}
          onKeyDown={event => {
            if (event.key === 'Enter' || event.key === ' ') {
              setToggle(!toggle);
            }
          }}
        >
          <Image src={cognibot} alt="Logo" className="w-8 invert" />
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
