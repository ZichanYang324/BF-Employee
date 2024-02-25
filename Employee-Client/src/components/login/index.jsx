// import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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
// import customFetch from '../../utils/customFetch';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../../features/user/userSlice';
import { useNavigate } from "react-router-dom";


const defaultTheme = createTheme();

export function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const { user, isLoading } = useSelector((store) => store.user);
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        // customFetch.post('/user/auth', { username: username, password: password })
        // .then((res) => {
        //     console.log(res);
        // })
        dispatch(loginUser({ username: username, password: password }));
    };

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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
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