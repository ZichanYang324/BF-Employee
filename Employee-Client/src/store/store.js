import userSlice from "../features/user/userSlice.js";
import visaStatusReducer from '../features/visaStatus/visaStatusSlice';

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    user: userSlice,
    visaStatus: visaStatusReducer,
  },
});
