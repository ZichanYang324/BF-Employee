import mongoose from 'mongoose';

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
  used: { type: Boolean, default: false }
});

export default mongoose.model('Registration', registrationSchema);