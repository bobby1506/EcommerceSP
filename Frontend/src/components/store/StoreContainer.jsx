import React, { useContext, useEffect, useState } from "react";
import StoreCard from "./StoreCard";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../../context/ContextProvider";

const StoreContainer = ({
  store,
  isOwner
}) => {
  const {storesArray,isLoading}=store
  const { contextUserData } = useContext(loginContext);
  const isSeller = contextUserData.isSeller;
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    if (isOwner || isSeller) {
      navigate("/sellerdashboard/sellerprofile");
    }
  }, [isOwner, isSeller, navigate]);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentStores = storesArray.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(storesArray.length / itemsPerPage);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return <div>Loading.....</div>;
  }

  if (storesArray.length === 0) {
    return <div>No stores yet</div>;
  }

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          {currentStores.map((store) => (
            <div key={store._id} className="col-md-4 col-sm-6 mb-4">
              <StoreCard
                storeName={store?.storeName}
                description={store?.description}
                storeId={store._id}
                url={store?.logo}
              />
            </div>
          ))}
        </div>

       
        {currentPage!=totalPages && <nav>
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
      </div>
    </>
  );
};

export default StoreContainer;
