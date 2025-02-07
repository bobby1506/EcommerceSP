import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../.././App.css";
import { toast } from "react-toastify";
import axios from "axios";

const ProductForm = ({
  addProduct,
  smessage,
  sproductCreated,
  sflag,
  emptymsg,
}) => {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    description: "",
    price: "",
    stocks: "",
    logo: "",
  });

  const [errors, setErrors] = useState({});
  const [pimage, setPimage] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const navigate = useNavigate();
  const nameRef = useRef(null);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    if (smessage) {
      if (sproductCreated) {
        toast.success(smessage);
        navigate("/sellerdashboard/sellerproducts");
      } else {
        toast.error(smessage);
      }
      emptymsg();
    }
  }, [sflag]);

  const handleOnChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? parseInt(value) || 0 : value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    let validationErrors = {};
    if (!formData.productName.trim())
      validationErrors.productName = "Product name is required";
    if (!formData.category) validationErrors.category = "Category is required";
    if (!formData.description.trim())
      validationErrors.description = "Description is required";
    if (!formData.price || formData.price <= 0)
      validationErrors.price = "Price must be greater than zero";
    if (!formData.stocks || formData.stocks < 0)
      validationErrors.stocks = "Stocks must be 0 or more";
    if (!pimage) validationErrors.pimage = "Product image is required";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleOnSubmit = async (e) => {
    let logo = "";
    e.preventDefault();
    console.log("hello first");
    if (validateForm() || true) {
      console.log("hello second");
      let file = pimage;
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
      } else {
        if (!file) return;
        toast.error("file should be less than 1MB");
      }
    }
    console.log({ ...formData, logo });
    addProduct({ ...formData, logo });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add Product</h2>
      <form onSubmit={handleOnSubmit}>
        {/* Product Name */}
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            id="productName"
            placeholder="Enter product name"
            name="productName"
            value={formData.productName}
            onChange={handleOnChange}
            ref={nameRef}
          />
          {errors.productName && (
            <p className="text-danger">{errors.productName}</p>
          )}
        </div>

        {/* Category */}
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
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="grocery">Grocery</option>
            <option value="home-appliances">Home Appliances</option>
            <option value="other">other</option>
          </select>
          {errors.category && <p className="text-danger">{errors.category}</p>}
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder="Enter product description"
            name="description"
            value={formData.description}
            onChange={handleOnChange}
          ></textarea>
          {errors.description && (
            <p className="text-danger">{errors.description}</p>
          )}
        </div>

        {/* Price */}
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            style={{
              appearance: "textfield",
              WebkitAppearance: "none",
              MozAppearance: "textfield",
            }}
            id="price"
            placeholder="Enter product price"
            name="price"
            value={formData.price}
            onChange={handleOnChange}
          />
          {errors.price && <p className="text-danger">{errors.price}</p>}
        </div>

        {/* Stocks */}
        <div className="mb-3">
          <label htmlFor="stocks" className="form-label">
            Stocks/Inventory
          </label>
          <input
            type="number"
            className="form-control"
            style={{
              appearance: "textfield",
              WebkitAppearance: "none",
              MozAppearance: "textfield",
            }}
            placeholder="Enter available stocks"
            name="stocks"
            value={formData.stocks}
            onChange={handleOnChange}
          />
          {errors.stocks && <p className="text-danger">{errors.stocks}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Product Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="pimage"
            onChange={(e) => setPimage(e.target.files[0])}
          />
          {errors.pimage && <p className="text-danger">{errors.pimage}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
