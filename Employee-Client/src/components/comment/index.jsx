import customFetch from "../../utils/customFetch";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export const Comment = (props) => {
  const [comment, setComment] = useState(null);
  const [open, setOpen] = useState(false);

  const updateComment = async (body) => {
    try {
      const res = await customFetch.patch("/comment/update", body);
      setComment(res.data);
    } catch (error) {
      throw error;
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getComment = async () => {
    const res = await customFetch.post("/comment", {
      profileId: props.profileId,
      reportID: props.reportID,
    });

    if (res.data) {
      setComment(res.data);
    }
  };

  useEffect(() => {
    getComment();
  }, []);

  return (
    <>
      {comment && comment?.length === 0 && (
        <Typography
          sx={{ fontSize: 15 }}
          gutterBottom
        >
          No comment available
        </Typography>
      )}
      {comment && comment.length !== 0 && (
        <div
          className="container"
          style={{ marginTop: "-3px" }}
        >
          <div style={{ marginBottom: "5px" }}>Comments - Scoll to see</div>
          {comment.map((el) => {
            return (
              <Card
                key={el._id}
                sx={{ padding: "2rem" }}
              >
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
                  {`CreatedBy: ${el.createdby.firstName}`}
                </Typography>
                <Typography
                  sx={{ fontSize: 15 }}
                  gutterBottom
                >
                  {`TimeStamp: ${el.timestamp}`}
                </Typography>

                {el.createdby._id === props.profileId ? (
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      size="small"
                      color="primary"
                      onClick={handleClickOpen}
                    >
                      Edit
                    </Button>
                  </Box>
                ) : (
                  <></>
                )}

                <Dialog
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    component: "form",
                    onSubmit: async (event) => {
                      event.preventDefault();
                      const formData = new FormData(event.currentTarget);
                      const formJson = Object.fromEntries(formData.entries());
                      updateComment({
                        profileId: props.profileId,
                        commentId: el._id,
                        ...formJson,
                      });
                      handleClose();
                      window.location.reload();
                    },
                  }}
                >
                  <DialogTitle>Editing Comment</DialogTitle>
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
                    <Button type="submit">Edit</Button>
                  </DialogActions>
                </Dialog>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
};
