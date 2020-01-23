import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

class HttpService {
    http: AxiosInstance;

    // private pushServerUrl = `https://push-notification-demo-server.herokuapp.com/subscription`;

    private subscribeServerUrl = 'subscribe';
    private notifyServerUrl = 'notify';

    constructor(config?: AxiosRequestConfig) {
        this.http = axios.create(config);
    }

    async sendPushNotification(subscription: PushSubscription, fingerprint: number) {
        const response = await this.http.post(this.notifyServerUrl, { subscription, fingerprint, id: 2});
        return response.data;
    }

    async sendPushSubscription(subscription: PushSubscription, fingerprint: number) {
        const response = await this.http.post(this.subscribeServerUrl, { subscription, fingerprint, id: 2});
        return response.data;
    }
    
}

const httpService = new HttpService({
    baseURL: `${BACKEND_URL}/push`,
    headers: {
        'Access-Control-Allow-Origin': '*',
         Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: false,
    // method: 'HEAD'
});

export default httpService;
