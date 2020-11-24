import { produce } from "immer";
import ISearchParcelsParams from "../../../models/ISearchParcelsParams";
import Parcel from "../../../models/Parcel";
import { ParcelUtil } from "../../../Utils/Parcel/ParcelUtil";
import {
  ADD_PARCELS_SUCCESS,
  ADD_PARCEL_OPTIMISTIC,
  EDIT_PARCEL_OPTIMISTIC,
  LOAD_PARCELS_SUCCESS,
  ParcelActions,
  REMOVE_PARCEL_OPTIMISTIC,
  SEARCH_PARCELS_SUCCESS,
  UPDATE_PARCELS_ERROR,
  UPDATE_PARCELS_STATUS_OPTIMISTIC,
  UPDATE_PARCEL_CITIES_SUCCESS,
} from "./types";

export interface ParcelState {
  parcels: Parcel[];
  searchParams: ISearchParcelsParams;
  cities: string[];
  error?: any;
  searching: boolean;
}

const INITIAL_STATE: ParcelState = {
  parcels: [],
  searchParams: { statusFilter: "", cityFilter: "", nameFilter: "" },
  cities: [],
  error: "",
  searching: false,
};

export const parcelReducer = (state: ParcelState = INITIAL_STATE, action: ParcelActions): ParcelState =>
  produce(state, (draft: ParcelState) => {
    switch (action.type) {
      case UPDATE_PARCELS_STATUS_OPTIMISTIC: {
        draft.parcels.forEach((parcel: Parcel) => {
          const isParcelToBeUpdatedFound = action.parcelIds.some((id: number) => id === parcel.id);
          if (isParcelToBeUpdatedFound) {
            parcel.parcelTracking.push({
              status: action.status,
              statusDate: new Date(),
              userId: action.userId,
              id: 0,
              parcelId: parcel.id,
              comments: "",
            });
          }
        });
        break;
      }

      case SEARCH_PARCELS_SUCCESS: {
        draft.searchParams = action.searchParams;
        draft.searching = true;
        break;
      }

      case LOAD_PARCELS_SUCCESS: {
        draft.parcels = action.parcels;
        draft.searching = false;
        break;
      }

      case ADD_PARCEL_OPTIMISTIC: {
        draft.parcels = [...state.parcels, action.parcel];
        break;
      }

      case ADD_PARCELS_SUCCESS: {
        // merge state.parcels with action.parcels according to parcel.identity+parcel.lastUpdateDate
        const [mergedParcels] = ParcelUtil.mergeParcels(state.parcels, action.parcels);
        draft.parcels = mergedParcels;
        break;
      }

      case EDIT_PARCEL_OPTIMISTIC: {
        const foundIndex = state.parcels.findIndex((pack) => pack.id === action.parcel.id);
        if (foundIndex !== -1) {
          let tempParcels = [...state.parcels];
          tempParcels[foundIndex] = ParcelUtil.prepareOneParcelForDisplay(action.parcel);
          draft.parcels = tempParcels;
        }
        break;
      }

      case REMOVE_PARCEL_OPTIMISTIC: {
        draft.parcels = state.parcels.filter((pkg) => pkg.id !== action.parcelId);
        break;
      }

      case UPDATE_PARCEL_CITIES_SUCCESS: {
        draft.cities = action.cities;
        break;
      }

      case UPDATE_PARCELS_ERROR: {
        draft.error = action.error;
        break;
      }
    }
  });
