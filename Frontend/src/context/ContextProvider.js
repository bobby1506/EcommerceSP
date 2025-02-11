/* eslint-disable default-case */
import { createContext, useReducer } from "react";

export const loginContext = createContext();

const ContextProvider = ({ children }) => {
  const initialState = {
    flag: false,
    isLoading: false,
    message: "",
    isAuthenticated: false,
    userData: {},
    isSeller: false,
    token: "",
  };

  const handleOnLogin = (state, action) => {
    console.log("ContextProvider", action.payload);
    switch (action.type) {
      case "LOGIN_PENDING":
        return {
          ...state,
          user: {
            ...state,
            isLoading: true,
          },
        };
      case "LOGIN_FULFILLED":
        // console.log("actopm", action.payload.data.data.data.isSeller);
        return {
          ...state,
          message: action.payload.data.message,
          flag: !state.flag,
          isAuthenticated: true,
          token: action.payload.data.data.token,
          isLoading: false,
          userData: { ...action.payload.data.data.data },
          isSeller: action.payload.data.data.data.isSeller,
          storeId: action.payload.data.data.data.storeId,
        };
      case "LOGIN_REJECTED":
        console.log("fail", action.payload);
        return {
          ...state,
          message: action.payload.response.data.message,
          flag: !state.flag,
          isLoading: false,
        };
      case "GETUSER_FULFILLED":
        return {
          ...state,
          isSeller: action.payload.data.data.user.isSeller,
          userData: { ...action.payload.data.data.user },
        };
      case "USERLOGOUT":
        // alert("hello")
        return {
          ...state,
          userData: {},
          isAuthenticated: false,
          message: "logout Sucessfully",
          token: "",
        };
      case "emptyMsg":
        return {
          ...state,
          message: "",
        };
    }
  };
  const [contextUserData, loginDispatch] = useReducer(
    handleOnLogin,
    initialState
  );
  return (
    <loginContext.Provider value={{ contextUserData, loginDispatch }}>
      {children}
    </loginContext.Provider>
  );
};

export default ContextProvider;
