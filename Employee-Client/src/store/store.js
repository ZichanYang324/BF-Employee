import commentSlice from "../features/comment/commentSlice.js";
import housingSlice from "../features/housing/housingSlice.js";
import infoSlice from "../features/info/infoSlice.js";
import reportSlice from "../features/report/reportSlice.js";
import userSlice from "../features/user/userSlice.js";
import visaStatusReducer from "../features/visaStatus/visaStatusSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    user: userSlice,
    visaStatus: visaStatusReducer,
    info: infoSlice,
    housing: housingSlice,
    report: reportSlice,
    comment: commentSlice,
  },
});
