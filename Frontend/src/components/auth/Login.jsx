import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../redux/actions/userActions";
import { ToastContainer, toast } from "react-toastify";
import { loginContext } from "../../context/ContextProvider";
import axios from "axios";
import { url } from "../../apiConfig";
import Input from "../common/Input";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const dispatch = useDispatch();
  const { contextUserData, loginDispatch } = useContext(loginContext);

  const { message, flag, isLoading, isAuthenticated, isSeller } =
    contextUserData;

  useEffect(() => {
    if (message) {
      if (isAuthenticated) toast.success(message);
      else toast.error(message);

      loginDispatch({ type: "emptyMsg" });
    }

    if (isAuthenticated && !isSeller) {
      navigate("/");
    }
    if (isAuthenticated && isSeller) {
      navigate("/sellerdashboard/");
    }
  }, [flag]);

  const handleOnFetch = async () => {
    try {
      loginDispatch({ type: "LOGIN_PENDING" });
      const response = await axios.post(`${url}login`, formData);
      loginDispatch({
        type: "LOGIN_FULFILLED",
        payload: response,
      });
    } catch (error) {
      loginDispatch({ type: "LOGIN_REJECTED", payload: error });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleOnFetch();
    // dispatch(userLogin(formData));
  };

  if (isLoading) {
    return <h1>Loading......</h1>;
  }
  return (
    <>
      <h1 className="container">LOGIN</h1>
      <div
        className="container mt-3 shadow p-5 rounded"
        style={{ maxWidth: "400px" }}
      >
        <form onSubmit={handleOnSubmit}>
          <Input
            label="Email"
            type="text"
            className="form-control"
            id="email"
            placeholder="Enter your emil Id"
            name="email"
            value={formData.email}
            onChange={handleOnChange}
          />
          <Input
            label="Password"
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleOnChange}
          />

          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>

        <p className="mt-5">
          Create new Account{" "}
          <Link to={"/signup"} className="text-primary">
            SignUp
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
