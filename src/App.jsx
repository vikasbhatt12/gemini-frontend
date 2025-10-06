// src/App.jsx
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AuthPage from './pages/AuthPage';
import OtpPage from './pages/OtpPage';
import { DashboardPage } from './pages/DashboardPage';

function App() {
  const { theme } = useSelector((state) => state.ui);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);
  
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <main className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 min-h-screen">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/otp" element={<OtpPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;