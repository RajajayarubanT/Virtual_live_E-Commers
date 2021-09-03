const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default: "https://res.cloudinary.com/tr237110/image/upload/v1607936157/rajaimages/pj23mo7daqhjzn6awtyt.png"
    },
    resetToken:String,
    expireToken:Date
});

mongoose.model("users",userSchema);

