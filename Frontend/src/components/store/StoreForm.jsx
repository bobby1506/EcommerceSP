import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket";
import { loginContext } from "../../context/ContextProvider";
import { toast } from "react-toastify";
const StoreForm = ({
  smessage,
  sisLoading,
  sisCreated,
  screateStore,
  sflag,
  jwttoken,
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
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { contextUserData } = useContext(loginContext);
  let loginToken = contextUserData.token;
  // alert(loginToken);
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
  }, [sflag]);
  useEffect(() => {
    nameRef.current.focus();
    console.log("jwttoken", jwttoken);
    if (jwttoken || loginToken) {
      jwttoken
        ? Cookies.set("authToken", jwttoken, { expires: 7 })
        : Cookies.set("authToken", loginToken, { expires: 7 });
    }
  }, []);

  const [socialMediaLinks, setSocialMediaLinks] = useState([
    { platform: "", link: "" },
  ]);

  const addSocialMediaField = () => {
    setSocialMediaLinks([...socialMediaLinks, { platform: "", link: "" }]);
  };
  const [logo, setLogo] = useState(null);

  const handleSocialMediaChange = (index, field, value) => {
    const updatedLinks = [...socialMediaLinks];
    updatedLinks[index][field] = value;
    setSocialMediaLinks(updatedLinks);
  };
  const validateForm = (formData, socialMediaLinks) => {
    let errors = {};

    if (!formData.storeName.trim()) {
      errors.storeName = "Store Name is required";
    }
    if (!formData.ownerName.trim()) {
      errors.ownerName = "Owner Name is required";
    }
    if (!formData.address.trim()) {
      errors.address = "Address is required";
    }
    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }
    if (!formData.category) {
      errors.category = "Category is required";
    }
    if (!formData.openTime) {
      errors.openTime = "Open Time is required";
    }
    if (!formData.closeTime) {
      errors.closeTime = "Close Time is required";
    }
    if (!formData.gstNumber.trim()) {
      errors.gstNumber = "GST Number is required";
    } else if (!/^\d{15}$/.test(formData.gstNumber)) {
      errors.gstNumber = "GST Number must be 15 digits";
    }
    if (!formData.upiId.trim()) {
      errors.upiId = "UPI ID is required";
    } else if (!/^\w+@\w+$/.test(formData.upiId)) {
      errors.upiId = "Invalid UPI ID format";
    }
    if (!formData.isBranch) {
      errors.isBranch = "Please select if it's a branch";
    }

    socialMediaLinks.forEach((link, index) => {
      if (!link.platform.trim() || !link.link.trim()) {
        errors[
          `socialMediaLinks_${index}`
        ] = `Both platform and link are required`;
      } else if (!/^https?:\/\/\S+$/.test(link.link)) {
        errors[`socialMediaLinks_${index}`] = `Invalid URL format`;
      }
    });

    return errors;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData, socialMediaLinks);
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
    formDataToSend.append("logo", logo); // Add the image file

    socialMediaLinks.forEach((link, index) => {
      formDataToSend.append(`mediaLinks[${index}][platform]`, link.platform);
      formDataToSend.append(`mediaLinks[${index}][link]`, link.link);
    });

    screateStore(formDataToSend);
  };
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Store Information Form</h2>
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="storeName" className="form-label">
            Store Name
          </label>
          <input
            type="text"
            className="form-control"
            id="storeName"
            placeholder="Enter store name"
            name="storeName"
            value={formData.storeName}
            onChange={handleOnChange}
            ref={nameRef}
          />
          {errors.storeName && (
            <p className="text-danger">{errors.storeName}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="ownerName" className="form-label">
            Owner Name
          </label>
          <input
            type="text"
            className="form-control"
            id="ownerName"
            placeholder="Enter owner name"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleOnChange}
          />
          {errors.ownerName && (
            <p className="text-danger">{errors.ownerName}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <textarea
            className="form-control"
            id="address"
            rows="3"
            placeholder="Enter address"
            name="address"
            value={formData.address}
            onChange={handleOnChange}
          ></textarea>
          {errors.address && <p className="text-danger">{errors.address}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder="Enter description"
            name="description"
            value={formData.description}
            onChange={handleOnChange}
          ></textarea>
          {errors.description && (
            <p className="text-danger">{errors.description}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleOnChange}
          >
            <option value="">Select category</option>
            <option value="Retail">Retail</option>
            <option value="Food">Food</option>
            <option value="Electronics">Electronics</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && <p className="text-danger">{errors.category}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Timing</label>
          <div className="row">
            <div className="col">
              <label htmlFor="openTime" className="form-label">
                Open Time
              </label>
              <input
                type="time"
                className="form-control"
                placeholder="Open Time"
                name="openTime"
                value={formData.openTime}
                onChange={handleOnChange}
              />
              {errors.openTime && (
                <p className="text-danger">{errors.openTime}</p>
              )}
            </div>
            <div className="col">
              <label htmlFor="closeTime" className="form-label">
                Close Time
              </label>
              <input
                type="time"
                className="form-control"
                placeholder="Close Time"
                name="closeTime"
                value={formData.closeTime}
                onChange={handleOnChange}
              />
              {errors.closeTime && (
                <p className="text-danger">{errors.closeTime}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-3">
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
        </div>

        <div className="mb-3">
          <label htmlFor="gstNumber" className="form-label">
            GST Number
          </label>
          <input
            type="text"
            className="form-control"
            id="gstNumber"
            placeholder="Enter GST number"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleOnChange}
          />
          {errors.gstNumber && (
            <p className="text-danger">{errors.gstNumber}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Is Branch?</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="isBranch"
                id="isBranchYes"
                value="yes"
                onChange={handleOnChange}
              />
              <label className="form-check-label" htmlFor="isBranchYes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="isBranch"
                id="isBranchNo"
                value="no"
                onChange={handleOnChange}
              />
              <label className="form-check-label" htmlFor="isBranchNo">
                No
              </label>
            </div>
          </div>
          {errors.isBranch && <p className="text-danger">{errors.isBranch}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="upiId" className="form-label">
            UPI ID
          </label>
          <input
            type="text"
            className="form-control"
            id="upiId"
            placeholder="Enter UPI ID"
            name="upiId"
            value={formData.upiId}
            onChange={handleOnChange}
          />
          {errors.upiId && <p className="text-danger">{errors.upiId}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="uploadLogo" className="form-label">
            UPLOAD LOGO
          </label>
          <input
            type="file"
            className="form-control"
            id="uploadLogo"
            onChange={(e) => {
              setLogo(e.target.files[0]);
            }}
          />
        </div>

        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};

export default StoreForm;
