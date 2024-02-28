/* eslint react/prop-types: 0 */
import ResponsiveAppBar from "../../components/navbar";
import {
  fetchDocuments,
  fetchProfile,
  updateInfo,
} from "../../features/info/infoSlice";
import ImageUploader from "./ImageUploader";
import { INPUT_SX } from "./utls";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { usePrevious } from "react-use";

function ContactInfo({ cellPhone, workPhone }) {
  const defaultValues = useMemo(
    () => ({ cellPhone, workPhone }),
    [cellPhone, workPhone],
  );
  const { register, reset, handleSubmit } = useForm({
    defaultValues,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = (data) => {
    dispatch(updateInfo({ section: "contact", data }));
  };

  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Contact Information
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            sx={INPUT_SX}
            {...register("cellPhone")}
            label="Cell phone"
          />
          <TextField
            sx={INPUT_SX}
            {...register("workPhone")}
            label="Work phone"
          />
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

export default ContactInfo;
