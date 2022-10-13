import React, { useState } from "react";
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
import { createTheme, ThemeProvider } from '@mui/material/styles';

function MFAPage() {
    const theme = createTheme();
    const navigate = useNavigate();

    const [mfa, setMFA] = useState("");

    const handleForgotMFA = () => {
        console.log("Clicked on MFA button!");
        console.log(mfa);
    };

    const handleChangeMFA = (event) => {
        setMFA(event.target.value);
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
                    MFA
                </Typography>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="mfa"
                        label="Code"
                        name="mfa"
                        autoComplete="mfa"
                        onChange={handleChangeMFA}
                        />
                    </Grid>
                    </Grid>
                    <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleForgotMFA}
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
            </Container>
        </ThemeProvider>
    );
}

export default MFAPage;
