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
  UpdateParcelCitiesSuccessAction,
  UPDATE_PARCELS_ERROR,
  UpdateParcelsErrorAction,
  SearchParcelsSuccessAction,
  LOAD_PARCELS_SUCCESS,
  ADD_PARCEL_OPTIMISTIC,
  ADD_PARCELS_SUCCESS,
  EDIT_PARCEL_OPTIMISTIC,
  REMOVE_PARCEL_OPTIMISTIC,
  UPDATE_PARCEL_CITIES_SUCCESS,
  SEARCH_PARCELS_SUCCESS,
  UPDATE_PARCELS_STATUS_OPTIMISTIC,
  UpdateParcelsStatusOptimisticAction,
} from "./types";
import AppConstants from "../../../constants/AppConstants";
import _ from "lodash";

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

export function updateParcelsCitiesSuccess(cities: string[]): UpdateParcelCitiesSuccessAction {
  return { type: UPDATE_PARCEL_CITIES_SUCCESS, cities };
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
    const [parcels, cityOptions] = await Promise.all([
      httpService.getParcels(searchParams.statusFilter, searchParams.cityFilter, searchParams.searchTerm, searchParams.freeCondition),
      httpService.getParcelsCityOptions(),
    ]);

    dispatch(loadParcelsSuccess(parcels));
    dispatch(updateParcelsCitiesSuccess(cityOptions));
  } catch (err) {
    logger.error(err);
    dispatch(parcelsError(err));
    toastr.error("", "טעינת החבילות נכשלה - פנה למנהל המערכת");
  }
}

export function addParcel(parcel: Parcel) {
  return async (dispatch: Dispatch<any>) => {
    dispatch(addParcelOptimistic(parcel));

    try {
      await httpService.createParcel(ParcelUtil.prepareParcelForDBUpdate(parcel));
    } catch (err) {
      toastr.error("", "הוספת החבילה נכשלה - פנה למנהל המערכת");
      logger.error(err);
    } finally {
      dispatch(reloadParcels());
    }
  };
}

export function addParcels(parcels: Parcel[]) {
  return async (dispatch: Dispatch<any>) => {
    try {
      let addedParcels = await httpService.addParcels(ParcelUtil.prepareParcelsForDBUpdate(parcels));
      addedParcels = addedParcels.filter(p => p!= null);

      if (addedParcels.length === 0) {
        const message = `כל החבילות מופיעות במערכת - אין חבילות חדשות בקובץ`;
        toastr.success("", message);
      } else {
        dispatch(addParcelsSuccess(addedParcels));
        const message = `חבילות נוספו ${addedParcels.length} ,הקובץ נטען בהצלחה`;
        toastr.success("", message);
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
