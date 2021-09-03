const mongoose = require('mongoose');
var accountsSchema = new mongoose.Schema({
    itemId: {
        type: String,
        required: 'This field is required.'
    },
    itemName: {
        type: String,
        required: 'This field is required.'
    },
    Date: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: String,
        required: 'This field is required.'
    }
});
// accountsSchema.path('email').validate((val) => {
//     emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return emailRegex.test(val);
// }, 'Invalid e-mail.');

mongoose.model('accounts', accountsSchema);