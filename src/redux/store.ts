import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer, { AppState } from "./rootReducer";

// Devtools extension is configured to be minimal on production.
const composeEnhancers = composeWithDevTools({});
const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
  middlewares.unshift(require("redux-immutable-state-invariant").default());
}

const configureStore = (initialState?: AppState) => {
  const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)));
  return store;
};

export default configureStore;
