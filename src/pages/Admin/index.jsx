import { Route, Switch, Redirect } from 'react-router-dom';
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
            <Redirect to="/admin/course" />
        </Switch>
    </div>
);

export default Admin;
