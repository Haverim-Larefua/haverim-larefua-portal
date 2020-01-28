import parcel from "../interfaces/parcels.interface";

export interface IActionBase {
  type: string;
  [prop: string]: any;
}

export const ADD_PARCEL: string = "ADD_PARCEL";
export const ADD_PARCELS: string = "ADD_PARCELS";
export const EDIT_PARCEL: string = "EDIT_PARCEL";
export const REMOVE_PARCEL: string = "REMOVE_PARCEL";
export const LOAD_PARCELS: string = "LOAD_PARCELS";

export function loadParcels(parcels: parcel[]): ILoadparcelsActionType {
    return {type: LOAD_PARCELS, parcels };
}

export function addParcel(tmpparcel: parcel): IAddparcelActionType {
    return { type: ADD_PARCEL, parcel: tmpparcel }; 
}

export function addParcels(tmpparcels: parcel[]): IAddparcelsActionType {
  return { type: ADD_PARCELS, parcels: tmpparcels }; 
}

export function editParcel(tmpparcel: parcel): IEditparcelActionType {
    return { type: EDIT_PARCEL, parcel: tmpparcel };
}

export function removeParcel(parcelId: number): IRemoveparcelActionType {
    return { type: REMOVE_PARCEL, parcelId: parcelId };
}

interface ILoadparcelsActionType { type: string , parcels: parcel[]};
interface IAddparcelActionType { type: string, parcel: parcel };
interface IAddparcelsActionType { type: string, parcels: parcel[] };
interface IEditparcelActionType { type: string, parcel: parcel };
interface IRemoveparcelActionType { type: string, parcelId: number };

export type parcelActions = ILoadparcelsActionType;


