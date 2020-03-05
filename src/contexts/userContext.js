import React, { createContext, useReducer, useEffect } from "react";
import httpService from "../services/http";
import logger from "../Utils/logger";
import { userReducer } from "../reducers/userReducer";
import { defaultUserExtendedData } from "./interfaces/users.interface";
import { ADD_USER, ADD_USERS, EDIT_USER, REMOVE_USER, LOAD_USERS, SEARCH_USERS,
         loadUsers, updateUsersAreas } from "./actions/users.action";
import { UserUtil }  from '../Utils/User/UserUtil';
export const userContext = createContext(defaultUserExtendedData);

const UserContextProvider = props => {
  const [userExtendedData, dispatch] = useReducer(userReducer, defaultUserExtendedData);
  
  async function getAllUsersfromDB() {
    logger.log('[UserContextProvider] getAllUsersfromDB ');
    const response = await httpService.searchUsers(
      userExtendedData.searchParams.dayFilter,
      userExtendedData.searchParams.cityFilter,
      userExtendedData.searchParams.nameFilter );
    // const response = await httpService.getUsers();
    logger.log('[UserContextProvider] getAllUsersfromDB dispatching loadUsers  #', response.length);
    dispatch(loadUsers(response));

    // need to look for all areas from all users, not only from the search
    const areas = httpService.getUsersAreasDistinct();
    logger.log('[UserContextProvider] getAllUsersfromDB dispatching updateUsersAreas  #', areas.length);
    dispatch(updateUsersAreas(areas));
  }

  // first time call that loads users from db
  useEffect(() => {
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
        case SEARCH_USERS: 
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
