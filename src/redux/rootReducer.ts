import { combineReducers } from "redux";
import { parcelReducer } from "./states/parcel/reducers";
import { reducer as toastrReducer } from "react-redux-toastr";
import { userReducer } from "./states/user/reducers";

const rootReducer = combineReducers({
  parcel: parcelReducer,
  user: userReducer,
  toastr: toastrReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
