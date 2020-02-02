import React, { createContext, useReducer, useEffect } from 'react';
import httpService from '../services/http';
import logger  from '../Utils/logger';
import { parcelReducer } from '../reducers/parcelReducer';
import { ADD_PARCEL, ADD_PARCELS, EDIT_PARCEL, REMOVE_PARCEL, LOAD_PARCELS} from '../contexts/actions/parcels.action';
import { defaultParcelExplained } from './interfaces/parcels.interface';

export const parcelContext = createContext();

const ParcelContextProvider = (props) => {
  const [parcelExplained, dispatch] = useReducer(parcelReducer, defaultParcelExplained);

  // const getAllparcelsfromDB = async () => {
  //   logger.log('[ParcelContextProvider] getAllparcelsfromDB ');
  //   // const response = await httpService.getParcels();
  //   const response = await httpService.getParcels();

  //   logger.log('[ParcelContextProvider] getAllparcelsfromDB dispatching loadParcels  ', response);
  //   dispatch(loadParcels(response));
  // }
  //first time call that loads parcels from db
  // TODO: already done by the parcel object for searching - check how to seperate
  //useEffect(() => { getAllparcelsfromDB()}, []);

  //on every change to parcels
  useEffect(() => { 
    async function updateParcelsInDB () {
      logger.log('[ParcelContextProvider] updateParcelsInDB ', parcelExplained);
      if (!parcelExplained || !parcelExplained.action) {
        logger.log('[ParcelContextProvider] updateParcelsInDB undefined args');
        return;
      }
      switch (parcelExplained.action.type) {
        case ADD_PARCEL: {
          const response = await httpService.createParcel(parcelExplained.action.parcel)
          logger.log('[ParcelContextProvider] updateParcelsInDB ADD_PARCEL', response);
          break;
        }
        case ADD_PARCELS: {
          const response = await httpService.addParcels(parcelExplained.action.parcels)
          logger.log('[ParcelContextProvider] updateParcelsInDB ADD_PARCELS', response);
          break;
        }
        case EDIT_PARCEL: {
          const response = await httpService.updateParcel(parcelExplained.action.parcel);
          logger.log('[ParcelContextProvider] updateParcelsInDB EDIT_PARCEL', response);
          break;
        }
        case REMOVE_PARCEL: {
          const response = await httpService.deletParcel(parcelExplained.action.parcelId);
          logger.log('[ParcelContextProvider] updateParcelsInDB REMOVE_PARCEL', response);
          break;
        }
        case LOAD_PARCELS: 
        default:
          logger.log('[ParcelContextProvider] updateParcelsInDB no action', parcelExplained.action.type);
          break;
      } 
    }
    updateParcelsInDB() 
  }, [parcelExplained]);

  

  
  return (
    <parcelContext.Provider value={[parcelExplained, dispatch]}>
      {props.children}
    </parcelContext.Provider>
  );
}
 
export default ParcelContextProvider;