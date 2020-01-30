import React, { createContext, useReducer, useEffect } from 'react';
import httpService from '../services/http';
import { parcelReducer } from '../reducers/parcelReducer';
import { NO_CHANGE_PARCEL, ADD_PARCEL, ADD_PARCELS, 
         EDIT_PARCEL, REMOVE_PARCEL, LOAD_PARCELS, loadParcels} from '../contexts/actions/parcels.action';
import { defaultParcelExplained } from './interfaces/parcels.interface';

export const parcelContext = createContext();

const ParcelContextProvider = (props) => {
  const [parcelExplained, dispatch] = useReducer(parcelReducer, defaultParcelExplained);

  const getAllparcelsfromDB = async () => {
    console.log('[ParcelContextProvider] getAllparcelsfromDB ');
    const response = await httpService.getParcels();
    console.log('[ParcelContextProvider] getAllparcelsfromDB dispatching loadParcels  ', response);
    dispatch(loadParcels(response));
  }

  const updateParcelsInDB = async () => {
    console.log('[ParcelContextProvider] updateParcelsInDB ', parcelExplained);
    if (!parcelExplained || !parcelExplained.action) {
      console.log('[ParcelContextProvider] updateParcelsInDB undefined args');
      return;
    }
    switch (parcelExplained.action.type) {
      
      case ADD_PARCEL: {
        const response = await httpService.createParcel(parcelExplained.action.parcel)
        console.log('[ParcelContextProvider] updateParcelsInDB ADD_PARCEL', response);
        break;
      }
      case ADD_PARCELS: {
        const response = await httpService.addParcels(parcelExplained.action.parcels)
        console.log('[ParcelContextProvider] updateParcelsInDB ADD_PARCELS', response);
        break;
      }
      case EDIT_PARCEL: {
        const response = await httpService.updateParcel(parcelExplained.action.parcel);
        console.log('[ParcelContextProvider] updateParcelsInDB EDIT_PARCEL', response);
        break;
      }
      case REMOVE_PARCEL: {
        const response = await httpService.deletParcel(parcelExplained.action.parcelId);
        console.log('[ParcelContextProvider] updateParcelsInDB REMOVE_PARCEL', response);
        break;
      }
      case NO_CHANGE_PARCEL:
      case LOAD_PARCELS: 
      default:
        console.log('[ParcelContextProvider] updateParcelsInDB no action', parcelExplained.action.type);
        break;
    } 
  }

  //first time call that loads parcels from db
  useEffect(() => { getAllparcelsfromDB()}, []);

  //on every change to parcels
  useEffect(() => { updateParcelsInDB() }, [parcelExplained]);
  
  return (
    <parcelContext.Provider value={[parcelExplained, dispatch]}>
      {props.children}
    </parcelContext.Provider>
  );
}
 
export default ParcelContextProvider;