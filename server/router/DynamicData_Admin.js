const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Admin_DynamicUserData_userSchema = mongoose.model("Admin_DynamicUserData_users");


//   Get Customer Name
router.get("/viewDynamicUserData", (req, res) => {
    Admin_DynamicUserData_userSchema.find()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// User Dynamic data
router.post('/uploadDynamicUserData', (req, res) => {
    let name = "SuriyaUserData"
    const { Men, Women } = req.body;
    if (!Men || !Women) {
        return res.status(422).json({ error: "fill the field" })
    }
    Admin_DynamicUserData_userSchema.findOne({ name: name })
        .then(async (result) => {
            if (result) {

                const update = { Men: Men, Women: Women }

                await Admin_DynamicUserData_userSchema.findOneAndUpdate({ name: name }, update, {
                    new: true
                });


            } else {
                const UserData = new Admin_DynamicUserData_userSchema({ name, Men, Women });
                UserData
                    .save()
                    .then((UserData) => {
                        res.json({ message: "saved successfully" });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }

        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router