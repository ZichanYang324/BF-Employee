import { FacilityReport, Housing } from "../models";

const getReportForEmployee = async (req, res) => {
  const { profileId } = req.body;
  try {
    const reports = await FacilityReport.find({
      createdBy: profileId,
    })
      .populate({
        path: "createdBy",
        model: "Profile",
        select: "firstName lastName preferredName cellPhone",
      })
      .exec();
    if (!reports || reports.length === 0) {
      return res.status(400).json("report not found");
    }
    return res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(`error when fetching reports for employee -${error}`);
  }
};
