<<<<<<< HEAD
import mongoose from "mongoose";
import constants from "../config/constants.js";
=======
import constants from "../config/constants.js";
import mongoose from "mongoose";
>>>>>>> 6506ee30bdcf7b437e58053efa6fd561d3718540

const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: constants.roles,
    default: "EMPLOYEE",
  },
  profile: {
    type: refType,
    ref: "Profile",
  },
});

export default mongoose.model("User", UserSchema);
