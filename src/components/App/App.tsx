import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

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

class App extends Component<any, any> {

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
                        <Route exact path="/"><Login /></Route>
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
