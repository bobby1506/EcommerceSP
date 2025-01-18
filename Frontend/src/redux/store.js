import { applyMiddleware, combineReducers, createStore } from "redux";
import { userReducer } from "./reducers/userReducer";
import { thunk } from "redux-thunk";
import promise from "redux-promise-middleware";

const rootReducer = combineReducers({
  user: userReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk, promise));
