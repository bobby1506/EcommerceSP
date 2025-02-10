import { connect } from "react-redux";
import StoreForm from "../components/store/StoreForm";
import { createStore } from "../redux/actions/storeActions";
import { deleteStore, getSellerStore, updateStore } from "../redux/actions/sellerActions";

const mapStateToProps = (state) => ({
  store: state.store,
  seller:state.seller,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  createStore: (storeData) => dispatch(createStore(storeData)),
  getStore: () => dispatch(getSellerStore()),
  updateStore: (storeId, storeData) =>
    dispatch(updateStore(storeId, storeData)),
  deleteStore: (storeId) => dispatch(deleteStore(storeId)),
  emptyStoreMsg: () => dispatch({ type: "emptyStoreMsg" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreForm);
