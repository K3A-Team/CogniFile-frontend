/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import axios from 'axios';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import cognibot from '@/public/Cognibot.svg';
import Microphone from '@/public/Microphone.svg';
import Send from '@/public/Send.svg';
import close from '@/public/close.webp';

/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatbotResponse {
  success: boolean;
  result: string;
  message?: string;
}

interface BotProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

function Bot({ messages, setMessages }: BotProps) {
  const [input, setInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    setInput('');

    try {
      const response = await axios.post<ChatbotResponse>('/api/chatbot', { question: input });
      const { data } = response;

      if (data.success) {
        setMessages(prev => [...prev, { text: data.result, isUser: false }]);
      } else {
        throw new Error(data.message || 'Error fetching response');
      }
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { text: 'An error occurred. Please try again.', isUser: false },
      ]);
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div
        className="flex flex-col items-start w-full h-[400px] overflow-y-scroll p-4 space-y-4"
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
              className={`bg-[#303030] text-white py-4 px-6 rounded-[4px] max-w-xs text-sm lg:text-md`}
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
            className="w-full bg-transparent text-white outline-none placeholder:text-[#989898]"
          />
          <Image src={Microphone} alt="Microphone Icon" className="w-5" />
        </div>
        <button type="submit" className="px-4">
          <div className="mt-4 flex items-center bg-[#303030] rounded-full px-5 py-4 hover:cursor-pointer">
            <Image src={Send} alt="Send Icon" className="w-8 h-7" />
          </div>
        </button>
      </form>
    </div>
  );
}

function Chatbot() {
  const [toggle, setToggle] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi, I'm Cognibot. How can I help you today?", isUser: false },
  ]);

  const handleClear = async () => {
    setMessages([{ text: "Hi, I'm Cognibot. How can I help you today?", isUser: false }]);
  };

  return (
    <>
      {toggle && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="w-full max-w-lg mx-4 p-6 bg-[#191919] rounded-lg shadow-lg flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-white">Cognibot</h2>
              <div className="flex items-center gap-2">
                <button className="text-sm text-white underline" onClick={handleClear}>
                  Clear
                </button>
                <Image
                  src={close}
                  alt="Close Icon"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => setToggle(false)}
                />
              </div>
            </div>

            {/* Chat Component */}
            <Bot messages={messages} setMessages={setMessages} />
          </div>
        </div>
      )}

      {/* Fixed Button at Bottom */}
      <div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-[#191919] h-16 w-16 rounded-full flex items-center justify-center cursor-pointer z-50"
        onClick={() => setToggle(true)}
      >
        <Image src={cognibot} alt="Open Chatbot" className="w-8 invert" />
      </div>
    </>
  );
}

export default Chatbot;
