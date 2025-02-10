import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ProductDetail = ({
  productInformation,
  getProduct,
  addToCart,
  emptyMsg,
  cmessage,
  caddedToCart,
  pisLoading,
  cflag
}) => {
  const [product, setProduct] = useState({
    productName: "",
    price: "",
    description: "",
  });
  const { storeId, productId } = useParams();

  const addToCartfunc = () => {
    addToCart(productId);
  };
  useEffect(() => {
    getProduct(productId);
 
  }, [productId]);

  useEffect(() => {
    setProduct(productInformation);
  }, [productInformation]);

  useEffect(() => {
    console.log({ cmessage });
    if (cmessage) {
      if (caddedToCart) {
        toast.success(cmessage);
      } else {
        toast.error(cmessage);
      }
      emptyMsg();
    }
  }, [cflag]);

  if (pisLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        {/* Product Image */}
        <div className="col-md-6">
          <img
            src={productInformation?.logo?.url}
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
              {" "}
              <button className="btn btn-primary">Buy Now</button>
            </Link>
            <button
              className="btn btn-outline-secondary"
              onClick={addToCartfunc}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
