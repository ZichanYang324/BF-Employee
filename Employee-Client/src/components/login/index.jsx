// import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../../features/user/userSlice';
import { useNavigate } from "react-router-dom";
import useInput from '../../utils/use-input';
import { getMsgErrorValidPass, isNotEmpty, validPass } from '../../utils/checkInputReg';
import CustomInput from '../Input';


const defaultTheme = createTheme();

export function Login() {
    const usernameInput = useInput(isNotEmpty);
    const passwordInput = useInput(validPass);
    const dispatch = useDispatch();
    const [submitIsValid, setSubmitIsValid] = useState(false);
    const { user } = useSelector((store) => store.user);
    const navigate = useNavigate();

    const usernameInputErrorMsg = usernameInput.hasError
        ? 'Username is required'
        : '';

    const userPasswordErrorMsg = passwordInput.hasError
        ? getMsgErrorValidPass(passwordInput.value)
        : '';

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(loginUser({ username: usernameInput.value, password: passwordInput.value }));
    };

    const checkPgae = () => {
        if (usernameInput.isValid && passwordInput.isValid) {
            setSubmitIsValid(true)
        } else {
            setSubmitIsValid(false)
        }
    }

    useEffect(() => {
        checkPgae()
    }, [usernameInput.isValid, passwordInput.isValid])

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
        }
    }, [user]);

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
                        Employee Log in
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
                            label="Password"
                            value={passwordInput.value}
                            handleChange={passwordInput.valueChangeHandler}
                            onBlur={passwordInput.inputBlurHandler}
                            type='password'
                            errorMsg={userPasswordErrorMsg}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!submitIsValid}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}