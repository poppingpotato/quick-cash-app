import React, { useEffect, useState } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Autocomplete, Modal, Box, Grid, TextField, Select, FormControl, MenuItem, InputLabel } from '@mui/material';
import Container from '@mui/material/Container';
import axios from 'axios';
import { SettingsPhoneTwoTone } from '@mui/icons-material';
import { hide } from '@popperjs/core';


// axios.get('/getUsers')
//   .then(function (response) {
//     console.log(response.data);
//   })




function Users() {

    // const [something, setSomething] = useState([]);
    // useEffect(()=>{
    //     console.log('hello');
    // },[])

    // const rows = [
    //     createData('John Doe', 'Company1', 1231231222),
    //     createData('Jane Doe', 'Company2', 2312312132),
    // ];

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const [userId, setUserId] = useState('')
    const [userDets, setUserDets] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [roleUser, setRole] = useState('');
    const [companySelected, setCompanySelected] = useState('');

    //handling modal open and getting details for modal edit
    const handleEdit = (event) => {
        setOpen(true)
        const userID = event.currentTarget.id;
        console.log(event.currentTarget.id);
        const url = `http://localhost:8000/users/${userID}/edit`

        axios.get(url)
            .then((response) => {
                const userInfo = response.data[0];
                // console.log(userInfo.role);
                setUserId(userInfo.id);
                setfirstName(userInfo.firstName);
                setlastName(userInfo.lastName);
                setEmail(userInfo.email);
                setCompany(userInfo.company);
                setCompanyId(userInfo.companyId);
                setRole(userInfo.role);
            })
    };

    const handleClose = () => setOpen(false);
    const handleClose2 = () => setOpen2(false);
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

    const userRole = ['Owner', 'Administrator', 'Payroll Officer', 'Employee'
        // { label: 'Owner', value: 'owner'},
        // { label: 'Adminstrator',  value: 'owner'},
        // { label: 'Payroll Officer',  value: 'owner' },
        // { label: 'Employee',  value: 'owner'},
    ]

    const [show, setShow] = useState(false); //hiding elements in the UI

    //retrieving users
    const [user, setUser] = useState([]);
    const getUsers = () => {
        axios.get('/getUsers')
            .then((response) => {
                console.log(response);
                const allUsers = response.data.users;
                setUser(allUsers);
                if (allUsers.role === "Administrator") { //hiding elements in the UI
                    setShow(!show);     
                }
            });
    };
    useEffect(() => getUsers(), []);




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

    //create user
    const handleCreate = () => {
        setOpen2(true)
    };

    const handleSubmit2 = (event) => {
        event.preventDefault();
        const user = new FormData(event.currentTarget);
        const url = `http://localhost:8000/users`

        const userDetails = {
            firstName: user.get('firstName'),
            lastName: user.get('lastName'),
            email: user.get('email'),
            company: company,
            companyId: user.get('companyId'),
            role: roleUser,

        }

        axios.post(url, userDetails)
            .then((response) => {
                console.log('Success', response);
                setOpen2(false);
            });

        console.log({
            firstName: user.get('firstName'),
            lastName: user.get('lastName'),
            email: user.get('email'),
            company: company,
            companyId: user.get('companyId'),
            role: roleUser,
        });
    };



    //update details
    const handleSubmit = (event) => {
        event.preventDefault();
        const user = new FormData(event.currentTarget);
        const url = `http://localhost:8000/users/${user.get('id')}`

        const userDetails = {
            id: user.get('id'),
            firstName: user.get('firstName'),
            lastName: user.get('lastName'),
            email: user.get('email'),
            company: company,
            companyId: user.get('companyId'),
            role: roleUser,
        }

        axios.put(url, userDetails)
            .then((response) => {
                console.log('Success', response);
                setOpen(false);
            });

        console.log({
            id: user.get('id'),
            firstName: user.get('firstName'),
            lastName: user.get('lastName'),
            email: user.get('email'),
            company: company,
            companyId: user.get('companyId'),
            role: roleUser,
        });
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
            >
                Users
            </Typography>

            {show ? (<Button sx={{ mb: 1 }} variant="contained" onClick={handleCreate}>Create User</Button>) : null}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Company</TableCell>
                            <TableCell align="right">company Id</TableCell>
                            <TableCell align="right">Role</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user?.map((data) => (
                            <TableRow
                                key={data.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                <TableCell component="th" scope="row">
                                    {data.firstName} {data.lastName}
                                </TableCell>
                                <TableCell align="right">{data.email}</TableCell>
                                <TableCell align="right">{data.company}</TableCell>
                                <TableCell align="right">{data.companyId}</TableCell>
                                <TableCell align="right">{data.role}</TableCell>
                                <TableCell align="center">
                                   <Button variant="contained" onClick={handleEdit} id={data.id}> Edit</Button>


                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* edit modal */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 1 }}>
                        Update User
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
                        <Grid item xs={12}>
                            <Autocomplete
                                disablePortal
                                name="role"
                                id="role"
                                options={userRole}
                                onChange={(event, value) => setRole(value)}
                                renderInput={(params) => (

                                    <TextField  {...params} label="Role" />
                                )}
                                value={roleUser}
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

            {/* create modal */}
            <Modal
                open={open2}
                onClose={handleClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit2} sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 1 }}>
                        Create User
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
                        <Grid item xs={12}>
                            <Autocomplete
                                disablePortal
                                name="role"
                                id="role"
                                options={userRole}
                                onChange={(event, value) => setRole(value)}

                                renderInput={(params) => (
                                    <TextField {...params} label="Role" />
                                )}

                            />


                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Create
                    </Button>
                </Box>
            </Modal>
        </Container>
    )

    // return (
    //    <div>
    //         <Paper>
    //             {user.map((use)=> (
    //                 <List key={use.id}>
    //                     <ListItem>
    //                         <ListItemAvatar>
    //                             <Avatar src={use.profImg} />
    //                         </ListItemAvatar>
    //                         <ListItemText primary={use.firstName} secondary={use.lastName}/>
    //                     </ListItem>
    //                 </List>
    //             ))}
    //         </Paper>
    //    </div>
    // )

}

export default Users;