import React, { useEffect, useState } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Modal, Box, Grid, TextField, FormControl, InputLabel, Stack, } from '@mui/material';
import Container from '@mui/material/Container';
import { constant, set } from 'lodash';


function Loans() {
    const [userId, setUserId] = useState('');
    const [user_id, setUser_id] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [loanAmnt, setLoanAmnt] = useState('');
    const [loanStatus, setLoanStatus] = useState('');

    const [bankName, setBankName] = useState('');
    const [accountName, setAccountName] = useState('');
    const [accountNmber, setAccountNmber] = useState('');

    const [capitalID, setCapitalID] = useState('');
    const [capital, setCapital] = useState('');

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);


    const handleClose = () => setOpen(false);
    const handleClose2 = () => setOpen2(false);
    const handleClose3 = () => setOpen3(false);
    const handleClose4 = () => setOpen4(false);
    //modal style
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

    const [show, setShow] = useState(true); //hiding elements in the UI\
    const [show2, setShow2] = useState(true); //hiding elements in the UI\
    const [show3, setShow3] = useState(true); //hiding elements in the UI\\
    // const [show4, setShow4] = useState(true); //hiding elements in the UI\
    const [showCapital, setShowCapital] = useState(false); //hiding elements in the UI\\

    //get logged in user
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

                if (userData.role === "Administrator" || userData.role === "Owner") { //hiding elements in the UI
                    setShow(!show);
                    setShowCapital(!showCapital)
                } else if (userData.role === "Employee") {
                    setShow2(!show2);
                }
            });
    };
    useEffect(() => getLoggedInUser(), []);

    //get loans of user
    const [myLoans, setMyLoans] = useState([]);
    const getMyLoans = () => {
        axios.get('/getMyLoans')
            .then((response) => {
                console.log(response.data.loans);
                const userLoans = response.data.loans;
                setMyLoans(userLoans)
                // setUserId(userData.id);
                // setfirstName(userData.firstName);
                // setlastName(userData.lastName);
                // setEmail(userData.email);
                // setCompany(userData.company);
                // setCompanyId(userData.companyId);
                // userLoans.map((row) => {
                //     if (row.status === "Approved" && row.user_id === row.user_id) { setShow3(show3) } else { setShow3(!show3) }
                // })
            });
    };
    useEffect(() => getMyLoans(), []);

    //create loans
    const handleCreate = () => {
        setOpen(true)
    };

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
                setOpen(false);
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

    //edit request for loans
    const handleEdit = (event) => {
        setOpen2(true)
        const userID = event.currentTarget.id;
        console.log(event.currentTarget.id);
        const url = `http://localhost:8000/loans/${userID}/edit`

        axios.get(url)
            .then((response) => {
                const userInfo = response.data[0];
                console.log(userInfo);
                setUserId(userInfo.id);
                setUser_id(userInfo.user_id);
                setfirstName(userInfo.firstName);
                setlastName(userInfo.lastName);
                setEmail(userInfo.email);
                setCompany(userInfo.company);
                setCompanyId(userInfo.companyId);

                setBankName(userInfo.bankName);
                setAccountName(userInfo.accountName);
                setAccountNmber(userInfo.accountNmbr);

                setLoanAmnt(userInfo.loanAmnt);
                setLoanStatus(userInfo.status);

            })
    };


    const handleSubmit2 = (event) => {
        event.preventDefault();
        const user = new FormData(event.currentTarget);
        const url = `http://localhost:8000/loans/${user.get('id')}`

        const userLoanDetails = {
            id: userId,
            user_id: user.get('user_id'),
            firstName: user.get('firstName'),
            lastName: user.get('lastName'),
            email: user.get('email'),
            company: user.get('company'),
            companyId: user.get('companyId'),
            loanAmnt: user.get('loanAmnt'),
            bankName: user.get('bankName'),
            accountName: user.get('accountName'),
            accountNmber: user.get('accountNmbr'),
            status: user.get('status'),
        }

        axios.put(url, userLoanDetails)
            .then((response) => {
                console.log('Success', response);
                setOpen2(false);
            });

        console.log({
            id: userId,
            user_id: user.get('user_id'),
            firstName: user.get('firstName'),
            lastName: user.get('lastName'),
            email: user.get('email'),
            company: user.get('company'),
            companyId: user.get('companyId'),
            loanAmnt: user.get('loanAmnt'),

            bankName: user.get('bankName'),
            accountName: user.get('accountName'),
            accountNmber: user.get('accountNmbr'),

            status: user.get('status'),
        });
    };

    //handle Approve of loan
    const handleApprove = (event) => {
        setOpen3(true);
        const userID = event.currentTarget.id;
        console.log(event.currentTarget.id);
        const url = `http://localhost:8000/loans/${userID}/edit`

        axios.get(url)
            .then((response) => {
                const userInfo = response.data[0];
                console.log(userInfo);
                setUserId(userInfo.id);
                setUser_id(userInfo.user_id);
                setfirstName(userInfo.firstName);
                setlastName(userInfo.lastName);
                setEmail(userInfo.email);
                setCompany(userInfo.company);
                setCompanyId(userInfo.companyId);
                setLoanAmnt(userInfo.loanAmnt);

                setBankName(userInfo.bankName);
                setAccountName(userInfo.accountName);
                setAccountNmber(userInfo.accountNmbr);

                setLoanStatus(userInfo.status);

            })
    }

    const handleSubmit3 = (event) => {
        event.preventDefault();
        const url = `http://localhost:8000/loanApproved/${event.currentTarget.id}`
        const loanDetails = new FormData(event.currentTarget);
        const userLoanDetails = {
            id: userId,
            loanAmnt: loanDetails.get('loanAmnt'),

        }

        axios.put(url, userLoanDetails)
            .then((response) => {
                console.log('Success', response);
                setOpen3(false);
            });

        console.log({
            id: userId,
            loanAmnt: loanDetails.get('loanAmnt'),
        });
    };

    //handle Cancel of loan
    const handleCancel = (event) => {
        console.log(event.currentTarget.id);
        const url = `http://localhost:8000/loanCancelled/${event.currentTarget.id}`

        const userLoanID = { id: event.currentTarget.id }
        axios.put(url, userLoanID)
            .then((response) => {
                console.log('Success', response);
            });
    }
    
    //handle Edit Capital 
    const handleEditCapital = () => {
        setOpen4(true)
        const url = `http://localhost:8000/getCapital`

        axios.get(url)
            .then((response) => {
                const capitalInfo = response.data.capital[0]
                console.log(response.data.capital);
                setCapitalID(capitalInfo.id),
                setCapital(capitalInfo.capital)
            });
    };

    const handleSubmit4 = (event) => {
        event.preventDefault();
        const capital = new FormData(event.currentTarget);
        const url = `http://localhost:8000/editCapital/${capital.get('id')}`
        
        const capitalChange = {
            id: capital.get('id'),
            capital: capital.get('capital'),
        }
        axios.put(url, capitalChange)
            .then((response) => {
                console.log('Success', response);
                setOpen4(false);
            });

        console.log({
            id: capital.get('capitalID'),
            capital: capital.get('capital')
        });
    }


    //retrieving capital details
    const getCurrentCapital = () => {
        axios.get('/getCapital')
            .then((response) => {
                // console.log(response.data.capital[0]);
                const capital = response.data.capital[0];
                setCapital(capital.capital)
            });
    };
    useEffect(() => getCurrentCapital(), []);

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
            {show ? (<Button sx={{ mb: 1 }} variant="contained" onClick={handleCreate}>Request Loan</Button>) : null}
            {showCapital ? (<Button sx={{ mb: 1 }} variant="contained" onClick={handleEditCapital}>Edit Capital</Button>) : null}
            <Typography
                component="h1"
                variant="h6"
                color="inherit" 
                noWrap
                sx={{ flexGrow: 1 }}
            >
                Current Capital &nbsp;(₱): {capital}
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell align="left">Last Name</TableCell>
                            <TableCell align="right">Company</TableCell>
                            <TableCell align="right">Company ID</TableCell>
                            <TableCell align="right">Email </TableCell>
                            <TableCell align="right">Loan Amount &nbsp;(₱) </TableCell>
                            <TableCell align="right">Status </TableCell>
                            <TableCell align="right">Actions </TableCell>
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
                                <TableCell align="left">{row.lastName}</TableCell>
                                <TableCell align="right">{row.company}</TableCell>
                                <TableCell align="right">{row.companyId}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.loanAmnt}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell align="right">
                                    <Stack spacing={1} >
                                        {show2 ? (<Button variant="contained" color="success" onClick={handleApprove} id={row.id}> Approve</Button>) : null}
                                        {show2 ? (<Button variant="outlined" color="error" onClick={handleCancel} id={row.id}> Cancel</Button>) : null}
                                        {show3 ? (<Button variant="contained" onClick={handleEdit} id={row.id}> Edit</Button>) : null}



                                    </Stack>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* request modal */}
            <Modal
                open={open}
                onClose={handleClose}
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

            {/* edit request modal */}
            <Modal
                open={open2}
                onClose={handleClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit2} sx={style}>
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
                    <Grid item xs={12} sm={6} sx={{ display: { xs: 'none', md: 'none' } }}>
                        <TextField
                            name="user_id"
                            id="user_id"
                            label="user_id"
                            autoFocus
                            value={user_id}


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
                        <Grid item xs={12}>
                            <TextField
                                name="bankName"
                                id="bankName"
                                label="Bank Name"
                                value={bankName}
                                onChange={e => setBankName(e.target.value)}


                                required
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="accountName"
                                id="accountName"
                                label="Account Name"
                                value={accountName}
                                onChange={e => setAccountName(e.target.value)}


                                required
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="accountNmbr"
                                id="accountNmbr"
                                label="Account Number"
                                value={accountNmber}
                                onChange={e => setAccountNmber(e.target.value)}


                                required
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="status"
                                id="status"
                                label="Status"
                                value={loanStatus}
                                onChange={e => setLoanStatus(e.target.value)}


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

            {/* approval modal */}
            <Modal
                open={open3}
                onClose={handleClose3}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit3} sx={style}>
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
                    <Grid item xs={12} sm={6} sx={{ display: { xs: 'none', md: 'none' } }}>
                        <TextField
                            name="user_id"
                            id="user_id"
                            label="user_id"
                            autoFocus
                            value={user_id}


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
                        <Grid item xs={12}>
                            <TextField
                                name="bankName"
                                id="bankName"
                                label="Bank Name"
                                value={bankName}
                                onChange={e => setBankName(e.target.value)}


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
                                name="accountName"
                                id="accountName"
                                label="Account Name"
                                value={accountName}
                                onChange={e => setAccountName(e.target.value)}


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
                                name="accountNmbr"
                                id="accountNmbr"
                                label="Account Number"
                                value={accountNmber}
                                onChange={e => setAccountNmber(e.target.value)}


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
                                name="status"
                                id="status"
                                label="Status"
                                value={loanStatus}
                                onChange={e => setLoanStatus(e.target.value)}


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
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Approve
                    </Button>
                </Box>
            </Modal>

            {/* edit capital modal */}
            <Modal
                open={open4}
                onClose={handleClose4}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit4} sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 1 }}>
                        Request Loan
                    </Typography>
                    <Grid item xs={12} sm={6} sx={{ display: { xs: 'none', md: 'none' } }}>
                        <TextField
                            name="id"
                            id="id"
                            label="id"
                            autoFocus
                            value={capitalID}


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
                                name="capital"
                                id="capital"
                                label="Capital"
                                value={capital}
                                onChange={e => setCapital(e.target.value)}



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
                        Save Capital
                    </Button>
                </Box>
            </Modal>

        </Container>
    )
}

export default Loans;