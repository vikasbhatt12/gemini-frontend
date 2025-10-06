import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid'; // A small library for generating unique IDs

const initialState = {
  chatrooms: [],
  activeChatroomId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // Action to load initial state from localStorage
    setInitialChatState: (state, action) => {
      return action.payload;
    },
    createChatroom: (state) => {
      const newChatroom = {
        id: nanoid(),
        title: 'New Chat',
        messages: [],
        createdAt: new Date().toISOString(),
      };
      state.chatrooms.unshift(newChatroom); // Add to the beginning of the list
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
    // We will add more actions like `addMessage` later
  },
});

export const { createChatroom, deleteChatroom, setInitialChatState } = chatSlice.actions;
export default chatSlice.reducer;