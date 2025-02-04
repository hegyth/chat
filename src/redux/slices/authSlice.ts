import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  authenticationData: {
    idInstance: string;
    apiTokenInstance: string;
  };
}

const initialState: InitialState = {
  authenticationData: {
    idInstance: "",
    apiTokenInstance: "",
  },
};

export const authSlice = createSlice({
  name: "authData",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.authenticationData = action.payload;
    },
  },
});

export const { setAuthData } = authSlice.actions;

export default authSlice.reducer;
