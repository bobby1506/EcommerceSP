import { connect } from "react-redux";
import { createStore } from "../redux/actions/storeActions";
import Admin from "../pages/Admin";
import SellerOrders from "../components/seller/SellerOrders";
import { getOrdersSeller } from "../redux/actions/orders";

const mapStateToProps = (state) => ({
    seller:state.seller
});
const mapDispatchToProps = (dispatch) => ({
    getOrdersSeller:()=>dispatch(getOrdersSeller())
});

export default connect(mapStateToProps, mapDispatchToProps)(SellerOrders);
