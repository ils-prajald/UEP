import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userRegister } from "../action/authAction";

const initialState = {
  loading: false,
  loggedIn: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.loggedIn = false;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state) => {
        state.loading = false;
        state.loggedIn = true;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.loggedIn = false;
        state.error = action.error.message;
      })
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.loggedIn = false;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state) => {
        state.loading = false;
        state.loggedIn = true; // Adjust this as per your logic for registration success
        state.error = null;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.loggedIn = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;