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
  message: null,
  isAuthenticated:false,
  userData: {},
};

export const userReducer = (state =  initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:

      return {
        ...state,
        user: { ...state, isLoading: true },
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          message: action.payload.data.message,
          rFlag: !state.rFlag,
          isLoading: false,
        },
      };
    case REGISTER_FAIL:
      return {
        ...state,
        user: {
          ...state.user,
          message: action.payload.data.message,
          rFlag: !state.rFlag,
          isLoading: false,
        },
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
    console.log(state,state.flag)
      return {
        ...state,
          message: action.payload.data.message,
          flag: !state.flag,
          isAuthenticated:true,
          token: action.payload.data.token,
          isLoading: false,
          userData: { ...action.payload.data.user},
        }
    case LOGIN_FAIL:
      return {
          ...state.user,
          message: action.payload.message,
          flag: !state.flag,
          isLoading: false,
        }

    default:
      return state;
  }
};
