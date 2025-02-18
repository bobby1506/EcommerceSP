import axios from "axios";
import { url } from "../../apiConfig";

export const getOrders = () => async (dispatch) => {
  dispatch({
    type: "GETORDERS",
    payload: axios.get(`${url + "orderDetails"}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
  });
};

export const getOrdersSeller = () => async (dispatch) => {
  dispatch({
    type: "GETORDERSSELLER",
    payload: axios.get(`${url + "orderDetailOwner/"}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
  });
};

export const postOrders = (orderData) => async (dispatch) => {
  dispatch({
    type: "POSTORDERS",
    payload: axios.post(`${url + "createOrder"}`, orderData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
  });
};

export const updateOrders = (orderId) => async (dispatch) => {
  dispatch({
    type: "UPDATEORDERS",
    payload: axios.post(`${url + "productDetails/"}`, orderId, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
  });
};

export const emptyOrderMsg = () => {
  return {
    type: "EMPTYORDERMSG",
  };
};
