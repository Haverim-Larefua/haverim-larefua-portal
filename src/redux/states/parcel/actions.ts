import { useToasts } from "react-toast-notifications";
import { Dispatch } from "redux";
import ISearchParcelsParams from "../../../models/ISearchParcelsParams";
import Parcel from "../../../models/Parcel";
import httpService from "../../../services/http";
import logger from "../../../Utils/logger";
import { ParcelUtil } from "../../../Utils/Parcel/ParcelUtil";
import { AppState } from "../../rootReducer";

import {
  LoadParcelsSuccessAction,
  AddParcelOptimisticAction,
  AddParcelsSuccessAction,
  EditParcelOptimisticAction,
  RemoveParcelOptimisticAction,
  AssignUserToParcelOptimisticAction,
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
  ASSIGN_USER_TO_PARCELS_OPTIMISTIC,
  SEARCH_PARCELS_SUCCESS,
} from "./types";
//const { addToast } = useToasts();

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

export function assignUserToParcelsOptimistic(parcels: Parcel[]): AssignUserToParcelOptimisticAction {
  return { type: ASSIGN_USER_TO_PARCELS_OPTIMISTIC, parcels };
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

    try {
      const [parcels, cityOptions] = await Promise.all([
        httpService.getParcels(searchParams.statusFilter, searchParams.cityFilter, searchParams.nameFilter),
        httpService.getParcelsCityOptions(),
      ]);

      dispatch(loadParcelsSuccess(parcels));
      dispatch(updateParcelsCitiesSuccess(cityOptions));
    } catch (err) {
      logger.error(err);
      dispatch(parcelsError(err));
    }
  };
}

export function reloadParcels() {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    const state = getState();
    const searchParams = state.parcel.searchParams;

    try {
      const [parcels, cityOptions] = await Promise.all([
        httpService.getParcels(searchParams.statusFilter, searchParams.cityFilter, searchParams.nameFilter),
        httpService.getParcelsCityOptions(),
      ]);

      dispatch(loadParcelsSuccess(parcels));
      dispatch(updateParcelsCitiesSuccess(cityOptions));
    } catch (err) {
      logger.error(err);
      dispatch(parcelsError(err));
    }
  };
}

export function addParcel(parcel: Parcel) {
  return async (dispatch: Dispatch<any>) => {
    dispatch(addParcelOptimistic(parcel));

    try {
      await httpService.createParcel(ParcelUtil.prepareParcelForDBUpdate(parcel));
    } catch (err) {
      dispatch(reloadParcels());
      logger.error(err);
    }
  };
}

export function addParcels(parcels: Parcel[]) {
  return async (dispatch: Dispatch<any>) => {
    try {
      const addedParcels = await httpService.addParcels(ParcelUtil.prepareParcelsForDBUpdate(parcels));

      if (addedParcels.length === 0) {
        const message = `כל החבילות מופיעות במערכת - אין חבילות חדשות בקובץ`;
        //addToast(message, { appearance: "success" });
      } else {
        dispatch(addParcelsSuccess(addedParcels));
        const message = `חבילות נוספו ${addedParcels.length} ,הקובץ נטען בהצלחה`;
        //addToast(message, { appearance: "success" });
      }
    } catch (err) {
      const message = `טעינת הקובץ נכשלה - פנה למנהל המערכת`;
      // addToast(message, { appearance: "error" });
      logger.error(err);
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
      logger.error(err);
      dispatch(reloadParcels());
    }
  };
}

export function assignUserToParcels(parcels: Parcel[]) {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch(assignUserToParcelsOptimistic(parcels));
      const parcelIds = parcels.map((parcel) => parcel.id);
      await httpService.assignUserToParcels(parcels[0].currentUserId, parcelIds);
    } catch (err) {
      logger.error(err);
      dispatch(reloadParcels());
    }
  };
}
