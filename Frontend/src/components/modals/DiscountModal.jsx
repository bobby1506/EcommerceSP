import React, { useEffect, useState } from "react";
import { updateProduct } from "../../redux/actions/sellerActions";
import { useDispatch } from "react-redux";

const DiscountProductModal = ({
  product,
  onCoupon,
  onUpdate,
  onDelete,
  isVisible,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    couponCode: "",
    discountedPrice: null,
  });
  const [error,setError]=useState({})
  useEffect(() => {
    if (product.isDiscount) {
      setFormData((prev) => ({
        ...prev,
        couponCode: product.couponCode,
        discountedPrice: product.discountedPrice,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const handleValidation=(formData)=>{
    let error={}
    if(!formData.couponCode){
      error.couponCode="enter the couponCode"
    }
    if(formData.discountedPrice<=0){
      error.discountedPrice="please enter valid price"
    }
    return error;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = handleValidation(formData);
    setError(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if(product.isDiscount){
      onUpdate({...formData,productId:product._id})
    }else{
        onCoupon({...formData,productId:product._id});
    }

    onClose();
  };

  const handleDelete=()=>{
    onDelete(product._id)
    onClose()
  }

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
                  <label className="form-label">Coupon Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="couponCode"
                    value={formData.couponCode}
                    onChange={handleChange}
                  />
                   {error.couponCode && (
            <p className="text-danger">{error.couponCode}</p>
          )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Discount percent</label>
                  <input
                    type="number"
                    className="form-control"
                    name="discountedPrice"
                    value={formData.discountedPrice}
                    onChange={handleChange}
                  />
                         {error.discountedPrice && (
            <p className="text-danger">{error.discountedPrice}</p>
          )}
                </div>

                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    {product.isDiscount ? "update" : "Create Discount"}
                  </button>
                  {product.isDiscount && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  )}
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

export default DiscountProductModal;
