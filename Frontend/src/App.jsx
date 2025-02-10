import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/layouts/Navbar";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Main from "./components/layouts/Main";
import HomeContainer from "./container/HomeContainer";
import Products from "./pages/Products";
import ProductsContainer from "./container/ProductsContainer";
import ProductDetailContainer from "./container/ProductDetailContainer";
import SellerContainer from "./container/SellerContainer";
import StoreFormContainer from "./container/StoreFormContainer";
import SellerProducts from "./components/seller/SellerProducts";
import SellerProductsContainer from "./container/SellerProductsContainer";
import ProductFormContainer from "./container/productFormContainer";
import Cart from "./pages/Cart";
import CartContainer from "./container/CartContainer";
import CheckoutForm from "./components/checkout/CheckOutForm";
import CheckOutContainer from "./container/CheckOutContainer";
import Orders from "./pages/Orders";
import OrderContainer from "./container/OrderContainer";
import SellerOrders from "./components/seller/SellerOrders";
import SellerOrderContainer from "./container/SellerOrderContainer";
import SellerProfile from "./components/seller/SellerProfile";
import SellerStore from "./components/seller/SellerStore";
import SellerStoreContainer from "./container/sellerStoreContainer";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import SellerBalance from "./components/seller/SellerBalance";
import SellerBalanceContainer from "./container/SellerBalanceContainer";
import { useEffect } from "react";
import { socket } from "../src/socketFrontend.js";
import PrivateRoute from "./components/layouts/PrivateRoute";
import SellerTotalCreditContainer from "./container/SellerTotalCreditContainer";

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("register", { key: "b@gmail.com" });
    });

    socket.on("resultRes", (data) => {
      console.log("Received update from socket:", data);
    });

    socket.on("delayRes", (data) => {
      console.log("Received delay notification via socket (delayRes):", data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <BrowserRouter>
      <RenderRoutes routes={routeConfig} />
    </BrowserRouter>
  );
};

export default App;
