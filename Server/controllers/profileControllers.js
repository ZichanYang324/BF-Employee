// import Profile from "../models/Profile.model.js";
import User from "../models/User.model.js";

export async function getProfile(req, res) {
  // TODO: need auth

  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json("Invalid request");
  }

  try {
    const user = await User.findById(userId)
      .populate("profile")
      .select("-password")
      .exec();
    if (!user) {
      return res.status(404).json("User not found");
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
}
