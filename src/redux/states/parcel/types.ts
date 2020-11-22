import ISearchParcelsParams from "../../../models/ISearchParcelsParams";
import Parcel from "../../../models/Parcel";
export const LOAD_PARCELS_SUCCESS = "LOAD_PARCELS_SUCCESS";
export const ADD_PARCEL_OPTIMISTIC = "ADD_PARCEL_OPTIMISTIC";
export const ADD_PARCELS_SUCCESS = "ADD_PARCELS_SUCCESS";
export const EDIT_PARCEL_OPTIMISTIC = "EDIT_PARCEL_OPTIMISTIC";
export const REMOVE_PARCEL_OPTIMISTIC = "REMOVE_PARCEL_OPTIMISTIC";
export const UPDATE_PARCEL_CITIES_SUCCESS = "UPDATE_PARCEL_CITIES_SUCCESS";
export const ASSIGN_USER_TO_PARCELS_OPTIMISTIC =
  "ASSIGN_USER_TO_PARCELS_OPTIMISTIC";
export const UPDATE_PARCELS_ERROR = "UPDATE_PARCELS_ERROR";
export const SEARCH_PARCELS_SUCCESS = "SEARCH_PARCELS_SUCCESS";

export interface LoadParcelsSuccessAction {
  type: typeof LOAD_PARCELS_SUCCESS;
  parcels: Parcel[];
}
export interface AddParcelOptimisticAction {
  type: typeof ADD_PARCEL_OPTIMISTIC;
  parcel: Parcel;
}
export interface AddParcelsSuccessAction {
  type: typeof ADD_PARCELS_SUCCESS;
  parcels: Parcel[];
}
export interface EditParcelOptimisticAction {
  type: typeof EDIT_PARCEL_OPTIMISTIC;
  parcel: Parcel;
}
export interface RemoveParcelOptimisticAction {
  type: typeof REMOVE_PARCEL_OPTIMISTIC;
  parcelId: number;
}
export interface UpdateParcelCitiesSuccessAction {
  type: typeof UPDATE_PARCEL_CITIES_SUCCESS;
  cities: string[];
}
export interface AssignUserToParcelOptimisticAction {
  type: typeof ASSIGN_USER_TO_PARCELS_OPTIMISTIC;
  parcels: Parcel[];
}
export interface UpdateParcelsErrorAction {
  type: typeof UPDATE_PARCELS_ERROR;
  error: any;
}

export interface SearchParcelsSuccessAction {
  type: typeof SEARCH_PARCELS_SUCCESS;
  searchParams: ISearchParcelsParams;
}

export type ParcelActions =
  | LoadParcelsSuccessAction
  | AddParcelOptimisticAction
  | AddParcelsSuccessAction
  | EditParcelOptimisticAction
  | RemoveParcelOptimisticAction
  | UpdateParcelCitiesSuccessAction
  | AssignUserToParcelOptimisticAction
  | UpdateParcelsErrorAction
  | SearchParcelsSuccessAction;
