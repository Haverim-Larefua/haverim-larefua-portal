import { ADD_USER, ADD_USERS, EDIT_USER, REMOVE_USER, LOAD_USERS, UPDATE_USERS_AREAS, 
    IActionBase, addUser, addUsers, editUser, loadUsers, removeUser } from "../contexts/actions/users.action";
import { UserExtendedData, defaultUserExtendedData} from "../contexts/interfaces/users.interface";
import { UserUtil } from "../Utils/User/UserUtil";

export const userReducer = ( state: UserExtendedData = defaultUserExtendedData, action: IActionBase) => {
  switch (action.type) {
    case LOAD_USERS: {
      return { users: action.users, action: loadUsers([]), deliveryAreas: state.deliveryAreas };
    }
    case ADD_USER: {
      let tempusers = [...state.users];
      tempusers.push(action.user);
      return { users: tempusers, action: addUser(action.user), deliveryAreas: UserUtil.getUsersAreasDistinct(tempusers) };
    }
    case ADD_USERS: {
      //TODO: maybe we need to merge state with action.users
      return { users: action.users, action: addUsers(action.users), deliveryAreas: UserUtil.getUsersAreasDistinct(action.users) };
    }
    case EDIT_USER: {
      const foundIndex = state.users.findIndex(
        usr => usr.id === action.user.id
      );
      if (foundIndex !== -1) {
        let tempusers = [...state.users];
        tempusers[foundIndex] = action.user;
        return { users: tempusers, action: editUser(action.user), deliveryAreas:  UserUtil.getUsersAreasDistinct(tempusers)};
      } else {
        return state;
      }
    }
    case REMOVE_USER: {
      const tmpusers = state.users.filter(usr => usr.id !== action.userId);
      return { users: tmpusers, action: removeUser(action.userId), deliveryAreas: UserUtil.getUsersAreasDistinct(tmpusers) };
    }
    case UPDATE_USERS_AREAS : {
      return { users: state.users, action: action, deliveryAreas: UserUtil.getUsersAreasDistinct(state.users) };
    }
    default:
      return state;
  }
};
