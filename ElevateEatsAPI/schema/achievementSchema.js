const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    iconURL: String
});

const Acheivement = mongoose.model('Achievement', achievementSchema)
export default Achievement;