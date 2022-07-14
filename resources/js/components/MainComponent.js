import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Landing from './LandingComponent'
import Example from './Example';
import Home from './HomeComponent';
import Loans from './LoansComponent';
import Profile from './ProfileComponent';
import Companies from './CompaniesComponent';
import Employees from './EmployeesComponent';


// Main acts as the router for pages
function Main() {
    return (
        <React.Fragment>
            <Switch>
            <Header />
                <Route path='/#' component={Landing}/>
                <Route path='/home' component={Home} />
                <Route path='/example' component={Example} />
                <Route path='/loans' component={Loans} />
                <Route path='/profile' component={Profile} />
                <Route path='/companies' component={Companies} />
                <Route path="/employees" component={Employees} />


            </Switch>

            {/* <Footer /> */}
        </React.Fragment>
    );
}

export default withRouter(Main);