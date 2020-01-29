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

  //////////////////////////////////// Parcels ////////////////////////////////////
  async getParcels() {
      try {
        const response = await this.http.get(`${this.config.PARCELS_POSTFIX}`);
        return response.data;
      } catch (error){
        console.error('[HttpService] getParcels: could not retrieve parcels' , error);
      } 
  }

  async createParcel(aParcel: Parcel) {
    const response = await this.http.post(`${this.config.PARCELS_POSTFIX}`, aParcel);
    return response.data;
  }

  async addParcels(parcels: Parcel[]) {
      if (parcels && parcels.length > 0) {
        parcels.forEach(async parcel => {
          await this.http.post(`${this.config.PARCELS_POSTFIX}`, parcel);
        });
    }
  }

  //////////////////////////////////// Users ////////////////////////////////////

  async getUsers() {
      try {
        const response = await this.http.get(`${this.config.USERS_POSTFIX}`);
        return response.data;
      } catch (error) {
          console.error('[HttpService] getUsers: could not retreive users ', error);
      }
  }

  async createUser(aUser: User) {
    const response = await this.http.post(`${this.config.USERS_POSTFIX}`, aUser);
    return response.data;
  }

}

const httpService = new HttpService();

export default httpService;
