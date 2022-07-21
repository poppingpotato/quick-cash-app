import React, { Fragment, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import GlobalStyles from '@mui/material/GlobalStyles';

const logout = () => {
    axios.post('/logout')
        .then(() => location.href = '/login')
};


const NavControls = () => {
    const [show, setShow] = useState(true); //hiding elements in the UI
    const [show2, setShow2] = useState(true);
    const [show3, setShow3] = useState(true);
    const [show4, setShow4] = useState(true);
    const [showRole, setShowRole] = useState('');
    //retrieving user 
    const getLoggedInUser = () => {
        axios.get('/getLoggedInUser')
            .then((response) => {
                console.log(response.data.user);
                const user = response.data.user;
                setShowRole(user.role);
                if (user.role === "Employee") { //hiding elements in the UI
                    setShow(!show);
                    setShow2(!show2);  
                    setShow4(!show4);  
                } else if (user.role === "Payroll Officer") {
                    setShow(!show);
                    setShow4(!show4);   
                } else if (user.role === "Administrator") {
                    setShow4(!show4);  
                } else {
                    console.log("No Role Found");
                }
            });

    };
    useEffect(() => getLoggedInUser(), []);

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
                    <Chip label={showRole} color="success" variant="outlined"/>
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

                        {show ? (<Link
                            variant="button"
                            color="text.primary"
                            component={NavLink}
                            to="/companies"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            Companies
                        </Link>) : null}
                        {show2 ? (<Link
                            variant="button"
                            color="text.primary"
                            component={NavLink}
                            to="/employees"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            Employees
                        </Link>) : null}
                        {show3? (<Link
                            variant="button"
                            color="text.primary"
                            component={NavLink}
                            to="/loans"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            Loans
                        </Link>) : null}
                        {show4 ? (<Link
                            variant="button"
                            color="text.primary"
                            component={NavLink}
                            to="/users"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            Users
                        </Link>) : null}
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
export default NavControls;