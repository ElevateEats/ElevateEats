const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    lastName: String,
    firstName: String,
    middleName: String,
    phoneNumber: Number,
    emailAddress: {},
    //location, height, weight?
});