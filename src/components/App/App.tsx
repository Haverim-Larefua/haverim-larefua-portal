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

class App extends Component<any, any> {
  render() {
    return (
      <div className="App" id="wrapper">
        <ErrorBoundary>
          <Router>
            <Header />
            <Switch>
              <Route exact path="/"> <Admin /> </Route>
              <Route path="/admin">  <Admin /> </Route>
              <UserContextProvider>
                <Route path="/users">
                  <CitiesContextProvider> <Users /> </CitiesContextProvider>
                </Route>
                <ParcelContextProvider>
                  <Route path="/parcels"> <Parcels /> </Route>
                  <Route path="/parcel/:id"> <ParcelDetails /> </Route>
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
