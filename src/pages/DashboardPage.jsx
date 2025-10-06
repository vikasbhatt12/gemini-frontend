// src/pages/DashboardPage.jsx
import { Sidebar } from '../components/common/Sidebar';

export function DashboardPage() {
  return (
    <div className="flex h-screen">
      <div className="w-1/4 max-w-xs h-full border-r dark:border-gray-700">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        {/* The main chat interface will go here */}
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl text-gray-500">Select a chat to start messaging</p>
        </div>
      </div>
    </div>
  );
}