import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import StoreCard from "./StoreCard";
import Button from "./Button";
import Cookies from "js-cookie"

const StoreContainer = ({ storeList, isLoadings,getStores, isOwner,getUser }) => {

  useEffect(()=>{
    getStores();
    const token = Cookies.get("authToken");
        if (token) {
          getUser();
        }
 

  },[])

  if (isLoadings) {
    return <div>Loading.....</div>;
  }

  if (storeList.length === 0) {
    return <div>No stores yet</div>;
  }

  return (
    <>
   <Button isSeller={isOwner}/>
    <div className="container mt-4">
      <div className="row">
        {storeList.map((store) => (
          <div key={store._id} className="col-md-4 col-sm-6 mb-4">
            <StoreCard
              storeName={store.storeName}
              description={store.description}
              storeId={store._id}
            />
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default StoreContainer;
