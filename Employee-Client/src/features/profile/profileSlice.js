import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: {
    street: "123 Main St",
    building: "Apt 101",
    city: "Anytown",
    state: "NY",
    zip: "12345",
  },
  car: {
    make: "Toyota",
    model: "Camry",
    color: "Black",
  },
  workAuth: {
    title: "OPT",
    startDate: "2021-01-01T00:00:00.000Z",
    endDate: "2023-01-01T00:00:00.000Z",
  },
  driversLicense: {
    number: "1234567890",
    state: "NY",
    expiration: "2025-01-01T00:00:00.000Z",
    document: "65dd5185b62e0ee8444bd454",
  },
  reference: {
    firstName: "Bob",
    lastName: "Smith",
    relationship: "Friend",
    phone: "113-456-7890",
    email: "bobsmith@bgptest.com",
  },
  OPTReceipt: {
    document: "65dd5185b62e0ee8444bd455",
    status: "APPROVED",
  },
  OPTEAD: {
    document: "65dd5185b62e0ee8444bd456",
    status: "REJECTED",
    feedback: "Incorrect date of birth",
  },
  I983: {
    document: "65dd5185b62e0ee8444bd457",
    status: "PENDING",
  },
  I20: {
    document: "65dd5185b62e0ee8444bd458",
    status: "APPROVED",
  },
  _id: "65dd5185b62e0ee8444bd459",
  firstName: "Alice",
  lastName: "Cooper",
  middleName: "B",
  preferredName: "Alice",
  gender: "FEMALE",
  profilePic: null,
  cellPhone: "123-456-7890",
  workPhone: "123-456-7890",
  SSN: "123-45-6789",
  DOB: "1990-01-01T00:00:00.000Z",
  immigrationStatus: "VISA",
  emergencyContacts: [
    {
      firstName: "Charlie",
      lastName: "Brown",
      relationship: "Friend",
      phone: "123-456-7890",
      email: "charlieb@bgptest.com",
      _id: "65dd5185b62e0ee8444bd45a",
    },
    {
      firstName: "David",
      lastName: "Johnson",
      relationship: "Friend",
      phone: "123-456-7890",
      email: "davidJohnson@bgptest.com",
      _id: "65dd5185b62e0ee8444bd45b",
    },
  ],
  applicationStatus: "APPROVED",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
});

export default profileSlice.reducer;
