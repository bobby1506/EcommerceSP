const initialState = {
  error: "",
  message: "",
  flag: false,
  isLoading: false,
  productsArray: [],
  ordersArray: [],
  isUpdated: false,
  isDeleted: false,
  storeData: null,
  productCreated: false,
  productDeleted: false,
  productUpdated: false,
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
        
      };
    case "GETSELLERPRODUCTS_REJECTED":
      return {
        ...state,
        isLoading: false,
        message: response?.response?.data?.message || "some error occured",
        flag: !state.flag,
      };
    case "GETORDERSSELLER_PENDING":
      return { ...state, isLoading: true };
    case "GETORDERSSELLER_FULFILLED":
      //  const getSellerOrder=action.payload.data.orderss.flatMap((order)=>(order.orderedItems))
      return {
        ...state,
        isLoading: false,
        ordersArray: [...action.payload.data.orderss],
        // flag: !state.flag,
        // message: response.data.message,
      };
    case "GETORDERSSELLER_REJECTED":
      return {
        ...state,
        isLoading: false,
        message: response?.response?.data?.message || "some error occured",
        flag: !state.flag,
      };
    case "GETSELLERBALANCE_PENDING":
      return { ...state, isLoading: true };
    case "GETSELLERBALANCE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        ordersArray: response.data.balance,
        // flag: !state.flag,
        // message: response.data.message,
      };
    case "GETSELLERBALANCE_REJECTED":
      return {
        ...state,
        isLoading: false,
        message: response?.response?.data?.message || "some error occured",
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
        message: response?.response?.data?.message || "some error occured",
      };
    case "DELETEPRODUCT_PENDING":
      return {
        ...state,
        isLoading: true,
      };

    case "DELETEPRODUCT_FULFILLED":
      console.log(action.meta);
      const { productId } = action.meta;
      const deletedProduct = state.productsArray.filter(
        (product) => product._id != productId
      );
      return {
        ...state,
        productsArray: [...deletedProduct],
        flag: !state.flag,
        productDeleted: true,
        message: response?.data?.message || "product Deleted",
        isLoading: false,
      };
    case "DELETEPRODUCT_REJECTED": {
      return {
        ...state,
        isLoading: false,
        flag: !state.flag,
        message: response?.response?.data?.message || "some error occured",
      };
    }

    case "UPDATEPRODUCT_PENDING": {
      return { ...state, isLoading: true };
    }

    case "UPDATEPRODUCT_FULFILLED":
      let updated_produtId = action.meta.productId;
      let updated_productData = action.meta.productData;
      console.log(updated_productData,"hhhh")
      const updatedProduct = state.productsArray.map((product) => {
        if (product._id == updated_produtId) {
          console.log("helloooo", updated_productData);
          return {_id:updated_produtId,...updated_productData};
        }
        return product;
      });
      return {
        ...state,
        productsArray: [...updatedProduct],
        message: "product updated sucessfully",
        flag: !state.flag,
        isLoading: false,
        productUpdated: true,
      };
    case "UPDATEPRODUCT_REJECTED":
      return {
        ...state,
        message: response?.response?.data?.message || "some error occured",
        isLoading: false,
        flag: !state.flag,
      };

    case "UPDATESTORE_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "UPDATESTORE_FULFILLED":
      let updated_storeId = action.meta.storeId;
      let updated_storeData = action.meta.storeData;
      console.log("metadata", action.meta.storeData);
      return {
        ...state,
        storeData: { ...updated_storeData },
        message: "store updated sucessfully",
        isUpdated: true,
        isLoading: false,
        flag: !state.flag,
      };
    case "UPDATESTORE_REJECTED":
      return {
        ...state,
        flag: !state.flag,
        message: response?.response?.data?.message || "some error occured",
        isLoading: false,
      };
    case "GETSTORE_PENDING":
      return {
        ...state,
        isLoading: true,
      };

    case "GETSTORE_FULFILLED":
      console.log("firsttttttttt", action.payload?.data?.store);
      return {
        ...state,
        storeData: action.payload?.data?.store?{ ...action.payload?.data?.store }:null,
        isLoading: false,
      };
    case "GETSTORE_REJECTED":
      return {
        ...state,
        flag: !state.flag,
        isLoading: false,
        message: response?.response?.data?.message || "some error occured",
      };

    case "DELETESTORE_PENDING":
      return {
        ...state,
        isLoading: true,
      };

    case "DELETESTORE_FULFILLED":
      return {
        ...state,
        storeData: {},
        flag: !state.flag,
        isLoading: false,
        message: "store deleted sucessfully",
      };
    case "DELETESTORE_REJECTED":
      return {
        ...state,
        flag: !state.flag,
        message: response?.response?.data?.message || "some error occured",
        isLoading: false,
      };
    case "CREATECOUPON_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "CREATECOUPON_FULFILLED":
      const coupounProductId = action.meta.productId;
      const { coupounCode, discountedPrice } = action.meta;
      const coupounProduct = state.productsArray.map((product) => {
        if (product._id === coupounProductId) {
          return { ...product, coupounCode, discountedPrice, isDiscount: true };
        }
        return product;
      });

      return {
        ...state,
        isLoading: false,
        flag: !state.flag,
        productsArray: [...coupounProduct],
        message: action.payload?.data?.message,
      };
    case "CREATECOUPON_REJECTED":
      return {
        ...state,
        isLoading: false,
        flag: !state.flag,
        message:
          action.payload?.response?.data?.message || "some error occured",
      };

    case "UPDATECOUPON_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "UPDATECOUPON_FULFILLED":
      const ucoupounProductId = action.meta.productId;
      const ucoupounCode = action.meta.coupounCode;
      const udiscountedPrice = action.meta.discountedPrice;
      const ucoupounProduct = state.productsArray.map((product) => {
        if (product._id === ucoupounProductId) {
          return { ...product, ucoupounCode, udiscountedPrice, isDiscount: true };
        }
        return product;
      });

      return {
        ...state,
        isLoading: false,
        flag: !state.flag,
        productsArray: [...ucoupounProduct],
        message: action.payload?.data?.message,
      };
    case "UPDATECOUPON_REJECTED":
      return {
        ...state,
        isLoading: false,
        flag: !state.flag,
        message:
          action.payload?.response?.data?.message || "some error occured",    
      };
      case "DELETECOUPON_PENDING":
        return {
          ...state,
          isLoading: true,
        };
      case "DELETECOUPON_FULFILLED":
        const dcoupounProductId = action.meta.productId;
        const dcoupounProduct = state.productsArray.map((product) => {
          if (product._id === dcoupounProductId) {
            return { ...product,isDiscount: false};
          }
          return product;
        });
  
        return {
          ...state,
          isLoading: false,
          flag: !state.flag,
          productsArray: [...dcoupounProduct],
          message: action.payload?.data?.message,
        };
      case "DELETECOUPON_REJECTED":
        return {
          ...state,
          isLoading: false,
          flag: !state.flag,
          message:
            action.payload?.response?.data?.message || "some error occured", 
    };

    case "emptyStoreMsg":
      return {
        ...state,
        message: "",
      };

    default:
      return state;
  }
};
