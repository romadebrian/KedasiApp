import { configureStore } from "@reduxjs/toolkit";
import dataPengguna from "./dataUser";

export default configureStore({
  reducer: {
    dataPengguna,
  },
});
