import { createStore } from "redux";

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
