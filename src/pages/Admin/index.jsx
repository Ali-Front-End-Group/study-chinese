// import { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Help from './Help';
import Course from './Course';
import Add from './Add';
import './index.css';

const Admin = () => (
    <div className="adminBox">
        <Switch>
            <Route path="/admin/add" component={Add} />
            <Route path="/admin/course" component={Course} />
            <Route path="/admin/help" component={Help} />
            <Route path="/admin/" component={Home} />
            <Redirect to="/admin" />
        </Switch>
    </div>
);

export default Admin;
