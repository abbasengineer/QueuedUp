import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import dataStore from "./stores/data-store";
import userStore from "./stores/user-store";
import uiStore from "./stores/ui-store";

const initialState = {};

const middleware = [thunk];

const stores = combineReducers({
  data: dataStore,
  user: userStore,
  UI: uiStore,
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(stores, initialState, enhancer);

export default store;
