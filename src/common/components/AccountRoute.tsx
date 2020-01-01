import { RouteProps, Route, Redirect } from 'react-router-dom';
import React from 'react';

export function AccountRoute({ children, ...rest }: RouteProps): JSX.Element {

    //const account: IAccount = useSelector((state: IStateType) => state.account);

    return (
        <Route
            {...rest}
            render={() =>
                //account.email ? (
                    <Redirect
                        to={{
                            pathname: "/admin/home"
                        }}
                    />
                //) 
                //: <Login />
            }
        />
    );
}