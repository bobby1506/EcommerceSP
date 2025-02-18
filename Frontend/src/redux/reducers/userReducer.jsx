import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../../constants/user";

const initialState = {
  flag: false,
  isLoading: false,
  message: "",
  isAuthenticated: false,
  isLogOut:false,
  userData: {},
  isSeller: false,
  byLogin:false,
  token: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        message: action.payload.data.message,
        flag: !state.flag,
        isAuthenticated: true,
        token: action.payload.data.data.token,
        isLoading: false,
        isSeller:action.payload.data.data.user.isSeller,
        userData: { ...action.payload.data.data.user },
      };
    case REGISTER_FAIL:
      return {
        ...state,
        message: action.payload.response?.data?.message ||"some error occured",
        flag: !state.flag,
        isLoading: false,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        user: {
          ...state,
          isLoading: true,
        },
      };
    case LOGIN_SUCCESS:
      // alert("hello",action.payload.data)
      console.log("actopm",action.payload.data.data.isSeller);
      return {
        ...state,
        message: action.payload.data.message,
        flag: !state.flag,
        isAuthenticated: true,
        token: action.payload.data.data.token,
        isLoading: false,
        userData: { ...action.payload.data.data.data },
        isSeller: action.payload.data.data.data.isSeller,
      };
    case LOGIN_FAIL:
      console.log("fail",action.payload)
      return {
        ...state,
        message: action.payload.message || action.payload.response.data.message,
        flag: !state.flag,
        isLoading: false,
      };

     case 'GETUSER_FULFILLED':
      return{
        ...state,
        isSeller:action.payload.data.data.user.isSeller,
        userData:{...action.payload.data.data.user}
      } 

      case 'USERLOGOUT':
        // alert("hello")
        return {
          ...state,
          userData:{},
          flag:!state.flag,
          isAuthenticated:false,
          message:"logout Sucessfully",
          token:"",
          isLogOut:true

        }
      case 'emptyMsg':
        return{
          ...state,
          message:""
        }  

    default:
      return {...state};
  }
};
