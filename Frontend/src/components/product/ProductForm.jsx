import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../.././App.css";
import { toast } from "react-toastify";
import axios from "axios";
import Input from "../common/Input";
import SelectInput from "../common/SelectInput";
import TextInput from "../common/TextInput";

const ProductForm = ({ addProduct, emptymsg, seller }) => {
  const { message, productCreated, flag, isLoading } = seller;
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
    if (message) {
      if (productCreated) {
        toast.success(message);
        navigate("/sellerdashboard/sellerproducts");
      } else {
        toast.error(message);
      }
      emptymsg();
    }
  }, [flag]);

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
    else if(formData.productName<3 || formData.productName>15) 
      validationErrors.productName = "Product name length should between 3 & 15";
    if (!formData.category) validationErrors.category = "Category is required";
    if (!formData.description.trim())
      validationErrors.description = "Description is required";
    else if(formData.description<5 || formData.description>25) 
      validationErrors.description = "Product name length should between 5 & 25";
    if (!formData.price || formData.price <= 0)
      validationErrors.price = "Price must be greater than zero";
    if (!formData.stocks || formData.stocks < 0)
      validationErrors.stocks = "Stocks must be 0 or more";
    if (!pimage) validationErrors.pimage = "Product image is required";

    setErrors(validationErrors);
    console.log(Object.keys(validationErrors).length === 0);
    return Object.keys(validationErrors).length === 0;
  };

  const handleOnSubmit = async (e) => {
    let logo = "";
    e.preventDefault();
    if (validateForm()) {
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
      console.log({ ...formData, logo });
      addProduct({ ...formData, logo });
    }
  };
  const option = [
    { value: "", text: "select Category" },
    { value: "fashion", text: "Fashion" },
    { value: "electronics", text: "Electronics" },
    { value: "grocery", text: "Grocery" },
    { value: "home-appliances", text: "Home-appliances" },
    { value: "other", text: "Other" },
  ];

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add Product</h2>
      <form onSubmit={handleOnSubmit}>
        <Input
          label="product Name"
          type="text"
          className="form-control"
          id="productName"
          placeholder="Enter Product name"
          value={formData.productName}
          onChange={handleOnChange}
          name="productName"
          errors={errors}
          ref={nameRef}
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

        {/* Description */}
        <TextInput
          label="Description"
          className="form-control w-100"
          id="description"
          rows="3"
          placeholder="Enter Products Description"
          name="description"
          value={formData.description}
          onChange={handleOnChange}
          errors={errors}
        />

        {/* Price */}
        <Input
          label="Price"
          type="number"
          className="form-control"
          id="price"
          placeholder="Enter Product price"
          value={formData.price}
          onChange={handleOnChange}
          name="price"
          errors={errors}
          style={{
            appearance: "textfield",
            WebkitAppearance: "none",
            MozAppearance: "textfield",
          }}
        />

        {/* Stocks */}
        <Input
          label="Stocks/Inventory"
          type="number"
          className="form-control"
          id="stocks"
          placeholder="Enter available Stocks"
          value={formData.stocks}
          onChange={handleOnChange}
          name="stocks"
          errors={errors}
          style={{
            appearance: "textfield",
            WebkitAppearance: "none",
            MozAppearance: "textfield",
          }}
        />

        {/* Product Image */}
        <Input
          label="Product Image"
          type="file"
          className="form-control"
          id="image"
          placeholder="Enter available Stocks"
          onChange={(e) => setPimage(e.target.files[0])}
          name="pimage"
          errors={errors}
        />

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
