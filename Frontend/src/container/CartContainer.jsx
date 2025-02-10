import { connect } from "react-redux";
import Cart from "../pages/Cart";
import {
  applyCoupon,
  emptyMsg,
  getCart,
  removeFromCart,
  updateCart,
} from "../redux/actions/cartAction";

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (productId) => dispatch(removeFromCart(productId)),
  updateCart: (productId, quantity, count) =>dispatch(updateCart(productId, quantity, count)),
  getItem: () => dispatch(getCart()),
  emptyMsg: () => dispatch(emptyMsg()),
  applyCoupon: (couponCode) => dispatch(applyCoupon(couponCode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
