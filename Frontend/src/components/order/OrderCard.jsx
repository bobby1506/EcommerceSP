import React from 'react';
import ProductDetail from '../../pages/productDetail';

const OrderCard = ({ order }) => {
  console.log("jay-viru",order)
  return (
    <div className="card mb-3 shadow-sm">
      <div className="row g-0">
        {/* Image Section */}
        <div className="col-md-4">
          <img 
            src="https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ" 
            alt="Product" 
            className="img-fluid rounded-start"
            style={{ objectFit: 'cover', height: '150px' }}
          />
        </div>
        
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Order ID: {order._id}</h5>
            <p className="card-text text-muted">
              Date: {new Date(order.paidAt).toLocaleDateString()}
            </p>

            <ul className="list-group list-group-flush">
              {order?.orderedItems?.map((item) => (
                <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                 <h4> {item?.ProductDetails?.productName}</h4> 
                  <span className="badge bg-primary rounded-pill fs-5 p-2">
                    ${item?.ProductDetails?.price+order.shippingPrice}
                  </span>
                </li>
              ))}
            </ul>

            {/* <div className="mt-3">
              <strong>Total: ${order.totalPrice}</strong>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
