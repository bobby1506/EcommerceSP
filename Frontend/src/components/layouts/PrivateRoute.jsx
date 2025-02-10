import React from "react";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = Cookies.get("authToken");

  
  return token ? children : <Navigate to={"/login"} replace />;
};

export default PrivateRoute;
