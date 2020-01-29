import React, { createContext, useReducer, useEffect } from 'react';
import httpService from '../services/http';
import { userReducer } from '../reducers/userReducer';
import { loadUsers } from './actions/users.action';

export const userContext = createContext([[], function(){}]);

const UserContextProvider = (props) => {
  const [users, dispatch] = useReducer(userReducer, []);

  const getAllUsersfromDB = async () => {
    console.log('[UserContextProvider] getAllUsersfromDB ');
    const response = await httpService.getUsers();
    console.log('[UserContextProvider] getAllUsersfromDB dispatching loadUsers  ', response);
    dispatch(loadUsers(response));
  }

  const updateAllUsersInDB = async () => {
      console.log('[UserContextProvider] updateAllUsersInDB ', users);
    //  await httpService.createUsers(users);
  }

  //first time call
  useEffect(() => { getAllUsersfromDB()}, []);

  //on every change to users
  useEffect(() => { updateAllUsersInDB() }, [users]);
  
  return (
    <userContext.Provider value={[ users, dispatch ]}>
      {props.children}
    </userContext.Provider>
  );
}
 
export default UserContextProvider;