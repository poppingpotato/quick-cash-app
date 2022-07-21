import React, { useState, useEffect } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, Box, Grid, TextField, Button } from '@mui/material';
import Container from '@mui/material/Container';
import axios from 'axios';

function createData(name) {
    return { name };
}

// get all companies
function Companies() {
    // const rows = [
    //     createData('Company1'),
    //     createData('Company2'),
    // ];

    const [company, setCompany] = useState('');
    const [companyID, setCompanyID] = useState('');
    
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const handleClose = () => setOpen(false);
    const handleClose2 = () => setOpen2(false);

    const handleCreate = () => setOpen(true);


    //getting id to pass in controller, retrieve details from controller
    const handleEdit = (event) => {
        setOpen2(true)

        const idCompany = event.currentTarget.id;
        // console.log(event.currentTarget.id);
        const url = `http://localhost:8000/companies/${idCompany}/edit`

        axios.get(url)
        .then((response) => {
            const companyInfo = response;
            // console.log(companyInfo.data[0].id);
            setCompanyID(companyInfo.data[0].id);
            setCompany(companyInfo.data[0].company);

        })
    };


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

    //retrieving companies
    const [companies, setCompanies] = useState([]);
    const getCompanies = () => {
        axios.get('/getAllCompanies')
            .then((response) => {
                // console.log(response);
                const allCompanies = response.data.companies;
                setCompanies(allCompanies);
            });
    };

    useEffect(() => getCompanies(), []);

    //create company
    const handleSubmit = (event) => {
        event.preventDefault();
        const company = new FormData(event.currentTarget);
        const url = `http://localhost:8000/companies`

        const companyDetails = {
            company: company.get('company'),
        }

        axios.post(url, companyDetails)
            .then((response) => {
                console.log('Success', response);
                setOpen(false);
            });

        console.log({
            company: company.get('company'),
        });
    };

    //update company
    const handleSubmit2 = (event) => {
        event.preventDefault();
        const company = new FormData(event.currentTarget);
        const url = `http://localhost:8000/companies/${company.get('id')}`
        console.log(url);
        const companyDetails = {
            id: company.get('id'),
            company: company.get('company'),
        }

        axios.put(url, companyDetails)
            .then((response) => {
                console.log('Success', response);
                setOpen2(false);
            });

        console.log({
            company: company.get('company'),
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
                Companies
            </Typography>
            <Button sx={{ mb: 1 }} variant="contained" onClick={handleCreate}>Create Company</Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Companies</TableCell>
                            <TableCell align="center">Actions</TableCell>
                            {/* <TableCell align="right">company Id</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies?.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.company}
                                </TableCell>
                                <TableCell align="center"><Button variant="contained" onClick={handleEdit} id={row.id}> Edit</Button></TableCell>
                                {/* <TableCell align="right">{row.companyId}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


            {/* Create modal */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 1 }}>
                        Create Company
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
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

            {/* Edit modal */}
            <Modal
                open={open2}
                onClose={handleClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit2} sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 1 }}>
                        Update User
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ display: { xs: 'none', md: 'none' } }}>
                            <TextField
                                name="id"
                                id="id"
                                label="id"
                                value={companyID}
                                onChange={e => setCompanyID(e.target.value)}


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

export default Companies;