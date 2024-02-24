import { Housing, Profile } from "../models";

/**
 * Get housing details for current user
 * @returns {address, [{assignedEmployees.name,phoneNumber}]}
 */

const getHousingDetailsForEmployee = async (req, res) => {
  const { profileId } = req.body;
  try {
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(400).json("Profile not found");
    }
    const housingDetails = await Housing.findOne({
      assignedEmployees: profileId,
    })
      .populate({
        path: "assignedEmployees",
        model: "Profile",
        select: "firstName lastName preferredName cellPhone",
      })
      .exec();
    if (!housingDetails) {
      return res
        .status(400)
        .json("Housing Info does not exist for current employee");
    }
    const res_details = {
      address: housingDetails.address,
      assignedEmployees: housingDetails.assignedEmployees.map((employee) => ({
        fullName:
          employee.preferredName ||
          `${employee.firstName} ${employee.lastName}`,
        phone: employee.cellPhone,
      })),
    };

    return res.status(200).json(res_details);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        `error when fetching Housing details for current employee - ${error}`
      );
  }
};
