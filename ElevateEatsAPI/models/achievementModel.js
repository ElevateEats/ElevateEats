const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    name: String,
    description: String,
    iconURL: String
});