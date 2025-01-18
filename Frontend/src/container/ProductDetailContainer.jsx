import { connect } from "react-redux";
import { getProduct } from "../redux/actions/productActions";
import ProductDetail from "../pages/productDetail";

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});


export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
