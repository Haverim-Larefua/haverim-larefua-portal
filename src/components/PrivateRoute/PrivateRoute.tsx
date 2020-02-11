import React from "react";
import {Route, Redirect, RouteProps} from "react-router-dom";
import {AppConstants1} from "../../constants/AppConstants";

export const PrivateRoute = (props: RouteProps, ...rest: any[]) => {
    const aaa = false;
    console.log(`AppConstants1.admin.token: ${AppConstants1.admin.token}`);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                aaa ? (
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
