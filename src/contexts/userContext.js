import React, { createContext, useReducer, useEffect } from 'react';
import httpService from '../services/http';
import { userReducer } from '../reducers/userReducer';
import { defaultUserExplained } from './interfaces/users.interface';
import { NO_CHANGE_USER, ADD_USER, ADD_USERS,
  EDIT_USER, REMOVE_USER, LOAD_USERS, loadUsers} from '../contexts/actions/users.action';

export const userContext = createContext();

const UserContextProvider = (props) => {
  const [userExplained, dispatch] = useReducer(userReducer, defaultUserExplained);

  const getAllUsersfromDB = async () => {
    console.log('[UserContextProvider] getAllUsersfromDB ');
    const response = await httpService.getUsers();
    console.log('[UserContextProvider] getAllUsersfromDB dispatching loadUsers  ', response);
    dispatch(loadUsers(response));
  }

  const updateUsersInDB = async () => {
    console.log('[UserContextProvider] updateUsersInDB ', userExplained);
    if (!userExplained || !userExplained.action) {
      console.log('[UserContextProvider] updateUsersInDB undefined args');
      return;
    }
    switch (userExplained.action.type) {
      
      case ADD_USER: {
        const response = await httpService.createUser(userExplained.action.user)
        console.log('[UserContextProvider] updateUsersInDB ADD_USER', response);
        break;
      }
      case ADD_USERS: {
        const response = await httpService.addUsers(userExplained.action.users)
        console.log('[UserContextProvider] updateUsersInDB ADD_USER', response);
        break;
      }
      case EDIT_USER: {
        const response = await httpService.updateUser(userExplained.action.user);
        console.log('[UserContextProvider] updateUsersInDB EDIT_USER', response);
        break;
      }
      case REMOVE_USER: {
        const response = await httpService.deleteUser(userExplained.action.userId);
        console.log('[UserContextProvider] updateUsersInDB REMOVE_USER', response);
        break;
      }
      case NO_CHANGE_USER:
      case LOAD_USERS: 
      default:
        console.log('[UserContextProvider] updateUsersInDB no action', userExplained.action.type);
        break;
    } 
  }

  //first time call
  useEffect(() => { getAllUsersfromDB()}, []);

  //on every change to users
  useEffect(() => { updateUsersInDB() }, [userExplained]);
  
  return (
    <userContext.Provider value={[ userExplained, dispatch ]}>
      {props.children}
    </userContext.Provider>
  );
}
 
export default UserContextProvider;