import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    isSeller:false
  });

  const navigate=useNavigate();
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const { message, flag,isAuthenticated,isSeller} = useSelector((state) => state.user);
  useEffect(() => {
    if (flag) {
      if(message){
        alert(isAuthenticated)
      }

      if(isAuthenticated && !isSeller){
        alert("hello")
         navigate('/')
      }
      if(isAuthenticated && isSeller){
        alert("jello")
        navigate('/createstore')
      }
    }
  }, [flag]);
  

const handleOnChange = (e) => {
  const { name, value, type } = e.target;
  setFormData((prev) => {
    return {
      ...prev,
      [name]: type === "radio" ? value === "true" : value,
    };
  });
};

  const handleValidation = (values) => {
    let error = {};
    let emailregx =
      /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/;

    //username validation
    if (!values.username) {
      error.username = "first enter you name";
    } else if (values.username.length < 3) {
      error.username = "enter more than 3 char";
    }

    //email validation
    if (!values.email) {
      error.email = "first enter your email";
    } else if (!emailregx.test(values.email)) {
      error.email = "enter a valid email";
    }

    //password validation
    if (values.password.length < 8 || values.password.length > 12) {
      error.password = "length should between 8-12";
    }
    if (!/[A-Z]/.test(values.password)) {
      error.password = "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(values.password)) {
      error.password = "Password must contain at least one lowercase letter.";
    }
    if (!/\d/.test(values.password)) {
      error.password = "Password must contain at least one number.";
    }
    if (!/[!@#$%^&*]/.test(values.password)) {
      error.password = "Password must contain at least one special character.";
    }
    if (!values.password) {
      error.password = "first enter password";
    }
    return error;
  };

  const handleOnSubmit = async(e) => {
    e.preventDefault();
    const validateError = handleValidation(formData);
    setError(validateError);
    if (Object.keys(validateError).length === 0) {
      console.log(formData)
      // try{
        dispatch(userRegister(formData));
      // }catch(error){

      // }

      
    } 
  };
  // if(isLoading){
  //   return <h1>Loading......</h1>
  // }
  return (
    <>
      <div
        className="container mt-3 shadow p-5 rounded"
        style={{ maxWidth: "400px" }}
      >
        <form onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleOnChange}
            />
            <p className="text-danger fs-9">{error.username}</p>
          </div>
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
          <div className="mb-3">
            <div>isSeller</div>
            <label className="me-3">
              <input type="radio" name="isSeller" value={true}  onChange={handleOnChange} />
               yes
            </label>
            <label >
              <input type="radio" name="isSeller" value={false}  onChange={handleOnChange} />
              no
            </label>
          </div>
          <button className="btn btn-primary" type="submit">
            SignUp
          </button>
        </form>

        <p className="mt-5">
          Already have a account?{" "}
          <Link to={"/login"} className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </>
  );
};




export default SignUp;
