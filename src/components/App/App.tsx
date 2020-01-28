import React, { Component } from "react";

import { BrowserRouter as Router, Switch } from "react-router-dom";
import { PrivateRoute } from "../../common/components/PrivateRouter";
import { AccountRoute } from "../../common/components/AccountRoute";
import Login from "../Login/Login";
import Admin from "../Admin/Admin";

import "./App.css";
import pushNotificationService from "../../services/pushNotification.service";
import Parcels from "../Parcels/Parcels";
import ParcelContextProvider from "../../contexts/parcelContext";
import UserContextProvider from "../../contexts/userContext";


class App extends Component<any, any> {

  public triggerPushNotification() {
    pushNotificationService.sendNotification();
  }

  render() {
    return (
      <div className="App" id="wrapper">
        <ParcelContextProvider>
        <UserContextProvider>
            <button 
                className="btn btn-primary" 
                onClick={() => this.triggerPushNotification()}>
                Trigger Push Notification
            </button>
            <Parcels />

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

        </UserContextProvider>
        </ParcelContextProvider>
      </div>
    );
  }
}

export default App;
