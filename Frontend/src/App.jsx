import logo from "./logo.svg";
import "./App.css";
<<<<<<< HEAD
import { BrowserRouter, Route, Routes } from "react-router-dom";
=======
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
>>>>>>> baeff40c40275dcb68589a938b88f598b91850fe
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
<<<<<<< HEAD
import { useEffect } from "react";
import { socket } from "../src/socketFrontend.js";

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("register", { key: "b@gmail.com" }); // Replace with actual key
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
=======
import SellerTotalCreditContainer from "./container/SellerTotalCreditContainer";
import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PrivateRoute from "./components/layouts/PrivateRoute";
import { loginContext } from "./context/ContextProvider";
import { getUserStatus } from "./redux/actions/userActions";
import { url } from "./apiConfig";
import axios from "axios";
import { socket } from "./socket";

function App() {
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
      handleUserDetails();
      dispatch(getUserStatus());
    }
  }, []);

>>>>>>> baeff40c40275dcb68589a938b88f598b91850fe
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Main>
              <HomeContainer />
            </Main>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/aboutus"
          element={
<<<<<<< HEAD
            <Main>
              <AboutUs />
            </Main>
=======
            <PrivateRoute>
              <Main>
                <AboutUs />
              </Main>
            </PrivateRoute>
>>>>>>> baeff40c40275dcb68589a938b88f598b91850fe
          }
        />
        <Route
          path="/contactus"
          element={
<<<<<<< HEAD
            <Main>
              <ContactUs />
            </Main>
=======
            <PrivateRoute>
              <Main>
                <ContactUs />
              </Main>
            </PrivateRoute>
>>>>>>> baeff40c40275dcb68589a938b88f598b91850fe
          }
        />
        <Route
          path="/products/:storeId"
          element={
<<<<<<< HEAD
            <Main>
              <ProductsContainer />
            </Main>
=======
            <PrivateRoute>
              <Main>
                <ProductsContainer />
              </Main>
            </PrivateRoute>
>>>>>>> baeff40c40275dcb68589a938b88f598b91850fe
          }
        />
        <Route
          path="/products/:storeId/:productId"
          element={
<<<<<<< HEAD
            <Main>
              <ProductDetailContainer />
            </Main>
=======
            <PrivateRoute>
              <Main>
                <ProductDetailContainer />
              </Main>
            </PrivateRoute>
>>>>>>> baeff40c40275dcb68589a938b88f598b91850fe
          }
        />
        <Route path="/sellerdashboard" element={<SellerContainer />} />
        <Route
          path="/createstore"
          element={
<<<<<<< HEAD
            <Main>
              <StoreFormContainer />
            </Main>
=======
            // <PrivateRoute>
            <StoreFormContainer />
            // </PrivateRoute>
>>>>>>> baeff40c40275dcb68589a938b88f598b91850fe
          }
        />
        <Route
          path="/sellerdashboard/sellerprofile"
          element={
            <SellerContainer>
<<<<<<< HEAD
              <SellerProfile />
=======
              <PrivateRoute>
                <SellerProfile />
              </PrivateRoute>
>>>>>>> baeff40c40275dcb68589a938b88f598b91850fe
            </SellerContainer>
          }
        />
        <Route
          path="/sellerdashboard/sellerstore"
          element={
            <SellerContainer>
<<<<<<< HEAD
              <SellerStoreContainer />
=======
              <PrivateRoute>
                <SellerStoreContainer />
              </PrivateRoute>
>>>>>>> baeff40c40275dcb68589a938b88f598b91850fe
            </SellerContainer>
          }
        />
        <Route
          path="/sellerdashboard/sellerproducts"
          element={
            <SellerContainer>
<<<<<<< HEAD
              <SellerProductsContainer />
=======
              <PrivateRoute>
                <SellerProductsContainer />
              </PrivateRoute>
>>>>>>> baeff40c40275dcb68589a938b88f598b91850fe
            </SellerContainer>
          }
        />
        <Route
          path="/sellerdashboard/sellerorders"
          element={
            <SellerContainer>
<<<<<<< HEAD
              <SellerOrderContainer />
=======
              <PrivateRoute>
                <SellerOrderContainer />
              </PrivateRoute>
>>>>>>> baeff40c40275dcb68589a938b88f598b91850fe
            </SellerContainer>
          }
        />
        <Route
          path="/sellerdashboard/sellerproducts/addproduct"
          element={
<<<<<<< HEAD
            <Main>
              <ProductFormContainer />
            </Main>
=======
            <SellerContainer>
              <PrivateRoute>
                <ProductFormContainer />
              </PrivateRoute>
            </SellerContainer>
>>>>>>> baeff40c40275dcb68589a938b88f598b91850fe
          }
        />
        <Route
          path="/cart"
          element={
<<<<<<< HEAD
            <Main>
              <CartContainer />
            </Main>
=======
            <PrivateRoute>
              <Main>
                <CartContainer />
              </Main>
            </PrivateRoute>
>>>>>>> baeff40c40275dcb68589a938b88f598b91850fe
          }
        />
        <Route
          path="/Checkout/:isCartStatus"
          element={
<<<<<<< HEAD
            <Main>
              <CheckOutContainer />
            </Main>
=======
            <PrivateRoute>
              <Main>
                <CheckOutContainer />
              </Main>
            </PrivateRoute>
>>>>>>> baeff40c40275dcb68589a938b88f598b91850fe
          }
        />
        <Route
          path="/orders"
          element={
<<<<<<< HEAD
            <Main>
              <OrderContainer />
            </Main>
=======
            <PrivateRoute>
              <Main>
                <OrderContainer />
              </Main>
            </PrivateRoute>
>>>>>>> baeff40c40275dcb68589a938b88f598b91850fe
          }
        />
        <Route
          path="/sellerdashboard/sellerbalance"
          element={
            <SellerContainer>
<<<<<<< HEAD
              <SellerBalanceContainer />
=======
              <PrivateRoute>
                <SellerBalanceContainer />
              </PrivateRoute>
            </SellerContainer>
          }
        />
        <Route
          path="/sellerdashboard/sellertotalcredit"
          element={
            <SellerContainer>
              <PrivateRoute>
                <SellerTotalCreditContainer />
              </PrivateRoute>
>>>>>>> baeff40c40275dcb68589a938b88f598b91850fe
            </SellerContainer>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
