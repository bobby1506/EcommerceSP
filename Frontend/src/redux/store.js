import { applyMiddleware, combineReducers, createStore } from "redux";
import { userReducer } from "./reducers/userReducer";
import { thunk } from "redux-thunk";
import promise from "redux-promise-middleware";
import { storeReducer } from "./reducers/storeReducer";
import { ProductReducer } from "./reducers/productReducer";
import { sellerReducer } from "./reducers/sellerReducers";
import { cartReducer } from "./reducers/cartReducer";
import { orderReducer } from "./reducers/orderReducer";
// import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  user: userReducer,
  store:storeReducer,
  product:ProductReducer,
  seller:sellerReducer,
  cart:cartReducer,
  order:orderReducer,
});
// const middleware=[thunk,promise]
export const store = createStore(rootReducer, applyMiddleware(thunk, promise));
