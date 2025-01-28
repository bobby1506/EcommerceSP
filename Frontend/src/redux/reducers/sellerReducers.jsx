const initialState = {
  error: "",
  message: "",
  flag: false,
  isLoading: false,
  productsArray: [],
  ordersArray: [],
  storeData: {
    storeName: "",
    storeId: "",
    storeDescription: "",
    storeAddress: "",
  },
  productCreated: false,
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
        productCreated: true,
      };
    case "ADDSELLERPRODUCT_REJECTED":
      return {
        ...state,
        isLoading: false,
        flag: !state.flag,
        // error: action.payload.error,
        message: action.payload.data?.message,
      };
    case "DELETEPRODUCT_PENDING":

    case "DELETEPRODUCT_FULFILLED":
      console.log(action.meta)
      const { productId } = action.meta;
      const deletedProduct = state.productsArray.filter(
        (product) => product._id != productId
      );
      return {
        ...state,
        productsArray: [...deletedProduct],
      };
    case "DELETEPRODUCT_REJECTED":

    case "UPDATEPRODUCT_PENDING":

    case "UPDATEPRODUCT_FULFILLED":
      let updated_produtId = action.meta.productId;
      let updated_productData = action.meta.productData;
      const updatedProduct = state.productsArray.map((product) => {
        if (product._id == updated_produtId) {
          return updated_productData;
        }
      });
      return {
        ...state,
        // productsArray: [...updatedProduct],
        message: "product updated sucessfully",
      };
    case "UPDATEPRODUCT_REJECTED":
      return {
        ...state,
        message: "some error occur",
      };

    case "UPDATESTORE_PENDING":

    case "UPDATESTORE_FULFILLED":
    
      let updated_storeId = action.meta.storeId;
      let updated_storeData = action.meta.storeData;
      console.log("metadata",action.meta.storeData);
      return {
        ...state,
        storeData: { ...updated_storeData },
        message: "store updated sucessfully",
      };
    case "UPDATESTORE_REJECTED":
      return {
        ...state,
        message: "some error occur",
      };
    case "GETSTORE_PENDING":

    case "GETSTORE_FULFILLED":
      console.log("first",action.payload?.data?.store)
      return {
        ...state,
        storeData: { ...action.payload?.data?.store },
        message: "store updated sucessfully",
      };
    case "GETSTORE_REJECTED":
      return {
        ...state,
        message: "some error occur",
      };

    case "DELETESTORE_PENDING": 

    case "DELETESTORE_FULFILLED":
      return {
        ...state,
        storeData: { }, 
        message: "store deleted sucessfully",
      };
    case "DELETESTORE_REJECTED":
      return {
        ...state,
        message: "some error occur",
      };
    case "emptymsg":
      return {
        ...state,
        message: "",
        productCreated: false,
      };

    default:
      return state;
  }
};
