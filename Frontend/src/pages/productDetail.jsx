import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {toast } from "react-toastify";

const ProductDetail = ({
  getProduct,
  addToCart,
  emptyMsg,
  productt,
  cart,
  getItem,
}) => {
  const{ productData,isLoading}=productt
  const{ flag,cartItems,message,addedToCart,}=cart
  const [product, setProduct] = useState({
    productName: "",
    price: "",
    description: "",
  });
  const [inCart, setInCart] = useState(false);

  const { storeId, productId } = useParams();

  const addToCartfunc = () => {
    addToCart(productId);
    setInCart(true);
  };
  useEffect(() => {
    getProduct(productId);
  }, [productId]);

  useEffect(() => {
    getItem()
    console.log("ccartItems", cartItems, productId);
    if (cartItems.find((cproduct) => cproduct.productId === productId)) {
      setInCart(true);
    }
  }, [getItem]);

  useEffect(() => {
    setProduct( productData);
  }, [ productData]);

  useEffect(() => {
    console.log({ message });
    if (message) {
      if (addedToCart) {
        toast.success(message);
      } else {
        toast.error(message);
      }
      emptyMsg();
    }
  }, [flag]);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        {/* Product Image */}
        <div className="col-md-6">
          <img
            src={ productData?.logo}
            alt=""
            className="img-fluid rounded"
            style={{ maxHeight: "500px", objectFit: "contain" }}
          />
        </div>

        {/* Product Details */}
        <div className="col-md-6">
          <h1>{product.productName}</h1>
          <p className="text-muted">{product.description}</p>
          <h3 className="text-success">${product.price}</h3>
          <p>
            <strong>Rating: </strong>⭐ 4 / 5
          </p>
          <div className="d-flex gap-3 mt-4">
            <Link to="/checkout/0">
              
              <button className="btn btn-primary">Buy Now</button>
            </Link>

            {inCart ? (
              <Link to={'/cart'}><button className="btn btn-outline-secondary">goToCart</button></Link>
            ) : (
              <button
                className="btn btn-outline-secondary"
                onClick={addToCartfunc}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
