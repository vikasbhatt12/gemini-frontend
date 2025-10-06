// src/components/chat/ChatWindow.jsx
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MessageInput } from './MessageInput';
import { addMessage } from '../../features/chat/chatSlice';

// A simple component for rendering one message
function Message({ message }) {
  const isUser = message.sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-md p-3 rounded-lg ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
        <p>{message.text}</p>
      </div>
    </div>
  );
}

export function ChatWindow({ chatroom }) {
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const messages = chatroom.messages;

  // Auto-scroll to the bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate AI reply
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
      }, 1500); // Simulate "thinking" time
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