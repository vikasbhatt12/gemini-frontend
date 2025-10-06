// src/components/chat/MessageInput.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Send } from 'lucide-react';
import { addMessage } from '../../features/chat/chatSlice';
import { Button } from '../ui/Button';

export function MessageInput({ chatroomId }) {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addMessage({
        chatroomId,
        message: { text, sender: 'user' },
      }));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t bg-gray-50 dark:bg-gray-800 dark:border-gray-700 flex items-center gap-4">
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