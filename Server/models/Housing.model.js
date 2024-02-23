import mongoose from "mongoose";

const Schema = mongoose.Schema;

const housingSchema = new Schema({
  address: { type: String, required: true },
  landlordInfo: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  facilityDetails: {
    beds: { type: Number, required: true },
    mattresses: { type: Number, required: true },
    tables: { type: Number, required: true },
    chairs: { type: Number, required: true },
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
