import { connect } from "react-redux";
import CheckoutForm from "../components/checkout/CheckOutForm";
import { emptyMsg, emptyOrderMsg, postOrders } from "../redux/actions/orders";

const mapStateToProps = (state) => {      
    return{
     cmessage:state.order.message,
     orderedItems:state.cart.cartItems,
     cflag:state.order.flag,
     corderCreated:state.order.orderCreated,
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
