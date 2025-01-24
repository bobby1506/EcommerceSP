import axios from "axios";
import { url } from "../../apiConfig";

export const userRegister = (userData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "REGISTER_REQUEST" });
      console.log(userData)
      const response = await axios.post(`${url + "register"}`, userData, {
        headers: { "Content-Type": "application/json" },
      });
      dispatch({ type: "REGISTER_SUCCESS", payload: response });
      return response;
    } catch (error) {
      dispatch({ type: "REGISTER_FAIL", payload: error });
      throw error
    }
  };
};

export const userLogin = (userData) => {
  return async (dispatch) => {
    try {
      dispatch({type:"LOGIN_REQUEST"})
      let user = await axios.post(`${url + "login"}`, userData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(user.data)
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
    } catch (error) {
      console.log(error)
      dispatch({ type: "LOGIN_FAIL", payload: error });
    }
  };

};

export const getUserStatus=()=>{
  return async (dispatch)=>{
   dispatch({
    type: "GETUSER", 
    payload: axios.get(`${url + "getuser"}`,{headers:{"Content-Type":"application/json"},withCredentials:true}),
  });

  }
}
