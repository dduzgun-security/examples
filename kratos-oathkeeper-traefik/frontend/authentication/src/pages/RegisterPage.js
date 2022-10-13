import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MuiAlert from '@mui/lab/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import oryConfig from "../constants/OryConfig";
import oryRegister from "../api/Register";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function RegisterPage() {
    const theme = createTheme();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMassage, setErrorMessage] = useState();

    const [flowId, setFlowId] = useState();
    const [csrfToken, setCsrfToken] = useState();


    useEffect(() => {
        oryRegister.init(oryConfig.kratos, setFlowId, setCsrfToken);
    }, [])

    const handleRegister = () => {
        oryRegister.get(oryConfig.kratos, flowId, csrfToken, setCsrfToken);
        oryRegister.submit(oryConfig.kratos, flowId, setErrorMessage, firstName, lastName, csrfToken, password, email);
    };

    const handleChangeFirstName = (event) => {
        setFirstName(event.target.value);
    };

    const handleChangeLastName = (event) => {
        setLastName(event.target.value);
    };

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    return (
        <ThemeProvider theme={theme}>
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
                    Sign up
                </Typography>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        onChange={handleChangeFirstName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        onChange={handleChangeLastName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={handleChangeEmail}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        onChange={handleChangePassword}
                        />
                    </Grid>
                    </Grid>
                    <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleRegister}
                    >
                    Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link variant="body2" onClick={()=>{
                            navigate("/login");
                        }}>
                        Already have an account? Sign in
                        </Link>
                    </Grid>
                    </Grid>
                </Box>
                {errorMassage
                    ? (<>
                        <Alert severity="error" style={{margin: "auto", width: "75%", padding: "10px", marginTop: "5%"}}>
                            {errorMassage}
                        </Alert>
                    </>)
                    : (<>
                        </>)
                }
            </Container>
        </ThemeProvider>
    );
}

export default RegisterPage;
