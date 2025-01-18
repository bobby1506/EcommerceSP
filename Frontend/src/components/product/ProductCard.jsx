import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="card" style={{ width: "18rem", margin: "1rem" }}>
      <img
        src=""
        className="card-img-top"
        alt=""
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">name</h5>
        <p className="card-text text-muted">product.price</p>
        <p className="card-text">
          ⭐ 
        </p>
        <button className="btn btn-primary">Buy Now</button>
      </div>
    </div>
  );
};

export default ProductCard;
