import axios from "axios";
import { url } from "../../apiConfig";



// export const getAdminOrders = () => {
//   return async (dispatch) => {
//     dispatch({
//       type: "GETPRODUCTS",
//       payload: axios.get(`${url + "getAdminOrders"}`),
//     });
//   };
// };
export const addSellerProduct = (productData) => {
  return async (dispatch) => {
    dispatch({
      type: "ADDSELLERPRODUCT",
      payload: axios.post(`${url + "createProduct"}`, productData, {
        headers: { "Content-Type": "application/json" }, withCredentials:true,
      }),
    });
  };
};

export const getSellerProducts = () => {
  console.log("first seller")
  return async (dispatch) => {
    // console.log("secons step")
    dispatch({
      type: "GETSELLERPRODUCTS",
      payload: axios.get(`${url + "getstoreproductAdmin"}`, {withCredentials: true}),
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