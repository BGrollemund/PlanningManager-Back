const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema(
    {
        schedule: { type: Object, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Schedule', scheduleSchema);
