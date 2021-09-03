const mongoose = require('mongoose');

const Admin_DynamicUserData_userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    Men: {
        type: Array,
        required: true
    },
    Women: {
        type: Array,
        required: true
    }
});

mongoose.model("Admin_DynamicUserData_users", Admin_DynamicUserData_userSchema);

