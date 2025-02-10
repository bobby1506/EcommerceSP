import { connect } from "react-redux";
import Home from "../pages/Home";
import { getStores } from "../redux/actions/storeActions";
import { emptyOrderMsg } from "../redux/actions/orders";

const mapStateToProps = (state) => ({
  user: state.user,
  order: state.order,
 
});
const mapDispatchToProps = (dispatch) => ({
  getStores: () => dispatch(getStores()),
  emptyOrderMsg: () => dispatch(emptyOrderMsg()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
