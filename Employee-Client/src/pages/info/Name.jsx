/* eslint react/prop-types: 0 */
import { updateInfo } from "../../features/info/infoSlice";
import ImageUploader from "./ImageUploader";
import { INPUT_SX } from "./utls";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const DEFAULT_PIC = "http://localhost:3100/public/default-avatar.jpeg";

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
    profilePicUrl: profilePic ? profilePic.url : DEFAULT_PIC,
    email,
    SSN,
    DOB,
    gender,
  };
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const formData = new FormData();
    if (
      data.profilePicUrl &&
      typeof data.profilePicUrl !== "string" &&
      data.profilePicUrl[0]
    ) {
      formData.append("profilePic", data.profilePicUrl[0]);
    }
    formData.append(
      "name",
      JSON.stringify({ ...data, profilePicUrl: undefined }),
    );
    dispatch(updateInfo({ section: "name", formData }));
  };

  return (
    <>
      <Typography
        variant="h4"
        sx={{ marginBottom: "4px" }}
      >
        Name
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              sx={INPUT_SX}
              {...register("firstName", { required: "First name is required" })}
              error={!!errors.firstName}
              label="First name"
              required
            />
            {errors.firstName && (
              <FormHelperText error>{errors.firstName.message}</FormHelperText>
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              sx={INPUT_SX}
              {...register("lastName", { required: "Last name is required" })}
              error={!!errors.lastName}
              label="Last name"
              required
            />
            {errors.lastName && (
              <FormHelperText error>{errors.lastName.message}</FormHelperText>
            )}
          </Box>
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
        </Box>
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
          <TextField
            sx={INPUT_SX}
            {...register("email")}
            label="Email"
            disabled
          />
        </div>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              sx={INPUT_SX}
              {...register("SSN", { required: "SSN is required" })}
              label="SSN"
              error={!!errors.SSN}
              required
            />
            {errors.SSN && (
              <FormHelperText error>{errors.SSN.message}</FormHelperText>
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              type="date"
              sx={INPUT_SX}
              {...register("DOB", { required: "Date of birth is required" })}
              label="Date of birth"
              error={!!errors.DOB}
              required
            />
            {errors.DOB && (
              <FormHelperText error>{errors.DOB.message}</FormHelperText>
            )}
          </Box>
          <FormControl
            sx={INPUT_SX}
            required
          >
            <InputLabel id="info-gender-label">Gender</InputLabel>
            <Controller
              name="gender"
              control={control}
              defaultValue={gender}
              rules={{ required: "Gender is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="info-gender-label"
                  label="Gender"
                  id="info-gender-input"
                  error={!!errors.gender}
                >
                  <MenuItem value={`FEMALE`}>Female</MenuItem>
                  <MenuItem value={`MALE`}>Male</MenuItem>
                  <MenuItem value={`NO_ANSWER`}>No answer</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        </Box>
        <Button
          variant="outlined"
          onClick={() => reset({ ...defaultValues })}
          sx={{ mr: "4px" }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
        >
          Save
        </Button>
      </Box>
    </>
  );
}
export default Name;
