import React, { useEffect, useState } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Autocomplete, Modal, Box, Grid, TextField, Select, FormControl, MenuItem, InputLabel } from '@mui/material';
import Container from '@mui/material/Container';
import axios from 'axios';



function Employees() {
    const handleClose = () => setOpen(false);
    const handleClose2 = () => setOpen2(false);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);



    const [userId, setUserId] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [roleUser, setRole] = useState('');

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

    const userRole = ['Owner', 'Administrator', 'Payroll Officer', 'Employee']

    //get logged in user
    const getLoggedInUser = () => {
        axios.get('/getLoggedInUser')
            .then((response) => {
                // console.log(response.data.user);
                const userData = response.data.user;
                setUserId(userData.id);
                setfirstName(userData.firstName);
                setlastName(userData.lastName);
                setEmail(userData.email);
                setCompany(userData.company);
                setCompanyId(userData.companyId);

                if (userData.role === "Employee") { //hiding elements in the UI
                    setShow(!show);
                }
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

    //retrieving users
    const [employee, setEmployee] = useState([]);
    const getEmployees = () => {
        axios.get('/getEmployees')
            .then((response) => {
                console.log(response);
                const allEmployees = response.data.employee;
                setEmployee(allEmployees);
            });
    };
    useEffect(() => getEmployees(), []);

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
                sx={{ flexGrow: 1, mb: 1 }}
            >
                Employees
            </Typography>
            <Button sx={{ mb: 1 }} variant="contained" onClick={handleCreate}>Create Employee</Button>
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
                        {employee?.map((data) => (
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
            {/* create modal */}
            <Modal
                open={open2}
                onClose={handleClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit2} sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 1 }}>
                        Create Employee
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
        </Container>
    )
}
export default Employees;

