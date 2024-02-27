import ResponsiveAppBar from "../../components/navbar";
import customFetch from "../../utils/customFetch";
import { useCustomFetch } from "./hooks";
import { Box, Container, TextField, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

function Info() {
  // const profile = useSelector((store) => store.profile);

  const { data: _profile, isFetched: isFetchedProfile } =
    useCustomFetch("/profile");
  const profile = useMemo(() => _profile?.profile, [_profile]);

  const { data: documents, isFetched: isFetchedDocuments } =
    useCustomFetch("/profile/documents");

  useEffect(() => {
    window.customFetch = customFetch;
  }, []);

  if (!isFetchedProfile || !isFetchedDocuments) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ResponsiveAppBar />
      <Container>
        <Section>
          <Name
            firstName={profile.firstName}
            middleName={profile.middleName}
            lastName={profile.lastName}
            preferredName={profile.preferredName}
          />
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
          <Documents documents={documents} />
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
          <TextField sx={INPUT_SX} value={profilePic} label="Profile picture" />
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

function Documents({ documents }) {
  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Documents
      </Typography>
      <div>
        {documents.map(([docType, { s3Key, url }]) => (
          <div key={docType}>
            <a href={url} rel="noreferrer" target="_blank">
              <Typography>{s3Key}</Typography>
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

export default Info;
