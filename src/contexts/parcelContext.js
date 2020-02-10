import React, { createContext, useReducer, useEffect } from "react";
import httpService from "../services/http";
import logger from "../Utils/logger";
import { parcelReducer } from "../reducers/parcelReducer";
import { ADD_PARCEL, ADD_PARCELS, EDIT_PARCEL, REMOVE_PARCEL, LOAD_PARCELS, ASSIGN_USER_TO_PARCEL,
         loadParcels, updateParcelsCities} from "../contexts/actions/parcels.action";
import { defaultparcelExtendedData } from "./interfaces/parcels.interface";
import { ParcelUtil } from "../Utils/Parcel/ParcelUtil";

export const parcelContext = createContext();

const ParcelContextProvider = props => {
  const [parcelExtendedData, dispatch] = useReducer(parcelReducer, defaultparcelExtendedData);

  async function getAllparcelsfromDB() {
    logger.log('[ParcelContextProvider] getAllparcelsfromDB ',);
    const response = await httpService.getParcels();
    logger.log('[ParcelContextProvider] getAllparcelsfromDB response', response);
    dispatch(loadParcels(response));
    const cities = ParcelUtil.getParcelsCitiesDistinct(response);
    dispatch(updateParcelsCities(cities));
  }

  //first time call that loads parcels from db
  //TODO: already done by the parcel object for searching - check how to seperate
  useEffect(() => { 
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
          const response = await httpService.createParcel( ParcelUtil.prepareParcelForDBUpdate(parcelExtendedData.action.parcel ));
          logger.log( "[ParcelContextProvider] updateParcelsInDB ADD_PARCEL",response );
          const getResponse = await getAllparcelsfromDB();
          logger.log("[ParcelContextProvider] updateParcelsInDB ADD_PARCEL getAllparcelsfromDB", getResponse );
          break;
        }
        case ADD_PARCELS: {
          const response = await httpService.addParcels( ParcelUtil.prepareParcelsForDBUpdate(parcelExtendedData.action.parcels) );
          logger.log("[ParcelContextProvider] updateParcelsInDB ADD_PARCELS", response );
          //TODO when addParcels will be batch operation - can retrieve the result and merge with current instead of retrieving all again
          const getResponse = await getAllparcelsfromDB();
          logger.log("[ParcelContextProvider] updateParcelsInDB ADD_PARCELS getAllparcelsfromDB", getResponse );
          break;
        }
        case EDIT_PARCEL: {
          const response = await httpService.updateParcel( ParcelUtil.prepareParcelForDBUpdate(parcelExtendedData.action.parcel));
          logger.log( "[ParcelContextProvider] updateParcelsInDB EDIT_PARCEL", response );
          break;
        }
        case REMOVE_PARCEL: {
          const response = await httpService.deletParcel( parcelExtendedData.action.parcelId );
          logger.log( "[ParcelContextProvider] updateParcelsInDB REMOVE_PARCEL", response );
          break;
        }
        case ASSIGN_USER_TO_PARCEL: {
          const response =  await httpService.assignUserToParcel(
            parcelExtendedData.action.parcel.currentUserId, 
            parcelExtendedData.action.parcel.id);
          logger.log( "[ParcelContextProvider] updateParcelsInDB ASSIGN_USER_TO_PARCEL", response );
          break;
        }
        case LOAD_PARCELS:
        default:
          logger.log( "[ParcelContextProvider] updateParcelsInDB LOAD_PARCELS etc. no action", parcelExtendedData.action.type );
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
