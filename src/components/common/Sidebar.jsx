import { useSelector, useDispatch } from 'react-redux';
import { Plus, Trash2, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import { createChatroom, deleteChatroom, setActiveChatroom  } from '../../features/chat/chatSlice';
import { Button } from '../ui/Button';
import { ThemeToggle } from './ThemeToggle'; // Import ThemeToggle


export function Sidebar() {
  const dispatch = useDispatch();
  const { chatrooms, activeChatroomId } = useSelector((state) => state.chat);

  const handleNewChat = () => {
    dispatch(createChatroom());
    toast.success('New chat created!');
  };

  const handleDeleteChat = (e, roomId) => {
    e.stopPropagation(); // Prevent the chat from being selected when deleting
    dispatch(deleteChatroom(roomId));
    toast.error('Chat deleted!');
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-800 p-3">
      <Button onClick={handleNewChat} className="flex items-center justify-center gap-2 mb-4">
        <Plus size={20} /> New Chat
      </Button>
      <div className="flex-1 overflow-y-auto pr-1">
        <ul className="space-y-2">
          {chatrooms.map((room) => (
            <li
              key={room.id}
              // Add onClick to the list item
              onClick={() => dispatch(setActiveChatroom(room.id))}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                activeChatroomId === room.id
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
            {/* ... rest of the li content ... */}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto"> {/* This pushes the toggle to the bottom */}
        <ThemeToggle />
      </div>
    </div>
  );
}