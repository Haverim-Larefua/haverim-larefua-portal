import React, { createContext, useState, useEffect } from "react";
import httpService from '../services/http';
import logger from '../Utils/logger';
import District from '../models/District';
import Subdistrict from '../models/Subdistrict';


export const citiesContext = createContext<District[]>([]);

const CitiesContextProvider: React.FC = props => {
  const [districts, setDistricts] = useState<District[]>([]);

  function writeCities(citiNames: string[]) {
    if (citiNames && citiNames.length > 0) {
      var FileSaver = require("file-saver");
      const citiesStr = citiNames.join(",\n");
      const citiesToFile = "export const cityList = [" + citiesStr + "]";

      const fileName = "./Cities.js";
      var file = new File([citiesToFile], fileName, {
        type: "text/plain;charset=utf-8"
      });
      FileSaver.saveAs(file);
    }
  }


  async function getAllCitiesFromBE() {
    logger.log("[CitiesContextProvider] getAllCities ");
    const cities = await httpService.getCities();

    let districtsFromBE:District[] = [];
    cities.map(city => {
      let district = districtsFromBE.find(dis => dis.name === city.district.name);
      if (district) {
        let subdistrict = district.subdistricts.find(sub => sub.name === city.subdistrict.name);
        if (subdistrict) {
          subdistrict.cities = [...subdistrict.cities, city];
        } else {
          subdistrict = new Subdistrict();
          subdistrict.name = city.subdistrict.name;
          subdistrict.cities = [city];
          district.subdistricts = [...district.subdistricts, subdistrict];
        }
      } else {
        district = new District();
        district.name = city.district.name;
        let subdistrict = new Subdistrict();
        subdistrict.name = city.subdistrict.name;
        subdistrict.cities = [city];
        district.subdistricts = [subdistrict];
        districtsFromBE = [...districtsFromBE, district];
      }
    });

    setDistricts(districtsFromBE);
    logger.debug(
        "[CitiesContextProvider] getAllCities dispatching loadCities  ",
        cities
    );
  }

  useEffect(() => {
    getAllCitiesFromBE();
  }, []);

  return (
      <citiesContext.Provider value={districts}>
        {props.children}
      </citiesContext.Provider>
  );
};

export default CitiesContextProvider;
