import { createStore, applyMiddleware, Store } from "redux";
import rootReducers from "./reducers/root.reducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from "redux-thunk";
import { getAllPackages } from './actions/packages.action';

const store: Store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

// TODO: Check how to change the ANY
// store.dispatch<any>(getAllPackages());

store.subscribe(() => {});
export default store;