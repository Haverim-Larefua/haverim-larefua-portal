import React, { createContext, useReducer, useEffect } from 'react';
import userHttpService from '../services/userHttp.service';
import { userReducer } from '../reducers/userReducer';
import { defaultUserExplained } from './interfaces/users.interface';
import { ADD_USER, ADD_USERS,
  EDIT_USER, REMOVE_USER, LOAD_USERS, loadUsers} from '../contexts/actions/users.action';

export const userContext = createContext();

const UserContextProvider = (props) => {
  const [userExplained, dispatch] = useReducer(userReducer, defaultUserExplained);

  const getAllUsersfromDB = async () => {
    console.log('[UserContextProvider] getAllUsersfromDB ');
    const response = await userHttpService.getUsers();
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
        const response = await userHttpService.createUser(userExplained.action.user)
        console.log('[UserContextProvider] updateUsersInDB ADD_USER', response);
        break;
      }
      case ADD_USERS: {
        const response = await userHttpService.addUsers(userExplained.action.users)
        console.log('[UserContextProvider] updateUsersInDB ADD_USER', response);
        break;
      }
      case EDIT_USER: {
        const response = await userHttpService.updateUser(userExplained.action.user);
        console.log('[UserContextProvider] updateUsersInDB EDIT_USER', response);
        break;
      }
      case REMOVE_USER: {
        const response = await userHttpService.deleteUser(userExplained.action.userId);
        console.log('[UserContextProvider] updateUsersInDB REMOVE_USER', response);
        break;
      }
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