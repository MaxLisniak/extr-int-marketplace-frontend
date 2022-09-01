import { createSlice } from "@reduxjs/toolkit"
import { UserState } from "../types";
import { refreshAccessToken } from "./thunks";

const initialState: UserState = {
  accessToken: undefined,
  userId: undefined,
  email: undefined,
  firstName: undefined,
  lastName: undefined,
  isAdmin: undefined,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUser: (state, action) => {
      state.userId = action.payload.id;
      state.email = action.payload.email;
      state.firstName = action.payload.first_name;
      state.lastName = action.payload.last_name;
      state.isAdmin = action.payload.is_admin;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
      })
  }
})

export const {
  setAccessToken,
  setUser,
} = userSlice.actions;

export default userSlice.reducer;