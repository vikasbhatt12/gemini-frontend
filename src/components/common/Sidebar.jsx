// src/components/common/Sidebar.jsx
import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Plus, Trash2, MessageSquare, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { createChatroom, deleteChatroom, setActiveChatroom } from '../../features/chat/chatSlice';
import { useDebounce } from '../../hooks/useDebounce';
import { Button } from '../ui/Button';
import { ThemeToggle } from './ThemeToggle';

export function Sidebar() {
  const dispatch = useDispatch();
  const { chatrooms, activeChatroomId } = useSelector((state) => state.chat);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredChatrooms = useMemo(() => {
    if (!debouncedSearchTerm) return chatrooms;
    return chatrooms.filter(room =>
      room.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [chatrooms, debouncedSearchTerm]);

  const handleNewChat = () => {
    dispatch(createChatroom());
    toast.success('New chat created!');
  };

  const handleDeleteChat = (e, roomId) => {
    e.stopPropagation();
    dispatch(deleteChatroom(roomId));
    toast.error('Chat deleted!');
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-800 p-3">
      <Button onClick={handleNewChat} className="flex items-center justify-center gap-2">
        <Plus size={20} /> New Chat
      </Button>
      
      <div className="relative my-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search chats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 pl-10 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        <ul className="space-y-2">
          {filteredChatrooms.map((room) => (
            <li
              key={room.id}
              onClick={() => dispatch(setActiveChatroom(room.id))}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                activeChatroomId === room.id
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <MessageSquare size={18} />
                <span className="truncate">{room.title}</span>
              </div>
              <button
                onClick={(e) => handleDeleteChat(e, room.id)}
                className="p-1 rounded-md hover:bg-red-500/20 text-gray-500 hover:text-red-500 dark:text-gray-400"
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto">
        <ThemeToggle />
      </div>
    </div>
  );
}