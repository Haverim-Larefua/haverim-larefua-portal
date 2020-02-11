import React, {Component, FC} from "react";
import {BrowserRouter as Router, Switch, Route, Redirect, RouteProps} from "react-router-dom";
import {AdminContext, IAdminContext} from "../../contexts/adminContext";

export const PrivateRoute = (props: RouteProps, ...rest: any[]) => {
    const context: IAdminContext = React.useContext<IAdminContext>(AdminContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                context.token ? (
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
