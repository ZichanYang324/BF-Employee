import customFetch from "../../utils/customFetch";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {
    data: {
      address: {},
      car: {},
      workAuth: {},
      driversLicense: {},
      reference: {},
      OPTReceipt: {},
      OPTEAD: {},
      I983: {},
      I20: {},
      _id: "",
      firstName: "",
      lastName: "",
      middleName: "",
      preferredName: "",
      gender: "",
      profilePic: null,
      cellPhone: "",
      workPhone: "",
      SSN: "",
      DOB: "",
      immigrationStatus: "",
      emergencyContacts: [],
      applicationStatus: "",
    },
    status: "idle",
    error: null,
  },
  documents: {
    data: [
      ["driversLicense", {}],
      ["OPTReceipt", {}],
      ["OPTEAD", {}],
      ["I983", {}],
      ["I20", {}],
    ],
    status: "idle",
    error: null,
  },
};

export const fetchProfile = createAsyncThunk("info/fetchProfile", async () => {
  const response = await customFetch.get("/profile");
  return response.data;
});

export const fetchDocuments = createAsyncThunk(
  "info/fetchDocuments",
  async () => {
    const response = await customFetch.get("/profile/documents");
    return response.data;
  },
);

const infoSlice = createSlice({
  name: "info",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.profile.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, { payload }) => {
        state.profile.status = "succeeded";
        state.profile.data = payload?.profile;
      })
      .addCase(fetchProfile.rejected, (state, { error }) => {
        state.profile.status = "failed";
        state.profile.error = error.message;
      })
      .addCase(fetchDocuments.pending, (state) => {
        state.documents.status = "loading";
      })
      .addCase(fetchDocuments.fulfilled, (state, { payload }) => {
        state.documents.status = "succeeded";
        state.documents.data = payload;
      })
      .addCase(fetchDocuments.rejected, (state, { error }) => {
        state.documents.status = "failed";
        state.documents.error = error.message;
      });
  },
});

export default infoSlice.reducer;
