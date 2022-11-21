import { createSlice } from "@reduxjs/toolkit";

export const someGlobalData = createSlice({
  name: "globalData",
  initialState: {
    curentPage: "",
  },
  reducers: {
    tesReducer: (state) => {
      console.log("Test Reducer");
    },
    setCurentPage: (state, action) => {
      //   console.log(action.payload);
      state.curentPage = action.payload;
    },
  },
});

export const { tesReducer, setCurentPage } = someGlobalData.actions;

export default someGlobalData.reducer;
