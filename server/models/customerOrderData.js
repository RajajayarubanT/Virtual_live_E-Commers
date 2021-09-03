const mongoose = require('mongoose');

const Customer_OrderDataSchema = new mongoose.Schema({
    orderRequestData: {
        type: Object,
        required: true
    },
});

mongoose.model("Customer_OrderDatas", Customer_OrderDataSchema);

