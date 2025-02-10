import { connect } from "react-redux";
import { createStore } from "../redux/actions/storeActions";
import { getOrders } from "../redux/actions/orders";
import Orders from "../pages/Orders";

const mapStateToProps = (state) => ({
    order:state.order
});
const mapDispatchToProps = (dispatch) => ({
    getOrders:()=>{dispatch(getOrders())}
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
