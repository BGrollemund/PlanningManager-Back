const Video = require('../models/video/video');
const VideoCategory = require('../models/video/videoCategory');

exports.create = (req, res) => {
    const video = new Video( {
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        image: req.body.image
    });
    video.save()
        .then( () => res.status(201).json({ message: 'Video saved successfully' }) )
        .catch( error => { res.status(400).json({ error }) } );
};

exports.createCategory = (req, res) => {
    const videoCategory = new VideoCategory( { label: req.body.label } );
    videoCategory.save()
        .then( () => res.status(201).json({ message: 'Video category saved successfully' }) )
        .catch( error => { res.status(400).json({ error }) } );
};

exports.readAll = (req, res) => {
    Video.find()
        .then( user => res.status(200).json(user) )
        .catch( error => res.status(400).json({ error }) );
};

exports.readAllCategory = (req, res) => {
    VideoCategory.find()
        .then( user => res.status(200).json(user) )
        .catch( error => res.status(400).json({ error }) );
};

exports.update = (req, res) => {
    console.log(req.body);
    Video.updateOne( { _id: req.body._id }, {
        title: req.body.title,
        category: req.body.category,
        description: req.body.description
    })
        .then( () => res.status(200).json({ message: 'Video updated successfully'}) )
        .catch( error => res.status(400).json({ error }) );
};

exports.delete = (req, res) => {
    Video.deleteOne({ _id: req.body.id })
        .then( () => res.status(200).json({ message: 'Video deleted successfully'}) )
        .catch( error => res.status(400).json({ error }) );
};

exports.deleteCategory = (req, res) => {
    VideoCategory.deleteOne({ _id: req.body.id })
        .then( () => res.status(200).json({ message: 'Video category deleted successfully'}) )
        .catch( error => res.status(400).json({ error }) );
};
