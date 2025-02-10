import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../common/Input";


const CheckoutForm = ({
  order,
  orderedItems,
  postOrders,
  productInfo,
  emptyOrderMsg,
}) => {
  const { message, flag, orderCreated } = order;
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
  const [orderItems, setOrderItems] = useState([]);
  const [errors, setErrors] = useState({});
  const [isCart, setIsCart] = useState(false);
  const { isCartStatus } = useParams();

  useEffect(() => {
    if (isCartStatus == "1") {
      setIsCart(true);
      setOrderItems(orderedItems);
    } else {
      setOrderItems([productInfo]);
    }
  }, []);

  useEffect(() => {
    if (message) {
      if (orderCreated) {
        navigate("/");
      } else {
        toast.error(message);
        emptyOrderMsg();
      }
    }
  }, [flag]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.match(/^\S+@\S+\.\S+$/))
      newErrors.email = "Invalid email";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.zip.match(/^\d{6}$/))
      newErrors.zip = "ZIP Code must be 6 digits";
    if (!formData.cardNumber.match(/^\d{16}$/))
      newErrors.cardNumber = "Card number must be 16 digits";
    if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/))
      newErrors.expiryDate = "Expiry format MM/YY";
    if (!formData.cvv.match(/^\d{3}$/)) newErrors.cvv = "CVV must be 3 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    let orderData;
    console.log(productInfo)
    e.preventDefault();
    if (validateForm()) {
      if (isCart == "1") {
        const updatedOrderItems = orderItems.map((order) => {
          let newOrder = { ...order, deliveryStatus: "pending" };
          return newOrder;
        });
        orderData = {
          shippingInformation: formData,
          isCart,
          orderedItems: updatedOrderItems,
        };
      } else {
        orderData = {
          shippingInformation: formData,
          isCart,
          orderedItems: [
            {
              productId: productInfo._id,
              quantity: 1,
              productDetails: productInfo,
              deliveryStatus: "pending",
            },
          ],
        };
      }
      postOrders(orderData);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Proceed to Checkout</h2>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded">
        <h4>Billing Information</h4>
        <Input
          label="Full Name"
          type="text"
          className={`form-control ${errors.fullName && "is-invalid"}`}
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          errors={errors}
        />
        
        <Input
          label="Email"
          type="email"
          className={`form-control ${errors.email && "is-invalid"}`}
          name="email"
          value={formData.email}
          onChange={handleChange}
          errors={errors}
        />

        <Input
          label="Address"
          type="text"
          className={`form-control ${errors.address && "is-invalid"}`}
          name="address"
          value={formData.address}
          onChange={handleChange}
          errors={errors}
        />

        <div className="row">
          <div className="col-md-6 mb-3">
            <Input
              label="City"
              type="text"
              className={`form-control ${errors.city && "is-invalid"}`}
              name="city"
              value={formData.city}
              onChange={handleChange}
              errors={errors}
            />
          </div>
          <div className="col-md-6 mb-3">
            <Input
              label="ZIP Code"
              type="text"
              className={`form-control ${errors.zip && "is-invalid"}`}
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              errors={errors}
            />
          </div>
        </div>

        <h4>Payment Details</h4>
        <Input
          label="Card Number"
          type="text"
          className={`form-control ${errors.cardNumber && "is-invalid"}`}
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          errors={errors}
        />

        <div className="row">
          <div className="col-md-6 mb-3">
            <Input
              label="Expiry Date"
              type="text"
              className={`form-control ${errors.expiryDate && "is-invalid"}`}
              placeholder="MM/YY"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              errors={errors}
            />
          </div>
          <div className="col-md-6 mb-3">
            <Input
              label="CVV"
              type="text"
              className={`form-control ${errors.cvv && "is-invalid"}`}
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              errors={errors}
            />
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
