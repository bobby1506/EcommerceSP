import { connect } from "react-redux";
import ProductForm from "../components/product/ProductForm";
import { addSellerProduct } from "../redux/actions/sellerActions";

const mapStateToProps = (state) => ({
  seller: state.seller,
});
const mapDispatchToProps = (dispatch) => ({
  addProduct: (productData) => {
    dispatch(addSellerProduct(productData));
  },
  emptymsg: () => {
    dispatch({ type: "emptyStoreMsg", payload: "" });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
