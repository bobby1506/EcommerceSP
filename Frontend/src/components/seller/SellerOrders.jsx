import React, { useEffect, useState } from "react";
import OrderCard from "../order/OrderCard";

const SellerOrders = ({ seller, getOrdersSeller }) => {
  const {isLoading,ordersArray}=seller
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    getOrdersSeller();
  }, [getOrdersSeller]);

 
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentOrders = ordersArray?.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(ordersArray?.length / itemsPerPage);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  if (ordersArray?.length === 0) {
    return <h1>No Orders Yet</h1>;
  }

  return (
    <>
      <h1>Orders</h1>
      {currentOrders?.map((order) => (
        <OrderCard key={order.orderId} order={order} />
      ))}
      
      
      {totalPages!=currentPage && <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Prev
            </button>
          </li>

          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index + 1}
              className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>}
    </>
  );
};

export default SellerOrders;
