import axios from "axios";
import { url } from "../../apiConfig";

export const addToCart = (productId) => async (dispatch) => {
  dispatch({
    type: "ADDTOCART",
    payload: axios.post(
      `${url + "addToCart"}`,
      { productId },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    ),
  });
};

export const getCart = () => async (dispatch) => (
  dispatch( {
    type: "GETCART",
    payload: axios.get(`${url + "getCart"}`, {headers: { "Content-Type": "application/json" },withCredentials: true,}),
   })
);

export const removeFromCart = (productId) => async (dispatch) => {
  dispatch({
    type: "REMOVEFROMCART",
    payload: axios.post(
      `${url + "removeCart"}`,
      { productId },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    ),
    meta: { productId },
  });
};
export const updateCart = (productId, quantity, count) => async (dispatch) => {
  dispatch({
    type: "UPDATECART",
    payload: axios.post(
      `${url + "updateCart"}`,
      { productId, quantity },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    ),
    meta: { count, productId },
  });
};

export const applyCoupon = (couponCode) => async (dispatch) => {
  dispatch({
    type: "APPLYCOUPON",
    payload: axios.post(
      `${url + "applycoupon"}`,
      { couponCode },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    ),
  });
};

export const emptyMsg = () => {
  return {
    type: "EMPTYMSG",
  };
};
