import axios from "axios";
import { url } from "../../apiConfig";

export const createStore = (storeData) => async (dispatch) => {
  dispatch({
    type: "CREATESTORE",
    payload: axios.post(`${url + "createStore"}`, storeData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    }),
  });
};

// changes
export const getStores = () => async (dispatch) => {
  dispatch({
    type: "GETSTORES",
    payload: axios.get(`${url}listStore`, {
      withCredentials: true,
      headers: {
        Cookie: `authToken=${
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("authToken="))
            ?.split("=")[1] || ""
        }`,
      },
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
