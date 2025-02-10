import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { loginContext } from "../../context/ContextProvider";
import { toast } from "react-toastify";
import axios from "axios";
import Input from "../common/Input";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
const StoreForm = ({
  store,
  user,
  createStore,
  seller,
  getStore,
  updateStore,
  deleteStore,
  emptyStoreMsg,
}) => {
  const {
    storeData,
    isUpdated,
    message: sellerMessage,
    isDeleted,
    isLoading: sellerLoading,
    flag: sellerFlag,
  } = seller;
  const { message, isLoading, isCreated, flag } = store;
  const { token } = user;
  const [storeImage, setStoreImage] = useState(null);
  const [isChange, setIsChange] = useState(false);
  const [page, setPage] = useState("create");
  const [imgUrl, setImgUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    storeName: "",
    ownerName: "",
    address: "",
    description: "",
    category: "",
    openTime: "",
    closeTime: "",
    gstNumber: "",
    upiId: "",
  });
  const navigate = useNavigate();
  const { contextUserData } = useContext(loginContext);
  let loginToken = contextUserData.token;
  const nameRef = useRef(null);

  useEffect(() => {
    getStore();
  }, []);
  useEffect(() => {
    if (storeData) {
      console.log("storedata", storeData);
      setFormData(storeData);
      setImgUrl(storeData.logo);
      setPage("update");
   
    } 
    // else navigate("/createStore");
  }, [storeData]);

  useEffect(() => {
    if (sellerMessage) {
      if (isUpdated || isDeleted) {
        toast.success(sellerMessage);
      } else toast.error(sellerMessage);
      emptyStoreMsg();
    }
  }, [sellerFlag]);

  useEffect(() => {
    if (message) {
      if (isCreated) {
        toast.success(message);
        navigate("/sellerdashboard/sellerprofile");
      } else {
        toast.error(message);
      }
    }
  }, [flag]);
  useEffect(() => {
    nameRef.current.focus();
    console.log(token);
    if (token || loginToken) {
      token
        ? Cookies.set("authToken", token, { expires: 7 })
        : Cookies.set("authToken", loginToken, { expires: 7 });
    }
  }, []);

  const [logo, setLogo] = useState(null);
  console.log("first", formData);
  const validateForm = (formData) => {
    let errors = {};
    console.log(formData);

    if (!formData.storeName.trim()) errors.storeName = "Store Name is required";
    else if (formData.storeName.length < 3 || formData.storeName.length > 15)
      errors.storeName = "Store Name length should be between 3 & 15";

    if (!formData.ownerName.trim()) errors.ownerName = "Owner Name is required";
    else if (formData.ownerName.length < 3 || formData.ownerName.length > 15)
      errors.ownerName = "Owner Name length should be between 3 & 15";

    if (!formData.address.trim()) errors.address = "Address is required";
    else if (formData.address.length < 5 || formData.address.length > 30)
      errors.address = "Address length should be between 5 & 30";

    if (!formData.description.trim())
      errors.description = "Description is required";
    else if (
      formData.description.length < 3 ||
      formData.description.length > 25
    )
      errors.description = "Description length should be between 3 & 25";

    if (!formData.category) errors.category = "Category is required";

    if (!formData.openTime) errors.openTime = "Open Time is required";

    if (!formData.closeTime) errors.closeTime = "Close Time is required";

    if (!storeImage && page == "create")
      errors.storeImage = "store Image is required";

    if (!formData.gstNumber.trim()) errors.gstNumber = "GST Number is required";
    else if (!/^\d{15}$/.test(formData.gstNumber))
      errors.gstNumber = "GST Number must be 15 digits";

    if (!formData.upiId.trim()) errors.upiId = "UPI ID is required";
    else if (!/^\w+@\w+$/.test(formData.upiId))
      errors.upiId = "Invalid UPI ID format";

    setErrors(errors);
    console.log("dff", errors);
    return Object.keys(errors).length === 0;
  };

  const handleOnDelete = () => {
    const isConfirmed = window.confirm("are you sure to delet your store");
    if (isConfirmed) {
      deleteStore(formData._id);
    } else toast.success("store deleted canceled");
  };

  const handleOnChange = (e) => {
    setIsChange(true);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleOnSubmit = async (e) => {
    let logo = "";
    e.preventDefault();
    if (validateForm(formData)) {
      if (storeImage) {
        let file = storeImage;
        if (file && file.size <= 1 * 1024 * 1024) {
          let data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "ecommSocialPilot");
          data.append("cloud_name", "dd3fbotqv");
          try {
            let res = await axios.post(
              "https://api.cloudinary.com/v1_1/dd3fbotqv/image/upload",
              data
            );
            console.log(res.data.secure_url);
            setImgUrl("res.data.secure_url");
            logo = res.data.secure_url;
          } catch (error) {
            alert(error);
            toast.error(error?.response?.data?.error?.message);
          }
        } else if (!file) return;
        else toast.error("file should be less than 1MB");
      }
      if (isChange)
        page === "create"
          ? createStore({ ...formData, logo })
          : updateStore(formData._id, { ...formData, logo });
      else toast("make some change first");
      setIsChange(false);
      if (isCreated) navigate("sellerdashboard/sellerprofile");
    }
  };
  const option = [
    { value: "", text: "select Category" },
    { value: "retail", text: "Retail" },
    { value: "electronics", text: "Electronics" },
    { value: "grocery", text: "Grocery" },
    { value: "home-appliances", text: "Home-appliances" },
    { value: "other", text: "Other" },
  ];
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Store Information Form</h2>
      <form onSubmit={handleOnSubmit}>
        {/* StoreName */}
        <Input
          label="Store Name"
          type="text"
          className="form-control"
          id="storeName"
          placeholder="Enter store name"
          name="storeName"
          value={formData.storeName}
          onChange={handleOnChange}
          ref={nameRef}
          errors={errors}
        />

        {/*Owner Name*/}
        <Input
          label="Owner Name"
          type="text"
          className="form-control"
          id="ownerName"
          placeholder="Enter store name"
          name="ownerName"
          value={formData.ownerName}
          onChange={handleOnChange}
          errors={errors}
        />

        {/* Address */}
        <TextInput
          label="Address"
          className="form-control"
          id="address"
          rows="3"
          placeholder="Enter address"
          name="address"
          value={formData.address}
          onChange={handleOnChange}
          errors={errors}
        />

        {/* Description */}
        <TextInput
          label="Description"
          className="form-control"
          id="description"
          rows="3"
          placeholder="Enter description"
          name="description"
          value={formData.description}
          onChange={handleOnChange}
          errors={errors}
        />

        {/* Category */}
        <SelectInput
          label="Category"
          className="form-select"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleOnChange}
          options={option}
          errors={errors}
        />

        <div className="mb-3">
          <label className="form-label">Timing</label>
          <div className="row">
            <div className="col">
              <Input
                label="Open Time"
                type="time"
                className="form-control"
                id="openTime"
                placeholder="Open Time"
                name="openTime"
                value={formData.openTime}
                onChange={handleOnChange}
                errors={errors}
              />
            </div>
            <div className="col">
              <Input
                label="Close Time"
                type="time"
                className="form-control"
                id="closeTime"
                placeholder="Close Time"
                name="closeTime"
                value={formData.closeTime}
                onChange={handleOnChange}
                errors={errors}
              />
            </div>
          </div>
        </div>

        {/* gst */}
        <Input
          label="GST NUMBER"
          type="number"
          className="form-control"
          id="gstNumber"
          placeholder="Enter GST number"
          name="gstNumber"
          value={formData.gstNumber}
          onChange={handleOnChange}
          errors={errors}
        />

        {/* UPI id */}
        <Input
          label="UPI ID"
          type="text"
          className="form-control"
          id="upiId"
          placeholder="Enter UPI ID"
          name="upiId"
          value={formData.upiId}
          onChange={handleOnChange}
          errors={errors}
        />
        {imgUrl && (
          <img
            src={imgUrl}
            className="img-fluid rounded-start"
            style={{ objectFit: "cover", height: "150px" }}
          />
        )}
        {/* IMAGE */}
        <Input
          label="UPLOAD LOGO"
          type="file"
          className="form-control"
          name="storeImage"
          id="uploadLogo"
          onChange={(e) => {
            setIsChange(true);
            setStoreImage(e.target.files[0]);
          }}
          errors={errors}
        />

        <button type="submit" className="btn btn-success">
          {page == "update" ? "update" : "Submit"}
        </button>
      </form>
      {storeData && (
        <button onClick={handleOnDelete} className="btn btn-danger">
          Delete
        </button>
      )}
    </div>
  );
};

export default StoreForm;
