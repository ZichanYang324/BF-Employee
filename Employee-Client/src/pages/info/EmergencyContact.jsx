/* eslint react/prop-types: 0 */
import { updateInfo } from "../../features/info/infoSlice";
import { INPUT_SX } from "./utls";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

function EmergencyContact({ contacts }) {
  const defaultValues = useMemo(() => ({ contacts }), [contacts]);
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues,
  });
  const { fields, remove, append } = useFieldArray({
    control,
    name: "contacts",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = (data) => {
    const { contacts } = data;
    dispatch(
      updateInfo({
        section: "emergencyContacts",
        data: { emergencyContacts: contacts },
      }),
    );
  };

  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Emergency Contact
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          {fields.map((contact, index) => (
            <Box
              component="div"
              sx={{ mb: "8px", display: "flex", alignItems: "baseline" }}
              key={contact.email}
            >
              <TextField
                sx={INPUT_SX}
                label="First name"
                {...register(`contacts[${index}].firstName`)}
                defaultValue={contact.firstName}
              />
              <TextField
                sx={INPUT_SX}
                label="Last name"
                {...register(`contacts[${index}].lastName`)}
                defaultValue={contact.lastName}
              />
              <TextField
                sx={INPUT_SX}
                label="Relationship"
                {...register(`contacts[${index}].relationship`)}
                defaultValue={contact.relationship}
              />
              <TextField
                sx={INPUT_SX}
                label="Phone"
                {...register(`contacts[${index}].phone`)}
                defaultValue={contact.phone}
              />
              <TextField
                sx={INPUT_SX}
                label="Email"
                {...register(`contacts[${index}].email`)}
                defaultValue={contact.email}
              />
              <Button
                variant="outlined"
                color="error"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            </Box>
          ))}
        </div>
        <Button
          variant="outlined"
          color="success"
          onClick={() => append({})}
          sx={{ mr: "4px" }}
        >
          Add contact
        </Button>
        <Button
          variant="outlined"
          sx={{ mr: "4px" }}
          onClick={() => reset(defaultValues)}
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

export default EmergencyContact;
