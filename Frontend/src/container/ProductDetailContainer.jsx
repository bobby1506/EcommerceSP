import { connect } from "react-redux";
import { getProduct, getProducts } from "../redux/actions/productActions";
import ProductDetail from "../pages/productDetail";
import { addToCart, emptyMsg, getCart } from "../redux/actions/cartAction";

const mapStateToProps = (state) => ({
  productt: state.product,
  cart: state.cart,
});
const mapDispatchToProps = (dispatch) => ({
  getProduct: (productId) => dispatch(getProduct(productId)),
  addToCart: (productId) => dispatch(addToCart(productId)),
  emptyMsg: () => dispatch(emptyMsg()),
  getItem: () => dispatch(getCart()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
