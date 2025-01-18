const initialState = {
  error: "",
  message: "",
  flag: false,
  isLoading: false,
  productsArray: [],
  ordersArray: [],
  balance: 0,
};

export const getAdminProductsReducder = (state = initialState, action) => {
  let data = action.payload;
  switch (action.type) {
    case "GETADMINPRODUCTS_PENDING":
      return { ...state, isLoading: true };
    case "GETADMINPRODUCTS_FULFILLED":
      return {
        ...state,
        isLoading: false,
        productArray: data.products, //check
        flag: !flag,
        message: data.message,
      };
    case "GETADMINPRODUCTS_REJECTED":
      return {
        ...state,
        isLoading: false,
        message: data.message,
        flag: !flag,
      };
    case "GETADMINORDERS_PENDING":
      return { ...state, isLoading: true };
    case "GETADMINORDERS_FULFILLED":
      return {
        ...state,
        isLoading: false,
        ordersArray: data.orders, //check
        flag: !flag,
        message: data.message,
      };
    case "GETADMINORDERS_REJECTED":
      return {
        ...state,
        isLoading: false,
        message: data.message,
        flag: !flag,
      };
    case "GETADMINBALANCE_PENDING":
      return { ...state, isLoading: true };
    case "GETADMINBALANCE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        ordersArray: data.balance, //check
        flag: !flag,
        message: data.message,
      };
    case "GETADMINBALANCE_REJECTED":
      return {
        ...state,
        isLoading: false,
        message: data.message,
        flag: !flag,
      };

    default:
      return state;
  }
};
