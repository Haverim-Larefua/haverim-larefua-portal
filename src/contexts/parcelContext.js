import React, { createContext, useReducer, useEffect } from 'react';
import { parcelReducer } from '../reducers/parcelReducer';
import httpService from '../services/http';
import { loadparcels } from './actions/parcels.action';


export const parcelContext = createContext();

const ParcelContextProvider = (props) => {
  const [parcels, dispatch] = useReducer(parcelReducer, []);

  const getAllparcelsfromDB = async () => {
    const response = await httpService.getparcels();
    dispatch(loadparcels(response));
  }

  //const updateAllparcelsInDB = async () => {
   // parcels.forEach(async pkg => {
   //   await httpService.createparcel(pkg);
   // })
  //}

  useEffect(() => { getAllparcelsfromDB()}, []);

  //useEffect(() => { updateAllparcelsInDB() }, [parcels]);
  
  return (
    <parcelContext.Provider value={{ parcels, dispatch }}>
      {props.children}
    </parcelContext.Provider>
  );
}
 
export default ParcelContextProvider;