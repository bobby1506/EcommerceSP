const initialState = {
  error: "",
  message: "",
  flag: false,
  isLoading: false,
  productsArray: [],
  productData: {
    tittle: "",
    description: "",
    rating: "",
    price: "",
  },
};

export const addProductReducer = (state = initialState, action) => {
  let data=action.payload;
  switch (action.type) {
    case "ADDPRODUCT_PENDING":
      return { ...state, isLoading: true };
    case "ADDPRODUCT_FULFILLED":
      return {
        ...state,
        isLoading: false,
        flag: !flag,
        productsArray: [...productArray, action.payload.product],
        message: action.payload.message,
      };
    case "ADDPRODUCT_REJECTED":
      return {
        ...state,
        isLoading: false,
        flag: !flag,
        // error: action.payload.error,
        message: action.payload.message,
      };
    case "GETPRODUCTS_PENDING":
      return { ...state, isLoading: true };
    case "GETPRODUCTS_FULFILLED":
      return {
        ...state,
        isLoading: false,
        productsArray: data.productArray, //check
        flag: !flag,
        message: data.message,
      };
    case "GETPRODUCTS_REJECTED":
      return {
        ...state,
        isLoading: false,
        message: data.message,
        flag: !flag,
      };

    case "GETPRODUCT_PENDING":
      return { ...state, isLoading: true };
    case "GETPRODUCT_FULFILLED":
      return {
        ...state,
        isLoading: false,
        PData: data.PRODUCT, //check
        flag: !flag,
        message: data.message,
      };
    case "GETPRODUCT_REJECTED":
      return {
        ...state,
        isLoading: false,
        message: data.message,
        flag: !flag,
      };
    case "DELETEPRODUCT_PENDING":
      return { ...state, isLoading: true };
    case "DELETEPRODUCT_FULFILLED":
      const deletedProduct = (state.PRODUCTsArray.filter = (product) => {
        if (product.id != data.id) return product;
      });
      return {
        ...state,
        isLoading: false,
        productsArray: deletedProduct,
        flag: !flag,
        message: data.message,
      };
    case "DELETEPRODUCT_REJECTED":
      return {
        ...state,
        isLoading: false,
        message: data.message,
        flag: !flag,
      };
    case "UPDATEPRODUCT_PENDING":
      return { ...state, isLoading: true };
    case "UPDATEPRODUCT_FULFILLED":
      const updatedProduct = (state.PRODUCTsArray.map = (PRODUCT, index) => {
        if (PRODUCT.id == data.id) {
          PRODUCTsArray[index] = data.PRODUCT; //check
        }
        return PRODUCT;
      });
      return {
        ...state,
        isLoading: false,
        PRODUCTData: data.PRODUCT, //check
        PRODUCTsArray: updatedPRODUCTs,
        flag: !flag,
        message: data.message,
      };
    case "UPDATEPRODUCT_REJECTED":
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

