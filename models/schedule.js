const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
    schedule: { type: Object, required: true }
});

module.exports = mongoose.model('Schedule', scheduleSchema);
