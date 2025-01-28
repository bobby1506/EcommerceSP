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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: () => {
      dispatch(getSellerProducts());
    },
    deleteProduct: (productId) => {
      dispatch(deleteProduct(productId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerProducts);
