import { createSlice } from "@reduxjs/toolkit";

export const someGlobalData = createSlice({
  name: "globalData",
  initialState: {
    curentPage: "",
    tokenNotif: "",
  },
  reducers: {
    tesReducer: (state) => {
      console.log("Test Reducer");
    },
    setCurentPage: (state, action) => {
      //   console.log(action.payload);
      state.curentPage = action.payload;
    },
    setTokenNotif: (state, action) => {
      // console.log("Redux Action Log", action.payload);
      state.tokenNotif = action.payload;
    },
  },
});

export const { tesReducer, setCurentPage, setTokenNotif } =
  someGlobalData.actions;

export default someGlobalData.reducer;
