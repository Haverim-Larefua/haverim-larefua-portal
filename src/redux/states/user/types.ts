import SearchUsersParams from "../../../models/SearchUsersParams";
import User from "../../../models/User";

export const ADD_USER_OPTIMISTIC = "ADD_USER_OPTIMISTIC";
export const ADD_USERS_OPTIMISTIC = "ADD_USERS_OPTIMISTIC";
export const EDIT_USER_OPTIMISTIC = "EDIT_USER_OPTIMISTIC";
export const REMOVE_USER_OPTIMISTIC = "REMOVE_USER_OPTIMISTIC";
export const LOAD_USERS_SUCCESS = "LOAD_USERS_SUCCESS";
export const SEARCH_USERS_SUCCESS = "SEARCH_USERS_SUCCESS";
export const UPDATE_USERS_AREAS_SUCCESS = "UPDATE_USERS_AREAS_SUCCESS";

export interface LoadUsersSuccessAction {
  type: typeof LOAD_USERS_SUCCESS;
  users: User[];
}
export interface SearchUsersSuccessAction {
  type: typeof SEARCH_USERS_SUCCESS;
  searchParams: SearchUsersParams;
}
export interface AddUserOptimisticAction {
  type: typeof ADD_USER_OPTIMISTIC;
  user: User;
}
export interface AddUsersOptimisticAction {
  type: typeof ADD_USERS_OPTIMISTIC;
  users: User[];
}
export interface EditUserOptimisticAction {
  type: typeof EDIT_USER_OPTIMISTIC;
  user: User;
}
export interface RemoveUserOptimisticAction {
  type: typeof REMOVE_USER_OPTIMISTIC;
  userId: number;
}
export interface UpdateUsersAreaSuccessAction {
  type: typeof UPDATE_USERS_AREAS_SUCCESS;
  areas: string[];
}

export type UserActions =
  | LoadUsersSuccessAction
  | AddUserOptimisticAction
  | AddUsersOptimisticAction
  | EditUserOptimisticAction
  | RemoveUserOptimisticAction
  | UpdateUsersAreaSuccessAction
  | SearchUsersSuccessAction;
