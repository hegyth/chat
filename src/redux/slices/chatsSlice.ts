import { createSlice } from "@reduxjs/toolkit";
import { Chats } from "../../types/types";

interface InitialState {
  chats: Chats;
}

const initialState: InitialState = {
  chats: {},
};

export const chatsSlice = createSlice({
  name: "chatsData",
  initialState,
  reducers: {
    addChat: (state, action) => {
      state.chats[action.payload] = [];
    },
    addMessage: (state, action) => {

      const { chatId, idMessage, textMessage, sender, time} = action.payload

      state.chats[chatId] = [...state.chats[chatId], {idMessage, textMessage, sender, time}];
    },
  },
});

export const { addChat, addMessage } = chatsSlice.actions;

export default chatsSlice.reducer;
