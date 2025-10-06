// src/components/chat/ChatWindow.jsx
import { useEffect, useRef, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { Copy, Loader2 } from 'lucide-react';
import { MessageInput } from './MessageInput';
import { addMessage, loadOlderMessages } from '../../features/chat/chatSlice';

const MESSAGES_PER_PAGE = 20;

function Message({ message }) {
  const isUser = message.sender === 'user';

  const handleCopy = () => {
    if (message.type === 'text') {
      navigator.clipboard.writeText(message.content);
      toast.success('Copied to clipboard!');
    }
  };

  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className={`group flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <button 
        onClick={handleCopy} 
        className={`opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 ${message.type !== 'text' && 'hidden'}`}
      >
        <Copy size={16} />
      </button>
      
      <div className={`max-w-md rounded-lg ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'} ${message.type === 'image' ? 'p-1' : 'p-3'}`}>
        {message.type === 'image' ? (
          <img src={message.content} alt="uploaded content" className="rounded-md max-w-xs" />
        ) : (
          <p className="whitespace-pre-wrap">{message.content}</p>
        )}
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
  const scrollContainerRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoadingOlder, setIsLoadingOlder] = useState(false);
  
  const visibleMessages = useMemo(() => {
    const totalMessages = chatroom.messages.length;
    const end = totalMessages;
    const start = Math.max(0, totalMessages - chatroom.messagesCurrentPage * MESSAGES_PER_PAGE);
    return chatroom.messages.slice(start, end);
  }, [chatroom.messages, chatroom.messagesCurrentPage]);

  const handleScroll = () => {
    if (scrollContainerRef.current.scrollTop === 0 && !isLoadingOlder) {
      const totalMessages = chatroom.messages.length;
      const currentlyVisible = visibleMessages.length;
      if (currentlyVisible < totalMessages) {
        setIsLoadingOlder(true);
        const oldScrollHeight = scrollContainerRef.current.scrollHeight;
        
        setTimeout(() => {
          dispatch(loadOlderMessages(chatroom.id));
          
          setTimeout(() => {
            const newScrollHeight = scrollContainerRef.current.scrollHeight;
            scrollContainerRef.current.scrollTop = newScrollHeight - oldScrollHeight;
            setIsLoadingOlder(false);
          }, 100);
        }, 500);
      }
    }
  };

  useEffect(() => {
    const lastVisibleMessageId = visibleMessages[visibleMessages.length - 1]?.id;
    const lastTotalMessageId = chatroom.messages[chatroom.messages.length - 1]?.id;
    
    // Only scroll to bottom if the last message is new
    if (lastVisibleMessageId === lastTotalMessageId) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [visibleMessages, chatroom.messages]);

  useEffect(() => {
    const lastMessage = chatroom.messages[chatroom.messages.length - 1];
    if (lastMessage?.sender === 'user' && lastMessage.type === 'text') {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        dispatch(addMessage({
          chatroomId: chatroom.id,
          message: { type: 'text', content: 'This is a simulated AI response to your text.', sender: 'ai' },
        }));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [chatroom.messages, chatroom.id, dispatch]);

  return (
    <div className="flex flex-col h-full">
      <div ref={scrollContainerRef} onScroll={handleScroll} className="flex-1 p-6 space-y-4 overflow-y-auto">
        {isLoadingOlder && (
          <div className="flex justify-center my-4">
            <Loader2 className="animate-spin text-gray-400" />
          </div>
        )}
        {visibleMessages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
        {isTyping && <p className="text-sm text-gray-500">Gemini is typing...</p>}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput chatroomId={chatroom.id} />
    </div>
  );
}