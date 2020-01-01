import React from 'react'
import { RouteProps, Route } from 'react-router-dom';

export function PrivateRoute({ children, ...rest }: RouteProps): JSX.Element {

    // const account: IAccount = useSelector((state: IStateType) => state.account);

    return (
        <Route
            {...rest}
            render={() =>
                // account.email ? (
                    children
                // ) : <Login/>
            }
        />
    );
}