import { createStore } from "redux";
// import { configureStore } from "@reduxjs/toolkit";

import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";

const initialState = {
  userData: "Loading",
};

const reducer = (state = initialState, action) => {
  if (action.type === "SET_DATA") {
    return {
      userData: action.input,
    };
  }
  return state;
};

const store = createStore(reducer);

export default store;
