import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  message: "",
  phone: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const { setName, setEmail, setPhone, setMessage, setError, resetForm } =
  formSlice.actions;
export default formSlice.reducer;
