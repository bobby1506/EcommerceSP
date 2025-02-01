import { connect } from "react-redux";
import Seller from "../pages/Seller";
import Cart from "../pages/Cart";
import { addToCart, applyCoupon, emptyMsg, getCart, removeFromCart, updateCart } from "../redux/actions/cartAction";

const mapStateToProps = (state) => {
    return {
        ccartList:state.cart.cartItems,
        cisLoading:state.cart.isLoading,
        cmessage:state.cart.message,
        ctotalItems:state.cart.totalItems,
        caddedToCart:state.cart.addedToCart,
        ctotalPrice:state.cart.totalPrice,
        cflag:state.cart.flag,
        ccouponApplied:state.cart.ccouponApplied
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
    //   caddToCart: (product) => dispatch(addToCart(product)),
      removeFromCart: (productId) => dispatch(removeFromCart(productId)),
      updateCart:(productId,quantity,count)=>dispatch(updateCart(productId,quantity,count)),
      getItem:()=>dispatch(getCart()),
      emptyMsg:()=>dispatch(emptyMsg()),
      applyCoupon:(couponCode)=>dispatch(applyCoupon(couponCode))
      // addToCart:(productId)=>dispatch(addToCart(productId))
    //   cemptyMsg: () => dispatch(emptyMsg())
    };
  };
  

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

