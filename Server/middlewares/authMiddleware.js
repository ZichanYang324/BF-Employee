import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Assumes Bearer token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed." });
  }
};

export default authenticate;
