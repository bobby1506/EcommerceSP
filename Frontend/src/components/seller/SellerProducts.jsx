import React, { useEffect, useRef, useState } from "react";
import SellerProductCard from "./components/SellerProductsCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SellerProducts = ({
  productsList,
  getProduct,
  sisLoading,
  deleteProduct,
  sproductCreated,
  sproductDeleted,
  smessage,
  sproductUpdated,
  emptyStoreMsg,
  sflag,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (smessage) {
      if (sproductUpdated || sproductDeleted) toast.success(smessage);
      else toast(smessage);

      emptyStoreMsg();
    }
  }, [sflag]);

  const handleOnClick = () => {
    navigate("/sellerdashboard/sellerproducts/addproduct");
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsList.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const filteredProducts = currentProducts.filter((product) => {
    const matchesSearch =
      product?.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product?.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(productsList.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // if (sisLoading) {
  //   return <h1>Loading...</h1>;
  // }

  if (productsList.length === 0) {
    return (
      <div className="text-center mt-5">
        <h1>No Products Yet</h1>
        <button className="btn btn-primary" onClick={handleOnClick}>
          +Add Product
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-primary" onClick={handleOnClick}>
          +Add Product
        </button>

        <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="grocery">Grocery</option>
            <option value="home-appliances">Home Appliances</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <h3>no product found</h3>
      ) : (
        filteredProducts.map((product) => (
          <div key={product._id}>
            <SellerProductCard product={product} />
          </div>
        ))
      )}

      <div className="d-flex justify-content-center mt-4">
        <ul className="pagination">
          {pageNumbers.length == 8 &&
            pageNumbers.map((number) => (
              <li key={number} className="page-item">
                <button
                  onClick={() => handlePageChange(number)}
                  className="page-link"
                  style={{ borderRadius: "5px", padding: "10px 15px" }}
                >
                  {number}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SellerProducts;
