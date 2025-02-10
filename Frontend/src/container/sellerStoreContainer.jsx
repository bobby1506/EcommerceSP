import { connect } from "react-redux";
import { createStore } from "../redux/actions/storeActions";
import SellerStore from "../components/seller/SellerStore";
import { deleteStore, getSellerStore, updateStore } from "../redux/actions/sellerActions";

const mapStateToProps = (state) => ({
    sStoreData:state.seller.storeData,
    sisUpdated:state.seller.isUpdated,                            
    smessage:state.seller.message,
    sisDeleted:state.seller.isDeleted,
    sisLoading:state.seller.sisLoading,
    sflag:state.seller.flag,
});
const mapDispatchToProps = (dispatch) => ({
    sGetStore:()=>dispatch(getSellerStore()),
    sUpdateStore:(storeId,storeData)=>dispatch(updateStore(storeId,storeData)),
    sDeleteStore:(storeId)=>dispatch(deleteStore(storeId)),
    screateStore:(storeData)=>dispatch(createStore(storeData)),
    emptyStoreMsg:()=>dispatch({type:"emptyStoreMsg"})
    
});

export default connect(mapStateToProps, mapDispatchToProps)(SellerStore);
