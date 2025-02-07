import { connect } from "react-redux";
import { getStores } from "../redux/actions/storeActions";
import StoreContainer from "../components/store/StoreContainer";
import { getUserStatus } from "../redux/actions/userActions";


const mapStateToProps = (state) =>{
    return {
         storeList:state.store.storesArray,
         isLoadings:state.store.isLoading,
         isOwner:state.user.isSeller,
         userToken:state.user.token
    }
};
const mapDispatchToProps = (dispatch) => {
    return{
        getStores:()=> dispatch(getStores()),
        getUser:()=>dispatch(getUserStatus())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreContainer);
