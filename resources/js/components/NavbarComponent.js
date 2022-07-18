import * as React from 'react';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';

const logout = () => {
    axios.post('/logout')
    .then(() => location.href = '/login')
};

function Navbar() {
    return (
        <Fragment>
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
                            to="/users"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            Users
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
                    
                    <Button href="#" onClick={logout} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                        Logout
                    </Button>
                    
                </Toolbar>
            </AppBar>
        </Fragment>
    )
}

export default Navbar;