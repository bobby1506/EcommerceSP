import React from "react";
import { Link } from "react-router-dom";

const StoreCard = ({ storeName, description, storeId, url }) => {
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={url}
          className="card-img-top"
          alt="Store"
          style={{
            height: "200px", 
            objectFit: "contain",
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{storeName}</h5>
          <p className="card-text">{description}</p>
          <Link to={`/products/${storeId}`} className="btn btn-primary">
            Open
          </Link>
        </div>
      </div>
    </>
  );
};

export default StoreCard;
