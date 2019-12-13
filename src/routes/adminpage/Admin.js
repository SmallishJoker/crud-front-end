import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import AdminLayout from '../../components/adminlayout/AdminLayout';
import UserList from './users/UserList';
import IndexPage from '../IndexPage';
import UserDetail from './userdetail/UserDetail';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default class Admin extends React.Component {

    render() {

        console.log(this.props)
        const match = this.props.match.path;

        return (
            <Router history={history}>
                <AdminLayout>
                    <Switch>
                        <Route exact path={`${match}/dashboard`} component={IndexPage} />
                        <Route exact path={`${match}/user`} component={UserList} />
                        <Route exact path={`${match}/user/detail/:name`} component={UserDetail} />
                        <Redirect to="/admin/dashboard" />
                    </Switch>
                </AdminLayout>
            </Router>
        )
    }

}