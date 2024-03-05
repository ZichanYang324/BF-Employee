import { TextField, Box, Button, Typography, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';

const Pending = () => {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        width: 'fit-content',
        maxWidth: '1000px',
        mx: 'auto',
        py: '16px',
    }}>
    <Typography variant='h3' gutterBottom>Onboarding Application</Typography>
    <form style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      width: 'fit-content',
      mx: 'auto',
    }}
    >
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
            <MenuItem 
              key={gender.value} 
              value={gender.value}
            >
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
          {...register('cellPhone')}
        />
        <TextField
          label="Work Phone"
          variant="outlined"
          fullWidth
          {...register('workPhone')}
        />
      </Box>
      <Box sx={{ mt: 2, display: 'flex'}}>
        <TextField
          label="SSN"
          variant="outlined"
          required
          fullWidth
          sx={{ mr: 2 }}
          {...register('SSN')}
        />
        <TextField
          label="Email"
          disabled
          defaultValue={user?user.email:"xxxxx@gmail.com"}
          fullWidth
          {...register('email')}
        />
      </Box>
      <Typography variant='body2' sx={{my:2}}>
        Profile Picture
      </Typography>
      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 4}}>
        <img
          src={
            profilePic ?
            URL.createObjectURL(profilePic) : 
            DEFAULT_PIC
          }
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
            {...register('profilePic')}
          />
        </Button>
      </Box>
      <Typography variant='h6' sx={{mt:4}}>Physical Address</Typography>
      <TextField
        label="Street Address"
        variant="outlined"
        required
        sx={{mt: 2}}
        {...register('streetAddress')}
      />
      <TextField
        label="Building / Apartment #"
        variant="outlined"
        sx={{mt: 2}}
        {...register('buildingNumber')}
      />
      <TextField
        label="City"
        variant="outlined"
        required
        sx={{mt: 2}}
        {...register('city')}
      />
      <Box sx={{ mt: 2, display: 'flex'}}>
        <TextField
          select
          label="State"
          required
          fullWidth
          sx={{ mr: 2 }}
          {...register('state')}
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
          {...register('zipCode')}
        />
      </Box>
      <Typography variant='h6' sx={{mt:4}}>
        Work Authorization
      </Typography>
      <Typography variant='body2' sx={{mt:2}}>
        Are you a citizen or permanent resident of the United States? *
      </Typography>
      <TextField
        select
        required
        fullWidth
        defaultValue={true}
        sx={{ width: '80px', mt: 2 }}
        {...register('showWorkAuth')}
      >
        <MenuItem value={false}>Yes</MenuItem>
        <MenuItem value={true}>No</MenuItem>
      </TextField>
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
            sx={{mt: 2}}
            {...register('authType')}
          >
            {workAuthTypes.map((workAuthType) => (
              <MenuItem key={workAuthType.value} value={workAuthType.value}>
                {workAuthType.label}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ mt: 2, display: 'flex' }}>
            <TextField
              label="Start Date"
              variant="outlined"
              required
              fullWidth
              type='date'
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ mr: 2 }}
              {...register('startDate')}
            />
            <TextField
              label="End Date"
              variant="outlined"
              required
              fullWidth
              type='date'
              InputLabelProps={{
                shrink: true,
              }}
              {...register('endDate')}
            />
          </Box>
          {authType === 'F1' && (
            <>
              <Typography variant='body2' sx={{mt:2}}>
                Please upload your OPT receipt
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'end', gap: 4}}>
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
        Do you have a driver&rsquo;s license? *
      </Typography>
      <Box sx={{ mt: 2 }}>
        <TextField
          select
          required
          fullWidth
          sx={{ width: '80px' }}
        >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </TextField>
      {hasDriverlicense && (
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
            />
          </Button>
          {driverlicense && (
            <a 
              href={URL.createObjectURL(driverlicense)} 
              target="_blank"
              style={{ marginLeft: 24}}
            >
              {driverlicense.name}
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
      <TextField
        label="Relationship"
        variant="outlined"
        fullWidth
        required
        sx={{mt: 2}}
      />
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
      <TextField
        label="Relationship"
        variant="outlined"
        fullWidth
        required
        sx={{mt: 2}}
      />
      { (optReceipt || driverlicense) && (
        <>
          <Typography variant='h6' sx={{mt:4, alignSelf: 'start'}}>
            Uploaded Files
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column'}}>
            {optReceipt && (
              <a 
                href={URL.createObjectURL(optReceipt)} 
                target="_blank"
              >
                {optReceipt.name}
              </a>
            )}
            {driverlicense && (
              <a 
                href={URL.createObjectURL(driverlicense)} 
                target="_blank"
                style={{ marginTop: 24}}
              >
                {driverlicense.name}
              </a>
            )}
          </Box>
        </>
      )}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{my: 8}}
        type="submit"
      >
        Submit
      </Button>
    </form>
  </Box>
  )
}

export default Pending;
