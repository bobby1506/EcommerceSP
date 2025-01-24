import React from 'react'
import { Link } from 'react-router-dom'

const StoreCard = ({storeName,description,storeId}) => {
  return (
    <>
    <div className="card" style={{width: "18rem"}}>
  <img src="https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ" className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{storeName}</h5>
    <p className="card-text">{description}</p>
    <Link to={`/products/${storeId}`}  className="btn btn-primary">Open</Link>
  </div>
</div>
    </>
  )
}

export default StoreCard