import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/layouts/Navbar';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Main from './components/layouts/Main';
import HomeContainer from './container/HomeContainer';
import Products from './pages/Products';
import ProductsContainer from './container/ProductsContainer';
import ProductDetailContainer from './container/ProductDetailContainer';
import SellerContainer from './container/SellerContainer';
import StoreFormContainer from './container/StoreFormContainer';
import SellerProducts from './components/seller/SellerProducts';
import SellerProductsContainer from './container/SellerProductsContainer';
import ProductFormContainer from './container/productFormContainer';
import Cart from './pages/Cart';
import CartContainer from './container/CartContainer';
import CheckoutForm from './components/checkout/CheckOutForm';
import CheckOutContainer from './container/CheckOutContainer';
import Orders from './pages/Orders';
import OrderContainer from './container/OrderContainer';
import SellerOrders from './components/seller/SellerOrders'
import SellerOrderContainer from './container/SellerOrderContainer';
import SellerProfile from './components/seller/SellerProfile';

function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Main><HomeContainer/></Main>}/> 
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/products/:storeId' element={<Main><ProductsContainer/></Main>}/>
    <Route path='/products/:storeId/:productId' element={<Main><ProductDetailContainer/></Main>}/>
    <Route path='/sellerdashboard' element={<Main><SellerContainer/></Main>}/>
    <Route path='/createstore' element={<Main><StoreFormContainer/></Main>}/>    
    <Route path='/sellerdashboard/sellerprofile' element={<Main><SellerContainer><SellerProfile/></SellerContainer></Main>}/> 
    <Route path='/sellerdashboard/sellerproducts' element={<Main><SellerContainer><SellerProductsContainer/></SellerContainer></Main>}/> 
    <Route path='/sellerdashboard/sellerorders' element={<Main><SellerContainer><SellerOrderContainer/></SellerContainer></Main>}/> 
    <Route path='/sellerdashboard/sellerproducts/addproduct' element={<Main><ProductFormContainer/></Main>}/> 
    <Route path='/cart' element={<Main><CartContainer/></Main>}/> 
    <Route path='/Checkout/:isCartStatus' element={<Main><CheckOutContainer/></Main>}/>
    <Route path='/orders' element={<Main><OrderContainer/></Main>}/>
    
  </Routes>
  
  </BrowserRouter>
  );
}

export default App;
