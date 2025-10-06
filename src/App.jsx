import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/authPage';

function App() {
  return (
    <BrowserRouter>
      <main className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 min-h-screen">
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          {/* We'll add the dashboard route '/' later */}
          
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;