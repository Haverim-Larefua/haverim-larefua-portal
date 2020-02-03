import React, { createContext, useReducer, useEffect } from "react";
import httpService from "../services/http";
import logger from "../Utils/logger";
import { parcelReducer } from "../reducers/parcelReducer";
import { ADD_PARCEL, ADD_PARCELS, EDIT_PARCEL, REMOVE_PARCEL, LOAD_PARCELS, 
         loadParcels, updateParcelsCities} from "../contexts/actions/parcels.action";
import { defaultparcelExtendedData } from "./interfaces/parcels.interface";
import { ParcelUtil } from "../Utils/Parcel/ParcelUtil";

export const parcelContext = createContext();

const ParcelContextProvider = props => {
  const [parcelExtendedData, dispatch] = useReducer(parcelReducer, defaultparcelExtendedData);

  //first time call that loads parcels from db
  // TODO: already done by the parcel object for searching - check how to seperate
  useEffect(() => { 
    async function getAllparcelsfromDB() {
      logger.log('[ParcelContextProvider] getAllparcelsfromDB ');
      const response = await httpService.getParcels();
      const dispParcels = ParcelUtil.createParcelsDisplay(response);
      logger.log('[ParcelContextProvider] getAllparcelsfromDB dispatching loadParcels  ', response);
      dispatch(loadParcels(dispParcels));
      const cities = ParcelUtil.getParcelsCitiesDistinct(dispParcels);
      dispatch(updateParcelsCities(cities));
    }
    getAllparcelsfromDB()
  }, []);

  //on every change to parcels
  useEffect(() => {
    async function updateParcelsInDB() {
      logger.log("[ParcelContextProvider] updateParcelsInDB ",  parcelExtendedData );
      if (!parcelExtendedData || !parcelExtendedData.action) {
        logger.log("[ParcelContextProvider] updateParcelsInDB undefined args");
        return;
      }
      switch (parcelExtendedData.action.type) {
        case ADD_PARCEL: {
          const response = await httpService.createParcel( parcelExtendedData.action.parcel );
          logger.log( "[ParcelContextProvider] updateParcelsInDB ADD_PARCEL",response );
          break;
        }
        case ADD_PARCELS: {
          const response = await httpService.addParcels( parcelExtendedData.action.parcels );
          logger.log("[ParcelContextProvider] updateParcelsInDB ADD_PARCELS", response );
          break;
        }
        case EDIT_PARCEL: {
          const response = await httpService.updateParcel( parcelExtendedData.action.parcel);
          logger.log( "[ParcelContextProvider] updateParcelsInDB EDIT_PARCEL", response );
          break;
        }
        case REMOVE_PARCEL: {
          const response = await httpService.deletParcel( parcelExtendedData.action.parcelId );
          logger.log( "[ParcelContextProvider] updateParcelsInDB REMOVE_PARCEL", response );
          break;
        }
        case LOAD_PARCELS:
        default:
          logger.log( "[ParcelContextProvider] updateParcelsInDB no action", parcelExtendedData.action.type );
          break;
      }
    }
    updateParcelsInDB();
  }, [parcelExtendedData.parcels]);

  return (
    <parcelContext.Provider value={[parcelExtendedData, dispatch]}>
      {props.children}
    </parcelContext.Provider>
  );
};

export default ParcelContextProvider;
