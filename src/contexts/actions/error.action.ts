import { SystemError }  from "../interfaces/error.interface";

export interface IActionBase {
  type: string;
  [prop: string]: any;
}

export const ADD_ERROR: string = "ADD_ERROR";

export function addError(error: SystemError): IAddErrorActionType {
    return {type: ADD_ERROR, error };
}

interface IAddErrorActionType { type: string , error: SystemError};

export type UserActions = IAddErrorActionType ;

