import { connect } from "react-redux";
import { createStore } from "../redux/actions/storeActions";
import SellerStore from "../components/seller/SellerStore";
import { deleteStore, getSellerStore, updateStore } from "../redux/actions/sellerActions";

const mapStateToProps = (state) => ({
    sStoreData:state.seller.storeData
});
const mapDispatchToProps = (dispatch) => ({
    sGetStore:()=>dispatch(getSellerStore()),
    sUpdateStore:(storeId,storeData)=>dispatch(updateStore(storeId,storeData)),
    sDeleteStore:(storeId)=>dispatch(deleteStore(storeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SellerStore);
