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
            <PrivateRoute>
              <Main>
                <AboutUs />
              </Main>
            </PrivateRoute>
          }
        />
        <Route
          path="/contactus"
          element={
            <PrivateRoute>
              <Main>
                <ContactUs />
              </Main>
            </PrivateRoute>
          }
        />
        <Route
          path="/products/:storeId"
          element={
            <PrivateRoute>
              <Main>
                <ProductsContainer />
              </Main>
            </PrivateRoute>
          }
        />
        <Route
          path="/products/:storeId/:productId"
          element={
            <PrivateRoute>
              <Main>
                <ProductDetailContainer />
              </Main>
            </PrivateRoute>
          }
        />
        <Route path="/sellerdashboard" element={<SellerContainer />} />
        <Route
          path="/createstore"
          element={
            // <PrivateRoute>
            <StoreFormContainer />
            // </PrivateRoute>
          }
        />
        <Route
          path="/sellerdashboard/sellerprofile"
          element={
            <SellerContainer>
              <PrivateRoute>
                <SellerProfile />
              </PrivateRoute>
            </SellerContainer>
          }
        />
        <Route
          path="/sellerdashboard/sellerstore"
          element={
            <SellerContainer>
              <PrivateRoute>
                <SellerStoreContainer />
              </PrivateRoute>
            </SellerContainer>
          }
        />
        <Route
          path="/sellerdashboard/sellerproducts"
          element={
            <SellerContainer>
              <PrivateRoute>
                <SellerProductsContainer />
              </PrivateRoute>
            </SellerContainer>
          }
        />
        <Route
          path="/sellerdashboard/sellerorders"
          element={
            <SellerContainer>
              <PrivateRoute>
                <SellerOrderContainer />
              </PrivateRoute>
            </SellerContainer>
          }
        />
        <Route
          path="/sellerdashboard/sellerproducts/addproduct"
          element={
            <SellerContainer>
              <PrivateRoute>
                <ProductFormContainer />
              </PrivateRoute>
            </SellerContainer>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Main>
                <CartContainer />
              </Main>
            </PrivateRoute>
          }
        />
        <Route
          path="/Checkout/:isCartStatus"
          element={
            <PrivateRoute>
              <Main>
                <CheckOutContainer />
              </Main>
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Main>
                <OrderContainer />
              </Main>
            </PrivateRoute>
          }
        />
        <Route
          path="/sellerdashboard/sellerbalance"
          element={
            <SellerContainer>
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
            </SellerContainer>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
