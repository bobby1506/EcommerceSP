import React, { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import StoreContainerContainer from "../container/StoreContainerContainer";
import { loginContext } from "../context/ContextProvider";
import { toast } from "react-toastify";

const Home = ({ getStores, emptyOrderMsg, user, order }) => {
  const { token } = user;
  const { message, flag, orderCreated } = order;
  const navigate = useNavigate();
  const { contextUserData } = useContext(loginContext);
  let loginToken = contextUserData.token;
  useEffect(() => {
    if (message) {
      if (orderCreated) toast.success(message);
      else toast.error(message);

      emptyOrderMsg();
    }
  }, [flag]);

  useEffect(() => {
    if (token || loginToken)
      token
        ? Cookies.set("authToken", token, {
            httpOnly: false,
            expires: 7,
            secure: true,
            sameSite: "none",
            path: "/",
          })
        : Cookies.set("authToken", loginToken, {
            httpOnly: false,
            expires: 7,
            secure: true,
            sameSite: "none",
            path: "/",
          });

    const usertoken = Cookies.get("authToken");
    console.log(usertoken, "userToken");
    if (!usertoken) navigate("/login");
    else getStores();
  }, []);

  return <>{<StoreContainerContainer />}</>;
};

export default Home;
