import customFetch from "../../utils/customFetch";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchHousing = createAsyncThunk(
  "housing/fetchHousing",
  async (profileId) => {
    const res = await customFetch.post("/housing", {
      profileId,
    });
    return res.data;
  },
);

const HousingSlice = createSlice({
  name: "housing",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHousing.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHousing.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchHousing.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default HousingSlice.reducer;
