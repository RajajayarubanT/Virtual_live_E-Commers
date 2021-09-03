const mongoose = require('mongoose');

const PostPurchasedOrderData_OrderDataSchema = new mongoose.Schema({
    PurchasedOrder_Customer: {
        type: Object,
        required: true
    },
});

mongoose.model("PostPurchasedOrderData_OrderDatas", PostPurchasedOrderData_OrderDataSchema);

