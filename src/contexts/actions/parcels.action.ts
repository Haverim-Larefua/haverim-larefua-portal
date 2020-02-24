import Parcel from "../interfaces/parcels.interface";

export interface IActionBase {
  type: string;
  [prop: string]: any;
}

export const ADD_PARCEL: string = "ADD_PARCEL"; // add also to DB
export const ADD_PARCELS: string = "ADD_PARCELS"; // add also to DB
export const EDIT_PARCEL: string = "EDIT_PARCEL"; // edit also in DB
export const REMOVE_PARCEL: string = "REMOVE_PARCEL"; // remove also from DB
export const LOAD_PARCELS: string = "LOAD_PARCELS"; //
export const UPDATE_PARCEL_CITIES: string = "UPDATE_PARCEL_CITIES"; // first load/edit/remove/add -> recalc cities
export const ASSIGN_USER_TO_PARCELS: string = "ASSIGN_USER_TO_PARCELS";

export function loadParcels(parcels: Parcel[]): ILoadparcelsActionType {
    return {type: LOAD_PARCELS, parcels };
}

export function addParcel(parcel: Parcel): IAddparcelActionType {
    return { type: ADD_PARCEL, parcel };
}

export function addParcels(parcels: Parcel[]): IAddparcelsActionType {
  return { type: ADD_PARCELS, parcels };
}

export function editParcel(parcel: Parcel): IEditparcelActionType {
    return { type: EDIT_PARCEL, parcel };
}

export function removeParcel(parcelId: number): IRemoveparcelActionType {
    return { type: REMOVE_PARCEL, parcelId };
}

export function updateParcelsCities(cities: string[]) : IUpdateparcelCitiesType {
   return {type: UPDATE_PARCEL_CITIES, cities};
}

export function assignUserToParcels(parcels: Parcel[]): IAssigUserToParcelActionType {
  return {type: ASSIGN_USER_TO_PARCELS, parcels};
}

export interface ILoadparcelsActionType { type: string , parcels: Parcel[]};
export interface IAddparcelActionType { type: string, parcel: Parcel };
export interface IAddparcelsActionType { type: string, parcels: Parcel[] };
export interface IEditparcelActionType { type: string, parcel: Parcel };
export interface IRemoveparcelActionType { type: string, parcelId: number };
export interface IUpdateparcelCitiesType { type: string, cities: string[] };
export interface IAssigUserToParcelActionType { type: string, parcels: Parcel[] };

export type parcelActions = ILoadparcelsActionType;


