// src/features/chat/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

// Helper to generate a large set of dummy messages for demonstration
const generateDummyMessages = () => {
  let messages = [];
  for (let i = 1; i <= 100; i++) {
    messages.push({
      id: nanoid(),
      type: 'text',
      content: `This is historical message number ${i}.`,
      sender: i % 3 === 0 ? 'user' : 'ai',
      timestamp: new Date(Date.now() - (100 - i) * 60000).toISOString(),
    });
  }
  return messages;
};

const initialState = {
  chatrooms: [],
  activeChatroomId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    createChatroom: (state) => {
      const newChatroom = {
        id: nanoid(),
        title: 'New Chat',
        messages: generateDummyMessages(), // Pre-populate with dummy data
        createdAt: new Date().toISOString(),
        messagesCurrentPage: 1, // Add pagination state
      };
      state.chatrooms.unshift(newChatroom);
      state.activeChatroomId = newChatroom.id;
    },
    deleteChatroom: (state, action) => {
      const chatroomIdToDelete = action.payload;
      state.chatrooms = state.chatrooms.filter(
        (room) => room.id !== chatroomIdToDelete
      );
      if (state.activeChatroomId === chatroomIdToDelete) {
        state.activeChatroomId = state.chatrooms[0]?.id || null;
      }
    },
    setActiveChatroom: (state, action) => {
      state.activeChatroomId = action.payload;
    },
    addMessage: (state, action) => {
      const { chatroomId, message } = action.payload;
      const chatroom = state.chatrooms.find(room => room.id === chatroomId);
      if (chatroom) {
        chatroom.messages.push({
          id: nanoid(),
          type: message.type,
          content: message.content,
          sender: message.sender,
          timestamp: new Date().toISOString(),
        });
      }
    },
    loadOlderMessages: (state, action) => {
      const chatroom = state.chatrooms.find(room => room.id === action.payload);
      if (chatroom) {
        chatroom.messagesCurrentPage += 1;
      }
    },
  },
});

export const { 
  createChatroom, 
  deleteChatroom, 
  setActiveChatroom,
  addMessage,
  loadOlderMessages, // Export the new action
} = chatSlice.actions;

export default chatSlice.reducer;