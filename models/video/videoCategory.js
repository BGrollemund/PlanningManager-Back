const mongoose = require('mongoose');

const videoCategorySchema = mongoose.Schema(
    {
        label: { type: String, required: true }
    }
);

module.exports = mongoose.model('VideoCategory', videoCategorySchema);
