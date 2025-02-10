import { connect } from "react-redux";
import { getStores } from "../redux/actions/storeActions";
import StoreContainer from "../components/store/StoreContainer";
import { getUserStatus } from "../redux/actions/userActions";

const mapStateToProps = (state) => ({
  store: state.store,
  isOwner: state.user.isSeller,
});

export default connect(mapStateToProps)(StoreContainer);
