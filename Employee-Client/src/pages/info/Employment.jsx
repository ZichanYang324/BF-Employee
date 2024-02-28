/* eslint react/prop-types: 0 */
import { updateInfo } from "../../features/info/infoSlice";
import { INPUT_SX } from "./utls";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

function Employment({ workAuth }) {
  const defaultValues = workAuth;
  const { register, reset, handleSubmit } = useForm({
    defaultValues,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = (data) => {
    dispatch(updateInfo({ section: "employment", data: { workAuth: data } }));
  };
  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Employment
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField sx={INPUT_SX} {...register("title")} label="Visa title" />
          <TextField
            type="date"
            sx={INPUT_SX}
            {...register("startDate")}
            label="Start date"
          />
          <TextField
            type="date"
            sx={INPUT_SX}
            {...register("endDate")}
            label="End date"
          />
        </div>
        <Button
          variant="outlined"
          onClick={() => reset({ ...workAuth })}
          sx={{ mr: "4px" }}
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </>
  );
}

export default Employment;
