import { ADD_PARCEL, ADD_PARCELS, EDIT_PARCEL, REMOVE_PARCEL, LOAD_PARCELS, SEARCH_PARCELS, ASSIGN_USER_TO_PARCELS,
  IActionBase, loadParcels, addParcels, UPDATE_PARCEL_CITIES} from "../contexts/actions/parcels.action";
import Parcel, { ParcelExtendedData, defaultparcelExtendedData} from "../contexts/interfaces/parcels.interface";
import { ParcelUtil } from "../Utils/Parcel/ParcelUtil"
import logger from "../Utils/logger";

export const parcelReducer = ( state: ParcelExtendedData = defaultparcelExtendedData, action: IActionBase) => {
  switch (action.type) {
    case LOAD_PARCELS: {
      logger.log('[parcelReducer] LOAD_PARCELS ', action.parcels);
      return { parcels: action.parcels, action: loadParcels([]), searchParams: state.searchParams, cities: state.cities };
    }
    case SEARCH_PARCELS: {
      logger.log('[userReducer] reduce SEARCH_PARCELS #', state.parcels.length, action.searchParams);
      return { users: state.parcels, action: loadParcels([]), searchParams: action.searchParams, cities: state.cities};
    }
    case ADD_PARCEL: {
      let tempparcels = [...state.parcels];
      tempparcels.push(action.parcel);
      return { parcels: tempparcels, action: action, searchParams: state.searchParams, cities: ParcelUtil.getParcelsCitiesDistinct(tempparcels) };
    }
    case ADD_PARCELS: {
      // merge state.parcels with action.parcels according to parcel.identity+parcel.lastUpdateDate
      const [mergedParcels, addedparcels] = ParcelUtil.mergeParcels(state.parcels, action.parcels);
      return { parcels: mergedParcels, action: addParcels(addedparcels), searchParams: state.searchParams, cities: ParcelUtil.getParcelsCitiesDistinct(mergedParcels) };
    }
    case EDIT_PARCEL: {
      const foundIndex = state.parcels.findIndex( pack => pack.id === action.parcel.id );
      if (foundIndex !== -1) {
        let tempparcels = [...state.parcels];
        tempparcels[foundIndex] = ParcelUtil.prepareOneParcelForDisplay(action.parcel);
        return { parcels: tempparcels, action: action, searchParams: state.searchParams, cities: ParcelUtil.getParcelsCitiesDistinct(tempparcels) };
      } else {
        return state;
      }
    }
    case REMOVE_PARCEL: {
      const tmpparcels = state.parcels.filter( pkg => pkg.id !== action.parcelId );
      return { parcels: tmpparcels, action: action, searchParams: state.searchParams, cities: ParcelUtil.getParcelsCitiesDistinct(tmpparcels) };
    }

    case UPDATE_PARCEL_CITIES : {
      return { parcels: state.parcels, action: action, cities: ParcelUtil.getParcelsCitiesDistinct(state.parcels) };
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
      return { parcels: newStateParcels, action: action, cities: state.cities };
    }
    default:
      return state;
  }
};
