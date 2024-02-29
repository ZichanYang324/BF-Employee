import { getComment } from "../../features/comment/commentSlice";
import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Comment = (props) => {
  const dispatch = useDispatch();
  const commentData = useSelector((state) => state.comment.data);
  const status = useSelector((state) => state.comment.status);

  console.log(`ReportID: ${props.reportID}`);
  console.log(commentData);

  useEffect(() => {
    if (status === "idle") {
      dispatch(
        getComment({ profileId: props.profileId, reportID: props.reportID }),
      );
    }
  }, [dispatch, status, props.profileId, props.reportID]);

  return (
    <>
      {status === "loading" && (
        <Typography sx={{ padding: "2rem" }}>Loading...</Typography>
      )}
      {status === "failed" && (
        <Typography color="error" sx={{ padding: "2rem" }}>
          Failed to load the comments.
        </Typography>
      )}
      {status === "succeeded" && commentData && commentData.length === 0 && (
        <Typography sx={{ fontSize: 15 }} gutterBottom>
          No comment available
        </Typography>
      )}
      {status === "succeeded" && commentData && commentData.length !== 0 && (
        <div
          className="container"
          style={{ borderTop: "1px black solid", padding: "10px" }}
        >
          <div style={{ marginBottom: "5px" }}>Comments</div>
          {commentData.map((el) => {
            return (
              <Box
                key={el._id}
                sx={{
                  border: "1px black solid",
                  padding: "2rem",
                  margin: "2rem",
                }}
              >
                <Typography sx={{ fontSize: 15 }} gutterBottom>
                  {`Description: ${el.description}`}
                </Typography>
                <Typography sx={{ fontSize: 15 }} gutterBottom>
                  {`CreatedBy: ${el.createdby.firstName}`}
                </Typography>
                <Typography sx={{ fontSize: 15 }} gutterBottom>
                  {`TimeStamp: ${el.timestamp}`}
                </Typography>
              </Box>
            );
          })}
        </div>
      )}
    </>
  );
};
