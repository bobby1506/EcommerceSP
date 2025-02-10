
import { BrowserRouter} from "react-router-dom";
import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PrivateRoute from "./components/layouts/PrivateRoute";
import { loginContext } from "./context/ContextProvider";
import { getUserStatus } from "./redux/actions/userActions";
import { url } from "./apiConfig";
import axios from "axios";
import { socket } from "./socket";
import RenderRoutes from "./components/routes/RenderRoutes";
import { routeConfig } from "./components/routes/routeConfig";


const App = () => {
  // const { userData } = useSelector((state) => state?.user);
  // const email = userData?.email;
  // useEffect(() => {
  //   // alert(email);
  //   // if (email) {
  //     // alert("Abeyy hello");

  //     socket.on("connect", () => {
  //       console.log("socket connected");
  //       socket.emit("register", { key: "milton@gmail.com" });
  //     });

  //       socket.on("resultRes", (payload) => {
  //         //action call socket ke liye
  //         dispatch({ type: "SOCKETRESULT", payload });
  //         console.log("socket data", payload);
  //       });

  //       socket.on("delayRes", (payload) => {
  //         dispatch({ type: "SOCKETDELAY", payload });
  //         //action call socket delay ke liye
  //         console.log("socket delay data", payload);
  //       });
  //     return () => {
  //       socket.disconnect();
  //     };
  //   }
  // // }
  // , []);
  const { loginDispatch } = useContext(loginContext);

  const handleUserDetails = async () => {
    try {
      const response = await axios.get(`${url + "getuser"}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      loginDispatch({ type: "GETUSER_FULFILLED", payload: response });
    } catch (error) {
      console.log(error);
    }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    let token = Cookies.get("authToken");
    if (token) {
      dispatch(getUserStatus());
    }
  }, []);

  return (
    <BrowserRouter>
      <RenderRoutes routes={routeConfig} />
    </BrowserRouter>
  );
};

export default App;
