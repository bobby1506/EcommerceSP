import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Logout from "../components/auth/Logout";
import { loginContext } from "../context/ContextProvider";

const Seller = ({ children }) => {
  const navigate = useNavigate();
  const jwttoken = useSelector((state) => state.user.token);
  // const storeId=useSelector((state)=>)
  const { contextUserData } = useContext(loginContext);
  let loginToken = contextUserData.token;
  let contextStoreId = contextUserData.storeId;

  useEffect(() => {
    // if(!contextStoreId){
    //   navigate('/createstore')
    // }

    if (jwttoken || loginToken) {
      jwttoken
        ? Cookies.set("authToken", jwttoken, { expires: 7 })
        : Cookies.set("authToken", loginToken, { expires: 7 });
    }
  }, [contextUserData]);

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
              <Link
                to="/sellerdashboard/sellerprofile"
                className="nav-link text-black"
              >
                <i className="bi bi-speedometer2"></i> Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/sellerdashboard/sellerstore"
                className="nav-link text-black"
              >
                <i className="bi bi-cash"></i> Store
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/sellerdashboard/sellerorders"
                className="nav-link text-black"
              >
                <i className="bi bi-cart-check"></i> All Orders
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/sellerdashboard/sellerproducts"
                className="nav-link text-black"
              >
                <i className="bi bi-box-seam"></i> All Products
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="#withdraw" className="nav-link text-black">
                <i className="bi bi-cash"></i> Withdraw Money
              </Link>
            </li> */}
            <li className="nav-item">
              <Link
                to="/sellerdashboard/sellertotalcredit"
                className="nav-link text-black"
              >
                <i className="bi bi-cash"></i> Todays Credit
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/sellerdashboard/SellerBalance"
                className="nav-link text-black"
              >
                <i className="bi bi-cash"></i> Balance
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-black">
                <Logout />
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
