import React, {useState} from "react";
import "./Login.scss";
import { withRouter, useHistory } from 'react-router-dom';
import Input from "../shared/Input/Input";
import {Button} from "../shared/Button/Button";
import {Redirect} from "react-router-dom";
import AuthService from "../../services/authService";

const Login: React.FC = (): React.ReactElement => {

    const history = useHistory();

    const [ token, setToken ] = useState<string>("");
    const [ username, setUsername ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const [ loginErrorMessage, setLoginErrorMessage ] = useState<string>("");

    const doLogin = async () => {
        try {
            const response = await AuthService.login(username, password);
            setToken(response);
            history.push('/');
        } catch (err) {
            setLoginErrorMessage(`אירעה שגיאה: אנא בדוק/בדקי שם משתמש וסיסמה`);
        }
    }

    return (
        <div>
            { token ? <Redirect to="/" /> : null }
            <div className='login-background'></div>
            <div className='login-wrapper'>
                <div className='login-screen'>
                    <span>ברוכים הבאים לשליחים לרפואה</span>
                    <Input type='text' name='username' label='שם משתמש' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <Input type='password' name='password' label='סיסמה' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button onClick={() => doLogin()}>התחבר/י</Button>
                    <div className='error-message'>{loginErrorMessage}</div>
                </div>
            </div>
        </div>
    )

};
export default withRouter(Login);
