import axios, { AxiosInstance } from "axios";
import Parcel from "../contexts/interfaces/parcels.interface";
import Configuration from "../configuration/Configuration";
import User from "../contexts/interfaces/users.interface";

class HttpService {
  private http: AxiosInstance;
  private config: Configuration;


  constructor() {
    this.config = new Configuration();
    this.http = axios.create({
          baseURL: `${this.config.BACKEND_URL}/`,
          headers: {
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          withCredentials: false
          // method: 'HEAD'
        });
  }

  async get(url: string){
    try {
      const response = await this.http.get(url);
      return response.data;
    } catch (error){
      console.error('[HttpService] get: could not retrieve ' , url, error);
    } 
  }

  async create(url: string, obj: Parcel | User) {
    const response = await this.http.post(url, obj);
    return response.data;
  }

  async add(url: string, items: Parcel[] | User[]) {
    if (items && items.length > 0) {
      items.forEach(async (item: Parcel | User) => {
        await this.http.post(url, item);
      });
    }
  }

  async update(url: string, id: number | undefined, item: Parcel | User) {
    if (!id) return;
    const response = await this.http.put(`${url}/${id}]`, item);
    return response.data;
  }

  async delete(url: string, id: number | undefined) {
    if (!id) return;
    const response = await this.http.delete(`${url}/${id}]`);
    return response.data;
  }

  //////////////////////////////////// Push ////////////////////////////////////
  async sendPushNotification(subscription: PushSubscription, fingerprint: number
  ) {
    const response = await this.http.post(`${this.config.PUSH_NOTIFY_POSTFIX}`,
      { subscription, fingerprint, id: 2 }
    );
    return response.data;
  }

  async sendPushSubscription(subscription: PushSubscription, fingerprint: number
  ) {
    const response = await this.http.post(`${this.config.PUSH_SUBSCRIBE_POSTFIX}`,
      { subscription, fingerprint, id: 2 }
    );
    return response.data;
  }

  
}

const httpService = new HttpService();

export default httpService;
