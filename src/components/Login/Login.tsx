import React, {useState} from "react";
import "./Login.scss";
import {Input} from "../../ui-components/Input/Input";
import {Button} from "../../ui-components/Button/Button";
import httpService, {IAuthAdminResponse} from "../../services/http";
import {Redirect} from "react-router-dom";
import {AppConstants1} from "../../constants/AppConstants";

const Login: React.FC = (): React.ReactElement => {

    const [ username, setUsername ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const [ loginErrorMessage, setLoginErrorMessage ] = useState<string>("");

    const doLogin = () => {
        httpService.login( username, password )
            .then((res: IAuthAdminResponse) => {
                AppConstants1.admin = {
                    token: res.token,
                    firstName: res.admin.firstName,
                    lastName: res.admin.lastName
                };
            })
            .catch((err) => {
                setLoginErrorMessage(`אירעה שגיאה: אנא בדוק שם משתמש וסיסמה`);
            })
    };

    return (
        <div>
            { AppConstants1.admin.token && AppConstants1.admin.token !== '' ? <Redirect to="/" /> : null }
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
