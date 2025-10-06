// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import chatReducer from '../features/chat/chatSlice'; 
import uiReducer from '../features/ui/uiSlice';

// 2. Function to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('chatState');
    if (serializedState === null) {
      return undefined; // No state found
    }
    return { chat: JSON.parse(serializedState) }; // Return state under the 'chat' key
  } catch (err) {
    return undefined;
  }
};

// 3. Function to save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.chat); // Only save the chat slice
    localStorage.setItem('chatState', serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    ui: uiReducer,
  },
  preloadedState, // 5. Load pre-existing state
});

// 6. Listen for store changes and save the state
store.subscribe(() => {
  saveState(store.getState());
});