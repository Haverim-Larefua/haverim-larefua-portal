import React from 'react';

import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { PrivateRoute } from '../../common/components/PrivateRouter';
import { AccountRoute } from '../../common/components/AccountRoute';
import Login from '../Login/Login';
import Admin from '../Admin/Admin';

import './App.css';
import "../../styles/sb-admin-2.css";

const App: React.FC = () => {
  return (
    <div className="App" id="wrapper">
      <Router>
        <Switch>
          <PrivateRoute path="/">
            <Admin />
          </PrivateRoute>
          <AccountRoute path="/login">
            <Login />
          </AccountRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
