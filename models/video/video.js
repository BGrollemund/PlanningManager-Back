const mongoose = require('mongoose');

const videoSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'VideoCategory' },
        description: { type: String, required: true },
        image: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Video', videoSchema);
