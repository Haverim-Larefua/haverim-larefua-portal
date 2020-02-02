
import React, { createContext, useState, useEffect } from 'react';
import httpService from '../services/http';

export const citiesContext = createContext();

const CitiesContextProvider = (props) => {
    const [cities, setCities] = useState([]);
  
    //first time call
    useEffect(() => {
        async function getAllCities() {
          console.log('[CitiesContextProvider] getAllCities ');
          const response = await httpService.getCities();
          const citiNames = response.result.records.map(item => item['שם_ישוב'].trim());
          setCities(citiNames);
          console.log('[CitiesContextProvider] getAllCities dispatching loadCities  ', response);
        }
        getAllCities();
      },[]);
  
    return (
      <citiesContext.Provider value={[ cities ]}>
        {props.children}
      </citiesContext.Provider>
    );
  }
   
  export default CitiesContextProvider;