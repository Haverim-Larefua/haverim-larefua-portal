import User from '../interfaces/users.interface';

export interface IActionBase {
  type: string;
  [prop: string]: any;
}

export const ADD_USER: string = "ADD_USER";
export const ADD_USERS: string = "ADD_USERS";
export const EDIT_USER: string = "EDIT_USER";
export const REMOVE_USER: string = "REMOVE_USER";
export const LOAD_USERS: string = "LOAD_USERS";
export const UPDATE_USERS_AREAS: string = "UPDATE_USER_AREAS"; // first load/edit/remove/add -> recalc areas

export function loadUsers(users: User[]): ILoadUsersActionType {
    return {type: LOAD_USERS, users };
}

export function addUser(tmpuser: User): IAddUserActionType {
    return { type: ADD_USER, user: tmpuser }; 
}

export function addUsers(tmpusers: User[]): IAddUsersActionType {
  return { type: ADD_USERS, users: tmpusers }; 
}

export function editUser(tmpuser: User): IEditUserActionType {
    return { type: EDIT_USER, user: tmpuser };
}

export function removeUser(userId: number): IRemoveUserActionType {
    return { type: REMOVE_USER, userId: userId };
}

export function updateUsersAreas(areas: string[]) : IUpdateUserAreaActionType {
  return {type: UPDATE_USERS_AREAS, areas};
}
interface ILoadUsersActionType { type: string , users: User[]};
interface IAddUserActionType { type: string, user: User };
interface IAddUsersActionType { type: string, users: User[] };
interface IEditUserActionType { type: string, user: User };
interface IRemoveUserActionType { type: string, userId: number };
interface IUpdateUserAreaActionType { type: string, areas: string[] };

export type UserActions = ILoadUsersActionType | 
IAddUserActionType | 
IAddUsersActionType | 
IEditUserActionType |
IRemoveUserActionType |
IUpdateUserAreaActionType;


