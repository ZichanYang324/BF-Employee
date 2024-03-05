/* eslint react/prop-types: 0 */
import {
  updateInfo,
} from "../../features/info/infoSlice";
import { INPUT_SX } from "./utls";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import {  useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

function Address({ address }) {
  const defaultValues = address;
  const { register, reset, handleSubmit } = useForm({
    defaultValues,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = (data) => {
    dispatch(updateInfo({ section: "address", data: { address: data } }));
  };

  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Address
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            sx={INPUT_SX}
            {...register("building")}
            label="Building/apt #"
          />
          <TextField
            sx={INPUT_SX}
            {...register("street")}
            label="Street name"
          />
          <TextField sx={INPUT_SX} {...register("city")} label="City" />
          <TextField sx={INPUT_SX} {...register("state")} label="State" />
          <TextField sx={INPUT_SX} {...register("zip")} label="Zip" />
        </div>
        <Button
          variant="outlined"
          onClick={() => reset({ ...address })}
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

export default Address;
