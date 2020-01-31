import { ADD_PARCEL, ADD_PARCELS, EDIT_PARCEL, REMOVE_PARCEL, LOAD_PARCELS,
         IActionBase, loadParcels } from '../contexts/actions/parcels.action';
import  { ParcelExplained, defaultParcelExplained } from '../contexts/interfaces/parcels.interface';
import { ParcelUtil } from '../Utils/Parcel/ParcelUtil';

//sort parcels by their no property

export const parcelReducer = (state: ParcelExplained = defaultParcelExplained, action: IActionBase) => {
  
  switch (action.type) {
    case LOAD_PARCELS: {
      return {parcels: action.parcels, action: loadParcels([])} ;
    }
    case ADD_PARCEL: {
      let tempparcels = [...state.parcels];
      tempparcels.push(action.parcel);
      return {parcels: tempparcels, action: action};
    }
    case ADD_PARCELS: {
      // merge state.parcels with action.parcels according to parcel.no+parcel.updateDate
      const mergedParcels = ParcelUtil.mergeParcels(state.parcels, action.parcels);
      return {parcels: mergedParcels, action: action};
    }
    case EDIT_PARCEL: {
      const foundIndex = state.parcels.findIndex(pack => pack.id === action.parcel.id);
      if (foundIndex !== -1) {
        let tempparcels = [...state.parcels];
        tempparcels[foundIndex] = action.parcel;
        return {parcels: tempparcels, action: action};
      } else {
        return state;
      }
    }
    case REMOVE_PARCEL: {
      const tmpparcels = state.parcels.filter(pkg => pkg.id !== action.parcelId);
      return {parcels: tmpparcels, action: action};
    }
    default:
      return state;
  }
} 


