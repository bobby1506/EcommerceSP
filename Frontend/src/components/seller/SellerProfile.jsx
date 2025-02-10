import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserStatus } from "../../redux/actions/userActions";

const SellerProfile = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });

  const dispatch = useDispatch();
  const data = useSelector((state) => state.user.userData);
  useEffect(() => {
    dispatch(getUserStatus());
  }, []);
  useEffect(() => {
    setUserData(data);
  }, [data]);

  return (
    <>
      <div className="container mt-4">
        <h2>Profile Page</h2>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={userData.username || ""}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={userData.email || ""}
          />
        </div>
      </div>
    </>
  );
};

export default SellerProfile;
