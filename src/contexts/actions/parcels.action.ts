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
export const SET_PARCELS: string = "SET_PARCELS"; // no change to DB (in-memory filter/search)
export const NO_CHANGE_PARCEL: string = "NO_CHANGE"; //nothing changes

export function loadParcels(parcels: Parcel[]): ILoadparcelsActionType {
    return {type: LOAD_PARCELS, parcels };
}

export function setParcels(parcels: Parcel[]): ISetparcelsActionType {
  return {type: SET_PARCELS, parcels };
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

export function noChangeToParcel(dummy: string): INoChangeActionType {
  return { type: NO_CHANGE_PARCEL, dummy };
}

interface ILoadparcelsActionType { type: string , parcels: Parcel[]};
interface ISetparcelsActionType { type: string , parcels: Parcel[]};
interface IAddparcelActionType { type: string, parcel: Parcel };
interface IAddparcelsActionType { type: string, parcels: Parcel[] };
interface IEditparcelActionType { type: string, parcel: Parcel };
interface IRemoveparcelActionType { type: string, parcelId: number };
interface INoChangeActionType { type: string, dummy: string };

export type parcelActions = ILoadparcelsActionType;


