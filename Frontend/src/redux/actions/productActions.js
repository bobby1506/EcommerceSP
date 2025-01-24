import axios from "axios";
import { url } from "../../apiConfig";



export const getProducts = (storeId) => {
  return async (dispatch) => {
    dispatch({
      type: "GETPRODUCTS",
      payload: axios.get(`${url + "getProductsOfStore/"+storeId}`,{withCredentials: true}),
    });
  };
};

// export const getSellerProducts = () => {
//   return async (dispatch) => {
//     dispatch({
//       type: "GETSELLERPRODUCTS",
//       payload: axios.get(`${url + "getAdminProducts"}`, {withCredentials: true}),
//     });
//   };
// };

export const getProduct = (productId) => {
    return async (dispatch) => {
      dispatch({
        type: "GETPRODUCT",
        payload: axios.get(`${url + `productDetails/${productId}`}`,{headers:{ "Content-Type": "application/json"},withCredentials:true}),
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

