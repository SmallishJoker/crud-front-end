import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import AdminLayout from '../../components/adminlayout/AdminLayout';
import UserList from '../users/UserList';
import IndexPage from '../IndexPage';
import UserDetail from '../userdetail/UserDetail';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default class Admin extends React.Component {

    render() {

        console.log(this.props)

        return (
            <Router history={history}>
                <AdminLayout>
                    <Switch>
                        <Route path="/admin/dashboard" component={IndexPage} />
                        <Route path="/admin/user" component={UserList} />
                        <Redirect path="/admin" to="/admin/dashboard" />
                    </Switch>
                </AdminLayout>
            </Router>
        )
    }

}