import customFetch from "../../utils/customFetch";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getComment = createAsyncThunk(
  "comment/getComment",
  async (body) => {
    try {
      const res = await customFetch.post("/comment", body);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

export const createComment = createAsyncThunk(
  "comment/createComment",
  async (body) => {
    try {
      const res = await customFetch.post("/comment/add", body);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

const CommentSlice = createSlice({
  name: "comment",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createComment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default CommentSlice.reducer;
