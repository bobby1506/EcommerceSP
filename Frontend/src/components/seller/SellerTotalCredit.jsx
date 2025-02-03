import React, { useEffect } from 'react';


const SellerTotalCredit = ({ sStore, getSellerStore }) => {
  useEffect(() => {
    getSellerStore();
  }, []);

  return (
    <>
      <div className="container mt-4">
        <div className="card text-center">
          <div className="card-header">
            <h4>Seller Total Credit</h4>
          </div>
          <div className="card-body">
            <h5 className="card-title">{sStore?.Credits ?? 'No Credit Data Available'}</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerTotalCredit;
