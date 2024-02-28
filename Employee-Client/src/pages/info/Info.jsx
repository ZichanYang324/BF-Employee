/* eslint react/prop-types: 0 */
import ResponsiveAppBar from "../../components/navbar";
import { fetchProfile } from "../../features/info/infoSlice";
import Address from "./Address";
import ContactInfo from "./ContactInfo";
import Documents from "./Documents";
import EmergencyContact from "./EmergencyContact";
import Employment from "./Employment";
import Name from "./Name";
import { Box, Container } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePrevious } from "react-use";

function Info() {
  const dispatch = useDispatch();
  const profile = useSelector((store) => store.info.profile.data);
  const profileStatus = useSelector((store) => store.info.profile.status);
  const prevProfileStatus = usePrevious(profileStatus);
  const email = useSelector((store) => store.user.user.email);

  useEffect(() => {
    if (profileStatus === "idle") {
      dispatch(fetchProfile());
    }
  }, [profileStatus, dispatch]);

  if (profileStatus !== "succeeded" && prevProfileStatus === "idle") {
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

export default Info;
