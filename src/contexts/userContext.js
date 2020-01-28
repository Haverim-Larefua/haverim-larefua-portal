import React, { createContext, useReducer, useEffect } from 'react';
import httpService from '../services/http';
import { userReducer } from '../reducers/userReducer';
import { loadUsers } from './actions/users.action';

export const userContext = createContext();

const UserContextProvider = (props) => {
  const [users, dispatch] = useReducer(userReducer, []);

  const getAllUsersfromDB = async () => {
    const response = await httpService.getUsers();
    dispatch(loadUsers(response));
  }

  const updateAllUsersInDB = async () => {
      console.log('[UserContextProvider] updateAllUsersInDB ', users);
    //  await httpService.createUsers(users);
  }

  useEffect(() => { getAllUsersfromDB()}, []);

  useEffect(() => { updateAllUsersInDB() }, [users]);
  
  return (
    <userContext.Provider value={{ users, dispatch }}>
      {props.children}
    </userContext.Provider>
  );
}
 
export default UserContextProvider;