import logger from "../Utils/logger";
import { ADD_ERROR } from "../contexts/actions/error.action";
import { SystemError, defaultError } from "../contexts/interfaces/error.interface";

export const errorReducer = (state: SystemError = defaultError, action: any) => {
  if (action.type === ADD_ERROR) {
    logger.log("[errorReducer] ADD_ERROR ", action.error);
    return { ...state, ...action.error };
  } else {
    return state;
  }
};
