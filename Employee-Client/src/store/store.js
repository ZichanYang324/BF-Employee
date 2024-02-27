import profileSlice from "../features/profile/profileSlice.js";
import userSlice from "../features/user/userSlice.js";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    user: userSlice,
    profile: profileSlice,
  },
});
