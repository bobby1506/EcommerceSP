import axios from "axios";
import { url } from "../../apiConfig";

export const addProduct = (productData) => {
  return async (dispatch) => {
    dispatch({
      type: "ADDPRODUCT",
      payload: axios.post(`${url + "addProduct"}`, productData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    });
  };
};

export const getProducts = () => {
  return async (dispatch) => {
    dispatch({
      type: "GETPRODUCTS",
      payload: axios.get(`${url + "getProducts"}`),
    });
  };
};

export const getAdminProducts = () => {
  return async (dispatch) => {
    dispatch({
      type: "GETADMINPRODUCTS",
      payload: axios.get(`${url + "getAdminProducts"}`),
    });
  };
};

export const getProduct = (storeId) => {
    return async (dispatch) => {
      dispatch({
        type: "GETPRODUCT",
        payload: axios.get(`${url + "getProduct",{headers:{ "Content-Type": "multipart/form-data","storeId":`${storeId}`}}}`),
      });
    };
  };

export const deleteProduct = () => {
    return async (dispatch) => {
      dispatch({
        type: "DELETEPRODUCT",
        payload: axios.get(`${url + "deleteProduct"}`),
      });
    };
  };
  
  export const updateStore = () => {
    return async (dispatch) => {
      dispatch({
        type: "UPDATEPRODUCT",
        payload: axios.get(`${url + "updateProduct"}`),
      });
    };
  };  

