import React, { useEffect } from 'react'



const SellerBalance = ({sStore,getSellerStore}) => {

    useEffect(()=>{
    getSellerStore();
   
    },[])
   console.log("sstore",sStore)
  return (
    <>
    <div className="container mt-4">
        <div className="card text-center">
          <div className="card-header">
            <h4>Seller Balance</h4>
          </div>
          <div className="card-body">
            <h5 className="card-title">{sStore?.Balance?? 'No Credit Data Available'}</h5>
          </div>
        </div>
      </div>
    </>
   
    
  )
}

export default SellerBalance