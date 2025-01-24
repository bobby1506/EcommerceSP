import { connect } from "react-redux";
import { createStore } from "../redux/actions/storeActions";
import ProductForm from "../components/product/ProductForm";
import { addSellerProduct } from "../redux/actions/sellerActions";

const mapStateToProps = (state) => {
return{
    smessage:state.seller.message,
    sflag:state.seller.flag,
    sproductCreated:state.seller.productCreated
}
};
const mapDispatchToProps = (dispatch) => {
    return{
        addProduct:(productData)=>{dispatch(addSellerProduct(productData))},
        emptymsg:()=>{dispatch({type:"emptymsg" ,payload:""})}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
