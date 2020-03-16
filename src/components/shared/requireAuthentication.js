import React from "react";
import { Redirect} from "react-router-dom";
import AuthService from "../../services/authService";

export function requireAuthentication(Component) {
    
    return class AuthenticatedComponent extends React.Component {
       

        isAuthenticated() {
            return AuthService.isLoggedIn();
        }

        render() {
            const loginErrorMessage = (
                    <Redirect to={{ pathname: "/login", state: { from: document.location } }} />
                    // Please <a href="/login">login</a> in order to view this part of the application.
            );

            return (
                <div>
                    { this.isAuthenticated === true ? <Component {...this.props} /> : loginErrorMessage }
                </div>
            );
        }
    };
}

export default requireAuthentication;