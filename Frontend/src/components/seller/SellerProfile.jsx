import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserStatus } from "../../redux/actions/userActions";
import { getStore } from "../../redux/actions/storeActions";

const SellerProfile = () => {
  const [userData, setUserData] = useState({
    name:"",
    email:"",
    upiId:"",
    gstNumber:"",

  });

  const nameRef = useRef()

  const dispatch=useDispatch();
  const data=useSelector((state)=>state.user.userData);
  console.log("first",data)
  useEffect(()=>{
    console.log("useeffect 1 runs")
    dispatch(getUserStatus())
  },[])
  useEffect(()=>{
    console.log("useEffect 2 running",data)
    setUserData(data.data);
  },[data])

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = () => {
    console.log("Updated Profile Data:", userData);
  };
if(!userData){return null}
else{
    console.log(userData.name)
}
  return (
    <div className="container mt-4">
      <h2>Profile Page</h2>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input type="text" className="form-control" name="name" value={userData.username ||""} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" name="email" value={userData.email||""} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">UPI ID</label>
        <input type="text" className="form-control" name="upiId" value={userData.upiId ||""} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">GST Number</label>
        <input type="text" className="form-control" name="gstNumber" value={userData.gstNumber||""} onChange={handleChange} />
      </div>
   
      
      <button className="btn btn-primary mt-5" onClick={handleSubmit}>Update Profile</button>
    </div>
  );
};

export default SellerProfile;
