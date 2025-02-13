import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import MuiAlert from '@mui/lab/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import oryConfig from "../constants/OryConfig";
import oryLogin from "../api/Login";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function LoginPage() {
    const theme = createTheme();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMassage, setErrorMessage] = useState();

    const [flowId, setFlowId] = useState();
    const [csrfToken, setCsrfToken] = useState();

    useEffect(() => {
        oryLogin.init(oryConfig.kratos, setFlowId, setCsrfToken);
    }, [])

    const handleLogin = () => {
        oryLogin.get(oryConfig.kratos, flowId, csrfToken, setCsrfToken);
        oryLogin.submit(oryConfig.kratos, flowId, setErrorMessage, csrfToken, password, email);
    };

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Sign in
                    </Typography>
                    
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChangeEmail}
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
                        onChange={handleChangePassword}
                    />
                    <Button
                        // type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleLogin} 
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                        <Link variant="body2" onClick={()=>{
                            navigate("/recovery");
                        }}>
                            Forgot password?
                        </Link>
                        </Grid>
                        <Grid item>
                        <Link variant="body2" onClick={()=>{
                            navigate("/register");
                        }}>
                            {"Don't have an account? Sign Up"}
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
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default LoginPage;
