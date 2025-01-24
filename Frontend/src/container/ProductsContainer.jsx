import { connect } from "react-redux";
import { getProducts } from "../redux/actions/productActions";
import Products from "../pages/Products";
import { getUserStatus } from "../redux/actions/userActions";

const mapStateToProps = (state) => {
    
  return {
    productsList:state.product.productsArray,
    isLoadings:state.product.isLoading
  }
};
const mapDispatchToProps = (dispatch) => {
    return{
        getProduct:(storeId)=>dispatch(getProducts(storeId)),
       
    }
   
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
