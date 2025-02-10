import React, { useState } from "react";
import { updateProduct } from "../../redux/actions/sellerActions";
import { useDispatch } from "react-redux";

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
    logo: product?.logo
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={`modal ${isVisible ? "show d-block" : "d-none"}`}
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Product</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Stock</label>
                  <input
                    type="number"
                    className="form-control"
                    name="stocks"
                    value={formData.stocks}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Update Product
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay to close modal when clicking outside */}
      {isVisible && (
        <div className="modal-backdrop fade show" onClick={onClose}></div>
      )}
    </>
  );
};

export default UpdateProductModal;
