import React from "react";
import {Route, Redirect, RouteProps} from "react-router-dom";
import {AppConstants1} from "../../constants/AppConstants";

export const PrivateRoute = (props: RouteProps) => {
    return (
        <Route
            {...props}
            render={({ location }) =>
                AppConstants1.admin && AppConstants1.admin.token && AppConstants1.admin.token !== '' ? (
                    props.children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};
