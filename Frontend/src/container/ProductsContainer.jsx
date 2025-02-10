import { connect } from "react-redux";
import { getProducts } from "../redux/actions/productActions";
import Products from "../pages/Products";

const mapStateToProps = (state) => ({
  product: state.product,
});
const mapDispatchToProps = (dispatch) => ({
  getProduct: (storeId) => dispatch(getProducts(storeId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Products);
