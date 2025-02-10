import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserStatus } from "../../redux/actions/userActions";

const OrderCard = ({ order }) => {
  const dispatch=useDispatch()
  const {isSeller}=useSelector((state)=>state.user)
  useEffect(()=>{
    dispatch(getUserStatus());
  },[isSeller])
  return (
    <div className="card mb-4 shadow-lg">
      <div className="card-header bg-primary text-white">
        <h5 className="card-title mb-0">Order ID: {isSeller?order.orderId:order._id}</h5>
      </div>

      <div className="card-body">
        <p className="text-muted mb-3">
          <strong>Date:</strong> {new Date(order.paidAt).toLocaleDateString()}
        </p>

        <ul className="list-group list-group-flush">
          {order?.orderedItems?.map((item) => (
            <li key={item._id} className="list-group-item">
              <div className="row align-items-center">
                <div className="col-2">
                  <img
                    src={item?.productDetails?.logo}
                    alt="Product"
                    className="img-fluid rounded"
                    style={{ objectFit: "cover", maxHeight: "70px" }}
                  />
                </div>

                <div className="col-6">
                  <h6 className="mb-0">{item?.productDetails?.productName}</h6>
                </div>

                <div className="col-4 text-end">
                  <span className="badge bg-primary fs-6 p-2 me-2">
                    ${isSeller?(item?.productDetails?.price * item?.quantity):item?.productDetails?.price + order.shippingPrice}
                  </span>
                  <div className="mt-2">
                    <h6 className="fw-bold">Delivery Status:</h6>
                    <span
                      className={`badge ${
                        item.deliveryStatus === "Delivered"
                          ? "bg-success"
                          : "bg-warning"
                      } fs-6`}
                    >
                      {item.deliveryStatus || "pending"}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderCard;
