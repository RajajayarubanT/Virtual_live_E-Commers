import { type } from "os";
import React, { useState, useEffect } from "react";

import "../../css/PaymentNotification.css";
import PaymentPortal from "./PaymentPortal";
function Notification({ OrderedData }) {
  const [TotalPrice, setTotalPrice] = useState(0);

  var start = 0;
  const [PurchasedOrderDataArray, setPurchasedOrderDataArray] = useState([]);
  const [Price, setPrice] = useState(0);

  const NotInt = (e) => {
    let vaa = e.target.parentNode.parentNode.parentNode.childNodes[1].innerHTML;
    let len = vaa.length;
    let ReducedPrice = parseInt(vaa.slice(1, len));
    start = start - ReducedPrice;

    setTotalPrice(TotalPrice - ReducedPrice);
    e.target.parentNode.parentNode.style.opactity = 0;
    setTimeout(() => {
      document
        .getElementById(e.target.parentNode.parentNode.parentNode.id)
        .remove();
    }, 50);
  };

  useEffect(() => {
    let value = OrderedData.PurchasedOrderData.data;
    setPurchasedOrderDataArray(value);
    setTotalPrice(start);
  }, []);
  // SetTotal Price
  let value = OrderedData.PurchasedOrderData.data;
  for (var list of value) {
    start += parseInt(list.Price);
  }

  return (
    <div className="notification-wrapper-main">
      <div className="notification-wrapper">
        <h1>Place Order</h1>
        <div className="notification-container">
          <div className="notification-container-label ">
            <div>Item</div>
            <div>Price</div>
            <div className="option-notify">Delete</div>
          </div>
          <div className="notify-wrapper">
            {PurchasedOrderDataArray.map((res, index) => {
              return (
                <div key={index} id={`elem${index}`}>
                  <div>
                    {index + 1}.{res.Item}
                  </div>
                  <div id={`price${index}`}>₹{res.Price}</div>
                  <div className="option-notify">
                    <span
                      className="not"
                      onClick={(e) => {
                        NotInt(e);
                      }}
                    >
                      <i class="fas fa-times"></i>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="TotalamountContainer">
            <div>
              <span>Total Price: ₹</span>
              {TotalPrice}.00
            </div>
          </div>

          <PaymentPortal TotalAmount={TotalPrice} />
        </div>
      </div>
    </div>
  );
}

export default Notification;
