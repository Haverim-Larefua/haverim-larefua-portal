import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import logger  from '../../Utils/logger';
import Admin from "../Admin/Admin";
import Parcels from "../Parcels/Parcels";
import ParcelContextProvider from "../../contexts/parcelContext";
import UserContextProvider from "../../contexts/userContext";
import Users from "../Users/Users";
import Header from "../shared/Header/Header";
import ErrorBoundary from "../shared/ErrorBoundary/ErrorBoundary";
import CitiesContextProvider from "../../contexts/citiesContext";
import ParcelDetails from "../Parcels/ParcelDetails/ParcelDetails";
import {PrivateRoute} from "../PrivateRoute/PrivateRoute";
import Login from "../Login/Login";
import {AppConstants1} from "../../constants/AppConstants";
import firebase from "firebase";

class App extends Component<any, any> {

  firebaseConfig = {
    apiKey: "ddsfds",
    authDomain: "fsdf",
    databaseUrl: "dkj",
    storageBucket: "dgsfg",
    messagingSenderId: "slkdjslkdjg"
  }

  constructor(props: any) {
    super(props);
    const messaging = firebase.messaging();

    messaging.requestPermission()
    .then(function() {
      logger.log('Have permission');
      return messaging.getToken();
    })
    .then(function(token) {
      logger.log(token);
    })
    .catch(function(err){
      logger.error('Error Occured during requesting messaging permission');
    })


  }

  render() {
    const admin = localStorage.getItem('admin');
    AppConstants1.admin = admin ? JSON.parse(admin) : undefined;

    return (
        <div className="App" id="wrapper">
                <ErrorBoundary>
                  <Router>
                      <Header />
                      <Switch>
                        <Route path="/login"><Login /></Route>
                        <Route exact path="/"><Admin /></Route>
                          <PrivateRoute path='/admin'><Admin/></PrivateRoute>
                          <UserContextProvider>
                              <CitiesContextProvider>
                                <PrivateRoute path='/users'><Users /></PrivateRoute>
                              </CitiesContextProvider>
                              <ParcelContextProvider>
                                  <PrivateRoute path='/parcels'><Parcels/></PrivateRoute>
                                  <PrivateRoute path='/parcel/:id'><ParcelDetails/></PrivateRoute>
                              </ParcelContextProvider>
                          </UserContextProvider>
                      </Switch>
                  </Router>
                </ErrorBoundary>
        </div>
    );
  }
}

export default App;
