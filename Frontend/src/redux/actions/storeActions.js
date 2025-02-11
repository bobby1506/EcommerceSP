import axios from "axios";
import { url } from "../../apiConfig";
import Cookies from "js-cookie";
const cookieValue = Cookies.get("authToken");
export const createStore = (storeData) => async (dispatch) => {
  dispatch({
    type: "CREATESTORE",
    payload: axios.post(`${url + "createStore"}`, storeData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    }),
  });
};

// change
export const getStores = () => async (dispatch) => {
  dispatch({
    type: "GETSTORES",
    payload: axios.get(`${url + "listStore"}`, {
      headers: { "Content-Type": "multipart/form-data", Cookie: cookieValue },
      withCredentials: true,
    }),
  });
};

export const getStore = () => async (dispatch) => {
  dispatch({
    type: "GETSTORE",
    payload: axios.get(`${url + "getStore"}`),
  });
};

export const deleteStore = () => async (dispatch) => {
  dispatch({
    type: "DELETESTORE",
    payload: axios.get(`${url + "deleteStore"}`),
  });
};

export const updateStore = () => async (dispatch) => {
  dispatch({
    type: "UPDATESTORE",
    payload: axios.get(`${url + "updateStore"}`),
  });
};
