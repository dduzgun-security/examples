import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GppBadIcon from '@mui/icons-material/GppBad';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MuiAlert from '@mui/lab/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import StyledBadge from "../constants/StyledBadge";

import oryConfig from "../constants/OryConfig";
import oryLogout from "../api/Logout";
import orySession from "../api/Session";
import oryVerify from "../api/Verify";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ProfilePage() {
    const theme = createTheme();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [isVerified, setIsVerified] = useState();

    const [logoutToken, setLogoutToken] = useState();
    const [errorMassage, setErrorMessage] = useState();
    const [flowId, setFlowId] = useState();
    const [csrfToken, setCsrfToken] = useState();

    useEffect(() => {
        orySession.whoami(oryConfig.kratos, setFirstName, setLastName, setIsVerified, setEmail);
        oryLogout.init(oryConfig.kratos, setLogoutToken);
        oryVerify.init(oryConfig.kratos, setFlowId, setCsrfToken);
    }, [])

    const handleLogout = () => {
        oryLogout.submit(oryConfig.kratos, logoutToken);
    };

    const handleVerify = () => {
        oryVerify.get(oryConfig.kratos, flowId, csrfToken, setCsrfToken);
        oryVerify.submit(oryConfig.kratos, flowId, setErrorMessage, csrfToken, email)
        // console.log("Verify")
        // oryLogout.submit(oryConfig.kratos, logoutToken);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box 
                sx={{
                    marginTop: "50%",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <Card sx={{paddingLeft:"150px", paddingRight:"150px", paddingTop:"100px", paddingBottom:"50px"}}>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar sx={{ m: 2, bgcolor: 'secondary.main',width: "150px", height:"150px" }} src="https://i.stack.imgur.com/vrzYb.jpg?s=256&g=1"/>
                        </StyledBadge>


                        {isVerified == true
                            ? (<>
                                <Typography component="h1" variant="h5">
                                    {firstName} {lastName} <VerifiedUserIcon color="primary"/>
                                </Typography>
                            </>)
                            : (<>
                                <Typography component="h1" variant="h5">
                                    {firstName} {lastName} <GppBadIcon color="error"/>
                                </Typography>
                                <Link variant="body2" onClick={handleVerify}>
                                    Verify your account
                                </Link>
                            </>)
                        }
                        
                        <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 5, mb: 2, bgcolor: 'error.main' }}
                        onClick={handleLogout}
                        >
                            Log out
                        </Button>
                        <Grid container justifyContent="flex-end">
                        </Grid>
                    </Card>
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

export default ProfilePage;
