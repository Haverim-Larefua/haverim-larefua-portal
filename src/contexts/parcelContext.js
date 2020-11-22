import React, { createContext, useReducer, useEffect } from "react";
import httpService from "../services/http";
import logger from "../Utils/logger";
import { parcelReducer } from "../reducers/parcelReducer";
import { errorReducer } from "../reducers/errorReducer";
import {
  ADD_PARCEL, ADD_PARCELS, EDIT_PARCEL, REMOVE_PARCEL, LOAD_PARCELS,
  SEARCH_PARCELS, ASSIGN_USER_TO_PARCELS, UPDATE_PARCEL_CITIES, PARCELS_ERROR,
  loadParcels, updateParcelsCities, parcelsError
} from "../contexts/actions/parcels.action";
import { defaultParcelsState } from "./interfaces/parcels.interface";
import { ParcelUtil } from "../Utils/Parcel/ParcelUtil";
import { addError } from "../contexts/actions/error.action";
import { SystemError } from "../contexts/interfaces/error.interface";
import { useToasts } from "react-toast-notifications";

export const parcelContext = createContext();
async function getAllparcelsfromDB(searchParams, dispatch) {
  logger.log('[ParcelContextProvider] getAllparcelsfromDB ');

  try {
    const [parcels, cityOptions] =
      await Promise.all([httpService.getParcels(
        searchParams.statusFilter,
        searchParams.cityFilter,
        searchParams.nameFilter),
      httpService.getParcelsCityOptions()]);
    dispatch(loadParcels(parcels));
    dispatch(updateParcelsCities(cityOptions));

  } catch (e) {
    logger.log(e);
    dispatch(parcelsError(e));
  }
};

const ParcelContextProvider = props => {
  const { addToast } = useToasts();

  const [, dispatchError] = useReducer(errorReducer);
  const [parcelState, dispatch] = useReducer(parcelReducer, defaultParcelsState);
  //on every change to parcels
  useEffect(() => {
    async function updateParcelsInDB() {
      logger.log("[ParcelContextProvider] updateParcelsInDB ", parcelState);
      if (!parcelState || !parcelState.action) {
        logger.log("[ParcelContextProvider] updateParcelsInDB undefined args");
        return;
      }
      switch (parcelState.action.type) {
        case ADD_PARCEL: {
          const response = await httpService.createParcel(ParcelUtil.prepareParcelForDBUpdate(parcelState.action.parcel));
          logger.log("[ParcelContextProvider] updateParcelsInDB ADD_PARCEL ", response);
          const getResponse = await getAllparcelsfromDB(parcelState.searchParams, dispatch);
          logger.log("[ParcelContextProvider] updateParcelsInDB ADD_PARCEL getAllparcelsfromDB", getResponse);
          break;
        }
        case ADD_PARCELS: {
          const response = await httpService.addParcels(ParcelUtil.prepareParcelsForDBUpdate(parcelState.action.parcels));
          logger.log("[ParcelContextProvider] updateParcelsInDB ADD_PARCELS ", response);
          if (parcelState.action.parcels.length === 0) {
            const message = `כל החבילות מופיעות במערכת - אין חבילות חדשות בקובץ`;
            addToast(message, { appearance: "success" });
            return;
          }

          try {
            const response = await httpService.addParcels(
              ParcelUtil.prepareParcelsForDBUpdate(
                parcelState.action.parcels
              )
            );

            const message = `חבילות נוספו ${response.length} ,הקובץ נטען בהצלחה`;
            addToast(message, { appearance: "success" });
          } catch (ex) {
            logger.error(ex.message);
            const message = `טעינת הקובץ נכשלה - פנה למנהל המערכת`;
            addToast(message, { appearance: "error" });
          }
          //TODO when addParcels will be batch operation - can retrieve the result and merge with current instead of retrieving all again
          const getResponse = await getAllparcelsfromDB(parcelState.searchParams, dispatch);
          logger.log("[ParcelContextProvider] updateParcelsInDB ADD_PARCELS getAllparcelsfromDB", getResponse);
          break;
        }
        case EDIT_PARCEL: {
          const response = await httpService.updateParcel(ParcelUtil.prepareParcelForDBUpdate(parcelState.action.parcel));
          logger.log("[ParcelContextProvider] updateParcelsInDB EDIT_PARCEL", response);
          const getResponse = await getAllparcelsfromDB(parcelState.searchParams, dispatch);
          logger.log("[ParcelContextProvider] updateParcelsInDB EDIT_PARCEL getAllparcelsfromDB", getResponse);
          break;
        }
        case REMOVE_PARCEL: {
          try {
            const response = await httpService.deleteParcel(parcelState.action.parcelId);
            logger.log("[ParcelContextProvider] updateParcelsInDB REMOVE_PARCEL", response);
          } catch (e) {
            logger.log(e);
            const err = new SystemError('Error deleting parcel', 1, e.message);
            dispatchError(addError(err));
          }
          const getResponse = await getAllparcelsfromDB(parcelState.searchParams, dispatch);
          logger.log("[ParcelContextProvider] updateParcelsInDB REMOVE_PARCEL getAllparcelsfromDB", getResponse);
          break;
        }
        case ASSIGN_USER_TO_PARCELS: {
          const parcelIds = parcelState.action.parcels.map(parcel => parcel.id);
          const response = await httpService.assignUserToParcels(parcelState.action.parcels[0].currentUserId, parcelIds);
          logger.log("[ParcelContextProvider] updateParcelsInDB ASSIGN_USER_TO_PARCELS", response);
          break;
        }
        case SEARCH_PARCELS: {
          const getResponse = await getAllparcelsfromDB(parcelState.searchParams, dispatch);
          logger.log("[UserContextProvider] updateParcelsInDB SEARCH_PARCELS getAllparcelsfromDB", getResponse);
          break;
        }
        case UPDATE_PARCEL_CITIES:
        case LOAD_PARCELS:
        case PARCELS_ERROR:
        default:
          logger.log("[ParcelContextProvider] updateParcelsInDB LOAD, UPDATE_CITIES - no action", parcelState.action.type);
          break;
      }
    }
    updateParcelsInDB();
  }, [addToast, parcelState]);

  return (<parcelContext.Provider value={[parcelState, dispatch]}>
    {props.children}
  </parcelContext.Provider>
  );
}

export default ParcelContextProvider;
