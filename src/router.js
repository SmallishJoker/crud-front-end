import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import Layout from './components/MainLayout';
import UserList from './routes/users/UserList';
import IndexPage from './routes/IndexPage';
import EditUser from './routes/edituser/EditUser';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <Redirect path="/" exact to="/home" />
          <Route path="/home" component={IndexPage} />
          <Route path="/userlist" component={UserList} />
          <Route path="/edituser" component={EditUser} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default RouterConfig;
