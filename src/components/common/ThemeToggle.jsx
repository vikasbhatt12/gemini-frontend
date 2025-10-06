import { Sun, Moon, Monitor } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../../features/ui/uiSlice';

export function ThemeToggle() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.ui);

  return (
    <div className="flex items-center p-2 bg-gray-200 dark:bg-gray-900 rounded-lg">
      <button onClick={() => dispatch(setTheme('light'))} className={`p-2 rounded-md ${theme === 'light' ? 'bg-white shadow' : ''}`}>
        <Sun size={18} />
      </button>
      <button onClick={() => dispatch(setTheme('dark'))} className={`p-2 rounded-md ${theme === 'dark' ? 'bg-gray-700 text-white shadow' : ''}`}>
        <Moon size={18} />
      </button>
      <button onClick={() => dispatch(setTheme('system'))} className={`p-2 rounded-md ${theme === 'system' ? 'bg-gray-500 text-white shadow' : ''}`}>
        <Monitor size={18} />
      </button>
    </div>
  );
}