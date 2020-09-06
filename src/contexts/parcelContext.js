import React, { createContext, useReducer, useEffect, useState} from "react";
import httpService from "../services/http";
import logger from "../Utils/logger";
import { parcelReducer } from "../reducers/parcelReducer";
import { errorReducer } from "../reducers/errorReducer";
import { ADD_PARCEL, ADD_PARCELS, EDIT_PARCEL, REMOVE_PARCEL, LOAD_PARCELS, 
         SEARCH_PARCELS, ASSIGN_USER_TO_PARCELS, UPDATE_PARCEL_CITIES,
         loadParcels, updateParcelsCities, parcelsError} from "../contexts/actions/parcels.action";
import { defaultparcelExtendedData } from "./interfaces/parcels.interface";
import { ParcelUtil } from "../Utils/Parcel/ParcelUtil";
import { addError } from "../contexts/actions/error.action";
import { SystemError } from "../contexts/interfaces/error.interface";


export const parcelContext = createContext(defaultparcelExtendedData);

const ParcelContextProvider = props => {
  const [parcelExtendedData, dispatch] = useReducer(parcelReducer, defaultparcelExtendedData);
  const [refreshTime, setRefreshTime] = useState(0);
  const [searching, setSearching] = useState(false);
  const [, dispatchError] = useReducer(errorReducer);
  
  async function getAllparcelsfromDB() {
    logger.log('[ParcelContextProvider] getAllparcelsfromDB ',);
    if (searching) {
      return;
    }
    setSearching(true);

    try {
      const response = await httpService.searchParcels(
        parcelExtendedData.searchParams.statusFilter,
        parcelExtendedData.searchParams.cityFilter,
        parcelExtendedData.searchParams.nameFilter );
      logger.log('[ParcelContextProvider] getAllparcelsfromDB response', response);
      dispatch(loadParcels(response));
  
      //need to query all parcels not only the search !
      const cities = (await httpService.getParcelsCitiesDistinct()).sort();
      dispatch(updateParcelsCities(cities));
  
      setSearching(false);
      setRefreshTime(refreshTime + 1);
    } catch(e) {
      logger.log(e);
      dispatch(parcelsError(e));
    }
  }

  //first time call that loads parcels from db
  useEffect(() => {
    getAllparcelsfromDB()
  }, []);

  useEffect(() => {
    const timer = setTimeout(getAllparcelsfromDB, 30000);
    return () => { clearTimeout(timer)};
  }, [refreshTime]);

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
          logger.log( "[ParcelContextProvider] updateParcelsInDB ADD_PARCEL ", response);
          const getResponse = await getAllparcelsfromDB();
          logger.log("[ParcelContextProvider] updateParcelsInDB ADD_PARCEL getAllparcelsfromDB", getResponse );
          break;
        }
        case ADD_PARCELS: {
          const response = await httpService.addParcels( ParcelUtil.prepareParcelsForDBUpdate(parcelExtendedData.action.parcels) );
          logger.log("[ParcelContextProvider] updateParcelsInDB ADD_PARCELS ", response); 
          //TODO when addParcels will be batch operation - can retrieve the result and merge with current instead of retrieving all again
          const getResponse = await getAllparcelsfromDB();
          logger.log("[ParcelContextProvider] updateParcelsInDB ADD_PARCELS getAllparcelsfromDB", getResponse );
          break;
        }
        case EDIT_PARCEL: {
          const response = await httpService.updateParcel( ParcelUtil.prepareParcelForDBUpdate(parcelExtendedData.action.parcel));
          logger.log( "[ParcelContextProvider] updateParcelsInDB EDIT_PARCEL", response );
          const getResponse = await getAllparcelsfromDB();
          logger.log("[ParcelContextProvider] updateParcelsInDB EDIT_PARCEL getAllparcelsfromDB", getResponse );
          break;
        }
        case REMOVE_PARCEL: {
          try {
            const response = await httpService.deleteParcel( parcelExtendedData.action.parcelId );
            logger.log( "[ParcelContextProvider] updateParcelsInDB REMOVE_PARCEL", response );
          } catch (e) {
            logger.log(e);
            const err = new SystemError('Error deleting parcel' , 1, e.message);
            dispatchError(addError(err));
          }
          const getResponse = await getAllparcelsfromDB();
          logger.log("[ParcelContextProvider] updateParcelsInDB REMOVE_PARCEL getAllparcelsfromDB", getResponse );
          break;
        }
        case ASSIGN_USER_TO_PARCELS: {
          const parcelIds = parcelExtendedData.action.parcels.map(parcel => parcel.id);
          const response =  await httpService.assignUserToParcels(parcelExtendedData.action.parcels[0].currentUserId, parcelIds);
          logger.log( "[ParcelContextProvider] updateParcelsInDB ASSIGN_USER_TO_PARCELS", response );
          break;
        }
        case SEARCH_PARCELS:  {
          const getResponse = await getAllparcelsfromDB();
          logger.log("[UserContextProvider] updateParcelsInDB SEARCH_PARCELS getAllparcelsfromDB", getResponse );
          break;
        }
        case UPDATE_PARCEL_CITIES:
        case LOAD_PARCELS:
        default:
          logger.log( "[ParcelContextProvider] updateParcelsInDB LOAD, UPDATE_CITIES - no action", parcelExtendedData.action.type );
          break;
      }
    }
    updateParcelsInDB();
  }, [parcelExtendedData]);

  return (
    <parcelContext.Provider value={[parcelExtendedData, dispatch]}>
      {props.children}
    </parcelContext.Provider>
  );
};

export default ParcelContextProvider;
