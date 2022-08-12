import { createStore } from "redux";

const initialState = {
  name: "Roma Debrians",
};

const reducer = (state = initialState, action) => {
  if (action.type === "SET_NAME") {
    return {
      name: "Debrian Roma",
    };
  }
  return state;
};

const store = createStore(reducer);

export default store;
