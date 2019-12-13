import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import UserLayout from '../../components/userlayout/UserLayout';
import Home from '../userpage/home/Home';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default class User extends React.Component {

    render() {
        return(
            <Router history={history}>
                <UserLayout>
                    <Switch>
                        <Route exact path="/user" component={Home} />
                        <Redirect to="/user" />
                    </Switch>
                </UserLayout>
            </Router>
        )
    }

}