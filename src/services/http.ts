import axios, { AxiosRequestConfig } from "axios";
import logger from "../Utils/logger";
import Configuration from "../configuration/Configuration";
import AppConstants, { AppConstants1 } from "../constants/AppConstants";
import { ParcelUtil } from "../Utils/Parcel/ParcelUtil";
import CitiesAndSettlements from "../contexts/interfaces/cities.interface";
import { UserUtil } from "../Utils/User/UserUtil";
import AuthService from "./authService";
import Parcel from "../models/Parcel";
import User from "../models/User";

enum HttpMethod {
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  GET = "get",
}

export interface IAuthAdminResponse {
  admin: {
    firstName: string;
    lastName: string;
  };
  token: string;
}

class HttpService {
  // private http: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = Configuration.URLS.BACKEND_URL + "/";
  }

  private sendHttpRequest = <ResponseDataType>(
    url: string,
    method: HttpMethod,
    data?: any,
    headers?: any
  ): Promise<ResponseDataType> => {
    return new Promise<ResponseDataType>((resolve, reject) => {
      const _headers: any = {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      if (AuthService.isLoggedIn()) {
        _headers.Authorization = `Berear ${AppConstants1.admin.token}`;
      }

      const httpRequestOptions = {
        baseURL: Configuration.URLS.BACKEND_URL,
        url,
        method,
        headers: Object.assign(_headers, headers),
        data,
        responseType: "json",
      } as AxiosRequestConfig;

      try {
        axios(httpRequestOptions)
          .then((response) => {
            logger.debug(`[http] sendHttpRequest:: response.data: ${JSON.stringify(response.data)}`);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (e) {
        logger.error("[http ]sendHttpRequest:: error: ", e);
      }
    });
  };

  ////////////////////////////////////  CITIES ////////////////////////////////////
  public async getCities(): Promise<CitiesAndSettlements> {
    // return this.sendHttpRequest(Configuration.URLS.CITIES_ENDPOINT, HttpMethod.GET);
    const response = await axios.get(Configuration.URLS.CITIES_ENDPOINT);
    return response.data;
  }

  // //////////////////////////////////// Push ////////////////////////////////////
  async sendPushNotification(userId: string, title: string, subtitle: string, message: string) {
    return this.sendHttpRequest(`${Configuration.URLS.PUSH}/push/${userId}`, HttpMethod.PUT, {
      title,
      subtitle,
      message,
    });
  }

  // async sendPushSubscription(subscription: PushSubscription, fingerprint: number ) {
  //   const response = await this.http.post( `${this.config.PUSH_SUBSCRIBE_POSTFIX}`, { subscription, fingerprint, id: 2 });
  //   return response.data;
  // }

  //////////////////////////////////// Parcels ////////////////////////////////////
  async getParcels(statusFilterTerm?: string, cityFilterTerm?: string, nameSearchTerm?: string): Promise<Parcel[]> {
    let url = `${Configuration.URLS.PARCELS}?`;
    url += statusFilterTerm ? `statusFilterTerm=${statusFilterTerm}&` : "";
    url += cityFilterTerm ? `cityFilterTerm=${cityFilterTerm}&` : "";
    url += nameSearchTerm ? `nameSearchTerm=${nameSearchTerm}&` : "";

    const prcls: Parcel[] = await this.sendHttpRequest(url, HttpMethod.GET);
    return ParcelUtil.prepareParcelsForDisplay(prcls);
  }

  async createParcel(aParcel: Parcel) {
    return this.sendHttpRequest(Configuration.URLS.PARCELS, HttpMethod.POST, aParcel);
  }

  // TODO: need to send all as bulk to server, for now keeping like this
  async addParcels(parcels: Parcel[]): Promise<Parcel[]> {
    const promises: any[] = [];
    if (parcels?.length > 0) {
      parcels.forEach((parcel) => {
        promises.push(this.sendHttpRequest(Configuration.URLS.PARCELS, HttpMethod.POST, parcel));
      });
    }
    return Promise.all(promises);
  }

  async updateParcel(aParcel: Parcel) {
    return this.sendHttpRequest(Configuration.URLS.PARCELS, HttpMethod.PUT, aParcel);
  }

  async deleteParcel(pacelId: number) {
    // only mark the parcel as deleted - but do not really delete it
    return await this.sendHttpRequest(`${Configuration.URLS.PARCELS}/${pacelId}/1`, HttpMethod.DELETE);
  }

  async assignUserToParcels(userId: number, parcelsId: number[]) {
    return this.sendHttpRequest(`${Configuration.URLS.PARCELS}/assign/${userId}`, HttpMethod.PUT, parcelsId);
  }

  async getParcelsCityOptions() {
    return this.sendHttpRequest<string[]>(`${Configuration.URLS.PARCELS}/cityOptions`, HttpMethod.GET);
  }

  async updateParcelsStatus(userId: number, status: string, parcels: number[]) {
    return this.sendHttpRequest(`${Configuration.URLS.PARCELS}/user/${userId}/${status}`, HttpMethod.PUT, {
      userId,
      status,
      parcels,
    });
  }

  //////////////////////////////////// Users ////////////////////////////////////
  async getUsers(): Promise<User[]> {
    const users: User[] = await this.sendHttpRequest(Configuration.URLS.USERS, HttpMethod.GET);
    return UserUtil.prepareUsersForDisplay(users);
  }

  async getUserById(id: number): Promise<User> {
    const user: User = await this.sendHttpRequest(`${Configuration.URLS.USERS}/${id}`, HttpMethod.GET);
    return UserUtil.prepareOneUserForDisplay(user);
  }

  async createUser(aUser: User): Promise<{ id: number }> {
    const user = UserUtil.prepareOneUserForDBUpdate(aUser);
    return this.sendHttpRequest(Configuration.URLS.USERS, HttpMethod.POST, user);
  }

  // TODO: need to send all as bulk to server, for now keeping like this
  async addUsers(users: User[]): Promise<{ id: number }[]> {
    const promises: any[] = [];
    if (users && users.length > 0) {
      users.forEach((user) => {
        const dbUsr = UserUtil.prepareOneUserForDBUpdate(user);
        promises.push(this.sendHttpRequest(Configuration.URLS.USERS, HttpMethod.POST, dbUsr));
      });
    }
    return Promise.all(promises);
  }

  async updateUser(aUser: User) {
    const user = UserUtil.prepareOneUserForDBUpdate(aUser);
    return this.sendHttpRequest(`${Configuration.URLS.USERS}/${aUser.id}`, HttpMethod.PUT, user);
  }

  async deleteUser(id: number) {
    return this.sendHttpRequest(`${Configuration.URLS.USERS}/${id}`, HttpMethod.DELETE);
  }

  // TODO: this should be a query in DB
  async searchUsers(dayFilterTerm: string, cityFilterTerm: string, nameSearchTerm: string) {
    let users = await this.getUsers();

    if (users?.length > 0 && nameSearchTerm !== "") {
      const searchTerm = nameSearchTerm.trim().toLowerCase();
      users = users.filter(
        (item: User) =>
          item.firstName?.toLowerCase().includes(searchTerm) || item.lastName?.toLowerCase().includes(searchTerm)
      );
    }

    if (users?.length > 0 && cityFilterTerm !== "") {
      const searchTerm = cityFilterTerm.trim().toLowerCase();
      users = users.filter((item: User) => item.deliveryArea === searchTerm);
    }

    if (users?.length > 0 && dayFilterTerm !== "") {
      const searchTerm = dayFilterTerm.trim().toLowerCase();
      users = users.filter(
        (item: User) => item.deliveryDays.includes(searchTerm) || item.deliveryDays.includes(AppConstants.allWeek)
      );
    }

    return users;
  }

  async getUsersAreasDistinct() {
    logger.log("[httpService ] getUsersAreasDistinct ");
    let users: User[] = await this.getUsers();
    return UserUtil.getUsersAreasDistinct(users);
  }

  //////////////////////////////////// Authentication ////////////////////////////////////
  async login(username: string, password: string): Promise<IAuthAdminResponse> {
    return this.sendHttpRequest(Configuration.URLS.LOGIN, HttpMethod.POST, {
      username,
      password,
    });
  }

  async createAdmin(username: string, password: string): Promise<IAuthAdminResponse> {
    return this.sendHttpRequest(Configuration.URLS.ADMIN, HttpMethod.POST, {
      username,
      password,
    });
  }
}

const httpService = new HttpService();

export default httpService;
