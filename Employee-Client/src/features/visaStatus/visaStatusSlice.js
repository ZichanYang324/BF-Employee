import customFetch from "../../utils/customFetch";
import { customFetch2 } from "../../utils/customFetch";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDocumentStatus = createAsyncThunk(
  "visaStatus/fetchDocumentStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await customFetch.get("/documents/my");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateDocumentStatus = createAsyncThunk(
  "visaStatus/updateDocumentStatus",
  async ({ documentId, status }, { rejectWithValue }) => {
    try {
      const response = await customFetch.patch(
        `/documents/${documentId}/status`,
        { status },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
// export const uploadDocument = createAsyncThunk('visaStatus/uploadDocument',
//   async ({ documentType, file }, { rejectWithValue }) => {
//     console.log('Preparing to send:', file, documentType); // Debugging line
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('documentType', documentType);

//     try {
//       const response = await customFetch2.post('/documents/upload', formData);
//       return response.data;
//     } catch (error) {
//       console.error('Upload error:', error);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const uploadDocument = createAsyncThunk(
  "visaStatus/uploadDocument",
  async ({ documentType, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("documentType", documentType);

      const response = await customFetch.post("/documents/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      // Include error handling logic based on the response status code
      let errorMessage = "An unexpected error occurred.";
      if (error.response.status === 403) {
        errorMessage =
          "You must wait for the previous document to be approved before uploading this document.";
      } else if (error.response.status === 400) {
        errorMessage = "No file uploaded or file is missing.";
      }
      return rejectWithValue(errorMessage);
    }
  },
);

// The initial state and slice remain mostly unchanged
const initialState = {
  documents: [],
  status: "idle", // 'loading', 'succeeded', 'failed'
  error: null,
};

const visaStatusSlice = createSlice({
  name: "visaStatus",
  initialState,
  reducers: {
    // Reducer logic...
  },
  extraReducers: (builder) => {
    builder
      // Handling fetchDocumentStatus
      .addCase(fetchDocumentStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDocumentStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.documents = action.payload || [];
      })
      .addCase(fetchDocumentStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Handling uploadDocument
      .addCase(uploadDocument.pending, (state) => {})
      .addCase(uploadDocument.fulfilled, (state, action) => {
        state.documents.push(action.payload);
      })
      .addCase(uploadDocument.rejected, (state, action) => {
        state.error = action.error.message;
        //alert(action.error.message);
      });
  },
});

export const { documentUploaded, documentStatusUpdated } =
  visaStatusSlice.actions;

export default visaStatusSlice.reducer;
