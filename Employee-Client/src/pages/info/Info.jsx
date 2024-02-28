/* eslint react/prop-types: 0 */
import ResponsiveAppBar from "../../components/navbar";
import { fetchDocuments, fetchProfile } from "../../features/info/infoSlice";
import ImageUploader from "./ImageUploader";
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
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

function Info() {
  const dispatch = useDispatch();
  const profile = useSelector((store) => store.info.profile.data);
  const profileStatus = useSelector((store) => store.info.profile.status);
  const email = useSelector((store) => store.user.user.email);

  useEffect(() => {
    if (profileStatus === "idle") {
      dispatch(fetchProfile());
    }
  }, [profileStatus, dispatch]);

  if (profileStatus !== "succeeded") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ResponsiveAppBar />
      <Container>
        <Section>
          <Name {...{ ...profile, email }} />
        </Section>
        <Section>
          <Address address={profile.address} />
        </Section>
        <Section>
          <ContactInfo
            cellPhone={profile.cellPhone}
            workPhone={profile.workPhone}
          />
        </Section>
        <Section>
          <Employment workAuth={profile.workAuth} />
        </Section>
        <Section>
          <EmergencyContact contacts={profile.emergencyContacts} />
        </Section>
        <Section>
          <Documents />
        </Section>
      </Container>
    </div>
  );
}

function Section({ children }) {
  return (
    <Box component="section" sx={{ marginBottom: "16px" }}>
      {children}
    </Box>
  );
}

const INPUT_SX = { mb: "8px", mr: "4px" };

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
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName,
      lastName,
      middleName,
      preferredName,
      profilePicUrl: profilePic ? profilePic.url : "",
      email,
      SSN,
      DOB,
      gender,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
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
          <TextField sx={INPUT_SX} {...register("email")} label="Email" />
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
        <Button variant="outlined" onClick={() => reset()} sx={{ mr: "4px" }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </>
  );
}

function Address({ address }) {
  const { register, reset, handleSubmit } = useForm({
    defaultValues: address,
  });

  const onSubmit = (data) => {
    console.log(data);
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
        <Button variant="outlined" onClick={() => reset()} sx={{ mr: "4px" }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </>
  );
}

function ContactInfo({ cellPhone, workPhone }) {
  const { register, reset, handleSubmit } = useForm({
    defaultValues: { cellPhone, workPhone },
  });

  const onSubmit = (data) => {
    console.log(data);
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
        <Button variant="outlined" onClick={() => reset()} sx={{ mr: "4px" }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </>
  );
}

function Employment({ workAuth }) {
  const { register, reset, handleSubmit } = useForm({
    defaultValues: workAuth,
  });

  const onSubmit = (data) => {
    console.log(data);
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
        <Button variant="outlined" onClick={() => reset()} sx={{ mr: "4px" }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </>
  );
}

function EmergencyContact({ contacts }) {
  const { register, handleSubmit } = useForm({
    defaultValues: contacts,
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Emergency Contact
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          {contacts.map((contact, index) => (
            <Box component="div" sx={{ mb: "8px" }} key={contact.email}>
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
            </Box>
          ))}
        </div>
        <Button variant="outlined" sx={{ mr: "4px" }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </>
  );
}

function Documents() {
  const dispatch = useDispatch();
  const documents = useSelector((store) => store.info.documents.data);
  const documentsStatus = useSelector((store) => store.info.documents.status);

  function handleDocumentChange(_event, expanded) {
    if (expanded && documentsStatus === "idle") {
      dispatch(fetchDocuments());
    }
  }

  return (
    <Accordion onChange={handleDocumentChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h4">Documents</Typography>
      </AccordionSummary>

      <AccordionDetails>
        {documentsStatus === "succeeded"
          ? documents.map(([docType, { url }]) => (
              <div key={docType}>
                <a href={url} rel="noreferrer" target="_blank">
                  <Typography>{docType}</Typography>
                </a>
              </div>
            ))
          : "Loading..."}
      </AccordionDetails>
    </Accordion>
  );
}

export default Info;
