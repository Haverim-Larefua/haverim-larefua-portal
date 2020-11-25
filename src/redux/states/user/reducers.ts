import produce from "immer";
import SerachUsersParams from "../../../models/SerachUsersParams";
import User from "../../../models/User";
import { UserUtil } from "../../../Utils/User/UserUtil";
import {
  ADD_USERS_OPTIMISTIC,
  ADD_USER_OPTIMISTIC,
  EDIT_USER_OPTIMISTIC,
  LOAD_USERS_SUCCESS,
  REMOVE_USER_OPTIMISTIC,
  SEARCH_USERS_SUCCESS,
  UPDATE_USERS_AREAS_SUCCESS,
  UserActions,
} from "./types";

export const INITIAL_STATE: UserState = {
  users: [],
  searchParams: { dayFilter: "", cityFilter: "", nameFilter: "" },
  deliveryAreas: [],
  searching: false,
};

export interface UserState {
  users: User[];
  searchParams: SerachUsersParams;
  deliveryAreas: string[];
  searching: boolean;
}

export const userReducer = (state: UserState = INITIAL_STATE, action: UserActions): UserState =>
  produce(state, (draft: UserState) => {
    switch (action.type) {
      case LOAD_USERS_SUCCESS: {
        draft.users = action.users;
        draft.searching = false;
        break;
      }

      case SEARCH_USERS_SUCCESS: {
        draft.searchParams = action.searchParams;
        draft.searching = true;
        break;
      }

      case ADD_USER_OPTIMISTIC: {
        draft.users = [...state.users, action.user];
        draft.deliveryAreas = UserUtil.getUsersAreasDistinct(draft.users);
        break;
      }

      case ADD_USERS_OPTIMISTIC: {
        draft.users = [...state.users, ...action.users];
        draft.deliveryAreas = UserUtil.getUsersAreasDistinct(draft.users);
        break;
      }

      case EDIT_USER_OPTIMISTIC: {
        draft.users = state.users.map((user) => (user.id === action.user.id ? action.user : user));
        draft.deliveryAreas = UserUtil.getUsersAreasDistinct(draft.users);
        break;
      }

      case REMOVE_USER_OPTIMISTIC: {
        draft.users = state.users.filter((usr) => usr.id !== action.userId);
        draft.deliveryAreas = UserUtil.getUsersAreasDistinct(draft.users);
        break;
      }
      case UPDATE_USERS_AREAS_SUCCESS: {
        draft.deliveryAreas = action.areas;
        break;
      }
    }
  });
