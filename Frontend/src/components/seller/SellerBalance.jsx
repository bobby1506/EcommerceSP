import React, { useEffect } from 'react'



const SellerBalance = ({sStore,getSellerStore}) => {

    useEffect(()=>{
    getSellerStore();
   
    },[])
   console.log("sstore",sStore)
  return (
    <>
     <div>SellerBalance</div>
     <h5>{sStore?.Balance}</h5>
    </>
   
    
  )
}

export default SellerBalance