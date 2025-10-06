// src/pages/DashboardPage.jsx
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Sidebar } from '../components/common/Sidebar';
import { ChatWindow } from '../components/chat/ChatWindow';
import { ChatHeader } from '../components/chat/ChatHeader';
import { Menu } from 'lucide-react';

export function DashboardPage() {
  const { chatrooms, activeChatroomId } = useSelector((state) => state.chat);
  const activeChatroom = chatrooms.find(room => room.id === activeChatroomId);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Mobile Drawer */}
      <div className={`fixed inset-y-0 left-0 z-30 w-full max-w-xs transform transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar />
      </div>

      {/* Backdrop for mobile */}
      {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-20 md:hidden" />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {activeChatroom ? (
          <>
            <ChatHeader 
              chatroomTitle={activeChatroom.title}
              onMenuClick={() => setIsSidebarOpen(true)}
            />
            <ChatWindow chatroom={activeChatroom} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-4">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden absolute top-4 left-4 p-2 text-gray-600 dark:text-gray-300">
              <Menu size={24} />
            </button>
            <p className="text-xl text-gray-500 text-center">Select or create a chat to begin</p>
          </div>
        )}
      </div>
    </div>
  );
}