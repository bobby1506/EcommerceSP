const initialState = {
  error: "",
  message: "",
  flag: false,
  isLoading: false,
  productsArray: [],
  ordersArray: [],
  productCreated:false,
  balance: 0,
};

export const sellerReducer = (state = initialState, action) => {
  let response = action.payload;
  switch (action.type) {
    case "GETSELLERPRODUCTS_PENDING":
      return { ...state, isLoading: true };
    case "GETSELLERPRODUCTS_FULFILLED":
      return {
        ...state,
        isLoading: false,
        productsArray: [...response.data.products],
        flag: !state.flag,
        // message: response.data.message,
      };
    case "GETSELLERPRODUCTS_REJECTED":
      return {
        ...state,
        isLoading: false,
        // message: response.data.message,
        flag: !state.flag,
      };
    case "GETSELLERORDERS_PENDING":
      return { ...state, isLoading: true };
    case "GETSELLERORDERS_FULFILLED":
      return {
        ...state,
        isLoading: false,
        ordersArray: response.data.orders, //check
        flag: !state.flag,
        // message: response.data.message,
      };
    case "GETSELLERORDERS_REJECTED":
      return {
        ...state,
        isLoading: false,
        // message: response.data.message,
        flag: !state.flag,
      };
    case "GETSELLERBALANCE_PENDING":
      return { ...state, isLoading: true };
    case "GETSELLERBALANCE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        ordersArray: response.data.balance, //check
        flag: !state.flag,
        // message: response.data.message,
      };
    case "GETSELLERBALANCE_REJECTED":
      return {
        ...state,
        isLoading: false,
        // message: response.data.message,
        flag: !state.flag,
      };
    case "ADDSELLERPRODUCT_PENDING":
      return { ...state, isLoading: true };
    case "ADDSELLERPRODUCT_FULFILLED":
      return {
        ...state,
        isLoading: false,
        flag: !state.flag,
        productsArray: [...state.productsArray, action.payload.product],
        message: action.payload.data?.message,
        productCreated:true,
      };
    case "ADDSELLERPRODUCT_REJECTED":
      return {
        ...state,
        isLoading: false,
        flag: !state.flag,
        // error: action.payload.error,
        message: action.payload.data?.message,
      };
    case "emptymsg":
      return{
        ...state,
        message:"",
        productCreated:false
      }

    default:
      return state;
  }
};
