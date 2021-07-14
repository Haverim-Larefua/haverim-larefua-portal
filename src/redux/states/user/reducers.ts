import produce from "immer";
import SearchUsersParams from "../../../models/SearchUsersParams";
import User from "../../../models/User";
import { CollectionUtil } from "../../../Utils/Common/CollectionsUtil";
import StringUtil from "../../../Utils/Common/StringUtil";
import {
  ADD_USERS_OPTIMISTIC,
  ADD_USER_OPTIMISTIC,
  EDIT_USER_OPTIMISTIC,
  LOAD_USERS_SUCCESS,
  REMOVE_USER_OPTIMISTIC,
  SEARCH_USERS_SUCCESS,
  UserActions,
} from "./types";

export const INITIAL_STATE: UserState = {
  allUsers: [],
  allUsersById: {},
  filteredUsers: [],
  searchParams: { dayFilter: "", cityFilter: [], nameFilter: "" },
  searching: false,
};

export interface UserState {
  allUsers: User[];
  allUsersById: { [id in number]: User };
  filteredUsers: User[];
  searchParams: SearchUsersParams;
  searching: boolean;
}

export const userReducer = (state: UserState = INITIAL_STATE, action: UserActions): UserState =>
  produce(state, (draft: UserState) => {
    switch (action.type) {
      case LOAD_USERS_SUCCESS: {
        const { cityFilter, nameFilter, dayFilter } = state.searchParams;
        if (CollectionUtil.isEmpty(cityFilter) && StringUtil.isEmpty(nameFilter) && StringUtil.isEmpty(dayFilter)) {
          draft.allUsers = action.users;
          draft.allUsersById = CollectionUtil.mapById(action.users);
        }
        draft.filteredUsers = action.users;
        draft.searching = false;
        break;
      }

      case SEARCH_USERS_SUCCESS: {
        draft.searchParams = action.searchParams;
        draft.searching = true;
        break;
      }

      case ADD_USER_OPTIMISTIC: {
        draft.filteredUsers = [...state.filteredUsers, action.user];
        break;
      }

      case ADD_USERS_OPTIMISTIC: {
        draft.filteredUsers = [...state.filteredUsers, ...action.users];
        break;
      }

      case EDIT_USER_OPTIMISTIC: {
        draft.filteredUsers = state.filteredUsers.map((user) => (user.id === action.user.id ? action.user : user));
        break;
      }

      case REMOVE_USER_OPTIMISTIC: {
        draft.filteredUsers = state.filteredUsers.filter((usr) => usr.id !== action.userId);
        break;
      }
    }
  });
