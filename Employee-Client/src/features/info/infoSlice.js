import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {
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
};

const infoSlice = createSlice({
  name: "info",
  initialState,
});

export default infoSlice.reducer;
