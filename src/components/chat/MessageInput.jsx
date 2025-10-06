// src/components/chat/MessageInput.jsx
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Send, Paperclip } from 'lucide-react';
import { addMessage } from '../../features/chat/chatSlice';
import { Button } from '../ui/Button';

export function MessageInput({ chatroomId }) {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const previewUrl = URL.createObjectURL(file);
      dispatch(addMessage({
        chatroomId,
        message: { type: 'image', content: previewUrl, sender: 'user' },
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addMessage({
        chatroomId,
        message: { type: 'text', content: text, sender: 'user' },
      }));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t bg-gray-50 dark:bg-gray-800 dark:border-gray-700 flex items-center gap-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      <Button type="button" onClick={() => fileInputRef.current.click()} className="bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 p-2 rounded-full h-10 w-10">
        <Paperclip size={20} />
      </Button>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            handleSubmit(e);
          }
        }}
        placeholder="Type your message..."
        className="flex-1 bg-transparent resize-none outline-none"
        rows={1}
      />
      <Button type="submit" className="rounded-full w-10 h-10 p-2">
        <Send size={20} />
      </Button>
    </form>
  );
}