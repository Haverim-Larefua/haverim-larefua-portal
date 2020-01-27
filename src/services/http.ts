import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import Package from "../components/Packages/Package.model";
import Configuration from "../configuration/Configuration";

class HttpService {
  private http: AxiosInstance;
  private config: Configuration;

  private PACKAGES_URL: string;

  constructor(axiosConfig?: AxiosRequestConfig) {
    this.http = axios.create(axiosConfig);
    this.config = new Configuration();
    this.PACKAGES_URL = `${this.config.BACKEND_URL + this.config.PACKAGES_POSTFIX}`;
  }

  async sendPushNotification(subscription: PushSubscription, fingerprint: number
  ) {
    const response = await this.http.post(
      `${this.config.BACKEND_URL + this.config.PUSH_NOTIFY_POSTFIX}`,
      { subscription, fingerprint, id: 2 }
    );
    return response.data;
  }

  async sendPushSubscription(subscription: PushSubscription, fingerprint: number
  ) {
    const response = await this.http.post(
      `${this.config.BACKEND_URL + this.config.PUSH_SUBSCRIBE_POSTFIX}`,
      { subscription, fingerprint, id: 2 }
    );
    return response.data;
  }

  async getPackages() {
      try {
        const response = await this.http.get(this.PACKAGES_URL);
        return response.data;
      } catch (error){
        console.error('could not retrieve packages' , error);
      } 
  }

  async createPackage(aPackage: Package) {
    const response = await this.http.post(
      `${this.config.BACKEND_URL + this.config.PACKAGES_POSTFIX}`,
      aPackage
    );
    return response.data;
  }
}

const httpService = new HttpService({
//   baseURL: `${this.config.BACKEND_URL}/`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  withCredentials: false
  // method: 'HEAD'
});

export default httpService;
