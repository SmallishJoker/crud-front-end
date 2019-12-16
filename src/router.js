import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Admin from './routes/adminpage/Admin';
import User from './routes/userpage/User';
import Editor from './components/editor/Editor';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/user" component={User} />
          <Route path="/editor" component={Editor} />
        </Switch>
    </Router>
  );
}

export default RouterConfig;
