import ResponsiveAppBar from "../../components/navbar";
import { fetchDocuments, fetchProfile } from "../../features/info/infoSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo } from "react";
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
  const profilePicUrl = useMemo(() => {
    profilePic == null ? "" : profilePic;
  }, [profilePic]);

  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: "4px" }}>
        Name
      </Typography>
      <Box component="form" noValidate>
        <div>
          <TextField sx={INPUT_SX} value={firstName} label="First name" />
          <TextField sx={INPUT_SX} value={lastName} label="Last name" />
          <TextField sx={INPUT_SX} value={middleName} label="Middle name" />
          <TextField
            sx={INPUT_SX}
            value={preferredName}
            label="Preferred name"
          />
        </div>
        <div>
          <TextField
            sx={INPUT_SX}
            value={profilePicUrl}
            label="Profile picture"
          />
        </div>
        <div>
          <TextField sx={INPUT_SX} value={email} label="Email" />
        </div>
        <div>
          <TextField sx={INPUT_SX} value={SSN} label="SSN" />
          <TextField sx={INPUT_SX} value={DOB} label="Date of birth" />
          <TextField sx={INPUT_SX} value={gender} label="Gender" />
        </div>
      </Box>
    </>
  );
}

function Address({ address }) {
  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Address
      </Typography>
      <Box component="form" noValidate>
        <div>
          <TextField
            sx={INPUT_SX}
            label="Building/apt #"
            value={address.building}
          />
          <TextField sx={INPUT_SX} label="Street name" value={address.street} />
          <TextField sx={INPUT_SX} label="City" value={address.city} />
          <TextField sx={INPUT_SX} label="State" value={address.state} />
          <TextField sx={INPUT_SX} label="Zip" value={address.zip} />
        </div>
      </Box>
    </>
  );
}

function ContactInfo({ cellPhone, workPhone }) {
  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Contact Information
      </Typography>
      <Box component="form" noValidate>
        <div>
          <TextField sx={INPUT_SX} label="Cell phone" value={cellPhone} />
          <TextField sx={INPUT_SX} label="Work phone" value={workPhone} />
        </div>
      </Box>
    </>
  );
}

function Employment({ workAuth }) {
  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Employment
      </Typography>
      <Box component="form" noValidate>
        <div>
          <TextField sx={INPUT_SX} label="Visa title" value={workAuth.title} />
          <TextField
            sx={INPUT_SX}
            label="Start date"
            value={workAuth.startDate}
          />
          <TextField sx={INPUT_SX} label="End date" value={workAuth.endDate} />
        </div>
      </Box>
    </>
  );
}

function EmergencyContact({ contacts }) {
  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Emergency Contact
      </Typography>
      <Box component="form" noValidate>
        {contacts.map((contact) => (
          <Box component="div" sx={{ mb: "8px" }} key={contact.email}>
            <TextField
              sx={INPUT_SX}
              label="First name"
              value={contact.firstName}
            />
            <TextField
              sx={INPUT_SX}
              label="Last name"
              value={contact.lastName}
            />
            <TextField
              sx={INPUT_SX}
              label="Relationship"
              value={contact.relationship}
            />
            <TextField sx={INPUT_SX} label="Phone" value={contact.phone} />
            <TextField sx={INPUT_SX} label="Email" value={contact.email} />
          </Box>
        ))}
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
