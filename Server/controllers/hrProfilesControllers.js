import User from "../models/User.model.js";

export async function summary(req, res) {
  // const user = req.user;
  // if (user == null || user.role !== "HR") {
  //   return res.status(403).json("Unauthorized");
  // }

  try {
    const employees = await User.find({ role: "EMPLOYEE" })
      .populate({
        path: "profile",
        select: "firstName middleName lastName SSN workAuth.title cellPhone",
      })
      .select("email profile")
      .lean()
      .exec();
    const result = employees.map((employee) => ({
      firstName: employee.profile.firstName,
      middleName: employee.profile.middleName,
      lastName: employee.profile.lastName,
      SSN: employee.profile.SSN,
      workAuthTitle: employee.profile.workAuth.title,
      phoneNumber: employee.profile.cellPhone,
      email: employee.email,
    }));
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
}
