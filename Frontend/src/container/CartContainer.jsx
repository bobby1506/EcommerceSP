import { connect } from "react-redux";
import Seller from "../pages/Seller";
import Cart from "../pages/Cart";
import { addToCart, emptyMsg, getCart, removeFromCart, updateCart } from "../redux/actions/cartAction";

const mapStateToProps = (state) => {
    return {
        ccartList:state.cart.cartItems,
        cisLoading:state.cart.isLoading,
        cmessage:state.cart.message,
        ctotalItems:state.cart.totalItems,
        caddedToCart:state.cart.addedToCart,
        ctotalPrice:state.cart.totalPrice
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
    //   caddToCart: (product) => dispatch(addToCart(product)),
      removeFromCart: (productId) => dispatch(removeFromCart(productId)),
      updateCart:(productId,quantity,count)=>dispatch(updateCart(productId,quantity,count)),
      getItem:()=>dispatch(getCart()),
      emptyMsg:()=>dispatch(emptyMsg())
      // addToCart:(productId)=>dispatch(addToCart(productId))
    //   cemptyMsg: () => dispatch(emptyMsg())
    };
  };
  

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

