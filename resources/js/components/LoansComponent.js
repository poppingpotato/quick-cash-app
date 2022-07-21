import React, { useEffect, useState } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Modal, Box, Grid, TextField, FormControl, InputLabel, } from '@mui/material';
import Container from '@mui/material/Container';


function Loans() {
    const [userId, setUserId] = useState('')
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [loanAmnt, setLoanAmnt] = useState('');

    const [open2, setOpen2] = useState(false);
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
    const [show, setShow] = useState(true); //hiding elements in the UI

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

                if (userData.role === "Administrator") { //hiding elements in the UI
                    setShow(!show);     
                }
            });
    };
    useEffect(() => getLoggedInUser(), []);

    //get loans of user
    const [myLoans, setMyLoans] = useState([]);
    const getMyLoans = () => {
        axios.get('/getMyLoans')
            .then((response) => {
                // console.log(response);
                const userLoans = response.data.loans;
                setMyLoans(userLoans)
                // setUserId(userData.id);
                // setfirstName(userData.firstName);
                // setlastName(userData.lastName);
                // setEmail(userData.email);
                // setCompany(userData.company);
                // setCompanyId(userData.companyId);

            });
    };
    useEffect(() => getMyLoans(), []);

    //create user
    const handleCreate = () => {
        setOpen2(true)
    };
    const handleClose2 = () => setOpen2(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = new FormData(event.currentTarget);
        const url = `http://localhost:8000/loans`

        const userLoanDetails = {
            user_id: userId,
            firstName: user.get('firstName'),
            lastName: user.get('lastName'),
            email: user.get('email'),
            company: user.get('company'),
            companyId: user.get('companyId'),
            loanAmnt: user.get('loanAmnt'),

        }

        axios.post(url, userLoanDetails)
            .then((response) => {
                console.log('Success', response);
                setOpen2(false);
            });

        console.log({
            user_id: userId,
            firstName: user.get('firstName'),
            lastName: user.get('lastName'),
            email: user.get('email'),
            company: user.get('company'),
            companyId: user.get('companyId'),
            loanAmnt: user.get('loanAmnt'),
        });
    };
    return (
        <Container sx={{ mt: 4 }}>
            <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
            >
                Loans
            </Typography>
            {show ? (  <Button sx={{ mb: 1 }} variant="contained" onClick={handleCreate}>Request Loan</Button>) : null}
          
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell align="right">Last Name</TableCell>
                            <TableCell align="right">Company</TableCell>
                            <TableCell align="right">Company ID</TableCell>
                            <TableCell align="right">Email </TableCell>
                            <TableCell align="right">Loan Amount &nbsp;(₱) </TableCell>
                            <TableCell align="right">Status </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myLoans.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.firstName}
                                </TableCell>
                                <TableCell align="right">{row.lastName}</TableCell>
                                <TableCell align="right">{row.company}</TableCell>
                                <TableCell align="right">{row.companyId}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.loanAmnt}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
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
                <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 1 }}>
                        Request Loan
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


                                
                                required
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

                                
                                required
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
                                label="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}

                                
                                required
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
                                name="company"
                                id="company"
                                label="Company"
                                value={company}
                                onChange={e => setCompany(e.target.value)}

                                
                                required
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
                                name="companyId"
                                id="companyId"
                                label="Company ID"
                                value={companyId}
                                onChange={e => setCompanyId(e.target.value)}

                                
                                required
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
                                name="loanAmnt"
                                id="loanAmnt"
                                label="Loan Amount&nbsp;(₱)"
                                value={loanAmnt}
                                onChange={e => setLoanAmnt(e.target.value)}

                                
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
                        Create
                    </Button>
                </Box>
            </Modal>
        </Container>
    )
}

export default Loans;