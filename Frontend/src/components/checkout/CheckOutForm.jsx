import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CheckoutForm = ({postOrders,orderedItems,productInfo}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [orderItems,setOrderItems]=useState([])
  const [errors, setErrors] = useState({});
  const [isCart,setIsCart]=useState(false);
  const {isCartStatus}=useParams();
  useEffect(()=>{
   if(isCartStatus=="1"){
    setIsCart(true)
    setOrderItems(orderedItems);
   }
   else{
    setOrderItems([productInfo])
   }
  },[])

  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Invalid email";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.zip.match(/^\d{6}$/)) newErrors.zip = "ZIP Code must be 6 digits";
    if (!formData.cardNumber.match(/^\d{16}$/)) newErrors.cardNumber = "Card number must be 16 digits";
    if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) newErrors.expiryDate = "Expiry format MM/YY";
    if (!formData.cvv.match(/^\d{3}$/)) newErrors.cvv = "CVV must be 3 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
   const navigate=useNavigate();
  const handleSubmit = (e) => {
    let orderData;
    e.preventDefault();
    if (validateForm()) {
      if(isCart=="1"){
        orderData={shippingInformation:formData,isCart,orderedItems:orderItems}
      }
      else{
        orderData={shippingInformation:formData,isCart,orderedItems:[{productId:productInfo._id,quantity:1,ProductDetails:productInfo}]}
      }
      console.log(orderData)
      postOrders(orderData);
      navigate('/')
      
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Proceed to Checkout</h2>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded">
        <h4>Billing Information</h4>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className={`form-control ${errors.fullName && "is-invalid"}`}
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.fullName}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email && "is-invalid"}`}
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.email}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className={`form-control ${errors.address && "is-invalid"}`}
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.address}</div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">City</label>
            <input
              type="text"
              className={`form-control ${errors.city && "is-invalid"}`}
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.city}</div>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">ZIP Code</label>
            <input
              type="text"
              className={`form-control ${errors.zip && "is-invalid"}`}
              name="zip"
              value={formData.zip}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.zip}</div>
          </div>
        </div>

        <h4>Payment Details</h4>
        <div className="mb-3">
          <label className="form-label">Card Number</label>
          <input
            type="text"
            className={`form-control ${errors.cardNumber && "is-invalid"}`}
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.cardNumber}</div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Expiry Date</label>
            <input
              type="text"
              className={`form-control ${errors.expiryDate && "is-invalid"}`}
              placeholder="MM/YY"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.expiryDate}</div>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">CVV</label>
            <input
              type="text"
              className={`form-control ${errors.cvv && "is-invalid"}`}
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.cvv}</div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
