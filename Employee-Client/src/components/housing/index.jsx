import { fetchHousing } from "../../features/housing/housingSlice";
import { housingConstants } from "../../utils/housingConstants";
import ResponsiveAppBar from "../navbar";
import "./style.css";
import GroupIcon from "@mui/icons-material/Group";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Housing = () => {
  const dispatch = useDispatch();
  const housing = useSelector((state) => state.housing.data);
  const status = useSelector((state) => state.housing.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchHousing(housingConstants.profileId));
    }
  }, [dispatch, status]);

  return (
    <>
      <ResponsiveAppBar />

      <Box sx={{ padding: "2rem" }}>
        <Typography variant="h5">Housing Infomation</Typography>
      </Box>

      <Box className="cardContainer">
        <Card sx={{ width: "80%", height: "14rem" }} variant="outlined">
          <CardContent>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"baseline"}
            >
              <Typography sx={{ fontSize: 20 }} gutterBottom>
                Address: {housing?.address}
              </Typography>
              <Box sx={{ display: "flex" }}>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    color="warning"
                    disabled
                  >
                    View Report
                  </Button>
                </CardActions>

                <CardActions>
                  <Button size="small" variant="contained" color="error">
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
          <Box padding={"0px 10%"} display={"flex"}>
            {housing?.assignedEmployees.map((el, idx) => {
              return (
                <Card key={idx} sx={{ padding: "10px", margin: "5px" }}>
                  <Typography sx={{ fontSize: 15 }}>
                    {`Name:${el.fullName} - Phone:${el.phone}`}
                  </Typography>
                </Card>
              );
            })}
          </Box>
        </Card>
      </Box>
    </>
  );
};
