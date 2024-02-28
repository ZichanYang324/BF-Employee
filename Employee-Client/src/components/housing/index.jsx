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

export const Housing = () => {
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
                110 warn street
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
            <GroupIcon sx={{ fontSize: 40, mt: 2 }} />
          </CardContent>
          <Box padding={"0px 10%"} display={"flex"}>
            <Box marginRight={"10px"}>
              <Typography sx={{ fontSize: 15 }}>James-7188380000 </Typography>
            </Box>{" "}
            <Box marginRight={"10px"}>
              <Typography sx={{ fontSize: 15 }}>James-7188380000 </Typography>
            </Box>{" "}
            <Box marginRight={"10px"}>
              <Typography sx={{ fontSize: 15 }}>James-7188380000 </Typography>
            </Box>
          </Box>
        </Card>
      </Box>
    </>
  );
};
