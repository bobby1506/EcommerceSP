import { connect } from "react-redux";
import { getProduct, getProducts } from "../redux/actions/productActions";
import ProductDetail from "../pages/productDetail";
import { addToCart, emptyMsg } from "../redux/actions/cartAction";

const mapStateToProps = (state) => {
    return{
        productList:state.product.productsArray,
        cmessage:state.cart.message,
        caddedToCart:state.cart.addedToCart,
        cflag:state.cart.flag,
        pisLoading:state.product.isLoading,
        productInformation:state.product.productData,
    }
    
};
const mapDispatchToProps = (dispatch) => {
    return{
          getProduct:(productId)=>dispatch(getProduct(productId)),
        //   getProduct:(productId)
          addToCart: (productId) => dispatch(addToCart(productId)),
          emptyMsg: () => dispatch(emptyMsg())
    }
};

  


export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
