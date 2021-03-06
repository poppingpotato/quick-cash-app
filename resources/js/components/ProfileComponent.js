import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import Modal from '@mui/material/Modal';


import axios from 'axios';


function Profile() {

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     console.log({
    //         email: data.get('email'),
    //         password: data.get('password'),
    //     });
    // };

    // const top100Films = [
    //     { label: 'The Shawshank Redemption' },
    //     { label: 'The Godfather' },
    //     { label: 'The Godfather: Part II' },
    //     { label: 'The Dark Knight' },
    //     { label: '12 Angry Men' },
    //     { label: "Schindler's List" },
    //     { label: 'Pulp Fiction' }
    // ];



    // openmodal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    const [userId, setUserId] = useState('')
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [role, setRole] = useState('');

    //retrieving user details
    const getLoggedInUser = () => {
        axios.get('/getLoggedInUser')
            .then((response) => {
                console.log(response.data.user);
                const userData = response.data.user;
                setUserId(userData.id);
                setfirstName(userData.firstName);
                setlastName(userData.lastName);
                setEmail(userData.email);
                setCompany(userData.company);
                setCompanyId(userData.companyId);
                setRole(userData.role);
            });
    };
    useEffect(() => getLoggedInUser(), []);

    //retrieving company
    const [companyOptions, setCompanyOptions] = useState([]);
    const getCompany = () => {
        axios.get('/getCompany')
            .then((response) => {
                // console.log(response.data.company);
                const allCompanies = response.data.company;
                setCompanyOptions(allCompanies);
            });
    };
    useEffect(() => getCompany(), []);


    //updating details
    const handleSubmit = (event) => {
        event.preventDefault();
        const user = new FormData(event.currentTarget);
        const url = `http://localhost:8000/profile/${user.get('id')}`

        const userDetails = {
            id: user.get('id'),
            firstName: user.get('firstName'),
            lastName: user.get('lastName'),
            email: user.get('email'),
            company: company,
            companyId: user.get('companyId'),
        }

        axios.put(url, userDetails)
            .then((response) => {
                console.log('Success', response);
                setOpen(false);
            });

        console.log({
            id: user.get('id'),
            email: user.get('email'),
            firstName: user.get('firstName'),
            companyId: company,

        });
    };

    return (
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

                <Avatar sx={{ width: 100, height: 100 }} src='#' ></Avatar>
                <Typography component="h1" variant="h5">
                    Profile
                </Typography>
                {/* <Link href="#" underline="none">
                    {'Change Profile'}
                </Link> */}
                <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="firstName"
                                id="firstName"
                                label="First Name"
                                value={firstName}
                                onChange={e => setfirstName(e.target.value)}

                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={
                                    { readOnly: true }
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="lastName"
                                id="lastName"
                                label="Last Name"
                                value={lastName}
                                onChange={e => setlastName(e.target.value)}

                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={
                                    { readOnly: true }
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="email"
                                id="email"
                                label="Email Address"
                                autoComplete="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}

                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={
                                    { readOnly: true }
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="company"
                                id="company"
                                label="Company"
                                value={company}
                                onChange={e => setCompany(e.target.value)}

                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={
                                    { readOnly: true }
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="companyId"
                                id="companyId"
                                label="Company ID"
                                value={companyId}
                                onChange={e => setCompanyId(e.target.value)}


                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={
                                    { readOnly: true }
                                }
                            />
                        </Grid>
                    </Grid>
                    <Button fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleOpen}>Edit</Button>
                </Box>
            </Box>

            {/* edit/update */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>

                    <Grid item xs={12} sm={6} sx={{ display: { xs: 'none', md: 'none' } }}>
                        <TextField
                            name="id"
                            id="id"
                            label="id"
                            autoFocus
                            value={userId}


                            required
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="firstName"
                                id="firstName"
                                label="First Name"
                                value={firstName}
                                onChange={e => setfirstName(e.target.value)}


                                autoFocus
                                required
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="lastName"
                                id="lastName"
                                label="Last Name"
                                value={lastName}
                                onChange={e => setlastName(e.target.value)}

                                autoFocus
                                required
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="email"
                                name="email"
                                id="email"
                                label="Email Address"
                                value={email}
                                onChange={e => setEmail(e.target.value)}

                                autoFocus
                                required
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl
                                fullWidth
                            >
                                <InputLabel>Company</InputLabel>
                                <Select
                                    value={company}
                                    onChange={e => setCompany(e.target.value)}
                                >
                                    <MenuItem id="company" name="company" value={company}>
                                        {company}
                                    </MenuItem>
                                    {companyOptions?.map(({ id, company }) => (
                                        <MenuItem key={id} id="company" value={company}>
                                            {company}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* <Grid item xs={12}>
                            <TextField
                                name="company"
                                id="company"
                                label="Company"
                                value={company}
                                onChange={e => setCompany(e.target.value)}

                                autoFocus
                                required
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid> */}
                        <Grid item xs={12}>
                            <TextField
                                name="companyId"
                                id="companyId"
                                label="Company ID"
                                value={companyId}
                                onChange={e => setCompanyId(e.target.value)}

                                autoFocus
                                required
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Save Changes
                    </Button>
                </Box>
            </Modal>

        </Container>
    )
    // return (
    //     <div>
    //         <Paper>
    //             <List key={data.id}>
    //                 <ListItem>
    //                     <ListItemAvatar>
    //                         <Avatar src={data.profImg} />
    //                     </ListItemAvatar>
    //                     <ListItemText primary={data.firstName} secondary={data.lastName} />
    //                 </ListItem>
    //             </List>

    //         </Paper>
    //     </div>
    // )


}

export default Profile;