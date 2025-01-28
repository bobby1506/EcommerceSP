import React, { useEffect } from "react";
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


const Home = ({jwttoken}) => {
  const navigate=useNavigate();
  
  useEffect(() => {
    console.log("jwttoken",jwttoken)
    if (jwttoken) {
      Cookies.set("authToken", jwttoken, { expires: 7 }); 
    }
    const token = Cookies.get("authToken");
    if (!token) {
      navigate("/login"); 
    }
    
  }, []);

  return (
    <>
    <StoreContainerContainer/>
    </>
  );
};

export default Home;
