import { Dispatch } from "redux";
import ISearchParcelsParams from "../../../models/ISearchParcelsParams";
import Parcel from "../../../models/Parcel";
import httpService from "../../../services/http";
import logger from "../../../Utils/logger";
import { ParcelUtil } from "../../../Utils/Parcel/ParcelUtil";
import { AppState } from "../../rootReducer";
import { toastr } from "react-redux-toastr";

import {
  LoadParcelsSuccessAction,
  AddParcelOptimisticAction,
  AddParcelsSuccessAction,
  EditParcelOptimisticAction,
  RemoveParcelOptimisticAction,
  UPDATE_PARCELS_ERROR,
  UpdateParcelsErrorAction,
  SearchParcelsSuccessAction,
  LOAD_PARCELS_SUCCESS,
  ADD_PARCEL_OPTIMISTIC,
  ADD_PARCELS_SUCCESS,
  EDIT_PARCEL_OPTIMISTIC,
  REMOVE_PARCEL_OPTIMISTIC,
  SEARCH_PARCELS_SUCCESS,
  UPDATE_PARCELS_STATUS_OPTIMISTIC,
  UpdateParcelsStatusOptimisticAction,
} from "./types";
import AppConstants from "../../../constants/AppConstants";
import React from "react";

export function updateParcelsStatusOptimistic(
  userId: number,
  status: string,
  parcelIds: number[]
): UpdateParcelsStatusOptimisticAction {
  return { type: UPDATE_PARCELS_STATUS_OPTIMISTIC, userId, status, parcelIds };
}

export function loadParcelsSuccess(parcels: Parcel[]): LoadParcelsSuccessAction {
  return { type: LOAD_PARCELS_SUCCESS, parcels };
}

export function addParcelOptimistic(parcel: Parcel): AddParcelOptimisticAction {
  return { type: ADD_PARCEL_OPTIMISTIC, parcel };
}

export function addParcelsSuccess(parcels: Parcel[]): AddParcelsSuccessAction {
  return { type: ADD_PARCELS_SUCCESS, parcels };
}

export function editParcelOptimistic(parcel: Parcel): EditParcelOptimisticAction {
  return { type: EDIT_PARCEL_OPTIMISTIC, parcel };
}

export function removeParcelOptimistic(parcelId: number): RemoveParcelOptimisticAction {
  return { type: REMOVE_PARCEL_OPTIMISTIC, parcelId };
}

export function parcelsError(error: string): UpdateParcelsErrorAction {
  return { type: UPDATE_PARCELS_ERROR, error };
}

export function searchParcelsSuccess(searchParams: ISearchParcelsParams): SearchParcelsSuccessAction {
  return { type: SEARCH_PARCELS_SUCCESS, searchParams };
}

///Redux Thunk Functions////////////
export function searchParcels(searchParams: ISearchParcelsParams) {
  return async (dispatch: Dispatch) => {
    dispatch(searchParcelsSuccess(searchParams));
    await loadParcels(searchParams, dispatch);
  };
}

export function reloadParcels() {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    const state = getState();
    const searchParams = state.parcel.searchParams;
    await loadParcels(searchParams, dispatch);
  };
}

async function loadParcels(searchParams: ISearchParcelsParams, dispatch: Dispatch) {
  try {
    const [parcels] = await Promise.all([
      httpService.getParcels(searchParams.statusFilter, searchParams.cityFilter, searchParams.searchTerm, searchParams.freeCondition),
    ]);
    ParcelUtil.prepareParcelsForDisplay(parcels);
    dispatch(loadParcelsSuccess(parcels));
  } catch (err) {
    logger.error(err);
    dispatch(parcelsError(err));
    toastr.error("", "טעינת החבילות נכשלה - פנה למנהל המערכת");
  }
}

export interface IParcelResult {
  added: Parcel[];
  errors: string[],
}


export function addParcels(parcels: Parcel[]) {
  return async (dispatch: Dispatch<any>) => {
    try {
      const parcelsForAdded = ParcelUtil.prepareParcelsForDBUpdate(parcels);
      const response = await httpService.createParcels(parcelsForAdded);
      const addedParcels = response?.added;

      if(addedParcels.length > 0) {
        dispatch(addParcelsSuccess(addedParcels))
      }

      if (parcelsForAdded.length === addedParcels.length) {
        const message = `חבילות נוספו ${addedParcels.length} ,הקובץ נטען בהצלחה`;
        toastr.success("", message);
      } else {
        const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + response.errors.join("\n");
        const encodedUri = encodeURI(csvContent);
        const toastrOptions = {
          timeOut: 0,
          component: ( 
            <>
              <div style={{padding: '3px'}} >{response.added.length} חבילות נטענו</div> 
              <a href={encodedUri} download="errors.csv">הורד רשימת שגיאות</a>
              </>
            ),
            closeOnToastrClick: false,
        }
 
        toastr.warning("", "", toastrOptions);

      }


    } catch (err) {
      const message = `טעינת הקובץ נכשלה - פנה למנהל המערכת`;
      toastr.error("", message);
      logger.error(err);
    } finally {
      dispatch(reloadParcels());
    }
  };
}


export function editParcel(parcel: Parcel) {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch(editParcelOptimistic(parcel));
      await httpService.updateParcel(ParcelUtil.prepareParcelForDBUpdate(parcel));
    } catch (err) {
      toastr.error("", "הוספת החבילה נכשלה - פנה למנהל המערכת");
      logger.error(err);
    } finally {
      dispatch(reloadParcels());
    }
  };
}

export function removeParcel(parcelId: number) {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch(removeParcelOptimistic(parcelId));
      await httpService.deleteParcel(parcelId);
    } catch (err) {
      toastr.error("", "מחיקת החבילה נכשלה - פנה למנהל המערכת");
      logger.error(err);
    } finally {
      dispatch(reloadParcels());
    }
  };
}

export function assignUserToParcels(parcelsToAssociate: number[], userId: number) {
  return async (dispatch: Dispatch<any>) => {
    try {
      await httpService.assignUserToParcels(userId, parcelsToAssociate);
      toastr.success("", AppConstants.parcelsUserChangedSuccessfully);
    } catch (err) {
      logger.error(err);
      toastr.error("", AppConstants.parcelsUserChangedError);
    } finally {
      dispatch(reloadParcels());
    }
  };
}

export function unAssignUserToParcel(parcel: number) {
  return async (dispatch: Dispatch<any>) => {
    try {
      await httpService.unassignParcel(parcel);
      toastr.success("", AppConstants.parcelsUnassignUserSuccessfully);
    } catch (err) {
      logger.error(err);
      toastr.error("", AppConstants.parcelsUserChangedError);
    } finally {
      dispatch(reloadParcels());
    }
  };
}
export function updateParcelsStatus(userId: number, status: string, parcelIds: number[]) {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch(updateParcelsStatusOptimistic(userId, status, parcelIds));
      await httpService.updateParcelsStatus(userId, status, parcelIds);
      toastr.success("", AppConstants.parcelStatusChangedSuccessfully);
    } catch {
      toastr.error("", AppConstants.parcelStatusChangedError);
      dispatch(reloadParcels());
    }
  };
}

export function sendPushNotificationToUsers(parcelIds: number[]) {
  return async () => {
    try {
      await httpService.sendPushNotificationToUsers( parcelIds);
      toastr.success("", AppConstants.sendPushNotificationToUsersSuccessfully);
    } catch {
      toastr.error("", AppConstants.sendPushNotificationToUsersError);
    }
  };
}
