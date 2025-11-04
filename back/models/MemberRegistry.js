const mongoose = require('mongoose');

const MemberRegistrySchema = new mongoose.Schema({
    user: { type: String, required: true, index: true },
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true, index: true },
    action: { type: String, enum: ['enroll', 'update'], required: true },
    timestamp: { type: Date, default: Date.now, index: true },
});

module.exports = mongoose.model('MemberRegistry', MemberRegistrySchema);
