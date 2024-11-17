const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    //TODO: input validation
    lastName: String,
    firstName: String,
    middleName: String,
    phoneNumber: Number,
    emailAddress: String,
});