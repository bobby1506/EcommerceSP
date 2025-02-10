import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";

const Products = ({ getProduct, product }) => {
  const { productsArray, isLoading } = product;
  const { storeId } = useParams();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    getProduct(storeId);
  }, [storeId]);

  //debouncing

  const handleFilterSearch = useCallback(() => {
    let filtered = productsArray;
    if (searchTerm) {
      filtered = productsArray.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  }, [productsArray, searchTerm]);

  const handleFilter = useCallback(() => {
    let filtered = productsArray;
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }
    setFilteredProducts(filtered);
  }, [productsArray, selectedCategory]);

  useEffect(() => {
    const timeoutId = setTimeout(handleFilterSearch, 500);
    return () => clearTimeout(timeoutId);
  }, [handleFilterSearch]);

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Products</h2>

      {/* Filters */}
      <div className="d-flex mb-4 gap-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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

      {filteredProducts.length === 0 ? (
        <h1>No products found.</h1>
      ) : (
        <div className="row">
          {currentProducts.map((product) => (
            <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <ProductCard
                productName={product.productName}
                category={product.category}
                price={product.price}
                productId={product._id}
                description={product.description}
                url={product.logo?.url}
              />
            </div>
          ))}
        </div>
      )}

      {currentPage != totalPages && (
        <nav>
          <ul className="pagination justify-content-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Products;
