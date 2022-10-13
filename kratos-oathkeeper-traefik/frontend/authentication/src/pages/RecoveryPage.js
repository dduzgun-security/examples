import React, { useState, useEffect } from "react";
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
import oryRecovery from "../api/Recovery";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function RecoveryPage() {
    const theme = createTheme();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [errorMassage, setErrorMessage] = useState();

    const [flowId, setFlowId] = useState();
    const [csrfToken, setCsrfToken] = useState();

    useEffect(() => {
        oryRecovery.init(oryConfig.kratos, setFlowId, setCsrfToken);
    }, [])

    const handleForgotPassword = () => {
        oryRecovery.get(oryConfig.kratos, flowId, csrfToken, setCsrfToken);
        oryRecovery.submit(oryConfig.kratos, flowId, setErrorMessage, csrfToken, email);
    };

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
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
                    Forgot password
                </Typography>
                    <Grid container spacing={2}>
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
                    </Grid>
                    <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleForgotPassword}
                    >
                    Send
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

export default RecoveryPage;
