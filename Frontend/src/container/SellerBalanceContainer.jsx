import { connect } from "react-redux";
import { createStore } from "../redux/actions/storeActions";
import Admin from "../pages/Admin";
import SellerBalance from "../components/seller/SellerBalance";
import { getSellerStore } from "../redux/actions/sellerActions";

const mapStateToProps = (state) => ({
    sStore:state.seller.storeData,
});
const mapDispatchToProps = (dispatch) => ({
    getSellerStore:()=> dispatch(getSellerStore()) 
});

export default connect(mapStateToProps, mapDispatchToProps)(SellerBalance);
