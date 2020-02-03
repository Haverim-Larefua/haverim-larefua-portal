import { ADD_PARCEL, ADD_PARCELS, EDIT_PARCEL, REMOVE_PARCEL, LOAD_PARCELS,
  IActionBase, loadParcels, addParcels, UPDATE_PARCEL_CITIES} from "../contexts/actions/parcels.action";
import { ParcelExtendedData, defaultparcelExtendedData} from "../contexts/interfaces/parcels.interface";
import { ParcelUtil } from "../Utils/Parcel/ParcelUtil"

export const parcelReducer = ( state: ParcelExtendedData = defaultparcelExtendedData, action: IActionBase) => {
  switch (action.type) {
    case LOAD_PARCELS: {
      return { parcels: action.parcels, action: loadParcels([]), cities: state.cities };
    }
    case ADD_PARCEL: {
      let tempparcels = [...state.parcels];
      tempparcels.push(action.parcel);
      return { parcels: tempparcels, action: action, cities: ParcelUtil.getParcelsCitiesDistinct(tempparcels) };
    }
    case ADD_PARCELS: {
      // merge state.parcels with action.parcels according to parcel.no+parcel.updateDate
      const [mergedParcels, addedparcels] = ParcelUtil.mergeParcels(state.parcels, action.parcels);
      return { parcels: mergedParcels, action: addParcels(addedparcels), cities: ParcelUtil.getParcelsCitiesDistinct(mergedParcels) };
    }
    case EDIT_PARCEL: {
      const foundIndex = state.parcels.findIndex( pack => pack.id === action.parcel.id );
      if (foundIndex !== -1) {
        let tempparcels = [...state.parcels];
        tempparcels[foundIndex] = action.parcel;
        return { parcels: tempparcels, action: action, cities: ParcelUtil.getParcelsCitiesDistinct(tempparcels) };
      } else {
        return state;
      }
    }
    case REMOVE_PARCEL: {
      const tmpparcels = state.parcels.filter( pkg => pkg.id !== action.parcelId );
      return { parcels: tmpparcels, action: action, cities: ParcelUtil.getParcelsCitiesDistinct(tmpparcels) };
    }

    case UPDATE_PARCEL_CITIES : {
      return { parcels: state.parcels, action: action, cities: ParcelUtil.getParcelsCitiesDistinct(state.parcels) };
    }
    default:
      return state;
  }
};
