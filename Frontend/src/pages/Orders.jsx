import React, { useEffect } from 'react'
import OrderCard from '../components/order/OrderCard';

const Orders = ({orderItems,oisLoading,getOrders}) => {

    useEffect(()=>{
   getOrders();
   console.log(orderItems)
    },[])
    if(oisLoading){
        return<h1>Loading....</h1>
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

export default Orders