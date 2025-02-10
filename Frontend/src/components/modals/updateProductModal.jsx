import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateProductModal = ({
  product,
  categories,
  onUpdate,
  isVisible,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    productName: product?.productName || "",
    price: product?.price || 0,
    description: product?.description || "",
    category: product?.category || "",
    stocks: product?.stocks || 0,
    logo: product?.logo,
  });
  const [productImage, setProductImage] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.productName.trim())
      newErrors.productName = "Product Name is required.";
    else if (formData.productName.length < 3 || formData.productName.length > 50)
      newErrors.productName = "Product Name must be between 3 and 50 characters.";

    if (formData.price <= 0) newErrors.price = "Price must be greater than zero.";

    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    else if (formData.description.length < 5 || formData.description.length > 200)
      newErrors.description = "Description must be between 5 and 200 characters.";

    if (!formData.category) newErrors.category = "Category is required.";

    if (formData.stocks < 0) newErrors.stocks = "Stock cannot be negative.";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    let logo = null;
    if (productImage) {
      let file = productImage;
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
          logo = res.data.secure_url;
        } catch (error) {
          toast.error(error?.response?.data?.error?.message);
        }
      } else {
        toast.error("File should be less than 1MB");
        return;
      }
    }

    logo ? onUpdate({ ...formData, logo }) : onUpdate(formData);
    onClose();
  };

  const inputErrorStyle = {
    border: "1px solid red",
  };

  const errorTextStyle = {
    color: "red",
    fontSize: "0.875rem",
  };

  return (
    <>
      <div className={`modal ${isVisible ? "show d-block" : "d-none"}`} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Product</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {/* Product Name */}
                <div className="mb-3">
                  <label className="form-label">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    style={errors.productName ? inputErrorStyle : {}}
                  />
                  {errors.productName && <p style={errorTextStyle}>{errors.productName}</p>}
                </div>

                {/* Price */}
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    style={errors.price ? inputErrorStyle : {}}
                  />
                  {errors.price && <p style={errorTextStyle}>{errors.price}</p>}
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    style={errors.description ? inputErrorStyle : {}}
                  ></textarea>
                  {errors.description && <p style={errorTextStyle}>{errors.description}</p>}
                </div>

                {/* Category */}
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    style={errors.category ? inputErrorStyle : {}}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && <p style={errorTextStyle}>{errors.category}</p>}
                </div>

                {/* Stock */}
                <div className="mb-3">
                  <label className="form-label">Stock</label>
                  <input
                    type="number"
                    className="form-control"
                    name="stocks"
                    value={formData.stocks}
                    onChange={handleChange}
                    style={errors.stocks ? inputErrorStyle : {}}
                  />
                  {errors.stocks && <p style={errorTextStyle}>{errors.stocks}</p>}
                </div>

                {/* Existing Image */}
                <img
                  src={formData.logo}
                  className="img-fluid rounded-start"
                  style={{ objectFit: "cover", height: "150px" }}
                  alt="Product"
                />

                {/* Update Image */}
                <div className="mb-3">
                  <label className="form-label">Update Image</label>
                  <input
                    type="file"
                    className="form-control"
                    name="file"
                    onChange={(e) => setProductImage(e.target.files[0])}
                  />
                </div>

                {/* Buttons */}
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Update Product
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={onClose}>
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay to close modal when clicking outside */}
      {isVisible && <div className="modal-backdrop fade show" onClick={onClose}></div>}
    </>
  );
};

export default UpdateProductModal;
