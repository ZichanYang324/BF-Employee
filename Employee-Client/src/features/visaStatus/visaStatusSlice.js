import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDocumentStatus = createAsyncThunk('visaStatus/fetchDocumentStatus', async () => {
  const response = await axios.get('/api/documents/status');
  return response.data;
});

export const uploadDocument = createAsyncThunk('visaStatus/uploadDocument',
  async ({ documentType, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentType', documentType);

      const response = await axios.post('/api/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// The initial state and slice remain mostly unchanged
const initialState = {
    documents: [],
    status: 'idle', // 'loading', 'succeeded', 'failed'
    error: null,
  };
  
  const visaStatusSlice = createSlice({
    name: 'visaStatus',
    initialState,
    reducers: {
      // Reducer logic...
    },
    extraReducers: (builder) => {
      builder
        // Handling fetchDocumentStatus
        .addCase(fetchDocumentStatus.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchDocumentStatus.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.documents = action.payload.documents || []; // assuming payload is the array of documents
        })
        .addCase(fetchDocumentStatus.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        // Handling uploadDocument
        .addCase(uploadDocument.pending, (state) => {
        })
        .addCase(uploadDocument.fulfilled, (state, action) => {
          state.documents.push(action.payload); // assuming payload contains the new document
        })
        .addCase(uploadDocument.rejected, (state, action) => {
          // Optionally, handle upload error state
          state.error = action.error.message;
        });
    },
  });
  
  export const { documentUploaded, documentStatusUpdated } = visaStatusSlice.actions;
  
  export default visaStatusSlice.reducer;