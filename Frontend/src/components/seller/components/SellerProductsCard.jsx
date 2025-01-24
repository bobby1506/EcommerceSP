import React, { useState } from "react";
import UpdateProductModal from "../../modals/updateProductModal";

const SellerProductCard = ({ product, onUpdate, onDelete }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  if (!product) return null;
  const { productName, price, description } = product;


  const categories = ["Electronics", "Clothing", "Books", "Furniture"];

  const handleUpdate = (updatedProduct) => {
    console.log("Updated Product Data:", updatedProduct);
  };

  const hadleDelete=()=>{
    console.log("deleted")
  }

 

  return (
    <div className="card shadow-sm my-3 w-100 p-3">
      <div className="d-flex align-items-center">
        {/* Image container */}
        <div className="me-3">
          <img
            src="https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ"
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
            <button className="btn btn-sm btn-danger" onClick={onDelete}>
              Delete
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
    </div>
  );
};

export default SellerProductCard;
