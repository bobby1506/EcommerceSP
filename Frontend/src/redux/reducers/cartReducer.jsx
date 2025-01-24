const initialState = {
  cartItems: [],
  message: "",
  isLoading: false,
  cardLoading:false,
  addedToCart: false,
  totalItems: 0,
  totalPrice: 0,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDTOCART_PENDING":
      return { ...state, isLoading: true };

    case "ADDTOCART_FULFILLED":
      // if (
      //   state.cartItems.find(
      //     (product) => product._id == action.payload.product._id
      //   )
      // ) {
      //   let cartData = {
      //     ...state,
      //     message: "item alreay in cart",
      //   };
      //   // localStorage.setItem("cart", JSON.stringify(cartData));
      //   return cartData;
      // }

      return {
        ...state,
        cartItems: [...state.cartItems, action.payload.data.productDetails],
        message: action.payload.data.message,
        // totalPrice: state.totalPrice + action.payload.product.price,
        // totalItems: state.totalItems + 1,
        addedToCart: true,
      };
    // localStorage.setItem("cart", JSON.stringify(cartData));
    case "ADDTOCART_REJECTED":
      console.log(action.payload.response.data.message);
      return {
        ...state,
        isLoading: false,
        addedToCart: false,
        message: action.payload.response.data.message,
      };
    case "GETCART_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "GETCART_FULFILLED":
      let totalquantity = action.payload.data.cartResponse.items.reduce(
        (acc, elem) => {
          return acc + elem.quantity;
        },
        0
      );
      return {
        ...state,
        isLoading: false,
        cartItems: [...action.payload.data.cartResponse.items],
        totalItems: totalquantity,
        addedToCart: true,
      };

    case "GETCART_REJECTED":
      return {
        ...state,
        isLoading: false,
        message: action.payload.response.data.message,
        addedToCart: true,
      };
    case "REMOVEFROMCART_PENDING":
      return {
        ...state,
        cardLoading: true,
      };
    case "REMOVEFROMCART_FULFILLED":
      const { producId } = action.meta;

      let updatedCart = state.cartItems.filter((product) => {
        console.log(action.payload.data.productId, product.productId);
        return action.payload.data.productId !== product.productId;
      });

      let Rtotalquantity = updatedCart.reduce(
        (acc, elem) => acc + elem.quantity,
        0
      );
      return {
        ...state,
        message: action.payload.data.message,
        cartItems: [...updatedCart],
        totalItems: Rtotalquantity,
        cardLoading: false,
      };
    case "REMOVEFROMCART_REJECTED":
      return {
        ...state,
        cardLoading: false,
        message: action.payload.response.data.message,
      };

    case "UPDATECART_PENDING":
      return {
        ...state,

        // isLoading:true,
      };
    case "UPDATECART_FULFILLED":
      const { count } = action.meta;
      return {
        ...state,
        totalItems: state.totalItems + count,
        // isLoading:false,
      };
    case "UPDATECART_REJECTED":
      return {
        ...state,
        // isLoading:false,
      };

    case "EMPTYMSG":
      let emptData = {
        ...state,
        message: "",
        addedToCart: false,
      };
      console.log("hellooooo", state.message);
      return emptData;

    default:
      return state;
  }
};
