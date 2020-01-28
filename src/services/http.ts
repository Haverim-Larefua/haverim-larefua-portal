import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import parcel from "../contexts/interfaces/parcels.interface";
import Configuration from "../configuration/Configuration";

class HttpService {
  private http: AxiosInstance;
  private config: Configuration;

  private parcelS_URL: string;

  constructor(axiosConfig?: AxiosRequestConfig) {
    this.http = axios.create(axiosConfig);
    this.config = new Configuration();
    this.parcelS_URL = `${this.config.BACKEND_URL + this.config.PARCELS_POSTFIX}`;
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

  async getparcels() {
      try {
        const response = await this.http.get(this.parcelS_URL);
        return response.data;
      } catch (error){
        console.error('could not retrieve parcels' , error);
      } 
  }

  async createparcel(aparcel: parcel) {
    const response = await this.http.post(
      `${this.config.BACKEND_URL + this.config.PARCELS_POSTFIX}`,
      aparcel
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
