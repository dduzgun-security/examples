import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import StyledBadge from "../constants/StyledBadge";

import oryConfig from "../constants/OryConfig";
import oryLogout from "../api/Logout";

function ProfilePage() {
    const theme = createTheme();
    const navigate = useNavigate();

    const [logoutToken, setLogoutToken] = useState();

    useEffect(() => {
        oryLogout.init(oryConfig.kratos, setLogoutToken);
    }, [])

    const handleLogout = () => {
        oryLogout.submit(oryConfig.kratos, logoutToken);
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
                        <Typography component="h1" variant="h5">
                            Firstname Lastname <VerifiedUserIcon/>
                        </Typography>
                        
                        <Link variant="body2" onClick={()=>{
                                navigate("/login");
                            }}>
                                Verify your account
                        </Link>
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
            </Container>
        </ThemeProvider>
    );
}

export default ProfilePage;
