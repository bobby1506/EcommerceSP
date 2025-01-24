import { connect } from "react-redux";
import Home from "../pages/Home";
import { getStores } from "../redux/actions/storeActions";

const mapStateToProps = (state) =>{
    return {
         jwttoken:state.user.token,
    }
};
const mapDispatchToProps = (dispatch) => {
    return{
        getStores:getStores(),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
