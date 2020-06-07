
export interface IActionBase {
  type: string;
  [prop: string]: any;
}

export const ADD_ERROR: string = "ADD_ERROR";

export function addError(error: Error): IAddErrorActionType {
    return {type: ADD_ERROR, error };
}

interface IAddErrorActionType { type: string , error: Error};

export type UserActions = IAddErrorActionType ;

