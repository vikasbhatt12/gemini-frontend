// src/features/chat/chatSlice.js
import { createSlice } from '@reduxjs/toolkit'; // Correct import for createSlice
import { nanoid } from 'nanoid';                 // Correct import for nanoid

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
        messages: [],
        createdAt: new Date().toISOString(),
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
          text: message.text,
          sender: message.sender, // 'user' or 'ai'
          timestamp: new Date().toISOString(),
        });
      }
    },
  },
});

export const { 
  createChatroom, 
  deleteChatroom, 
  setActiveChatroom,
  addMessage,
} = chatSlice.actions;

export default chatSlice.reducer;