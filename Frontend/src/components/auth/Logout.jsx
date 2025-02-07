import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../../context/ContextProvider";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { loginDispatch } = useContext(loginContext);

  const handleOnLogout = () => {
    Cookies.remove("authToken", { path: "/" });

    dispatch({ type: "USERLOGOUT" });
    loginDispatch({ type: "USERLOGOUT" });
    // navigate("/login", { replace: true });
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 100);
  };

  return (
    <button
      className="btn btn-danger position-relative"
      onClick={handleOnLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
