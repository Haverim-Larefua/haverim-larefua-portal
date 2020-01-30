import { ADD_USER, ADD_USERS, EDIT_USER, REMOVE_USER, LOAD_USERS, 
  IActionBase, 
  noChangeToUser, SET_USERS, addUser, addUsers, editUser } from '../contexts/actions/users.action';
import { UserExplained, defaultUserExplained } from '../contexts/interfaces/users.interface';
import { removeParcel } from '../contexts/actions/parcels.action';


export const userReducer = (state: UserExplained = defaultUserExplained, action: IActionBase) => {
  
  switch (action.type) {
    case SET_USERS: {
      return {users: action.users, action: noChangeToUser('')} ;
    }
    case LOAD_USERS: {
      return {users: action.users, action: noChangeToUser('')} ;
    }
    case ADD_USER: {
      let tempusers = [...state.users];
      tempusers.push(action.user);
      return {users: tempusers, action: addUser(action.user)};
    }
    case ADD_USERS: {
      //TODO: maybe we need to merge state with action.users
      return {users: action.users, action: addUsers(action.users)};
    }
    case EDIT_USER: {
      const foundIndex = state.users.findIndex(usr => usr.id === action.user.id);
      if (foundIndex !== -1) {
        let tempusers = [...state.users];
        tempusers[foundIndex] = action.user;
        return {users: tempusers, action: editUser(action.user)};
      } else {
        return state;
      }
    }
    case REMOVE_USER: {
      const tmpusers = state.users.filter(usr => usr.id !== action.userId);
      return {parcels: tmpusers, action: removeParcel(action.userId)};
   
    }
    default:
      return state;
  }
} 


