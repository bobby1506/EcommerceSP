import { connect } from "react-redux";
import Home from "../pages/Home";
import { getStores } from "../redux/actions/storeActions";
import { getUserStatus } from "../redux/actions/userActions";

const mapStateToProps = (state) =>{
    return {
         jwttoken:state.user.token,
         isSeller:state.user.isSeller
    }
};
const mapDispatchToProps = (dispatch) => {
    return{
        getStores:getStores(),
        getUser:getUserStatus()
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
