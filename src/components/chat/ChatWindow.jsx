// src/components/chat/ChatWindow.jsx
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import { MessageInput } from './MessageInput';
import { addMessage } from '../../features/chat/chatSlice';

function Message({ message }) {
  const isUser = message.sender === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    toast.success('Copied to clipboard!');
  };

  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`group flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <button 
        onClick={handleCopy} 
        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
      >
        <Copy size={16} />
      </button>
      
      <div className={`max-w-md p-3 rounded-lg ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
        <p>{message.text}</p>
        <p className={`text-xs mt-1 ${isUser ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'} text-right`}>
          {formattedTime}
        </p>
      </div>
    </div>
  );
}

export function ChatWindow({ chatroom }) {
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const messages = chatroom.messages;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.sender === 'user') {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        dispatch(addMessage({
          chatroomId: chatroom.id,
          message: { text: 'This is a simulated AI response.', sender: 'ai' },
        }));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [messages, chatroom.id, dispatch]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
        {isTyping && <p className="text-sm text-gray-500">Gemini is typing...</p>}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput chatroomId={chatroom.id} />
    </div>
  );
}