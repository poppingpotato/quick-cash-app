import React, { useEffect, useState } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ListItem, Avatar, List, ListItemAvatar, ListItemText } from '@mui/material';
import Container from '@mui/material/Container';
import axios from 'axios';

function createData(name, company, companyId) {
    return { name, company, companyId };
}
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

    const [user, setUser] = useState([]);

    const getUsers = () => {
        axios.get('/getUsers')
            .then((response) => {
                console.log(response);
                const allUsers = response.data.users;
                setUser(allUsers);
            });
    };

    useEffect(() => getUsers(), []);


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
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee</TableCell>
                            <TableCell align="right">Company</TableCell>
                            <TableCell align="right">company Id</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user.map((data) => (
                            <TableRow
                                key={data.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {data.firstName} {data.lastName}
                                </TableCell>
                                <TableCell align="right">{data.company}</TableCell>
                                <TableCell align="right">{data.companyId}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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