import {
  ADD_USER, ADD_USERS, EDIT_USER, REMOVE_USER, LOAD_USERS, SEARCH_USERS, UPDATE_USERS_AREAS,
  IActionBase, addUser, addUsers, editUser, loadUsers, removeUser
} from "../contexts/actions/users.action";
import { UserState, defaultUserState } from "../contexts/interfaces/users.interface";
import { UserUtil } from "../Utils/User/UserUtil";
import logger from "../Utils/logger";

export const userReducer = (state: UserState = defaultUserState, action: IActionBase) => {
  logger.log('[userReducer] reduce with', action.type);
  switch (action.type) {
    case LOAD_USERS: {
      logger.log('[userReducer] reduce LOAD_USERS #', action.users?.length);
      return { users: action.users, action: loadUsers([]), searchParams: state.searchParams, deliveryAreas: state.deliveryAreas };
    }
    case SEARCH_USERS: {
      logger.log('[userReducer] reduce SEARCH_USERS #', state.users?.length, action.searchParams);
      return { users: state.users, action: action, searchParams: action.searchParams, deliveryAreas: state.deliveryAreas };
    }
    case ADD_USER: {
      let tempusers = [...state.users];
      tempusers.push(action.user);
      return { users: tempusers, action: addUser(action.user), searchParams: state.searchParams, deliveryAreas: UserUtil.getUsersAreasDistinct(tempusers) };
    }
    case ADD_USERS: {
      //TODO: maybe we need to merge state with action.users
      return { users: action.users, action: addUsers(action.users), searchParams: state.searchParams, deliveryAreas: UserUtil.getUsersAreasDistinct(action.users) };
    }
    case EDIT_USER: {
      const foundIndex = state.users.findIndex(
        usr => usr.id === action.user.id
      );
      if (foundIndex !== -1) {
        let tempusers = [...state.users];
        tempusers[foundIndex] = action.user;
        return { users: tempusers, action: editUser(action.user), searchParams: state.searchParams, deliveryAreas: UserUtil.getUsersAreasDistinct(tempusers) };
      } else {
        return state;
      }
    }
    case REMOVE_USER: {
      const tmpusers = state.users.filter(usr => usr.id !== action.userId);
      return { users: tmpusers, action: removeUser(action.userId), searchParams: state.searchParams, deliveryAreas: UserUtil.getUsersAreasDistinct(tmpusers) };
    }
    case UPDATE_USERS_AREAS: {
      return { users: state.users, action: action, searchParams: state.searchParams, deliveryAreas: action.areas };
    }
    default:
      return state;
  }
};
