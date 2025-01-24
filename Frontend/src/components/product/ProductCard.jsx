import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({productName,category,description,price,productId }) => {
  return (
    <div className="card" style={{ width: "18rem", margin: "1rem" }}>
      <img
        src={"https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ"}
        className="card-img-top"
        alt=""
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{productName}</h5>
        <p className="card-text text-muted">{price}</p>
        <p className="card-text">
          ⭐⭐⭐⭐⭐ 
        </p>
        <Link to={`./${productId}`}><button className="btn btn-primary">Open</button></Link>
      </div>
    </div>
  );
};

export default ProductCard;
