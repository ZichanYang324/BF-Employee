import mongoose from 'mongoose';
import constants from '../config/constants.js';

const registrationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '3h' },
  status: { type: String, enum: constants.registrationLinkStatus, default: "Not Used"}
});

export default mongoose.model('Registration', registrationSchema);