import { createComment } from "../../features/comment/commentSlice.js";
import { getCurrentEmployeeReport } from "../../features/report/reportSlice";
import { housingConstants } from "../../utils/housingConstants.js";
import { Comment } from "../comment/index.jsx";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Report = () => {
  const dispatch = useDispatch();
  const reportData = useSelector((state) => state.report.data);
  const status = useSelector((state) => state.report.status);
  const [open, setOpen] = useState(false);
  const [reportId, setReportId] = useState(null);
  const profileId = housingConstants.profileId;
  const handleClickOpen = (reportId) => {
    setOpen(true);
    setReportId(reportId);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const getName = (createdBy) => {
    if (!createdBy.preferredName) {
      return `${createdBy.firstName} ${createdBy.lastName}`;
    } else {
      return createdBy.preferredName;
    }
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(getCurrentEmployeeReport(profileId));
    }
  }, [dispatch, status]);

  return (
    <>
      <Box sx={{ padding: "2rem" }}>
        <Typography variant="h5">My Facility Reports</Typography>
      </Box>
      {status === "loading" && (
        <Typography sx={{ padding: "2rem" }}>Loading...</Typography>
      )}
      {status === "failed" && (
        <Typography
          color="error"
          sx={{ padding: "2rem" }}
        >
          Failed to load the report.
        </Typography>
      )}
      {status === "succeeded" && reportData && reportData.length === 0 && (
        <Typography sx={{ padding: "2rem" }}>
          No Report Found, Please submit a report if needed
        </Typography>
      )}
      {status === "succeeded" &&
        reportData &&
        reportData.map((el) => {
          return (
            <Box
              className="cardContainer"
              key={el._id}
              marginBottom={"10px"}
            >
              <Card
                sx={{
                  width: "80%",
                  overflowY: "auto",
                  height: "15rem",
                  maxHeight: "16rem",
                }}
                variant="outlined"
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 20 }}
                    gutterBottom
                  >
                    {`Title: ${el.title}`}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 15 }}
                    gutterBottom
                  >
                    {`Description: ${el.description}`}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 15 }}
                    gutterBottom
                  >
                    {`createBy: ${getName(el.createdBy)}`}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 15 }}
                    gutterBottom
                  >
                    {`TimeStamp: ${el.timeStamp}`}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 15 }}
                    gutterBottom
                  >
                    {`Status: ${el.status}`}
                  </Typography>
                  <CardActions sx={{ marginTop: "-2px" }}>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      sx={{
                        marginLeft: "auto",
                      }}
                      onClick={() => handleClickOpen(el._id)}
                    >
                      New Comment
                    </Button>
                  </CardActions>
                  <Comment
                    profileId={profileId}
                    reportID={el._id}
                  />
                </CardContent>
              </Card>
              <Dialog
                open={open}
                BackdropProps={{ style: { backgroundColor: "transparent" } }}
                onClose={handleClose}
                PaperProps={{
                  component: "form",
                  onSubmit: async (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    await dispatch(
                      createComment({
                        profileId: profileId,
                        reportID: reportId,
                        ...formJson,
                      }),
                    );
                    handleClose();
                    window.location.reload();
                  },
                }}
              >
                <DialogTitle>New Comment</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please leave a detailed comment. Only you and your HR are
                    able to see
                  </DialogContentText>

                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="description"
                    name="description"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit">Submit</Button>
                </DialogActions>
              </Dialog>
            </Box>
          );
        })}
    </>
  );
};
