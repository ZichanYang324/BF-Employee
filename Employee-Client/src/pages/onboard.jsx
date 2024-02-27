import { TextField, Box, Button, Typography, MenuItem, Radio } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useForm } from 'react-hook-form';
import { stateNames, genders, workAuthTypes } from '../utils/constants';
import { useState } from 'react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Onboard = () => {
  
  const [showWorkAuth, setShowWorkAuth] = useState(false);
  const [authType, setAuthType] = useState('H1B');
  const [hasDriverLicence, setHasDriverLicence] = useState(false);
  const [profilePic, setProfilePic] = useState("https://t3.ftcdn.net/jpg/02/09/37/00/360_F_209370065_JLXhrc5inEmGl52SyvSPeVB23hB6IjrR.jpg");
  const [optReceipt, setOptReceipt] = useState();
  const [driverLicence, setDriverLicence] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const toggleWorkAuth = () => {
    setShowWorkAuth(!showWorkAuth);
  };

  const handleAuthTypeChange = (e) => {
    setAuthType(e.target.value);
  };

  const handleToggleDriverLicence = () => {
    setHasDriverLicence(!hasDriverLicence);
  };

  const handleProfilePicChange = (e) => {
    setProfilePic(URL.createObjectURL(e.target.files[0]));
  };

  const handleOptReceiptChange = (e) => {
    setOptReceipt(e.target.files[0]);
  };

  const handleDriverLicenceChange = (e) => {
    setDriverLicence(e.target.files[0]);
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        width: 'fit-content',
        maxWidth: '1000px',
        mx: 'auto',
        py: 4,
    }}>
      <Typography variant='h3' gutterBottom>Onboarding Application</Typography>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        width: 'fit-content',
        mx: 'auto',
      }}>
        <Typography variant='h6' sx={{mt:2}}>Personal Information</Typography>
        <Box sx={{ mt: 2, display: 'flex'}}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            required
            sx={{ mr: 2 }}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            required
          />
        </Box>
        <Box sx={{ mt: 2, display: 'flex'}}>
          <TextField
            label="Middle Name"
            variant="outlined"
            sx={{ mr: 2 }}
            fullWidth
          />
          <TextField
            label="Preferred Name"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 2, display: 'flex' }}>
          <TextField
            select
            label="Gender"
            required
            fullWidth
            sx={{ mr: 2 }}
          >
            {genders.map((gender) => (
              <MenuItem key={gender.value} value={gender.value}>
                {gender.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Date of Birth"
            variant="outlined"
            fullWidth
            required
            type='date'
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box sx={{ mt: 2, display: 'flex'}}>
          <TextField
            label="Cell Phone"
            variant="outlined"
            fullWidth
            required
            sx={{ mr: 2 }}
          />
          <TextField
            label="Work Phone"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 2, display: 'flex'}}>
          <TextField
            label="SSN"
            variant="outlined"
            required
            fullWidth
            sx={{ mr: 2 }}
          />
          <TextField
            label="Email"
            disabled
            defaultValue={"user1@xxx.com"}
            fullWidth
          />
        </Box>
        <Typography variant='body2' sx={{my:2}}>
          Profile Picture
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 4}}>
          <img
            src={profilePic}
            width="80px"
            height="80px"
            style={{ borderRadius: '50%' }}
          />
          <Button
            component="label"
            variant="contained"
            sx={{mt: 2}}
            startIcon={<CloudUploadIcon />}
            role={undefined}
          >
            Upload
            <VisuallyHiddenInput
              type="file"
              onChange={handleProfilePicChange}
            />
          </Button>
        </Box>
        <Typography variant='h6' sx={{mt:4}}>Physical Address</Typography>
        <TextField
          label="Street Address"
          variant="outlined"
          required
          sx={{mt: 2}}
        />
        <TextField
          label="Building / Apartment #"
          variant="outlined"
          sx={{mt: 2}}
        />
        <TextField
          label="City"
          variant="outlined"
          required
          sx={{mt: 2}}
        />
        <Box sx={{ mt: 2, display: 'flex'}}>
          <TextField
            select
            label="State"
            required
            fullWidth
            sx={{ mr: 2 }}
          >
            {stateNames.map((state) => (
              <MenuItem key={state.value} value={state.value}>
                {state.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Zip Code"
            variant="outlined"
            required
            fullWidth
          />
        </Box>
        <Typography variant='h6' sx={{mt:4}}>
          Work Authorization
        </Typography>
        <Typography variant='body2' sx={{mt:2}}>
          Are you a citizen or permanent resident of the United States?
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Radio
            checked={!showWorkAuth}
            onChange={toggleWorkAuth}
          />
          <label>Yes</label>
          <Radio 
            checked={showWorkAuth}
            onChange={toggleWorkAuth}
          />
          <label>No</label>
        </Box>
        {showWorkAuth ? (
          <>
            <Typography variant='body2' sx={{mt:2}}>
              What is your work authorization?
            </Typography>
            <TextField
              label="Work Authorization"
              select
              required
              fullWidth
              onChange={handleAuthTypeChange}
              sx={{mt: 2}}
            >
              {workAuthTypes.map((workAuthType) => (
                <MenuItem key={workAuthType.value} value={workAuthType.value}>
                  {workAuthType.label}
                </MenuItem>
              ))}
            </TextField>
            {authType === 'F1' && (
              <>
                <Typography variant='body2' sx={{mt:2}}>
                  Please upload your OPT receipt
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 24}}>
                  <Button
                    component="label"
                    variant="contained"
                    sx={{mt: 2, width: 120}}
                    startIcon={<CloudUploadIcon />}
                    role={undefined}
                  >
                    Upload
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleOptReceiptChange}
                    />
                  </Button>
                  {optReceipt && (
                    <a 
                      href={URL.createObjectURL(optReceipt)} 
                      target="_blank"
                    >
                      {optReceipt.name}
                    </a>
                  )}
                </Box>
              </>
            )}
            {authType === 'Other' && (
              <TextField
                label = 'Visa Title'
                fullWidth
                required
                sx={{mt: 2}}
              />
            )}
          </>
        ) : (
          <TextField
            label="Identity"
            select
            required
            fullWidth
            sx={{ mt: 2}}
          >
            <MenuItem value="PR">
              Green Card
            </MenuItem>
            <MenuItem value="CITIZEN">
              Citizen
            </MenuItem>
          </TextField>
        )}
        <Typography variant='h6' sx={{mt:4}}>
          Driver&rsquo;s License
        </Typography>
        <Typography variant='body2' sx={{mt:2}}>
          Do you have a driver&rsquo;s license?
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Radio
            checked={hasDriverLicence}
            onChange={handleToggleDriverLicence}
          />
          <label>Yes</label>
          <Radio 
            checked={!hasDriverLicence}
            onChange={handleToggleDriverLicence}
          />
          <label>No</label>
        {hasDriverLicence && (
          <>
            <Box sx={{ mt: 2, display: 'flex'}}>
              <TextField
                label="License Number"
                required
                fullWidth
                sx={{mr: 2}}
              />
              <TextField
                label="Expiration Date"
                required
                fullWidth
                type='date'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Typography variant='body2' sx={{my:2}}>
              Please upload your driver&rsquo;s license
            </Typography>
            <Button
              component="label"
              variant="contained"
              sx={{width: 120}}
              startIcon={<CloudUploadIcon />}
              role={undefined}
            >
              Upload
              <VisuallyHiddenInput
                type="file"
                onChange={handleDriverLicenceChange}
              />
            </Button>
            {driverLicence && (
              <a 
                href={URL.createObjectURL(driverLicence)} 
                target="_blank"
                style={{ marginLeft: 24}}
              >
                {driverLicence.name}
              </a>
            )}
            <Typography variant='h6' sx={{mt:4}}>
              Car Information (if applicable)
            </Typography>
            <Box sx={{display: 'flex', flexDirection: 'column', mt: 2}}>
              <TextField
                label="Make"
                variant="outlined"
              />
              <TextField
                label="Model"
                variant="outlined"
                sx={{mt: 2}}
              />
              <TextField
                label="Color"
                variant="outlined"
                sx={{mt: 2}}
              />
            </Box>
            
          </>
        )}
        
        </Box>
        <Typography variant='h6' sx={{mt:4}}>
          Reference
        </Typography>
        <Typography variant='body2' sx={{mt:2, alignSelf: 'start'}}>
          Who reffered you to this company?
        </Typography>
        <Box sx={{ mt: 2, display: 'flex'}}>
          <TextField
            label="First Name"
            variant="outlined"
            required
            fullWidth
            sx={{mr: 2}}
          />
          <TextField
            label="Middle Name"
            variant="outlined"
            fullWidth
            sx={{mr: 2}}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            required
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 2, display: 'flex'}}>
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            required
            sx={{mr: 2}}
          />
          <TextField
            label="Email"
            variant="outlined"
            required
            fullWidth
          />
        </Box>
        <Typography variant='h6' sx={{mt:4, alignSelf: 'start'}}>
          Emergency Contacts
        </Typography>
        <Box sx={{ mt: 2, display: 'flex'}}>
          <TextField
            label="First Name"
            variant="outlined"
            required
            fullWidth
            sx={{mr: 2}}
          />
          <TextField
            label="Middle Name"
            variant="outlined"
            fullWidth
            sx={{mr: 2}}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            required
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 2, display: 'flex'}}>
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            required
            sx={{mr: 2}}
          />
          <TextField
            label="Email"
            variant="outlined"
            required
            fullWidth
          />
        </Box>
      </Box>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{my: 8}}
      >
        Submit
      </Button>
    </Box>
  )
}

export default Onboard;
