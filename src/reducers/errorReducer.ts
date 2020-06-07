import logger from "../Utils/logger";
import { ADD_ERROR, IActionBase } from "../contexts/actions/error.action";
  
const errorReducer = ( state: Error, action: IActionBase) => {
    
    switch (action.type) {
      case ADD_ERROR: {
        logger.log('[errorReducer] ADD_ERROR ', action.error);
        return { ...state, error: action.error };
        }
    };

}

export default errorReducer;
  