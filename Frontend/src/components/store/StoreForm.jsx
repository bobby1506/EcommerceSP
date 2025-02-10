import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import { useDispatch, useSelector } from "react-redux";
// import { socket } from "../../socket";
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
  // const dispatch = useDispatch();
  // const { email } = useSelector((state) => {
  //   return state?.user?.userData;
  // });

  // useEffect(() => {
  //   console.log("email", { email, socket });

  //   socket.on("connect", () => {
  //     console.log("socket connected");
  //     socket.emit("register", { key: email });
  //   });

  //   socket.on("resultRes", (payload) => {
  //     //action call socket ke liye
  //     dispatch({ type: "SOCKETRESULT", payload });
  //     console.log("socket data", payload);
  //   });

  //   socket.on("delayRes", (payload) => {
  //     dispatch({ type: "SOCKETDELAY", payload });
  //     //action call socket delay ke liye
  //     console.log("socket delay data", payload);
  //   });
  //   // return () => {
  //   //   socket.disconnect();
  //   // };
  // }, [socket.connected]);

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
    isBranch: "",
    logo: "",
  });
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { contextUserData } = useContext(loginContext);
  let loginToken = contextUserData.token;
  const nameRef = useRef(null);

  useEffect(() => {
    if (smessage) {
      if (sisCreated) {
        toast.success(smessage);
        navigate("/sellerdashboard/sellerprofile");
      } else {
        toast.error(smessage);
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

  // const [socialMediaLinks, setSocialMediaLinks] = useState([
  //   { platform: "", link: "" },
  // ]);

  // const addSocialMediaField = () => {
  //   setSocialMediaLinks([...socialMediaLinks, { platform: "", link: "" }]);
  // };
  const [logo, setLogo] = useState(null);

  // const handleSocialMediaChange = (index, field, value) => {
  //   const updatedLinks = [...socialMediaLinks];
  //   updatedLinks[index][field] = value;
  //   setSocialMediaLinks(updatedLinks);
  // };
  const validateForm = (formData, socialMediaLinks) => {
    let errors = {};
    console.log(formData);

    if (!formData.storeName.trim()) errors.storeName = "Store Name is required";
    else if (formData.storeName.length < 3 || formData.storeName.length > 10)
      errors.storeName = "Store Name length should be between 3 & 10";

    if (!formData.ownerName.trim()) errors.ownerName = "Owner Name is required";
    else if (formData.ownerName.length < 3 || formData.ownerName.length > 10)
      errors.ownerName = "Owner Name length should be between 3 & 10";

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

    // socialMediaLinks.forEach((link, index) => {
    //   if (!link.platform.trim() || !link.link.trim()) {
    //     errors[
    //       `socialMediaLinks_${index}`
    //     ] = `Both platform and link are required`;
    //   } else if (!/^https?:\/\/\S+$/.test(link.link)) {
    //     errors[`socialMediaLinks_${index}`] = `Invalid URL format`;
    //   }
    // });

  const handleOnDelete = () => {
    const isConfirmed = window.confirm("are you sure to delet your store");
    if (isConfirmed) deleteStore(formData._id);
    else toast.success("store deleted canceled");
  };

  const handleOnChange = (e) => {
    setIsChange(true);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleOnSubmit = async (e) => {
    let logo = "";
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("storeName", formData.storeName);
    formDataToSend.append("ownerName", formData.ownerName);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("openTime", formData.openTime);
    formDataToSend.append("closeTime", formData.closeTime);
    formDataToSend.append("gstNumber", formData.gstNumber);
    formDataToSend.append("upiId", formData.upiId);
    formDataToSend.append("isBranch", formData.isBranch);
    formDataToSend.append("logo", formData.logo); // Add the image file

    // socialMediaLinks.forEach((link, index) => {
    //   formDataToSend.append(`mediaLinks[${index}][platform]`, link.platform);
    //   formDataToSend.append(`mediaLinks[${index}][link]`, link.link);
    // });

    screateStore(formDataToSend);
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

        {/* <div className="mb-3">
          <label className="form-label">Social Media Links</label>
          {socialMediaLinks.map((socialMedia, index) => (
            <div className="row mb-2" key={index}>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Social Media Name"
                  value={socialMedia.platform}
                  onChange={(e) =>
                    handleSocialMediaChange(index, "platform", e.target.value)
                  }
                />
                {errors[`socialMediaLinks_${index}`] && (
                  <p className="text-danger">
                    {errors[`socialMediaLinks_${index}`]}
                  </p>
                )}
              </div>
              <div className="col">
                <input
                  type="url"
                  className="form-control"
                  placeholder="Link"
                  value={socialMedia.link}
                  onChange={(e) =>
                    handleSocialMediaChange(index, "link", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={addSocialMediaField}
          >
            Add Another
          </button>
        </div> */}

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
}};

export default StoreForm;
