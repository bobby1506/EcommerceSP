import { connect } from "react-redux";
import { createStore } from "../redux/actions/storeActions";
import CheckoutForm from "../components/checkout/CheckOutForm";
import { postOrders } from "../redux/actions/orders";

const mapStateToProps = (state) => {
    return{
     cmessage:state.order.message,
     orderedItems:state.cart.cartItems,
     productInfo:state.product.productData,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        postOrders:(orderData)=>dispatch(postOrders(orderData))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
