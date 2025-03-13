const mongoose = require('mongoose');
const { Schema } = mongoose;

const MemberSchema = new Schema({
    username: { type: String, required: true },
    dni: { type: String, required: true },
    birthdate: { type: String, required: true },
    email: { type: String, required: true },
    emergencyPhone: { type: String, required: true },
});

module.exports = mongoose.model('Member', MemberSchema);