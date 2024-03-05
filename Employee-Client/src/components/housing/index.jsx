import { fetchHousing } from "../../features/housing/housingSlice";
import { createReport } from "../../features/report/reportSlice";
import "./style.css";
import GroupIcon from "@mui/icons-material/Group";
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
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileIdContext from "../../utils/ProfileIdContext.jsx";
export const Housing = () => {
  const { profileId, isLoading } = useContext(ProfileIdContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const housing = useSelector((state) => state.housing.data);
  // const status = useSelector((state) => state.housing.status);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleReportButtonClick = () => {
    navigate("/report");
    window.location.reload();
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (!isLoading && profileId) {
      dispatch(fetchHousing(profileId));
    }
  }, [profileId, isLoading]);

  return (
    <>

      <Box sx={{ padding: "2rem" }}>
        <Typography variant="h5">Housing Infomation</Typography>
      </Box>

      <Box className="cardContainer">
        <Card
          sx={{ width: "80%", height: "16rem" }}
          variant="outlined"
        >
          <CardContent>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"baseline"}
            >
              <Typography
                sx={{ fontSize: 20 }}
                gutterBottom
              >
                Address: {housing?.address}
              </Typography>
              <Box sx={{ display: "flex" }}>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    color="warning"
                    onClick={handleReportButtonClick}
                  >
                    View Report
                  </Button>
                </CardActions>

                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={handleClickOpen}
                  >
                    New Report
                  </Button>
                </CardActions>
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <GroupIcon sx={{ fontSize: 40, mt: 2 }} />{" "}
              <Typography
                sx={{ fontSize: 15, paddingTop: "25px", paddingLeft: "5px" }}
              >
                Roommate
              </Typography>
            </Box>
          </CardContent>
          <Box
            padding={"0px 10%"}
            display={"flex"}
          >
            {housing?.assignedEmployees.map((el, idx) => {
              return (
                <Card
                  key={idx}
                  sx={{ padding: "10px", margin: "5px" }}
                >
                  <Typography sx={{ fontSize: 15 }}>
                    {`Name:${el.fullName} - Phone:${el.phone}`}
                  </Typography>
                </Card>
              );
            })}
          </Box>
        </Card>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: async (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              await dispatch(
                createReport({
                  profileId: profileId,
                  houseID: housing?.houseId,
                  ...formJson,
                }),
              );
              handleClose();
            },
          }}
        >
          <DialogTitle>New Report</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To file a new facility report, please provide a title and a
              description
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
            />
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
    </>
  );
};
