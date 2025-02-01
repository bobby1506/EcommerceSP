import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartCard = ({removeFromCart,product,getCart,quantity,updateCart,emptyMsg}) => {
  const {_id,productName,price}=product;
  const [count,setCount]=useState(0)

  // const navigate=useNavigate()

useEffect(()=>{
   setCount(quantity)
},[])
  if (!product) return null;
  const handleOnInc=()=>{
    setCount(count+1);
    updateCart(_id,count+1,1)
  }
  const handleOnDec=()=>{
    if(count==1){
      return
    }
    setCount(count-1)
    updateCart(_id,count-1,-1)
  }
 
  return (
    <>
 <div className="card mb-3 shadow-sm rounded-lg p-3">
  <div className="row g-0">
    {/* Product Image */}
    <div className="col-md-4">
      <img
        src={product.logo.url}
        className="img-fluid rounded-start"
        alt="Product"
        style={{ objectFit: 'cover', height: '150px' }}
      />
    </div>

    <div className="col-md-8">
      <div className="card-body d-flex align-items-center position-relative">
        {/* Product Info */}
        <div>
          <h5 className="card-title fw-bold text-dark">{productName}</h5>
          <p className="card-text text-muted">$ {price}</p>

          <div className="d-flex align-items-center mb-3">
            <button className="btn btn-outline-secondary me-2" style={{ width: '30px', height: '30px' }} onClick={handleOnDec}>-</button>
            <span className="mx-2">{count}</span>
            <button className="btn btn-outline-secondary ms-2" style={{ width: '30px', height: '30px' }} onClick={handleOnInc}>+</button>
          </div>
        </div>

        {/* Remove Button */}
        <button className="btn btn-danger position-absolute end-0 top-50 translate-middle-y" onClick={()=>{removeFromCart(_id);emptyMsg();}}>
          Remove
        </button>
      </div>
    </div>
  </div>
</div>



    </>
  );
};

export default CartCard;
