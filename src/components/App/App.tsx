import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";

import Admin from "../Admin/Admin";
import Parcels from "../Parcels/Parcels";
import UserContextProvider from "../../contexts/userContext";
import Users from "../Users/Users";
import Header from "../shared/Header/Header";
import ErrorBoundary from "../shared/ErrorBoundary/ErrorBoundary";
import CitiesContextProvider from "../../contexts/citiesContext";
import ParcelDetails from "../Parcels/ParcelDetails/ParcelDetails";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import Login from "../Login/Login";
import { AppConstants1 } from "../../constants/AppConstants";
import ErrorContextProvider from "../../contexts/ErrorContext";
import ErrorDialog from "../ErrorDialog/ErrorDialog";
import ApplicationDownloadPage from "../ApplicationDownloadPage/ApplicationDownloadPage";
import { Provider } from "react-redux";
import configureStore from "../../redux/store";
import ReduxToastr from "react-redux-toastr";

const App: React.FC<any> = (): React.ReactElement => {
  const exclusionArray = ["/downloadApp"];

  const admin = localStorage.getItem("admin");
  AppConstants1.admin = admin ? JSON.parse(admin) : undefined;
  const reduxStore = configureStore();
  
  return (
    <div className="App" id="wrapper">
      <Provider store={reduxStore}>   
      <ReduxToastr
            timeOut={4000}
            newestOnTop={true}
            preventDuplicates
            position="top-left"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick/>
          <ErrorBoundary>
            <Router>
              {exclusionArray.indexOf(window.location.pathname) < 0 && <Header />}
              <Switch>
                <Route path="/login" component={Login} />
                <PrivateRoute exact path="/" component={Admin} />
                <PrivateRoute path="/admin" component={Admin} />

                <ErrorContextProvider>
                  <UserContextProvider>
                    <CitiesContextProvider>
                      <PrivateRoute path="/users" component={Users} />
                    </CitiesContextProvider>
                      <PrivateRoute path="/parcels" component={Parcels} />
                      <PrivateRoute
                        path="/parcel/:id"
                        component={ParcelDetails}
                      />
                  </UserContextProvider>
                  <Route
                    path="/downloadApp"
                    component={ApplicationDownloadPage}
                  />
                  <ErrorDialog />
              
                </ErrorContextProvider>
              </Switch>
            </Router>
          </ErrorBoundary>
      </Provider>
    </div>
  );
};

export default App;
