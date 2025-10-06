// src/components/chat/ChatHeader.jsx
import { Menu } from 'lucide-react';

export function ChatHeader({ chatroomTitle, onMenuClick }) {
  return (
    <div className="p-4 border-b dark:border-gray-700 flex items-center gap-4">
      <button onClick={onMenuClick} className="md:hidden p-2 text-gray-600 dark:text-gray-300">
        <Menu size={24} />
      </button>
      <h2 className="text-xl font-semibold truncate">{chatroomTitle}</h2>
    </div>
  );
}