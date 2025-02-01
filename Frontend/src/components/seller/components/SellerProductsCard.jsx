import React, { useState } from "react";
import UpdateProductModal from "../../modals/updateProductModal";
import { useDispatch } from "react-redux";
import { createCoupon, deleteCoupon, deleteProduct, updateCoupon, updateProduct } from "../../../redux/actions/sellerActions";
import DiscountProductModal from "../../modals/DiscountModal";


const SellerProductCard = ({ product}) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCouponModalVisible, setIsCouponModalVisible] = useState(false);
  const dispatch=useDispatch();
  if (!product) return null;
  const {_id, productName, price, description } = product;


  const categories = ["Electronics", "Clothing", "Books", "Furniture"];

  const handleUpdate = (updatedProduct) => {
    console.log("Updated Product Data:", updatedProduct);
    dispatch(updateProduct(_id,updatedProduct))
  };

  const handleOnCoupon=(FormData)=>{
    dispatch(createCoupon (FormData))
  }
  const handleCouponUpdate=(FormData)=>{
    dispatch(updateCoupon(FormData))
  }

  const handleCouponDelete=(productId)=>{
    dispatch(deleteCoupon(productId));
  }

 

  return (
    <div className="card shadow-sm my-3 w-100 p-3">
      <div className="d-flex align-items-center">
        {/* Image container */}
        <div className="me-3">
          <img
            src={product?.logo?.url}
            className="rounded"
            alt={productName}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </div>

        {/* Product details - fixed width columns for consistency */}
        <div className="d-flex flex-grow-1 align-items-center">
          <div className="flex-fill text-center">
            <h5 className="mb-0">{productName}</h5>
          </div>
          <div className="flex-fill text-center">
            <h6 className="text-muted mb-0">Price: ${price}</h6>
          </div>
          <div
            className="flex-fill text-center text-truncate"
            style={{ maxWidth: "200px" }}
          >
            <p className="mb-0">{description}</p>
          </div>
          <div className="flex-shrink-0 d-flex">
            <button className="btn btn-sm btn-primary me-2" onClick={() => setIsModalVisible(true)}>
              Update
            </button>
            <button className="btn btn-sm btn-danger me-2" onClick={()=>dispatch(deleteProduct(_id))}>
              Delete
            </button>
            <button className="btn btn-sm btn-success me-2" onClick={() => setIsCouponModalVisible(true)}>
             { product.isDiscount?"Update Discount":"create Discount"}
            </button>
          </div>
        </div>
      </div>
      <UpdateProductModal
        product={product}
        categories={categories}
        onUpdate={handleUpdate}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
         <DiscountProductModal
        product={product}
        categories={categories}
        onCoupon={handleOnCoupon}
        onUpdate={handleCouponUpdate}
        onDelete={handleCouponDelete}
        isVisible={isCouponModalVisible}
        onClose={() => setIsCouponModalVisible(false)}
      />

      
    </div>
  );
};

export default SellerProductCard;
