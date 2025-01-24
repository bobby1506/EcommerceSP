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
  userData: {},
  isSeller: false,
  token: "",
};

export const userReducer = (state = initialState, action) => {
  console.log("initial-state",state)
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_SUCCESS:
      console.log("success", action.payload.data)
      return {
        ...state,
        message: action.payload.data.message,
        flag: !state.flag,
        isAuthenticated: true,
        token: action.payload.data.token,
        isLoading: false,
        userData: { ...action.payload.data.user },
      };
    case REGISTER_FAIL:
      console.log("state",state)
      return {
        ...state,
        message: action.payload.data?.message,
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
      console.log("actopm", action.payload.data);
      return {
        ...state,
        message: action.payload.data.message,
        flag: !state.flag,
        isAuthenticated: true,
        token: action.payload.data.token,
        isLoading: false,
        userData: { ...action.payload.data.user },
        isSeller: action.payload.data.user.isSeller,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        message: action.payload.message,
        flag: !state.flag,
        isLoading: false,
      };

     case 'GETUSER_FULFILLED':
      return{
        ...state,
        isSeller:action.payload.data.data.isSeller,
        userData:{...action.payload.data}
      } 

    default:
      return state;
  }
};
