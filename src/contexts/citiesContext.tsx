
import React, { createContext, useState, useEffect } from 'react';
import httpService from '../services/http';
import logger  from '../Utils/logger';
import { citieAndSettlementRecord } from './interfaces/cities.interface';

export const citiesContext = createContext<string[]>([]);

const CitiesContextProvider: React.FC = (props) => {
    const [cities, setCities] = useState<string[]>([]);
  
    //first time call
    useEffect(() => {
        async function getAllCities() {
          logger.log('[CitiesContextProvider] getAllCities ');
          const response = await httpService.getCities();
          const citiNames = response.result.records.map((item: citieAndSettlementRecord)=> item['שם_ישוב'].trim());
          setCities(citiNames);
          logger.debug('[CitiesContextProvider] getAllCities dispatching loadCities  ', response);
        }
        getAllCities();
      },[]);
  
    return (
      <citiesContext.Provider value={cities}>
        {props.children}
      </citiesContext.Provider>
    );
  }
   
  export default CitiesContextProvider;