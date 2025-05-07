import { configureStore } from "@reduxjs/toolkit";
import reducer from "./formSlice";

export const store = configureStore({
  reducer: {
    form: reducer,
  },
});
