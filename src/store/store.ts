import { createStore, applyMiddleware, Store } from "redux";
import rootReducers from "./reducers/root.reducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from "redux-thunk";

const store: Store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

store.subscribe(() => {});
export default store;