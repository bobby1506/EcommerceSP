import axios from "axios";
import { url } from "../../apiConfig";



export const getAdminOrders = () => {
  return async (dispatch) => {
    dispatch({
      type: "GETPRODUCTS",
      payload: axios.get(`${url + "getAdminOrders"}`),
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


// export const deleteProduct = () => {
//     return async (dispatch) => {
//       dispatch({
//         type: "DELETEPRODUCT",
//         payload: axios.get(`${url + "deleteProduct"}`),
//       });
//     };
//   };

//   export const updateProduct = () => {
//     return async (dispatch) => {
//       dispatch({
//         type: "UPDATEPRODUCT",
//         payload: axios.get(`${url + "updateProduct"}`),
//       });
//     };
//   };  
  
//   export const updateStore = () => {
//     return async (dispatch) => {
//       dispatch({
//         type: "UPDATESTORE",
//         payload: axios.get(`${url + "updateStore"}`),
//       });
//     };
//   }; 
  
//   export const deleteStore = () => {
//     return async (dispatch) => {
//       dispatch({
//         type: "DELETESTORE",
//         payload: axios.get(`${url + "DELETESTORE"}`),
//       });
//     };
//   };  


// export const getProduct = (storeId) => {
//     return async (dispatch) => {
//       dispatch({
//         type: "GETPRODUCT",
//         payload: axios.get(`${url + "getProduct",{headers:{ "Content-Type": "multipart/form-data","storeId":`${storeId}`}}}`),
//       });
//     };
//   };