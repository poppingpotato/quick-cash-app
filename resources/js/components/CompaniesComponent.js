import * as React from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Container from '@mui/material/Container';


function createData(name) {
    return { name };
}

function Companies() {
    const rows = [
        createData('Company1'),
        createData('Company2'),
    ];
    return (

        <Container maxWidth="lg" sx={{mt:4}}>
        <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
        >
            Companies
        </Typography>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Companies</TableCell>
                        {/* <TableCell align="right">Company</TableCell>
                        <TableCell align="right">company Id</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            {/* <TableCell align="right">{row.company}</TableCell>
                            <TableCell align="right">{row.companyId}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>


    )
}

export default Companies;