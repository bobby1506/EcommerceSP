const initialState = {
  cartItems: [],
  message: "",
  flag: false,
  isLoading: false,
  cardLoading: false,
  addedToCart: false,
  removedFromCart:false,
  totalItems: 0,
  totalPrice: 0,
  couponApplied: false,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDTOCART_PENDING":
      return { ...state, isLoading: true };

    case "ADDTOCART_FULFILLED":
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          action.payload?.data?.productDetails || {},
        ],
        message: action.payload?.data?.message || "addedToCart",
        addedToCart: true,
        flag: !state.flag,
      };

    case "ADDTOCART_REJECTED":
      console.error(
        action.payload?.response?.data?.message || "Error occurred"
      );
      return {
        ...state,
        isLoading: false,
        addedToCart: false,
        message:
          action.payload?.response?.data?.message || "Failed to add item",
        flag: !state.flag,
      };

    case "GETCART_PENDING":
      return { ...state, isLoading: true };

    case "GETCART_FULFILLED":
      console.log("Cart", action.payload.data.data.items);
      const totalQuantity =
        action.payload?.data?.data?.items?.reduce(
          (acc, elem) => acc + (elem?.quantity || 0),
          0
        ) || 0;
      const gettotalPrice = action.payload.data.data.items.reduce(
        (acc, product) => acc + Number(product.totalPrice),
        0
      );

      return {
        ...state,
        isLoading: false,
        cartItems: action.payload?.data?.data?.items || [],
        totalItems: totalQuantity,
        addedToCart: true,
        totalPrice: gettotalPrice,
        flag: !state.flag,
      };

    case "GETCART_REJECTED":
      return {
        ...state,
        isLoading: false,
        message:
          action.payload?.response?.data?.message || "Failed to fetch cart",
        addedToCart: false,
        flag: !state.flag,
      };

    case "REMOVEFROMCART_PENDING":
      return { ...state, cardLoading: true };

    case "REMOVEFROMCART_FULFILLED":
      const removeId = action.meta.productId;
      const updatedCart = state.cartItems.filter(
        (product) => product?.productId !== removeId
      );
      const RemovedTotalPrice = updatedCart.reduce((acc, product) => {
        if (product.productId == removeId) {
          product.totalPrice =
            Number(product.totalPrice) +
            Number(product.productDetails.price) * updateCount;
        }
        return acc + product.totalPrice;
      }, 0);

      const updatedTotalQuantity = updatedCart.reduce(
        (acc, elem) => acc + (elem?.quantity || 0),
        0
      );

      return {
        ...state,
        message: action.payload?.data?.message || "removed",
        cartItems: updatedCart,
        totalItems: updatedTotalQuantity,
        totalPrice: RemovedTotalPrice,
        cardLoading: false,
        flag: !state.flag,
        removedFromCart:true,
      };

    case "REMOVEFROMCART_REJECTED":
      return {
        ...state,
        cardLoading: false,
        message:
          action.payload?.response?.data?.message || "Failed to remove item",
        flag: !state.flag,
        removedFromCart:false,
      };

    case "UPDATECART_PENDING":
      return { ...state };

    case "UPDATECART_FULFILLED":
      const updateCount = action.meta.count;
      const updateCart = state.cartItems.map((item) => {
        if (action.meta.productId === item.productId) {
          item.quantity = Number(item.quantity) + updateCount;
        }
        return item;
      });
      const updateProductId = action.meta.productId;
      console.log("first", updateCount, "Second", updateProductId);
      const updatedTotalPrice = state.cartItems.reduce((acc, product) => {
        if (product.productId == updateProductId) {
          product.totalPrice =
            Number(product.totalPrice) +
            Number(product.productDetails.price) * updateCount;
        }
        return acc + product.totalPrice;
      }, 0);
      // alert(updatedTotalPrice)

      return {
        ...state,
        totalItems: state.totalItems + (action.meta?.count || 0),
        totalPrice: updatedTotalPrice,
        cartItems: [...updateCart],
      };

    case "UPDATECART_REJECTED":
      return {
        ...state,
        message: action.payload?.response?.data?.message,
        isLoading: false,
        flag: !state.flag,
      };

    case "APPLYCOUPON_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "APPLYCOUPON_FULFILLED":
      const ctotalprice = action.payload?.data?.newCart?.items?.reduce(
        (acc, product) => {
          return acc + Number(product.totalPrice);
        },
        0
      );
      return {
        ...state,
        isLoading: false,
        totalPrice: ctotalprice,
        cartItems: [...action.payload?.data?.newCart?.items],
        message: action.payload?.data?.message || "coupoun applied",
        flag: !state.flag,
        couponApplied: true,
      };
    case "APPLYCOUPON_REJECTED":
      return {
        ...state,
        flag: !state.flag,
        message: action.payload.response.data.message || "some error occured",
        isLoading: false,
        couponApplied: false,
      };

    case "EMPTYMSG":
      return {
        ...state,
        message: "",
        addedToCart: false,
        removedFromCart:false,
        couponApplied:false,
        
      };

    default:
      return state;
  }
};
