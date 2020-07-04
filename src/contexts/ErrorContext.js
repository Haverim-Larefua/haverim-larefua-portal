import React, { createContext, useReducer } from "react";
import { errorReducer } from "../reducers/errorReducer";
import { defaultError } from "./interfaces/error.interface";

export const errorContext = createContext(defaultError);

const ErrorContextProvider = props => {
    const [systemError, dispatchError] = useReducer(errorReducer, defaultError);

   return (
    <errorContext.Provider value={[systemError, dispatchError]}>
      {props.children}
    </errorContext.Provider>
  );
};

export default ErrorContextProvider;