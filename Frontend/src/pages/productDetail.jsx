import React from "react";
const product = {
    name: "Smartphone X",
    price: "299",
    rating: "4.5",
    description: "A powerful smartphone with cutting-edge technology.",
    image: "https://via.placeholder.com/400", // Replace with actual image URL
  };
  

const ProductDetail = () => {
  return (
    <div className="container my-5">
      <div className="row">
        {/* Product Image */}
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>

        {/* Product Details */}
        <div className="col-md-6">
          <h1>{product.name}</h1>
          <p className="text-muted">{product.description}</p>
          <h3 className="text-success">${product.price}</h3>
          <p>
            <strong>Rating: </strong>⭐ {product.rating} / 5
          </p>
          <div className="d-flex gap-3 mt-4">
            <button className="btn btn-primary">Buy Now</button>
            <button className="btn btn-outline-secondary">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
