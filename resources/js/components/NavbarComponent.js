import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';


import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }} >
                        quickcash.ph
                    </Typography>
                    <nav>
                        <Link
                            variant="button"
                            color="text.primary"
                            component={NavLink}
                            to="/home"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            Home
                        </Link>
                        <Link
                            variant="button"
                            color="text.primary"
                            component={NavLink}
                            to="/companies"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            Companies
                        </Link>
                        <Link
                            variant="button"
                            color="text.primary"
                            component={NavLink}
                            to="/employees"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            Employees
                        </Link>
                        <Link
                            variant="button"
                            color="text.primary"
                            component={NavLink}
                            to="/loans"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            Loans
                        </Link>
                        <Link
                            variant="button"
                            color="text.primary"
                            component={NavLink}
                            to="/profile"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            Profile
                        </Link>
                    </nav>
                    <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                        Login
                    </Button>
                    
                </Toolbar>
            </AppBar>


        </React.Fragment>
    )
}

export default Navbar;