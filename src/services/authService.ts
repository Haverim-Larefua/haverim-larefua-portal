import httpService from "./http";
import { AppConstants1 } from "../constants/AppConstants";
import logger from "../Utils/logger";

export default class AuthService {

    public static async login(username: string, password: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            try {
                httpService.login( username, password )
                    .then((res) => {
                        localStorage.setItem('admin', JSON.stringify(res));
                        AppConstants1.admin = {
                        token: res.token,
                        firstName: res.admin.firstName,
                        lastName: res.admin.lastName
                        };
                    resolve(res.token);
                    })
                    .catch((error) => {
                    reject(error);
                });
            } catch (e) {
                logger.error('[AuthService] login:: error: ', e);
            }
        });
    }

    public static logout() {
        localStorage.removeItem('admin');
        delete AppConstants1.admin;
    }

    public static isLoggedIn = () => {
        const adminStorage = localStorage.getItem('admin');
        const adminToken = AppConstants1.admin &&  AppConstants1.admin.token &&  AppConstants1.admin.token !== '';
        const loggedIn = adminStorage && adminToken;
        console.log('[AuthService] isLoggiedIn storage = ', adminStorage, ' token = ' , adminToken, loggedIn);
        return (localStorage.getItem('admin') && 
                AppConstants1.admin && 
                AppConstants1.admin.token && 
                AppConstants1.admin.token !== '' );
    }

}