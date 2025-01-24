import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
const [cartItemCount, setCartItemCount] = useState(0);

useEffect(() => {
  const cartData = JSON.parse(localStorage.getItem("cart"));
  setCartItemCount(cartData?.cartItems.length || 0);
}, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="#">
                  About us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="#">
                  Contact us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/orders">
                  Orders
                </Link>
              </li>
            </ul>
            {/* Cart button on the right */}
            <ul className="navbar-nav ms-auto">
              <li className="nav-item position-relative">
                <Link className="nav-link" to="/cart">
                  <button className="btn btn-danger position-relative">
                    Cart
                    {cartItemCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                        {cartItemCount}
                      </span>
                    )}
                  </button>
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
