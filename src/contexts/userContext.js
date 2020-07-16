import React, { createContext, useReducer, useEffect, useState } from "react";
import httpService from "../services/http";
import logger from "../Utils/logger";
import { userReducer } from "../reducers/userReducer";
import { defaultUserExtendedData } from "./interfaces/users.interface";
import { ADD_USER, ADD_USERS, EDIT_USER, REMOVE_USER, LOAD_USERS, SEARCH_USERS, UPDATE_USERS_AREAS, 
         loadUsers, updateUsersAreas } from "./actions/users.action";
// import { UserUtil }  from '../Utils/User/UserUtil';
export const userContext = createContext(defaultUserExtendedData);

const UserContextProvider = props => {
  const [userExtendedData, dispatch] = useReducer(userReducer, defaultUserExtendedData);
  const [searching, setSearching] = useState(false);
  const [refreshTime, setRefreshTime] = useState(0);

  
  async function getAllUsersfromDB() {
    logger.log('[UserContextProvider] getAllUsersfromDB ');
    if (searching) {
      return;
    }
    setSearching(true);
    const response = await httpService.searchUsers(
      userExtendedData.searchParams.dayFilter,
      userExtendedData.searchParams.cityFilter,
      userExtendedData.searchParams.nameFilter );
    logger.log('[UserContextProvider] getAllUsersfromDB dispatching loadUsers  #', response.length);
    dispatch(loadUsers(response));

    // need to look for all areas from all users, not only from the search
    const areas = (await httpService.getUsersAreasDistinct()).sort();
    logger.log('[UserContextProvider] getAllUsersfromDB dispatching updateUsersAreas  #', areas.length);
    dispatch(updateUsersAreas(areas));
    
    setSearching(false);
    setRefreshTime(refreshTime + 1);
  }

  // first time call that loads users from db (component did mount)
  useEffect(() => {
    getAllUsersfromDB();
  }, []);

  useEffect(() => {
    const timer = setTimeout(getAllUsersfromDB, 30000);
    return () => { clearTimeout(timer)}; // component did unnmount
  }, [refreshTime]);


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
          const getResponse = await getAllUsersfromDB();
          logger.log("[UserContextProvider] updateUsersInDB ADD_USER getAllUsersfromDB", getResponse );
          break;
        }
        case ADD_USERS: {
          const response = await httpService.addUsers( userExtendedData.action.users );
          logger.log( "[UserContextProvider] updateUsersInDB ADD_USERS", response);
          const getResponse = await getAllUsersfromDB();
          logger.log("[UserContextProvider] updateUsersInDB ADD_USERS getAllUsersfromDB", getResponse );
          break;
        }
        case EDIT_USER: {
          const response = await httpService.updateUser( userExtendedData.action.user );
          logger.log( "[UserContextProvider] updateUsersInDB EDIT_USER", response);
          const getResponse = await getAllUsersfromDB();
          logger.log("[UserContextProvider] updateUsersInDB EDIT_USER getAllUsersfromDB", getResponse );
          break;
        }
        case REMOVE_USER: {
          const response = await httpService.deleteUser( userExtendedData.action.userId );
          logger.log( "[UserContextProvider] updateUsersInDB REMOVE_USER",response );
          const getResponse = await getAllUsersfromDB();
          logger.log("[UserContextProvider] updateUsersInDB REMOVE_USER getAllUsersfromDB", getResponse );
          break;
        }
        case SEARCH_USERS:  {
          const getResponse = await getAllUsersfromDB();
          logger.log("[UserContextProvider] updateUsersInDB SEARCH_USERS getAllUsersfromDB", getResponse );
          break;
        }
        case UPDATE_USERS_AREAS:
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
