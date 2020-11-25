import { toastr } from "react-redux-toastr";
import { Dispatch } from "redux";
import SerachUsersParams from "../../../models/SerachUsersParams";
import User from "../../../models/User";
import httpService from "../../../services/http";
import logger from "../../../Utils/logger";
import { AppState } from "../../rootReducer";
import {
  LoadUsersSuccessAction,
  LOAD_USERS_SUCCESS,
  SearchUsersSuccessAction,
  SEARCH_USERS_SUCCESS,
  AddUserOptimisticAction,
  ADD_USER_OPTIMISTIC,
  AddUsersOptimisticAction,
  ADD_USERS_OPTIMISTIC,
  EditUserOptimisticAction,
  UpdateUsersAreaSuccessAction,
  UPDATE_USERS_AREAS_SUCCESS,
  RemoveUserOptimisticAction,
  EDIT_USER_OPTIMISTIC,
  REMOVE_USER_OPTIMISTIC,
} from "./types";

export function loadUsersSuccess(users: User[]): LoadUsersSuccessAction {
  return { type: LOAD_USERS_SUCCESS, users };
}

export function searchUsersSuccess(searchParams: SerachUsersParams): SearchUsersSuccessAction {
  return { type: SEARCH_USERS_SUCCESS, searchParams };
}

export function addUserOptimistic(user: User): AddUserOptimisticAction {
  return { type: ADD_USER_OPTIMISTIC, user };
}

export function addUsersOptimistic(users: User[]): AddUsersOptimisticAction {
  return { type: ADD_USERS_OPTIMISTIC, users };
}

export function editUserOptimistic(user: User): EditUserOptimisticAction {
  return { type: EDIT_USER_OPTIMISTIC, user };
}

export function removeUserOptimistic(userId: number): RemoveUserOptimisticAction {
  return { type: REMOVE_USER_OPTIMISTIC, userId };
}

export function updateUsersAreasSuccess(areas: string[]): UpdateUsersAreaSuccessAction {
  return { type: UPDATE_USERS_AREAS_SUCCESS, areas };
}

/////Redxu Thunk Actions/////

export function searchUsers(searchParams: SerachUsersParams) {
  return async (dispatch: Dispatch) => {
    dispatch(searchUsersSuccess(searchParams));
    await loadUsers(searchParams, dispatch);
  };
}

export function reloadUsers() {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    const state = getState();
    const searchParams = state.user.searchParams;
    await loadUsers(searchParams, dispatch);
  };
}

async function loadUsers(searchParams: SerachUsersParams, dispatch: Dispatch) {
  try {
    const [users, areaOptions] = await Promise.all([
      httpService.getUsers(searchParams),
      httpService.getUsersCityOptions(),
    ]);

    dispatch(loadUsersSuccess(users));
    dispatch(updateUsersAreasSuccess(areaOptions));
  } catch (err) {
    logger.error(err);
    toastr.error("", "טעינת המשתמשים נכשלה - פנה למנהל המערכת");
  }
}

export function addUser(user: User) {
  return async (dispatch: Dispatch<any>) => {
    dispatch(addUserOptimistic(user));
    try {
      await httpService.createUser(user);
      toastr.success("", "המשתמש התווסף בהצלחה");
    } catch (err) {
      toastr.error("", "הוספת המשתמש נכשלה");
      logger.error(err);
    } finally {
      dispatch(reloadUsers());
    }
  };
}

export function addUsers(users: User[]) {
  return async (dispatch: Dispatch<any>) => {
    dispatch(addUsersOptimistic(users));
    try {
      await httpService.addUsers(users);
      toastr.success("", "המשתמשים התווספו בהצלחה");
    } catch (err) {
      toastr.error("", "הוספת המשתמשים נכשלה");
      logger.error(err);
    } finally {
      dispatch(reloadUsers());
    }
  };
}

export function editUser(user: User) {
  return async (dispatch: Dispatch<any>) => {
    dispatch(editUserOptimistic(user));
    try {
      await httpService.updateUser(user);
      toastr.success("", "המשתמש עודכן בהצלחה");
    } catch (err) {
      toastr.error("", "עדכון המשתמש נכשל");
      logger.error(err);
    } finally {
      dispatch(reloadUsers());
    }
  };
}

export function removeUser(userId: number) {
  return async (dispatch: Dispatch<any>) => {
    dispatch(removeUserOptimistic(userId));
    try {
      await httpService.deleteUser(userId);
      toastr.success("", "המשתמש הוסר בהצלחה");
    } catch (err) {
      toastr.error("", "הסרת המשתמש נכשלה");
      logger.error(err);
    } finally {
      dispatch(reloadUsers());
    }
  };
}
