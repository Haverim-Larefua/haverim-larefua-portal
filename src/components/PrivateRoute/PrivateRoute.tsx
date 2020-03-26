import React from "react";
import {Route, Redirect, RouteProps} from "react-router-dom";
import AuthService from "../../services/authService";

interface PrivateRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
    component: any;
}

export const PrivateRoute = (props: PrivateRouteProps) => {
    const { component: Component, ...rest } = props;
    return (
        <Route
            {...rest}
            render={(routeProps) =>
                true /*AuthService.isLoggedIn()*/
                  ? (<Component {...routeProps} /> ) 
                  : (<Redirect to={{pathname: '/login', state: {push: true, from: routeProps.location} }} /> )
            }
        />
    );
};
