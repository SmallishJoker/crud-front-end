import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Admin from './routes/adminpage/Admin';
import User from './routes/userpage/User';

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
