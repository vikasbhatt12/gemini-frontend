// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AuthPage from './pages/AuthPage';
import OtpPage from './pages/OtpPage'; // 1. Import OtpPage

// 2. Create a placeholder Dashboard component for now
function Dashboard() {
  return <div className="p-8"><h1 className="text-3xl">Welcome to your Dashboard!</h1></div>;
}

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <main className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 min-h-screen">
        <Routes>
          {/* 3. Add the new routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/otp" element={<OtpPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;