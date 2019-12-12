import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Admin from './routes/adminpage/Admin';
import User from './components/userlayout/UserLayout';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/user" component={User} />
        </Switch>
    </Router>
  );
}

export default RouterConfig;
