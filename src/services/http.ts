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
  async sendPushNotification(subscription: PushSubscription, fingerprint: number) {
    const response = await this.http.post(`${this.config.PUSH_NOTIFY_POSTFIX}`, { subscription, fingerprint, id: 2 } );
    return response.data;
  }

  async sendPushSubscription(subscription: PushSubscription, fingerprint: number ) {
    const response = await this.http.post( `${this.config.PUSH_SUBSCRIBE_POSTFIX}`, { subscription, fingerprint, id: 2 });
    return response.data;
  }

  //////////////////////////////////// Parcels ////////////////////////////////////
  async getParcels() {
    console.log('[httpService ] getParcels ');
    try {
      const response = await this.http.get(`${this.config.PARCELS_POSTFIX}`);
      return response.data;
    } catch (error) {
      console.error(
        "[HttpService] getParcels: could not retrieve parcels",
        error
      );
    }
  }

  async createParcel(aParcel: Parcel) {
    const response = await this.http.post(
      `${this.config.PARCELS_POSTFIX}`,
      aParcel
    );
    return response.data;
  }

  async addParcels(parcels: Parcel[]) {
    if (parcels && parcels.length > 0) {
      parcels.forEach(async parcel => {
        await this.http.post(`${this.config.PARCELS_POSTFIX}`, parcel);
      });
    }
  }

  async updateParcel(aParcel: Parcel) {
    const response = await this.http.put(
      `${this.config.PARCELS_POSTFIX}/${aParcel.id}]`,
      aParcel
    );
    return response.data;
  }

  async deleteParcel(aParcel: Parcel) {
    const response = await this.http.delete( `${this.config.PARCELS_POSTFIX}/${aParcel.id}]` );
    return response.data;
  }

  // TODO: this should be a query in DB
  async searchParcels( statusFilterTerm: string, cityFilterTerm: string, nameSearchTerm: string ) {
    console.log('[httpService ] searchParcels ');
    let parcels = await this.getParcels();

    if (
      parcels &&
      parcels.length > 0 &&
      nameSearchTerm &&
      nameSearchTerm !== ""
    ) {
      const searchTerm = nameSearchTerm.trim().toLowerCase();
      parcels = parcels.filter(
        (item: Parcel) =>
          item.customerName &&
          item.customerName.toLowerCase().indexOf(searchTerm) !== -1
      );
    }

    if (
      parcels &&
      parcels.length > 0 &&
      cityFilterTerm &&
      cityFilterTerm !== ""
    ) {
      const searchTerm = cityFilterTerm.trim().toLowerCase();
      parcels = parcels.filter((item: Parcel) => item.city === searchTerm);
    }

    if (
      parcels &&
      parcels.length > 0 &&
      statusFilterTerm &&
      statusFilterTerm !== ""
    ) {
      const searchTerm = statusFilterTerm.trim().toLowerCase();
      parcels = parcels.filter((item: Parcel) => item.status === searchTerm);
    }

    return parcels;
  }

  //////////////////////////////////// Users ////////////////////////////////////

  async getUsers() {
    try {
      const response = await this.http.get(`${this.config.USERS_POSTFIX}`);
      return response.data;
    } catch (error) {
      console.error("[HttpService] getUsers: could not retreive users ", error);
    }
  }

  async createUser(aUser: User) {
    const response = await this.http.post(
      `${this.config.USERS_POSTFIX}`,
      aUser
    );
    return response.data;
  }

  async addUsers(users: User[]) {
    if (users && users.length > 0) {
      users.forEach(async user => {
        await this.http.post(`${this.config.USERS_POSTFIX}`, user);
      });
    }
  }

  async updateUser(aUser: User) {
    const response = await this.http.put(
      `${this.config.USERS_POSTFIX}/${aUser.id}]`,
      aUser
    );
    return response.data;
  }

  async deleteUser(aUser: User) {
    const response = await this.http.delete(
      `${this.config.USERS_POSTFIX}/${aUser.id}]`
    );
    return response.data;
  }

  // TODO: this should be a query in DB
  async searchUsers(
    dayFilterTerm: string,
    cityFilterTerm: string,
    nameSearchTerm: string
  ) {
    let users = await this.getUsers();

    if (users && users.length > 0 && nameSearchTerm && nameSearchTerm !== "") {
      const searchTerm = nameSearchTerm.trim().toLowerCase();
      users = users.filter(
        (item: User) =>
          (item.firstName &&
            item.firstName.toLowerCase().indexOf(searchTerm) !== -1) ||
          (item.lastName &&
            item.lastName.toLowerCase().indexOf(searchTerm) !== -1)
      );
    }

    if (users && users.length > 0 && cityFilterTerm && cityFilterTerm !== "") {
      const searchTerm = cityFilterTerm.trim().toLowerCase();
      users = users.filter((item: User) => item.deliveryArea === searchTerm);
    }

    if (users && users.length > 0 && dayFilterTerm && dayFilterTerm !== "") {
      const searchTerm = dayFilterTerm.trim().toLowerCase();
      users = users.filter(
        (item: User) =>
          item.deliveryDays.indexOf(searchTerm) !== -1 ||
          item.deliveryDays.indexOf("כל השבוע") !== -1
      );
    }

    return users;
  }
}

const httpService = new HttpService();

export default httpService;
