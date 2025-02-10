import React, { useEffect, useState } from "react";
import CartCard from "../components/cart/CartCard";
import { Link } from "react-router-dom";
import useCart from "../customHooks/useCart";
import { toast } from "react-toastify";

const Cart = ({
  getItem,
  emptyMsg,
  cart,
  updateCart,
  removeFromCart,
  applyCoupon,
}) => {
  const {
    cartItems,
    isLoading,
    totalItems,
    message,
    couponApplied,
    removedFromCart,
    totalPrice,
    flag,
  } = cart;
  useEffect(() => {
    getItem();
    emptyMsg();
  }, []);

  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    if (message) {
      if (removedFromCart || couponApplied) {
        toast.success(message);
      } else {
        toast.error(message);
      }
      emptyMsg();
    }
  }, [flag]);

  if (isLoading) {
    return <div>isloading....</div>;
  }
  
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <h2 className="mb-4">Your Cart</h2>
          {cartItems?.length > 0 ? (
            cartItems.map((product, index) =>
              product?.quantity !== undefined && product?.productDetails ? (
                <CartCard
                  removeFromCart={removeFromCart}
                  updateCart={updateCart}
                  quantity={product?.quantity || 0}
                  product={product?.productDetails}
                  key={product?.productDetails?._id || index}
                  emptyMsg={emptyMsg}
                  getCart={getItem}
                />
              ) : null
            )
          ) : (
            <h1>Cart is empty</h1>
          )}
        </div>

        <div className="col-md-4">
          <h3 className="mb-4">Cart Summary</h3>
          <div className="card p-3">
            <h5>Total Items:{totalItems}</h5>

            <h5>Total Price: {totalPrice}</h5>

            <Link to={cartItems?.length > 0 ? "/checkout/1" : "/cart"}>
              <button className="btn btn-primary w-100 mt-3">
                Proceed to Checkout
              </button>
            </Link>
            <div className="d-flex mt-3">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="form-control me-2"
                placeholder="Enter Coupon"
              />
              <button
                className="btn btn-primary"
                onClick={() => applyCoupon(couponCode)}
              >
                Apply Coupon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Cart);
