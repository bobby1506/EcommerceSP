import { connect } from "react-redux";
import CheckoutForm from "../components/checkout/CheckOutForm";
import {emptyOrderMsg, postOrders } from "../redux/actions/orders";

const mapStateToProps = (state) => {      
    return{
     order:state.order,
     orderedItems:state.cart.cartItems,
     productInfo:state.product.productData,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        postOrders:(orderData)=>dispatch(postOrders(orderData)),
        emptyOrderMsg:()=>dispatch(emptyOrderMsg())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
