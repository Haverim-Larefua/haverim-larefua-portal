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
export const SET_USERS: string = "SET_USERS"; // no change to DB (in-memory filter/search)
export const NO_CHANGE_USER: string = "NO_CHANGE"; //nothing changes


export function loadUsers(users: User[]): ILoadUsersActionType {
    return {type: LOAD_USERS, users };
}

export function setUsers(users: User[]): ISetUsersActionType {
  return {type: SET_USERS, users };
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

export function noChangeToUser(dummy: string): INoChangeActionType {
  return { type: NO_CHANGE_USER, dummy };
}

interface ILoadUsersActionType { type: string , users: User[]};
interface ISetUsersActionType { type: string , users: User[]};
interface IAddUserActionType { type: string, user: User };
interface IAddUsersActionType { type: string, users: User[] };
interface IEditUserActionType { type: string, user: User };
interface IRemoveUserActionType { type: string, userId: number };
interface INoChangeActionType { type: string, dummy: string };

export type UserActions = ILoadUsersActionType;


