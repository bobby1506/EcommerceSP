import { connect } from "react-redux";
import StoreForm from "../components/store/StoreForm";
import { createStore } from "../redux/actions/storeActions";

const mapStateToProps = (state) => {
    return {
       smessage:state.store.message,
       sisLoading:state.store.isLoading,
       sisCreated:state.store.isCreated,
       sflag:state.store.flag,
       jwttoken:state.user.token,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        screateStore:(storeData)=>dispatch(createStore(storeData)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreForm);
