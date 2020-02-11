import React, {InputHTMLAttributes, useEffect, useState} from "react";
import "./Login.scss";
import {Input} from "../../ui-components/Input/Input";
import {Button} from "../../ui-components/Button/Button";
import httpService, {IAuthAdminResponse} from "../../services/http";
import {AdminContext, IAdminContext} from "../../contexts/adminContext";
import {Redirect} from "react-router-dom";

const Login: React.FC = (): React.ReactElement => {

    const context: IAdminContext = React.useContext<IAdminContext>(AdminContext);
    const [ username, setUsername ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const [ token, setToken ] = useState<string>("");
    const [ loginErrorMessage, setLoginErrorMessage ] = useState<string>("");

    const doLogin = () => {
        httpService.login( username, password )
            .then((res: IAuthAdminResponse) => {
                context.token = res.token;
                setToken(res.token);
            })
            .catch((err) => {
                setLoginErrorMessage(`אירעה שגיאה: אנא בדוק שם משתמש וסיסמה`);
            })
    };

    return (
        <div>
            { token ? <Redirect to="/" /> : null }
            <div className='login-background'></div>
            <div className='login-wrapper'>
                <div className='login-screen'>
                    <span>ברוכ.ה הבא.ה לחברים לרפואה</span>
                    <Input type='text' name='username' label='שם משתמש' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <Input type='password' name='password' label='סיסמה' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button onClick={() => doLogin()}>התחבר</Button>
                    <div className='error-message'>{loginErrorMessage}</div>
                </div>
            </div>
        </div>
    )

};
export default Login;
