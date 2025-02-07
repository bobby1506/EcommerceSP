import React, { useEffect, useState } from "react";
import CartCard from "../components/cart/CartCard";
import { Link } from "react-router-dom";
import useCart from "../customHooks/useCart";
import { toast } from "react-toastify";

const Cart = ({
  ccartList,
  cisLoading,
  ctotalItems,
  getItem,
  emptyMsg,
  cmessage,
  ccouponApplied,
  caddedToCart,
  updateCart,
  removeFromCart,
  ctotalPrice,
  applyCoupon,
  cflag,
}) => {
  // const [cartItems,setCartItems]=useState([])
  useEffect(() => {
    getItem();
    emptyMsg();
  }, []);

  const [couponCode, setCouponCode] = useState("");

  const { message, totalPrice } = useCart(ctotalItems, ctotalPrice);
 

  useEffect(() => {
    if (message) {
      toast(message);
    }
  }, [message]);

  useEffect(() => {
    if (cmessage) {
      if (removeFromCart) {
        toast.success(cmessage);
      } else if (ccouponApplied) {
        toast.success(cmessage);
      } else {
        toast.error(cmessage);
      }
      emptyMsg();
    }
  }, [cflag]);

  if (cisLoading) {
    return <div>isloading....</div>;
  }
  const price = parseFloat(totalPrice).toFixed(2);
  const cctotalPrice=parseFloat(ctotalPrice).toFixed(2);
  // if(ccartList.length==)
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <h2 className="mb-4">Your Cart</h2>
          {ccartList?.length > 0 ? (
            ccartList.map((product, index) =>
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
            <h5>Total Items:{ctotalItems}</h5>
            {totalPrice == ctotalPrice ? (
              <h5>Total Price: {totalPrice}</h5>
            ) : (
              <h5>
                Total Price: <del>{cctotalPrice}</del> {price}
              </h5>
            )}
            <Link to={ccartList.length > 0 ? "/checkout/1" : "/cart"}>
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
