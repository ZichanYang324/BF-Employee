import customFetch from "../../utils/customFetch";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCurrentEmployeeReport = createAsyncThunk(
  "report/getCurrentEmployeeReport",
  async (profileId) => {
    const res = customFetch.post("/report", {
      profileId,
    });
    return res.data;
  },
);

export const createReport = createAsyncThunk(
  "report/createReport",
  async (body, thunkAPI) => {
    try {
      const res = customFetch.post("/report/add", body);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: "Failed to create report",
        error: error.response?.data?.msg,
      });
    }
  },
);

const ReportSlice = createSlice({
  name: "report",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentEmployeeReport.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCurrentEmployeeReport.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getCurrentEmployeeReport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createReport.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createReport.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createReport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default ReportSlice.reducer;
