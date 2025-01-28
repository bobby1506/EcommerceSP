const initialState = {
  cartItems: [],
  message: "",
  isLoading: false,
  cardLoading: false,
  addedToCart: false,
  totalItems: 0,
  totalPrice: 0,
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
        message: action.payload?.data?.message || "",
        addedToCart: true,
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
       const gettotalPrice=action.payload.data.data.items.reduce((acc,product)=>acc+Number(product.totalPrice),0);

      return {
        ...state,
        isLoading: false,
        cartItems: action.payload?.data?.data?.items || [],
        totalItems: totalQuantity,
        addedToCart: true,
        totalPrice:gettotalPrice
      };

    case "GETCART_REJECTED":
      return {
        ...state,
        isLoading: false,
        message:
          action.payload?.response?.data?.message || "Failed to fetch cart",
        addedToCart: false,
      };

    case "REMOVEFROMCART_PENDING":
      return { ...state, cardLoading: true };

    case "REMOVEFROMCART_FULFILLED":
      const removeId = action.meta.productId;
      const updatedCart = state.cartItems.filter(
        (product) => product?.productId !== removeId
      );

      const updatedTotalQuantity = updatedCart.reduce(
        (acc, elem) => acc + (elem?.quantity || 0),
        0
      );

      return {
        ...state,
        message: action.payload?.data?.message || "",
        cartItems: updatedCart,
        totalItems: updatedTotalQuantity,
        cardLoading: false,
      };

    case "REMOVEFROMCART_REJECTED":
      return {
        ...state,
        cardLoading: false,
        message:
          action.payload?.response?.data?.message || "Failed to remove item",
      };

    case "UPDATECART_PENDING":
      return { ...state };

    case "UPDATECART_FULFILLED":
      const updateCount = action.meta.count;
      const updateProductId = action.meta.productId;
      console.log("first",updateCount,"Second",updateProductId)
      const updatedTotalPrice = state.cartItems.reduce((acc, product) => {
        if (product.productId == updateProductId) {
          product.totalPrice=Number(product.totalPrice) + (Number(product.productDetails.price)* updateCount);
        }
        return acc+product.totalPrice
      },0);
      // alert(updatedTotalPrice)
      
      return {
        ...state,
        totalItems: state.totalItems + (action.meta?.count || 0),
        totalPrice:updatedTotalPrice
      };

    case "UPDATECART_REJECTED":
      return { ...state };

    case "EMPTYMSG":
      return {
        ...state,
        message: "",
        addedToCart: false,
      };

    default:
      return state;
  }
};
