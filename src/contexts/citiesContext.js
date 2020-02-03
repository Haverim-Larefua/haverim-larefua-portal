
import React, { createContext, useState, useEffect } from 'react';
import httpService from '../services/http';
import logger  from '../Utils/logger';

export const citiesContext = createContext();

const CitiesContextProvider = (props) => {
    const [cities, setCities] = useState([]);
  
    //first time call
    useEffect(() => {
        async function getAllCities() {
          logger.log('[CitiesContextProvider] getAllCities ');
          const response = await httpService.getCities();
          const citiNames = response.result.records.map(item => item['שם_ישוב'].trim());
          setCities(citiNames);
          logger.log('[CitiesContextProvider] getAllCities dispatching loadCities  ', response);
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