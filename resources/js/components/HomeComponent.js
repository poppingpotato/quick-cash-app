import React, {useEffect, useState} from 'react';
import Container from '@mui/material/Container';


function Home() {

    //retrieving user details
    const [details, setDetails] = useState([]);
    

    const getLoggedInUser = () => {
        axios.get('/getLoggedInUser')
            .then((response) => {
                console.log(response.data.user);
                const userData = response.data.user;
                setDetails(userData);
            });
    };

    useEffect(() => getLoggedInUser(), []);


    return (
        <Container maxWidth="lg">
            <h1>Welcome {details.firstName} {details.lastName}</h1>
        </Container>


    )
}

export default Home;