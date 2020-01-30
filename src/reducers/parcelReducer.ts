import { ADD_PARCEL, ADD_PARCELS, EDIT_PARCEL, REMOVE_PARCEL, LOAD_PARCELS, SET_PARCELS,
         IActionBase, 
         addParcel, addParcels, editParcel, removeParcel, noChangeToParcel } from '../contexts/actions/parcels.action';
import { ParcelExplained, defaultParcelExplained } from '../contexts/interfaces/parcels.interface';

export const parcelReducer = (state: ParcelExplained = defaultParcelExplained, action: IActionBase) => {
  
  switch (action.type) {
    case SET_PARCELS: {
      return {parcels: action.parcels, action: noChangeToParcel('')} ;
    }
    case LOAD_PARCELS: {
      return {parcels: action.parcels, action: noChangeToParcel('')} ;
    }
    case ADD_PARCEL: {
      let tempparcels = [...state.parcels];
      tempparcels.push(action.parcel);
      return {parcels: tempparcels, action: addParcel(action.parcel)};
    }
    case ADD_PARCELS: {
      //TODO: maybe we need to merge state with action.parcels
      return {parcels: action.parcels, action: addParcels(action.parcels)};
    }
    case EDIT_PARCEL: {
      const foundIndex = state.parcels.findIndex(pack => pack.id === action.parcel.id);
      if (foundIndex !== -1) {
        let tempparcels = [...state.parcels];
        tempparcels[foundIndex] = action.parcel;
        return {parcels: tempparcels, action: editParcel(action.parcel)};
      } else {
        return state;
      }
    }
    case REMOVE_PARCEL: {
      const tmpparcels = state.parcels.filter(pkg => pkg.id !== action.parcelId);
      return {parcels: tmpparcels, action: removeParcel(action.parcelId)};
    }
    default:
      return state;
  }
} 


