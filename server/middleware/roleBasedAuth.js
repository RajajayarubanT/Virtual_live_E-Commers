const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/key");
const mongoose = require("mongoose");
const User = mongoose.model("users");
module.exports = (req, res, next) => {

};
