import housingReduer from "../features/housing/housingSlice.js";
import infoSlice from "../features/info/infoSlice.js";
import userSlice from "../features/user/userSlice.js";
import visaStatusReducer from "../features/visaStatus/visaStatusSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    user: userSlice,
    visaStatus: visaStatusReducer,
    info: infoSlice,
    housing: housingReduer,
  },
});
