import React from "react";

const CartCard = () => {
  return (
    <>
      <div className="card" style={{ width: "90%" }}>
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="card-img-top"
          alt="Product"
        />
        <div className="card-body">
          <h5 className="card-title">Product Title</h5>
          <p className="card-text">Short product description here.</p>
          <div className="d-flex justify-content-between align-items-center">
            <span className="font-weight-bold">$29.99</span>
            <div>
              <button className="btn btn-primary btn-sm mx-1">+</button>
              <span className="mx-1">1</span>
              <button className="btn btn-primary btn-sm mx-1">-</button>
            </div>
          </div>
          <button className="btn btn-danger mt-3">Remove</button>
        </div>
      </div>
    </>
  );
};

export default CartCard;
