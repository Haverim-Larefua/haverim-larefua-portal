import React, { createContext, useReducer, useEffect } from 'react';
import httpService from '../services/http';
import { parcelReducer } from '../reducers/parcelReducer';
import { loadParcels } from './actions/parcels.action';


export const parcelContext = createContext([[], function(){}]);

const ParcelContextProvider = (props) => {
  const [parcels, dispatch] = useReducer(parcelReducer, []);

  const getAllparcelsfromDB = async () => {
    console.log('[ParcelContextProvider] getAllparcelsfromDB ');
    const response = await httpService.getParcels();
    console.log('[ParcelContextProvider] getAllparcelsfromDB dispatching loadParcels  ', response);
    dispatch(loadParcels(response));
  }

  const updateAllparcelsInDB = () => {
    console.log('[ParcelContextProvider] updateAllparcelsInDB ', parcels);
    httpService.addParcels(parcels);
  }

  useEffect(() => { getAllparcelsfromDB()}, []);

  useEffect(() => { updateAllparcelsInDB() }, [parcels]);
  
  return (
    <parcelContext.Provider value={[parcels, dispatch]}>
      {props.children}
    </parcelContext.Provider>
  );
}
 
export default ParcelContextProvider;