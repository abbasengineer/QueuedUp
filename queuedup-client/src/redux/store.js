import { combineReducers, compose, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import dataReducer from "./reducers/data-reducer";
import userReducer from "./reducers/user-reducer";
import uiReducer from "./reducers/ui-reducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  data: dataReducer,
  user: userReducer,
  UI: uiReducer,
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export default store;
