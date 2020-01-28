import React, { createContext, useReducer, useEffect } from 'react';
import { parcelReducer } from '../reducers/parcelReducer';
import httpService from '../services/http';
import { loadParcels } from './actions/parcels.action';


export const parcelContext = createContext();

const ParcelContextProvider = (props) => {
  const [parcels, dispatch] = useReducer(parcelReducer, []);

  const getAllparcelsfromDB = async () => {
    const response = await httpService.getParcels();
    dispatch(loadParcels(response));
  }

  const updateAllparcelsInDB = () => {
    console.log('[ParcelContextProvider] updateAllparcelsInDB ', parcels);
    httpService.addParcels(parcels);
  }

  useEffect(() => { getAllparcelsfromDB()}, []);

  useEffect(() => { updateAllparcelsInDB() }, [parcels]);
  
  return (
    <parcelContext.Provider value={{ parcels, dispatch }}>
      {props.children}
    </parcelContext.Provider>
  );
}
 
export default ParcelContextProvider;