import { configureStore } from "@reduxjs/toolkit";
import dataPengguna from "./dataUser";
import someGlobalData from "./someGlobalData";

export default configureStore({
  reducer: {
    dataPengguna,
    someGlobalData,
  },
});
