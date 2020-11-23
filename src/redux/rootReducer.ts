import { combineReducers } from "redux";
import { parcelReducer } from "./states/parcel/reducers";
import { reducer as toastrReducer } from "react-redux-toastr";

const rootReducer = combineReducers({
  parcel: parcelReducer,
  toastr: toastrReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
