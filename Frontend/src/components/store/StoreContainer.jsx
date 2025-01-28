import React, { useEffect } from "react";

import StoreCard from "./StoreCard";
import Button from "./Button";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";

const StoreContainer = ({ storeList, isLoadings,getStores, isOwner,getUser }) => {
  const navigate=useNavigate()

  useEffect(()=>{
    getStores();
    const token = Cookies.get("authToken");
        if (token) {
          getUser();
        }
  },[])
  useEffect(()=>{
      if(isOwner){
        navigate('/sellerdashboard')
      }
  },[isOwner])
  console.log("first",storeList[0]?.logo)

  if (isLoadings) {
    return <div>Loading.....</div>;
  }

  if (storeList.length === 0) {
    return <div>No stores yet</div>;
  }

  return (
    <>
    <div className="container mt-4">
      <div className="row">
        {storeList.map((store) => (
          <div key={store._id} className="col-md-4 col-sm-6 mb-4">
            <StoreCard
              storeName={store?.storeName}
              description={store?.description}
              storeId={store._id}
              url={store?.logo?.url}
            />
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default StoreContainer;
