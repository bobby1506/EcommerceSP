import React, { useEffect, useState } from 'react';
import OrderCard from '../components/order/OrderCard';

const Orders = ({order,getOrders }) => {
  const {orderList, isLoading,}=order
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  
  useEffect(() => {
    getOrders();
  }, [getOrders]);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  
  if (orderList?.length === 0) {
    return <h1>No Orders Yet</h1>;
  }

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentOrders = orderList.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(orderList.length / itemsPerPage);

 
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {currentOrders.map((order) => (
        <OrderCard key={order.orderId} order={order} />
      ))}

   
 {  currentPage!=totalPages &&   <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
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
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
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

export default Orders;
