import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Logout from "../components/auth/Logout";
import { loginContext } from "../context/ContextProvider";
import { sidebarConfig } from "../components/constant/sidebarConfig";
import { getSellerStore } from "../redux/actions/sellerActions";

const Seller = ({ children }) => {
  const navigate = useNavigate();
  const jwttoken = useSelector((state) => state.user.token);
  const storeData = useSelector((state) => state.store.storeData);
  const dispatch = useDispatch();

  const { contextUserData } = useContext(loginContext);
  let loginToken = contextUserData.token;
  let contextStoreId = contextUserData.storeId;

  useEffect(() => {
    dispatch(getSellerStore());
  }, []);

  useEffect(() => {
    if (!storeData) {
      console.log("firDDst",storeData)
      // navigate("/createStore");
    }
  }, [storeData]);

  useEffect(() => {
    if (jwttoken || loginToken)
      jwttoken
        ? Cookies.set("authToken", jwttoken, { expires: 7 })
        : Cookies.set("authToken", loginToken, { expires: 7 });
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
            {sidebarConfig.map((items, index) => (
              <li className="nav-item" key={index}>
                <Link to={items.to} className={items.className}>
                  {items.text}
                </Link>
              </li>
            ))}

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
