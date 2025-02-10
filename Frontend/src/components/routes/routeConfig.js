import CartContainer from "../../container/CartContainer";
import CheckOutContainer from "../../container/CheckOutContainer";
import HomeContainer from "../../container/HomeContainer";
import OrderContainer from "../../container/OrderContainer";
import ProductDetailContainer from "../../container/ProductDetailContainer";
import ProductFormContainer from "../../container/productFormContainer";
import ProductsContainer from "../../container/ProductsContainer";
import SellerBalanceContainer from "../../container/SellerBalanceContainer";
import SellerOrderContainer from "../../container/SellerOrderContainer";
import SellerProductsContainer from "../../container/SellerProductsContainer";
import SellerTotalCreditContainer from "../../container/SellerTotalCreditContainer";
import StoreFormContainer from "../../container/StoreFormContainer";
import AboutUs from "../../pages/AboutUs";
import ContactUs from "../../pages/ContactUs";
import Seller from "../../pages/Seller";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import Main from "../layouts/Main";
import SellerProfile from "../seller/SellerProfile";

export const routeConfig = [
    { path: "/", element: <Main><HomeContainer /></Main>, isPrivate: false },
    { path: "/login", element: <Login />, isPrivate: false },
    { path: "/signup", element: <SignUp />, isPrivate: false },
    { path: "/aboutus", element: <Main><AboutUs /></Main>, isPrivate: true },
    { path: "/contactus", element: <Main><ContactUs /></Main>, isPrivate: true },
    { path: "/products/:storeId", element: <Main><ProductsContainer /></Main>, isPrivate: true },
    { path: "/products/:storeId/:productId", element: <Main><ProductDetailContainer /></Main>, isPrivate: true },
    { path: "/createstore", element: <StoreFormContainer />, isPrivate: false },
    { path: "/sellerdashboard", element: <Seller/>, isPrivate: false },
    { path: "/sellerdashboard/sellerprofile", element: <Seller><SellerProfile /></Seller>, isPrivate: true },
    { path: "/sellerdashboard/sellerstore", element: <Seller><StoreFormContainer /></Seller>, isPrivate: true },
    { path: "/sellerdashboard/sellerproducts", element: <Seller><SellerProductsContainer /></Seller>, isPrivate: true },
    { path: "/sellerdashboard/sellerproducts/addproduct", element: <Seller><ProductFormContainer /></Seller>, isPrivate: true },
    { path: "/sellerdashboard/sellerorders", element: <Seller><SellerOrderContainer /></Seller>, isPrivate: true },
    { path: "/sellerdashboard/sellerbalance", element: <Seller><SellerBalanceContainer /></Seller>, isPrivate: true },
    { path: "/sellerdashboard/sellertotalcredit", element: <Seller><SellerTotalCreditContainer /></Seller>, isPrivate: true },
    { path: "/cart", element: <Main><CartContainer /></Main>, isPrivate: true },
    { path: "/Checkout/:isCartStatus", element: <Main><CheckOutContainer /></Main>, isPrivate: true },
    { path: "/orders", element: <Main><OrderContainer /></Main>, isPrivate: true },
  ];
  
 