import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Button = ({isSeller}) => {
const [sellerbutton,SetSellerbutton]=useState("Become a Seller")
const navigate=useNavigate();
const handleOnClick=()=>{
  if(isSeller){
    navigate('/sellerdashboard')
  }
  else{
    navigate('/createstore')
  }
}
useEffect(()=>{
    if(isSeller){
        SetSellerbutton("Dashboard")
    }
    if(isSeller){
      navigate('/sellerdashboard')
    }
},[isSeller])
  return (
   <button className='btn btn-dark' onClick={handleOnClick}>{sellerbutton}</button>
  )
}

export default Button