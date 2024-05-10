import { createSlice } from "@reduxjs/toolkit";

export const dataUser = createSlice({
  name: "dataUser",
  initialState: {
    uid: null,
    email: "loading...",
    displayName: null,
    phoneNumber: null,
    photoURL: null,
  },
  reducers: {
    increment: (state) => {
      console.log("action.payload");
    },
    setUID: (state, action) => {
      // console.log(action.payload);
      state.uid = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setName: (state, action) => {
      state.displayName = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setPhotoUrl: (state, action) => {
      state.photoURL = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increment,
  setUID,
  setEmail,
  setName,
  setPhoneNumber,
  setPhotoUrl,
} = dataUser.actions;

export default dataUser.reducer;
