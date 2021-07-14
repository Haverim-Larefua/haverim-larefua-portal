import axios, { AxiosRequestConfig } from "axios";
import logger from "../Utils/logger";
import Configuration from "../configuration/Configuration";
import { AppConstants1 } from "../constants/AppConstants";
import { ParcelUtil } from "../Utils/Parcel/ParcelUtil";
import { UserUtil } from "../Utils/User/UserUtil";
import AuthService from "./authService";
import Parcel from "../models/Parcel";
import User from "../models/User";
import SearchUsersParams from "../models/SearchUsersParams";
import City from "../models/City";
import { IParcelResult } from "../redux/states/parcel/actions";

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
  [x: string]: any;
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
  public async getCities(): Promise<City[]> {
    return this.sendHttpRequest(Configuration.URLS.CITIES_ENDPOINT, HttpMethod.GET);
  }

  // //////////////////////////////////// Push ////////////////////////////////////
  async sendPushNotification(userId: string, title: string, subtitle: string, message: string) {
    return this.sendHttpRequest(`${Configuration.URLS.PUSH}/push/${userId}`, HttpMethod.PUT, {
      title,
      subtitle,
      message,
    });
  }

  async sendPushNotificationToUsers(parcelIds: number[]) {
    return this.sendHttpRequest(`${Configuration.URLS.PARCELS}/push`, HttpMethod.POST, {
      parcelIds,
    });
  }

  // async sendPushSubscription(subscription: PushSubscription, fingerprint: number ) {
  //   const response = await this.http.post( `${this.config.PUSH_SUBSCRIBE_POSTFIX}`, { subscription, fingerprint, id: 2 });
  //   return response.data;
  // }

  //////////////////////////////////// Parcels ////////////////////////////////////
  async getParcels(statusFilterTerm?: string, cityFilterTerm?: number[], searchTerm?: string, freeCondition?: string): Promise<Parcel[]> {
    let url = `${Configuration.URLS.PARCELS}?`;
    url += statusFilterTerm ? `statusFilterTerm=${statusFilterTerm}&` : "";
    if (cityFilterTerm) {
      cityFilterTerm.forEach(city => {
        url += `cityFilterTerm=${city}&`;
      });
    }
    url += searchTerm ? `searchTerm=${searchTerm}&` : "";
    url += freeCondition ? `freeCondition=${freeCondition}&` : "";

    const prcls: Parcel[] = await this.sendHttpRequest(url, HttpMethod.GET);
    return ParcelUtil.prepareParcelsForDisplay(prcls);
  }

  async getParcel(id: number): Promise<Parcel> {
    let url = `${Configuration.URLS.PARCELS}\\${id}`;
    const parcel: Parcel = await this.sendHttpRequest(url, HttpMethod.GET);
    return ParcelUtil.prepareOneParcelForDisplay(parcel);
  }


  async createParcels(parcels: Parcel[]): Promise<IParcelResult> {
      return this.sendHttpRequest(Configuration.URLS.PARCELS, HttpMethod.POST, parcels);
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

  async unassignParcel(parcelsId: number) {
    return this.sendHttpRequest(`${Configuration.URLS.PARCELS}/${parcelsId}/unassign`, HttpMethod.PUT);
  }

  async updateParcelsStatus(userId: number, status: string, parcels: number[]) {
    return this.sendHttpRequest(`${Configuration.URLS.PARCELS}/user/${userId}/${status}`, HttpMethod.PUT, {
      userId,
      status,
      parcels,
    });
  }

  //////////////////////////////////// Users ////////////////////////////////////
  async getUsers(searchParams: SearchUsersParams): Promise<User[]> {

    /*const city1 = new City(1,"אבו גוש", {name: "ירושלים"}, {name: "ירושלים"});
    const city2 = new City(1,"לוד", {name: "המרכז"}, {name: "רמלה"});
    const users:User[] = [
        {
          id: 1,
          firstName: "chaya",
          lastName: "chaimson",
          address: "כצנלסון לוד",
          deliveryAreas: [city1, city2],
          deliveryDays: "1,2,3,4,5,6",
          phone: "0544659907",
          notes: "",
          username: "",
          password: "",
          parcels: [],
          active: true
        }
        ];*/

    let url = `${Configuration.URLS.USERS}?`;
    if (searchParams.cityFilter) {
      searchParams.cityFilter.forEach(city => {
        url += `&cityFilter=${city}`;
      });
    }

    if (searchParams.nameFilter) {
      url += `&nameFilter=${searchParams.nameFilter}`;
    }

    if (searchParams.dayFilter) {
      url += `&dayFilter=${searchParams.dayFilter}`;
    }

    const users: User[] = await this.sendHttpRequest(url, HttpMethod.GET);
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
