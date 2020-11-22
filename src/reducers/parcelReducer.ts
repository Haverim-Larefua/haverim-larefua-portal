import {
  ADD_PARCEL, ADD_PARCELS, EDIT_PARCEL, REMOVE_PARCEL, LOAD_PARCELS, SEARCH_PARCELS, ASSIGN_USER_TO_PARCELS,
  IActionBase, loadParcels, addParcels, UPDATE_PARCEL_CITIES, PARCELS_ERROR, parcelsError
} from "../contexts/actions/parcels.action";
import { defaultParcelsState, ParcelState } from "../contexts/interfaces/parcels.interface";
import { ParcelUtil } from "../Utils/Parcel/ParcelUtil"
import logger from "../Utils/logger";
import Parcel from "../models/Parcel";

export const parcelReducer = (state: ParcelState = defaultParcelsState, action: IActionBase): ParcelState => {
  switch (action.type) {
    case LOAD_PARCELS: {
      logger.log('[parcelReducer] LOAD_PARCELS ', action.parcels);
      return { ...state, parcels: action.parcels, action: loadParcels([]), searching: false };
    }
    case SEARCH_PARCELS: {
      logger.log('[parcelReducer] reduce SEARCH_PARCELS #', state.parcels?.length, action.searchParams);
      return { ...state, action, searchParams: action.searchParams, searching: true };
    }
    case ADD_PARCEL: {
      let tempparcels = [...state.parcels, action.parcel];
      tempparcels.push();
      return { ...state, action, parcels: tempparcels };
    }
    case ADD_PARCELS: {
      // merge state.parcels with action.parcels according to parcel.identity+parcel.lastUpdateDate
      const [mergedParcels, addedparcels] = ParcelUtil.mergeParcels(state.parcels, action.parcels);
      return { ...state, parcels: mergedParcels, action: addParcels(addedparcels) };
    }
    case EDIT_PARCEL: {
      const foundIndex = state.parcels.findIndex(pack => pack.id === action.parcel.id);
      if (foundIndex !== -1) {
        let tempparcels = [...state.parcels];
        tempparcels[foundIndex] = ParcelUtil.prepareOneParcelForDisplay(action.parcel);
        return { ...state, parcels: tempparcels, action };
      } else {
        return state;
      }
    }
    case REMOVE_PARCEL: {
      const tmpparcels = state.parcels.filter(pkg => pkg.id !== action.parcelId);
      return { ...state, parcels: tmpparcels, action };
    }

    case UPDATE_PARCEL_CITIES: {
      logger.log('[parcelReducer] UPDATE_PARCEL_CITIES ', action.cities);
      return { ...state, cities: action.cities };
    }

    case ASSIGN_USER_TO_PARCELS: {
      const newStateParcels: Parcel[] = [];
      const parcelsIds = action.parcels.map((p: Parcel) => p.id);
      state.parcels.forEach((parcel: Parcel) => {
        if (parcelsIds.includes(parcel.id)) {
          const currentParcel: Parcel = action.parcels.find((par: Parcel) => par.id === parcel.id);
          newStateParcels.push(ParcelUtil.prepareOneParcelForDisplay(currentParcel));
        } else {
          newStateParcels.push(parcel);
        }
      });
      return { ...state, parcels: newStateParcels, action };
    }

    case PARCELS_ERROR: {
      return { ...state, error: action.error, action: parcelsError(action.error) };
    }

    default:
      return state;
  }
};
