import { combineReducers } from "redux";
import { parcelReducer } from "./states/parcel/reducers";

const rootReducer = combineReducers({
  parcel: parcelReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
