const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee_userSchema = mongoose.model("Employee_users");
const crypto = require('crypto')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config/key")

//bb998951a394eaecc21f4bdea2db3056-2af183ba-8cf0f1bb


//e-mail verification
const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxc80e8668dc1441908ea8c3170d6a1f09.mailgun.org';
const mg = mailgun({ apiKey: "bb998951a394eaecc21f4bdea2db3056-2af183ba-8cf0f1bb", domain: DOMAIN });


//SighUP
router.post('/employee_signup', (req, res) => {
    const { name, email, password, pic } = req.body;
    if (!email || !password || !name) {
        return res.status(422).json({ error: "fill the field" })
    }
    Employee_userSchema.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "email already exist" })
            }
            //hashing password
            bcrypt.hash(password, 12)
                .then(hashedpassword => {
                    const user = new Employee_userSchema({
                        name: name,
                        email: email,
                        password: hashedpassword,
                        pic: pic
                    })
                    user.save()
                        .then(user => {

                            // const data = {
                            // to: user.email,
                            // from: 'leoraj@hellow.com',
                            // subject: 'Account Activation Link',
                            // html: "<h1>welcome to instagram<h1>"
                            // };
                            // mg.messages().send(data, function (error, body) {
                            //     if(error){
                            //         return res.json({
                            //             message: error.message
                            //         });
                            //     } 
                            //     console.log(body);
                            //     }); 
                            res.json({ message: "user successfully saved " })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
                .catch(err => {
                    console.log(err)
                })

        })
        .catch(err => {
            console.log(err)
        })
});

//SignIn
router.post('/employee_signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "fill the field" })
    }
    Employee_userSchema.findOne({ email: email })
        .then((savedUser) => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid email or password" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        //return res.json({message:"successfully signed in"})
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                        const { _id, name, email, pic } = savedUser
                        res.json({ token, user: { _id, name, email, pic } });
                    } else {
                        return res.status(422).json({ error: "Invalid email or password" })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            console.log(err)
        })
})

// router.post('/videoCallRequest', (req, res) => {
//     const { userId } = req.body;

//     res.json(userId);

// })

module.exports = router