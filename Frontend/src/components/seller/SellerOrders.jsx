import React, { useEffect } from 'react'
import OrderCard from '../order/OrderCard';

const SellerOrders = ({orderItems,oisLoading,getOrdersSeller}) => {
  useEffect(()=>{
    getOrdersSeller();
    console.log(orderItems)
     },[])
     if(oisLoading){
         return<h1>Loading....</h1>
     }
     if(orderItems.length===0){
      return <h1>No Orders Yet</h1>
     }
   return (
     <>
     {
      orderItems.map((order)=>(
       <OrderCard order={order}/>
      ))
     }
     </>
  )
}

export default SellerOrders



