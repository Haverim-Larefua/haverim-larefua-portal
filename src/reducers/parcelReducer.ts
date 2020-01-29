import { ADD_PARCEL, ADD_PARCELS, EDIT_PARCEL, REMOVE_PARCEL, LOAD_PARCELS, IActionBase } from '../contexts/actions/parcels.action';
import parcel from '../contexts/interfaces/parcels.interface';


export const parcelReducer = (state: parcel[] = [], action: IActionBase) => {
  
  switch (action.type) {
    case LOAD_PARCELS: {
      return action.parcels ;
    }
    case ADD_PARCEL: {
      let tempparcels = [...state];
      tempparcels.push(action.parcel);
      return tempparcels;
    }
    case ADD_PARCELS: {
      //TODO: maybe we need to merge state with action.parcels
      return action.parcels;
    }
    case EDIT_PARCEL: {
      const foundIndex = state.findIndex(pack => pack.id === action.parcel.id);
      if (foundIndex !== -1) {
        let tempparcels = [...state];
        tempparcels[foundIndex] = action.parcel;
        return tempparcels;
      } else {
        return state;
      }
    }
    case REMOVE_PARCEL: {
      return state.filter(pkg => pkg.id !== action.parcelId);
    }
    default:
      return state;
  }
} 


