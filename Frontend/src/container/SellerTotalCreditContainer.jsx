import { connect } from "react-redux";
import { getSellerStore } from "../redux/actions/sellerActions";
import SellerTotalCredit from "../components/seller/SellerTotalCredit";

const mapStateToProps = (state) => ({
    sStore:state.seller.storeData,
});
const mapDispatchToProps = (dispatch) => ({
    getSellerStore:()=> dispatch(getSellerStore()) 
});

export default connect(mapStateToProps, mapDispatchToProps)(SellerTotalCredit);
