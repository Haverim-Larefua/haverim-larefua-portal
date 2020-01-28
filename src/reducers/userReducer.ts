import { ADD_USER, ADD_USERS, EDIT_USER, REMOVE_USER, LOAD_USERS, IActionBase } from '../contexts/actions/users.action';
import User from '../contexts/interfaces/parcels.interface';


export const userReducer = (state: User[] = [], action: IActionBase) => {
  
  switch (action.type) {
    case LOAD_USERS: {
      return { ...state, users: action.users };
    }
    case ADD_USER: {
      let tempusers = state;
      tempusers.push(action.user);
      return {...state, users: tempusers};
    }
    case ADD_USERS: {
      //TODO: maybe we need to merge state with action.users
      return {users: action.users};
    }
    case EDIT_USER: {
      const foundIndex = state.findIndex(usr => usr.id === action.user.id);
      if (foundIndex !== -1) {
        let tempusers = state;
        tempusers[foundIndex] = action.user;
        return { ...state, users: tempusers};
      } else {
        return state;
      }
    }
    case REMOVE_USER: {
      return state.filter(usr => usr.id !== action.id);
    }
    default:
      return state;
  }
} 


