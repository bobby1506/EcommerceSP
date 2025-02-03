import React, { useContext, useEffect, useState } from "react";
import CartCard from "../components/cart/CartCard";
import StoreCard from "../components/store/StoreCard";
import SignUp from "../components/auth/SignUp";
import Login from "../components/auth/Login";
import ProductForm from "../components/product/ProductForm";
import StoreForm from "../components/store/StoreForm";
import ProductCard from "../components/product/ProductCard";
import ProductDetail from "./productDetail";
import Cookies from "js-cookie";
import AdminSidebar from "./Admin";
import { useNavigate } from "react-router-dom";
import StoreContainerContainer from "../container/StoreContainerContainer";
import { loginContext } from "../context/ContextProvider";

const Home = ({ jwttoken,getStores}) => {
  const navigate = useNavigate();
  const { contextUserData } = useContext(loginContext);
  let loginToken = contextUserData.token;
  // let [token,setToken]=useState()
  useEffect(() => {
    if (jwttoken || loginToken) {
      jwttoken
        ? Cookies.set("authToken", jwttoken, { expires: 7 })
        : Cookies.set("authToken", loginToken, { expires: 7 });
    }

    const token = Cookies.get("authToken");
    if (!token) {
      navigate("/login");
    }
    else{
      getStores();
    }
  }, []);

  return (
    <>
      {<StoreContainerContainer />}
    </>
  );
};

export default Home;
