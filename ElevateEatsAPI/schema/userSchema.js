const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    lastName: {type: String, required: true},
    firstName: {type: String, required: true},
    middleName: String,
    phoneNumber: {type: String, required: true},
    emailAddress: String,
});