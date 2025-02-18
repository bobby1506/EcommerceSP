import axios from "axios";
import { url } from "../../apiConfig";

export const addSellerProduct = (productData) => async (dispatch) => {
  dispatch({
    type: "ADDSELLERPRODUCT",
    payload: axios.post(`${url + "createProduct"}`, productData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    }),
  });
};

export const getSellerProducts = () => async (dispatch) => {
  dispatch({
    type: "GETSELLERPRODUCTS",
    payload: axios.get(`${url + "getstoreproductAdmin"}`, {
      withCredentials: true,
    }),
  });
};

export const deleteProduct = (productId) => async (dispatch) => {
  dispatch({
    type: "DELETEPRODUCT",
    payload: axios.post(
      `${url + `deleteProduct/${productId}`}`,
      {},
      { withCredentials: true }
    ), ///productUpdate/:productId
    meta: { productId },
  });
};

export const updateProduct = (productId, productData) => async (dispatch) => {
  dispatch({
    type: "UPDATEPRODUCT",
    payload: axios.post(
      `${url + `productUpdate/${productId}`}`,
      { productData },
      { withCredentials: true }
    ),
    meta: { productId, productData },
  });
};

export const updateStore = (storeId, storeData) => async (dispatch) => {
  dispatch({
    type: "UPDATESTORE",
    payload: axios.post(`${url + `updateStore/${storeId}`}`, storeData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    }),
    meta: { storeId, storeData },
  });
};

export const deleteStore = (storeId) => async (dispatch) => {
  dispatch({
    type: "DELETESTORE",
    payload: axios.post(
      `${url + "DELETESTORE/" + storeId}`,
      {},
      { withCredentials: true }
    ),
  });
};

export const createCoupon = (formdata) => async (dispatch) => {
  dispatch({
    type: "CREATECOUPON",
    payload: axios.post(`${url}createCoupon`, formdata, {
      withCredentials: true,
    }),
    meta: { ...formdata },
  });
};

export const updateCoupon = (formdata) => async (dispatch) => {
  dispatch({
    type: "UPDATECOUPON",
    payload: axios.post(`${url}updateCoupon`, formdata, {
      withCredentials: true,
    }),
    meta: { ...formdata },
  });
};

export const deleteCoupon = (productId) => async (dispatch) => {
  dispatch({
    type: "DELETECOUPON",
    payload: axios.post(
      `${url}deleteCoupon`,
      { productId },
      { withCredentials: true }
    ),
    meta: { productId },
  });
};

export const getSellerStore = () => ({
  type: "GETSTORE",
  payload: axios.get(`${url + "ownerDashboard"}`, { withCredentials: true }),
});
