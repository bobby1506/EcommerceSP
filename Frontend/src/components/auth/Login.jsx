import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../redux/actions/userActions";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const navigate=useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const dispatch = useDispatch();
  const { message,flag,isLoading,isAuthenticated } = useSelector((state) => state.user);
  console.log(flag)
  useEffect(() => {
    if (message) {
      alert(message);
    }
    if(isAuthenticated){
      navigate("/")
    }
  }, [flag]);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(formData));
  };


  if(isLoading){
    return <h1>Loading......</h1>
  }
  return (
    <>
      <div
        className="container mt-3 shadow p-5 rounded"
        style={{ maxWidth: "400px" }}
      >
        <form onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
            />
            <p className="text-danger fs-9">{error.email}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
            />
            <p className="text-danger fs-9">{error.password}</p>
          </div>
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
