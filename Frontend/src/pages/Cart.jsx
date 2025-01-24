import React, { useEffect, useState } from "react";
import CartCard from "../components/cart/CartCard";
import { Link } from "react-router-dom";

const Cart = ({
  ccartList,
  cisLoading,
  ctotalItems,
  getItem,
  emptyMsg,
  cmessage,
  caddedToCart,
  updateCart,
  removeFromCart,
}) => {
  // const [cartItems,setCartItems]=useState([])
  useEffect(() => {
    getItem();
    emptyMsg();
  }, []);

  if (cisLoading) {
    return <div>isloading....</div>;
  }
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
            <h5>
              Total Price: $
              {ccartList
                .reduce((acc, product) => acc + product.totalPrice, 0)
                .toFixed(2) || "0.00"}
            </h5>
            <Link to={ccartList.length > 0 ? "/checkout/1" : "/cart"}>
              <button className="btn btn-primary w-100 mt-3">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Cart);

