import React, { createContext, useReducer, useEffect } from "react";
import httpService from "../services/http";
import logger from "../Utils/logger";
import { userReducer } from "../reducers/userReducer";
import { defaultUserExtendedData } from "./interfaces/users.interface";
import { ADD_USER, ADD_USERS, EDIT_USER, REMOVE_USER, LOAD_USERS,
         loadUsers, updateUsersAreas } from "./actions/users.action";
import { UserUtil }  from '../Utils/User/UserUtil';

export const userContext = createContext(defaultUserExtendedData);

const UserContextProvider = props => {
  const [userExtendedData, dispatch] = useReducer(userReducer, defaultUserExtendedData);
  
  // first time call that loads users from db
  // TODO: already done by the parcel object for searching - check how to seperate
  useEffect(() => {
    async function getAllUsersfromDB() {
      logger.log('[UserContextProvider] getAllUsersfromDB ');
      const response = await httpService.getUsers();
      logger.log('[UserContextProvider] getAllUsersfromDB dispatching loadUsers  ', response);
      dispatch(loadUsers(response));
      const areas = UserUtil.getUsersAreasDistinct(response);
      dispatch(updateUsersAreas(areas));
    }
   
    getAllUsersfromDB()
  }, []);

  //on every change to users
  useEffect(() => {
    async function updateUsersInDB() {
      logger.log("[UserContextProvider] updateUsersInDB ", userExtendedData);
      if (!userExtendedData || !userExtendedData.action) {
        logger.log("[UserContextProvider] updateUsersInDB undefined args");
        return;
      }
      switch (userExtendedData.action.type) {
        case ADD_USER: {
          const response = await httpService.createUser( userExtendedData.action.user );
          logger.log("[UserContextProvider] updateUsersInDB ADD_USER", response );
          break;
        }
        case ADD_USERS: {
          const response = await httpService.addUsers( userExtendedData.action.users );
          logger.log( "[UserContextProvider] updateUsersInDB ADD_USER", response);
          break;
        }
        case EDIT_USER: {
          const response = await httpService.updateUser( userExtendedData.action.user );
          logger.log( "[UserContextProvider] updateUsersInDB EDIT_USER", response);
          break;
        }
        case REMOVE_USER: {
          const response = await httpService.deleteUser( userExtendedData.action.userId );
          logger.log( "[UserContextProvider] updateUsersInDB REMOVE_USER",response );
          break;
        }
        case LOAD_USERS:
        default:
          logger.log("[UserContextProvider] updateUsersInDB no action", userExtendedData.action.type );
          break;
      }
    }
    updateUsersInDB();
  }, [userExtendedData]);

  return (
    <userContext.Provider value={[userExtendedData, dispatch]}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
