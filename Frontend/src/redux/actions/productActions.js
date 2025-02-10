import axios from "axios";
import { url } from "../../apiConfig";

export const getProducts = (storeId) => async (dispatch) => {
  dispatch({
    type: "GETPRODUCTS",
    payload: axios.get(`${url + "getProductsOfStore/" + storeId}`, {
      withCredentials: true,
    }),
  });
};


export const getProduct = (productId) => async (dispatch) => {
  dispatch({
    type: "GETPRODUCT",
    payload: axios.get(`${url + `productDetails/${productId}`}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }),
  });
};

export const deleteProduct = (productId) => async (dispatch) => {
  dispatch({
    type: "DELETEPRODUCT",
    payload: axios.get(`${url + " deleteProduct" + productId}`),
    meta: { productId },
  });
};


