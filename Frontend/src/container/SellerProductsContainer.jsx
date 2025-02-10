import { connect } from "react-redux";
import Seller from "../pages/Seller";
import SellerProducts from "../components/seller/SellerProducts";
import {
  deleteProduct,
  getSellerProducts,
} from "../redux/actions/sellerActions";

const mapStateToProps = (state) => {
  return {
    productsList: state.seller.productsArray,
    sisLoading: state.seller.isLoading,
    sproductCreated: state.seller.productCreated,
    sproductDeleted: state.seller.productDeleted,
    sproductUpdated: state.seller.productUpdated,
    sflag: state.seller.flag,
    smessage: state.seller.message,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getProduct: () => {
    dispatch(getSellerProducts());
  },
  deleteProduct: (productId) => {
    dispatch(deleteProduct(productId));
  },
  emptyStoreMsg: () => dispatch({ type: "emptyStoreMsg" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SellerProducts);
