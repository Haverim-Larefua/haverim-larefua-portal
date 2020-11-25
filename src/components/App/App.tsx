import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Parcels from "../Parcels/Parcels";
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
import Dashboard from "../Dashboard/Dashboard";
import { Provider } from "react-redux";
import configureStore from "../../redux/store";
import ReduxToastr from "react-redux-toastr";
import { reloadUsers } from "../../redux/states/user/actions";

const App: React.FC<any> = (): React.ReactElement => {
  const exclusionArray = ["/downloadApp"];

  const admin = localStorage.getItem("admin");
  AppConstants1.admin = admin ? JSON.parse(admin) : undefined;
  const reduxStore = configureStore();
  reduxStore.dispatch(reloadUsers() as any);
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
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute path="/admin" component={Dashboard} />

                <ErrorContextProvider>
                    <CitiesContextProvider>
                      <PrivateRoute path="/users" component={Users} />
                    </CitiesContextProvider>
                      <PrivateRoute path="/parcels" component={Parcels} />
                      <PrivateRoute
                        path="/parcel/:id"
                        component={ParcelDetails}
                      />
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
