import axios from "axios";
import { url } from "../../apiConfig";

export const createStore = (storeData) => {
  return async (dispatch) => {
    dispatch({
      type: "CREATESTORE",
      payload: axios.post(`${url + "createStore"}`, storeData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    });
  };
};

export const getStores = () => {
  return async (dispatch) => {
    dispatch({
      type: "GETSTORES",
      payload: axios.get(`${url + "createStore"}`),
    });
  };
};

export const getStore = () => {
  return async (dispatch) => {
    dispatch({
      type: "GETSTORE",
      payload: axios.get(`${url + "getStore"}`),
    });
  };
};

export const deleteStore = () => {
    return async (dispatch) => {
      dispatch({
        type: "DELETESTORE",
        payload: axios.get(`${url + "deleteStore"}`),
      });
    };
  };
  
  export const updateStore = () => {
    return async (dispatch) => {
      dispatch({
        type: "UPDATESTORE",
        payload: axios.get(`${url + "updateStore"}`),
      });
    };
  };  
