import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/user/userSlice';
import useInput from '../../utils/use-input';
import { checkEmailReg, getMsgErrorValidPass, isNotEmpty, validPass } from '../../utils/checkInputReg';
import CustomInput from '../Input';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import customFetch from '../../utils/customFetch';

const defaultTheme = createTheme();

export function Register() {
    const location = useLocation();
    const fullUrl = window.location.origin + location.pathname + location.search + location.hash;
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const isTokenValid = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000; // in seconds
            // Check if the token is expired
            if (decodedToken.exp < currentTime) {
            return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    };
    
    const usernameInput = useInput(isNotEmpty);
    const passwordInput = useInput(validPass);
    const emailInput = useInput(checkEmailReg);
    const passwordRepeatInput = useInput(isNotEmpty);
    const [submitIsValid, setSubmitIsValid] = useState(false);
    const [passwordRepeatError, setPasswordRepeatError] = useState('')
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.user);

    const navigate = useNavigate();

    const usernameInputErrorMsg = usernameInput.hasError
        ? 'Username is required!'
        : '';

    const userPasswordErrorMsg = passwordInput.hasError
        ? getMsgErrorValidPass(passwordInput.value)
        : '';

    const handleSubmit = async (event) => {
        event.preventDefault();
        //check if password is same
        if (passwordRepeatInput.value !== passwordInput.value) {
            setPasswordRepeatError('Password is not same')
            return
        }
        dispatch(registerUser({ 
            username: usernameInput.value, 
            email: jwtDecode(token).email, 
            password: passwordInput.value,
        }));
        await customFetch.put('/hiring/setLinkUsed', { link: fullUrl });
    }

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate("/");
            }, 1000);
        }
    }, [user]);

    const checkPage = () => {
        if (usernameInput.isValid && passwordInput.isValid && passwordRepeatInput.isValid) {
            setSubmitIsValid(true)
        } else {
            setSubmitIsValid(false)
        }
    }

    useEffect(() => {
        checkPage()
    }, [passwordInput.value, passwordRepeatInput.value, usernameInput.value])

    if (token && isTokenValid(token)) {
        return (
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <CustomInput
                                label="Username"
                                value={usernameInput.value}
                                handleChange={usernameInput.valueChangeHandler}
                                onBlur={usernameInput.inputBlurHandler}
                                errorMsg={usernameInputErrorMsg}
                            />
                            <CustomInput
                                label="Email Address"
                                name="email"
                                value={jwtDecode(token).email}
                                handleChange={emailInput.valueChangeHandler}
                                onBlur={emailInput.inputBlurHandler}
                                disabled={true}
                            />
                            <CustomInput
                                label="Password"
                                value={passwordInput.value}
                                handleChange={passwordInput.valueChangeHandler}
                                onBlur={passwordInput.inputBlurHandler}
                                type='password'
                                errorMsg={userPasswordErrorMsg}
                            />
                            <CustomInput
                                label="Repeat Password"
                                value={passwordRepeatInput.value}
                                handleChange={passwordRepeatInput.valueChangeHandler}
                                onBlur={passwordRepeatInput.inputBlurHandler}
                                type='password'
                                errorMsg={passwordRepeatError}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                                disabled={!submitIsValid}
                            >
                                Sign up
                            </Button>
                            <Grid container>

                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }else{
        return <h1>Unauthorized</h1>
    }
}