const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    iconURL: String
});