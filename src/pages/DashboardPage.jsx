// src/pages/DashboardPage.jsx
import { useSelector } from 'react-redux';
import { Sidebar } from '../components/common/Sidebar';
import { ChatWindow } from '../components/chat/ChatWindow';

export function DashboardPage() {
  const { chatrooms, activeChatroomId } = useSelector((state) => state.chat);
  const activeChatroom = chatrooms.find(room => room.id === activeChatroomId);

  return (
    <div className="flex h-screen">
      <div className="w-1/4 max-w-xs h-full border-r dark:border-gray-700">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        {activeChatroom ? (
          <ChatWindow chatroom={activeChatroom} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-xl text-gray-500">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}