const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Customer_OrderDataSchema = mongoose.model("Customer_OrderDatas");
const PostPurchasedOrderData_OrderDataSchema = mongoose.model(
  "PostPurchasedOrderData_OrderDatas"
);

// CustomerOrder
router.post("/customer-OrderData", (req, res) => {
  const { orderRequestData } = req.body;
  console.log(req.body);
  const CustomerOrder = new Customer_OrderDataSchema({
    orderRequestData: orderRequestData,
  });
  CustomerOrder.save()
    .then((CustomerOrder) => {
      res.json({ message: "saved successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/PostPurchasedOrderData", (req, res) => {
  const { PurchasedOrder_Customer } = req.body;
  const PurchasedOrderData = new PostPurchasedOrderData_OrderDataSchema({
    PurchasedOrder_Customer: PurchasedOrder_Customer,
  });
  PurchasedOrderData.save()
    .then((PurchasedOrderData) => {
      res.json({ message: "saved successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
