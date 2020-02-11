import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import logger, {Logger} from '../Utils/logger';
import Parcel from "../contexts/interfaces/parcels.interface";
import Configuration from "../configuration/Configuration";
import User from "../contexts/interfaces/users.interface";
import AppConstants from "../constants/AppConstants";
import React, {Context, FC} from "react";
import {AdminContext, IAdminContext} from "../contexts/adminContext";

enum HttpMethod {
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  GET = 'get'
}

export interface IAuthAdminResponse {
  admin: any,
  token: string
}

class HttpService {
  // private http: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = Configuration.URLS.BACKEND_URL + '/';
  }

  private sendHttpRequest = <ResponseDataType>(url: string, method: HttpMethod, data?: any, headers?: any): Promise<ResponseDataType> => {
    return new Promise<ResponseDataType>((resolve, reject) => {

      const _headers: any = {
        "Access-Control-Allow-Origin": "*",
         Accept: "application/json",
         "Content-Type": "application/json",
      };

      if (context.token) {
        _headers.Authorization = `Berear ${context.token}`
      }

      const httpRequestOptions = {
        baseURL: Configuration.URLS.BACKEND_URL,
        url,
        method,
        headers: Object.assign(_headers, headers),
        data,
        responseType: 'json',
      } as AxiosRequestConfig;

      try {
        axios(httpRequestOptions)
            .then((response) => {
              console.log(`sendHttpRequest:: response.data: ${response.data}`);
              resolve(response.data);
            }).catch((error) => {
          reject(error);
        });
      } catch (e) {
        console.log('sendHttpRequest:: error: ', e);
      }
    });
  };

  ////////////////////////////////////  CITIES ////////////////////////////////////
  public  async getCities() {
    return this.sendHttpRequest(Configuration.URLS.CITIES_ENDPOINT, HttpMethod.GET);
  }

  // //////////////////////////////////// Push ////////////////////////////////////
  // async sendPushNotification(subscription: PushSubscription, fingerprint: number) {
  //   const response = await this.http.post(`${this.config.PUSH_NOTIFY_POSTFIX}`, { subscription, fingerprint, id: 2 } );
  //   return response.data;
  // }
  //
  // async sendPushSubscription(subscription: PushSubscription, fingerprint: number ) {
  //   const response = await this.http.post( `${this.config.PUSH_SUBSCRIBE_POSTFIX}`, { subscription, fingerprint, id: 2 });
  //   return response.data;
  // }

  //////////////////////////////////// Parcels ////////////////////////////////////
  async getParcels(): Promise<Parcel[]> {
    return this.sendHttpRequest(Configuration.URLS.PARCELS, HttpMethod.GET);
  }

  async createParcel(aParcel: Parcel) {
    return this.sendHttpRequest(Configuration.URLS.PARCELS, HttpMethod.POST, aParcel);
  }

  // TODO: need to send all as bulk to server, for now keeping like this
  async addParcels(parcels: Parcel[]) {
    const promises: any[] = [];
    if (parcels && parcels.length > 0) {
      parcels.forEach(parcel => {
        promises.push(this.sendHttpRequest(Configuration.URLS.PARCELS, HttpMethod.POST, parcel));
      });
    }
    return Promise.all(promises);
  }

  async updateParcel(aParcel: Parcel) {
    return this.sendHttpRequest(Configuration.URLS.PARCELS, HttpMethod.PUT, aParcel);
  }

  async deleteParcel(aParcel: Parcel) {
    return this.sendHttpRequest(`${Configuration.URLS.PARCELS}/${aParcel.id}`, HttpMethod.DELETE);
  }

  async assignUserToParcel(pacelId: number, userId: number) {
    return this.sendHttpRequest(`${Configuration.URLS.PARCELS}/assign/${pacelId}/${userId}`, HttpMethod.PUT);
  }

  // TODO: this should be a query in DB
  async searchParcels( statusFilterTerm: string, cityFilterTerm: string, nameSearchTerm: string) {
    logger.log('[httpService ] searchParcels ');
    let parcels: Parcel[] = await this.getParcels();

    if (parcels && parcels.length > 0 && nameSearchTerm &&  nameSearchTerm !== "" ) {
      const searchTerm = nameSearchTerm.trim().toLowerCase();
      parcels = parcels.filter( (item: Parcel) =>
        ((item.customerName && item.customerName.toLowerCase().indexOf(searchTerm) !== -1) ||
        (item.address && item.address.toLowerCase().indexOf(searchTerm) !== -1) ||
        (item.city && item.city.toLowerCase().indexOf(searchTerm) !== -1)
        )
      );
    }

    if ( parcels && parcels.length > 0 && cityFilterTerm && cityFilterTerm !== "" ) {
      const searchTerm = cityFilterTerm.trim().toLowerCase();
      parcels = parcels.filter((item: Parcel) => item.city === searchTerm);
    }

    if ( parcels &&  parcels.length > 0 && statusFilterTerm &&  statusFilterTerm !== "" ) {
      const searchTerm = statusFilterTerm.trim().toLowerCase();
      parcels = parcels.filter((item: Parcel) => item.parcelTrackingStatus === searchTerm);
    }

    return parcels;
  }

  //////////////////////////////////// Users ////////////////////////////////////
  async getUsers(): Promise<User[]> {
    return this.sendHttpRequest(Configuration.URLS.USERS, HttpMethod.GET);
  }

  async createUser(aUser: User): Promise<{ id: number }> {
    return this.sendHttpRequest(Configuration.URLS.USERS, HttpMethod.POST);
  }

  // TODO: need to send all as bulk to server, for now keeping like this
  async addUsers(users: User[]): Promise<{ id: number }[]> {
    const promises: any[] = [];
    if (users && users.length > 0) {
      users.forEach(user => {
        promises.push(this.sendHttpRequest(Configuration.URLS.USERS, HttpMethod.POST, user));
      });
    }
    return Promise.all(promises);
  }

  async updateUser(aUser: User) {
    return this.sendHttpRequest(`${Configuration.URLS.USERS}/${aUser.id}`, HttpMethod.PUT, aUser);
  }

  async deleteUser(aUser: User) {
    return this.sendHttpRequest(`${Configuration.URLS.USERS}/${aUser.id}`, HttpMethod.DELETE);
  }

  // TODO: this should be a query in DB
  async searchUsers( dayFilterTerm: string,  cityFilterTerm: string, nameSearchTerm: string) {
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
          item.deliveryDays.indexOf(AppConstants.allWeek) !== -1
      );
    }

    return users;
  }

  //////////////////////////////////// Authentication ////////////////////////////////////
  async login(username: string, password: string): Promise<IAuthAdminResponse> {
    return this.sendHttpRequest(Configuration.URLS.LOGIN, HttpMethod.POST, { username, password });
  }
}

const httpService = new HttpService();

export default httpService;
