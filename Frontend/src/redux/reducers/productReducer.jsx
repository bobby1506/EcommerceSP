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

export const ProductReducer = (state = initialState, action) => {
  let response=action.payload;
  switch (action.type) {
    case "GETPRODUCTS_PENDING":
      return { ...state, isLoading: true };
    case "GETPRODUCTS_FULFILLED":
      return {
        ...state,
        isLoading: false,
        productsArray: response.data.products, //check
        flag: !state.flag,
      };
    case "GETPRODUCTS_REJECTED":
      return {
        ...state,
        isLoading: false,
        flag: !state.flag,
      };

    case "GETPRODUCT_PENDING":
      return { ...state, isLoading: true };
    case "GETPRODUCT_FULFILLED":
    
      return {
        ...state,
        isLoading: false,
        productData: {...action.payload.data.productDetails},
        flag: !state.flag,
      };
    case "GETPRODUCT_REJECTED":
      return {
        ...state,
        isLoading: false,
        message: response.data?.message,
        flag: !state.flag,
      };
    // case "DELETEPRODUCT_PENDING":
    //   return { ...state, isLoading: true };
    // case "DELETEPRODUCT_FULFILLED":
    //   const deletedProduct = (state.PRODUCTsArray.filter = (product) => {
    //     if (product.id != data.id) return product;
    //   });
    //   return {
    //     ...state,
    //     isLoading: false,
    //     productsArray: deletedProduct,
    //     flag: !state.flag,
    //     message: response.data?.message,
    //   };
    // case "DELETEPRODUCT_REJECTED":
    //   return {
    //     ...state,
    //     isLoading: false,
    //     message: response.data?.message,
    //     flag: !state.flag,
    //   };
    // case "UPDATEPRODUCT_PENDING":
    //   return { ...state, isLoading: true };
    // case "UPDATEPRODUCT_FULFILLED":
    //   const updatedProduct = (state.PRODUCTsArray.map = (PRODUCT, index) => {
    //     if (PRODUCT.id == data.id) {
    //       PRODUCTsArray[index] = data.PRODUCT; //check
    //     }
    //     return PRODUCT;
    //   });
    //   return {
    //     ...state,
    //     isLoading: false,
    //     PRODUCTData: data.PRODUCT, //check
    //     PRODUCTsArray: updatedPRODUCTs,
    //     flag: !state.flag,
    //     message: response.data?.message,
    //   };
    // case "UPDATEPRODUCT_REJECTED":
    //   return {
    //     ...state,
    //     isLoading: false,
    //     message: response.data?.message,
    //     flag: !state.flag,
    //   };

    default:
      return state;
  }
};

