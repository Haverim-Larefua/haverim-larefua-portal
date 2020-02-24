import React, { createContext, useState, useEffect } from "react";
import httpService from "../services/http";
import logger from "../Utils/logger";
import { citieAndSettlementRecord } from "./interfaces/cities.interface";
import { cityList } from "./Cities";

export const citiesContext = createContext<string[]>([]);

const CitiesContextProvider: React.FC = props => {
  const [cities, setCities] = useState<string[]>([]);

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

  async function getAllCitiesFromGovData() {
    logger.log("[CitiesContextProvider] getAllCities ");
    const response = await httpService.getCities();
    const citiNames = response.result.records.map(
      (item: citieAndSettlementRecord) =>
        '"' + item["שם_ישוב"].trim().replace('"', "") + '"'
    );
    setCities(citiNames);
    writeCities(citiNames);
    logger.debug(
      "[CitiesContextProvider] getAllCities dispatching loadCities  ",
      response
    );
  }

  async function ReadCitiesFromFile() {
    setCities(cityList);
  }

  useEffect(() => {
    // getAllCitiesFromGovData();  // Use this for updating the list from gov data
    ReadCitiesFromFile();
  }, []);

  return (
    <citiesContext.Provider value={cities}>
      {props.children}
    </citiesContext.Provider>
  );
};

export default CitiesContextProvider;
