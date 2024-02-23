import mongoose from "mongoose";

const Schema = mongoose.Schema;

const housingSchema = new Schema({
  address: { type: String, required: true },
  landlordInfo: {
    name: String,
    phone: String,
    email: String,
    required: true,
  },
  facilityDetails: {
    beds: Number,
    mattresses: Number,
    tables: Number,
    chairs: Number,
    required: true,
  },
  reports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FacilityReport",
    },
  ],
  assignedEmployees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
  ],
});

export default mongoose.model("Housing", housingSchema);
