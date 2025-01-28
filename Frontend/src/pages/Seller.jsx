import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const Seller = ({ children }) => {
    const navigate=useNavigate();
    const jwttoken=useSelector((state)=>state.user.token)
    
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
      <div className="d-flex" style={{ height: "100vh" }}>
        {/* Sidebar */}
        <div
          className="bg-light text-danger p-3"
          style={{ width: "250px", minHeight: "100%" }}
        >
          <h4 className="text-center mb-4">Seller Panel</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/sellerdashboard/sellerprofile" className="nav-link text-black">
                <i className="bi bi-speedometer2"></i> Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/sellerdashboard/sellerorders" className="nav-link text-black">
                <i className="bi bi-cart-check"></i> All Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/sellerdashboard/sellerproducts" className="nav-link text-black">
                <i className="bi bi-box-seam"></i> All Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#withdraw" className="nav-link text-black">
                <i className="bi bi-cash"></i> Withdraw Money
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#withdraw" className="nav-link text-black">
                <i className="bi bi-cash"></i> Todays Credit
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/sellerdashboard/SellerBalance" className="nav-link text-black">
                <i className="bi bi-cash"></i> Balance
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/sellerdashboard/sellerstore" className="nav-link text-black">
                <i className="bi bi-cash"></i> Store
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow-1 p-4">
          <div> {children}</div>
        </div>
      </div>
    </>
  );
};

export default Seller;
