/* eslint react/prop-types: 0 */
import { useDispatch } from "react-redux";
import { updateInfo } from "../../features/info/infoSlice";
import ImageUploader from "./ImageUploader";
import { INPUT_SX } from "./utls";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

function Name({
  firstName,
  lastName,
  middleName,
  preferredName,
  profilePic,
  email,
  SSN,
  DOB,
  gender,
}) {
  const defaultValues = {
    firstName,
    lastName,
    middleName,
    preferredName,
    profilePicUrl: profilePic ? profilePic.url : "",
    email,
    SSN,
    DOB,
    gender,
  };
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues,
  });
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(updateInfo({ section: "name", data: { name: data } }))
  };

  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: "4px" }}>
        Name
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            sx={INPUT_SX}
            {...register("firstName")}
            label="First name"
          />
          <TextField
            sx={INPUT_SX}
            {...register("lastName")}
            label="Last name"
          />
          <TextField
            sx={INPUT_SX}
            {...register("middleName")}
            label="Middle name"
          />
          <TextField
            sx={INPUT_SX}
            {...register("preferredName")}
            label="Preferred name"
          />
        </div>
        <Box sx={INPUT_SX}>
          <Controller
            control={control}
            name="profilePicUrl"
            render={({ field }) => (
              <ImageUploader
                inputProps={register("profilePicUrl")}
                label="Profile picture"
                value={field.value}
              />
            )}
          />
        </Box>
        <div>
          <TextField sx={INPUT_SX} {...register("email")} label="Email" disabled/>
        </div>
        <div>
          <TextField sx={INPUT_SX} {...register("SSN")} label="SSN" />
          <TextField
            type="date"
            sx={INPUT_SX}
            {...register("DOB")}
            label="Date of birth"
          />
          <FormControl sx={INPUT_SX}>
            <InputLabel id="info-gender-label">Gender</InputLabel>
            <Controller
              name="gender"
              control={control}
              defaultValue={gender}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="info-gender-label"
                  label="Gender"
                  id="info-gender-input"
                >
                  <MenuItem value={`FEMALE`}>Female</MenuItem>
                  <MenuItem value={`MALE`}>Male</MenuItem>
                  <MenuItem value={`NO_ANSWER`}>No answer</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        </div>
        <Button
          variant="outlined"
          onClick={() => reset({ ...defaultValues })}
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
export default Name;
