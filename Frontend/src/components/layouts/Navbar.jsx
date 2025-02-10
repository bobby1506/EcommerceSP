import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Logout from "../auth/Logout";
import { navConfig } from "../constant/navConfig";

const Navbar = () => {
  const [cartItemCount, setCartItemCount] = useState(0);

 
//  const cartItemCount=useSelector((state)=>state.cart.totalItems)

  

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Ebazar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {navConfig.map((Items,index)=>(
                <li className="nav-item" key={index}>
                <Link className={Items.className} aria-current="page" to={Items.to}>
                  {Items.text}
                </Link>
              </li>
              ))}
            </ul>
            {/* Cart button on the right */}
            <ul className="navbar-nav ms-auto">
              <li className="nav-item position-relative">
                <Link className="nav-link" to="/cart">
                  <button className="btn btn-success position-relative">
                    Cart
                    {cartItemCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                        {cartItemCount}
                      </span>
                    )}
                  </button>
                </Link>
              </li>
              <li className="nav-item position-relative">
                <Link className="nav-link">
              <Logout/>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
